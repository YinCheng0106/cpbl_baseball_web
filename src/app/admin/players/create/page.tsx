"use client";

import { PlayerForm } from "@/components/app/playerForm";

import { UserPen } from "lucide-react";

export default function CreatePlayerPage() {
  return (
    <div className="">
      <h2 className="flex items-center text-2xl font-bold gap-2 mb-4"><UserPen /> 創建球員</h2>
      <PlayerForm />
    </div>
  )
}
