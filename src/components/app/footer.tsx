"use client";

import Link from "next/link";
import Image from "next/image";
export function AppFooter() {
  return (
    <footer
      className={`
          border-t py-4 mx-4 mt-12
        `}
    >
      <div
        className={`
          gap-3 flex justify-center items-center
        `}
      >
        <div className="flex items-center gap-4">
          <Link href={"/teams/1"} className="logo-scale">
            <Image src={"/teamLogo/logo_brothers.png"} alt="象" width={30} height={30} />
          </Link>
          <Link href={"/teams/2"} className="logo-scale">
            <Image src={"/teamLogo/logo_unilions.png"} alt="獅" width={30} height={30} />
          </Link>
          <Link href={"/teams/3"} className="logo-scale">
            <Image src={"/teamLogo/logo_rakuten.png"} alt="猿" width={30} height={30} />
          </Link>
          <Link href={"/teams/4"} className="logo-scale">
            <Image src={"/teamLogo/logo_fubon.png"} alt="悍" width={30} height={30} />
          </Link>
          <Link href={"/teams/5"} className="logo-scale">
            <Image src={"/teamLogo/logo_dragon.png"} alt="龍" width={30} height={30} />
          </Link>
          <Link href={"/teams/6"} className="logo-scale">
            <Image src={"/teamLogo/logo_tsg.png"} alt="鷹" width={30} height={30} />
          </Link>
        </div>
        <span>YinCheng &copy; 2025</span>
      </div>
    </footer>
  );
}
