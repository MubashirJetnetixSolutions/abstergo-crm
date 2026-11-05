"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  ExternalLinkIcon,
  EditIcon,
  MoreVerticalIcon,
  ProductsIcon,
  DownloadIcon,
  SentIcon,
  WarrantyIcon,
  CloseIcon,
} from "@/components/icons/Icons";

export default function WarrantyNewViewPage() {
  const warrantyId = "WAR-1015";
  const [activeTab, setActiveTab] = useState<"overview" | "claims">("overview");
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

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
          {/* 1. Header & Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Link
                href="/warranties"
                className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] shrink-0"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight">
                    {warrantyId}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-[6px] border border-[#0D79E4] bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-normal leading-tight">
                    Claimed
                  </span>
                </div>
                <p className="text-[14px] text-[#575765] font-normal">
                  Created on 19 Aug 2026 at 10:42 AM by{" "}
                  <span className="font-medium text-[#3D3D49]">Jean Martin</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Claim Warranty Button */}
              <Link
                href="/repairs/new?type=Warranty"
                className="h-11 px-4 rounded-[8px] text-white font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity flex items-center gap-2 cursor-pointer"
                style={{
                  background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                <WarrantyIcon className="size-4 text-white" />
                <span>Claim Warranty</span>
              </Link>

              {/* Edit Product Button */}
              <button
                type="button"
                className="h-11 px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] font-medium text-[11px] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer"
              >
                <EditIcon className="size-4 text-[#575765]" />
                <span>Edit Product</span>
              </button>

              {/* More Options */}
              <button
                aria-label="More options"
                className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
              >
                <MoreVerticalIcon className="size-4" />
              </button>
            </div>
          </div>

          {/* 2. Top Summary Info Bar */}
          <div className="w-full bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-[#575765] font-normal">Customer</span>
              <div className="flex items-center gap-1.5 text-[#3D3D49] font-medium text-[11px]">
                <span className="truncate">Absto Technologies</span>
                <ExternalLinkIcon className="size-3.5 text-[#FF611C] shrink-0" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-[#575765] font-normal">Start Date</span>
              <span className="font-normal text-[#2B2523] text-[11px]">
                19 Aug 2026
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-[#575765] font-normal">Expiry Date</span>
              <span className="font-normal text-[#2B2523] text-[11px]">
                19 Aug 2027
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-[#575765] font-normal">Expiry Days</span>
              <span className="font-medium text-[#2B2523] text-[11px]">
                49 days
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-[#575765] font-normal">Status</span>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-[6px] border border-[#EDAC00] bg-[#FEF5E7] text-[#EDAC00] text-[11px] font-normal">
                  Expiring Soon
                </span>
              </div>
            </div>
          </div>

          {/* 3. Tabs Navigation */}
          <div className="flex items-center gap-6 border-b border-[#EDEDED] -mb-2">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`pb-3 text-[14px] font-medium transition-colors relative cursor-pointer ${
                activeTab === "overview"
                  ? "text-[#FF611C]"
                  : "text-[#575765] hover:text-[#3D3D49]"
              }`}
            >
              <span>Overview</span>
              {activeTab === "overview" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF611C]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("claims")}
              className={`pb-3 text-[14px] font-medium transition-colors relative cursor-pointer ${
                activeTab === "claims"
                  ? "text-[#FF611C]"
                  : "text-[#575765] hover:text-[#3D3D49]"
              }`}
            >
              <span>Claims</span>
              {activeTab === "claims" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF611C]" />
              )}
            </button>
          </div>

          {/* 4. Tab Contents */}
          {activeTab === "overview" ? (
            /* ================= OVERVIEW TAB (IMAGE 2) ================= */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 8 Columns */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* A. Warranty Information Card */}
                <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                  <h3 className="font-medium text-[#575765] text-[20px]">
                    Warranty Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-[11px]">
                    <div className="flex justify-between md:justify-start md:gap-12">
                      <span className="text-[#575765] w-28">Start Date:</span>
                      <span className="text-[#3D3D49] font-medium">19 Aug 2026</span>
                    </div>
                    <div className="flex justify-between md:justify-start md:gap-12">
                      <span className="text-[#575765] w-28">Duration:</span>
                      <span className="text-[#3D3D49] font-medium">12 months</span>
                    </div>
                    <div className="flex justify-between md:justify-start md:gap-12">
                      <span className="text-[#575765] w-28">Expiry Date:</span>
                      <span className="text-[#3D3D49] font-medium">19 Aug 2027</span>
                    </div>
                    <div className="flex justify-between md:justify-start md:gap-12">
                      <span className="text-[#575765] w-28">Days Remaining:</span>
                      <span className="text-[#3D3D49] font-medium">24,850,000 CFA</span>
                    </div>
                  </div>
                </div>

                {/* B. Product Information Card */}
                <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                  <h3 className="font-medium text-[#575765] text-[20px]">
                    Product Information
                  </h3>

                  {/* Product Header Row */}
                  <div className="flex items-center gap-3 pb-4 border-b border-[#EDEDED]">
                    <div className="size-10 rounded-[8px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center text-[#FF611C] shrink-0">
                      <ProductsIcon className="size-5" />
                    </div>
                    <span className="font-medium text-[#3D3D49] text-[16px]">
                      Dell Latitude 5440
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-8 text-[11px]">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between">
                        <span className="text-[#575765]">Brand:</span>
                        <span className="text-[#3D3D49] font-medium">Dell</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#575765]">Model:</span>
                        <span className="text-[#3D3D49] font-medium">Latitude 5440</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#575765]">SKU:</span>
                        <span className="text-[#3D3D49] font-medium">DL-6440</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between">
                        <span className="text-[#575765]">Category:</span>
                        <span className="text-[#3D3D49] font-medium">Laptops</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#575765]">Subcategory:</span>
                        <span className="text-[#3D3D49] font-medium">Business Laptops</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#575765]">Barcode:</span>
                        <span className="text-[#3D3D49] font-medium">8901234567890</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* C. Linked Records Card */}
                <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                  <h3 className="font-medium text-[#575765] text-[20px]">
                    Linked Records
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Sales Contract */}
                    <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-[6px] bg-[#E7F2FC] text-[#0D79E4] flex items-center justify-center shrink-0">
                          <WarrantyIcon className="size-4" />
                        </div>
                        <span className="font-medium text-[#3D3D49] text-[13px]">
                          Sales Contract
                        </span>
                      </div>
                      <button
                        type="button"
                        className="w-full py-2 bg-neutral-50 hover:bg-neutral-100 border border-[#EDEDED] rounded-[6px] flex items-center justify-center gap-2 text-[11px] text-[#3D3D49] font-medium cursor-pointer transition-colors"
                      >
                        <DownloadIcon className="size-3.5 text-[#575765]" />
                        <span>Download</span>
                      </button>
                    </div>

                    {/* Order */}
                    <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col justify-between gap-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="size-8 rounded-[6px] bg-[#FFEFE8] text-[#FF611C] flex items-center justify-center shrink-0">
                            <ProductsIcon className="size-4" />
                          </div>
                          <span className="font-medium text-[#3D3D49] text-[13px]">
                            Order
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#3D3D49] text-[16px]">
                          ORD-1024
                        </span>
                        <span className="px-2 py-0.5 rounded-[4px] bg-[#E5F4F3] text-[#009689] text-[10px] font-medium">
                          Paid
                        </span>
                      </div>

                      <button
                        type="button"
                        className="w-full py-2 bg-neutral-50 hover:bg-neutral-100 border border-[#EDEDED] rounded-[6px] flex items-center justify-center gap-2 text-[11px] text-[#3D3D49] font-medium cursor-pointer transition-colors"
                      >
                        <ExternalLinkIcon className="size-3.5 text-[#575765]" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 4 Columns: Sidebar Cards */}
              <div className="lg:col-span-4 flex flex-col gap-6 sticky top-6">
                {/* Customer Details Card */}
                <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                  <h3 className="font-medium text-[#575765] text-[20px]">
                    Customer Details
                  </h3>
                  <div className="flex items-center gap-3 pb-3 border-b border-[#EDEDED]">
                    <div className="size-10 rounded-full bg-[#F3EEFF] text-[#8A58FF] text-[11px] font-medium flex items-center justify-center shrink-0">
                      AS
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                        Argon Technology
                      </span>
                      <span className="text-[11px] text-[#575765]">
                        Business Customer
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#575765]">Email:</span>
                      <span className="text-[#3D3D49] truncate max-w-[180px]">
                        jason7654@gmail.com
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#575765]">Contact:</span>
                      <span className="text-[#3D3D49]">+226 25 30 12 34</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#575765]">Address:</span>
                      <span className="text-[#3D3D49] truncate max-w-[180px]">
                        Ouagadougou, Burkina Faso
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#575765]">Outstanding:</span>
                      <span className="text-[#F92424] font-medium">
                        1250 000 CFA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#575765]">Payment Terms:</span>
                      <span className="text-[#3D3D49]">Monthly</span>
                    </div>
                  </div>

                  <button className="w-full py-2.5 bg-neutral-50 hover:bg-neutral-100 border border-[#EDEDED] rounded-[8px] flex items-center justify-center gap-2 text-[11px] text-[#3D3D49] font-medium cursor-pointer transition-colors">
                    <ExternalLinkIcon className="size-3.5 text-[#575765]" />
                    <span>View Details</span>
                  </button>
                </div>

                {/* Activity Card */}
                <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                  <h3 className="font-medium text-[#575765] text-[20px]">Activity</h3>
                  <div className="flex flex-col divide-y divide-[#EDEDED]">
                    {[
                      { color: "bg-[#E7F2FC] text-[#0D79E4]", author: "Jean Martin", time: "2 min ago, 19 Aug 2026" },
                      { color: "bg-[#E5F4F3] text-[#009689]", author: "Jean Martin", time: "2 min ago, 19 Aug 2026" },
                      { color: "bg-[#FDF7E5] text-[#EDAC00]", author: "Jean Martin", time: "2 min ago, 19 Aug 2026" },
                      { color: "bg-[#E5F4F3] text-[#009689]", author: "Jean Martin", time: "2 min ago, 19 Aug 2026" },
                    ].map((act, idx) => (
                      <div key={idx} className="py-3 flex items-start gap-3 first:pt-0 last:pb-0">
                        <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${act.color}`}>
                          <SentIcon className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-medium text-[#3D3D49]">
                            Quotation sent to customer via email
                          </span>
                          <span className="text-[11px] text-[#575765]">
                            {act.time}
                          </span>
                          <span className="text-[11px] text-[#575765] font-medium">
                            {act.author}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ================= CLAIMS TAB (IMAGE 3) ================= */
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
              <h3 className="font-medium text-[#575765] text-[20px]">Claims</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[850px]">
                  <thead>
                    <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
                      <th className="py-2.5 px-3">Repair #</th>
                      <th className="py-2.5 px-3">Date</th>
                      <th className="py-2.5 px-3">Customer</th>
                      <th className="py-2.5 px-3">Issue</th>
                      <th className="py-2.5 px-3">Technician</th>
                      <th className="py-2.5 px-3">Cost</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
                    <tr className="hover:bg-neutral-50/70 transition-colors">
                      {/* Repair # */}
                      <td className="py-3.5 px-3">
                        <span className="text-[#FF611C] font-medium cursor-pointer hover:underline">
                          REP-0234
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-3 text-[#575765]">19 Aug 2026</td>

                      {/* Customer */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-[#E5F4F3] text-[#009689] flex items-center justify-center font-medium text-[10px] shrink-0">
                            AB
                          </div>
                          <span>ABC Technologies</span>
                        </div>
                      </td>

                      {/* Issue */}
                      <td className="py-3.5 px-3 text-[#3D3D49]">
                        Backlight flickering and color distortion
                      </td>

                      {/* Technician */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-[#FFEFE8] text-[#FF611C] flex items-center justify-center font-medium text-[10px] shrink-0">
                            MC
                          </div>
                          <span>Marie Coulibaly</span>
                        </div>
                      </td>

                      {/* Cost */}
                      <td className="py-3.5 px-3 text-[#575765]">Covered</td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-0.5 rounded-[6px] border border-[#0D79E4] bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-normal">
                          Received
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-3 text-right">
                        <button
                          type="button"
                          aria-label="Actions"
                          className="text-[#9CA3AF] hover:text-[#3D3D49] p-1 rounded transition-colors cursor-pointer"
                        >
                          <MoreVerticalIcon className="size-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Claim Warranty Modal */}
      {isClaimModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <div
            onClick={() => setIsClaimModalOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
          />
          <div className="relative bg-white rounded-[16px] shadow-2xl border border-[#EDEDED] max-w-[480px] w-full p-6 flex flex-col gap-5 z-10">
            <div className="flex items-center justify-between pb-3 border-b border-[#EDEDED]">
              <h3 className="text-[#2D2D38] font-semibold text-[16px]">
                Claim Warranty ({warrantyId})
              </h3>
              <button
                type="button"
                onClick={() => setIsClaimModalOpen(false)}
                className="text-[#9CA3AF] hover:text-[#4B5563] p-1 rounded"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-[12px]">
              <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-[10px] p-3.5 flex flex-col gap-1">
                <span className="font-semibold text-[#1F2937] text-[14px]">
                  Dell Latitude 5440 (DL-6440)
                </span>
                <span className="text-[#6B7280]">
                  Absto Technologies · 49 days remaining
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#4B5563] font-medium">Issue Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe the defect or hardware issue..."
                  defaultValue="Backlight flickering and color distortion"
                  className="w-full p-3 bg-white border border-[#E5E7EB] rounded-[8px] text-[13px] outline-none focus:border-[#FF611C] resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[#4B5563] font-medium">Assigned Technician</label>
                <input
                  type="text"
                  defaultValue="Marie Coulibaly"
                  className="w-full h-10 px-3 bg-white border border-[#E5E7EB] rounded-[8px] text-[13px] outline-none focus:border-[#FF611C]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EDEDED]">
              <button
                type="button"
                onClick={() => setIsClaimModalOpen(false)}
                className="px-4 py-2.5 bg-white hover:bg-neutral-50 border border-[#E5E7EB] rounded-[8px] text-[#374151] font-medium text-[12px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsClaimModalOpen(false);
                  setActiveTab("claims");
                }}
                className="px-5 py-2.5 rounded-[8px] text-white font-medium text-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95"
                style={{
                  background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Submit Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
