import React from "react";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import InvoicesStatCards from "@/components/invoices/InvoicesStatCards";
import InvoicesTable from "@/components/invoices/InvoicesTable";

export default function InvoicesPage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Invoices" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-8 max-w-[1680px] w-full mx-auto">
          {/* Section Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight tracking-tight">
                Invoices
              </h1>
              <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                Invoices, payments, and revenue
              </p>
            </div>
          </div>

          {/* 5 Stat Cards */}
          <InvoicesStatCards />

          {/* Invoices Data Table */}
          <InvoicesTable />
        </main>
      </div>
    </div>
  );
}
