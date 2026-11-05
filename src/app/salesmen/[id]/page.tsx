"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  MoreVerticalIcon,
  EditIcon,
} from "@/components/icons/Icons";

const SALESMAN_TABS = [
  "Overview",
  "Orders",
  "Sales",
  "Documents",
  "Activity",
] as const;

type SalesmanTabType = (typeof SALESMAN_TABS)[number];

export default function SalesmanDetailPage() {
  const params = useParams();
  const rawId = (params?.id as string) || "SAL-001";
  const salesmanId = decodeURIComponent(rawId);

  const [activeTab, setActiveTab] = useState<SalesmanTabType>("Overview");

  // Dynamic details based on ID or defaults from Mockup 1
  const isKwesi = salesmanId.includes("KB") || salesmanId === "SAL-001" || salesmanId === "s1";
  const name = isKwesi ? "Kwesi Boateng-Acheampong" : "Marcus Trescothik";

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Employees" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/employees"
                className="flex size-10 items-center justify-center rounded-[8px] border border-[#EDEDED] bg-white text-[#575765] shadow-xs transition hover:bg-neutral-50 hover:text-[#2B2523]"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="font-semibold text-[#2B2523] text-[20px] leading-tight">
                    {name}
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] text-[11px] font-medium bg-[#E5F4F3] text-[#009689] border border-[#009689]">
                    Active
                  </span>
                </div>
                <p className="text-[13px] text-[#575765] font-normal">
                  <span>Created on 19 Aug 2026 at 10:42 AM by </span>
                  <span className="font-semibold text-[#3D3D49]">
                    Jean Martin
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-[8px] border border-[#EDEDED] bg-white px-4 py-2 text-xs font-medium text-[#575765] shadow-xs transition hover:bg-neutral-50 hover:text-[#2B2523] cursor-pointer"
              >
                <EditIcon className="size-3.5 text-[#575765]" />
                <span>Edit Lead</span>
              </button>

              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-[8px] border border-[#EDEDED] bg-white text-[#575765] shadow-xs hover:bg-neutral-50 transition cursor-pointer"
              >
                <MoreVerticalIcon className="size-4" />
              </button>
            </div>
          </div>

          {/* Top Meta Summary Card (Exact Mockup 1) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div>
              <p className="text-[#575765] text-[13px] font-normal mb-1">
                Salesman ID
              </p>
              <span className="font-semibold text-[#2B2523] text-[13px]">
                {salesmanId.startsWith("SAL") ? salesmanId : "SAL-001"}
              </span>
            </div>

            <div>
              <p className="text-[#575765] text-[13px] font-normal mb-1">
                Email
              </p>
              <p className="font-semibold text-[#2B2523] text-[13px] truncate">
                abena.amponsah@gmail.com
              </p>
            </div>

            <div>
              <p className="text-[#575765] text-[13px] font-normal mb-1">
                Specialization
              </p>
              <p className="font-semibold text-[#2B2523] text-[13px]">
                Laptop &amp; Desktop
              </p>
            </div>

            <div>
              <p className="text-[#575765] text-[13px] font-normal mb-1">
                Experience
              </p>
              <p className="font-semibold text-[#2B2523] text-[13px]">
                5 years
              </p>
            </div>

            <div>
              <p className="text-[#575765] text-[13px] font-normal mb-1">
                Status
              </p>
              <div className="mt-0.5">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] text-[11px] font-medium bg-[#E5F4F3] text-[#009689] border border-[#009689]">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* 5 KPI Stat Cards (Exact Mockup 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* 1. Total Repairs */}
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[100px]">
              <span className="text-[13px] text-[#575765] font-normal">
                Total Repairs
              </span>
              <p className="text-[20px] font-semibold text-[#2B2523] leading-none">
                7
              </p>
            </div>

            {/* 2. Total Orders */}
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[100px]">
              <span className="text-[13px] text-[#575765] font-normal">
                Total Orders
              </span>
              <p className="text-[20px] font-semibold text-[#2B2523] leading-none">
                16
              </p>
            </div>

            {/* 3. Total Sales */}
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[100px]">
              <span className="text-[13px] text-[#575765] font-normal">
                Total Sales
              </span>
              <p className="text-[20px] font-semibold text-[#2B2523] leading-none">
                24
              </p>
            </div>

            {/* 4. Payments Received */}
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[100px]">
              <span className="text-[13px] text-[#575765] font-normal">
                Payments Received
              </span>
              <p className="text-[20px] font-semibold text-[#8A58FF] leading-none">
                74,000.00 CFA
              </p>
            </div>

            {/* 5. Repair Completion */}
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[100px]">
              <span className="text-[13px] text-[#575765] font-normal">
                Repair Completion
              </span>
              <p className="text-[20px] font-semibold text-[#009689] leading-none">
                98%
              </p>
            </div>
          </div>

          {/* Tab Navigation (Exact Mockup 1: Overview, Orders, Sales, Documents, Activity) */}
          <div className="border border-[#EDEDED] bg-white rounded-[8px] px-4 flex items-center gap-6 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            {SALESMAN_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-[13px] font-medium transition cursor-pointer ${
                  activeTab === tab
                    ? "text-[#FF611C] border-b-2 border-[#FF611C]"
                    : "text-[#575765] border-b-2 border-transparent hover:text-[#3D3D49]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content Areas */}
          {/* 1. OVERVIEW TAB (Exact Mockup 1) */}
          {activeTab === "Overview" && (
            <div className="flex flex-col gap-5 max-w-[1120px] w-full">
              {/* Card 1: Technician Information */}
              <div className="rounded-[12px] border border-[#EDEDED] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="min-h-[50px] flex items-center px-6 py-3.5 border-b border-[#EDEDED]">
                  <h2 className="text-[16px] font-semibold text-[#2B2523]">
                    Technician Information
                  </h2>
                </div>
                <div className="p-6 flex flex-col gap-3.5 text-[13px]">
                  <div className="flex items-center">
                    <span className="text-[#575765] font-normal w-1/3">
                      Technician Name:
                    </span>
                    <span className="text-[#2B2523] font-medium w-2/3">
                      Emmanuel Boateng
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#575765] font-normal w-1/3">
                      Specialization:
                    </span>
                    <span className="text-[#2B2523] font-medium w-2/3">
                      Laptop &amp; Desktop
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#575765] font-normal w-1/3">
                      Email:
                    </span>
                    <span className="text-[#2B2523] font-medium w-2/3">
                      e.boateng@abstergo.gh
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#575765] font-normal w-1/3">
                      Phone:
                    </span>
                    <span className="text-[#2B2523] font-medium w-2/3">
                      +233 24 500 1234
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#575765] font-normal w-1/3">
                      Experience:
                    </span>
                    <span className="text-[#2B2523] font-medium w-2/3">
                      5 Years
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#575765] font-normal w-1/3">
                      Address:
                    </span>
                    <span className="text-[#2B2523] font-medium w-2/3">
                      123 Liberation Road, Accra
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#575765] font-normal w-1/3">
                      Joining Date:
                    </span>
                    <span className="text-[#2B2523] font-medium w-2/3">
                      Aug 27, 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Salesman Capabilities */}
              <div className="rounded-[12px] border border-[#EDEDED] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="min-h-[50px] flex items-center px-6 py-3.5 border-b border-[#EDEDED]">
                  <h2 className="text-[16px] font-semibold text-[#2B2523]">
                    Salesman Capabilities
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-[13px] font-normal text-[#575765] leading-relaxed">
                    Senior technician. Lead for laptop repairs. Handles complex motherboard-level repairs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. ORDERS TAB */}
          {activeTab === "Orders" && (
            <div className="rounded-[12px] border border-[#EDEDED] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
              <div className="p-5 border-b border-[#EDEDED]">
                <h2 className="text-[16px] font-semibold text-[#2B2523]">
                  Assigned Orders
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b border-[#EDEDED] text-[11px] text-[#8C8C9A] font-medium">
                      <th className="py-3 px-4">Order #</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDEDED] text-[#3D3D49]">
                    {[
                      { id: "ORD-1001", customer: "Abena Osei-Bonsu", amount: "485,000 CFA", status: "Delivered", date: "12 Aug 2026" },
                      { id: "ORD-1002", customer: "Kweku Mensah", amount: "120,000 CFA", status: "In Transit", date: "15 Aug 2026" },
                      { id: "ORD-1003", customer: "Tech Solutions SARL", amount: "950,000 CFA", status: "Pending", date: "18 Aug 2026" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50/50">
                        <td className="py-3.5 px-4 font-medium text-[#FF611C]">{row.id}</td>
                        <td className="py-3.5 px-4">{row.customer}</td>
                        <td className="py-3.5 px-4 font-medium">{row.amount}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-[4px] bg-[#E5F4F3] text-[#009689] border border-[#009689] text-[11px] font-medium">
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#575765]">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. SALES TAB */}
          {activeTab === "Sales" && (
            <div className="rounded-[12px] border border-[#EDEDED] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
              <div className="p-5 border-b border-[#EDEDED]">
                <h2 className="text-[16px] font-semibold text-[#2B2523]">
                  Sales History
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b border-[#EDEDED] text-[11px] text-[#8C8C9A] font-medium">
                      <th className="py-3 px-4">Sale #</th>
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDEDED] text-[#3D3D49]">
                    {[
                      { id: "SAL-2041", product: "Dell Latitude 5440 (x2)", total: "970,000 CFA", payment: "Paid", date: "10 Aug 2026" },
                      { id: "SAL-2042", product: "HP EliteBook 840 G9", total: "650,000 CFA", payment: "Paid", date: "14 Aug 2026" },
                      { id: "SAL-2043", product: "Lenovo ThinkPad T14", total: "890,000 CFA", payment: "Partial", date: "18 Aug 2026" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50/50">
                        <td className="py-3.5 px-4 font-medium text-[#FF611C]">{row.id}</td>
                        <td className="py-3.5 px-4">{row.product}</td>
                        <td className="py-3.5 px-4 font-medium">{row.total}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-[4px] bg-[#E5F4F3] text-[#009689] border border-[#009689] text-[11px] font-medium">
                            {row.payment}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#575765]">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. DOCUMENTS TAB */}
          {activeTab === "Documents" && (
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-3">
              <h2 className="text-[16px] font-semibold text-[#2B2523]">
                Attached Documents
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {["Employment Contract.pdf", "National ID Card.pdf", "Sales Target Agreement.pdf"].map((doc, idx) => (
                  <div key={idx} className="border border-[#EDEDED] rounded-[8px] p-3 flex items-center justify-between hover:bg-neutral-50">
                    <span className="text-xs font-medium text-[#2B2523]">{doc}</span>
                    <button className="text-xs text-[#FF611C] hover:underline font-medium">Download</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. ACTIVITY TAB */}
          {activeTab === "Activity" && (
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
              <h2 className="text-[16px] font-semibold text-[#2B2523]">
                Recent Activity
              </h2>
              <div className="flex flex-col gap-3 text-xs text-[#575765]">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#009689]" />
                  <span>Closed sale <strong>SAL-2041</strong> for Dell Latitude 5440 · 2 hours ago</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#FF611C]" />
                  <span>Assigned new lead <strong>Abena Osei-Bonsu</strong> · Yesterday</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#8A58FF]" />
                  <span>Updated profile information · 19 Aug 2026</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
