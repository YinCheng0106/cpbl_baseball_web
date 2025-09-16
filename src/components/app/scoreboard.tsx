"use client";
import { useEffect, useRef } from "react";

import { teamToWord } from "@/utils/teamUtils";
import { Game, GameScore } from "@/types/gameData";

type Props = Readonly<{
  game: Game;
  scoreboard: GameScore[];
}>;

export function Scoreboard({ game, scoreboard } : Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, []);

  const innings = Math.max(9, Math.max(...scoreboard.map(s => s.inning)));
  const displayBoard = Array.from({ length: innings }, (_, i) => {
    const inning = i + 1;
    return scoreboard.find(s => s.inning === inning) ?? { inning, awayScore: null, homeScore: null };
  });


  const sumAwayRuns = scoreboard.reduce((sum, inning) => sum + (inning.awayScore ?? 0), 0);
  const sumHomeRuns = scoreboard.reduce((sum, inning) => sum + (inning.homeScore ?? 0), 0);
  const sumAwayHits = scoreboard.reduce((sum, inning) => sum + (inning.awayHits ?? 0), 0);
  const sumHomeHits = scoreboard.reduce((sum, inning) => sum + (inning.homeHits ?? 0), 0);
  const sumAwayErrors = scoreboard.reduce((sum, inning) => sum + (inning.awayErrors ?? 0), 0);
  const sumHomeErrors = scoreboard.reduce((sum, inning) => sum + (inning.homeErrors ?? 0), 0);

  return (
    <div className="flex flex-row shadow-md rounded-lg dark:bg-zinc-800 bg-zinc-100 p-2">
      <div className="flex flex-row flex-1">
        <div className="flex-shrink-0">
          <table className="text-sm text-center select-none">
            <thead className="text-xs">
              <tr>
                <th scope="row" className="py-1 w-12">
                  <br />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="items-center">
                <th scope="row">
                  <div className="flex items-center justify-center">
                    <img
                      src={teamToWord(game.awayTeam === null ? 0 : game.awayTeam.id)}
                      width={30}
                      height={30}
                      alt="客隊"
                    />
                  </div>
                </th>
              </tr>
              <tr className="items-center">
                <th scope="row">
                  <div className="flex items-center justify-center">
                    <img
                      src={teamToWord(game.homeTeam === null ? 0 : game.homeTeam.id)}
                      width={30}
                      height={30}
                      alt="主隊"
                    />
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-x-auto no-scrollbar"
        >
          <table className="w-full text-sm text-center">
            <thead className="text-xs">
              <tr className="items-center select-none">
              {displayBoard.map((item) => (
                <th
                scope="col"
                key={`inning-${item.inning}`}
                className="px-1 py-1 text-center md:min-w-[24px] min-w-[16px]"
                >
                <div className="md:w-6 w-4">{item.inning}</div>
                </th>
              ))}
              </tr>
            </thead>
            <tbody className="text-gray-500">
              <tr className="items-center">
                {displayBoard.map((item) => (
                  <td key={`away-${item.inning}`} className="px-1 py-1 text-center">
                    <div className="md:w-6 w-4">{item.awayScore ?? ""}</div>
                  </td>
                ))}
              </tr>
              <tr className="items-center">
                {displayBoard.map((item, idx) => (
                  <td key={`home-${item.inning}`} className="px-1 py-1 text-center">
                    <div className="md:w-6 w-4">
                      {item.homeScore !== null ? item.homeScore : (idx === displayBoard.length ? "X" : "")}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* RHE table */}
      <div className="ml-1">
        <table className="text-sm text-center">
          <thead className="text-xs select-none">
            <tr>
              <th className="py-1 w-4">R</th>
              <th className="py-1 w-4">H</th>
              <th className="py-1 w-4">E</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-1 py-1">
                <div className="w-4 font-bold">{sumAwayRuns}</div>
              </td>
              <td className="px-1 py-1">
                <div className="w-4">{sumAwayHits}</div>
              </td>
              <td className="px-1 py-1">
                <div className="w-4">{sumAwayErrors}</div>
              </td>
            </tr>
            <tr>
              <td className="px-1 py-1">
                <div className="w-4 font-bold">{sumHomeRuns}</div>
              </td>
              <td className="px-1 py-1">
                <div className="w-4">{sumHomeHits}</div>
              </td>
              <td className="px-1 py-1">
                <div className="w-4">{sumHomeErrors}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
