"use client";

import React from "react";
import {
  ExternalLinkIcon,
  SalesIcon,
  DeliveriesIcon,
  RepairsIcon,
  PurchasesIcon,
} from "./icons/Icons";

interface ActivityItem {
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  title: string;
  time: string;
  detail: string;
  author: string;
}

const activities: ActivityItem[] = [
  {
    icon: SalesIcon,
    iconBg: "#E7F2FC",
    iconBorder: "#0D79E4",
    iconColor: "#0D79E4",
    title: "Sale #INV-1048 created",
    time: "2 min ago",
    detail: "1,240,000 CFA",
    author: "Jean Martin",
  },
  {
    icon: DeliveriesIcon,
    iconBg: "#FFEFE8",
    iconBorder: "#FF611C",
    iconColor: "#FF611C",
    title: "Delivery #DEL-082 completed",
    time: "2 min ago",
    detail: "Tech Solutions SARL",
    author: "System",
  },
  {
    icon: RepairsIcon,
    iconBg: "#F3EEFF",
    iconBorder: "#8A58FF",
    iconColor: "#8A58FF",
    title: "Repair #REP-203 assigned",
    time: "2 min ago",
    detail: "MacBook Pro – Screen",
    author: "Alain Koné",
  },
  {
    icon: SalesIcon,
    iconBg: "#E5F4F3",
    iconBorder: "#009689",
    iconColor: "#009689",
    title: "Payment received from ABC Technologies",
    time: "2 min ago",
    detail: "850,000 CFA",
    author: "System",
  },
  {
    icon: PurchasesIcon,
    iconBg: "#E7F2FC",
    iconBorder: "#0D79E4",
    iconColor: "#0D79E4",
    title: "Purchase #PUR-118 received",
    time: "2 min ago",
    detail: "24 units – Dell Latitude",
    author: "Paul Koffi",
  },
];

export default function RecentActivityCard() {
  return (
    <div
      className="bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-full"
      data-node-id="6043:1608"
    >
      {/* Header */}
      <div className="min-h-[52px] px-4 py-3 border-b border-[#EDEDED] flex items-center justify-between gap-4 shrink-0">
        <h3 className="font-medium text-[#575765] text-[20px]">
          Recent Activity
        </h3>
        <button className="bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] px-2.5 py-1.5 flex items-center gap-1 text-[#575765] text-[11px] font-medium transition-colors cursor-pointer">
          <ExternalLinkIcon className="size-4 text-[#575765]" />
          <span>View Activity</span>
        </button>
      </div>

      {/* Feed */}
      <div className="p-4 flex flex-col justify-between gap-4 flex-1 overflow-y-auto">
        {activities.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-start gap-3 w-full">
              {/* Circular Icon Tag */}
              <div
                className="size-8 rounded-full border flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  backgroundColor: item.iconBg,
                  borderColor: item.iconBorder,
                  color: item.iconColor,
                }}
              >
                <Icon className="size-4" />
              </div>

              {/* Activity Info */}
              <div className="flex-1 min-w-0 flex flex-col gap-0.5 leading-tight">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                    {item.title}
                  </span>
                  <span className="font-normal text-[#575765] text-[11px] shrink-0">
                    {item.time}
                  </span>
                </div>
                <span className="font-normal text-[#575765] text-[11px]">
                  {item.detail}
                </span>
                <span className="font-normal text-[#575765] text-[11px] opacity-80">
                  {item.author}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
