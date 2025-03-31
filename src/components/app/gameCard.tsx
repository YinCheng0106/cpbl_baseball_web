"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TeamHoverCard } from "@/components/app/teamHoverCard";

type Props = Readonly<{
  id: number;
  type: string;
  status: number;

  inning: number | null;
  inningHalf: number | null;

  away: string;
  home: string;
  awayStarter: string | null;
  homeStarter: string | null;
  awayScore: number | null;
  homeScore: number | null;
  awayWLD: [number, number, number];
  homeWLD: [number, number, number];

  winPitcher: string | null;
  losePitcher: string | null;
  savePitcher: string | null;
  mvp: string | null;

  strike: number;
  ball: number;
  out: number;
  pitch: number;
  base: [boolean, boolean, boolean];

  time: string;
  location: string;
}>;

const GameType = (type: string) => {
  switch (type) {
    case "A":
      return "一軍例行賽";
    case "B":
      return "明星賽";
    case "C":
      return "一軍總冠軍賽";
    case "D":
      return "二軍例行賽";
    case "E":
      return "一軍季後挑戰賽";
    case "F":
      return "二軍總冠軍賽";
    case "G":
      return "熱身賽";
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

export function TeamColor (name: string) {
  switch (name) {
    case "樂天桃猿":
      return "text-red-900";
    case "富邦悍將":
      return "text-blue-800";
    case "中信兄弟":
      return "text-amber-300";
    case "統一獅":
      return "text-orange-500";
    case "統一7-ELEVEn獅":
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

const BaseStatus = (base: [boolean, boolean, boolean]) => {
  return (
    <svg
      className="w-[180px] h-[100px] dark:stroke-white fill-gray-400 dark:fill-gray-800"
      viewBox="0 -10 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* first base */}
      <polygon
      points="70,50 80,40 70,30 60,40"
      fill={base[0] ? "#FFD700" : "white"}
      strokeWidth="1.5"
      className={
        base[0]
        ? "dark:fill-yellow-400 dark:stroke-white stroke-gray-400"
        : "dark:fill-gray-800 dark:stroke-white stroke-gray-400"
      }
      />
      {/* second base */}
      <polygon
      points="50,30 60,20 50,10 40,20"
      fill={base[1] ? "#FFD700" : "white"}
      strokeWidth="1.5"
      className={
        base[1]
        ? "dark:fill-yellow-400 dark:stroke-white stroke-gray-400"
        : "dark:fill-gray-800 dark:stroke-white stroke-gray-400"
      }
      />
      {/* third base */}
      <polygon
      points="30,50 40,40 30,30 20,40"
      fill={base[2] ? "#FFD700" : "white"}
      strokeWidth="1.5"
      className={
        base[2]
        ? "dark:fill-yellow-400 dark:stroke-white stroke-gray-400"
        : "dark:fill-gray-800 dark:stroke-white stroke-gray-400"
      }
      />
    </svg>
  );
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

// dropdown content
const inPlaying = (
  base: [boolean, boolean, boolean],
  pitch: number,
  ball: number,
  strike: number,
  out: number
) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">{BaseStatus(base)}</div>
          <div className="flex justify-between items-center"></div>
        </div>
      </div>
      <div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">好壞球</span>
            <span className="text-sm font-medium">
              {ball} - {strike}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">出局數</span>
            <span className="text-sm font-medium">{out}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">投球數</span>
            <span className="text-sm font-medium">{pitch}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const readyPlay = (awayStarter: string | null, homeStarter: string | null) => {
  return (
    <div className="gird grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">客隊先發</span>
          <span className="text-sm font-medium">
            {awayStarter === null ? "未公布" : awayStarter}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">主隊先發</span>
          <span className="text-sm font-medium">
            {homeStarter === null ? "未公布" : homeStarter}
          </span>
        </div>
      </div>
    </div>
  );
};
const gameSet = (winPitcher: string | null, losePitcher: string | null, savePitcher: string | null, mvp: string | null) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">勝利投手</span>
          <span className="text-sm font-medium">{winPitcher === null ? "無" : winPitcher}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">救援成功</span>
          <span className="text-sm font-medium">{savePitcher === null ? "無" : savePitcher}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">敗戰投手</span>
          <span className="text-sm font-medium">{losePitcher === null ? "無" : losePitcher}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm border rounded py-0.5 w-[64px] flex items-center justify-center">MVP</span>
          <span className="text-sm font-medium">{mvp === null ? "無" : mvp}</span>
        </div>
      </div>
    </div>
  )
}

export function GameCard({
  id,
  type,
  status,
  inning,
  inningHalf,
  away,
  home,
  awayStarter,
  homeStarter,
  awayScore,
  homeScore,
  awayWLD,
  homeWLD,
  winPitcher,
  losePitcher,
  savePitcher,
  mvp,
  strike,
  ball,
  out,
  pitch,
  base,
  time,
  location,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="w-[350px] lg:w-[325px] md:w-[300px] py-6 gap-0.5">
      <CardHeader>
        <div className="flex justify-between items-center text-sm mb-2">
          <p
            className={`
            border rounded-sm w-[64px] py-1 font-bold shadow-sm
            ${GameColor(status)} text-center
            `}
          >
            {id !== null ? id : "TBD"}
          </p>
          <p className="font-bold">
            {GameStatus(status) !== "比賽中"
              ? GameStatus(status)
              : inning + " " + (inningHalf === 1 ? "上" : "下")}
          </p>
          <p>{GameType(type)}</p>
        </div>
        <CardTitle className="flex flex-col gap-0.5 text-2xl">
          <div className="flex justify-between items-center">
            <span className={`${TeamColor(away)} font-bold`}>
              {away ? <TeamHoverCard team={away}/> : "TBD"}
            </span>
            <span
              className={`px-2 py-1 text-lg ${
                awayScore !== null ? "" : "text-gray-500"
              }`}
            >
              {awayScore !== null
                ? awayScore
                : `${awayWLD[0]}-${awayWLD[1]}-${awayWLD[2]}`}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`${TeamColor(home)} font-bold`}>
              {home ? <TeamHoverCard team={home}/> : "TBD"}
            </span>
            <span
              className={`px-2 py-1 text-lg ${
                homeScore !== null ? "" : "text-gray-500"
              }`}
            >
              {homeScore !== null
                ? homeScore
                : `${homeWLD[0]}-${homeWLD[1]}-${homeWLD[2]}`}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
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
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1"
          aria-expanded={isOpen}
          data-card-id={id}
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
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0"}
        `}
        id={`expanded-content-${id}`}
      >
        <div className="px-6 pt-6 rounded-b-lg border-t">
          {status === 1 ? readyPlay(awayStarter, homeStarter) : null}
          {status === 4 ? readyPlay(awayStarter, homeStarter) : null}
          {status === 2 ? inPlaying(base, pitch, ball, strike, out) : null}
          {status === 3 ? gameSet(winPitcher, losePitcher, savePitcher, mvp) : null}
        </div>
      </div>
    </Card>
  );
}

// Add this at the top of your file, right after "use client"
