"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Chakra_Petch } from "next/font/google";
import { positionToAbbreviation, statusToTranslation } from "@/utils/playerUtils";
import { teamToWord } from "@/utils/teamUtils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/app/players/[slug]/data-table";
import { battingColumns } from "@/app/players/[slug]/battingColumns";
import { pitchingColumns } from "@/app/players/[slug]/pitchingColumns";
import { fieldingColumns } from "@/app/players/[slug]/fieldingColumns";
import type { PlayerData } from "@/types/playerData";
import { SquareArrowOutUpRightIcon } from "lucide-react";

const chakraPetch = Chakra_Petch({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});

interface PlayerClientProps {
  player: PlayerData;
}

export default function PlayerClient({ player }: PlayerClientProps) {
  const [followed, setFollowed] = useState(false);
  const [playerAvatar, setPlayerAvatar] = useState(`/playerImg/${player.id}/avatar.png`);
  const [playerBanner, setPlayerBanner] = useState(`/playerImg/${player.id}/banner.png`);

  return (
    <div className="container mx-auto px-4">
      <div className="relative top-0 z-10">
        <div className="relative overflow-hidden">
          {
            playerBanner === "" ? 
            (<div className="w-full h-40 sm:h-52 md:h-96 bg-gray-200 rounded-t-xl"></div>)  :
            (<Image
              src={playerBanner}
              alt={`Banner for ${player.name}`}
              width={1200}
              height={384}
              onError={() => setPlayerBanner("")}
              className="w-full h-40 sm:h-52 md:h-96 object-cover opacity-80 rounded-t-xl"
            />)
          }
          <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="absolute bottom-0 left-4 sm:left-6 md:left-8 transform translate-y-2 lg:translate-y-1/4 md:translate-y-1/2 flex items-end w-full">
          <Image
            src={playerAvatar}
            alt={player.name}
            width={140}
            height={150}
            className="w-16 sm:w-24 md:w-32 rounded-lg border-4 border-white shadow-lg"
            onError={() => setPlayerAvatar("/playerImg/player_no_img.jpg")}
          />
          <div className="flex items-center justify-between px-4 w-full">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <p className={`${chakraPetch.className} text-5xl font-bold`}>{player.number}</p>
                <div className={`flex flex-col ${chakraPetch.className}`}>
                  <h2 className="text-4xl font-bold">{player.name}</h2>
                  <p className="text-sm text-gray-500">{player.en_name}</p>
                </div>
              </div>
              <div className={`flex items-center justify-between w-full gap-2 ${chakraPetch.className}`}>
                <p className={`font-bold`}>
                  {positionToAbbreviation(player.position)}
                </p>
                <p>
                  {player.pitchingHabits.at(0)} / {player.battingHabits.at(0)}
                </p>
                <p>
                  {player.height}
                  <span className="text-sm text-gray-500"> (CM)</span>
                </p>
                <p>
                  {player.weight}
                  <span className="text-sm text-gray-500"> (KG)</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={`
                    ${player.status === "retired" ? "dark:bg-red-500 bg-red-300" : ""}
                    ${player.status === "active" ? "dark:bg-green-500 bg-green-300" : ""}
                    ${player.status === "unsigned" ? "dark:bg-yellow-500 bg-yellow-300" : ""}
                    ${player.status === "contract" ? "dark:bg-blue-500 bg-blue-300" : ""}
                    ${player.status === "independent" ? "dark:bg-purple-500 bg-purple-300" : ""}
                    ${player.status === "other" ? "dark:bg-gray-500 bg-gray-300" : ""}
                  `}>
                    {statusToTranslation(player.status)}
                  </Badge>
                <Badge variant="outline">
                  {player.league == "major" ? "一軍" : "二軍"}
                </Badge>
              </div>
            </div>
            <div className="absolute p-2 right-4 sm:right-8 md:right-12">
              <Button
                onClick={() => setFollowed((f) => !f)}
                className="mt-2 bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              >
                <span className="flex items-center justify-center">
                  {followed ? "已追蹤" : "追蹤"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-8 sm:h-16 md:h-20" />
      <div className="container pt-4">
        <div className="grid md:grid-cols-3  gap-4 p-2">
          <div className="bg-accent p-4 rounded-lg shadow-sm">
            <p className="text-md text-gray-400">國籍</p>
            <p className="text-lg font-bold pl-4">{player.nationality}</p>
          </div>
          <div className={`bg-accent p-4 rounded-lg shadow-sm ${player.education ? "" : "hidden"}`}>
            <p className="text-md text-gray-400">學歷</p>
            <p className="text-lg font-bold pl-4">{player.education}</p>
          </div>
          <div className={`
            bg-accent p-4 rounded-lg shadow-sm 
            ${player.draftTeam && player.draftYear && player.draftRound ? "" : "hidden"}
          `}>
            <p className="text-md text-gray-400">選秀</p>
            <p className="flex gap-2 text-lg font-bold pl-4">
              {player.draftTeam && (<Image
                src={teamToWord(player.draftTeam)}
                alt={`${player.draftTeam}`}
                width={30}
                height={30}
              />)}
              {player.draftYear}年 第{player.draftRound}輪
            </p>
          </div>
          <div className="bg-accent p-4 rounded-lg shadow-sm">
            <p className="text-md text-gray-400">生日</p>
            <p className="text-lg font-bold pl-4">{new Date(player.birthday).toISOString().split("T")[0]}</p>
          </div>
          <div className={`bg-accent p-4 rounded-lg shadow-sm ${player.debutDate ? "" : "hidden"}`}>
            <p className="text-md text-gray-400">初登板</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-bold pl-4">{player.debutDate && new Date(player.debutDate).toISOString().split("T")[0]}</p>
              <Link
                href={`/players/${player.id}/debut`}
                className="flex items-center"
              >
                <SquareArrowOutUpRightIcon className="w-4 h-4 link" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex mx-auto px-4 mt-4">
        <Tabs defaultValue="individualStats" className="w-full">
          <div className="flex flex-row items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">球員數據</h3>
            <TabsList>
              <TabsTrigger value="individualStats">個人成績表</TabsTrigger>
              <TabsTrigger value="homerunLogs">全壘打明細</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="individualStats" className="space-y-4">
            <div className="flex flex-col space-y-4">
              <h4 className="text-lg font-bold">打擊成績</h4>
              <DataTable columns={battingColumns} data={[]} />
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-lg font-bold">投球成績</h4>
              <DataTable columns={pitchingColumns} data={[]} />
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-lg font-bold">守備成績</h4>
              <DataTable columns={fieldingColumns} data={[]} />
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
