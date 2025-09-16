"use client";

import { teamToWord } from "@/utils/teamUtils";

import { GameResult } from "@/types/gameData";

type Props = Readonly<{ game: GameResult }>;

export function MvpCard(props: Props) {
  if (!props) return null;
  const { game } = props;

  if(!game.mvp || !game.mvpTeam || !game.mvpType || !game.mvpCnt || !game) {
    return (
      <div
        className={`
        flex flex-col gap-2
        w-full h-full p-4 rounded-lg shadow-md dark:bg-zinc-800 bg-zinc-100`}
      >
        <div className="flex items-center justify-center gap-2">
          <img src={teamToWord(0)} width={30} height={30} />
          <h2>尚未公布</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`
        flex flex-col gap-2
        w-full h-full p-4 rounded-lg shadow-md dark:bg-zinc-800 bg-zinc-100`}
      >
        <div className="flex items-center justify-center gap-2">
          <img src={teamToWord(game.mvp.team)} width={30} height={30} />
          <h2>{game.mvp.name}</h2>
        </div>
        <div>
          {game.mvpType === "Batter" ? (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between border-b pb-1">
                <span className="text-sm font-medium">當年度獲選MVP次數</span>
                <span className="text-sm">{game.mvpCnt}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-sm font-medium">打數</span>
                <span className="text-sm">{game.hitCnt}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-sm font-medium">打點</span>
                <span className="text-sm">
                  {game.hitRbi}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-sm font-medium">得分</span>
                <span className="text-sm">{game.hitScore}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-sm font-medium">全壘打</span>
                <span className="text-sm">{game.hitHomerun}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between border-b pb-1">
                <span className="text-sm font-medium">當年度獲選MVP次數</span>
                <span className="text-sm">{game.mvpCnt}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-sm font-medium">投球局數</span>
                <span className="text-sm">
                  {game.pitchInning}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-sm font-medium">奪三振數</span>
                <span className="text-sm">
                  {game.pitchStrikeout}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-sm font-medium">失分數</span>
                <span className="text-sm">{game.pitchRuns}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

}
