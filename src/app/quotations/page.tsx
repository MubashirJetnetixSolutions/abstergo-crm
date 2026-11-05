"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import QuotationsStatCards from "@/components/quotations/QuotationsStatCards";
import QuotationsTable from "@/components/quotations/QuotationsTable";
import { PlusCircleIcon } from "@/components/icons/Icons";

export type QuotationTab = "Quotations" | "Awaiting Approval" | "Revision Requested";

const TABS: QuotationTab[] = [
  "Quotations",
  "Awaiting Approval",
  "Revision Requested",
];

export default function QuotationsPage() {
  const [activeTab, setActiveTab] = useState<QuotationTab>("Quotations");

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Quotations" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Section Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight tracking-tight">
                Quotations
              </h1>
              <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                Invoices, payments, and revenue
              </p>
            </div>

            {/* Add New Quotation Button */}
            <Link
              href="/quotations/new"
              className="px-4 py-3 rounded-[8px] flex items-center gap-2 border border-white/20 text-white font-medium text-[11px] sm:text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
              style={{
                background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
              }}
            >
              <PlusCircleIcon className="size-5 text-white" />
              <span>Add New Quotation</span>
            </Link>
          </div>

          {/* Tabs Bar Container (Card above the 5 stat cards as in mockups) */}
          <div className="w-full bg-white border border-[#EDEDED] rounded-[12px] px-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-8 overflow-x-auto">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3.5 text-[14px] font-medium transition-colors border-b-2 relative cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "text-[#FF611C] border-[#FF611C]"
                        : "text-[#575765] border-transparent hover:text-[#3D3D49]"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5 Stat Cards */}
          <QuotationsStatCards />

          {/* Quotations Data Table */}
          <QuotationsTable activeTab={activeTab} onTabChange={setActiveTab} />
        </main>
      </div>
    </div>
  );
}
