"use client";

import React, { useState } from "react";
import {
  SearchIcon,
  FilterIcon,
  ExportIcon,
} from "@/components/icons/Icons";

interface SalesRepStat {
  title: string;
  value: string;
  subtext: string;
}

const STAT_CARDS: SalesRepStat[] = [
  {
    title: "Total Sales",
    value: "775,300.00 CFA",
    subtext: "Across all representatives",
  },
  {
    title: "Total Orders",
    value: "520",
    subtext: "Completed orders",
  },
  {
    title: "Sales Representatives",
    value: "14",
    subtext: "Active team members",
  },
  {
    title: "Avg Sales per Representative",
    value: "55,378.57 CFA",
    subtext: "Average contribution",
  },
];

interface SalesRepRow {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  orders: number;
  sales: string;
  paid: string;
  outstanding: string;
  profit: string;
  margin: string;
  lastSale: string;
}

const SALES_REPS_DATA: SalesRepRow[] = [
  {
    id: "1",
    name: "Emmanuel Darko",
    initials: "ED",
    avatarBg: "bg-purple-100 text-purple-700",
    orders: 48,
    sales: "62,400.00 CFA",
    paid: "54,900.00 CFA",
    outstanding: "7,500.00 CFA",
    profit: "12,480.00 CFA",
    margin: "20.0%",
    lastSale: "Today",
  },
  {
    id: "2",
    name: "Abena Mensah",
    initials: "AM",
    avatarBg: "bg-orange-100 text-orange-700",
    orders: 49,
    sales: "62,400.00 CFA",
    paid: "54,900.00 CFA",
    outstanding: "7,500.00 CFA",
    profit: "12,480.00 CFA",
    margin: "20.0%",
    lastSale: "Yesterday",
  },
  {
    id: "3",
    name: "Akosua Boateng",
    initials: "AB",
    avatarBg: "bg-teal-100 text-teal-700",
    orders: 67,
    sales: "62,400.00 CFA",
    paid: "54,900.00 CFA",
    outstanding: "7,500.00 CFA",
    profit: "12,480.00 CFA",
    margin: "20.0%",
    lastSale: "2 days ago",
  },
  {
    id: "4",
    name: "Kwame Asante",
    initials: "KA",
    avatarBg: "bg-blue-100 text-blue-700",
    orders: 53,
    sales: "58,200.00 CFA",
    paid: "50,000.00 CFA",
    outstanding: "8,200.00 CFA",
    profit: "11,640.00 CFA",
    margin: "20.0%",
    lastSale: "3 days ago",
  },
  {
    id: "5",
    name: "Kofi Osei",
    initials: "KO",
    avatarBg: "bg-amber-100 text-amber-700",
    orders: 41,
    sales: "47,800.00 CFA",
    paid: "42,000.00 CFA",
    outstanding: "5,800.00 CFA",
    profit: "9,560.00 CFA",
    margin: "20.0%",
    lastSale: "3 days ago",
  },
  {
    id: "6",
    name: "Ama Serwaa",
    initials: "AS",
    avatarBg: "bg-rose-100 text-rose-700",
    orders: 76,
    sales: "89,400.00 CFA",
    paid: "82,000.00 CFA",
    outstanding: "7,400.00 CFA",
    profit: "17,880.00 CFA",
    margin: "20.0%",
    lastSale: "4 days ago",
  },
  {
    id: "7",
    name: "Yaw Mensah",
    initials: "YM",
    avatarBg: "bg-indigo-100 text-indigo-700",
    orders: 38,
    sales: "41,200.00 CFA",
    paid: "36,000.00 CFA",
    outstanding: "5,200.00 CFA",
    profit: "8,240.00 CFA",
    margin: "20.0%",
    lastSale: "5 days ago",
  },
  {
    id: "8",
    name: "Efua Sutherland",
    initials: "ES",
    avatarBg: "bg-emerald-100 text-emerald-700",
    orders: 62,
    sales: "74,100.00 CFA",
    paid: "68,000.00 CFA",
    outstanding: "6,100.00 CFA",
    profit: "14,820.00 CFA",
    margin: "20.0%",
    lastSale: "6 days ago",
  },
];

export default function FinanceSalesRepTab() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = SALES_REPS_DATA.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* 1. Stat Cards Row */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[20px] font-semibold text-[#1D1E2C]">
          Finance Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STAT_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)] transition hover:shadow-md"
            >
              <span className="font-normal text-[#575765] text-[15px]">
                {card.title}
              </span>
              <div className="mt-3 flex flex-col gap-1">
                <span className="text-[22px] font-bold text-[#1D1E2C] tracking-tight">
                  {card.value}
                </span>
                <span className="text-[12px] font-normal text-[#575765]">
                  {card.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Salesman Performance Table */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[20px] font-semibold text-[#1D1E2C]">
          Performance Analytics
        </h2>
        <div className="rounded-[12px] border border-[#EDEDED] bg-white overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]">
          {/* Table Header Controls */}
          <div className="p-5 border-b border-[#EDEDED] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h3 className="text-[18px] font-semibold text-[#1D1E2C]">
              Salesman Performance
            </h3>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8C8CA1]" />
                <input
                  type="text"
                  placeholder="Search representative..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-[13px] rounded-[8px] border border-[#E0E2E7] bg-white text-[#1D1E2C] placeholder:text-[#8C8CA1] focus:outline-none focus:border-[#FF611C] focus:ring-1 focus:ring-[#FF611C]"
                />
              </div>

              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 rounded-[8px] border border-[#E0E2E7] text-[13px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] transition"
              >
                <ExportIcon className="size-4 text-[#575765]" />
                Export
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EDEDED] bg-[#F8FAFD] text-[12px] font-medium text-[#8C8CA1]">
                  <th className="py-3.5 px-5">Sales Representative</th>
                  <th className="py-3.5 px-4">Orders</th>
                  <th className="py-3.5 px-4">Sales</th>
                  <th className="py-3.5 px-4">Paid</th>
                  <th className="py-3.5 px-4">Outstanding</th>
                  <th className="py-3.5 px-4">Profit</th>
                  <th className="py-3.5 px-4">Margin</th>
                  <th className="py-3.5 px-5 text-right">Last Sale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDEDED] text-[13px] text-[#3D3D49]">
                {filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-[#F8FAFD] transition">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`size-8 rounded-full flex items-center justify-center font-semibold text-[12px] shrink-0 ${row.avatarBg}`}
                        >
                          {row.initials}
                        </div>
                        <span className="font-medium text-[#1D1E2C]">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#1D1E2C]">
                      {row.orders}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#1D1E2C]">
                      {row.sales}
                    </td>
                    <td className="py-3.5 px-4 text-[#009689] font-medium">
                      {row.paid}
                    </td>
                    <td className="py-3.5 px-4 text-[#F92424] font-medium">
                      {row.outstanding}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#009689]">
                      {row.profit}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F5] text-[#009689] border border-[#B9E9DF]">
                        {row.margin}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right text-[#575765]">
                      {row.lastSale}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
