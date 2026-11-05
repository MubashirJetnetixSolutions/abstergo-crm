"use client";

import React from "react";
import { ContactsStatIcon } from "./icons/Icons";

interface StatCardProps {
  title: string;
  amount: string;
  subtitle: React.ReactNode;
  iconBgColor: string;
}

function StatCard({ title, amount, subtitle, iconBgColor }: StatCardProps) {
  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] px-[20px] py-[16px] flex-1 min-w-[240px] flex flex-col gap-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-[#575765] text-[20px]">
          {title}
        </span>
        <div
          className="size-11 rounded-[12px] p-[10px] flex items-center justify-center shrink-0 relative text-white border-2 border-[#E9EDF2]"
          style={{ backgroundColor: iconBgColor }}
        >
          <div className="absolute inset-0 rounded-[12px] shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.8)] pointer-events-none" />
          <ContactsStatIcon className="size-5 text-white relative z-10" />
        </div>
      </div>
      <div className="flex flex-col gap-[8px]">
        <span className="font-medium text-[#3D3D49] text-[28px] tracking-tight leading-none">
          {amount}
        </span>
        <div className="text-[#575765] text-[14px] font-normal leading-normal">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

export default function OverviewSection() {
  return (
    <section className="w-full flex flex-col gap-6" data-node-id="6026:1191">
      {/* Section Title */}
      <h2 className="font-medium text-[#575765] text-[20px] leading-none">
        Overview
      </h2>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full" data-node-id="6026:1552">
        <StatCard
          title="Total Sales"
          amount="24,850,000 CFA"
          subtitle={
            <p className="flex items-center gap-1">
              <span className="text-[#12B680] font-medium">10%</span>
              <span>increase since last month</span>
            </p>
          }
          iconBgColor="#FF611C"
        />
        <StatCard
          title="Outstanding"
          amount="18,420,000 CFA"
          subtitle={<span>42 Customers</span>}
          iconBgColor="#EDAC00"
        />
        <StatCard
          title="Cash In"
          amount="7,860,000 CFA"
          subtitle={<span>This month</span>}
          iconBgColor="#009689"
        />
        <StatCard
          title="Cash Out"
          amount="9,240,000 CFA"
          subtitle={<span>This month</span>}
          iconBgColor="#8A58FF"
        />
      </div>
    </section>
  );
}

