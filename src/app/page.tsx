'use client';

import { GameCard } from "@/components/app/gameCard";
import { Standing } from "@/components/app/standing";
import { motion } from "motion/react"

const games = [
  {
    id: 0,
    type: "B",
    status: 4,
    inning: null,
    inningHalf: null,
    home: "台鋼雄鷹",
    away: "味全龍",
    awayStarter: "徐若熙",
    homeStarter: "陳柏青",
    homeScore: null,
    awayScore: null,
    awayWLD: [31, 45, 2],
    homeWLD: [52, 12, 1],
    winPitcher: "陳柏青",
    losePitcher: "徐若熙",
    savePitcher: "陳柏青",
    mvp: "陳柏青",
    strike: 2,
    ball: 3,
    out: 2,
    pitch: 100,
    base: [1, 0, 1],
    time: '2025-02-01T19:00:00+08:00',
    location: "新莊棒球場",
  },
  {
    id: 1,
    type: "A",
    status: 2,
    inning: 1,
    inningHalf: 1,
    home: "樂天桃猿",
    away: "富邦悍將",
    awayStarter: "陳禹勳",
    homeStarter: "張奕",
    homeScore: 0,
    awayScore: 0,
    awayWLD: [0, 0, 0],
    homeWLD: [0, 0, 0],
    winPitcher: "張奕",
    losePitcher: "陳禹勳",
    savePitcher: "張奕",
    mvp: "張奕",
    strike: 2,
    ball: 3,
    out: 2,
    pitch: 70,
    base: [1, 0, 1],
    time: '2025-07-01T19:00:00+08:00',
    location: "桃園國際棒球場",
  },
  {
    id: 2,
    type: "C",
    status: 3,
    inning: 1,
    inningHalf: 1,
    home: "中信兄弟",
    away: "統一獅",
    awayStater: "布雷克",
    homeStarter: "德寶拉",
    homeScore: 0,
    awayScore: 0,
    awayWLD: [0, 0, 0],
    homeWLD: [0, 0, 0],
    winPitcher: "德寶拉",
    losePitcher: "布雷克",
    savePitcher: "德寶拉",
    mvp: "德寶拉",
    strike: 2,
    ball: 3,
    out: 2,
    pitch: 79,
    base: [false, false, false],
    time: '2025-02-01T19:00:00+08:00',
    location: "台中洲際棒球場",
  },
  // {
  //   id: 3,
  //   type: "D",
  //   status: 4,
  //   home: "台鋼雄鷹",
  //   away: "味全龍",
  //   time: '2025-02-01T19:00:00+08:00',
  //   location: "新莊棒球場",
  // },
  // {
  //   id: 4,
  //   type: "E",
  //   status: 5,
  //   home: "台鋼雄鷹",
  //   away: "味全龍",
  //   time: '2025-02-01T19:00:00+08:00',
  //   location: "新莊棒球場",
  // },
  // {
  //   id: 5,
  //   type: "F",
  //   status: 6,
  //   home: "台鋼雄鷹",
  //   away: "味全龍",
  //   time: '2025-02-01T19:00:00+08:00',
  //   location: "新莊棒球場",
  // },
  // {
  //   id: 6,
  //   type: "G",
  //   status: 7,
  //   home: "台鋼雄鷹",
  //   away: "味全龍",
  //   time: '2025-02-01T19:00:00+08:00',
  //   location: "新莊棒球場",
  // },
  // {
  //   id: 7,
  //   type: "H",
  //   status: 8,
  //   home: "台鋼雄鷹",
  //   away: "味全龍",
  //   time: '2025-02-01T19:00:00+08:00',
  //   location: "新莊棒球場",
  // },
  // {
  //   id: 8,
  //   type: "I",
  //   status: 9,
  //   home: "台鋼雄鷹",
  //   away: "味全龍",
  //   time: '2025-02-01T19:00:00+08:00',
  //   location: "新莊棒球場",
  // },
]

export default function Home() {
  const transition = {
    duration: 0.5,
    delay: 0.3,
    ease: [0, 0.71, 0.2, 1.01],
  }
  return (
    <div className="flex flex-col items-center gap-4">
      <div>
          <h2 className="text-2xl font-bold">本日賽事</h2>
          <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition}
          className={`
            grid grid-rows-1 lg:grid-cols-3 md:grid-cols-2 gap-3 mt-4 ml-2
          `}>
            {games.map((games) => (
              <GameCard {...games} key={games.id} />
            ))}
          </motion.div>
      </div>
      <div>
        <h2 className="text-2xl font-bold">球隊成績</h2>
        <Standing />
      </div>
    </div>
  );
}
