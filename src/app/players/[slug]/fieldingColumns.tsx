"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FieldingStats } from "@/types/playerData";

export const fieldingColumns: ColumnDef<FieldingStats>[] = [
  {
    accessorKey: "year",
    header: "年份",
  },
  {
    accessorKey: "team",
    header: "球隊",
  },
  {
    accessorKey: "position",
    header: "守備位置",
  },
  {
    accessorKey: "games",
    header: "出賽數",
  },
  {
    accessorKey: "totalChances",
    header: "守備機會",
  },
  {
    accessorKey: "putouts",
    header: "刺殺",
  },
  {
    accessorKey: "assists",
    header: "助殺",
  },
  {
    accessorKey: "errors",
    header: "失誤",
  },
  {
    accessorKey: "doublePlays",
    header: "雙殺",
  },
  {
    accessorKey: "triplePlays",
    header: "三殺",
  },
  {
    accessorKey: "fieldingPercentage",
    header: "守備率",
  }
];
