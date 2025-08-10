import { teamToString } from "@/utils/teamUtils";
import { getPlayer } from "./data";
import PlayerClient from "./player-client";
import type { Metadata } from "next";

type Props = { params: { slug: string } };

export default async function PlayerPage({ params }: Props) {
  const playerId = parseInt(params.slug.split("-").pop() || "");
  const player = await getPlayer(playerId);
  if (!player) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Player not found.</p>
        </div>
      </div>
    );
  }
  return <PlayerClient player={player} />;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const playerId = parseInt(params.slug.split("-").pop() || "");
  const player = await getPlayer(playerId);
  if (player) {
    return {
      title: `${teamToString(player.team)} ${player.name}#${player.number} - 球員資料`,
      description: `${teamToString(player.team)} ${player.name}#${player.number} ${player.position}`,
    };
  }
  return { title: "查無此球員", description: "查無此球員" };
}
