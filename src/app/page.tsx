'use client';

import { GameCard } from "@/components/app/gameCard";

const games = [
  {
    id: 0,
    type: "B",
    status: 1,
    home: "台鋼雄鷹",
    away: "味全龍",
    time: '2025-07-01T19:00:00',
    location: "新莊棒球場",
  },
  {
    id: 1,
    type: "A",
    status: 2,
    home: "樂天桃猿",
    away: "富邦悍將",
    time: '2025-07-01T19:00:00',
    location: "台中洲際棒球場",
  },
  {
    id: 2,
    type: "C",
    status: 3,
    home: "中信兄弟",
    away: "統一獅",
    time: '2025-07-01T19:00:00',
    location: "新莊棒球場",
  },
  {
    id: 3,
    type: "D",
    status: 4,
    home: "台鋼雄鷹",
    away: "味全龍",
    time: '2025-07-01T19:00:00',
    location: "新莊棒球場",
  },
  {
    id: 4,
    type: "E",
    status: 5,
    home: "台鋼雄鷹",
    away: "味全龍",
    time: '2025-07-01T19:00:00',
    location: "新莊棒球場",
  },
  {
    id: 5,
    type: "F",
    status: 6,
    home: "台鋼雄鷹",
    away: "味全龍",
    time: '2025-07-01T19:00:00',
    location: "新莊棒球場",
  },
  {
    id: 6,
    type: "G",
    status: 7,
    home: "台鋼雄鷹",
    away: "味全龍",
    time: '2025-07-01T19:00:00',
    location: "新莊棒球場",
  },
  {
    id: 7,
    type: "H",
    status: 8,
    home: "台鋼雄鷹",
    away: "味全龍",
    time: '2025-07-01T19:00:00',
    location: "新莊棒球場",
  },
  {
    id: 8,
    type: "I",
    status: 9,
    home: "台鋼雄鷹",
    away: "味全龍",
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
          grid grid-rows-1 lg:grid-cols-3 md:grid-cols-2 gap-3 mt-4
        `}>
          {games.map((games) => (
            <GameCard {...games} key={games.id} />
          ))}
        </div>
      </main>
    </div>
  );
}
