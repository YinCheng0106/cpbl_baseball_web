"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

import { GameInfo } from "@/types/gameData";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function AdminGamesPages() {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<GameInfo[]>([]);

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      try {
        const { data: games, error } = await supabase.from("games").select()
        if (error) {
          throw error;
        }

        setGames(games);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Games</h1>
          <DataTable columns={columns} data={games} />
        </div>
      )}
    </div>
  );
}
