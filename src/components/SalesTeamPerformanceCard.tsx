"use client";

import React from "react";
import { ExternalLinkIcon } from "./icons/Icons";

interface SalesMember {
  rank: string;
  initials: string;
  tagBg: string;
  tagColor: string;
  name: string;
  percentage: string;
  barColor: string;
  barWidth: string;
  revenue: string;
  target: string;
  stats: string;
}

const members: SalesMember[] = [
  {
    rank: "#1",
    initials: "AS",
    tagBg: "#f3eeff",
    tagColor: "#8a58ff",
    name: "Jean Martin",
    percentage: "84%",
    barColor: "#ff611c",
    barWidth: "84%",
    revenue: "8.4M CFA",
    target: "of 10.0M CFA",
    stats: "48 leads · 65% conv",
  },
  {
    rank: "#2",
    initials: "AS",
    tagBg: "#e5f4f3",
    tagColor: "#009689",
    name: "Jean Martin",
    percentage: "84%",
    barColor: "#009689",
    barWidth: "84%",
    revenue: "8.4M CFA",
    target: "of 10.0M CFA",
    stats: "48 leads · 65% conv",
  },
  {
    rank: "#3",
    initials: "AS",
    tagBg: "#fdf7e5",
    tagColor: "#edac00",
    name: "Jean Martin",
    percentage: "84%",
    barColor: "#edac00",
    barWidth: "84%",
    revenue: "8.4M CFA",
    target: "of 10.0M CFA",
    stats: "48 leads · 65% conv",
  },
  {
    rank: "#4",
    initials: "AS",
    tagBg: "#ffefe8",
    tagColor: "#ff611c",
    name: "Jean Martin",
    percentage: "84%",
    barColor: "#8a58ff",
    barWidth: "84%",
    revenue: "8.4M CFA",
    target: "of 10.0M CFA",
    stats: "48 leads · 65% conv",
  },
  {
    rank: "#5",
    initials: "AS",
    tagBg: "#e7f2fc",
    tagColor: "#0d79e4",
    name: "Jean Martin",
    percentage: "84%",
    barColor: "#0d79e4",
    barWidth: "84%",
    revenue: "8.4M CFA",
    target: "of 10.0M CFA",
    stats: "48 leads · 65% conv",
  },
  {
    rank: "#7",
    initials: "AS",
    tagBg: "#e5f4f3",
    tagColor: "#009689",
    name: "Jean Martin",
    percentage: "84%",
    barColor: "#009689",
    barWidth: "84%",
    revenue: "8.4M CFA",
    target: "of 10.0M CFA",
    stats: "48 leads · 65% conv",
  },
];

export default function SalesTeamPerformanceCard() {
  return (
    <div
      className="bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-full"
      data-node-id="6026:2060"
    >
      {/* Header */}
      <div className="min-h-[52px] px-4 py-3 border-b border-[#EDEDED] flex items-center justify-between gap-4 shrink-0">
        <h3 className="font-medium text-[#575765] text-[20px]">
          Sales Team Performance
        </h3>
        <button className="bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] px-2.5 py-1.5 flex items-center gap-1 text-[#575765] text-[11px] font-medium transition-colors cursor-pointer">
          <ExternalLinkIcon className="size-4 text-[#575765]" />
          <span>View Details</span>
        </button>
      </div>

      {/* List */}
      <div className="p-4 flex flex-col gap-4 overflow-y-auto">
        {members.map((m, idx) => (
          <div key={idx} className="flex items-center gap-4 w-full">
            {/* Rank */}
            <span className="w-[18px] text-center font-normal text-[#575765] text-[11px] shrink-0">
              {m.rank}
            </span>

            {/* Initials Badge */}
            <div
              className="size-8 rounded-full p-1 flex items-center justify-center shrink-0"
              style={{ backgroundColor: m.tagBg }}
            >
              <span
                className="font-normal text-[11px] leading-none"
                style={{ color: m.tagColor }}
              >
                {m.initials}
              </span>
            </div>

            {/* Member Details */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                  {m.name}
                </span>
                <span className="font-medium text-[#FF611C] text-[11px] shrink-0">
                  {m.percentage}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-[#F0F1FA] border border-[#F0F1FA] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: m.barColor,
                    width: m.barWidth,
                  }}
                />
              </div>

              {/* Meta stats */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[#575765] text-[11px] font-normal leading-tight">
                <span>{m.revenue}</span>
                <span>{m.target}</span>
                <span>{m.stats}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
