"use client";

import React from "react";
import { TechniciansIcon } from "@/components/icons/Icons";

interface StatCardProps {
  title: string;
  value: string;
  iconBg: string;
}

const STAT_CARDS: StatCardProps[] = [
  {
    title: "Total Leads",
    value: "16",
    iconBg: "bg-[#FF611C]",
  },
  {
    title: "New Leads",
    value: "2",
    iconBg: "bg-[#0D79E4]",
  },
  {
    title: "In Progress",
    value: "7",
    iconBg: "bg-[#EDAC00]",
  },
  {
    title: "Follow-up",
    value: "6",
    iconBg: "bg-[#8A58FF]",
  },
  {
    title: "Converted",
    value: "1",
    iconBg: "bg-[#009689]",
  },
];

export default function TechniciansStatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {STAT_CARDS.map((card, index) => {
        return (
          <div
            key={index}
            className="flex flex-col justify-between rounded-[12px] border border-[#E9ECEF] bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="font-normal text-[#575765] text-[16px]">
                {card.title}
              </span>
              <div
                className={`flex size-10 items-center justify-center rounded-[12px] border-2 border-[#E9EDF2] ${card.iconBg} shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.35)] shrink-0`}
              >
                <TechniciansIcon className="size-5 text-white" />
              </div>
            </div>

            <div className="mt-4">
              <span className="text-[18px] font-semibold text-[#3D3D49] tracking-tight">
                {card.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

