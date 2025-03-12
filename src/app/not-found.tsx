import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h2 className="text-6xl">404</h2>
      <p className="text-2xl"><del>你找到了一個神秘的通道</del></p>
      <Link className="text-xl" href="/">回首頁</Link>
    </div>
  );
}
