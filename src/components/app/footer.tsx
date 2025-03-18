"use client";

import Link from "next/link";

export function AppFooter() {
  return (
    <footer
      className={`
          border-t py-4 mx-2
        `}
    >
      <div
        className={`
          gap-3 flex justify-center items-center
        `}
      >
        <span>YinCheng &copy; 2025</span>
      </div>
    </footer>
  );
}
