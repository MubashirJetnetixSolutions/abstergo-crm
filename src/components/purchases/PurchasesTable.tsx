"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  ExportIcon,
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

export interface PurchaseRecord {
  id: string;
  purchaseCode: string;
  supplier: string;
  supplierInitials: string;
  purchaseDate: string;
  items: string;
  total: string;
  paid: string;
  purchaseType: "Order" | "Internal";
  outstanding: string;
  status: { label: string; bg: string; border: string; text: string };
}

const purchaseRecords: PurchaseRecord[] = [
  {
    id: "1",
    purchaseCode: "PUR-1024",
    supplier: "Dell Technologies ot",
    supplierInitials: "AS",
    purchaseDate: "29 Aug 2026",
    items: "2 Items",
    total: " 9,820,000 CFA",
    paid: " 4,000,000 CFA",
    purchaseType: "Order",
    outstanding: " 5,820,000 CFA",
    status: {
      label: "Ordered",
      bg: "bg-[#E7F2FC]",
      border: "border-[#C2E0FC]",
      text: "text-[#0D79E4]",
    },
  },
  {
    id: "2",
    purchaseCode: "PUR-1024",
    supplier: "Dell Technologies ot",
    supplierInitials: "AS",
    purchaseDate: "29 Aug 2026",
    items: "2 Items",
    total: " 9,820,000 CFA",
    paid: " 4,000,000 CFA",
    purchaseType: "Order",
    outstanding: " 5,820,000 CFA",
    status: {
      label: "Received",
      bg: "bg-[#E5F4F3]",
      border: "border-[#B2E4DF]",
      text: "text-[#009689]",
    },
  },
  {
    id: "3",
    purchaseCode: "PUR-1024",
    supplier: "Dell Technologies ot",
    supplierInitials: "AS",
    purchaseDate: "29 Aug 2026",
    items: "2 Items",
    total: " 9,820,000 CFA",
    paid: " 4,000,000 CFA",
    purchaseType: "Order",
    outstanding: " 5,820,000 CFA",
    status: {
      label: "Ordered",
      bg: "bg-[#E7F2FC]",
      border: "border-[#C2E0FC]",
      text: "text-[#0D79E4]",
    },
  },
  {
    id: "4",
    purchaseCode: "PUR-1024",
    supplier: "Dell Technologies ot",
    supplierInitials: "AS",
    purchaseDate: "29 Aug 2026",
    items: "2 Items",
    total: " 9,820,000 CFA",
    paid: " 4,000,000 CFA",
    purchaseType: "Internal",
    outstanding: " 5,820,000 CFA",
    status: {
      label: "Ordered",
      bg: "bg-[#E7F2FC]",
      border: "border-[#C2E0FC]",
      text: "text-[#0D79E4]",
    },
  },
  {
    id: "5",
    purchaseCode: "PUR-1024",
    supplier: "Dell Technologies ot",
    supplierInitials: "AS",
    purchaseDate: "29 Aug 2026",
    items: "2 Items",
    total: " 9,820,000 CFA",
    paid: " 4,000,000 CFA",
    purchaseType: "Internal",
    outstanding: " 5,820,000 CFA",
    status: {
      label: "Received",
      bg: "bg-[#E5F4F3]",
      border: "border-[#B2E4DF]",
      text: "text-[#009689]",
    },
  },
  {
    id: "6",
    purchaseCode: "PUR-1024",
    supplier: "Dell Technologies ot",
    supplierInitials: "AS",
    purchaseDate: "29 Aug 2026",
    items: "2 Items",
    total: " 9,820,000 CFA",
    paid: " 4,000,000 CFA",
    purchaseType: "Order",
    outstanding: " 5,820,000 CFA",
    status: {
      label: "Received",
      bg: "bg-[#E5F4F3]",
      border: "border-[#B2E4DF]",
      text: "text-[#009689]",
    },
  },
  {
    id: "7",
    purchaseCode: "PUR-1024",
    supplier: "Dell Technologies ot",
    supplierInitials: "AS",
    purchaseDate: "29 Aug 2026",
    items: "2 Items",
    total: " 9,820,000 CFA",
    paid: " 4,000,000 CFA",
    purchaseType: "Internal",
    outstanding: " 5,820,000 CFA",
    status: {
      label: "Received",
      bg: "bg-[#E5F4F3]",
      border: "border-[#B2E4DF]",
      text: "text-[#009689]",
    },
  },
  {
    id: "8",
    purchaseCode: "PUR-1024",
    supplier: "Dell Technologies ot",
    supplierInitials: "AS",
    purchaseDate: "29 Aug 2026",
    items: "2 Items",
    total: " 9,820,000 CFA",
    paid: " 4,000,000 CFA",
    purchaseType: "Order",
    outstanding: " 5,820,000 CFA",
    status: {
      label: "Draft",
      bg: "bg-[#F5F5F7]",
      border: "border-[#EDEDED]",
      text: "text-[#575765]",
    },
  },
  {
    id: "9",
    purchaseCode: "PUR-1024",
    supplier: "Dell Technologies ot",
    supplierInitials: "AS",
    purchaseDate: "29 Aug 2026",
    items: "2 Items",
    total: " 9,820,000 CFA",
    paid: " 4,000,000 CFA",
    purchaseType: "Internal",
    outstanding: " 5,820,000 CFA",
    status: {
      label: "Cancelled",
      bg: "bg-[#FEE9E9]",
      border: "border-[#FFD5D8]",
      text: "text-[#F92424]",
    },
  },
  {
    id: "10",
    purchaseCode: "PUR-1024",
    supplier: "Dell Technologies ot",
    supplierInitials: "AS",
    purchaseDate: "29 Aug 2026",
    items: "2 Items",
    total: " 9,820,000 CFA",
    paid: " 4,000,000 CFA",
    purchaseType: "Order",
    outstanding: " 5,820,000 CFA",
    status: {
      label: "Received",
      bg: "bg-[#E5F4F3]",
      border: "border-[#B2E4DF]",
      text: "text-[#009689]",
    },
  },
];

