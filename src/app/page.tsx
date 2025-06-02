'use client';

import { useEffect, useState } from 'react';

import { GameCard } from "@/components/app/gameCard";
import { Standing } from "@/components/app/standing";
import { motion } from "motion/react"
import { GameData } from "@/types/gameData";

export default function Home() {
  const [games, setData] = useState<GameData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/json/game.json')
      .then(response => response.json())
      .then((json: GameData[]) => {
        setData(json);
        setLoading(false);
      })
      .catch(error => {
        console.error('讀取失敗:', error);
        setLoading(false);
      });
  }, []);

  const transition = {
    duration: 0.5,
    delay: 0.3,
    ease: [0, 0.71, 0.2, 1.01],
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full">
        <h2 className="text-2xl font-bold">本日賽事</h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
        >
          {loading ? (
            <div className="flex flex-col justify-center w-full h-48 mt-4">
              <p className="text-center text-gray-500">載入中...</p>
            </div>
          ) : games.length === 0 ? (
            <div className="flex flex-col justify-center w-full h-48 mt-4">
              <p className="text-center text-gray-500">本日無賽事</p>
            </div>
          ) : (
            <div className="grid gap-3 mt-4 ml-2">
              {games.map((gameData: GameData) => (
                <GameCard 
                  gameData={gameData} 
                  key={gameData.gameInfo.id} 
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
      <div>
        <h2 className="text-2xl font-bold">球隊成績</h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
          className="mt-2"
        >
          <Standing />
        </motion.div>
      </div>
    </div>
  );
}
