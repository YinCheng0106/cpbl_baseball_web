"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/utils/supabase";
import { teamToLogo } from "@/utils/teamUtils";
import { Stadium } from "@/utils/gameUtils";

import { Team } from "@/types/teamData";
import { PlayerData } from "@/types/playerData";

import { TeamPlayersCard } from "@/components/app/teamPlayersCard";

type Props = Readonly<{
  params: Promise<{ id: number }>;
}>;

export default function Page({ params }: Props) {
  const [loading, setLoading] = useState(true);
  const [teamData, setTeams] = useState<Team[]>([]);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [playersLoading, setPlayersLoading] = useState(true);
  const [teamPlayers, setTeamPlayers] = useState<PlayerData[]>([]);

  useEffect(() => {
    params.then((resolvedParams) => {
      setTeamId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    setLoading(true);
    async function fetchTeams() {
      const { data: teams } = await supabase
        .from("teams")
        .select(`*, team_stats(*)`);
      if (teams && teams.length > 0) {
        setTeams(teams);
      }
      setLoading(false);
    }
    fetchTeams();
  }, []);

  useEffect(() => {
    if (teamId === null) return;
    setPlayersLoading(true);
    async function fetchPlayersByTeam() {
      const { data: players } = await supabase
        .from("players")
        .select()
        .eq("team", teamId);
      if (players && players.length > 0) {
        setTeamPlayers(players as PlayerData[]);
      } else {
        setTeamPlayers([]);
      }
      setPlayersLoading(false);
    }
    fetchPlayersByTeam();
  }, [teamId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teamData || teamId === null) {
    return <div>Error loading team data.</div>;
  }

  const data = teamData.find((team) => team.id == teamId) as Team;
  if (!data) {
    return <div>Team not found.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="inline-flex items-center gap-4 mb-4">
        <Image
          src={teamToLogo(data.name)}
          alt={`${data.name} logo`}
          width={100}
          height={100}
        />
        <h2 className="text-4xl font-bold">{data.name}</h2>
      </div>
      <div
        className={`
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
        gap-4 mb-8 bg-accent/100 p-8 rounded-lg shadow-lg
      `}
      >
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">
            領隊
          </span>
          <p className="text-lg mb-2 ml-2">
            {data.generalManager.name["zh-tw"]
              ? `${data.generalManager.name["zh-tw"]}`
              : "：無"}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">
            總教練
          </span>
          <p className="text-lg mb-2 ml-2">
            {data.manager
              ? `${data.manager}`
              : "：無"}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">
            主球場
          </span>
          <p className="text-lg mb-2 ml-2">
            {data.stadium ? `${Stadium(data.stadium).fullName["zh-tw"]}` : "無"}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">
            球團網站
          </span>
          <p className="text-lg mb-2 ml-2">
            {data.website ? (
              <Link
                className="link"
                href={data.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.website}
              </Link>
            ) : (
              "無"
            )}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">
            聯絡地址
          </span>
          <p className="text-lg mb-2 ml-2">
            {data.address ? (
              <Link
                className="link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  data.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.address}
              </Link>
            ) : (
              "無"
            )}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">
            聯絡電話
          </span>
          <p className="text-lg mb-2 ml-2">
            {data.telephone ? (
              <Link
                className="link"
                href={`tel:${data.telephone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.telephone}
              </Link>
            ) : (
              "無"
            )}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">
            傳真
          </span>
          <p className="text-lg mb-2 ml-2">
            {data.fax ? (
              <Link
                className="link"
                href={`tel:${data.fax}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.fax}
              </Link>
            ) : (
              "無"
            )}
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">
            電子郵件
          </span>
          <p className="text-lg mb-2 ml-2">
            {data.email ? (
              <Link
                className="link"
                href={`mailto:${data.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.email}
              </Link>
            ) : (
              "無"
            )}
          </p>
        </div>
      </div>
      <div>
        <h3 className="flex flex-col gap-2 text-3xl font-bold">球員列表</h3>
        {playersLoading ? (
          <div className="py-8 text-center text-gray-500">Loading players…</div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <h4 className="py-4 text-2xl font-bold">教練</h4>
              <div
                className={`
                  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8
                  gap-4 justify-items-center
                `}
              >
                {teamPlayers
                  .filter((p) => p.league === "major" && p.position === "Coach")
                  .map((p) => (
                    <TeamPlayersCard key={p.id} playerId={String(p.id)} />
                  ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h4 className="py-4 text-2xl font-bold">投手</h4>
              <div
                className={`
                  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8
                  gap-4 justify-items-center
                `}
              >
                {teamPlayers
                  .filter(
                    (p) => p.league === "major" && p.position === "Pitcher"
                  )
                  .map((p) => (
                    <TeamPlayersCard key={p.id} playerId={String(p.id)} />
                  ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h4 className="py-4 text-2xl font-bold">捕手</h4>
              <div
                className={`
                  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8
                  gap-4 justify-items-center
                `}
              >
                {teamPlayers
                  .filter(
                    (p) => p.league === "major" && p.position === "Catcher"
                  )
                  .map((p) => (
                    <TeamPlayersCard key={p.id} playerId={String(p.id)} />
                  ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h4 className="py-4 text-2xl font-bold">內野手</h4>
              <div
                className={`
                  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8
                  gap-4 justify-items-center
                `}
              >
                {teamPlayers
                  .filter(
                    (p) =>
                      p.league === "major" &&
                      (p.position === "Shortstop" ||
                        p.position === "Third-Baseman" ||
                        p.position === "First-Baseman" ||
                        p.position === "Second-Baseman")
                  )
                  .map((p) => (
                    <TeamPlayersCard key={p.id} playerId={String(p.id)} />
                  ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h4 className="py-4 text-2xl font-bold">外野手</h4>
              <div
                className={`
                  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8
                  gap-4 justify-items-center
                `}
              >
                {teamPlayers
                  .filter(
                    (p) =>
                      p.league === "major" &&
                      (p.position === "Left-Fielder" ||
                        p.position === "Right-Fielder" ||
                        p.position === "Center-Field")
                  )
                  .map((p) => (
                    <TeamPlayersCard key={p.id} playerId={String(p.id)} />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
