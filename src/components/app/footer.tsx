"use client";

import Link from "next/link";

export default function AppFooter() {
  return (
    <footer
      className={`
          flex justify-center items-center
          border-t py-4 mx-2
        `}
    >
      <div
        className={`
          flex item-center gap-3
        `}
      >
        <span>YinCheng &copy; 2025</span>
      </div>
    </footer>
  );
}
