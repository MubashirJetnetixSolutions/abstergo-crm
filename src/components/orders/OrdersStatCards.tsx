import React from "react";
import { ContactsStatIcon } from "../icons/Icons";

interface OrderStatCardProps {
  title: string;
  amount: string;
  iconBgColor: string;
}

function OrderStatCard({ title, amount, iconBgColor }: OrderStatCardProps) {
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
      </div>
    </div>
  );
}

export default function OrdersStatCards() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full"
      data-node-id="6131:2561"
    >
      <OrderStatCard
        title="Total Orders"
        amount="248"
        iconBgColor="#FF611C"
      />
      <OrderStatCard
        title="Pending Orders"
        amount="32"
        iconBgColor="#EDAC00"
      />
      <OrderStatCard
        title="Awaiting Stock"
        amount="18"
        iconBgColor="#8A58FF"
      />
      <OrderStatCard
        title="Ready for Dispatch"
        amount="14"
        iconBgColor="#009689"
      />
      <OrderStatCard
        title="Outstanding"
        amount="8 450 000 CFA"
        iconBgColor="#F92424"
      />
    </div>
  );
}
