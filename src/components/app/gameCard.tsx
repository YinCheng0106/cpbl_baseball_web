import Link from "next/link";

import { Button } from "@/components/ui/button";
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
  home: string;
  away: string;
  date: string;
  time: string;
  location: string;
}>;

export function GameCard({ id, home, away, date, time, location }: Props) {
  return (
    <Card className="w-[350px] h-[200px]">
      <CardHeader>
        <CardTitle>
          {away} vs. {home}
        </CardTitle>
        <CardDescription>比賽編號: {id}</CardDescription>
      </CardHeader>
      <CardContent>
        <span>{date}</span>
        <span> {time}</span>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>{location}</p>
        <Link
          className={`
            border rounded p-2
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
