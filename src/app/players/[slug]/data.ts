import { cache } from "react";
import { supabase } from "@/utils/supabase";
import type { PlayerData } from "@/types/playerData";

export const getPlayer = cache(
  async (playerId: number): Promise<PlayerData | null> => {
    if (!Number.isFinite(playerId)) return null;
    const { data, error } = await supabase
      .from("players")
      .select()
      .eq("id", playerId)
      .single();
    if (error) {
      console.error("[getPlayer] error", error);
      return null;
    }
    return data as PlayerData;
  }
);
