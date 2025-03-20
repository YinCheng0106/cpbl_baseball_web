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

const GameColor = (status: number) => {
  switch (status) {
    case 1: return 'bg-gray-200 text-gray-800';
    case 2: return 'bg-green-200 text-green-800';
    case 3: return 'bg-red-800 text-red-200';
    case 4: return 'bg-blue-200 text-blue-800';
    case 5: return 'bg-red-200 text-red-800';
    case 6: return 'bg-yellow-200 text-yellow-800';
    case 7: return 'bg-gray-200 text-gray-800';
    case 8: return 'bg-gray-800 text-gray-200';
    default: return "bg-gray-200 text-gray-800";
  }
}

const TeamColor = (name: string) => {
  switch (name) {
    case "樂天桃猿":
      return "text-red-900";
    case "富邦悍將":
      return "text-blue-800";
    case "中信兄弟":
      return "text-amber-300";
    case "統一獅":
      return "text-orange-500";
    case "台鋼雄鷹":
      return "text-emerald-900";
    case "味全龍":
      return "text-red-600";
    default:
      return "text-gray-500";
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
    <Card className="w-[325px]">
      <CardHeader>
        <div className="flex justify-between items-center text-sm mb-2">
          <p className={`
            border rounded-sm px-6 py-1 font-bold shadow-sm
            ${GameColor(status)}
            `}>{id}</p>
          <p className="font-bold">{ GameStatus(status) }</p>
          <p>{ GameType(type) }</p>
        </div>
        <CardTitle className="text-3xl font-bold">
          <span className={`${TeamColor(away)}`}>{away}</span><span className="text-lg mx-0.5" > vs </span><span className={`${TeamColor(home)}`}>{home}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span>{ TimeDecoder(time) }</span>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="flex items-center"><MapPin className="mr-2"/>{location}</p>
        <Link
          className={`
            border rounded-sm p-2
            bg-gray-800 dark:bg-neutral-300
            text-white dark:text-black
            hover:bg-gray-900 dark:hover:bg-neutral-200
            translate duration-150 ease-in-out
            hover:font-bold
          `}
          href="/"
        >
          詳情
        </Link>
      </CardFooter>
    </Card>
  );
}
