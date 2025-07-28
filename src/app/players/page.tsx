"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import { teamToWord } from "@/utils/teamUtils";
import { supabase } from "@/utils/supabase";
import { PlayerData } from "@/types/playerData";

export default function AllPlayerPage() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from("players").select("*");
      if (error) {
        console.error("Error fetching players:", error);
      } else {
        setPlayers(data);
      }
      setLoading(false);
    };

    fetchPlayers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.table(players);
  return (
    <div className="container mx-auto px-12">
      <div>
        <h2 className="text-3xl font-bold py-2 border-b-1">球員點將錄</h2>
        <p className="mt-2">
          以下為現役球員名單，按照筆畫順序排列球隊及姓名。若要查詢除役球員，請於搜尋框查詢。
        </p>
      </div>
      <div className="flex flex-col items-start justify-center gap-6 mt-8">
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex items-center gap-2">
            <Link
              href="/teams/1"
              className="flex items-center gap-2 logo-scale"
            >
              <img src={teamToWord("中信兄弟")} alt="B" className="w-6 h-6" />
              <p className="text-xl font-bold">中信兄弟</p>
            </Link>
          </div>
          <div className="flex items-start gap-2">
            {players
              .filter(
                (player) => player.team === 1 && player.status !== "retired"
              )
              .sort((a, b) =>
                a.name.localeCompare(b.name, "zh-TW", { sensitivity: "base" })
              )
              .map((player) => (
                <Link
                  key={player.id}
                  href={`/players/${player.id}`}
                  className="flex items-center justify-between p-2 link"
                >
                  <p className="text-lg">
                    {player.number} {player.name}
                    {player.status === "unsigned" ? "#" : ""}
                    {player.status === "contract" ? "*" : ""}
                    {player.status === "independent" ? "◎" : ""}
                  </p>
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex items-center gap-2">
            <Link
              href="/teams/2"
              className="flex items-center gap-2 logo-scale"
            >
              <img src={teamToWord("統一獅")} alt="UL" className="w-6 h-6" />
              <p className="text-xl font-bold">統一7-ELEVEn獅</p>
            </Link>
          </div>
          <div className="flex items-start gap-2">
            {players
              .filter(
                (player) => player.team === 2 && player.status !== "retired"
              )
              .sort((a, b) =>
                a.name.localeCompare(b.name, "zh-TW", { sensitivity: "base" })
              )
              .map((player) => (
                <Link
                  key={player.id}
                  href={`/players/${player.id}`}
                  className="flex items-center justify-between p-2 link"
                >
                  <p className="text-lg">
                    {player.number} {player.name}
                    {player.status === "unsigned" ? "#" : ""}
                    {player.status === "contract" ? "*" : ""}
                    {player.status === "independent" ? "◎" : ""}
                  </p>
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex items-center gap-2">
            <Link
              href="/teams/3"
              className="flex items-center gap-2 logo-scale"
            >
              <img src={teamToWord("樂天桃猿")} alt="R" className="w-6 h-6" />
              <p className="text-xl font-bold">樂天桃猿</p>
            </Link>
          </div>
          <div className="flex items-start gap-2">
            {players
              .filter(
                (player) => player.team === 3 && player.status !== "retired"
              )
              .sort((a, b) =>
                a.name.localeCompare(b.name, "zh-TW", { sensitivity: "base" })
              )
              .map((player) => (
                <Link
                  key={player.id}
                  href={`/players/${player.id}`}
                  className="flex items-center justify-between p-2 link"
                >
                  <p className="text-lg">
                    {player.number} {player.name}
                    {player.status === "unsigned" ? "#" : ""}
                    {player.status === "contract" ? "*" : ""}
                    {player.status === "independent" ? "◎" : ""}
                  </p>
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex items-center gap-2">
            <Link
              href="/teams/4"
              className="flex items-center gap-2 logo-scale"
            >
              <img src={teamToWord("富邦悍將")} alt="G" className="w-6 h-6" />
              <p className="text-xl font-bold">富邦悍將</p>
            </Link>
          </div>
          <div className="flex items-start gap-2">
            {players
              .filter(
                (player) => player.team === 4 && player.status !== "retired"
              )
              .sort((a, b) =>
                a.name.localeCompare(b.name, "zh-TW", { sensitivity: "base" })
              )
              .map((player) => (
                <Link
                  key={player.id}
                  href={`/players/${player.id}`}
                  className="flex items-center justify-between p-2 link"
                >
                  <p className="text-lg">
                    {player.number} {player.name}
                    {player.status === "unsigned" ? "#" : ""}
                    {player.status === "contract" ? "*" : ""}
                    {player.status === "independent" ? "◎" : ""}
                  </p>
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex items-center gap-2">
            <Link
              href="/teams/5"
              className="flex items-center gap-2 logo-scale"
            >
              <img src={teamToWord("味全龍")} alt="W" className="w-6 h-6" />
              <p className="text-xl font-bold">味全龍</p>
            </Link>
          </div>
          <div className="flex items-start gap-2">
            {players
              .filter(
                (player) => player.team === 5 && player.status !== "retired"
              )
              .sort((a, b) =>
                a.name.localeCompare(b.name, "zh-TW", { sensitivity: "base" })
              )
              .map((player) => (
                <Link
                  key={player.id}
                  href={`/players/${player.id}`}
                  className="flex items-center justify-between p-2 link"
                >
                  <p className="text-lg">
                    {player.number} {player.name}
                    {player.status === "unsigned" ? "#" : ""}
                    {player.status === "contract" ? "*" : ""}
                    {player.status === "independent" ? "◎" : ""}
                  </p>
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center gap-2">
          <div className="flex items-center gap-2">
            <Link
              href="/teams/6"
              className="flex items-center gap-2 logo-scale"
            >
              <img src={teamToWord("台鋼雄鷹")} alt="TSG" className="w-6 h-6" />
              <p className="text-xl font-bold">台鋼雄鷹</p>
            </Link>
          </div>
          <div className="flex items-start gap-2">
            {players
              .filter(
                (player) => player.team === 6 && player.status !== "retired"
              )
              .sort((a, b) =>
                a.name.localeCompare(b.name, "zh-TW", { sensitivity: "base" })
              )
              .map((player) => (
                <Link
                  key={player.id}
                  href={`/players/${player.id}`}
                  className="flex items-center justify-between p-2 link"
                >
                  <p className="text-lg">
                    {player.number} {player.name}
                    {player.status === "unsigned" ? "#" : ""}
                    {player.status === "contract" ? "*" : ""}
                    {player.status === "independent" ? "◎" : ""}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
