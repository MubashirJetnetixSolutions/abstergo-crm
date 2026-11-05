"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  SearchIcon,
  ExportIcon,
  FilterIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  ProductsIcon,
  WarrantyIcon,
  ContactsStatIcon,
  CloseIcon,
  EditIcon,
  EyeIcon,
  DeleteIcon,
} from "@/components/icons/Icons";

interface WarrantyItem {
  id: string;
  code: string;
  customer: string;
  customerInitials: string;
  customerColor: string;
  productName: string;
  productCode: string;
  source: string;
  sourceType: "SAL" | "ORD";
  startDate: string;
  expiryDate: string;
  daysLeft: string;
  daysLeftType: "green" | "amber";
  status: "Active" | "Expiring Soon" | "Claimed" | "Expired";
}

const mockWarranties: WarrantyItem[] = [
  {
    id: "1",
    code: "WAR-1088",
    customer: "Coltonery Technology",
    customerInitials: "CT",
    customerColor: "bg-[#E7F2FC] text-[#0D79E4]",
    productName: "Dell Latitude 5440",
    productCode: "DL-5440",
    source: "SAL - 1035",
    sourceType: "SAL",
    startDate: "28 Sep 2026",
    expiryDate: "28 Sep 2026",
    daysLeft: "180 Days",
    daysLeftType: "green",
    status: "Active",
  },
  {
    id: "2",
    code: "WAR-1088",
    customer: "Coltonery Technology",
    customerInitials: "CT",
    customerColor: "bg-[#F3EEFF] text-[#8A58FF]",
    productName: "Dell Latitude 5440",
    productCode: "DL-5440",
    source: "SAL - 1035",
    sourceType: "SAL",
    startDate: "28 Sep 2026",
    expiryDate: "28 Sep 2026",
    daysLeft: "49 Days",
    daysLeftType: "amber",
    status: "Expiring Soon",
  },
  {
    id: "3",
    code: "WAR-1088",
    customer: "Coltonery Technology",
    customerInitials: "CT",
    customerColor: "bg-[#FFEFE8] text-[#FF611C]",
    productName: "Dell Latitude 5440",
    productCode: "DL-5440",
    source: "SAL - 1035",
    sourceType: "SAL",
    startDate: "28 Sep 2026",
    expiryDate: "28 Sep 2026",
    daysLeft: "180 Days",
    daysLeftType: "green",
    status: "Claimed",
  },
  {
    id: "4",
    code: "WAR-1088",
    customer: "Coltonery Technology",
    customerInitials: "CT",
    customerColor: "bg-[#E5F4F3] text-[#009689]",
    productName: "Dell Latitude 5440",
    productCode: "DL-5440",
    source: "ORD - 2345",
    sourceType: "ORD",
    startDate: "28 Sep 2026",
    expiryDate: "28 Sep 2026",
    daysLeft: "49 Days",
    daysLeftType: "amber",
    status: "Expired",
  },
  {
    id: "5",
    code: "WAR-1088",
    customer: "Coltonery Technology",
    customerInitials: "CT",
    customerColor: "bg-[#E7F2FC] text-[#0D79E4]",
    productName: "Dell Latitude 5440",
    productCode: "DL-5440",
    source: "ORD - 2345",
    sourceType: "ORD",
    startDate: "28 Sep 2026",
    expiryDate: "28 Sep 2026",
    daysLeft: "180 Days",
    daysLeftType: "green",
    status: "Active",
  },
  {
    id: "6",
    code: "WAR-1088",
    customer: "Coltonery Technology",
    customerInitials: "CT",
    customerColor: "bg-[#F3EEFF] text-[#8A58FF]",
    productName: "Dell Latitude 5440",
    productCode: "DL-5440",
    source: "SAL - 1035",
    sourceType: "SAL",
    startDate: "28 Sep 2026",
    expiryDate: "28 Sep 2026",
    daysLeft: "49 Days",
    daysLeftType: "amber",
    status: "Expiring Soon",
  },
  {
    id: "7",
    code: "WAR-1088",
    customer: "Coltonery Technology",
    customerInitials: "CT",
    customerColor: "bg-[#FFEFE8] text-[#FF611C]",
    productName: "Dell Latitude 5440",
    productCode: "DL-5440",
    source: "ORD - 2345",
    sourceType: "ORD",
    startDate: "28 Sep 2026",
    expiryDate: "28 Sep 2026",
    daysLeft: "180 Days",
    daysLeftType: "green",
    status: "Claimed",
  },
  {
    id: "8",
    code: "WAR-1088",
    customer: "Coltonery Technology",
    customerInitials: "CT",
    customerColor: "bg-[#E5F4F3] text-[#009689]",
    productName: "Dell Latitude 5440",
    productCode: "DL-5440",
    source: "SAL - 1035",
    sourceType: "SAL",
    startDate: "28 Sep 2026",
    expiryDate: "28 Sep 2026",
    daysLeft: "49 Days",
    daysLeftType: "amber",
    status: "Expiring Soon",
  },
  {
    id: "9",
    code: "WAR-1088",
    customer: "Coltonery Technology",
    customerInitials: "CT",
    customerColor: "bg-[#FFEFE8] text-[#FF611C]",
    productName: "Dell Latitude 5440",
    productCode: "DL-5440",
    source: "ORD - 2345",
    sourceType: "ORD",
    startDate: "28 Sep 2026",
    expiryDate: "28 Sep 2026",
    daysLeft: "49 Days",
    daysLeftType: "amber",
    status: "Expiring Soon",
  },
  {
    id: "10",
    code: "WAR-1088",
    customer: "Coltonery Technology",
    customerInitials: "CT",
    customerColor: "bg-[#F3EEFF] text-[#8A58FF]",
    productName: "Dell Latitude 5440",
    productCode: "DL-5440",
    source: "SAL - 1035",
    sourceType: "SAL",
    startDate: "28 Sep 2026",
    expiryDate: "28 Sep 2026",
    daysLeft: "49 Days",
    daysLeftType: "amber",
    status: "Expired",
  },
];

