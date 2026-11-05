"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import ExpenseStatCards from "@/components/expense/ExpenseStatCards";
import ExpenseTable from "@/components/expense/ExpenseTable";
import { PlusCircleIcon } from "@/components/icons/Icons";

export default function ExpensePage() {
  const [activeTab, setActiveTab] = useState<"all" | "awaiting" | "revision">("all");

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Expense" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Section Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight tracking-tight">
                Expense
              </h1>
              <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                Invoices, payments, and revenue
              </p>
            </div>

            {/* Add New Expense Button */}
            <Link
              href="/expense/new"
              className="px-4 py-3 rounded-[8px] flex items-center gap-2 border border-white/20 text-white font-medium text-[11px] sm:text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
              style={{
                background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
              }}
            >
              <PlusCircleIcon className="size-5 text-white" />
              <span>Add New Expense</span>
            </Link>
          </div>

          {/* Subheader Tab Navigation (Frame 6679:32451) */}
          <div className="w-full bg-white border border-[#EDEDED] rounded-[8px] px-[16px] flex items-center gap-[8px]">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-[20px] py-[10px] text-[16px] transition-colors cursor-pointer ${
                activeTab === "all"
                  ? "border-b-2 border-[#FF611C] text-[#FF611C] font-normal"
                  : "text-[#575765] hover:text-[#3D3D49]"
              }`}
            >
              All Expenses
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("awaiting")}
              className={`px-[20px] py-[10px] text-[16px] transition-colors cursor-pointer ${
                activeTab === "awaiting"
                  ? "border-b-2 border-[#FF611C] text-[#FF611C] font-normal"
                  : "text-[#575765] hover:text-[#3D3D49]"
              }`}
            >
              Awaiting Approval
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("revision")}
              className={`px-[20px] py-[10px] text-[16px] transition-colors cursor-pointer ${
                activeTab === "revision"
                  ? "border-b-2 border-[#FF611C] text-[#FF611C] font-normal"
                  : "text-[#575765] hover:text-[#3D3D49]"
              }`}
            >
              Revision Requested
            </button>
          </div>

          {/* Stat Cards - Only displayed on All Expenses per Figma 6330:14033 */}
          {activeTab === "all" && <ExpenseStatCards />}

          {/* Expense Data Table */}
          <ExpenseTable activeTab={activeTab} onTabChange={setActiveTab} />
        </main>
      </div>
    </div>
  );
}
