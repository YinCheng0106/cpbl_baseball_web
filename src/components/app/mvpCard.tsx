"use client";

import { teamToWord } from "./teamLogo";

type Props = Readonly<{
  team: string;
  player: string;
  playerType: "打者" | "投手";
  mvpCnt: number;

  hitCnt?: number;
  runBattedInCnt?: number;
  scoreCnt?: number;
  homeRunCnt?: number;

  inningPitchedCnt?: number;
  strikeOutCnt?: number;
  runCnt?: number;
}>;

export function MvpCard({
  team,
  player,
  playerType,
  mvpCnt,
  hitCnt,
  runBattedInCnt,
  scoreCnt,
  homeRunCnt,
  inningPitchedCnt,
  strikeOutCnt,
  runCnt,
  } : Props ) {
  return (
    <div className={`
      flex flex-col gap-2
      w-full h-full p-4 rounded-lg shadow-md dark:bg-zinc-800 bg-zinc-100`}
    >
      <div className="flex items-center justify-center gap-2">
        <img src={teamToWord(team)} width={30} height={30} />
        <h2>{player}</h2>
      </div>
      <div >
        { playerType === "打者" ? (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">當年度獲選MVP次數</span>
              <span className="text-sm">{mvpCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">打數</span>
              <span className="text-sm">{hitCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">打點</span>
              <span className="text-sm">{runBattedInCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">得分</span>
              <span className="text-sm">{scoreCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">全壘打</span>
              <span className="text-sm">{homeRunCnt}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">當年度獲選MVP次數</span>
              <span className="text-sm">{mvpCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">投球局數</span>
              <span className="text-sm">{inningPitchedCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">奪三振數</span>
              <span className="text-sm">{strikeOutCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">失分數</span>
              <span className="text-sm">{runCnt}</span>
            </div>
          </div>
        ) }
      </div>
    </div>
  );
}
