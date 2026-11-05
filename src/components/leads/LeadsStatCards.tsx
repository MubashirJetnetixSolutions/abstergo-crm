"use client";

import React from "react";
import { ContactsStatIcon } from "@/components/icons/Icons";

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
    iconBg: "bg-[#1E75FF]",
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

export default function LeadsStatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
      {STAT_CARDS.map((card, idx) => (
        <div
          key={idx}
          className="bg-white border border-[#EDEDED] rounded-[12px] px-[20px] py-[16px] flex flex-col justify-between shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02)] transition hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <span className="font-medium text-[#575765] text-[20px] leading-tight">
              {card.title}
            </span>
            <div
              className={`flex size-11 items-center justify-center rounded-[12px] border-2 border-[#E9EDF2] p-[10px] ${card.iconBg} shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.8)] shrink-0`}
            >
              <ContactsStatIcon className="size-5 text-white" />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <span className="text-[28px] font-medium text-[#3D3D49] tracking-tight leading-none">
              {card.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
