"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  SearchIcon,
  ExportIcon,
  UploadIcon,
  FilterIcon,
  CalendarIcon,
  MoreVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CloseIcon,
  EditIcon,
  EyeIcon,
  DeleteIcon,
} from "@/components/icons/Icons";

export interface SaleRow {
  id: string;
  customer: {
    name: string;
    initials: string;
    avatarBg: string;
    avatarColor: string;
  };
  technician: {
    name: string;
    initials: string;
    avatarBg: string;
    avatarColor: string;
  };
  date: string;
  items: string;
  amount: string;
  invoice: string;
  payment: {
    label: "Paid" | "Overdue" | "Pending" | "Partial";
    bg: string;
    border: string;
    text: string;
  };
  delivery: {
    label: "Delivered" | "Pending" | "Partial" | "Overdue";
    bg: string;
    border: string;
    text: string;
  };
  created: string;
}

const INITIAL_SALES: SaleRow[] = [
  {
    id: "#SAL-1048",
    customer: { name: "Argon Technology", initials: "AS", avatarBg: "bg-[#F3EEFF]", avatarColor: "text-[#8A58FF]" },
    technician: { name: "Joseph J. Martin", initials: "AS", avatarBg: "bg-[#FFEFE8]", avatarColor: "text-[#FF611C]" },
    date: "12 Aug, 2026",
    items: "4 Items",
    amount: "85,000 CFA",
    invoice: "INV-1048",
    payment: { label: "Paid", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    delivery: { label: "Delivered", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    created: "12 Aug, 2026",
  },
  {
    id: "#SAL-1048",
    customer: { name: "Argon Technology", initials: "AS", avatarBg: "bg-[#F3EEFF]", avatarColor: "text-[#8A58FF]" },
    technician: { name: "Joseph J. Martin", initials: "AS", avatarBg: "bg-[#FFEFE8]", avatarColor: "text-[#FF611C]" },
    date: "12 Aug, 2026",
    items: "4 Items",
    amount: "85,000 CFA",
    invoice: "INV-1048",
    payment: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    delivery: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    created: "12 Aug, 2026",
  },
  {
    id: "#SAL-1048",
    customer: { name: "Argon Technology", initials: "AS", avatarBg: "bg-[#F3EEFF]", avatarColor: "text-[#8A58FF]" },
    technician: { name: "Joseph J. Martin", initials: "AS", avatarBg: "bg-[#FFEFE8]", avatarColor: "text-[#FF611C]" },
    date: "12 Aug, 2026",
    items: "4 Items",
    amount: "85,000 CFA",
    invoice: "INV-1048",
    payment: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    delivery: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
    created: "12 Aug, 2026",
  },
  {
    id: "#SAL-1048",
    customer: { name: "Argon Technology", initials: "AS", avatarBg: "bg-[#F3EEFF]", avatarColor: "text-[#8A58FF]" },
    technician: { name: "Joseph J. Martin", initials: "AS", avatarBg: "bg-[#FFEFE8]", avatarColor: "text-[#FF611C]" },
    date: "12 Aug, 2026",
    items: "4 Items",
    amount: "85,000 CFA",
    invoice: "INV-1048",
    payment: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    delivery: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    created: "12 Aug, 2026",
  },
  {
    id: "#SAL-1048",
    customer: { name: "Argon Technology", initials: "AS", avatarBg: "bg-[#F3EEFF]", avatarColor: "text-[#8A58FF]" },
    technician: { name: "Joseph J. Martin", initials: "AS", avatarBg: "bg-[#FFEFE8]", avatarColor: "text-[#FF611C]" },
    date: "12 Aug, 2026",
    items: "4 Items",
    amount: "85,000 CFA",
    invoice: "INV-1048",
    payment: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    delivery: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
    created: "12 Aug, 2026",
  },
  {
    id: "#SAL-1048",
    customer: { name: "Argon Technology", initials: "AS", avatarBg: "bg-[#F3EEFF]", avatarColor: "text-[#8A58FF]" },
    technician: { name: "Joseph J. Martin", initials: "AS", avatarBg: "bg-[#FFEFE8]", avatarColor: "text-[#FF611C]" },
    date: "12 Aug, 2026",
    items: "4 Items",
    amount: "85,000 CFA",
    invoice: "INV-1048",
    payment: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
    delivery: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    created: "12 Aug, 2026",
  },
  {
    id: "#SAL-1048",
    customer: { name: "Argon Technology", initials: "AS", avatarBg: "bg-[#F3EEFF]", avatarColor: "text-[#8A58FF]" },
    technician: { name: "Joseph J. Martin", initials: "AS", avatarBg: "bg-[#FFEFE8]", avatarColor: "text-[#FF611C]" },
    date: "12 Aug, 2026",
    items: "4 Items",
    amount: "85,000 CFA",
    invoice: "INV-1048",
    payment: { label: "Paid", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    delivery: { label: "Delivered", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    created: "12 Aug, 2026",
  },
  {
    id: "#SAL-1048",
    customer: { name: "Argon Technology", initials: "AS", avatarBg: "bg-[#F3EEFF]", avatarColor: "text-[#8A58FF]" },
    technician: { name: "Joseph J. Martin", initials: "AS", avatarBg: "bg-[#FFEFE8]", avatarColor: "text-[#FF611C]" },
    date: "12 Aug, 2026",
    items: "4 Items",
    amount: "85,000 CFA",
    invoice: "INV-1048",
    payment: { label: "Paid", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    delivery: { label: "Delivered", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    created: "12 Aug, 2026",
  },
  {
    id: "#SAL-1048",
    customer: { name: "Argon Technology", initials: "AS", avatarBg: "bg-[#F3EEFF]", avatarColor: "text-[#8A58FF]" },
    technician: { name: "Joseph J. Martin", initials: "AS", avatarBg: "bg-[#FFEFE8]", avatarColor: "text-[#FF611C]" },
    date: "12 Aug, 2026",
    items: "4 Items",
    amount: "85,000 CFA",
    invoice: "INV-1048",
    payment: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    delivery: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    created: "12 Aug, 2026",
  },
  {
    id: "#SAL-1048",
    customer: { name: "Argon Technology", initials: "AS", avatarBg: "bg-[#F3EEFF]", avatarColor: "text-[#8A58FF]" },
    technician: { name: "Joseph J. Martin", initials: "AS", avatarBg: "bg-[#FFEFE8]", avatarColor: "text-[#FF611C]" },
    date: "12 Aug, 2026",
    items: "4 Items",
    amount: "85,000 CFA",
    invoice: "INV-1048",
    payment: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
    delivery: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    created: "12 Aug, 2026",
  },
];

export default function SalesTable() {
  const [sales] = useState<SaleRow[]>(INITIAL_SALES);
  const [showFilters, setShowFilters] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("2025-08-08");
  const [endDate, setEndDate] = useState("2026-08-08");
  const [currentPage, setCurrentPage] = useState(25);
  const [perPage, setPerPage] = useState(10);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredSales = sales.filter((s) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      s.id.toLowerCase().includes(query) ||
      s.customer.name.toLowerCase().includes(query) ||
      s.technician.name.toLowerCase().includes(query) ||
      s.invoice.toLowerCase().includes(query) ||
      s.payment.label.toLowerCase().includes(query) ||
      s.delivery.label.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden w-full">
      {/* Table Action Bar */}
      <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b border-[#EDEDED]">
        <h2 className="font-medium text-[#3D3D49] text-[20px]">Sales</h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Button / Inline Expandable Search Input */}
          {showSearch ? (
            <div className="relative flex items-center animate-in fade-in duration-150">
              <SearchIcon className="size-4 text-[#8C8C9A] absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sales..."
                autoFocus
                className="h-10 pl-9 pr-8 text-xs border border-[#EDEDED] rounded-[8px] bg-white text-[#3D3D49] focus:outline-none focus:border-[#FF611C] w-48 sm:w-64 transition-all"
              />
              <button
                type="button"
                onClick={() => {
                  setShowSearch(false);
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
              onClick={() => setShowSearch(true)}
              aria-label="Search"
              className="size-10 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer shrink-0"
            >
              <SearchIcon className="size-4" />
            </button>
          )}

          {/* Export Button */}
          <button
            type="button"
            className="h-10 px-3.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] text-[11px] font-medium transition-colors cursor-pointer"
          >
            <ExportIcon className="size-4 text-[#575765]" />
            <span>Export</span>
          </button>

          {/* Upload Button */}
          <button
            type="button"
            className="h-10 px-3.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] text-[11px] font-medium transition-colors cursor-pointer"
          >
            <UploadIcon className="size-4 text-[#575765]" />
            <span>Upload</span>
          </button>

          {/* Filter Toggle Button */}
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className={`h-10 px-3.5 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] text-[11px] font-medium transition-colors cursor-pointer ${
              showFilters ? "bg-neutral-100 font-semibold" : "bg-white hover:bg-neutral-50"
            }`}
          >
            <FilterIcon className="size-4 text-[#575765]" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table Filter Bar Row (conditionally visible) */}
      {showFilters && (
        <div className="min-h-[52px] px-5 py-3 border-b border-[#EDEDED] flex flex-wrap items-center gap-4 bg-white animate-in fade-in duration-150" data-node-id="6736:29700">
          {/* Start Date */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#575765] font-normal">Start Date:</span>
            <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 focus-within:border-[#FF611C] transition-colors">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* End Date */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-[#575765] font-normal">End Date:</span>
            <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 focus-within:border-[#FF611C] transition-colors">
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer"
              />
            </div>
          </div>

          {(startDate || endDate) && (
            <button
              type="button"
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className="text-[11px] text-[#FF611C] hover:underline cursor-pointer"
            >
              Reset Dates
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium bg-neutral-50/50">
              <th className="py-3 px-4">Sale #</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Technician</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Invoice</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Delivery</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
            {filteredSales.map((sale, idx) => (
              <tr
                key={idx}
                className="hover:bg-neutral-50/70 transition-colors group cursor-pointer"
              >
                {/* Sale # */}
                <td className="py-3.5 px-4">
                  <Link
                    href={`/sales/SAL-1048`}
                    className="font-medium text-[#3D3D49] group-hover:text-[#FF611C] transition-colors"
                  >
                    {sale.id}
                  </Link>
                </td>

                {/* Customer */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`size-6 rounded-full ${sale.customer.avatarBg} ${sale.customer.avatarColor} text-[11px] font-medium flex items-center justify-center shrink-0`}
                    >
                      {sale.customer.initials}
                    </div>
                    <span className="font-normal text-[#3D3D49] truncate">
                      {sale.customer.name}
                    </span>
                  </div>
                </td>

                {/* Technician */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`size-6 rounded-full ${sale.technician.avatarBg} ${sale.technician.avatarColor} text-[11px] font-medium flex items-center justify-center shrink-0`}
                    >
                      {sale.technician.initials}
                    </div>
                    <span className="font-normal text-[#3D3D49] truncate">
                      {sale.technician.name}
                    </span>
                  </div>
                </td>

                {/* Date */}
                <td className="py-3.5 px-4 text-[#3D3D49] whitespace-nowrap">
                  {sale.date}
                </td>

                {/* Items */}
                <td className="py-3.5 px-4 text-[#3D3D49] whitespace-nowrap">
                  {sale.items}
                </td>

                {/* Amount */}
                <td className="py-3.5 px-4 font-normal text-[#3D3D49] whitespace-nowrap">
                  {sale.amount}
                </td>

                {/* Invoice */}
                <td className="py-3.5 px-4 text-[#3D3D49] whitespace-nowrap">
                  {sale.invoice}
                </td>

                {/* Payment Status */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-[6px] border text-[11px] font-normal ${sale.payment.bg} ${sale.payment.border} ${sale.payment.text}`}
                  >
                    {sale.payment.label}
                  </span>
                </td>

                {/* Delivery Status */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-[6px] border text-[11px] font-normal ${sale.delivery.bg} ${sale.delivery.border} ${sale.delivery.text}`}
                  >
                    {sale.delivery.label}
                  </span>
                </td>

                {/* Created */}
                <td className="py-3.5 px-4 text-[#3D3D49] whitespace-nowrap">
                  {sale.created}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right relative">
                  <div
                    className="relative inline-block text-left"
                    ref={activeMenuId === idx ? actionMenuRef : null}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === idx ? null : idx);
                      }}
                      className="size-7 bg-white hover:bg-neutral-100 border border-[#EDEDED] rounded-[6px] inline-flex items-center justify-center text-[#575765] cursor-pointer transition-colors"
                    >
                      <MoreVerticalIcon className="size-4" />
                    </button>

                    {/* Dropdown Menu */}
                    {activeMenuId === idx && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="absolute right-0 top-full mt-1 z-30 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 flex flex-col text-left animate-in fade-in zoom-in-95 duration-100"
                      >
                        <Link
                          href="/sales/new"
                          onClick={() => setActiveMenuId(null)}
                          className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <EditIcon className="size-3.5 text-[#575765]" />
                          <span>Edit</span>
                        </Link>
                        <Link
                          href={`/sales/${sale.id.replace("#", "")}`}
                          onClick={() => setActiveMenuId(null)}
                          className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <EyeIcon className="size-3.5 text-[#575765]" />
                          <span>View</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveMenuId(null);
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

      {/* Pagination Footer */}
      <div className="p-4 sm:p-5 flex items-center justify-end gap-6 border-t border-[#EDEDED] text-[11px] text-[#575765]">
        {/* Per page selector */}
        <div className="flex items-center gap-2">
          <span>Per page:</span>
          <div className="relative">
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
              aria-label="Items per page"
              className="h-8 pl-2 pr-6 bg-white border border-[#EDEDED] rounded-[6px] text-[11px] text-[#3D3D49] appearance-none cursor-pointer focus:outline-none focus:border-[#FF611C]"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <ChevronDownIcon className="size-3 text-[#575765] absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Page navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="size-7 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] flex items-center justify-center text-[#575765] cursor-pointer disabled:opacity-40"
            disabled={currentPage <= 1}
          >
            <ChevronLeftIcon className="size-3.5" />
          </button>
          <span className="font-normal text-[#3D3D49]">Page {currentPage}</span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p + 1)}
            className="size-7 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] flex items-center justify-center text-[#575765] cursor-pointer"
          >
            <ChevronRightIcon className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
