"use client";

import { teamToWord } from "@/utils/teamUtils";

import { MvpData } from "@/types/gameData";

type Props = Readonly<{ mvp: MvpData }>;

export function MvpCard(props: Props | null) {
  if (!props) return null;
  const { mvp } = props;

  return (
    <div
      className={`
      flex flex-col gap-2
      w-full h-full p-4 rounded-lg shadow-md dark:bg-zinc-800 bg-zinc-100`}
    >
      <div className="flex items-center justify-center gap-2">
        <img src={teamToWord(mvp.team)} width={30} height={30} />
        <h2>{mvp.player}</h2>
      </div>
      <div>
        {mvp.playerType === "Batter" ? (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">當年度獲選MVP次數</span>
              <span className="text-sm">{mvp.mvpCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">打數</span>
              <span className="text-sm">{mvp.gamestats.hit.hitCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">打點</span>
              <span className="text-sm">
                {mvp.gamestats.hit.runBattedInCnt}
              </span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">得分</span>
              <span className="text-sm">{mvp.gamestats.hit.scoreCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">全壘打</span>
              <span className="text-sm">{mvp.gamestats.hit.homeRunCnt}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">當年度獲選MVP次數</span>
              <span className="text-sm">{mvp.mvpCnt}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">投球局數</span>
              <span className="text-sm">
                {mvp.gamestats.pitch.inningPitchedCnt}
              </span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">奪三振數</span>
              <span className="text-sm">
                {mvp.gamestats.pitch.strikeOutCnt}
              </span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span className="text-sm font-medium">失分數</span>
              <span className="text-sm">{mvp.gamestats.pitch.runCnt}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
