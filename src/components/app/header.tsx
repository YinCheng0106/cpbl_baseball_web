"use client";

import Link from "next/link";

function Logo() {
  return (
    <div>
      <h1 className="text-4xl font-bold">CPBL</h1>
    </div>
  );
}

export default function AppHeader() {
  return (
    <header className="container flex w-full justify-between self-center py-4 px-2">
      <div className="flex">
        <Link href={"/"}>
          <Logo />
        </Link>
      </div>
    </header>
  );
}
