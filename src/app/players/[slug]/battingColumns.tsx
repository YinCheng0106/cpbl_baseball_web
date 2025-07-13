"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BattingStats } from "@/types/playerData";

export const battingColumns: ColumnDef<BattingStats>[] = [
  {
    accessorKey: "year",
    header: "年份",
  },
  {
    accessorKey: "team",
    header: "球隊",
  },
  {
    accessorKey:"games",
    header: "出賽數",
  },
  {
    accessorKey: "plateAppearances",
    header: "打席",
  },
  {
    accessorKey: "atBats",
    header: "打數",
  },
  {
    accessorKey: "runsBattedIn",
    header: "打點",
  },
  {
    accessorKey: "runs",
    header: "得分",
  },
  {
    accessorKey: "hits",
    header: "安打",
  },
  {
    accessorKey: "singles",
    header: "一安",
  },
  {
    accessorKey: "doubles",
    header: "二安",
  },
  {
    accessorKey: "triples",
    header: "三安",
  },
  {
    accessorKey: "homeRuns",
    header: "全壘打",
  },
  {
    accessorKey: "totalBases",
    header: "壘打數",
  },
  {
    accessorKey: "strikeouts",
    header: "被三振",
  },
  {
    accessorKey: "stolenBases",
    header: "盜壘",
  },
  {
    accessorKey: "onBasePercentage",
    header: "上壘率",
  },
  {
    accessorKey: "sluggingPercentage",
    header: "長打率",
  },
  {
    accessorKey: "battingAverage",
    header: "打擊率",
  },
  {
    accessorKey: "groundIntoDoublePlay",
    header: "雙殺打",
  },
  {
    accessorKey: "sacrificeBunts",
    header: "犧短",
  },
  {
    accessorKey: "sacrificeFlies",
    header: "犧飛",
  },
  {
    accessorKey: "baseOnBalls",
    header: "四壞",
  },
  {
    accessorKey: "intentionalBaseOnBalls",
    header: "故四"
  },
  {
    accessorKey: "hitByPitch",
    header: "死球",
  },
  {
    accessorKey: "caughtStealing",
    header: "盜壘刺",
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
  },
  {
    accessorKey: "stolenBasePercentage",
    header: "盜壘率",
  },
  {
    accessorKey: "onBasePlusSlugging",
    header: "整體攻擊指數",
  },
];