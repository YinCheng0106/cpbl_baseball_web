"use client";

import React, { useEffect, useState } from "react";
import { ModeToggle } from "@/components/app/themeSwitch";

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
          <Link href={"/teams"} className={`
            hover:text-accent/100 transition-all ease-in-out
            `}>
            <p className="font-medium">球隊</p>
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
