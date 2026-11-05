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
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  EditIcon,
  EyeIcon,
  DeleteIcon,
} from "../icons/Icons";

export interface InvoiceRecord {
  id: string;
  invoiceCode: string;
  customerName: string;
  customerInitials: string;
  invoiceDate: string;
  dueDate: string;
  reference: string;
  total: string;
  paid: string;
  balance: string;
  status: { label: string; bg: string; border: string; text: string };
}

const invoiceRecords: InvoiceRecord[] = [
  {
    id: "1",
    invoiceCode: "INV-1088",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    invoiceDate: "29 Aug 2026",
    dueDate: "28 Sep 2026",
    reference: "SAL-1048",
    total: "9,820,000 CFA",
    paid: "4,000,000 CFA",
    balance: "5,820,000 CFA",
    status: { label: "Paid", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
  },
  {
    id: "2",
    invoiceCode: "INV-1088",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    invoiceDate: "29 Aug 2026",
    dueDate: "28 Sep 2026",
    reference: "SAL-1048",
    total: "9,820,000 CFA",
    paid: "4,000,000 CFA",
    balance: "5,820,000 CFA",
    status: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
  },
  {
    id: "3",
    invoiceCode: "INV-1088",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    invoiceDate: "29 Aug 2026",
    dueDate: "28 Sep 2026",
    reference: "SAL-1048",
    total: "9,820,000 CFA",
    paid: "4,000,000 CFA",
    balance: "5,820,000 CFA",
    status: { label: "Paid", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
  },
  {
    id: "4",
    invoiceCode: "INV-1088",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    invoiceDate: "29 Aug 2026",
    dueDate: "28 Sep 2026",
    reference: "SAL-1048",
    total: "9,820,000 CFA",
    paid: "4,000,000 CFA",
    balance: "5,820,000 CFA",
    status: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
  },
  {
    id: "5",
    invoiceCode: "INV-1088",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    invoiceDate: "29 Aug 2026",
    dueDate: "28 Sep 2026",
    reference: "SAL-1048",
    total: "9,820,000 CFA",
    paid: "4,000,000 CFA",
    balance: "5,820,000 CFA",
    status: { label: "Paid", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
  },
  {
    id: "6",
    invoiceCode: "INV-1088",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    invoiceDate: "29 Aug 2026",
    dueDate: "28 Sep 2026",
    reference: "SAL-1048",
    total: "9,820,000 CFA",
    paid: "4,000,000 CFA",
    balance: "5,820,000 CFA",
    status: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
  },
  {
    id: "7",
    invoiceCode: "INV-1088",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    invoiceDate: "29 Aug 2026",
    dueDate: "28 Sep 2026",
    reference: "SAL-1048",
    total: "9,820,000 CFA",
    paid: "4,000,000 CFA",
    balance: "5,820,000 CFA",
    status: { label: "Paid", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
  },
  {
    id: "8",
    invoiceCode: "INV-1088",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    invoiceDate: "29 Aug 2026",
    dueDate: "28 Sep 2026",
    reference: "SAL-1048",
    total: "9,820,000 CFA",
    paid: "4,000,000 CFA",
    balance: "5,820,000 CFA",
    status: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
  },
  {
    id: "9",
    invoiceCode: "INV-1088",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    invoiceDate: "29 Aug 2026",
    dueDate: "28 Sep 2026",
    reference: "SAL-1048",
    total: "9,820,000 CFA",
    paid: "4,000,000 CFA",
    balance: "5,820,000 CFA",
    status: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
  },
  {
    id: "10",
    invoiceCode: "INV-1088",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    invoiceDate: "29 Aug 2026",
    dueDate: "28 Sep 2026",
    reference: "SAL-1048",
    total: "9,820,000 CFA",
    paid: "4,000,000 CFA",
    balance: "5,820,000 CFA",
    status: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
  },
];

export default function InvoicesTable() {
  const [showFilters, setShowFilters] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(25);
  const [perPage, setPerPage] = useState(10);
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

  const filteredRecords = invoiceRecords.filter((record) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      record.invoiceCode.toLowerCase().includes(q) ||
      record.customerName.toLowerCase().includes(q) ||
      record.reference.toLowerCase().includes(q) ||
      record.status.label.toLowerCase().includes(q) ||
      record.invoiceDate.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Table Card Container */}
      <div
        className="w-full bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col"
        data-node-id="6265:13280"
      >
        {/* Table Top Header Bar */}
        <div className="min-h-[52px] px-5 py-2.5 border-b border-[#EDEDED] flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-medium text-[#575765] text-[20px]">
            Invoices
          </h3>

          <div className="flex items-center gap-2">
            {/* Search Button / Inline Expandable Search Input */}
            {showSearch ? (
              <div className="relative flex items-center animate-in fade-in duration-150">
                <SearchIcon className="size-4 text-[#8C8C9A] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search invoices..."
                  autoFocus
                  className="h-[34px] pl-9 pr-8 text-xs border border-[#EDEDED] rounded-[8px] bg-white text-[#3D3D49] focus:outline-none focus:border-[#FF611C] w-48 sm:w-64 transition-all"
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
                className="size-[34px] bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer shrink-0"
              >
                <SearchIcon className="size-5" />
              </button>
            )}

            {/* Export Button */}
            <button className="h-[34px] px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer">
              <ExportIcon className="size-5" />
              <span className="font-medium text-[11px]">Export</span>
            </button>

            {/* Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className={`h-[34px] px-4 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer ${
                showFilters ? "bg-neutral-100 font-semibold" : "bg-white hover:bg-neutral-50"
              }`}
            >
              <FilterIcon className="size-5" />
              <span className="font-medium text-[11px]">Filter</span>
            </button>
          </div>
        </div>

        {/* Table Filter Bar Row (conditionally visible) */}
        {showFilters && (
          <div className="min-h-[52px] px-5 py-3 border-b border-[#EDEDED] flex flex-wrap items-center gap-3 bg-white animate-in fade-in duration-150" data-node-id="6736:29768">
            <div className="bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 flex items-center gap-2 text-[#575765] text-[14px]">
              <span>08/08/2025 - 08/08/2026</span>
              <CalendarIcon className="size-4 text-[#575765]" />
            </div>
            <div className="bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 flex items-center gap-2 text-[#575765] text-[14px]">
              <span>Status: Paid</span>
              <ChevronDownIcon className="size-4 text-[#575765]" />
            </div>
          </div>
        )}

        {/* Scrollable Data Table Container */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1250px]">
            {/* Table Head */}
            <thead>
              <tr className="border-b border-[#EDEDED] bg-white text-[#575765] text-[11px] font-medium select-none">
                <th className="py-3 px-4 w-[130px]">Invoice #</th>
                <th className="py-3 px-4 w-[220px]">Customer</th>
                <th className="py-3 px-4 w-[140px]">Invoice Date</th>
                <th className="py-3 px-4 w-[140px]">Due Date</th>
                <th className="py-3 px-4 w-[130px]">Reference</th>
                <th className="py-3 px-4 w-[130px]">Total</th>
                <th className="py-3 px-4 w-[130px]">Paid</th>
                <th className="py-3 px-4 w-[130px]">Balance</th>
                <th className="py-3 px-4 w-[110px]">Status</th>
                <th className="py-3 px-4 w-[50px] text-right"></th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
              {filteredRecords.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                >
                  {/* Invoice Code */}
                  <td className="py-4 px-4 font-normal text-[#3D3D49] group-hover:text-[#FF611C] transition-colors whitespace-nowrap">
                    {item.invoiceCode}
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-medium flex items-center justify-center shrink-0">
                        {item.customerInitials}
                      </div>
                      <span className="font-normal text-[#3D3D49] truncate">
                        {item.customerName}
                      </span>
                    </div>
                  </td>

                  {/* Invoice Date */}
                  <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                    {item.invoiceDate}
                  </td>

                  {/* Due Date */}
                  <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                    {item.dueDate}
                  </td>

                  {/* Reference */}
                  <td className="py-4 px-4 text-[#575765] font-normal whitespace-nowrap">
                    {item.reference}
                  </td>

                  {/* Total */}
                  <td className="py-4 px-4 font-normal text-[#3D3D49] whitespace-nowrap">
                    {item.total}
                  </td>

                  {/* Paid */}
                  <td className="py-4 px-4 font-normal text-[#009689] whitespace-nowrap">
                    {item.paid}
                  </td>

                  {/* Balance */}
                  <td className="py-4 px-4 font-normal text-[#F92424] whitespace-nowrap">
                    {item.balance}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-[6px] border text-[11px] font-normal ${item.status.bg} ${item.status.border} ${item.status.text}`}
                    >
                      {item.status.label}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 text-right">
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
                        aria-label="More options"
                        className="size-8 rounded-[6px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] hover:bg-neutral-100 transition-colors cursor-pointer ml-auto"
                      >
                        <MoreVerticalIcon className="size-4" />
                      </button>

                      {openActionMenuId === item.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 top-full mt-1 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-40 animate-in fade-in zoom-in-95 duration-100"
                        >
                          <Link
                            href={`/invoices`}
                            onClick={() => setOpenActionMenuId(null)}
                            className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                          >
                            <EditIcon className="size-3.5 text-[#575765]" />
                            <span>Edit</span>
                          </Link>
                          <Link
                            href={`/invoices`}
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

        {/* Table Footer / Pagination Controls */}
        <div className="px-5 py-3 border-t border-[#EDEDED] flex flex-wrap items-center justify-end gap-6 text-[11px] text-[#575765] select-none">
          {/* Per Page Dropdown */}
          <div className="flex items-center gap-2">
            <span>Per page:</span>
            <div className="relative inline-flex items-center">
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="bg-transparent text-[#3D3D49] font-medium pr-5 pl-1 py-1 appearance-none outline-none cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <ChevronDownIcon className="size-3.5 text-[#575765] absolute right-0 pointer-events-none" />
            </div>
          </div>

          {/* Page Navigator */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              aria-label="Previous Page"
              className="p-1 rounded-[4px] hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
            >
              <ChevronLeftIcon className="size-4 text-[#575765]" />
            </button>

            <span className="text-[#3D3D49] font-medium">Page {currentPage}</span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              aria-label="Next Page"
              className="p-1 rounded-[4px] hover:bg-neutral-100 cursor-pointer transition-colors"
            >
              <ChevronRightIcon className="size-4 text-[#575765]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
