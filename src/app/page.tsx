'use client';

import { GameCard } from "@/components/app/gameCard";

const games = [
  {
    id: 1,
    home: "Lamigo",
    away: "Fubon",
    date: "2025-07-01",
    time: "19:00",
    location: "台中洲際棒球場",
  },
  {
    id: 2,
    home: "Brothers",
    away: "7-Eleven",
    date: "2025-07-01",
    time: "19:00",
    location: "新莊棒球場",
  },
]

export default function Home() {
  return (
    <div>
      <main>
        <h2 className="text-2xl font-bold">本日賽事</h2>
        <div className={`
          flex md:flex-row flex-col gap-3 mt-4
        `}>
          {games.map((games) => (
            <GameCard {...games} key={games.id} />
          ))}
        </div>
      </main>
    </div>
  );
}
