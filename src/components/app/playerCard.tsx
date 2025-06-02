"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const playerData = [
  {
    id: "0000006006",
    avatar: "https://www.cpbl.com.tw/files/atts/0L088842980599450491/46德保拉.jpg",
    name: "德寶拉",
    number: 46,
    position: "投手",
    habits: "左投",
    team: "中信兄弟",
    stats: {
      games: 8,
      era: 2.15,
      wins: 5,
      losses: 2,
      strikeouts: 200,
      whip: 0.95,
    }
  }
];

type Props = { id: string | null; }

export function PlayerCard({ id }: Props) {
  const player = playerData.find(p => p.id === id);
  if (!player) {
    return (
      <div className="flex flex-row gap-2 p-4 items-center">
        <div>
          <Avatar>
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-sm">
          <h2 className="font-bold">TBD</h2>
          <div className="flex flex-row text-sm gap-1 text-gray-500 items-center justify-between">
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-2 p-4 items-center">
      <div>
        <Avatar>
          <AvatarImage src={player.avatar} />
          <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="text-sm">
        <h2 className="font-bold">{player.name}</h2>
        <div className="flex flex-row text-sm gap-1 text-gray-500 items-center justify-between">
          <span className="">{player.stats.wins}-{player.stats.losses}</span>
          <span>|</span>
          <span className="">{player.stats.era} ERA</span>
        </div>
      </div>
    </div>
  )
}
