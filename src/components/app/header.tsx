"use client";

import React, { useEffect, useState } from "react";

import { ModeToggle } from "@/components/app/themeSwitch";

import Link from "next/link";

function Logo() {
  return (
    <div>
      <h1 className="text-3xl font-bold">CPBL</h1>
    </div>
  );
}

export function AppHeader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if(!mounted) return null;

  return (
    <header className="container flex w-full justify-between self-center py-4 px-2">
      <div className="flex">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
      <div className={`
        flex items-center justify-end select-none`}>
        <ModeToggle />
      </div>
    </header>
  );
}
