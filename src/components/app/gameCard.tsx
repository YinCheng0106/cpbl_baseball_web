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
  inning: number | null;
  inningHalf: number | null;
  away: string;
  home: string;
  awayScore: number | null;
  homeScore: number | null;
  awayWLD: [number, number, number],
  homeWLD: [number, number, number],
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
};

const GameStatus = (status: number) => {
  switch (status) {
    case 1:
      return "如果必要才進行";
    case 2:
      return "比賽中";
    case 3:
      return "比賽結束";
    case 4:
      return "先發打序";
    case 5:
      return "取消比賽";
    case 6:
      return "延賽";
    case 7:
      return "保留比賽";
    case 8:
      return "比賽暫停";
    default:
      return "例外狀況";
  }
};

const GameColor = (status: number) => {
  switch (status) {
    case 1:
      return "bg-gray-200 text-gray-800";
    case 2:
      return "bg-green-200 text-green-800";
    case 3:
      return "bg-red-800 text-red-200";
    case 4:
      return "bg-blue-200 text-blue-800";
    case 5:
      return "bg-red-200 text-red-800";
    case 6:
      return "bg-yellow-200 text-yellow-800";
    case 7:
      return "bg-gray-200 text-gray-800";
    case 8:
      return "bg-gray-800 text-gray-200";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

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
};

const TimeDecoder = (time: string) => {
  return new Date(time).toLocaleString("zh-TW", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const TeamNameAbbreviation = (name: string) => {
  switch (name) {
    case "樂天桃猿":
      return "桃猿";
    case "富邦悍將":
      return "悍將";
    case "中信兄弟":
      return "象";
    case "統一獅":
      return "獅";
    case "台鋼雄鷹":
      return "鷹";
    case "味全龍":
      return "龍";
    default:
      return name;
  }
};

export function GameCard({
  id,
  type,
  status,
  inning,
  inningHalf,
  away,
  home,
  awayScore,
  homeScore,
  awayWLD,
  homeWLD,
  time,
  location,
}: Props) {
  return (
    <Card className="w-[325px] py-6 gap-0.5">
      <CardHeader>
        <div className="flex justify-between items-center text-sm mb-2">
          <p
            className={`
            border rounded-sm px-6 py-1 font-bold shadow-sm
            ${GameColor(status)}
            `}
          >
            {id}
          </p>
          <p className="font-bold">{GameStatus(status) !== "比賽中" ? GameStatus(status) : (inning + " " + (inningHalf === 1 ? "上" : "下"))}</p>
          <p>{GameType(type)}</p>
        </div>
        <CardTitle className="flex flex-col gap-0.5 text-2xl">
          <div className="flex justify-between items-center">
            <span className={`${TeamColor(away)} font-bold`}>
              {away ? away : "TBD"}
            </span>
            <span className={`px-2 py-1 text-lg ${awayScore !== null ? "" : "text-gray-500"}`}>
              {awayScore !== null ? awayScore : `${awayWLD[0]}-${awayWLD[1]}-${awayWLD[2]}`}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`${TeamColor(home)} font-bold`}>
              {home ? home : "TBD"}
            </span>
            <span className={`px-2 py-1 text-lg ${homeScore !== null ? "" : "text-gray-500"}`}>
              {homeScore !== null ? homeScore : `${homeWLD[0]}-${homeWLD[1]}-${homeWLD[2]}`}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
        <p className="flex flex-row gap-2 items-center">
          <MapPin />
          {location ? location : "TBD"} 
          <span
            className={`
            ${status == 2 ? "hidden" : ""} 
            ${status == 3 ? "hidden" : ""}
            ${status == 8 ? "hidden" : ""}
            `}
          >
            {time ? TimeDecoder(time) : "TBD"}
          </span>
        </p>
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
