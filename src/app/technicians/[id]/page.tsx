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
  UploadIcon,
  CheckmarkCircleIcon,
  DeliveriesIcon,
  RepairsIcon,
} from "@/components/icons/Icons";

const TABS = [
  "Overview",
  "Repairs",
  "Documents",
  "Activity",
] as const;

type TabType = (typeof TABS)[number];

export default function TechnicianDetailPage() {
  const params = useParams();
  const rawId = (params?.id as string) || "TECH-001";
  const techId = decodeURIComponent(rawId);
  const [activeTab, setActiveTab] = useState<TabType>("Overview");

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
                    Emmanuel Boateng
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

          {/* Top Meta Summary Card (Exact Mockup 2) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <div>
              <p className="text-[#575765] text-[13px] font-normal mb-1">
                Technician ID
              </p>
              <span className="font-semibold text-[#2B2523] text-[13px]">
                {techId.startsWith("TECH") ? techId : "TECH-001"}
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

          {/* 5 KPI Stat Cards (Exact Mockup 2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[100px]">
              <span className="text-[13px] text-[#575765] font-normal">
                Total Repairs
              </span>
              <p className="text-[20px] font-semibold text-[#2B2523] leading-none">
                7
              </p>
            </div>

            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[100px]">
              <span className="text-[13px] text-[#575765] font-normal">
                Total Orders
              </span>
              <p className="text-[20px] font-semibold text-[#2B2523] leading-none">
                16
              </p>
            </div>

            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[100px]">
              <span className="text-[13px] text-[#575765] font-normal">
                Total Sales
              </span>
              <p className="text-[20px] font-semibold text-[#2B2523] leading-none">
                24
              </p>
            </div>

            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[100px]">
              <span className="text-[13px] text-[#575765] font-normal">
                Payments Received
              </span>
              <p className="text-[20px] font-semibold text-[#8A58FF] leading-none">
                74,000.00 CFA
              </p>
            </div>

            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[100px]">
              <span className="text-[13px] text-[#575765] font-normal">
                Repair Completion
              </span>
              <p className="text-[20px] font-semibold text-[#009689] leading-none">
                98%
              </p>
            </div>
          </div>

          {/* Tab Navigation (Exact Mockup 2: Overview, Repairs, Documents, Activity) */}
          <div className="border border-[#EDEDED] bg-white rounded-[8px] px-4 flex items-center gap-6 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            {TABS.map((tab) => (
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

          {/* 1. OVERVIEW TAB (Exact Mockup 2) */}
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

              {/* Card 2: Skills */}
              <div className="rounded-[12px] border border-[#EDEDED] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="min-h-[50px] flex items-center px-6 py-3.5 border-b border-[#EDEDED]">
                  <h2 className="text-[16px] font-semibold text-[#2B2523]">
                    Skills
                  </h2>
                </div>
                <div className="p-6 flex flex-wrap gap-2.5">
                  {[
                    "Motherboard Repair",
                    "SSD Upgrade",
                    "OS Installation",
                    "Data Recovery",
                    "RAM Upgrade",
                  ].map((skill, idx) => (
                    <span
                      key={idx}
                      className="rounded-[6px] border border-[#0D79E4] bg-[#E7F2FC] px-2.5 py-1 text-[11px] font-normal text-[#0D79E4]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3: Technician Capabilities */}
              <div className="rounded-[12px] border border-[#EDEDED] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
                <div className="min-h-[50px] flex items-center px-6 py-3.5 border-b border-[#EDEDED]">
                  <h2 className="text-[16px] font-semibold text-[#2B2523]">
                    Technician Capabilities
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

          {/* 2. REPAIRS TAB (Figma 6432:30393) */}
          {activeTab === "Repairs" && (
            <div className="rounded-[12px] border border-[#E9ECEF] bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-[#E9ECEF]">
                <h2 className="text-[20px] font-semibold text-[#3D3D49]">
                  Repair History
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#E9ECEF] bg-[#F8FAFD] text-[#8C8C9A] font-semibold">
                    <tr>
                      <th className="py-3.5 px-4">Repair#</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Product</th>
                      <th className="py-3.5 px-4">Serial / IMEI</th>
                      <th className="py-3.5 px-4">Issue</th>
                      <th className="py-3.5 px-4">Cost</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9ECEF]">
                    {[
                      {
                        id: "REP-0234",
                        date: "19 Aug 2026",
                        cust: "ABC Technologies",
                        custInitials: "AB",
                        product: "Samsung Galaxy S24 Ultra",
                        serial: "DL5440-23B81",
                        issue: "Display Issue & hardware replacement",
                        cost: "6 500 000 CFA",
                        status: "Received",
                        statusBadge: "bg-[#e7f2fc] text-[#0d79e4] border border-[#0d79e4]",
                      },
                      {
                        id: "REP-0234",
                        date: "19 Aug 2026",
                        cust: "ABC Technologies",
                        custInitials: "AB",
                        product: "Samsung Galaxy S24 Ultra",
                        serial: "DL5440-23B81",
                        issue: "Display Issue & hardware replacement",
                        cost: "6 500 000 CFA",
                        status: "In-Repair",
                        statusBadge: "bg-[#fdf7e5] text-[#d97706] border border-[#f59e0b]",
                      },
                      {
                        id: "REP-0234",
                        date: "19 Aug 2026",
                        cust: "ABC Technologies",
                        custInitials: "AB",
                        product: "Samsung Galaxy S24 Ultra",
                        serial: "DL5440-23B81",
                        issue: "Display Issue & hardware replacement",
                        cost: "6 500 000 CFA",
                        status: "In-Repair",
                        statusBadge: "bg-[#f3eeff] text-[#8a58ff] border border-[#8a58ff]",
                      },
                      {
                        id: "REP-0234",
                        date: "19 Aug 2026",
                        cust: "ABC Technologies",
                        custInitials: "AB",
                        product: "Samsung Galaxy S24 Ultra",
                        serial: "DL5440-23B81",
                        issue: "Display Issue & hardware replacement",
                        cost: "6 500 000 CFA",
                        status: "Irreparable",
                        statusBadge: "bg-[#fff0f0] text-[#e02d3c] border border-[#ffd5d8]",
                      },
                      {
                        id: "REP-0234",
                        date: "19 Aug 2026",
                        cust: "ABC Technologies",
                        custInitials: "AB",
                        product: "Samsung Galaxy S24 Ultra",
                        serial: "DL5440-23B81",
                        issue: "Display Issue & hardware replacement",
                        cost: "6 500 000 CFA",
                        status: "Draft",
                        statusBadge: "bg-gray-100 text-gray-700 border border-gray-300",
                      },
                      {
                        id: "REP-0234",
                        date: "19 Aug 2026",
                        cust: "ABC Technologies",
                        custInitials: "AB",
                        product: "Samsung Galaxy S24 Ultra",
                        serial: "DL5440-23B81",
                        issue: "Display Issue & hardware replacement",
                        cost: "6 500 000 CFA",
                        status: "In-Repair",
                        statusBadge: "bg-[#f3eeff] text-[#8a58ff] border border-[#8a58ff]",
                      },
                      {
                        id: "REP-0234",
                        date: "19 Aug 2026",
                        cust: "ABC Technologies",
                        custInitials: "AB",
                        product: "Samsung Galaxy S24 Ultra",
                        serial: "DL5440-23B81",
                        issue: "Display Issue & hardware replacement",
                        cost: "6 500 000 CFA",
                        status: "Received",
                        statusBadge: "bg-[#e7f2fc] text-[#0d79e4] border border-[#0d79e4]",
                      },
                      {
                        id: "REP-0234",
                        date: "19 Aug 2026",
                        cust: "ABC Technologies",
                        custInitials: "AB",
                        product: "Samsung Galaxy S24 Ultra",
                        serial: "DL5440-23B81",
                        issue: "Display Issue & hardware replacement",
                        cost: "6 500 000 CFA",
                        status: "Completed",
                        statusBadge: "bg-[#e5f4f3] text-[#009689] border border-[#009689]",
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-gray-50/75 transition cursor-pointer"
                      >
                        <td className="py-3.5 px-4 font-semibold text-[#FF611C]">
                          <Link href={`/repairs/${row.id}`} className="hover:underline">
                            {row.id}
                          </Link>
                        </td>
                        <td className="py-3.5 px-4 text-[#575765]">{row.date}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex size-6 items-center justify-center rounded-full bg-[#E5F4F3] text-[#009689] text-[10px] font-bold">
                              {row.custInitials}
                            </div>
                            <span className="font-medium text-[#3D3D49]">
                              {row.cust}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#3D3D49]">{row.product}</td>
                        <td className="py-3.5 px-4 text-[#575765]">{row.serial}</td>
                        <td className="py-3.5 px-4 text-[#575765]">{row.issue}</td>
                        <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                          {row.cost}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-[6px] text-xs font-medium ${row.statusBadge}`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            className="rounded-lg p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                          >
                            <MoreVerticalIcon className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. DOCUMENTS TAB (Figma 6432:30102) */}
          {activeTab === "Documents" && (
            <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E9ECEF]">
                <h2 className="text-[20px] font-semibold text-[#3D3D49]">
                  Documents
                </h2>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-[8px] bg-[#2B2523] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#3d3633] transition"
                >
                  <UploadIcon className="size-4 text-white" />
                  <span>Upload Files</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-[8px] border border-[#E9ECEF] bg-white p-4 shadow-sm hover:border-gray-300 transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex size-10 items-center justify-center rounded-[8px] bg-[#FFEFE8] text-[#FF611C] shrink-0">
                        <svg
                          viewBox="0 0 20 20"
                          fill="none"
                          className="size-5 text-[#FF611C]"
                        >
                          <path
                            d="M11.6667 1.66663H5C4.07953 1.66663 3.33333 2.41282 3.33333 3.33329V16.6666C3.33333 17.5871 4.07953 18.3333 5 18.3333H15C15.9205 18.3333 16.6667 17.5871 16.6667 16.6666V6.66663L11.6667 1.66663Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.6667 1.66663V6.66663H16.6667"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#3D3D49] truncate">
                          Dell Latitude 5440 Datasheet.pdf
                        </p>
                        <p className="text-[11px] text-[#8C8C9A] mt-0.5">
                          Image file • 2.5mb
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        className="px-2.5 py-1 text-xs font-semibold text-[#575765] hover:text-[#e02d3c] transition"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="px-2.5 py-1 text-xs font-semibold text-[#575765] hover:text-[#3D3D49] transition"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="rounded-[6px] bg-[#2B2523] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#3d3633] transition"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. ACTIVITY TAB (Figma 6434:38093) */}
          {activeTab === "Activity" && (
            <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm space-y-4 max-w-[1120px]">
              {[
                {
                  iconBg: "bg-[#e5f4f3] text-[#009689]",
                  icon: CheckmarkCircleIcon,
                  title: "Device collected by Kofi Acheampong — repair completed",
                  subtitle: "Ama Owusu",
                  time: "2 min ago",
                  date: "19 Aug 2026",
                },
                {
                  iconBg: "bg-[#e7f2fc] text-[#0d79e4]",
                  icon: DeliveriesIcon,
                  title: "Device marked Ready for Pickup",
                  subtitle: "Emmanuel Boateng",
                  time: "2 min ago",
                  date: "19 Aug 2026",
                },
                {
                  iconBg: "bg-[#ffefe8] text-[#ff611c]",
                  icon: RepairsIcon,
                  title: "Repair created — warranty repair",
                  subtitle: "Ama Owusu",
                  time: "2 min ago",
                  date: "19 Aug 2026",
                },
                {
                  iconBg: "bg-[#e5f4f3] text-[#009689]",
                  icon: CheckmarkCircleIcon,
                  title: "Device collected by Kofi Acheampong — repair completed",
                  subtitle: "Ama Owusu",
                  time: "2 min ago",
                  date: "19 Aug 2026",
                },
                {
                  iconBg: "bg-[#e7f2fc] text-[#0d79e4]",
                  icon: DeliveriesIcon,
                  title: "Device marked Ready for Pickup",
                  subtitle: "Emmanuel Boateng",
                  time: "2 min ago",
                  date: "19 Aug 2026",
                },
                {
                  iconBg: "bg-[#ffefe8] text-[#ff611c]",
                  icon: RepairsIcon,
                  title: "Repair created — warranty repair",
                  subtitle: "Ama Owusu",
                  time: "2 min ago",
                  date: "19 Aug 2026",
                },
              ].map((act, idx) => {
                const IconComp = act.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-4 py-3 border-b border-[#E9ECEF] last:border-0"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`flex size-8 items-center justify-center rounded-full shrink-0 ${act.iconBg}`}
                      >
                        <IconComp className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#3D3D49] truncate">
                          {act.title}
                        </p>
                        <p className="text-[11px] text-[#8C8C9A] mt-0.5">
                          {act.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs text-[#575765]">{act.time}</p>
                      <p className="text-[11px] text-[#8C8C9A] mt-0.5">
                        {act.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
