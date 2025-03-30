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

const teamsStanding = [
  { 
    id: 0,
    rank: 1,
    name: "中信兄弟",
    games: 2,
    win: 1,
    lose: 1,
    tie: 0,
    winRate: 0.5,
    gameBehind: "1",
    streak: "勝1",
  },
  {
    id: 1,
    rank: 2,
    name: "統一獅",
    games: 2,
    win: 2,
    lose: 0,
    tie: 0,
    winRate: 1,
    gameBehind: "-",
    streak: "勝2",
  },
  { 
    id: 2,
    rank: 3,
    name: "富邦悍將",
    games: 1,
    win: 0,
    lose: 1,
    tie: 0,
    winRate: 0,
    gameBehind: 1.5,
    streak: "敗1",
  },
  { 
    id: 3,
    rank: 4,
    name: "台鋼雄鷹",
    games: 1,
    win: 0,
    lose: 1,
    tie: 0,
    winRate: 0,
    gameBehind: 1.5,
    streak: "敗1",
  },
]

export function Standing({ teams = teamsStanding }: { teams?: typeof teamsStanding }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">排名</TableHead>
            <TableHead className="text-center">球隊</TableHead>
            <TableHead className="text-center">出賽數</TableHead>
            <TableHead className="text-center">勝-敗-和</TableHead>
            <TableHead className="text-center">勝率</TableHead>
            <TableHead className="text-center">勝差</TableHead>
            <TableHead className="text-center">連勝/連敗</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {teams.sort((a, b) => a.rank - b.rank).map((team: any) => (
            <TableRow key={team.id}>
              <TableCell className="text-center font-bold">{team.rank}</TableCell>
              <TableCell className="text-center font-bold">{team.name}</TableCell>
              <TableCell className="text-center">{team.games}</TableCell>
              <TableCell className="text-center">{`${team.win}-${team.lose}-${team.tie}`}</TableCell>
              <TableCell className="text-center">{team.winRate}</TableCell>
              <TableCell className="text-center">{team.gameBehind}</TableCell>
              <TableCell className="text-center">{team.streak}</TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
