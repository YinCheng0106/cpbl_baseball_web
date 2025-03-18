"use client";

import * as React from "react";
import { Moon, Sun, Server } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeIcons = {
  dark: <Moon />,
  light: <Sun />,
  system: <Server />,
} as Record<string, React.ReactNode>;

const ThemeNames = {
  dark: '深色',
  light: '淺色',
  system: '系統',
} as Record<string, React.ReactNode>;

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {ThemeIcons[theme ?? 'system']}
          {ThemeNames[theme ?? 'system']}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          淺色
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          深色
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          系統
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
