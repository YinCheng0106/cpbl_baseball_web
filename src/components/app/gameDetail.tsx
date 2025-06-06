"use client";

import { Scoreboard } from "@/components/app/scoreboard";
import { MvpCard } from "@/components/app/mvpCard";
import { PlayerCard } from "@/components/app/playerCard";


import { ScoreboardType, GameInfo, GameLive, GameEnd } from "@/types/gameData";

const readyPlay = (gameInfo : GameInfo) => {
  return (
    <div className="gird grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
            客隊先發
          </span>
          <span className="text-sm font-medium">
            {gameInfo.awayStarter.player === null ? "未公布" : gameInfo.awayStarter.player}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
            主隊先發
          </span>
          <span className="text-sm font-medium">
            {gameInfo.homeStarter.player === null ? "未公布" : gameInfo.homeStarter.player}
          </span>
        </div>
      </div>
    </div>
  );
};

const inPlaying = (
  gameLive: GameLive,
) => {
  return (
    <div>
      <div className="pb-4">
        <Scoreboard scoreboard={gameLive.scoreboard} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                當前投手
              </span>
              <span className="text-sm font-medium">
                {gameLive.onField.nowPitcher.player ? gameLive.onField.nowPitcher.player : "無"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                當前打者
              </span>
              <span className="text-sm font-medium">
                {gameLive.onField.nowBatter.player ? gameLive.onField.nowBatter.player : "無"}
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                好壞球
              </span>
              <span className="text-sm font-medium">
                {gameLive.balls.ball} - {gameLive.balls.strike}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                出局數
              </span>
              <span className="text-sm font-medium">{gameLive.balls.out}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                投球數
              </span>
              <span className="text-sm font-medium">{gameLive.balls.pitch}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const gameSet = (
  scoreboard: ScoreboardType,
  gameEnd: GameEnd,
) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid xl:grid-cols-2 xl:items-center gap-4">
        <div><Scoreboard scoreboard={scoreboard}/></div>
        <div><MvpCard mvp={ gameEnd.mvpData }/></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className={`
              text-sm border rounded p-0.5 sm:py-0.5 w-[44px] 
              flex items-center justify-center 
              before:content-['勝'] sm:before:content-['勝投']`}>
            </span>
            <span className="text-sm font-medium">
              {gameEnd.winPitcher.player === "" 
                ? "無" : 
                gameEnd.winPitcher.id && <PlayerCard id={gameEnd.winPitcher.id} />
              }
            </span>
          </div>
          <div className={`
              flex justify-between items-center
              ${gameEnd.savePitcher.id === null ? "hidden" : ""}
            `}>
            <span className="text-sm border rounded py-0.5 w-[44px] flex items-center justify-center">
              救援
            </span>
            <span className="text-sm font-medium">
              {gameEnd.savePitcher.player === "" 
                ? "無" : 
                gameEnd.savePitcher.id && <PlayerCard id={gameEnd.savePitcher.id} />
              }
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className={`
              text-sm border rounded p-0.5 sm:py-0.5 w-[44px]
              flex items-center justify-center 
              before:content-['敗'] sm:before:content-['敗投']`}>
            </span>
            <span className="text-sm font-medium">
              {gameEnd.losePitcher.player === ""
                ? "無" : 
                gameEnd.losePitcher.id && <PlayerCard id={gameEnd.losePitcher.id} />
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export { readyPlay, inPlaying, gameSet };