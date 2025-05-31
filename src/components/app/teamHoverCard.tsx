"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { TeamColor } from "@/components/app/gameCard";
import { teamToWord } from "@/components/app/teamLogo";
import Link from "next/link";

import { Globe } from "lucide-react";

const teams = [
  {
    name: "中信兄弟",
    fullName: "中信兄弟",
    word: "B",
    description: "",
    founded: "兄弟象(1990-2013)-中信兄弟(2014-至今)",
    logo: teamToWord("中信兄弟"),
    website: "https://www.brothers.tw/",
    mainStadium: "台中洲際棒球場",
    manager: "平野惠一",
  },
  {
    name: "統一獅",
    fullName: "統一7-ELEVEn獅",
    word: "L",
    description: "",
    founded: "統一獅(1990-2007)-統一7-ELEVEn獅(2008-至今)",
    logo: teamToWord("統一獅"),
    website: "https://www.uni-lions.com.tw/",
    mainStadium: "台南棒球場",
    manager: "林岳平",
  },
  {
    name: "樂天桃猿",
    fullName: "樂天桃猿",
    word: "R",
    description: "",
    founded:
      "第一金剛(2003)-La new熊(2004-2010)-Lamigo 桃猿(2011-2019)-樂天桃猿(2020-至今)",
    logo: teamToWord("樂天桃猿"),
    website: "https://monkeys.rakuten.com.tw/",
    mainStadium: "桃園國際棒球場",
    manager: "古久保健二",
  },
  {
    name: "富邦悍將",
    fullName: "富邦悍將",
    word: "G",
    description: teamToWord("富邦悍將"),
    founded:
      "俊國熊(1993-1995)-興農熊(1996上半季)-興農牛(1996下半季-2012)-義大犀牛(2013-2016)-富邦悍將(2017-至今)",
    logo: teamToWord("富邦悍將"),
    website: "https://www.fubonguardians.com/",
    mainStadium: "新莊棒球場",
    manager: "陳金鋒",
  },
  {
    name: "味全龍",
    fullName: "味全龍",
    word: "W",
    description: "",
    founded: "味全龍(1990-1999, 2019-至今)",
    logo: teamToWord("味全龍"),
    website: "https://www.wdragons.com",
    mainStadium: "天母棒球場",
    manager: "葉君璋",
  },
  {
    name: "台鋼雄鷹",
    fullName: "台鋼雄鷹",
    word: "T",
    description: "",
    founded: "台鋼雄鷹(2023-至今)",
    logo: teamToWord("台鋼雄鷹"),
    website: "https://www.tsghawks.com/",
    mainStadium: "高雄市立澄清湖棒球場",
    manager: "洪一中",
  },
];

export function TeamHoverCard({ team }: { team: string }) {
  const teamData = teams.find((t) => t.name === team) || {
    name: team,
    fullName: team,
    word: "",
    description: "",
    founded: "",
    logo: "",
    website: "",
    mainStadium: "",
    manager: "",
  };
  return (
    <HoverCard>
      <HoverCardTrigger>
        <span>{team}</span>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                alt={teamData.name}
                height={20}
                width={20}
                src={teamData.logo}
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
              <span className="">{teamData.mainStadium}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
