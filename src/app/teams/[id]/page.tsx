"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/utils/supabase";
import { teamToLogo } from "@/utils/teamUtils";
import { Stadium } from "@/utils/gameUtils";

import { TeamData } from "@/types/teamData";

import { TeamPlayersCard } from "@/components/app/teamPlayersCard";

type Props = Readonly<{
  params: Promise<{ id: number; }>;
}>;

export default function Page({ params }: Props) {
  const [loading, setLoading] = useState(true);
  const [teamData, setTeams] = useState<TeamData[]>([]);
  const [teamId, setTeamId] = useState<number | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setTeamId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    setLoading(true);
    async function fetchTeams() {
      const { data: teams } = await supabase.from("teams").select();
      if (teams && teams.length > 0) {
        setTeams(teams);
      }
      setLoading(false);
    }
    fetchTeams();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!teamData || teamId === null) {
    return <div>Error loading team data.</div>;
  }

  const data = teamData.find((team) => team.id == teamId) as TeamData;
  if (!data) {
    return <div>Team not found.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="inline-flex items-center gap-4 mb-4">
        <Image
          src={teamToLogo(data.name["zh-tw"])}
          alt={`${data.name["zh-tw"]} logo`}
          width={100}
          height={100}
        />
        <h2 className="text-4xl font-bold">{data.name["zh-tw"]}</h2>
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
            {data.manager.name["zh-tw"]
              ? `${data.manager.name["zh-tw"]}`
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
            {data.contact.address ? (
              <Link
                className="link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  data.contact.address["zh-tw"]
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.contact.address["zh-tw"]}
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
            {data.contact.telephone ? (
              <Link
                className="link"
                href={`tel:${data.contact.telephone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.contact.telephone}
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
            {data.contact.fax ? (
              <Link
                className="link"
                href={`tel:${data.contact.fax}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.contact.fax}
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
            {data.contact.email ? (
              <Link
                className="link"
                href={`mailto:${data.contact.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.contact.email}
              </Link>
            ) : (
              "無"
            )}
          </p>
        </div>
      </div>
      <div>
        <h3 className="flex flex-col gap-2 text-3xl font-bold">球員列表</h3>
        <div className="flex flex-col items-center justify-center">
          <h4 className="py-4 text-2xl font-bold">教練</h4>
            <div className={`
              grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8
              gap-4 justify-items-center
            `}>
            {data.coach["major"].map((coach) => (
              <TeamPlayersCard key={coach} playerId={coach} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4 className="py-4 text-2xl font-bold">投手</h4>
            <div className={`
              grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8
              gap-4 justify-items-center
            `}>
            {data.pitcher["major"].map((pitcher) => (
              <TeamPlayersCard key={pitcher} playerId={pitcher} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4 className="py-4 text-2xl font-bold">捕手</h4>
            <div className={`
              grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8
              gap-4 justify-items-center
            `}>
            {data.catcher["major"].map((catcher) => (
              <TeamPlayersCard key={catcher} playerId={catcher} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4 className="py-4 text-2xl font-bold">內野手</h4>
            <div className={`
              grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8
              gap-4 justify-items-center
            `}>
            {data.infielder["major"].map((infielder) => (
              <TeamPlayersCard key={infielder} playerId={infielder} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4 className="py-4 text-2xl font-bold">外野手</h4>
            <div className={`
              grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8
              gap-4 justify-items-center
            `}>
            {data.outfielder["major"].map((outfielder) => (
              <TeamPlayersCard key={outfielder} playerId={outfielder} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
