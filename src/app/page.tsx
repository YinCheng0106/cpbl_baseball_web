'use client';

import { GameCard } from "@/components/app/gameCard";

const games = [
  {
    id: 1,
    type: "A",
    status: 2,
    home: "Rakuten",
    away: "Fubon",
    time: '2025-07-01T19:00:00',
    location: "台中洲際棒球場",
  },
  {
    id: 2,
    type: "B",
    status: 3,
    home: "Brothers",
    away: "7-Eleven",
    time: '2025-07-01T19:00:00',
    location: "新莊棒球場",
  },
]

export default function Home() {
  return (
    <div>
      <main>
        <h2 className="text-2xl font-bold">本日賽事</h2>
        <div className={`
          grid grid-rows-1 md:grid-cols-3 gap-3 mt-4
        `}>
          {games.map((games) => (
            <GameCard {...games} key={games.id} />
          ))}
        </div>
      </main>
    </div>
  );
}
