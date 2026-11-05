"use client";

import React from "react";
import { ExternalLinkIcon, AlertCircleIcon, InfoIcon } from "./icons/Icons";

interface RepairStatusItem {
  color: string;
  label: string;
  count: string;
  progressPercent: string;
}

const repairItems: RepairStatusItem[] = [
  { color: "#FF611C", label: "Waiting", count: "5/10", progressPercent: "50%" },
  { color: "#009689", label: "Waiting", count: "5/10", progressPercent: "50%" },
  { color: "#EDAC00", label: "Waiting", count: "5/10", progressPercent: "50%" },
  { color: "#8A58FF", label: "Waiting", count: "5/10", progressPercent: "50%" },
  { color: "#0D79E4", label: "Waiting", count: "5/10", progressPercent: "50%" },
];

export default function RepairOverviewCard() {
  return (
    <div
      className="bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-full"
      data-node-id="6043:1517"
    >
      {/* Header */}
      <div className="min-h-[52px] px-4 py-3 border-b border-[#EDEDED] flex items-center justify-between gap-4 shrink-0">
        <h3 className="font-medium text-[#575765] text-[20px]">
          Repair Overview
        </h3>
        <button className="bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] px-2.5 py-1.5 flex items-center gap-1 text-[#575765] text-[11px] font-medium transition-colors cursor-pointer">
          <ExternalLinkIcon className="size-4 text-[#575765]" />
          <span>View Details</span>
        </button>
      </div>

      {/* Top summary row */}
      <div className="p-4 border-b border-[#EDEDED] flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1 shrink-0">
          <span className="font-normal text-[#575765] text-[11px]">
            Active repairs
          </span>
          <span className="font-medium text-[#3D3D49] text-[11px]">
            56
          </span>
        </div>

        <div className="bg-[rgba(255,97,28,0.1)] border border-[#FF611C] rounded-[6px] p-2 flex items-center gap-1.5 text-[#FF611C] text-[11px]">
          <AlertCircleIcon className="size-4 shrink-0" />
          <span className="leading-tight font-normal">
            5 repairs have been waiting for more than 7 days
          </span>
        </div>
      </div>

      {/* 5 Status rows */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3.5 border-b border-[#E9EDF2]">
        {repairItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 w-full">
            {/* Color Dot */}
            <span
              className="size-2 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />

            <div className="flex-1 min-w-0 flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[#3D3D49]">
                <span className="font-medium text-[11px] leading-tight">
                  {item.label}
                </span>
                <span className="font-medium text-[11px] text-right">
                  {item.count}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-[#F0F1FA] border border-[#F0F1FA] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: item.color,
                    width: item.progressPercent,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info Box */}
      <div className="p-4 shrink-0">
        <div className="bg-[#F5F5F5] border border-[#EDEDED] rounded-[6px] p-2 flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1.5 text-[#3D3D49]">
            <InfoIcon className="size-4 text-[#575765] shrink-0" />
            <span className="font-normal">Average turnaround</span>
          </div>
          <span className="text-[#575765] font-normal">4.6 days</span>
        </div>
      </div>
    </div>
  );
}
