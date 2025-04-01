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

import Skeleton, { SkeletonTheme }  from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const teamsStanding = [
  { 
    id: 0,
    rank: 2,
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
    rank: 1,
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
    rank: 3,
    name: "台鋼雄鷹",
    games: 1,
    win: 0,
    lose: 1,
    tie: 0,
    winRate: 0,
    gameBehind: 1.5,
    streak: "敗1",
  },
  { 
    id: 4,
    rank: 4,
    name: "樂天桃猿",
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
    <div className={`
      w-[360px] sm:-[420px] md:w-[420px] lg:w-[600px] max-w-2xl 
    `}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-black">排名</TableHead>
            <TableHead className="text-center font-black">球隊</TableHead>
            <TableHead className="text-center font-black">出賽數</TableHead>
            <TableHead className="text-center font-black">勝-敗-和</TableHead>
            <TableHead className="text-center font-black">勝率</TableHead>
            <TableHead className="text-center font-black">勝差</TableHead>
            <TableHead className="text-center font-black">連勝/連敗</TableHead>
          </TableRow>
        </TableHeader>
        <SkeletonTheme baseColor="dark:#202020" highlightColor="#444">
        <TableBody>
            {teams.sort((a, b) => a.rank - b.rank).map((team: any) => (
            <TableRow key={team.id}>
              <TableCell className="text-center font-bold">{team.rank !== null ? team.rank : <Skeleton />}</TableCell>
              <TableCell className="text-center font-bold">{team.name !== null ? team.name : <Skeleton />}</TableCell>
              <TableCell className="text-center">{team.games !== null ? team.games : <Skeleton />}</TableCell>
              <TableCell className="text-center">{ team.win !== null ? `${team.win}-${team.lose}-${team.tie}` : <Skeleton />}</TableCell>
              <TableCell className="text-center">{team.winRate !== null ? team.winRate : <Skeleton />}</TableCell>
              <TableCell className="text-center">{team.gameBehind !== null ? team.gameBehind : <Skeleton />}</TableCell>
              <TableCell className="text-center">{team.streak !== null ? team.streak : <Skeleton />}</TableCell>
            </TableRow>
            ))}
        </TableBody>
        </SkeletonTheme>
      </Table>
    </div>
  )
}
