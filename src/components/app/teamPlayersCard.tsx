"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { PlayerData } from "@/types/playerData";

import { supabase } from "@/utils/supabase";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = Readonly<{ playerId: string; }>;

export function TeamPlayersCard({ playerId }: Props) {
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState<PlayerData>({} as PlayerData);

  useEffect(() => {
    setLoading(true);
    async function fetchPlayer() {
      const { data: playerData } = await supabase
        .from("players")
        .select()
        .eq("id", playerId)
        .single();
      if (playerData) {
        setPlayer(playerData);
      } else {
        console.error(`Player[${playerId}] not found`);
      }
      setLoading(false);
    }
    fetchPlayer();
  }, [playerId]);

  if(loading) {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">

        <div className={`
          flex flex-col items-center justify-center
          border p-4 rounded-lg shadow-md w-[150px]
        `}>
          <Skeleton width={100} height={125} className="mb-2 rounded-lg" />
          <h3 className="text-xl">
            <Skeleton width={85} />
          </h3>
          <p><Skeleton width={65} /></p>
        </div>
      </SkeletonTheme>
    );
  }

  if (!player.id) {
    return (
      <div className={`
        flex flex-col items-center justify-center
        border p-4 rounded-lg shadow-md w-[150px]
      `}>
        <Image
          src="/playerAvatar/player_no_img.jpg"
          alt="TBD"
          width={100}
          height={125}
          className="mb-2 rounded-lg"
        />
        <h3 className="text-xl font-semibold">TBD</h3>
        <p className="text-gray-500 dark:text-gray-600">Position</p>
      </div>
    )
  } else {
    return (
      <div className={`
        flex flex-col items-center justify-center
        border p-4 rounded-lg shadow-md w-[150px]
      `}>
        <Image
          src={`/playerAvatar/${player.avatar}`}
          alt={player.name["zh-tw"]}
          width={100}
          height={125}
          className="mb-2 rounded-lg"
        />
        <Link href={`/players/${player.id}`} className="link">
          <h3 className="text-xl font-semibold">{player.name["zh-tw"]}</h3>
        </Link>
        <p className="text-gray-500 dark:text-gray-600">{player.position}</p>
      </div>
    )
  }
}