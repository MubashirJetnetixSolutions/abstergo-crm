import React from "react";
import { ContactsStatIcon } from "@/components/icons/Icons";

interface RepairStatCardProps {
  title: string;
  amount: string;
  subtitle: React.ReactNode;
  iconBgColor: string;
}

function RepairStatCard({ title, amount, subtitle, iconBgColor }: RepairStatCardProps) {
  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] px-[20px] py-[16px] flex-1 min-w-[200px] flex flex-col gap-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
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

export default function RepairsStatCards() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full"
      data-node-id="6304:20008"
    >
      <RepairStatCard
        title="Total Repairs"
        amount="64"
        subtitle={
          <span>
            <span className="text-[#12B680] font-medium">+28</span> this month
          </span>
        }
        iconBgColor="#FF611C"
      />
      <RepairStatCard
        title="Not Started"
        amount="24"
        subtitle="6,850,000 CFA"
        iconBgColor="#EDAC00"
      />
      <RepairStatCard
        title="In Repair"
        amount="16"
        subtitle="48 items"
        iconBgColor="#8A58FF"
      />
      <RepairStatCard
        title="Ready for Pickup"
        amount="21"
        subtitle="63 items in transit"
        iconBgColor="#0D79E4"
      />
      <RepairStatCard
        title="Completed"
        amount="3"
        subtitle="81% completed"
        iconBgColor="#009689"
      />
    </div>
  );
}
