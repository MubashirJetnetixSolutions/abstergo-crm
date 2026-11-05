"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  EditIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  DeleteIcon,
} from "@/components/icons/Icons";

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  before: number;
  sold: number;
  after: number;
}

const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "1",
    name: "Dell Latitude 5440",
    sku: "DL-5440",
    before: 10,
    sold: 2,
    after: 8,
  },
  {
    id: "2",
    name: "HP ProBook 450 G10",
    sku: "DL-5440",
    before: 10,
    sold: 2,
    after: 8,
  },
  {
    id: "3",
    name: "Logitech MX Keys",
    sku: "DL-5440",
    before: 10,
    sold: 2,
    after: 8,
  },
];

export default function SaleDetailPage() {
  const params = useParams();
  const saleId = (params?.id as string) || "SAL-1048";
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Good Morning" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-5 max-w-[1680px] w-full mx-auto">
          {/* 1. Header Profile & Info Card */}
          <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 lg:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
            {/* Top row: Back button, Title, Subtitle & Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Back Button */}
                <Link
                  href="/sales"
                  className="size-10 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shrink-0"
                >
                  <ChevronLeftIcon className="size-4" />
                </Link>

                <div className="flex flex-col">
                  <h1 className="font-semibold text-[#3D3D49] text-[20px] sm:text-[22px] leading-tight">
                    {saleId}
                  </h1>
                  <p className="text-[13px] text-[#8C8C9A] font-normal mt-0.5">
                    Created on 19 Aug 2026 at 10:42 AM by{" "}
                    <span className="font-medium text-[#3D3D49]">Jean Martin</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 relative">
                <Link
                  href="/sales/new"
                  className="h-10 px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] font-medium text-[13px] transition-colors cursor-pointer"
                >
                  <EditIcon className="size-4 text-[#575765]" />
                  <span>Edit Product</span>
                </Link>

                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="size-10 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
                    aria-label="More options"
                  >
                    <MoreVerticalIcon className="size-4" />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 top-full mt-1.5 z-30 w-36 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 flex flex-col text-left animate-in fade-in duration-100">
                      <Link
                        href="/sales/new"
                        onClick={() => setShowDropdown(false)}
                        className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <EditIcon className="size-3.5 text-[#575765]" />
                        <span>Edit</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setShowDropdown(false)}
                        className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#F92424] hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <DeleteIcon className="size-3.5 text-[#F92424]" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom info section: Customer, Sale Date, Invoice */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-5 border-t border-[#F2F2F2]">
              <div className="flex flex-col gap-1">
                <span className="text-[13px] text-[#8C8C9A] font-normal">Customer</span>
                <Link
                  href="/customers/1"
                  className="flex items-center gap-1.5 group w-fit"
                >
                  <span className="font-medium text-[#3D3D49] text-[14px] group-hover:text-[#FF611C] transition-colors">
                    Absto Technologies
                  </span>
                  <ExternalLinkIcon className="size-3.5 text-[#FF611C] shrink-0" />
                </Link>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[13px] text-[#8C8C9A] font-normal">Sale Date</span>
                <span className="font-medium text-[#3D3D49] text-[14px]">
                  19 Aug 2026
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[13px] text-[#8C8C9A] font-normal">Invoice</span>
                <Link
                  href="/invoices/1"
                  className="flex items-center gap-1.5 group w-fit"
                >
                  <span className="font-medium text-[#3D3D49] text-[14px] group-hover:text-[#FF611C] transition-colors">
                    INV-1048
                  </span>
                  <ExternalLinkIcon className="size-3.5 text-[#FF611C] shrink-0" />
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Three Metric / Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Subtotal */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 lg:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[120px]">
              <span className="text-[15px] text-[#575765] font-normal">Subtotal</span>
              <div className="flex flex-col mt-2">
                <span className="text-[24px] lg:text-[28px] font-bold text-[#3D3D49] tracking-tight">
                  3 000 000 CFA
                </span>
                <span className="text-[13px] text-[#8C8C9A] font-normal mt-1">
                  3 products
                </span>
              </div>
            </div>

            {/* Discount */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 lg:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[120px]">
              <span className="text-[15px] text-[#575765] font-normal">Discount</span>
              <div className="flex flex-col mt-2">
                <span className="text-[24px] lg:text-[28px] font-bold text-[#F92424] tracking-tight">
                  - 150 000 CFA
                </span>
                <div className="text-[13px] text-[#8C8C9A] font-normal mt-1 flex items-center gap-1.5">
                  <span className="font-bold text-[#F92424]">-5%</span>
                  <span>Approved</span>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 lg:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[120px]">
              <span className="text-[15px] text-[#575765] font-normal">Total</span>
              <div className="flex flex-col mt-2">
                <span className="text-[24px] lg:text-[28px] font-bold text-[#3D3D49] tracking-tight">
                  2 850 000 CFA
                </span>
                <span className="text-[13px] text-[#8C8C9A] font-normal mt-1">
                  Grand total
                </span>
              </div>
            </div>
          </div>

          {/* 3. Bottom Two-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            {/* Left 2 Cols: Sale Information + Inventory Movement */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* Sale Information Card */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 lg:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <h2 className="text-[17px] font-semibold text-[#3D3D49] mb-5">
                  Sale Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-8 text-[13px]">
                  {/* Left Column */}
                  <div className="flex flex-col gap-3.5">
                    <div className="flex items-center">
                      <span className="w-36 text-[#8C8C9A]">Sale Number:</span>
                      <span className="text-[#3D3D49] font-medium">{saleId}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-36 text-[#8C8C9A]">Invoice Number:</span>
                      <span className="text-[#3D3D49] font-medium">INV-1048</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-36 text-[#8C8C9A]">Price Type:</span>
                      <span className="text-[#3D3D49] font-medium">Reseller</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-36 text-[#8C8C9A]">Total:</span>
                      <span className="text-[#3D3D49] font-medium">24,850,000 CFA</span>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col gap-3.5">
                    <div className="flex items-center">
                      <span className="w-36 text-[#8C8C9A]">Technician:</span>
                      <span className="text-[#3D3D49] font-medium">Jean Martin</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-36 text-[#8C8C9A]">Created by:</span>
                      <span className="text-[#3D3D49] font-medium">Jean Martin</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-36 text-[#8C8C9A]">Created at:</span>
                      <span className="text-[#3D3D49] font-medium">19 Aug 2026, 10:42 AM</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-36 text-[#8C8C9A]">Discount:</span>
                      <span className="text-[#3D3D49] font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventory Movement Card */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 lg:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                <h2 className="text-[17px] font-semibold text-[#3D3D49] mb-4">
                  Inventory Movement
                </h2>

                <div className="flex flex-col">
                  {INVENTORY_ITEMS.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between py-4 ${
                        index > 0 ? "border-t border-[#EDEDED]" : ""
                      }`}
                    >
                      {/* Product Name & SKU */}
                      <div className="flex flex-col gap-0.5">
                        <h3 className="text-[15px] font-semibold text-[#3D3D49]">
                          {item.name}
                        </h3>
                        <span className="text-[13px] text-[#8C8C9A] font-normal">
                          {item.sku}
                        </span>
                      </div>

                      {/* Before / Sold / After columns */}
                      <div className="flex items-center gap-8 sm:gap-14 text-center">
                        <div className="flex flex-col items-center min-w-[36px]">
                          <span className="text-[12px] text-[#8C8C9A] font-normal mb-1">
                            Before
                          </span>
                          <span className="text-[14px] font-semibold text-[#FF611C]">
                            {item.before}
                          </span>
                        </div>
                        <div className="flex flex-col items-center min-w-[36px]">
                          <span className="text-[12px] text-[#8C8C9A] font-normal mb-1">
                            Sold
                          </span>
                          <span className="text-[14px] font-semibold text-[#FF611C]">
                            {item.sold}
                          </span>
                        </div>
                        <div className="flex flex-col items-center min-w-[36px]">
                          <span className="text-[12px] text-[#8C8C9A] font-normal mb-1">
                            After
                          </span>
                          <span className="text-[14px] font-semibold text-[#009689]">
                            {item.after}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 1 Col: Customer Details Card */}
            <div className="lg:col-span-1 bg-white border border-[#EDEDED] rounded-[12px] p-5 lg:p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              <div>
                <h2 className="text-[17px] font-semibold text-[#3D3D49] mb-5">
                  Customer Details
                </h2>

                {/* Customer Profile Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="size-10 rounded-full bg-[#F3EEFF] text-[#8A58FF] flex items-center justify-center font-medium text-[14px] shrink-0">
                    AS
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[15px] font-semibold text-[#3D3D49] truncate">
                      Argon Technology
                    </span>
                    <span className="text-[12px] text-[#8C8C9A]">
                      Business Customer
                    </span>
                  </div>
                </div>

                {/* Customer Info List */}
                <div className="flex flex-col gap-3.5 mb-8 text-[13px]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#8C8C9A] shrink-0">Email:</span>
                    <span className="text-[#3D3D49] font-medium truncate text-right">
                      jason7654@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#8C8C9A] shrink-0">Contact:</span>
                    <span className="text-[#3D3D49] font-medium text-right">
                      +226 25 30 12 3..
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#8C8C9A] shrink-0">Address:</span>
                    <span className="text-[#3D3D49] font-medium truncate text-right">
                      Ouagadougou, Burkina Fas..
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#8C8C9A] shrink-0">Outstanding:</span>
                    <span className="text-[#F92424] font-medium text-right">
                      1 250 000 CFA
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[#8C8C9A] shrink-0">Payment Terms:</span>
                    <span className="text-[#3D3D49] font-medium text-right">
                      Monthly
                    </span>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <Link
                href="/customers/1"
                className="w-full py-2.5 px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center gap-2 text-[#575765] hover:text-[#3D3D49] text-[13px] font-medium transition-colors cursor-pointer"
              >
                <ExternalLinkIcon className="size-4 text-[#575765]" />
                <span>View Details</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
