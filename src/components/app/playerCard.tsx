"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PlayerData } from "@/types/playerData";

type Props = {
  playerData: PlayerData[];
  id: number | null | undefined; 
  playerType: "batter" | "pitcher" | "w/lPitcher" | "savePitcher" | null;
  year?: number;
  season?: "firstHalf" | "secondHalf" | "fullSeason";
}

export function PlayerCard({ playerData, id, playerType, year, season }: Props) {
  if (!year) {
    year = new Date().getFullYear();
  }
  if (!season) {
    season = "fullSeason";
  }
  const players = playerData.find(p => p.id == id);
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
    const pitchData = players.player_pitching?.find(p => p.year === year && p.season === season);
    if (!pitchData) {
      return (
        <div className="flex flex-row gap-2 px-4 py-0.5 items-center w-[160px]">
          <div>
            <Avatar>
              <AvatarImage src={`/playerImg/${players.id}/avatar.png`} />
              <AvatarFallback>{players.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-sm">
            <h2 className="font-bold">{players.name}</h2>
            <div className="flex flex-row text-xs sm:text-sm gap-1 text-gray-500 items-center justify-between">
              <span className="">0-0</span>
              <span>|</span>
              <span className="flex items-center gap-0.5">
                <span>
                  -.--
                </span>
                <span>ERA</span>
              </span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-row gap-2 px-4 py-0.5 items-center w-[160px]">
        <div>
          <Avatar>
            <AvatarImage src={`/playerImg/${players.id}/avatar.png`} />
            <AvatarFallback>{players.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-sm">
          <h2 className="font-bold">{players.name}</h2>
          <div className="flex flex-row text-xs sm:text-sm gap-1 text-gray-500 items-center justify-between">
              <span className="">{pitchData.wins}-{pitchData.losses}</span>
              <span>|</span>
            <span className="flex items-center gap-0.5">
              <span>
                {pitchData.era}
              </span>
              <span>ERA</span>
            </span>
          </div>
        </div>
      </div>
    );
  } else if (players.position == "Pitcher" && playerType === "w/lPitcher"){
    const pitchData = players.player_pitching?.find(p => p.year === year && p.season === season);
    if (!pitchData) {
      return (
        <div className="flex flex-row gap-2 px-4 py-0.5 items-center w-[160px]">
          <div>
            <Avatar>
              <AvatarImage src={`/playerImg/${players.id}/avatar.png`} />
              <AvatarFallback>{players.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-sm">
            <h2 className="font-bold">{players.name}</h2>
            <div className="flex flex-row text-xs sm:text-sm gap-1 text-gray-500 items-center justify-between">
              <span className="">0-0</span>
              <span>|</span>
              <span className="flex items-center gap-0.5">
                <span>
                  -.--
                </span>
                <span>ERA</span>
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row gap-2 px-4 py-0.5 items-center w-[150px]">
          <div>
            <Avatar>
              <AvatarImage src={`/playerImg/${players.id}/avatar.png`} />
              <AvatarFallback>{players.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-sm">
            <h2 className="font-bold">{players.name}</h2>
            <div className="flex flex-row text-xs sm:text-sm gap-1 text-gray-500 items-center justify-between">
              <span className="">{pitchData.wins}-{pitchData.losses}</span>
              <span>|</span>
              <span className="flex items-center gap-0.5">
                <span>
                  {pitchData.era}
                </span>
                <span>ERA</span>
              </span>
            </div>
          </div>
        </div>
      );
    }
  } else if (players.position == "Pitcher" && playerType === "savePitcher"){
    const pitchData = players.player_pitching?.find(p => p.year === year && p.season === season);
    if (!pitchData) {
      return (
        <div className="flex flex-row gap-2 px-4 py-0.5 items-center w-[160px]">
          <div>
            <Avatar>
              <AvatarImage src={`/playerImg/${players.id}/avatar.png`} />
              <AvatarFallback>{players.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-sm">
            <h2 className="font-bold">{players.name}</h2>
            <div className="flex flex-row text-xs sm:text-sm gap-1 text-gray-500 items-center justify-between">
              <span className="">0-0</span>
              <span>|</span>
              <span className="flex items-center gap-0.5">
                <span>
                  0
                </span>
                <span>SAVE</span>
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row gap-2 px-4 py-0.5 items-center w-[160px]">
          <div>
            <Avatar>
              <AvatarImage src={`/playerImg/${players.id}/avatar.png`} />
              <AvatarFallback>{players.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-sm">
            <h2 className="font-bold">{players.name}</h2>
            <div className="flex flex-row text-xs sm:text-sm gap-1 text-gray-500 items-center justify-between">
              <span className="">{pitchData.wins}-{pitchData.losses}</span>
              <span>|</span>
              <span className="flex items-center gap-0.5">
                <span>
                  {pitchData.saves}
                </span>
                <span>SAVE</span>
              </span>
            </div>
          </div>
        </div>
      );
    }
  } else if (playerType === "batter"){
    const batData = players.player_batting?.find(p => p.year === year && p.season === season);
    if (!batData) {
      return (
        <div className="flex flex-row gap-2 px-4 py-0.5 items-center w-[160px]">
          <div>
            <Avatar>
              <AvatarImage src={`/playerImg/${players.id}/avatar.png`} />
              <AvatarFallback>{players.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-sm">
            <h2 className="font-bold">{players.name}</h2>
            <div className="flex flex-row text-xs sm:text-sm gap-1 text-gray-500 items-center justify-between">
              <span className="flex items-center gap-0.5">
                <span>AVG</span>
                <span>-.---</span>
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-row gap-2 px-4 py-0.5 items-center w-[160px]">
          <div>
            <Avatar>
              <AvatarImage src={`/playerImg/${players.id}/avatar.png`} />
              <AvatarFallback>{players.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-sm">
            <h2 className="font-bold">{players.name}</h2>
            <div className="flex flex-row text-xs sm:text-sm gap-1 text-gray-500 items-center justify-between">
              <span className="flex items-center gap-0.5">
                <span>AVG</span>
                <span>
                  {batData.battingAverage === null ? "-.---" : batData.battingAverage.toFixed(3)}
                </span>
              </span>
            </div>
          </div>
        </div>
      )
    }
  }
}
