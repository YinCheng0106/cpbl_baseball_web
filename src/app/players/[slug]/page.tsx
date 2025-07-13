"use client";

import type { Metadata, ResolvingMetadata } from "next";
import { useState, useEffect, use } from "react";

import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/utils/supabase";
import { teamToWord } from "@/utils/teamUtils";
import { positionToAbbreviation } from "@/utils/playerUtils";

import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";


import { PlayerData } from "@/types/playerData";

import { SquareArrowOutUpRightIcon } from "lucide-react";

type Props = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export default function PlayerPage({ params }: Props) {
  const { slug } = use(params);
  const playerId = parseInt(slug.split("-").pop() || "");

  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState<PlayerData | null>(null);

  useEffect(() => {
    setLoading(true);

    async function fetchPlayer() {
      const { data: players, error } = await supabase
        .from("players")
        .select()
        .eq("id", playerId)
        .single();
      if (error) {
        console.error("Error fetching player:", error);
      } else {
        setPlayer(players);
      }
      setLoading(false);
    }
    fetchPlayer();
  }, []);

  console.log("Player Data:", player);
  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Loading Player Data...</p>
        </div>
      </div>
    );
  } else if (!player) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Player not found.</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto px-4">
        <div className="relative top-0 z-10">
          <div className="relative overflow-hidden">
            <Image
              src={player.banner || "/playerImg/000929/banner.png"}
              alt={`Banner for ${player.name}`}
              width={1200}
              height={384}
              className="w-full h-40 sm:h-52 md:h-96 object-cover opacity-80 rounded-t-xl"
            />
            <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-background to-transparent" />
          </div>
          <div
            className={`
            absolute bottom-0 left-4 sm:left-6 md:left-8
            transform translate-y-2 lg:translate-y-1/4 md:translate-y-1/2
            flex items-end w-full
            `}
          >
            <Image
              src={player.avatar || "/playerImg/000929/avatar.png"}
              alt={player.name}
              width={140}
              height={150}
              className="w-16 sm:w-24 md:w-32 rounded-lg border-4 border-white shadow-lg"
            />
            <div
              className={`
              flex items-center justify-between px-4
              w-full 
            `}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 font-bold">
                  <h2 className="text-2xl">{player.name}</h2>
                  <p className="text-xl">#{player.number}</p>
                </div>
                <div className="flex items-center justify-between w-full gap-2">
                  <p className="font-bold">
                    {positionToAbbreviation(player.position)}
                  </p>
                  <p>
                    {player.pitchingHabits.at(0)} / {player.battingHabits.at(0)}
                  </p>
                  <p>
                    {player.height}{" "}
                    <span className="text-sm text-gray-500">(CM)</span>
                  </p>
                  <p>
                    {player.weight}{" "}
                    <span className="text-sm text-gray-500">(KG)</span>
                  </p>
                </div>
              </div>
              <div className="absolute p-2 right-4 sm:right-8 md:right-12">
                <Button
                  onClick={() => alert("Follow feature coming soon!")}
                  className={`
                  mt-2 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer
                `}
                >
                  <span className="flex items-center justify-center">追蹤</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-8 sm:h-16 md:h-20"></div>
        <div className="container pt-4">
          <div className="grid md:grid-cols-3  gap-4 p-2">
            <div className="bg-accent p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-400">國籍</p>
              <p className="text-lg font-bold pl-4">{player.nationality}</p>
            </div>
            <div className="bg-accent p-4 rounded-lg shadow-sm ">
              <p className="text-md text-gray-400">學歷</p>
              <p className="text-lg font-bold pl-4">{player.education}</p>
            </div>
            <div className="bg-accent p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-400">選秀</p>
              <p className="flex gap-2 text-lg font-bold pl-4">
                <Image
                  src={teamToWord(player.draftTeam)}
                  alt={`${player.draftTeam}`}
                  width={30}
                  height={30}
                />
                {player.draftYear}年 第{player.draftRound}輪
              </p>
            </div>
            <div className="bg-accent p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-400">生日</p>
              <p className="text-lg font-bold pl-4">{player.birthday}</p>
            </div>
            <div className="bg-accent p-4 rounded-lg shadow-sm">
              <p className="text-md text-gray-400">初登板</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold pl-4">{player.debutDate}</p>
                <Link href={`/players/${player.id}/debut`}>
                  <SquareArrowOutUpRightIcon className="w-4 h-4 text-blue-500 hover:text-accent" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container flex mx-auto px-4 mt-4">
          <Tabs defaultValue="individualStats" className="w-full">
            <div className="flex flex-row items-center justify-between mb-4">
              <h3 className="text-xl font-bold">球員數據</h3>
              <TabsList>
                <TabsTrigger value="individualStats">個人成績表</TabsTrigger>
                <TabsTrigger value="homerunLogs">全壘打明細</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="individualStats" className="space-y-4">
              <div>
                <h4 className="text-lg font-bold">打擊</h4>
                {/* 打擊數據表格可以在這裡添加 */}
              </div>
              <div>
                <h4 className="text-lg font-bold">投球</h4>
                {/* 投球數據表格可以在這裡添加 */}
              </div>
              <div>
                <h4 className="text-lg font-bold">守備</h4>
                {/* 守備數據表格可以在這裡添加 */}
              </div>
            </TabsContent>
            <TabsContent value="homerunLogs">
              <h4 className="text-lg font-bold">全壘打明細</h4>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }
}