export default function WarrantiesPage() {
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [selectedSource, setSelectedSource] = useState("Sale");
  const [dateRange, setDateRange] = useState("08/08/2025 - 08/08/2026");
  const [showFilters, setShowFilters] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setOpenActionMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredWarranties = mockWarranties.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.code.toLowerCase().includes(q) ||
      item.customer.toLowerCase().includes(q) ||
      item.productName.toLowerCase().includes(q) ||
      item.productCode.toLowerCase().includes(q) ||
      item.source.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q)
    );
  });

  const getStatusBadge = (status: WarrantyItem["status"]) => {
    switch (status) {
      case "Active":
        return (
          <span className="px-2.5 py-0.5 rounded-[6px] border border-[#009689] bg-[#E5F4F3] text-[#009689] text-[11px] font-normal">
            Active
          </span>
        );
      case "Expiring Soon":
        return (
          <span className="px-2.5 py-0.5 rounded-[6px] border border-[#EDAC00] bg-[#FEF5E7] text-[#EDAC00] text-[11px] font-normal">
            Expiring Soon
          </span>
        );
      case "Claimed":
        return (
          <span className="px-2.5 py-0.5 rounded-[6px] border border-[#0D79E4] bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-normal">
            Claimed
          </span>
        );
      case "Expired":
        return (
          <span className="px-2.5 py-0.5 rounded-[6px] border border-[#F92424] bg-[#FEECEC] text-[#F92424] text-[11px] font-normal">
            Expired
          </span>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Warranties" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Title Section */}
          <div className="flex flex-col gap-1">
            <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight">
              Warranties
            </h1>
            <p className="text-[14px] text-[#575765] font-normal">
              Manage product warranties, coverage periods and warranty claims
            </p>
          </div>

          {/* 5 Metric / Stat Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full" data-node-id="6893:35279">
            {/* 1. Total */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] px-[20px] py-[16px] flex-1 min-w-[200px] flex flex-col gap-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-[#575765] text-[20px]">Total</span>
                <div className="size-11 rounded-[12px] p-[10px] flex items-center justify-center shrink-0 relative text-white border-2 border-[#E9EDF2]" style={{ backgroundColor: "#0D79E4" }}>
                  <div className="absolute inset-0 rounded-[12px] shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.8)] pointer-events-none" />
                  <ContactsStatIcon className="size-5 text-white relative z-10" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <span className="font-medium text-[#3D3D49] text-[28px] tracking-tight leading-none">9,240,000 CFA</span>
                <div className="text-[#575765] text-[14px] font-normal leading-normal">This month</div>
              </div>
            </div>

            {/* 2. Active */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] px-[20px] py-[16px] flex-1 min-w-[200px] flex flex-col gap-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-[#575765] text-[20px]">Active</span>
                <div className="size-11 rounded-[12px] p-[10px] flex items-center justify-center shrink-0 relative text-white border-2 border-[#E9EDF2]" style={{ backgroundColor: "#009689" }}>
                  <div className="absolute inset-0 rounded-[12px] shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.8)] pointer-events-none" />
                  <ContactsStatIcon className="size-5 text-white relative z-10" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <span className="font-medium text-[#3D3D49] text-[28px] tracking-tight leading-none">7,860,000 CFA</span>
                <div className="text-[#575765] text-[14px] font-normal leading-normal">This month</div>
              </div>
            </div>

            {/* 3. Inactive */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] px-[20px] py-[16px] flex-1 min-w-[200px] flex flex-col gap-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-[#575765] text-[20px]">Inactive</span>
                <div className="size-11 rounded-[12px] p-[10px] flex items-center justify-center shrink-0 relative text-white border-2 border-[#E9EDF2]" style={{ backgroundColor: "#FF611C" }}>
                  <div className="absolute inset-0 rounded-[12px] shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.8)] pointer-events-none" />
                  <ContactsStatIcon className="size-5 text-white relative z-10" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <span className="font-medium text-[#3D3D49] text-[28px] tracking-tight leading-none">24,850,000 CFA</span>
                <div className="text-[#575765] text-[14px] font-normal leading-normal">
                  <span className="text-[#12B680] font-medium">10%</span> increase since last month
                </div>
              </div>
            </div>



            {/* 5. Expired */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] px-[20px] py-[16px] flex-1 min-w-[200px] flex flex-col gap-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-[#575765] text-[20px]">Expired</span>
                <div className="size-11 rounded-[12px] p-[10px] flex items-center justify-center shrink-0 relative text-white border-2 border-[#E9EDF2]" style={{ backgroundColor: "#8A58FF" }}>
                  <div className="absolute inset-0 rounded-[12px] shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.8)] pointer-events-none" />
                  <ContactsStatIcon className="size-5 text-white relative z-10" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <span className="font-medium text-[#3D3D49] text-[28px] tracking-tight leading-none">9,240,000 CFA</span>
                <div className="text-[#575765] text-[14px] font-normal leading-normal">This month</div>
              </div>
            </div>
            {/* 4. Claimed */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] px-[20px] py-[16px] flex-1 min-w-[200px] flex flex-col gap-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-[#575765] text-[20px]">Claimed</span>
                <div className="size-11 rounded-[12px] p-[10px] flex items-center justify-center shrink-0 relative text-white border-2 border-[#E9EDF2]" style={{ backgroundColor: "#EDAC00" }}>
                  <div className="absolute inset-0 rounded-[12px] shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.8)] pointer-events-none" />
                  <ContactsStatIcon className="size-5 text-white relative z-10" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <span className="font-medium text-[#3D3D49] text-[28px] tracking-tight leading-none">18,420,000 CFA</span>
                <div className="text-[#575765] text-[14px] font-normal leading-normal">42 Customers</div>
              </div>
            </div>
          </div>

          {/* Table Container Card */}
          <div className="bg-white border border-[#EDEDED] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden" data-node-id="6893:35286">
            {/* Top Bar inside Card */}
            <div className="min-h-[52px] px-5 py-2.5 border-b border-[#EDEDED] flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-medium text-[#575765] text-[20px]">
                Warranties
              </h2>

              <div className="flex items-center gap-2">
                {/* Search Button / Inline Expandable Search Input */}
                {isSearchOpen ? (
                  <div className="relative flex items-center animate-in fade-in duration-150">
                    <SearchIcon className="size-4 text-[#8C8C9A] absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search warranties..."
                      autoFocus
                      className="h-[34px] pl-9 pr-8 text-xs border border-[#EDEDED] rounded-[8px] bg-white text-[#3D3D49] focus:outline-none focus:border-[#FF611C] w-48 sm:w-64 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="absolute right-2.5 text-[#8C8C9A] hover:text-[#3D3D49] p-0.5 cursor-pointer"
                      aria-label="Close search"
                    >
                      <CloseIcon className="size-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="Search"
                    className="size-[34px] bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer shrink-0"
                  >
                    <SearchIcon className="size-5" />
                  </button>
                )}

                {/* Export Button */}
                <button
                  type="button"
                  className="h-[34px] px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] font-medium text-[11px] transition-colors cursor-pointer"
                >
                  <ExportIcon className="size-5" />
                  <span>Export</span>
                </button>

                {/* Filter Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowFilters((prev) => !prev)}
                  className={`h-[34px] px-4 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] font-medium text-[11px] transition-colors cursor-pointer ${
                    showFilters ? "bg-neutral-100 font-semibold" : "bg-white hover:bg-neutral-50"
                  }`}
                >
                  <FilterIcon className="size-5" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Filter Pills Bar (conditionally visible) */}
            {showFilters && (
              <div className="min-h-[52px] px-5 py-3 border-b border-[#EDEDED] flex flex-wrap items-center gap-3 bg-white animate-in fade-in duration-150" data-node-id="6893:35294">
                {/* Date Filter Pill */}
                <div className="bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 flex items-center gap-2 text-[#575765] text-[14px]">
                  <span>{dateRange}</span>
                  <CalendarIcon className="size-4 text-[#575765]" />
                </div>

                {/* Source Filter Pill */}
                <div className="relative">
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-7 py-1.5 text-[#575765] text-[14px] appearance-none cursor-pointer outline-none"
                  >
                    <option value="Sale">Source: Sale</option>
                    <option value="Order">Source: Order</option>
                  </select>
                  <ChevronDownIcon className="size-4 text-[#575765] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Status Filter Pill */}
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-7 py-1.5 text-[#575765] text-[14px] appearance-none cursor-pointer outline-none"
                  >
                    <option value="Active">Status: Active</option>
                    <option value="Expiring Soon">Status: Expiring Soon</option>
                    <option value="Claimed">Status: Claimed</option>
                    <option value="Expired">Status: Expired</option>
                  </select>
                  <ChevronDownIcon className="size-4 text-[#575765] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[980px]">
                <thead>
                  <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
                    <th className="py-2.5 px-3">Warranty #</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Product</th>
                    <th className="py-2.5 px-3">Source</th>
                    <th className="py-2.5 px-3">Start Date</th>
                    <th className="py-2.5 px-3">Expiry Date</th>
                    <th className="py-2.5 px-3">Days Left</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
                  {filteredWarranties.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-neutral-50/70 transition-colors group cursor-pointer"
                    >
                      {/* Warranty # */}
                      <td className="py-3 px-3">
                        <Link
                          href="/warranties/new"
                          className="font-medium text-[#3D3D49] group-hover:text-[#FF611C] transition-colors"
                        >
                          {item.code}
                        </Link>
                      </td>

                      {/* Customer */}
                      <td className="py-3 px-3">
                        <Link
                          href="/warranties/new"
                          className="flex items-center gap-2 group/cust cursor-pointer"
                        >
                          <div
                            className={`size-6 rounded-full flex items-center justify-center font-medium text-[10px] shrink-0 ${item.customerColor}`}
                          >
                            {item.customerInitials}
                          </div>
                          <span className="truncate max-w-[150px] font-normal group-hover/cust:text-[#FF611C] transition-colors">
                            {item.customer}
                          </span>
                        </Link>
                      </td>

                      {/* Product */}
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="size-8 rounded-[6px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center text-[#FF611C] shrink-0">
                            <ProductsIcon className="size-4" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium truncate text-[#3D3D49]">
                              {item.productName}
                            </span>
                            <span className="text-[11px] text-[#575765]">
                              {item.productCode}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Source */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] font-medium text-[11px] ${item.sourceType === "SAL"
                              ? "bg-[#E7F2FC] text-[#0D79E4]"
                              : "bg-[#F3EEFF] text-[#8A58FF]"
                            }`}
                        >
                          <span>{item.source}</span>
                          <ExternalLinkIcon className="size-3 shrink-0" />
                        </span>
                      </td>

                      {/* Start Date */}
                      <td className="py-3 px-3 text-[#575765]">{item.startDate}</td>

                      {/* Expiry Date */}
                      <td className="py-3 px-3 text-[#575765]">{item.expiryDate}</td>

                      {/* Days Left */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-[4px] font-medium text-[11px] ${item.daysLeftType === "green"
                              ? "bg-[#E5F4F3] text-[#009689]"
                              : "bg-[#FEF5E7] text-[#EDAC00]"
                            }`}
                        >
                          {item.daysLeft}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3">{getStatusBadge(item.status)}</td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-right">
                        <div
                          className="relative inline-block text-left"
                          ref={openActionMenuId === item.id ? actionMenuRef : null}
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenActionMenuId(openActionMenuId === item.id ? null : item.id);
                            }}
                            aria-label="Actions"
                            className="text-[#9CA3AF] hover:text-[#3D3D49] p-1.5 rounded hover:bg-neutral-100 transition-colors cursor-pointer"
                          >
                            <MoreVerticalIcon className="size-4" />
                          </button>

                          {openActionMenuId === item.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-full mt-1 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-40 animate-in fade-in zoom-in-95 duration-100"
                            >
                              <Link
                                href={`/warranties/new`}
                                onClick={() => setOpenActionMenuId(null)}
                                className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <EditIcon className="size-3.5 text-[#575765]" />
                                <span>Edit</span>
                              </Link>
                              <Link
                                href={`/warranties/new`}
                                onClick={() => setOpenActionMenuId(null)}
                                className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <EyeIcon className="size-3.5 text-[#575765]" />
                                <span>View</span>
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenActionMenuId(null);
                                }}
                                className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#F92424] hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <DeleteIcon className="size-3.5 text-[#F92424]" />
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4 border-t border-[#EDEDED] text-[11px] text-[#575765]">
              <div className="flex items-center gap-1.5">
                <span>Per page:</span>
                <select className="bg-transparent border-none text-[#3D3D49] font-medium outline-none cursor-pointer">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous page"
                  className="size-7 rounded-[4px] border border-[#EDEDED] flex items-center justify-center text-[#575765] hover:bg-neutral-100 transition-colors"
                >
                  <ChevronLeftIcon className="size-3.5" />
                </button>
                <span className="font-medium text-[#3D3D49]">Page 25</span>
                <button
                  type="button"
                  aria-label="Next page"
                  className="size-7 rounded-[4px] border border-[#EDEDED] flex items-center justify-center text-[#575765] hover:bg-neutral-100 transition-colors"
                >
                  <ChevronRightIcon className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
