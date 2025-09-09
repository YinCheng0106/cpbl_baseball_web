"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { teamToWord } from "@/utils/teamUtils";
import { Team } from "@/types/teamData";
import { supabase } from "@/utils/supabase";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const winRate = (wins: number, loses: number, draws: number = 0) => {
  const totalGames = wins + loses + draws;
  if (totalGames === 0) return 0;
  return parseFloat((wins / (wins + loses + draws)).toFixed(3));
};

const calculateGamesBehind = (
  firstPlaceWins: number,
  firstPlaceLosses: number,
  teamWins: number,
  teamLosses: number
) => {
  const diff = (firstPlaceWins - teamWins + teamLosses - firstPlaceLosses) / 2;
  return diff === 0 ? "-" : diff.toFixed(1);
};

const completedRank = (teamsData: Team[], season: string, year: string) => {
  if (teamsData.length === 0) return [];

  const teamsWithStats = teamsData.map((team) => {
    const seasonData =
      team.stats?.[year as keyof typeof team.stats]?.[
        season as keyof (typeof team.stats)[typeof year]
      ];

    if (!seasonData) {
      return {
        ...team,
        games: 0,
        win: 0,
        lose: 0,
        tie: 0,
        winRate: 0,
        rank: 0,
        gameBehind: "-",
        streak: "-",
      };
    }

    const totalWins = seasonData.wins.home + seasonData.wins.away;
    const totalLosses = seasonData.losses.home + seasonData.losses.away;
    const totalTies = seasonData.draws.home + seasonData.draws.away;
    const totalGames = seasonData.games;
    const calculatedWinRate = winRate(totalWins, totalLosses, totalTies);

    return {
      ...team,
      games: totalGames,
      win: totalWins,
      lose: totalLosses,
      tie: totalTies,
      winRate: calculatedWinRate,
      rank: 0,
      gameBehind: "-",
      streak: "-",
    };
  });

  const sortedTeams = teamsWithStats.sort((a, b) => {
    if (b.winRate !== a.winRate) {
      return b.winRate - a.winRate;
    }
    return b.win - a.win;
  });

  const firstPlace = sortedTeams[0];
  return sortedTeams.map((team, index) => ({
    ...team,
    rank: index + 1,
    gameBehind:
      index === 0
        ? "-"
        : calculateGamesBehind(
            firstPlace.win,
            firstPlace.lose,
            team.win,
            team.lose
          ),
  }));
};

type Props = {
  year: string;
  season: string;
};

export function Standing({ year, season }: Props) {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    setLoading(true);
    async function fetchStanding() {
      const { data: teams, error } = await supabase.from("teams").select();
      if (error) {
        console.error("Error fetching teams:", error);
        setLoading(false);
        return;
      }
      if (teams && teams.length > 0) {
        setTeams(completedRank(teams, season, year));
      }
      setLoading(false);
    }
    fetchStanding();
  }, [year]);

  if (loading) {
    return (
      <div
        className={`
        w-[360px] sm:-[420px] md:w-[420px] lg:w-[600px] max-w-2xl h-70
      `}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-black">排名</TableHead>
              <TableHead className="text-center font-black">球隊</TableHead>
              <TableHead className="text-center font-black">出賽數</TableHead>
              <TableHead className="text-center font-black">勝-和-敗</TableHead>
              <TableHead className="text-center font-black">勝率</TableHead>
              <TableHead className="text-center font-black">勝差</TableHead>
              <TableHead className="text-center font-black">
                連勝/連敗
              </TableHead>
            </TableRow>
          </TableHeader>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <TableBody>
              {Array.from({ length: 6 }, (_, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center font-bold">
                    <Skeleton />
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    <Skeleton />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton />
                  </TableCell>
                  <TableCell className="text-center">
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </SkeletonTheme>
        </Table>
      </div>
    );
  } else
    return (
      <div
        className={`
      w-[360px] sm:-[420px] md:w-[420px] lg:w-[600px] max-w-2xl h-70
    `}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-black">排名</TableHead>
              <TableHead className="text-center font-black">球隊</TableHead>
              <TableHead className="text-center font-black">出賽數</TableHead>
              <TableHead className="text-center font-black">勝-和-敗</TableHead>
              <TableHead className="text-center font-black">勝率</TableHead>
              <TableHead className="text-center font-black">勝差</TableHead>
              <TableHead className="text-center font-black">
                連勝/連敗
              </TableHead>
            </TableRow>
          </TableHeader>
          <SkeletonTheme baseColor="dark:#202020" highlightColor="#444">
            <TableBody>
              {teams.map((team: any) => (
                <TableRow key={team.id}>
                  <TableCell className="text-center font-bold">
                    {team.rank !== null ? team.rank : <Skeleton />}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {team.name !== null ? (
                      <div className="flex items-center justify-center">
                        <img
                          alt={team.name["zh-tw"]}
                          height={20}
                          width={20}
                          src={teamToWord(team.name["zh-tw"])}
                        />
                      </div>
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {team.stats[year][season].games !== null ? (
                      team.stats[year][season].games
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {team.win !== null ? (
                      `${team.win}-${team.tie}-${team.lose}`
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {team.winRate !== null ? team.winRate : <Skeleton />}
                  </TableCell>
                  <TableCell className="text-center">
                    {team.gameBehind !== null ? team.gameBehind : <Skeleton />}
                  </TableCell>
                  <TableCell className="text-center">
                    {team.streak !== null ? team.streak : <Skeleton />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </SkeletonTheme>
        </Table>
      </div>
    );
}
