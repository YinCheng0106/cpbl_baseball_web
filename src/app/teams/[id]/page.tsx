"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/utils/supabase";
import { teamToLogo } from "@/utils/teamUtils"; 
import { GameLocation } from "@/utils/gameUtils";

import { TeamData } from "@/types/teamData";

type Props = Readonly<{
  params: Promise<{ id : number }>;
}>

export default function Page({ params }: Props) {
  const [teamData, setTeams] = useState<TeamData[]>([]);
  const [teamId, setTeamId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(resolvedParams => {
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

  const data = teamData.find(team => team.id == teamId) as TeamData;
  if (!data) {
    return <div>Team not found.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="inline-flex items-center gap-4 mb-4">
        <Image
          src={teamToLogo(data.name['zh-tw'])}
          alt={`${data.name['zh-tw']} logo`}
          width={100}
          height={100}
        />
        <h2 className="text-4xl font-bold">{data.name['zh-tw']}</h2>
      </div>
      <div className={`
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
        gap-4 mb-8 bg-accent/100 p-8 rounded-lg shadow-lg
      `}>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">領隊</span>
          <p className="text-lg mb-2 ml-2">
            { data.generalManager.name["zh-tw"] ? `${data.generalManager.name["zh-tw"]}` : '：無' }
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">總教練</span>
          <p className="text-lg mb-2 ml-2">
            { data.manager.name["zh-tw"] ? `${data.manager.name["zh-tw"]}` : '：無' }
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">主球場</span>
          <p className="text-lg mb-2 ml-2">
            { data.stadium ? `${GameLocation(data.stadium)["zh-tw"]}` : '無' }
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">球團網站</span>
          <p className="text-lg mb-2 ml-2">
            { data.website ? (
            <Link className="link" href={data.website} target="_blank" rel="noopener noreferrer">
              {data.website}
            </Link>
            ) : '無' }
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">聯絡地址</span>
          <p className="text-lg mb-2 ml-2">
            { data.contact.address ? (
            <Link className="link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.contact.address['zh-tw'])}`} target="_blank" rel="noopener noreferrer">
              {data.contact.address['zh-tw']}
            </Link>
            ) : '無' }
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">聯絡電話</span>
          <p className="text-lg mb-2 ml-2">
            { data.contact.telephone ? (
            <Link className="link" href={`tel:${data.contact.telephone}`} target="_blank" rel="noopener noreferrer">
              {data.contact.telephone}
            </Link>
            ) : '無' }
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">傳真</span>
          <p className="text-lg mb-2 ml-2">
            { data.contact.fax ? (
            <Link className="link" href={`tel:${data.contact.fax}`} target="_blank" rel="noopener noreferrer">
              {data.contact.fax}
            </Link>
            ) : '無' }
          </p>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm dark:text-gray-400 text-gray-600">電子郵件</span>
          <p className="text-lg mb-2 ml-2">
            { data.contact.email ? (
            <Link className="link" href={`mailto:${data.contact.email}`} target="_blank" rel="noopener noreferrer">
              {data.contact.email}
            </Link>
            ) : '無' }
          </p>
        </div>
      </div>
    </div>
  )
}