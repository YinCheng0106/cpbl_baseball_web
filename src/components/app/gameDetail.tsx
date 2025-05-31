"use client";

import { Scoreboard } from "./scoreboard";
import { MvpCard } from "./mvpCard";

const inPlaying = (
  pitch: number,
  ball: number,
  strike: number,
  out: number,
  nowBatter: string | null,
  nowPitcher: string | null,
  scoreboard: {
    inning: number[];
    homeScores: number[];
    awayScores: number[];
    homeTeam: string;
    awayTeam: string;
    homeRuns: number;
    awayRuns: number;
    homeHits: number;
    awayHits: number;
    homeErrors: number;
    awayErrors: number;
  }
) => {
  return (
    <div>
      <div className="pb-4">
        { Scoreboard(scoreboard) }
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                當前投手
              </span>
              <span className="text-sm font-medium">
                {nowPitcher ? nowPitcher : "無"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                當前打者
              </span>
              <span className="text-sm font-medium">
                {nowBatter ? nowBatter : "無"}
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
                {ball} - {strike}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                出局數
              </span>
              <span className="text-sm font-medium">{out}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
                投球數
              </span>
              <span className="text-sm font-medium">{pitch}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const readyPlay = (awayStarter: string | null, homeStarter: string | null) => {
  return (
    <div className="gird grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
            客隊先發
          </span>
          <span className="text-sm font-medium">
            {awayStarter === null ? "未公布" : awayStarter}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
            主隊先發
          </span>
          <span className="text-sm font-medium">
            {homeStarter === null ? "未公布" : homeStarter}
          </span>
        </div>
      </div>
    </div>
  );
};

const gameSet = (
  scoreboard: {
    inning: number[];
    homeScores: number[];
    awayScores: number[];
    homeTeam: string;
    awayTeam: string;
    homeRuns: number;
    awayRuns: number;
    homeHits: number;
    awayHits: number;
    homeErrors: number;
    awayErrors: number;
  },
  winPitcher: string | null,
  losePitcher: string | null,
  savePitcher: string | null,
  mvp: string | null,
  mvpData: {
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
  },
) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid xl:grid-cols-2 xl:items-center gap-4">
        <div>{ Scoreboard(scoreboard) }</div>
        <div>{ MvpCard(mvpData) }</div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
              勝利投手
            </span>
            <span className="text-sm font-medium">
              {winPitcher === null ? "無" : winPitcher}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
              救援成功
            </span>
            <span className="text-sm font-medium">
              {savePitcher === null ? "無" : savePitcher}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
              敗戰投手
            </span>
            <span className="text-sm font-medium">
              {losePitcher === null ? "無" : losePitcher}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">
              MVP
            </span>
            <span className="text-sm font-medium">
              {mvp === null ? "無" : mvp}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


export { readyPlay, inPlaying, gameSet };