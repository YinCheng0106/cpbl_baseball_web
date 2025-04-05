import Link from "next/link";

const quote = [
  "這個頁面就像是斷了線的風箏、脫疆的野馬、變了心的女朋友，回不來了！",
  "紀錄組，記了工程師一個失誤...",
  "這個頁面被恰恰打到火星去了！",
  "問天！",
  "火車過山洞了！"
]

export default function NotFound() {
  const randomQuote = quote[Math.floor(Math.random() * quote.length)];
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-svh select-none">
      <h2 className="text-6xl">404</h2>
      <p className={`
        text-sm text-center text-gray-500
      `}>{randomQuote}</p>
      <Link className={`
        px-4 py-2
        rounded shadow-md
        bg-gray-300 text-gray-900
        hover:bg-gray-400 hover:text-black hover:font-medium
        dark:bg-gray-800 dark:text-gray-100
        hover:dark:bg-gray-900 hover:dark:text-white
        transition duration-200 ease-in-out
        `} href="/">首頁</Link>
    </div>
  );
}
