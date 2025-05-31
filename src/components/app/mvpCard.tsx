"use client";

import Home from "@/app/page";
import { teamToWord } from "./teamLogo";

const mvpData = {
  team: "中信兄弟",
  player: "彭政閔",
  playerType: "打者",
  mvpCnt: 3,

  hitCnt: 2,
  runBattedInCnt: 1,
  scoreCnt: 2,
  homeRunCnt: 1,

  inningPitchedCnt: 10,
  strikeOutCnt: 5,
  runCnt: 2,
};

export function MvpCard() {
  return (
    <div className={`
      flex flex-col gap-2
      w-full h-full p-4 rounded-lg shadow-md dark:bg-zinc-800 bg-zinc-100`}
    >
      <div className="flex items-center justify-center gap-2">
        <img src={teamToWord(mvpData.team)} width={30} height={30} />
        <h2>{mvpData.player}</h2>
      </div>
      <div >
        { mvpData.playerType === "打者" ? (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">當年度獲選MVP次數</span>
              <span className="text-sm">{mvpData.mvpCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">打數</span>
              <span className="text-sm">{mvpData.hitCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">打點</span>
              <span className="text-sm">{mvpData.runBattedInCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">得分</span>
              <span className="text-sm">{mvpData.scoreCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">全壘打</span>
              <span className="text-sm">{mvpData.homeRunCnt}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium">當年度獲選MVP次數</span>
              <span className="text-sm">{mvpData.mvpCnt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">投球局數</span>
              <span className="text-sm">{mvpData.inningPitchedCnt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">奪三振數</span>
              <span className="text-sm">{mvpData.strikeOutCnt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">失分數</span>
              <span className="text-sm">{mvpData.runCnt}</span>
            </div>
          </div>
        ) }
        
      </div>
    </div>
  );
}
