"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlayerData } from "@/types/playerData";

type Props = {
  id: number | null; 
  playerType: "batter" | "pitcher" | "w/lPitcher" | "savePitcher" | null;
}

export function PlayerCard({ id, playerType }: Props) {
  const [player, setPlayer] = useState<PlayerData[]>([]);

  useEffect(() => {
    fetch('/json/player.json')
      .then(response => response.json())
      .then((json: PlayerData[]) => {
        setPlayer(json);
      })
      .catch(error => {
        console.error('[讀取失敗] player: ', error);
      });
  });

  const players = player.find(p => p.id == id);
  const year = new Date().getFullYear().toString();
  if (!players) {
    return (
      <div className="flex flex-row gap-2 px-4 py-0.5 items-center">
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
  } else if (players.position == "Pitcher" && playerType === "pitcher"){
    return (
      <div className="flex flex-row gap-2 px-4 py-0.5 items-center w-[150px]">
        <div>
          <Avatar>
            <AvatarImage src={players.avatar} />
            <AvatarFallback>{players.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-sm">
          <h2 className="font-bold">{players.name}</h2>
          <div className="flex flex-row text-xs sm:text-sm gap-1 text-gray-500 items-center justify-between">
            <span className="">{players.stats[year].pitching.wins}-{players.stats[year].pitching.losses}</span>
            <span>|</span>
            <span className="flex items-center gap-0.5">
              <span>
                {players.stats[year].pitching.era}
              </span>
              <span>ERA</span>
            </span>
          </div>
        </div>
      </div>
    );
  } else if (players.position == "Pitcher" && playerType === "w/lPitcher"){
    return (
      <div className="flex flex-row gap-2 px-4 py-0.5 items-center w-[150px]">
        <div>
          <Avatar>
            <AvatarImage src={players.avatar} />
            <AvatarFallback>{players.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-sm">
          <h2 className="font-bold">{players.name}</h2>
          <div className="flex flex-row text-xs sm:text-sm gap-1 text-gray-500 items-center justify-between">
            <span className="">{players.stats[year].pitching.wins}-{players.stats[year].pitching.losses}</span>
            <span>|</span>
            <span className="flex items-center gap-0.5">
              <span>
                {players.stats[year].pitching.era}
              </span>
              <span>ERA</span>
            </span>
          </div>
        </div>
      </div>
    );
  } else if (players.position == "Pitcher" && playerType === "savePitcher"){
    return (
      <div className="flex flex-row gap-2 px-4 py-0.5 items-center w-[150px]">
        <div>
          <Avatar>
            <AvatarImage src={players.avatar} />
            <AvatarFallback>{players.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-sm">
          <h2 className="font-bold">{players.name}</h2>
          <div className="flex flex-row text-xs sm:text-sm gap-1 text-gray-500 items-center justify-between">
            <span className="">{players.stats[year].pitching.wins}-{players.stats[year].pitching.losses}</span>
            <span>|</span>
            <span className="flex items-center gap-0.5">
              <span>
                {players.stats[year].pitching.saves}
              </span>
              <span>SAVE</span>
            </span>
          </div>
        </div>
      </div>
    );
  } else if (playerType === "batter"){
    return (
      <div className="flex flex-row gap-2 px-4 py-0.5 items-center w-[150px]">
        <div>
          <Avatar>
            <AvatarImage src={players.avatar} />
            <AvatarFallback>{players.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-sm">
          <h2 className="font-bold">{players.name}</h2>
          <div className="flex flex-row text-xs sm:text-sm gap-1 text-gray-500 items-center justify-between">
            <span className="flex items-center gap-0.5">
              <span>AVG</span>
              <span>
                {players.stats[year].batting.battingAverage === null ? "-.---" : players.stats[year].batting.battingAverage.toFixed(3)}
              </span>
            </span>
          </div>
        </div>
      </div>
    )
  }
}
