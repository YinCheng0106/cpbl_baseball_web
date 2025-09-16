"use client";

import { Scoreboard } from "@/components/app/scoreboard";
import { MvpCard } from "@/components/app/mvpCard";
import { PlayerCard } from "@/components/app/playerCard";


import { Game } from "@/types/gameData";
import { PlayerData } from "@/types/playerData";

const readyPlay = (game : Game, playerData: PlayerData[]) => {
  return (
    <div className="gird grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
            客隊先發
          </span>
          <span className="text-sm font-medium">
            {game.awayStarter === null ? "未公布" : <PlayerCard playerData={playerData} id={game.awayStarter.id} playerType="pitcher"/>}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
            主隊先發
          </span>
          <span className="text-sm font-medium">
            {game.homeStarter === null ? "未公布" : <PlayerCard playerData={playerData} id={game.homeStarter.id} playerType="pitcher"/>}
          </span>
        </div>
      </div>
    </div>
  );
};

const inPlaying = (
  game: Game,
  playerData: PlayerData[],
) => {
  const gameLive = game.game_live ? game.game_live[0] : null;
  if (!gameLive) {
    return <div>無比賽進行資訊</div>;
  }
  return (
      <div>
        <div className="pb-4">
          <Scoreboard game={game} scoreboard={game.game_scores} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                  當前投手
                </span>
                <span className="text-sm font-medium">
                  {gameLive.nowPitcher === null ? "無" : 
                    <PlayerCard playerData={playerData} id={gameLive.nowPitcher.id} playerType="pitcher"/> }
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                  當前打者
                </span>
                <span className="text-sm font-medium">
                  {gameLive.nowBatter === null ? "無" : 
                    <PlayerCard playerData={playerData} id={gameLive.nowBatter.id} playerType="batter"/>}
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
                  {gameLive.ball} - {gameLive.strike}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                  出局數
                </span>
                <span className="text-sm font-medium">{gameLive.out}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                  投球數
                </span>
                <span className="text-sm font-medium">{gameLive.pitch}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

const gameSet = (
  game: Game,
  playerData: PlayerData[],
) => {
  const gameResult = game.game_result ? game.game_result[0] : null;
  if(gameResult === null) {
    return <div>無比賽結果</div>;
  } else {
    return (
      <div className="flex flex-col gap-4">
        <div className={`
          grid ${gameResult.mvp === null ? "xl:grid-cols-1" : "xl:grid-cols-2"}
          xl:items-center gap-4
        `}>
          <div><Scoreboard game={game} scoreboard={game.game_scores}/></div>
          <div className={`${gameResult.mvp === null ? "hidden" : ""}`}><MvpCard game={ gameResult }/></div>
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
                {gameResult.winPitcher === null ? "無" : 
                  <PlayerCard playerData={playerData} id={gameResult.winPitcher.id} playerType="w/lPitcher" />
                }
              </span>
            </div>
            <div className={`
                flex justify-between items-center
                ${gameResult.savePitcher === null ? "hidden" : ""}
              `}>
              <span className={`
                text-sm border rounded px-1 p-0.5 sm:w-[44px]
                flex items-center justify-center 
                before:content-['救'] sm:before:content-['救援']`}>
              </span>
              <span className="text-sm font-medium">
                {gameResult.savePitcher === null ? "無" : 
                  <PlayerCard playerData={playerData} id={gameResult.savePitcher.id} playerType="savePitcher" />
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
                {gameResult.losePitcher === null ? "無" : 
                  <PlayerCard playerData={playerData} id={gameResult.losePitcher.id} playerType="w/lPitcher" />
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


export { readyPlay, inPlaying, gameSet };