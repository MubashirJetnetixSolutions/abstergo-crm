"use client";

import React from "react";
import { TrendUpIcon, TrendDownIcon } from "@/components/icons/Icons";

interface StatCardProps {
  title: string;
  value: string;
  trendText: string;
  trendType?: "up" | "down" | "neutral";
}

const STAT_CARDS_ROW_1: StatCardProps[] = [
  {
    title: "Total Sales",
    value: "24,850,000 CFA",
    trendText: "10% increase since last month",
    trendType: "up",
  },
  {
    title: "Total Revenue",
    value: "61,090,000 CFA",
    trendText: "42 Customers",
    trendType: "neutral",
  },
  {
    title: "Total Expenses",
    value: "32,450,000 CFA",
    trendText: "10% decrease since last month",
    trendType: "down",
  },
  {
    title: "Net Profit",
    value: "28,640,000 CFA",
    trendText: "17% increase since last month",
    trendType: "up",
  },
];

const STAT_CARDS_ROW_2: StatCardProps[] = [
  {
    title: "Total Orders",
    value: "248",
    trendText: "10+ than last month",
    trendType: "up",
  },
  {
    title: "Accounts Receivable",
    value: "20,900,000 CFA",
    trendText: "10% decrease since last month",
    trendType: "down",
  },
  {
    title: "Accounts Payable",
    value: "26,200,000 CFA",
    trendText: "Remaining",
    trendType: "neutral",
  },
  {
    title: "Cash Balance",
    value: "42,680,000 CFA",
    trendText: "Total amount",
    trendType: "neutral",
  },
];

function StatCard({ card }: { card: StatCardProps }) {
  return (
    <div className="flex flex-col justify-between rounded-[12px] border border-[#EDEDED] bg-white px-[20px] py-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02)] transition hover:shadow-md">
      <span className="font-medium text-[#575765] text-[20px] leading-tight">
        {card.title}
      </span>

      <div className="mt-3 flex flex-col gap-2">
        <span className="text-[28px] font-medium text-[#3D3D49] tracking-tight leading-none">
          {card.value}
        </span>
        <div className="flex items-center gap-1.5">
          {card.trendType === "up" && (
            <span className="flex items-center gap-1 text-[14px] font-normal text-[#009689]">
              <TrendUpIcon className="size-3.5 text-[#009689]" />
              {card.trendText}
            </span>
          )}
          {card.trendType === "down" && (
            <span className="flex items-center gap-1 text-[14px] font-normal text-[#F92424]">
              <TrendDownIcon className="size-3.5 text-[#F92424]" />
              {card.trendText}
            </span>
          )}
          {card.trendType === "neutral" && (
            <span className="text-[14px] font-normal text-[#575765]">
              {card.trendText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FinanceOverviewStatCards() {
  return (
    <div className="flex flex-col gap-4">
      {/* Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS_ROW_1.map((card, idx) => (
          <StatCard key={idx} card={card} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS_ROW_2.map((card, idx) => (
          <StatCard key={idx} card={card} />
        ))}
      </div>
    </div>
  );
}
