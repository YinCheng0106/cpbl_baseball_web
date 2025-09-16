"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TeamHoverCard } from "@/components/app/teamHoverCard";
import { BaseBallOut } from "@/components/app/baseBallOut";
import { readyPlay, inPlaying, gameSet } from "@/components/app/gameDetail";
import { Game } from "@/types/gameData";
import { Team } from "@/types/teamData";
import { PlayerData } from "@/types/playerData";

import {
  GameType,
  GameStatus,
  GameColor,
  Stadium,
  TeamColor,
  TimeDecoder,
} from "@/utils/gameUtils";

type Props = Readonly<{
  gameData: Game;
  teamData: Team[];
  playerData: PlayerData[];
}>;

export function GameCard({ gameData, teamData, playerData }: Props) {
  if (!gameData) {
    return (
      <Card className="w-[400px] sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[850px] 2xl:w-[900px] py-6">
        <CardHeader>
          <div className="text-center text-gray-500">載入中...</div>
        </CardHeader>
      </Card>
    );
  }
  const [isOpen, setIsOpen] = useState(false);
  const gameLive = gameData.game_live ? gameData.game_live[0] : null;

  const TeamWLDRow = ({ teamId, season }: { teamId: number, season: string }) => {
    const t: any = teamData.find((team) => team.id === teamId)?.team_stats?.find((stats) => stats.year === gameData.year && stats.season === season) || ({});
    return (
      <tr className="flex flex-row gap-2 items-center dark:text-gray-400 text-gray-500">
        <td className="w-5 text-lg text-center font-medium">
          {t?.wins ?? "-"}
        </td>
        <td className="w-5 text-lg text-center font-medium">
          {t?.losses ?? "-"}
        </td>
        <td className="w-5 text-lg text-center font-medium">
          {t?.draws ?? "-"}
        </td>
      </tr>
    );
  };

  if (!gameData.gameId || !gameLive) {
    return (
      <Card className="w-[400px] sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[850px] 2xl:w-[900px] py-6">
        <CardHeader>
          <div className="text-center text-gray-500">資料載入失敗</div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card
      className={`
      w-[350px] sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[850px] 2xl:w-[900px] 
      py-6 gap-0.5
    `}
    >
      <CardHeader>
        <div className="flex justify-between items-center text-sm mb-2">
          <p
            className={`
            border rounded-sm w-[64px] py-1 font-bold shadow-sm
            ${GameColor(gameLive.status || 1)} text-center
            `}
          >
            {gameData.id !== null ? gameData.gameNo : "TBD"}
          </p>
          <p className="font-bold">
            {GameStatus(gameLive.status || 1) !== "比賽中"
              ? GameStatus(gameLive.status || 1)
              : gameLive.inning +
                " " +
                (gameLive.inningHalf === 0 ? "上" : "下")}
          </p>
          <p>{GameType(gameData.type)}</p>
        </div>
        <CardTitle className="flex flex-row text-2xl justify-between select-none">
          <div className="flex flex-col w-full h-[88px] justify-end">
            <div className="flex items-center">
              <span
                className={`
                ${TeamColor(gameData.awayTeam === null ? 0 : gameData.awayTeam.id)} font-bold
                hover:scale-105 transition-transform duration-400 ease-in-out
              `}
              >
                {gameData.awayTeam ? (
                  <TeamHoverCard team={teamData} id={gameData.awayTeam.id} />
                ) : (
                  "TBD"
                )}
              </span>
            </div>
            <div className="flex items-center">
              <span
                className={`
                ${TeamColor(gameData.homeTeam === null ? 0 : gameData.homeTeam.id)} font-bold
                hover:scale-105 transition-transform duration-400 ease-in-out
              `}
              >
                {gameData.homeTeam ? (
                  <TeamHoverCard team={teamData} id={gameData.homeTeam.id} />
                ) : (
                  "TBD"
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full items-end justify-center">
            <span>
              {gameLive?.status !== 1 ? (
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
                          {gameLive.awayRuns}
                        </td>
                        <td className="w-5 text-lg text-center font-medium">
                          {gameLive.awayHits}
                        </td>
                        <td className="w-5 text-lg text-center font-medium">
                          {gameLive.awayErrors}
                        </td>
                      </tr>
                      <tr className="flex flex-row gap-1 items-center">
                        <td className="w-5 text-lg text-center font-black">
                          {gameLive.homeRuns}
                        </td>
                        <td className="w-5 text-lg text-center font-medium">
                          {gameLive.homeHits}
                        </td>
                        <td className="w-5 text-lg text-center font-medium">
                          {gameLive.homeErrors}
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
                      {[gameData.awayTeam?.id, gameData.homeTeam?.id]
                        .map((id) =>
                          typeof id === "string" ? parseInt(id, 10) : id
                        )
                        .filter((id): id is number => Number.isFinite(id))
                        .map((id) => (
                          <TeamWLDRow key={id} teamId={id} season={gameData.gameNo > 60 ? "secondHalf" : "firstHalf"} />
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </span>
          </div>
          <div
            className={`${
              GameStatus(gameLive.status || 0) !== "比賽中" ? "hidden" : ""
            } border-l pl-2 ml-4`}
          >
            <BaseBallOut
              base1={gameLive.base1}
              base2={gameLive.base2}
              base3={gameLive.base3}
              strike={gameLive.strike}
              ball={gameLive.ball}
              out={gameLive.out}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between mt-4">
        <p className="flex flex-row gap-2">
          <MapPin />
          {gameData.location
            ? Stadium(gameData.location).shortName["zh-tw"]
            : "TBD"}
          <span
            className={`
            ${gameLive.status == 2 ? "hidden" : ""}
            ${gameLive.status == 3 ? "hidden" : ""}
            ${gameLive.status == 8 ? "hidden" : ""}
            font-medium border-l px-2
          `}
          >
            {gameData.time ? TimeDecoder(`${gameData.date} ${gameData.time}`) : "TBD"}
          </span>
        </p>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 bg-gray-800 dark:bg-gray-200"
          aria-expanded={isOpen}
          data-card-id={gameData.id}
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
        id={`expanded-content-${gameData.id}`}
      >
        <div className="px-6 pt-6 rounded-b-lg border-t">
          {gameLive.status === 1 ? readyPlay(gameData, playerData) : null}
          {gameLive.status === 4 ? readyPlay(gameData, playerData) : null}
          {gameLive.status === 2 ? inPlaying(gameData, playerData) : null}
          {gameLive.status === 3 || gameData.game_result === null
            ? gameSet(gameData, playerData)
            : null}
        </div>
      </div>
    </Card>
  );
}
