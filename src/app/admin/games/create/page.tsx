"use client";

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { TeamData } from '@/types/teamData';

import { GameForm } from '@/components/app/gameForm';

export default function CreateGame() {

  return (
    <div>
      <GameForm />
    </div>
  )
}
