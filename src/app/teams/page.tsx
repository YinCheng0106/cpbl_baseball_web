"use client";

import Image from "next/image";
import Link from "next/link";

export default function TeamsPage() {
  return (
    <div className={`
      flex flex-col items-center gap-8
      bg-background text-foreground
      min-h-screen
    `}>
      <h2 className="text-2xl font-bold">球隊</h2>
      <div className={`
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        gap-8 w-full select-none
      `}>
        <Link href={"/teams/1"}>
          <div className={`
            flex flex-col items-center gap-2 p-4
            border-2 border-[#f9cc01] rounded-lg
          `}>
            <Image
              src={'/teamLogo/logo_brothers.png'}
              alt="中信兄弟"
              width={100}
              height={100}
            />
            <h3 className="text-center text-xl font-bold">中信兄弟</h3>
          </div>
        </Link>
        <Link href={"/teams/2"}>
          <div className={`
            flex flex-col items-center gap-2 p-4
            border-2 border-[#ec6c00] rounded-lg
          `}>
            <Image
              src={'/teamLogo/logo_unilions.png'}
              alt="統一7-ELEVEn獅"
              width={100}
              height={100}
            />
            <h3 className="text-center text-xl font-bold">統一7-ELEVEn獅</h3>
          </div>
        </Link>
        <Link href={"/teams/3"}>
          <div className={`
            flex flex-col items-center gap-2 p-4
            border-2 border-[#671a32] rounded-lg
          `}>
            <Image
              src={'/teamLogo/logo_rakuten.png'}
              alt="樂天桃猿"
              width={100}
              height={100}
            />
            <h3 className="text-center text-xl font-bold">樂天桃猿</h3>
          </div>
        </Link>
        <Link href={"/teams/4"}>
          <div className={`
            flex flex-col items-center gap-2 p-4
            border-2 border-[#004f98] rounded-lg
          `}>
            <Image
              src={'/teamLogo/logo_fubon.png'}
              alt="富邦悍將"
              width={100}
              height={100}
            />
            <h3 className="text-center text-xl font-bold">富邦悍將</h3>
          </div>
        </Link>
        <Link href={"/teams/5"}>
          <div className={`
            flex flex-col items-center gap-2 p-4
            border-2 border-[#cf152d] rounded-lg
          `}>
            <Image
              src={'/teamLogo/logo_dragon.png'}
              alt="味全龍"
              width={100}
              height={100}
            />
            <h3 className="text-center text-xl font-bold">味全龍</h3>
          </div>
        </Link>
        <Link href={"/teams/6"}>
          <div className={`
            flex flex-col items-center gap-2 p-4
            border-2 border-[#064738] rounded-lg
          `}>
            <Image
              src={'/teamLogo/logo_tsg.png'}
              alt="台鋼雄鷹"
              width={100}
              height={100}
            />
            <h3 className="text-center text-xl font-bold">台鋼雄鷹</h3>
          </div>
        </Link>
      </div>
    </div>
  )
}
