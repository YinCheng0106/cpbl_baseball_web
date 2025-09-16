"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TeamColor } from "@/utils/gameUtils";
import { teamToWord } from "@/utils/teamUtils";
import Link from "next/link";

import { Globe } from "lucide-react";
import { Team } from "@/types/teamData";

type Props = Readonly<{
  team: Team[],
  id: number | string,
}>;

export function TeamHoverCard({ team, id }: Props) {
  const teamData = team.find((t) => t.id === parseInt(id as string)) || {
    id: 0,
    name: team.toString(),
    fullName: team.toString(),
    shortName: "",
    foundingYear: "",
    logo: "",
    website: "",
    stadium: "",
    manager: "",
  };
  return (
    <HoverCard>
      <HoverCardTrigger>
        <span>{teamData.shortName}</span>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                alt={teamData.name}
                height={20}
                width={20}
                src={teamData.name ? teamToWord(teamData.name) : ""}
              />
              <h3
                className={`text-xl font-bold ${TeamColor(teamData.fullName)}`}
              >
                {teamData.fullName}
              </h3>
            </div>
            <Link
              href={teamData.website}
              target="_blank"
              className={`
              flex items-center justify-center text-sm transform hover:scale-110 transition-all duration-200
              ${teamData.website === "" ? "hidden" : ""}
              `}
            >
              <Globe />
            </Link>
          </div>
          <div className="gird grid-cols-2 mt-2 gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="">總教練</span>
              <span className="">{teamData.manager}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="">主球場</span>
              <span className="">{teamData.stadium}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
