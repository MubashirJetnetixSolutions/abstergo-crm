import React from "react";
import { ContactsStatIcon } from "../icons/Icons";

interface QuotationStatCardProps {
  title: string;
  amount: string;
  iconBgColor: string;
}

function QuotationStatCard({ title, amount, iconBgColor }: QuotationStatCardProps) {
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

export default function QuotationsStatCards() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full"
      data-node-id="6249:21266"
    >
      <QuotationStatCard
        title="Total Quotations"
        amount="108"
        iconBgColor="#FF611C"
      />
      <QuotationStatCard
        title="Pending Response"
        amount="18"
        iconBgColor="#EDAC00"
      />
      <QuotationStatCard
        title="Pipeline Value"
        amount=" 200,486 CFA"
        iconBgColor="#8A58FF"
      />
      <QuotationStatCard
        title="Approved"
        amount="78"
        iconBgColor="#009689"
      />
      <QuotationStatCard
        title="Converted"
        amount="12"
        iconBgColor="#0D79E4"
      />
    </div>
  );
}
