"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PitchingStats } from "@/types/playerData";

export const pitchingColumns: ColumnDef<PitchingStats>[] = [
  {
    accessorKey: "year",
    header: "年份",
  },
  {
    accessorKey: "team",
    header: "球隊",
  },
  {
    accessorKey: "games",
    header: "出賽數",
  },
  {
    accessorKey: "gamesStarted",
    header: "先發",
  },
  {
    accessorKey: "gamesRelieved",
    header: "後援",
  },
  {
    accessorKey: "completeGames",
    header: "完投",
  },
  {
    accessorKey: "shutouts",
    header: "完封",
  },
  {
    accessorKey: "noBaseOnBalls",
    header: "無四死球",
  },
  {
    accessorKey: "wins",
    header: "勝場",
  },
  {
    accessorKey: "losses",
    header: "敗場",
  },
  {
    accessorKey: "saves",
    header: "救援成功",
  },
  {
    accessorKey: "blowSaves",
    header: "救援失敗",
  },
  {
    accessorKey: "holds",
    header: "中繼成功",
  },
  {
    accessorKey: "inningsPitched",
    header: "投球局數",
  },
  {
    accessorKey: "whip",
    header: "每局被上壘率",
  },
  {
    accessorKey: "era",
    header: "自責分率",
  },
  {
    accessorKey: "batterFaced",
    header: "面對打席",
  },
  {
    accessorKey: "numberOfPitches",
    header: "總投球數",
  },
  {
    accessorKey: "hits",
    header: "被安打",
  },
  {
    accessorKey: "homeRuns",
    header: "被全壘打",
  },
  {
    accessorKey: "baseOnBalls",
    header: "四壞",
  },
  {
    accessorKey: "intentionalBB",
    header: "故四",
  },
  {
    accessorKey: "hitByPitch",
    header: "死球",
  },
  {
    accessorKey: "strikeouts",
    header: "奪三振",
  },
  {
    accessorKey: "wildPitches",
    header: "暴投",
  },
  {
    accessorKey: "balks",
    header: "投手犯規",
  },
  {
    accessorKey: "runs",
    header: "失分",
  },
  {
    accessorKey: "earnedRuns",
    header: "自責分",
  },
  {
    accessorKey: "groundouts",
    header: "滾地出局",
  },
  {
    accessorKey: "flyOuts",
    header: "高飛出局",
  },
  {
    accessorKey: "groundoutFlyoutRatio",
    header: "滾飛出局比",
  }
];
