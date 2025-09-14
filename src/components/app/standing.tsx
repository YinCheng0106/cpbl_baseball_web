"use client";

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
import { Team, TeamStats } from "@/types/teamData";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const winRate = (wins: number, games: number) => {
  if (games === 0) return 0;
  return parseFloat((wins / games).toFixed(3));
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

interface RankedTeamRow {
  teamId: number;
  teamName: Team["name"];
  games: number;
  win: number;
  lose: number;
  draw: number;
  winRate: number;
  rank: number;
  gameBehind: string | number;
  streak: string | number;
}

const completedRank = (
  teams: Team[],
  year: string,
  season: "firstHalf" | "secondHalf"
): RankedTeamRow[] => {
  if (!teams || teams.length === 0) return [];

  const yearNum = typeof year === "string" ? parseInt(year, 10) : (year as any);

  const teamsWithStats: RankedTeamRow[] = teams.map((team) => {
    let stats: TeamStats | undefined;

    if (Array.isArray(team.teams_stats)) {
      stats = team.teams_stats.find(
        (s) => s.year === yearNum && s.season === season
      );
    } else if (team.teams_stats) {
      const s = team.teams_stats as unknown as TeamStats;
      if (s.year === yearNum && s.season === season) stats = s;
    }

    if (!stats) {
      return {
        teamId: team.id,
        teamName: team.name,
        games: 0,
        win: 0,
        lose: 0,
        draw: 0,
        winRate: 0,
        rank: 0,
        gameBehind: "-",
        streak: "-",
      };
    }

    const win = (stats.homeWins ?? 0) + (stats.awayWins ?? 0);
    const lose = (stats.homeLosses ?? 0) + (stats.awayLosses ?? 0);
    const draw = (stats.homeDraws ?? 0) + (stats.awayDraws ?? 0);
    const games = stats.games ?? win + lose + draw;
    const winRateValue = winRate(win, games);

    return {
      teamId: team.id,
      teamName: team.name,
      games,
      win,
      lose,
      draw,
      winRate: winRateValue,
      rank: 0,
      gameBehind: "-",
      streak: stats.streak ?? "-",
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
  teams: Team[];
  year: string;
  season: "firstHalf" | "secondHalf";
};

export function Standing({ teams, year, season }: Props) {
  if (!teams || teams.length === 0) {
    return (
      <div className="w-[360px] sm:-[420px] md:w-[420px] lg:w-[600px] max-w-2xl h-70">
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
  } else {
    const rankedTeams = completedRank(teams, year, season);
    console.table(rankedTeams);
    return (
      <div className="w-[360px] sm:-[420px] md:w-[420px] lg:w-[600px] max-w-2xl h-70">
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
              {rankedTeams.map((team: any) => (
                <TableRow key={team.teamId}>
                  <TableCell className="text-center font-bold">
                    {team.rank ?? <Skeleton />}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {team.teamName ? (
                      <div className="flex items-center justify-center">
                        <img
                          alt={team.teamName["zh-tw"]}
                          height={20}
                          width={20}
                          src={teamToWord(team.teamName["zh-tw"])}
                        />
                      </div>
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {team.games ?? <Skeleton />}
                  </TableCell>
                  <TableCell className="text-center">
                    {team.win !== undefined ? (
                      `${team.win}-${team.draw}-${team.lose}`
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {team.winRate !== undefined ? team.winRate : <Skeleton />}
                  </TableCell>
                  <TableCell className="text-center">
                    {team.gameBehind !== undefined ? (
                      team.gameBehind
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {team.streak !== undefined ? team.streak : <Skeleton />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </SkeletonTheme>
        </Table>
      </div>
    );
  }
}
