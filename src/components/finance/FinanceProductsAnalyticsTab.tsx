"use client";

import React, { useState } from "react";
import {
  TrendUpIcon,
  TrendDownIcon,
  SearchIcon,
  FilterIcon,
  ExportIcon,
  ChevronDownIcon,
  ProductsIcon,
} from "@/components/icons/Icons";

interface ProductStat {
  title: string;
  value: string;
  trendText: string;
  trendType: "up" | "down";
}

const STAT_CARDS: ProductStat[] = [
  {
    title: "Total Products Sold",
    value: "853 units",
    trendText: "14.2% increase since last month",
    trendType: "up",
  },
  {
    title: "Total Sales",
    value: "775,300.00 CFA",
    trendText: "12.5% increase since last month",
    trendType: "up",
  },
  {
    title: "Total Profit",
    value: "168,840.00 CFA",
    trendText: "8.2% increase since last month",
    trendType: "up",
  },
  {
    title: "Avg Order Value",
    value: "907.85 CFA",
    trendText: "3.1% increase since last month",
    trendType: "up",
  },
];

interface TopProductItem {
  name: string;
  amount: string;
  percentage: number;
  color: string;
}

const TOP_PRODUCTS: TopProductItem[] = [
  { name: "MacBook Pro 14", amount: "4,200,000 CFA", percentage: 85, color: "#0D79E4" },
  { name: "iPhone 15 Pro", amount: "365,000 CFA", percentage: 72, color: "#F92424" },
  { name: "Samsung Galaxy S24", amount: "1,080,000 CFA", percentage: 58, color: "#009689" },
  { name: "Samsung Galaxy S24", amount: "365,000 CFA", percentage: 45, color: "#8A58FF" },
  { name: "AirPods Pro 2", amount: "320,000 CFA", percentage: 35, color: "#EDAC00" },
  { name: "HP EliteBook 840", amount: "1,080,000 CFA", percentage: 25, color: "#FF7A00" },
  { name: "iPad Pro 12.9", amount: "185,000 CFA", percentage: 18, color: "#3B82F6" },
];

interface ProductPerformanceRow {
  id: string;
  name: string;
  code: string;
  category: string;
  brand: string;
  unitsSold: number;
  revenue: string;
  cost: string;
  profit: string;
  margin: string;
  trend: string;
  trendUp: boolean;
}

const PRODUCT_PERFORMANCE_DATA: ProductPerformanceRow[] = [
  {
    id: "1",
    name: "Dell Latitude 5440",
    code: "DL-5440",
    category: "Laptops",
    brand: "Dell",
    unitsSold: 120,
    revenue: "180,000.00 CFA",
    cost: "145,000.00 CFA",
    profit: "35,000.00 CFA",
    margin: "19.4%",
    trend: "+12%",
    trendUp: true,
  },
  {
    id: "2",
    name: "MacBook Pro 14",
    code: "MBP-14",
    category: "Laptops",
    brand: "Apple",
    unitsSold: 85,
    revenue: "4,200,000.00 CFA",
    cost: "3,450,000.00 CFA",
    profit: "750,000.00 CFA",
    margin: "17.8%",
    trend: "+8%",
    trendUp: true,
  },
  {
    id: "3",
    name: "iPhone 15 Pro",
    code: "IP-15P",
    category: "Smartphones",
    brand: "Apple",
    unitsSold: 94,
    revenue: "365,000.00 CFA",
    cost: "290,000.00 CFA",
    profit: "75,000.00 CFA",
    margin: "20.5%",
    trend: "+15%",
    trendUp: true,
  },
  {
    id: "4",
    name: "Samsung Galaxy S24",
    code: "SGS-24",
    category: "Smartphones",
    brand: "Samsung",
    unitsSold: 72,
    revenue: "1,080,000.00 CFA",
    cost: "880,000.00 CFA",
    profit: "200,000.00 CFA",
    margin: "18.5%",
    trend: "-3%",
    trendUp: false,
  },
  {
    id: "5",
    name: "AirPods Pro 2",
    code: "APP-2",
    category: "Accessories",
    brand: "Apple",
    unitsSold: 145,
    revenue: "320,000.00 CFA",
    cost: "240,000.00 CFA",
    profit: "80,000.00 CFA",
    margin: "25.0%",
    trend: "+22%",
    trendUp: true,
  },
  {
    id: "6",
    name: "HP EliteBook 840",
    code: "HP-840",
    category: "Laptops",
    brand: "HP",
    unitsSold: 53,
    revenue: "1,080,000.00 CFA",
    cost: "890,000.00 CFA",
    profit: "190,000.00 CFA",
    margin: "17.6%",
    trend: "+5%",
    trendUp: true,
  },
  {
    id: "7",
    name: "iPad Pro 12.9",
    code: "IPD-12",
    category: "Tablets",
    brand: "Apple",
    unitsSold: 40,
    revenue: "185,000.00 CFA",
    cost: "148,000.00 CFA",
    profit: "37,000.00 CFA",
    margin: "20.0%",
    trend: "-2%",
    trendUp: false,
  },
  {
    id: "8",
    name: "Dell Latitude 5440",
    code: "DL-5440",
    category: "Laptops",
    brand: "Dell",
    unitsSold: 120,
    revenue: "180,000.00 CFA",
    cost: "145,000.00 CFA",
    profit: "35,000.00 CFA",
    margin: "19.4%",
    trend: "+12%",
    trendUp: true,
  },
];

export default function FinanceProductsAnalyticsTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [showFilters, setShowFilters] = useState(true);

  const filteredData = PRODUCT_PERFORMANCE_DATA.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === "All" || row.category === selectedCategory;
    const matchesBrand =
      selectedBrand === "All" || row.brand === selectedBrand;
    return matchesSearch && matchesCat && matchesBrand;
  });

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
                <span className="flex items-center gap-1 text-[12px] font-medium text-[#009689]">
                  <TrendUpIcon className="size-3 text-[#009689]" />
                  {card.trendText}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Performance Analytics: Top Products Progress Bars */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[20px] font-semibold text-[#1D1E2C]">
          Performance Analytics
        </h2>
        <div className="rounded-[12px] border border-[#EDEDED] bg-white p-6 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)] flex flex-col gap-5">
          <h3 className="text-[16px] font-medium text-[#1D1E2C]">
            Top Products by Revenue
          </h3>
          <div className="flex flex-col gap-4">
            {TOP_PRODUCTS.map((prod, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-44 text-[14px] font-medium text-[#3D3D49] truncate shrink-0">
                  {prod.name}
                </span>
                <div className="flex-1 h-2 rounded-full bg-[#EDEDED] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: prod.color,
                      width: `${prod.percentage}%`,
                    }}
                  />
                </div>
                <span className="w-32 text-right text-[14px] font-semibold text-[#1D1E2C] shrink-0">
                  {prod.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Product Performance Table */}
      <div className="rounded-[12px] border border-[#EDEDED] bg-white overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]">
        {/* Table Header Controls */}
        <div className="p-5 border-b border-[#EDEDED] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h3 className="text-[18px] font-semibold text-[#1D1E2C]">
            Product Performance
          </h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8C8CA1]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-[13px] rounded-[8px] border border-[#E0E2E7] bg-white text-[#1D1E2C] placeholder:text-[#8C8CA1] focus:outline-none focus:border-[#FF611C] focus:ring-1 focus:ring-[#FF611C]"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-[8px] border text-[13px] font-medium transition cursor-pointer ${
                showFilters
                  ? "bg-neutral-100 font-semibold border-neutral-300 text-[#1D1E2C]"
                  : "border-[#E0E2E7] text-[#3D3D49] hover:bg-[#F8FAFD]"
              }`}
            >
              <FilterIcon className="size-4 text-[#575765]" />
              Filter
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-2 rounded-[8px] border border-[#E0E2E7] text-[13px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] transition"
            >
              <ExportIcon className="size-4 text-[#575765]" />
              Export
            </button>
          </div>
        </div>

        {/* Filter Badges Row */}
        {showFilters && (
          <div className="px-5 py-3 border-b border-[#EDEDED] bg-[#FAFAFC] flex items-center gap-3 text-[13px]">
            <span className="text-[#8C8CA1] font-medium">Filter by:</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-[6px] border border-[#E0E2E7] bg-white text-[#3D3D49]">
              <span>Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent font-medium text-[#1D1E2C] focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Laptops">Laptops</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Accessories">Accessories</option>
                <option value="Tablets">Tablets</option>
              </select>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-[6px] border border-[#E0E2E7] bg-white text-[#3D3D49]">
              <span>Brand:</span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="bg-transparent font-medium text-[#1D1E2C] focus:outline-none cursor-pointer"
              >
                <option value="All">All Brands</option>
                <option value="Apple">Apple</option>
                <option value="Dell">Dell</option>
                <option value="Samsung">Samsung</option>
                <option value="HP">HP</option>
              </select>
            </div>
          </div>
        )}

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EDEDED] bg-[#F8FAFD] text-[12px] font-medium text-[#8C8CA1]">
                <th className="py-3.5 px-5">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Brand</th>
                <th className="py-3.5 px-4">Units Sold</th>
                <th className="py-3.5 px-4">Revenue</th>
                <th className="py-3.5 px-4">Cost</th>
                <th className="py-3.5 px-4">Profit</th>
                <th className="py-3.5 px-4">Margin</th>
                <th className="py-3.5 px-5 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDEDED] text-[13px] text-[#3D3D49]">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-[#F8FAFD] transition">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-[8px] bg-[#FFF4EF] border border-[#FFE1D4] flex items-center justify-center shrink-0">
                        <ProductsIcon className="size-4 text-[#FF611C]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-[#1D1E2C]">
                          {row.name}
                        </span>
                        <span className="text-[11px] text-[#8C8CA1]">
                          {row.code}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">{row.category}</td>
                  <td className="py-3.5 px-4 font-medium text-[#1D1E2C]">
                    {row.brand}
                  </td>
                  <td className="py-3.5 px-4 font-medium">{row.unitsSold}</td>
                  <td className="py-3.5 px-4 font-medium text-[#1D1E2C]">
                    {row.revenue}
                  </td>
                  <td className="py-3.5 px-4 text-[#575765]">{row.cost}</td>
                  <td className="py-3.5 px-4 font-semibold text-[#009689]">
                    {row.profit}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#E8F8F5] text-[#009689] border border-[#B9E9DF]">
                      {row.margin}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        row.trendUp
                          ? "bg-[#E8F8F5] text-[#009689] border border-[#B9E9DF]"
                          : "bg-[#FFF0F0] text-[#F92424] border border-[#FFD5D8]"
                      }`}
                    >
                      {row.trendUp ? (
                        <TrendUpIcon className="size-2.5 text-[#009689]" />
                      ) : (
                        <TrendDownIcon className="size-2.5 text-[#F92424]" />
                      )}
                      {row.trend}
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
