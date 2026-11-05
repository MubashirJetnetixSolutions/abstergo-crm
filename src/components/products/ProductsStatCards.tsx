import React from "react";
import { ContactsStatIcon } from "../icons/Icons";

interface ProductStatCardProps {
  title: string;
  amount: string;
  subtitle: string;
  iconBgColor: string;
}

function ProductStatCard({ title, amount, subtitle, iconBgColor }: ProductStatCardProps) {
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

export default function ProductsStatCards() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full"
      data-node-id="6175:19825"
    >
      <ProductStatCard
        title="Total Products"
        amount="167 Products"
        subtitle="160 Active"
        iconBgColor="#FF611C"
      />
      <ProductStatCard
        title="Stock Purchase Price"
        amount="9,240,000 CFA"
        subtitle="167 total products"
        iconBgColor="#0D79E4"
      />
      <ProductStatCard
        title="Stock Selling Price"
        amount="9,240,000 CFA"
        subtitle="167 total products"
        iconBgColor="#8A58FF"
      />
      <ProductStatCard
        title="Out-of-stock"
        amount="16"
        subtitle="167 total products"
        iconBgColor="#F92424"
      />
    </div>
  );
}
