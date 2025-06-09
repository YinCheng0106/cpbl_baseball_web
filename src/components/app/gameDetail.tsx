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
            {gameInfo.awayStarter.player === null ? "未公布" : <PlayerCard id={gameInfo.awayStarter.id} playerType="pitcher"/>}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
            主隊先發
          </span>
          <span className="text-sm font-medium">
            {gameInfo.homeStarter.player === null ? "未公布" : <PlayerCard id={gameInfo.homeStarter.id} playerType="pitcher"/>}
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
                {gameLive.onField.nowPitcher.player === null ? "無" : 
                  <PlayerCard id={gameLive.onField.nowPitcher.id} playerType="pitcher"/> }
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                當前打者
              </span>
              <span className="text-sm font-medium">
                {gameLive.onField.nowBatter.player === null ? "無" : 
                  <PlayerCard id={gameLive.onField.nowBatter.id} playerType="batter"/>}
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
              text-sm border rounded px-1 p-0.5 sm:w-[44px] 
              flex items-center justify-center 
              before:content-['勝'] sm:before:content-['勝投']`}>
            </span>
            <span className="text-sm font-medium">
              {gameEnd.winPitcher.player === null ? "無" : 
                <PlayerCard id={gameEnd.winPitcher.id} playerType="w/lPitcher" />
              }
            </span>
          </div>
          <div className={`
              flex justify-between items-center
              ${gameEnd.savePitcher.id === null ? "hidden" : ""}
            `}>
            <span className={`
              text-sm border rounded px-1 p-0.5 sm:w-[44px]
              flex items-center justify-center 
              before:content-['救'] sm:before:content-['救援']`}>
            </span>
            <span className="text-sm font-medium">
              {gameEnd.savePitcher.player === null ? "無" : 
                <PlayerCard id={gameEnd.savePitcher.id} playerType="savePitcher" />
              }
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className={`
              text-sm border rounded px-1 p-0.5 sm:w-[44px] 
              flex items-center justify-center 
              before:content-['敗'] sm:before:content-['敗投']`}>
            </span>
            <span className="text-sm font-medium">
              {gameEnd.losePitcher.player === null ? "無" : 
                <PlayerCard id={gameEnd.losePitcher.id} playerType="w/lPitcher" />
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export { readyPlay, inPlaying, gameSet };