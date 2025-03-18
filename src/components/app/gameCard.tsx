"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = Readonly<{
  id: number;
  type: string;
  status: number;
  home: string;
  away: string;
  time: string;
  location: string;
}>;

const GameType = (type: string) => {
  switch (type) {
    case "A":
      return "一軍例行賽";
    case "B":
      return "一軍明星賽";
    case "C":
      return "一軍總冠軍賽";
    case "D":
      return "二軍例行賽";
    case "E":
      return "一軍季後挑戰賽";
    case "F":
      return "二軍總冠軍賽";
    case "G":
      return "一軍熱身賽";
    case "H":
      return "未來之星邀請賽";
    default:
      return "其他賽事";
  }
}

const GameStatus = (status: number) => {
  switch (status) {
    case 1: return "如果必要才進行";
    case 2: return "比賽中";
    case 3: return "比賽結束";
    case 4: return "先發打序";
    case 5: return "取消比賽";
    case 6: return "延賽";
    case 7: return "保留比賽";
    case 8: return "比賽暫停";
    default: return "例外狀況";
  }
}

const TimeDecoder = (time: string) => {
  return new Date(time).toLocaleString();
}

export function GameCard({
  id,
  type,
  status,
  home,
  away,
  time,
  location,
}: Props) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <p className="text-sm">{ GameStatus(status) }</p>
        <p className="text-sm">{ GameType(type) }</p>
        <CardTitle className="text-2xl font-bold">
          {away} vs. {home}
        </CardTitle>
        <CardDescription>GAME {id}</CardDescription>
      </CardHeader>
      <CardContent>
        <span>{ TimeDecoder(time) }</span>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="flex"><MapPin/> {location}</p>
        <Link
          className={`
            border rounded-sm p-2
            bg-gray-800 dark:bg-neutral-300
            text-white dark:text-black
            font-bold
          `}
          href="/"
        >
          詳情
        </Link>
      </CardFooter>
    </Card>
  );
}
