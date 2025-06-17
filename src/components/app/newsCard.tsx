"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Img from "next/image";
import Link from "next/link";

import { NewsData } from "@/types/newsData";

type Props = Readonly<{ news?: NewsData; }>;

export function NewsCard({ news }: Props) {
  if (!news) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>載入中...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-84 max-w-sm">
      { news.image == "" ? "" : (
        <div className="px-4">
          <Img
            src={ news.image }
            alt={ news.title }
            width={200}
            height={200}
            className={`
              w-full object-cover rounded-xl
              hover:scale-105 transition-transform duration-300
              hover:shadow-lg
            `}
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>
          <Link href={`/news/${news.id}`} className="text-md font-semibold hover:underline">
            {news.title}
          </Link>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}
