"use client";

import React from "react";
import { ContactsStatIcon } from "@/components/icons/Icons";

interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  subtextColor?: string;
  iconBg: string;
}

const STAT_CARDS: StatCardProps[] = [
  {
    title: "Total Deliveries",
    value: "324",
    subtext: "+28 this month",
    subtextColor: "text-[#009689]",
    iconBg: "bg-[#FF611C]",
  },
  {
    title: "Pending Deliveries",
    value: "24",
    subtext: "6,850,000 CFA",
    subtextColor: "text-[#575765]",
    iconBg: "bg-[#EDAC00]",
  },
  {
    title: "Preparing",
    value: "16",
    subtext: "48 items",
    subtextColor: "text-[#575765]",
    iconBg: "bg-[#8A58FF]",
  },
  {
    title: "Dispatched",
    value: "21",
    subtext: "63 items in transit",
    subtextColor: "text-[#575765]",
    iconBg: "bg-[#1E75FF]",
  },
  {
    title: "Delivered",
    value: "260",
    subtext: "81% completed",
    subtextColor: "text-[#575765]",
    iconBg: "bg-[#009689]",
  },
];

export default function DeliveriesStatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {STAT_CARDS.map((card, index) => {
        return (
          <div
            key={index}
            className="flex flex-col justify-between rounded-[12px] border border-[#EDEDED] bg-white px-[20px] py-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02)] transition hover:shadow-md"
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
              <span
                className={`text-[14px] font-normal ${
                  card.subtextColor || "text-[#575765]"
                }`}
              >
                {card.subtext}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

