"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TeamHoverCard } from "@/components/app/teamHoverCard";
import { BaseBallOut } from "@/components/app/baseBallOut";
import { readyPlay, inPlaying, gameSet } from "@/components/app/gameDetail";
import { GameData } from "@/types/gameData";
import { GameType, GameStatus, GameColor, GameLocation, TeamColor, TimeDecoder } from "@/utils/gameUtils";

type Props = Readonly<{
  gameData?: GameData;
}>;

export function GameCard({ gameData }: Props) {
  if (!gameData) {
    return (
      <Card className="w-[400px] sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[850px] 2xl:w-[900px] py-6">
        <CardHeader>
          <div className="text-center text-gray-500">載入中...</div>
        </CardHeader>
      </Card>
    );
  }

  const { gameInfo, gameLive, gameEnd } = gameData;
  const [isOpen, setIsOpen] = useState(false);

  if (!gameInfo || !gameLive) {
    return (
      <Card className="w-[400px] sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[850px] 2xl:w-[900px] py-6">
        <CardHeader>
          <div className="text-center text-gray-500">資料載入失敗</div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-[400px] sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[850px] 2xl:w-[900px] py-6 gap-0.5">
      <CardHeader>
        <div className="flex justify-between items-center text-sm mb-2">
          <p
            className={`
            border rounded-sm w-[64px] py-1 font-bold shadow-sm
            ${GameColor(gameLive.status)} text-center
            `}
          >
            {gameInfo.id !== null ? gameInfo.id : "TBD"}
          </p>
          <p className="font-bold">
            {GameStatus(gameLive.status) !== "比賽中"
              ? GameStatus(gameLive.status)
              : gameLive.inning + " " + (gameLive.inningHalf === 1 ? "上" : "下")}
          </p>
          <p>{GameType(gameInfo.type)}</p>
        </div>
        <CardTitle className="flex flex-row text-2xl justify-between select-none">
          <div className="flex flex-col w-full h-[88px] justify-end">
            <div className="flex items-center">
              <span className={`
                ${TeamColor(gameInfo.away)} font-bold
                hover:scale-105 transition-transform duration-400 ease-in-out
              `}>
                {gameInfo.away ? <TeamHoverCard team={gameInfo.away} /> : "TBD"}
              </span>
            </div>
            <div className="flex items-center">
              <span className={`
                ${TeamColor(gameInfo.home)} font-bold
                hover:scale-105 transition-transform duration-400 ease-in-out
              `}>
                {gameInfo.home ? <TeamHoverCard team={gameInfo.home} /> : "TBD"}
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full items-end justify-center">
            <span>
              {gameLive.away.runs !== null ? (
                <div>
                  <table>
                    <thead>
                      <tr className="flex flex-row gap-1 mb-1 items-center text-gray-500">
                        <th className="text-sm w-5 text-center font-normal">
                          R
                        </th>
                        <th className="text-sm w-5 text-center font-normal">
                          H
                        </th>
                        <th className="text-sm w-5 text-center font-normal">
                          E
                        </th>
                      </tr>
                    </thead>
                    <tbody className="flex flex-col gap-1">
                      <tr className="flex flex-row gap-1 items-center">
                        <td className="w-5 text-lg text-center font-black">
                          {gameLive.away.runs}
                        </td>
                        <td className="w-5 text-lg text-center font-medium">
                          {gameLive.away.hits}
                        </td>
                        <td className="w-5 text-lg text-center font-medium">
                          {gameLive.away.errors}
                        </td>
                      </tr>
                      <tr className="flex flex-row gap-1 items-center">
                        <td className="w-5 text-lg text-center font-black">
                          {gameLive.home.runs}
                        </td>
                        <td className="w-5 text-lg text-center font-medium">
                          {gameLive.home.hits}
                        </td>
                        <td className="w-5 text-lg text-center font-medium">
                          {gameLive.home.errors}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div>
                  <table>
                    <thead>
                      <tr className="flex flex-row gap-2 mb-1 items-center text-gray-500">
                        <th className="text-sm w-5 text-center font-normal">
                          W
                        </th>
                        <th className="text-sm w-5 text-center font-normal">
                          L
                        </th>
                        <th className="text-sm w-5 text-center font-normal">
                          D
                        </th>
                      </tr>
                    </thead>
                    <tbody className="flex flex-col gap-1">
                      <tr className="flex flex-row gap-2 items-center dark:text-gray-400 text-gray-500">
                        <td className="w-5 text-lg text-center font-medium">
                          {gameInfo.awayWLD.wins}
                        </td>
                        <td className="w-5 text-lg text-center font-medium">
                          {gameInfo.awayWLD.losses}
                        </td>
                        <td className="w-5 text-lg text-center font-medium">
                          {gameInfo.awayWLD.draws}
                        </td>
                      </tr>
                      <tr className="flex flex-row gap-2 items-center dark:text-gray-400 text-gray-500">
                        <td className="w-5 text-lg text-center font-medium">
                          {gameInfo.homeWLD.wins}
                        </td>
                        <td className="w-5 text-lg text-center font-medium">
                          {gameInfo.homeWLD.losses}
                        </td>
                        <td className="w-5 text-lg text-center font-medium">
                          {gameInfo.homeWLD.draws}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </span>
          </div>
          <div
            className={`${
              GameStatus(gameLive.status) !== "比賽中" ? "hidden" : ""
            } border-l pl-2 ml-4`}
          >
            <BaseBallOut base={gameLive.base} strike={gameLive.balls.strike} ball={gameLive.balls.ball} out={gameLive.balls.out} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between mt-4">
        <p className="flex flex-row gap-2">
          <MapPin />
          {gameInfo.location ? GameLocation(gameInfo.location)["zh-tw"]: "TBD"}
        <span
          className={`
            ${gameLive.status == 2 ? "hidden" : ""} 
            ${gameLive.status == 3 ? "hidden" : ""}
            ${gameLive.status == 8 ? "hidden" : ""}
            font-medium border-l px-2
          `}
        >
          {gameInfo.time ? TimeDecoder(gameInfo.time) : "TBD"}
        </span>
        </p>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 bg-gray-800 dark:bg-gray-200"
          aria-expanded={isOpen}
          data-card-id={gameInfo.id}
        >
          {isOpen ? "收起" : "更多"}
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </CardFooter>
      <div
        className={`
          overflow-x-auto transition-all duration-350 ease-in-out no-scrollbar
          ${isOpen ? "max-h-[512px] opacity-100 mt-2" : "max-h-0 opacity-0"}
        `}
        id={`expanded-content-${gameInfo.id}`}
      >
        <div className="px-6 pt-6 rounded-b-lg border-t">
          {gameLive.status === 1 ? readyPlay(gameInfo) : null}
          {gameLive.status === 4 ? readyPlay(gameInfo) : null}
          {gameLive.status === 2 ? inPlaying(gameLive) : null}
          {gameLive.status === 3
            ? gameSet(gameLive.scoreboard, gameEnd)
            : null}
        </div>
      </div>
    </Card>
  );
}
