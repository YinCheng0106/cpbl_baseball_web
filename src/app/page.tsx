"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { GameCard } from "@/components/app/gameCard";
import { Standing } from "@/components/app/standing";
import { NewsCard } from "@/components/app/newsCard";

import { GameStruct, Game, GameData } from "@/types/gameData";
import { PlayerData } from "@/types/playerData";
import { NewsData } from "@/types/newsData";

import { supabase } from "@/utils/supabase";

export default function Home() {
  const [gamesData, setGameData] = useState<GameData[]>([]);
  const [news, setNews] = useState<NewsData[]>([]);
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      try {
        const [gameResponse, playerResponse, newsResponse] = await Promise.all([
          fetch("/json/game.json"),
          fetch("/json/player.json"),
          fetch("/json/news.json")
        ]);

        const [gameData, playerData, newsData] = await Promise.all([
          gameResponse.json(),
          playerResponse.json(),
          newsResponse.json()
        ]);

        setGameData(gameData);
        setPlayers(playerData);
        setNews(newsData);
      } catch (error) {
        console.error("[讀取失敗]", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const year = new Date().getFullYear().toString();

  const transition = {
    duration: 0.5,
    delay: 0.3,
    ease: [0, 0.71, 0.2, 1.01],
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(selectedDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setSelectedDate(previousDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  const getGames = (): Game => {
    const selectedDateStr = formatDate(selectedDate);
    const dateData = gamesData.find((data) => data.date === selectedDateStr);
    return dateData?.games || { major: [], minor: [] };
  };

  return (
    <div
      className={`
      flex flex-col lg:flex-row justify-center items-center lg:items-start 
      w-full h-full gap-8
    `}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-full">
          <Tabs defaultValue="major" className="w-full">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-2xl font-bold">賽事資訊</h2>
              <div className="flex items-center justify-center gap-2">
                <button
                  className="hover:cursor-pointer hover:text-accent/100 transition-all ease-in-out"
                  type="button"
                  onClick={handlePreviousDay}
                >
                  <ChevronLeft />
                </button>
                <h2 className="sm:text-xl">{formatDate(selectedDate)}</h2>
                <button
                  className="hover:cursor-pointer hover:text-accent/100 transition-all ease-in-out"
                  type="button"
                  onClick={handleNextDay}
                >
                  <ChevronRight />
                </button>
              </div>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="major">一軍</TabsTrigger>
                <TabsTrigger value="minor">二軍</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="major">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={transition}
              >
                {loading ? (
                  <div
                    className={`
                    flex flex-col justify-center 
                    w-[350px] sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[850px] 2xl:w-[900px] 
                    py-6 h-48 mt-4
                  `}
                  >
                    <p className="text-center text-gray-500">載入中...</p>
                  </div>
                ) : getGames().major.length === 0 ? (
                  <div
                    className={`
                    flex flex-col justify-center 
                    w-[350px] sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[850px] 2xl:w-[900px] 
                    py-6 h-48 mt-4
                  `}
                  >
                    <p className="text-center text-gray-500">本日無賽事</p>
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center gap-2 mt-4">
                    { getGames().major.map((gameData: GameStruct) => (
                      <GameCard
                        gameData={gameData}
                        key={gameData.gameInfo.id}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>
            <TabsContent value="minor">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={transition}
              >
                {loading ? (
                  <div
                    className={`
                    flex flex-col justify-center 
                    w-[400px] sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[850px] 2xl:w-[900px] 
                    py-6 h-48 mt-4
                  `}
                  >
                    <p className="text-center text-gray-500">載入中...</p>
                  </div>
                ) : getGames().minor.length === 0 ? (
                  <div
                    className={`
                    flex flex-col justify-center 
                    w-[400px] sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[850px] 2xl:w-[900px] 
                    py-6 h-48 mt-4
                  `}
                  >
                    <p className="text-center text-gray-500">本日無賽事</p>
                  </div>
                ) : (
                  <div className="grid gap-3 mt-4">
                    {getGames().minor.map((gameData: GameStruct) => (
                      <GameCard
                        gameData={gameData}
                        key={gameData.gameInfo.id}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transition}
            className="mt-2 h-80"
          >
            <Tabs defaultValue="firstHalf" className="w-full">
              <div className={`
                flex flex-row items-start justify-between gap-2 mb-4
                w-[360px] sm:-[420px] md:w-[420px] lg:w-[600px] max-w-2xl
              `}>
                <h2 className="text-2xl font-bold">球隊成績</h2>
                <TabsList>
                  <TabsTrigger value="firstHalf">上半季</TabsTrigger>
                  <TabsTrigger value="secondHalf">下半季</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="firstHalf">
                <Standing year={year} season="firstHalf" />
              </TabsContent>
              <TabsContent value="secondHalf">
                <Standing year={year} season="secondHalf" />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col w-84">
        <div>
          <h2 className="text-2xl font-bold">最新消息</h2>
          <div className="flex flex-col mt-4 gap-2">
            {news.map((newsItem: NewsData) => (
              <motion.div
                key={newsItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: 0.1 * newsItem.id }}
              >
                <NewsCard news={newsItem} key={newsItem.id} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
