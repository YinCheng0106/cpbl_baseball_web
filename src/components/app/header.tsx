"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/app/themeSwitch";

import { Tv } from "lucide-react";

function Logo() {
  return (
    <div className="select-none">
      <h1 className="text-3xl font-bold">CPBL</h1>
    </div>
  );
}

export function AppHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let lastScrollY = window.scrollY;

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`
      fixed top-0 left-0 right-0
      flex w-full justify-between self-center
      transition-transform duration-300 z-50
      ${isVisible ? "translate-y-0" : "-translate-y-full"}
      bg-background/80 backdrop-blur-sm
      py-4 px-8 shadow-sm`}
    >
      <div className="flex">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div
        className={`
        flex items-center justify-end select-none gap-4`}
      >
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href={"/teams"}
            className={`
            hover:text-accent/100 transition-all ease-in-out
            `}
          >
            <p className="font-medium">球隊</p>
          </Link>
        </div>
        <div className="text-zinc-400 dark:text-zinc-200 font-bold">|</div>
        <div>
          <Link
            href={"/tv"}
            className={`
            inline-flex items-center justify-center sm:gap-2
            rounded-md text-sm font-medium
            transition-all disabled:pointer-events-none disabled:opacity-50
            [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0
            outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
            aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
            hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 h-9 px-4 py-2 has-[>svg]:px-3
            `}
          >
            <Tv />
            <p className="sm:before:content-['CPBL_TV']"></p>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