/* =========================================================================
   ACTION DROPDOWN (Edit, View, Delete)
   ========================================================================= */
function ActionDropdown({
  purchaseCode,
  onDelete,
  dropUp = false,
}: {
  purchaseCode: string;
  onDelete: () => void;
  dropUp?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      className="relative inline-block text-left"
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Actions"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="size-8 rounded-[6px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] hover:bg-neutral-100 transition-colors cursor-pointer ml-auto"
      >
        <MoreVerticalIcon className="size-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 ${
            dropUp ? "bottom-full mb-1.5" : "top-full mt-1.5"
          } z-50 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 flex flex-col text-left animate-in fade-in zoom-in-95 duration-100`}
        >
          {/* Edit Option */}
          <Link
            href="/purchases/new"
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <EditIcon className="size-3.5 text-[#575765]" />
            <span>Edit</span>
          </Link>

          {/* View Option */}
          <Link
            href={`/purchases/${purchaseCode}`}
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <EyeIcon className="size-3.5 text-[#575765]" />
            <span>View</span>
          </Link>

          {/* Delete Option */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onDelete();
            }}
            className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#F92424] hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <DeleteIcon className="size-3.5 text-[#F92424]" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function PurchasesTable() {
  const router = useRouter();
  const [records, setRecords] = useState<PurchaseRecord[]>(purchaseRecords);
  const [showFilters, setShowFilters] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [supplierFilter, setSupplierFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(25);
  const [perPage, setPerPage] = useState(10);

  const handleRowClick = (purchase: PurchaseRecord) => {
    router.push(`/purchases/${purchase.purchaseCode}`);
  };

  const handleDelete = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredRecords = records.filter((record) => {
    if (supplierFilter && supplierFilter !== "All") {
      if (record.supplier.toLowerCase() !== supplierFilter.toLowerCase()) return false;
    }
    if (typeFilter && typeFilter !== "All") {
      if (record.purchaseType.toLowerCase() !== typeFilter.toLowerCase()) return false;
    }
    if (statusFilter && statusFilter !== "All") {
      if (record.status.label.toLowerCase() !== statusFilter.toLowerCase()) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        record.purchaseCode.toLowerCase().includes(q) ||
        record.supplier.toLowerCase().includes(q) ||
        record.purchaseType.toLowerCase().includes(q) ||
        record.status.label.toLowerCase().includes(q) ||
        record.purchaseDate.toLowerCase().includes(q);
      if (!matches) return false;
    }
    return true;
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Table Card Container */}
      <div
        className="w-full bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col"
        data-node-id="6303:19516"
      >
        {/* Table Top Header Bar */}
        <div className="min-h-[52px] px-5 py-2.5 border-b border-[#EDEDED] flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-medium text-[#575765] text-[20px]">
            Purchases
          </h3>

          <div className="flex items-center gap-2">
            {/* Search Button / Search Input Toggle */}
            {showSearch ? (
              <div className="relative flex items-center animate-in fade-in duration-150">
                <SearchIcon className="size-4 text-[#8C8C9A] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search purchases..."
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
            <button
              type="button"
              className="h-[34px] px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
            >
              <ExportIcon className="size-5" />
              <span className="font-medium text-[11px]">Export</span>
            </button>

            {/* Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className={`h-[34px] px-4 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer ${showFilters ? "bg-neutral-100 font-semibold" : "bg-white hover:bg-neutral-50"
                }`}
            >
              <FilterIcon className="size-5" />
              <span className="font-medium text-[11px]">Filter</span>
            </button>
          </div>
        </div>

        {/* Table Filter Bar Row (Toggled by Filter button) */}
        {showFilters && (
          <div
            className="min-h-[52px] px-5 py-3 border-b border-[#EDEDED] flex flex-wrap items-center gap-3 bg-white animate-in fade-in duration-150"
            data-node-id="6738:29813"
          >
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

            {/* Supplier Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={supplierFilter}
                onChange={(e) => setSupplierFilter(e.target.value)}
                className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-8 py-1.5 text-[#575765] text-[13px] appearance-none outline-none cursor-pointer hover:border-neutral-300 transition-colors"
              >
                <option value="All">All Supplier</option>
                <option value="Dell Technologies ot">Dell Technologies ot</option>
                <option value="Marco Cronos">Marco Cronos</option>
                <option value="HP Enterprise">HP Enterprise</option>
              </select>
              <ChevronDownIcon className="size-4 text-[#575765] absolute right-2.5 pointer-events-none" />
            </div>

            {/* Purchase Type Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-8 py-1.5 text-[#575765] text-[13px] appearance-none outline-none cursor-pointer hover:border-neutral-300 transition-colors"
              >
                <option value="All">Type: All</option>
                <option value="Order">Order</option>
                <option value="Internal">Internal</option>
              </select>
              <ChevronDownIcon className="size-4 text-[#575765] absolute right-2.5 pointer-events-none" />
            </div>

            {/* Status Dropdown */}
            <div className="relative inline-flex items-center">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-8 py-1.5 text-[#575765] text-[13px] appearance-none outline-none cursor-pointer hover:border-neutral-300 transition-colors"
              >
                <option value="All">Status: All</option>
                <option value="Ordered">Ordered</option>
                <option value="Received">Received</option>
                <option value="Draft">Draft</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <ChevronDownIcon className="size-4 text-[#575765] absolute right-2.5 pointer-events-none" />
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

        {/* Scrollable Data Table Container */}
        <div className="w-full overflow-x-auto pb-16">
          <table className="w-full text-left border-collapse min-w-[1250px]">
            {/* Table Head */}
            <thead>
              <tr className="border-b border-[#EDEDED] bg-white text-[#575765] text-[11px] font-medium select-none">
                <th className="py-3 px-4 w-[130px]">Purchase #</th>
                <th className="py-3 px-4 w-[240px]">Supplier</th>
                <th className="py-3 px-4 w-[140px]">Purchase Date</th>
                <th className="py-3 px-4 w-[110px]">Items</th>
                <th className="py-3 px-4 w-[130px]">Total</th>
                <th className="py-3 px-4 w-[130px]">Paid</th>
                <th className="py-3 px-4 w-[140px]">Purchase Type</th>
                <th className="py-3 px-4 w-[130px]">Outstanding</th>
                <th className="py-3 px-4 w-[110px]">Status</th>
                <th className="py-3 px-4 w-[50px] text-right"></th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-[#8C8C9A]">
                    No purchases found matching your search.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((item, idx) => (
                  <tr
                    key={idx}
                    onClick={() => handleRowClick(item)}
                    className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Purchase Code */}
                    <td className="py-4 px-4 font-normal text-[#3D3D49] group-hover:text-[#FF611C] transition-colors whitespace-nowrap">
                      {item.purchaseCode}
                    </td>

                    {/* Supplier */}
                    <td className="py-4 px-4 text-[#3D3D49] font-normal truncate max-w-[240px]">
                      <div className="flex items-center gap-2.5">
                        <div className="size-6 rounded-full bg-[#E0F2FE] text-[#0284C7] text-[10px] font-semibold flex items-center justify-center shrink-0">
                          {item.supplierInitials}
                        </div>
                        <span className="truncate">{item.supplier}</span>
                      </div>
                    </td>

                    {/* Purchase Date */}
                    <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                      {item.purchaseDate}
                    </td>

                    {/* Items */}
                    <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                      {item.items}
                    </td>

                    {/* Total */}
                    <td className="py-4 px-4 font-normal text-[#3D3D49] whitespace-nowrap">
                      {item.total}
                    </td>

                    {/* Paid */}
                    <td className="py-4 px-4 font-normal text-[#009689] whitespace-nowrap">
                      {item.paid}
                    </td>

                    {/* Purchase Type */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-[6px] text-[11px] font-medium ${item.purchaseType === "Order"
                            ? "bg-[#F3EEFF] text-[#8A58FF]"
                            : "bg-[#E7F2FC] text-[#0D79E4]"
                          }`}
                      >
                        {item.purchaseType}
                      </span>
                    </td>

                    {/* Outstanding */}
                    <td className="py-4 px-4 font-normal text-[#F92424] whitespace-nowrap">
                      {item.outstanding}
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
                      <ActionDropdown
                        purchaseCode={item.purchaseCode}
                        onDelete={() => handleDelete(item.id)}
                        dropUp={
                          idx >= filteredRecords.length - 3 &&
                          filteredRecords.length > 4
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
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
