"use client";

import { Chakra_Petch } from "next/font/google";
import Image from "next/image";
import { format } from "date-fns";

import { PlayerData } from "@/types/playerData";
import { positionToAbbreviation } from "@/utils/playerUtils"
import { teamToLogo, teamToString, teamToWord } from "@/utils/teamUtils"

const chakraPetch = Chakra_Petch({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});

export function PlayerCreatedCard({ player }: { player: PlayerData }) {


  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold mb-2">球員預覽圖</h3>
      <div className="bg-accent rounded-2xl shadow-md p-8">
        <div className="flex flex-col gap-4 mb-2">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-2">
              <Image src={teamToLogo(player.team)} alt={`TeamLogo for ${player.team}`} width={100} height={100} />
              <span className={`${chakraPetch.className} text-5xl font-bold ml-4`}>{player.number}</span>
              <div className="flex flex-col">
                <p className="text-4xl font-bold">{player.name}</p>
                <p className={`${chakraPetch.className} text-sm text-gray-500`}>{player.en_name}</p>
                <p></p>
              </div>
            </div>
            <Image src="/playerImg/player_no_img.jpg" alt={`playerAvatar for ${player.name}`} width={100} height={100} />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <div>
              <p className="text-sm text-gray-500 font-bold">守備位置</p>
              <p className={`text-xl ml-2 ${chakraPetch.className}`}>{ player.position ? positionToAbbreviation(player.position) : "UNK"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold">投/打習慣</p>
              <p className={`${chakraPetch.className} text-xl ml-2`}>{player.pitchingHabits ? player.pitchingHabits : "未知"}/{player.battingHabits ? player.battingHabits : "未知"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold">球員所屬球隊</p>
              <p className={`text-xl ml-2`}>{player.team ? teamToString(player.team) : "未知"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold">國籍</p>
              <p className={`text-xl ml-2`}>{player.nationality ? player.nationality : "未知"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold">學歷</p>
              <p className={`text-xl ml-2`}>{player.education ? player.education : "未知"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold">出生日期</p>
              <p className={`text-xl ml-2`}>{player.birthday ? format(player.birthday, "yyyy-MM-dd") : "未知"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold">初登板日</p>
              <p className={`text-xl ml-2`}>{player.debutDate ? format(player.debutDate, "yyyy-MM-dd") : "未知"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold">身高/體重</p>
              <p className={`text-xl ml-2`}>{player.height ? player.height : "未知"}/{player.weight ? player.weight : "未知"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold">選秀</p>
              <div className={`flex flex-row text-sm gap-1 ml-2`}>{player.draftTeam ? 
                <Image src={teamToWord(player.draftTeam)} alt={`DraftTeam for ${player.name}`} width={20} height={20} />
                : "未知"}
                <p>
                  {player.draftYear ? player.draftYear : "未知"}年
                </p>
                <p>
                  第{player.draftRound ? player.draftRound : "未知"}輪
                </p>
              </div>
            </div>
          </div>
          <p className={`flex justify-end text-lg text-gray-500 ${chakraPetch.className}`}>{player.slug ? player.slug : "playerName-0000000"}</p>
        </div>
      </div>
    </div>
  );
}