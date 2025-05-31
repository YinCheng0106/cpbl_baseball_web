"use client";
import { useEffect, useRef } from "react";

import { teamToWord } from "@/components/app/teamLogo";

type Props = Readonly<{
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
}>;

export function Scoreboard({
  inning,
  homeScores,
  awayScores,
  homeTeam,
  awayTeam,
  homeRuns,
  awayRuns,
  homeHits,
  awayHits,
  homeErrors,
  awayErrors,
} : Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, []);
  return (
    <div className="flex flex-row shadow-md rounded-lg dark:bg-zinc-800 bg-zinc-100 p-2">
      <div className="flex flex-row flex-1">
        <div className="flex-shrink-0">
          <table className="text-sm text-center">
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
                      src={teamToWord(awayTeam)}
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
                      src={teamToWord(homeTeam)}
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
              <tr className="items-center">
                {inning.map((inning) => (
                  <th
                    scope="col"
                    key={inning}
                    className="px-1 py-1 text-center md:min-w-[24px] min-w-[16px]"
                  >
                    <div className="md:w-6 w-4">{inning}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-500">
              <tr className="items-center">
                {awayScores.map((runs, index) => (
                  <td key={index} className="px-1 py-1 text-center">
                    <div className="md:w-6 w-4">{runs}</div>
                  </td>
                ))}
              </tr>
              <tr className="items-center">
                {homeScores.map((runs, index) => (
                  <td key={index} className="px-1 py-1 text-center">
                    <div className="md:w-6 w-4">{runs}</div>
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
          <thead className="text-xs">
            <tr>
              <th className="py-1 w-4">R</th>
              <th className="py-1 w-4">H</th>
              <th className="py-1 w-4">E</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-1 py-1">
                <div className="w-4 font-bold">{awayRuns}</div>
              </td>
              <td className="px-1 py-1">
                <div className="w-4">{awayHits}</div>
              </td>
              <td className="px-1 py-1">
                <div className="w-4">{awayErrors}</div>
              </td>
            </tr>
            <tr>
              <td className="px-1 py-1">
                <div className="w-4 font-bold">{homeRuns}</div>
              </td>
              <td className="px-1 py-1">
                <div className="w-4">{homeHits}</div>
              </td>
              <td className="px-1 py-1">
                <div className="w-4">{homeErrors}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
