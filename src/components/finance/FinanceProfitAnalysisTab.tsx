"use client";

import React from "react";
import RevenueOverviewChart from "./RevenueOverviewChart";
import { TrendUpIcon, TrendDownIcon } from "@/components/icons/Icons";

interface ProfitStat {
  title: string;
  value: string;
  trendText: string;
  trendType: "up" | "down";
}

const STAT_CARDS: ProfitStat[] = [
  {
    title: "Total Revenue",
    value: "775,300.00 CFA",
    trendText: "12% increase vs last period",
    trendType: "up",
  },
  {
    title: "Total Cost",
    value: "606,460.00 CFA",
    trendText: "4% decrease vs last period",
    trendType: "down",
  },
  {
    title: "Gross Profit",
    value: "168,840.00 CFA",
    trendText: "18% increase vs last period",
    trendType: "up",
  },
  {
    title: "Profit Margin",
    value: "21.78%",
    trendText: "2.3% increase vs last period",
    trendType: "up",
  },
];

interface BreakdownRow {
  name: string;
  revenue: string;
  cost: string;
  profit: string;
  margin: string;
}

const CATEGORY_DATA: BreakdownRow[] = [
  { name: "Laptops", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
  { name: "Smartphones", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
  { name: "Accessories", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
  { name: "Tablets", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
  { name: "Monitors", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
  { name: "Audio", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
  { name: "Networking", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
];

const BRAND_DATA: BreakdownRow[] = [
  { name: "Apple", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
  { name: "Sony", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
  { name: "Lenovo", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
  { name: "Acer", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
  { name: "Toshiba", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
  { name: "Dell", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
  { name: "HP", revenue: "180,000.00 CFA", cost: "145,000.00 CFA", profit: "35,000.00 CFA", margin: "19.4%" },
];

export default function FinanceProfitAnalysisTab() {
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
              <div className="mt-3 flex flex-col gap-2">
                <span className="text-[22px] font-bold text-[#1D1E2C] tracking-tight">
                  {card.value}
                </span>
                <span
                  className={`flex items-center gap-1 text-[12px] font-medium ${
                    card.trendType === "up" ? "text-[#009689]" : "text-[#F92424]"
                  }`}
                >
                  {card.trendType === "up" ? (
                    <TrendUpIcon className="size-3 text-[#009689]" />
                  ) : (
                    <TrendDownIcon className="size-3 text-[#F92424]" />
                  )}
                  {card.trendText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Performance Analytics: Revenue Overview Chart */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[20px] font-semibold text-[#1D1E2C]">
          Performance Analytics
        </h2>
        <RevenueOverviewChart />
      </div>

      {/* 3. By Category Table */}
      <div className="rounded-[12px] border border-[#EDEDED] bg-white overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]">
        <div className="p-5 border-b border-[#EDEDED]">
          <h3 className="text-[18px] font-semibold text-[#1D1E2C]">
            Profit by Category
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EDEDED] bg-[#F8FAFD] text-[12px] font-medium text-[#8C8CA1]">
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-4">Revenue</th>
                <th className="py-3.5 px-4">Cost</th>
                <th className="py-3.5 px-4">Profit</th>
                <th className="py-3.5 px-5 text-right">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDEDED] text-[13px] text-[#3D3D49]">
              {CATEGORY_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFD] transition">
                  <td className="py-3.5 px-5 font-medium text-[#1D1E2C]">
                    {row.name}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#1D1E2C]">
                    {row.revenue}
                  </td>
                  <td className="py-3.5 px-4 text-[#575765]">{row.cost}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#009689]">
                    {row.profit}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F5] text-[#009689] border border-[#B9E9DF]">
                      {row.margin}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. By Brand Table */}
      <div className="rounded-[12px] border border-[#EDEDED] bg-white overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]">
        <div className="p-5 border-b border-[#EDEDED]">
          <h3 className="text-[18px] font-semibold text-[#1D1E2C]">
            Profit by Brand
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EDEDED] bg-[#F8FAFD] text-[12px] font-medium text-[#8C8CA1]">
                <th className="py-3.5 px-5">Brand</th>
                <th className="py-3.5 px-4">Revenue</th>
                <th className="py-3.5 px-4">Cost</th>
                <th className="py-3.5 px-4">Profit</th>
                <th className="py-3.5 px-5 text-right">Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDEDED] text-[13px] text-[#3D3D49]">
              {BRAND_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFD] transition">
                  <td className="py-3.5 px-5 font-medium text-[#1D1E2C]">
                    {row.name}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#1D1E2C]">
                    {row.revenue}
                  </td>
                  <td className="py-3.5 px-4 text-[#575765]">{row.cost}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#009689]">
                    {row.profit}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F5] text-[#009689] border border-[#B9E9DF]">
                      {row.margin}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
