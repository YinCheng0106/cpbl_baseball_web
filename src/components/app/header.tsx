"use client";

import React, { useEffect, useState } from "react";
import { ModeToggle } from "@/components/app/themeSwitch";

import Image from "next/image";
import Link from "next/link";

import { Tv } from "lucide-react";

function Logo() {
  return (
    <div className="select-none">
      <h1 className="text-3xl font-bold">CPBL</h1>
    </div>
  );
}

export function AppHeader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if(!mounted) return null;

  return (
    <header className={`
      flex w-full justify-between self-center 
      py-4 px-8 mb-4 shadow-sm`}>
      <div className="flex">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div className={`
        flex items-center justify-end select-none gap-4`}>
        <div className="flex items-center gap-4">
          <Link href={"/teams/1"} className="logo-scale">
            <Image src={"/teamWord/word_brothers.png"} alt="象" width={30} height={30} />
          </Link>
          <Link href={"/teams/2"} className="logo-scale">
            <Image src={"/teamWord/word_unilions.png"} alt="獅" width={30} height={30} />
          </Link>
          <Link href={"/teams/3"} className="logo-scale">
            <Image src={"/teamWord/word_rakuten.png"} alt="猿" width={30} height={30} />
          </Link>
          <Link href={"/teams/4"} className="logo-scale">
            <Image src={"/teamWord/word_fubon.png"} alt="悍" width={30} height={30} />
          </Link>
          <Link href={"/teams/5"} className="logo-scale">
            <Image src={"/teamWord/word_dragon.png"} alt="龍" width={30} height={30} />
          </Link>
          <Link href={"/teams/6"} className="logo-scale">
            <Image src={"/teamWord/word_tsg.png"} alt="鷹" width={30} height={30} />
          </Link>
        </div>
        <div className="text-zinc-400 dark:text-zinc-200 font-bold">|</div>
        <Link href={"/tv"} className={`
          inline-flex items-center justify-center gap-2
          rounded-md text-sm font-medium
          transition-all disabled:pointer-events-none disabled:opacity-50
          [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0
          outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
          aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
          hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[>svg]:px-3
          `}><Tv />CPBL TV</Link>
        <ModeToggle />
      </div>
    </header>
  );
}
