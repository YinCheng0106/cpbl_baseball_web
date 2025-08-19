"use client";

import { GameForm } from '@/components/app/gameForm';
import { Swords } from "lucide-react";

export default function CreateGame() {

  return (
    <div>
      <h2 className='flex items-center text-2xl font-bold gap-2 mb-4'><Swords /> 創建比賽</h2>
      <GameForm />
    </div>
  )
}
