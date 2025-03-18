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
      return "";
  }
};

const TimeDecoder = (time: string) => {
  return new Date(time).toLocaleString();
}

export function GameCard({
  id,
  type,
  home,
  away,
  time,
  location,
}: Props) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
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
          `}
          href="/"
        >
          詳情
        </Link>
      </CardFooter>
    </Card>
  );
}
