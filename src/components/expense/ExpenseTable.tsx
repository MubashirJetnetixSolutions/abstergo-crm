"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  ExportIcon,
  FilterIcon,
  MoreVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  CalendarIcon,
  XIcon,
  EditIcon,
  EyeIcon,
  DeleteIcon,
} from "@/components/icons/Icons";

export type ExpenseTab = "all" | "awaiting" | "revision";

interface ExpenseRow {
  id: string;
  expenseNumber: string;
  date: string;
  category: string;
  description: string;
  method: string;
  amount: string;
  paid: string;
  balance: string;
  status: "Paid" | "Partial" | "Pending" | "Approved";
  reason?: string;
  reviewStatus: "none" | "awaiting" | "revision" | "approved";
}

const INITIAL_EXPENSES_DATA: ExpenseRow[] = [
  {
    id: "1",
    expenseNumber: "EXP-1028",
    date: "31 Aug 2026",
    category: "Office Supplies",
    description: "Monthly office stationery and printer...",
    method: "Bank Transfer",
    amount: "22,000 CFA",
    paid: "22,000 CFA",
    balance: "22,000 CFA",
    status: "Partial",
    reviewStatus: "awaiting",
    reason: "Its tooo much and don't seem appropriate to me please revise this",
  },
  {
    id: "2",
    expenseNumber: "EXP-1028",
    date: "31 Aug 2026",
    category: "Salaries",
    description: "Monthly office stationery and printer...",
    method: "Bank Transfer",
    amount: "22,000 CFA",
    paid: "22,000 CFA",
    balance: "22,000 CFA",
    status: "Partial",
    reviewStatus: "awaiting",
    reason: "Its tooo much and don't seem appropriate to me please revise this",
  },
  {
    id: "3",
    expenseNumber: "EXP-1028",
    date: "31 Aug 2026",
    category: "Marketing",
    description: "Monthly office stationery and printer...",
    method: "Bank Transfer",
    amount: "22,000 CFA",
    paid: "22,000 CFA",
    balance: "22,000 CFA",
    status: "Partial",
    reviewStatus: "awaiting",
    reason: "Its tooo much and don't seem appropriate to me please revise this",
  },
  {
    id: "4",
    expenseNumber: "EXP-1028",
    date: "31 Aug 2026",
    category: "Office Supplies",
    description: "Monthly office stationery and printer...",
    method: "Bank Transfer",
    amount: "22,000 CFA",
    paid: "22,000 CFA",
    balance: "22,000 CFA",
    status: "Partial",
    reviewStatus: "awaiting",
    reason: "Its tooo much and don't seem appropriate to me please revise this",
  },
  {
    id: "5",
    expenseNumber: "EXP-1028",
    date: "31 Aug 2026",
    category: "Office Supplies",
    description: "Monthly office stationery and printer...",
    method: "Bank Transfer",
    amount: "22,000 CFA",
    paid: "22,000 CFA",
    balance: "22,000 CFA",
    status: "Partial",
    reviewStatus: "awaiting",
    reason: "Its tooo much and don't seem appropriate to me please revise this",
  },
  {
    id: "6",
    expenseNumber: "EXP-1028",
    date: "31 Aug 2026",
    category: "Marketing",
    description: "Monthly office stationery and printer...",
    method: "Bank Transfer",
    amount: "22,000 CFA",
    paid: "22,000 CFA",
    balance: "22,000 CFA",
    status: "Partial",
    reviewStatus: "awaiting",
    reason: "Its tooo much and don't seem appropriate to me please revise this",
  },
  {
    id: "7",
    expenseNumber: "EXP-1028",
    date: "31 Aug 2026",
    category: "Salaries",
    description: "Monthly office stationery and printer...",
    method: "Bank Transfer",
    amount: "22,000 CFA",
    paid: "22,000 CFA",
    balance: "22,000 CFA",
    status: "Partial",
    reviewStatus: "awaiting",
    reason: "Its tooo much and don't seem appropriate to me please revise this",
  },
  {
    id: "8",
    expenseNumber: "EXP-1028",
    date: "31 Aug 2026",
    category: "Salaries",
    description: "Monthly office stationery and printer...",
    method: "Bank Transfer",
    amount: "22,000 CFA",
    paid: "22,000 CFA",
    balance: "22,000 CFA",
    status: "Partial",
    reviewStatus: "awaiting",
    reason: "Its tooo much and don't seem appropriate to me please revise this",
  },
  {
    id: "9",
    expenseNumber: "EXP-1028",
    date: "31 Aug 2026",
    category: "Bank Charges",
    description: "Monthly office stationery and printer...",
    method: "Bank Transfer",
    amount: "22,000 CFA",
    paid: "22,000 CFA",
    balance: "22,000 CFA",
    status: "Partial",
    reviewStatus: "awaiting",
    reason: "Its tooo much and don't seem appropriate to me please revise this",
  },
  {
    id: "10",
    expenseNumber: "EXP-1028",
    date: "31 Aug 2026",
    category: "Salaries",
    description: "Monthly office stationery and printer...",
    method: "Bank Transfer",
    amount: "22,000 CFA",
    paid: "22,000 CFA",
    balance: "22,000 CFA",
    status: "Partial",
    reviewStatus: "awaiting",
    reason: "Its tooo much and don't seem appropriate to me please revise this",
  },
];

/* =========================================================================
   ACTION DROPDOWN (Edit, View, Delete)
   ========================================================================= */
function ActionDropdown({
  expenseNumber,
  onDelete,
  dropUp = false,
}: {
  expenseNumber: string;
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
        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition cursor-pointer"
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
            href="/expense/new"
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <EditIcon className="size-3.5 text-[#575765]" />
            <span>Edit</span>
          </Link>

          {/* View Option */}
          <Link
            href={`/expense/${expenseNumber}`}
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

interface ExpenseTableProps {
  activeTab?: ExpenseTab;
  onTabChange?: (tab: ExpenseTab) => void;
}

export default function ExpenseTable({
  activeTab = "all",
  onTabChange,
}: ExpenseTableProps) {
  const router = useRouter();
  const [expenses, setExpenses] = useState<ExpenseRow[]>(INITIAL_EXPENSES_DATA);
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");

  const handleDelete = (id: string) => {
    setExpenses((prev) => prev.filter((r) => r.id !== id));
  };

  // Modal State for Request Revision (Figma 6685:34898)
  const [revisionModalRow, setRevisionModalRow] = useState<ExpenseRow | null>(null);
  const [revisionReason, setRevisionReason] = useState(
    "Monthly office stationery and printer"
  );

  const handleOpenRevisionModal = (row: ExpenseRow, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevisionModalRow(row);
    setRevisionReason(row.reason || "Monthly office stationery and printer");
  };

  const handleCloseRevisionModal = () => {
    setRevisionModalRow(null);
  };

  const handleConfirmRevision = () => {
    if (!revisionModalRow) return;
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === revisionModalRow.id
          ? {
              ...item,
              reviewStatus: "revision",
              reason:
                revisionReason ||
                "Its tooo much and don't seem appropriate to me please revise this",
            }
          : item
      )
    );
    setRevisionModalRow(null);
    if (onTabChange) {
      onTabChange("revision");
    }
  };

  const handleApprove = (rowId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === rowId
          ? { ...item, reviewStatus: "approved", status: "Approved" }
          : item
      )
    );
  };

  // Filter based on active tab
  const tabFilteredData = expenses.filter((row) => {
    if (activeTab === "awaiting") {
      return row.reviewStatus === "awaiting";
    }
    if (activeTab === "revision") {
      return (
        row.reviewStatus === "revision" ||
        // Fallback so the table displays rows matching the Figma screenshot if none set yet
        Boolean(row.reason)
      );
    }
    return true;
  });

  const filteredData = tabFilteredData.filter((row) => {
    if (activeTab === "all" && statusFilter && statusFilter !== "All") {
      if (row.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    }
    if (activeTab === "all" && startDate) {
      const rowDate = new Date(row.date);
      const start = new Date(startDate);
      if (!isNaN(rowDate.getTime()) && !isNaN(start.getTime())) {
        rowDate.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        if (rowDate < start) return false;
      }
    }
    if (activeTab === "all" && endDate) {
      const rowDate = new Date(row.date);
      const end = new Date(endDate);
      if (!isNaN(rowDate.getTime()) && !isNaN(end.getTime())) {
        rowDate.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        if (rowDate > end) return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = `${row.expenseNumber} ${row.category} ${row.description} ${row.method} ${row.status} ${
        row.reason || ""
      }`
        .toLowerCase()
        .includes(q);
      if (!match) return false;
    }
    return true;
  });

  const getStatusBadge = (status: ExpenseRow["status"]) => {
    switch (status) {
      case "Paid":
        return "bg-[#E5F4F3] text-[#0D9488] border border-[#A7DFDB]";
      case "Partial":
        return "bg-[#FFF8E6] text-[#D97706] border border-[#FDE68A]";
      case "Pending":
        return "bg-[#E7F2FC] text-[#1E75FF] border border-[#C2E0FC]";
      case "Approved":
        return "bg-[#EAF8E8] text-[#22C55E] border border-[#B9EAB5]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTableTitle = () => {
    switch (activeTab) {
      case "awaiting":
        return "Awaiting Approval";
      case "revision":
        return "Revision Requested";
      default:
        return "All Expenses";
    }
  };

  return (
    <div className="rounded-[12px] border border-[#EDEDED] bg-white shadow-sm overflow-hidden flex flex-col">
      {/* Table Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-[#EDEDED]">
        <h2 className="text-[20px] font-medium text-[#575765]">{getTableTitle()}</h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[32px] w-[220px] rounded-[8px] border border-[#EDEDED] bg-white pl-9 pr-3 text-sm text-[#3D3D49] shadow-sm outline-none focus:border-gray-900 transition"
            />
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8C8C9A]" />
          </div>

          {/* Action Buttons */}
          <button
            type="button"
            className="flex h-[32px] items-center gap-2 rounded-[8px] border border-[#EDEDED] bg-white px-3.5 text-sm font-medium text-[#575765] shadow-sm hover:bg-gray-50 transition cursor-pointer"
          >
            <ExportIcon className="size-4 text-[#575765]" />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className={`flex h-[32px] items-center gap-2 rounded-[8px] border border-[#EDEDED] px-3.5 text-sm font-medium text-[#575765] shadow-sm transition cursor-pointer ${
              showFilters ? "bg-neutral-100 font-semibold" : "bg-white hover:bg-gray-50"
            }`}
          >
            <FilterIcon className="size-4 text-[#575765]" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Dedicated Table Filter Subheader Row */}
      {showFilters && activeTab === "all" && (
        <div className="min-h-[52px] border-b border-[#EDEDED] px-5 py-3 flex flex-wrap gap-3 items-center bg-white">
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

          {/* Status Dropdown */}
          <div className="relative inline-flex items-center">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-8 py-1.5 text-[#575765] text-[13px] appearance-none outline-none cursor-pointer hover:border-neutral-300 transition-colors"
            >
              <option value="All">Status: All</option>
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
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

      {/* Table Content */}
      <div className="overflow-x-auto pb-16">
        <table className="w-full text-left text-sm">
          {/* Table Heads based on Tab */}
          <thead className="border-b border-[#E9ECEF] bg-[#F8FAFD] text-[#8C8C9A] text-xs font-medium uppercase tracking-wider">
            {activeTab === "all" && (
              <tr>
                <th className="py-3.5 px-4 font-semibold">Expense #</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Description</th>
                <th className="py-3.5 px-4 font-semibold">Method</th>
                <th className="py-3.5 px-4 font-semibold">Amount</th>
                <th className="py-3.5 px-4 font-semibold">Paid</th>
                <th className="py-3.5 px-4 font-semibold">Balance</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right"></th>
              </tr>
            )}

            {activeTab === "awaiting" && (
              <tr>
                <th className="py-3.5 px-4 font-semibold">Delivery #</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Description</th>
                <th className="py-3.5 px-4 font-semibold">Method</th>
                <th className="py-3.5 px-4 font-semibold">Amount</th>
                <th className="py-3.5 px-4 font-semibold text-center">Request</th>
                <th className="py-3.5 px-4 font-semibold text-right"></th>
              </tr>
            )}

            {activeTab === "revision" && (
              <tr>
                <th className="py-3.5 px-4 font-semibold">Delivery #</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Reason</th>
                <th className="py-3.5 px-4 font-semibold text-center">Request</th>
                <th className="py-3.5 px-4 font-semibold text-right"></th>
              </tr>
            )}
          </thead>

          <tbody className="divide-y divide-[#E9ECEF]">
            {filteredData.map((row, idx) => (
              <tr
                key={row.id}
                onClick={() => router.push(`/expense/${row.expenseNumber}`)}
                className="hover:bg-gray-50/75 transition cursor-pointer"
              >
                {/* All Expenses View Rows */}
                {activeTab === "all" && (
                  <>
                    <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                      {row.expenseNumber}
                    </td>
                    <td className="py-3.5 px-4 text-[#575765]">{row.date}</td>
                    <td className="py-3.5 px-4 font-medium text-[#3D3D49]">
                      {row.category}
                    </td>
                    <td className="py-3.5 px-4 text-[#575765] max-w-[200px] truncate">
                      {row.description}
                    </td>
                    <td className="py-3.5 px-4 text-[#575765]">{row.method}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                      {row.amount}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-600">
                      {row.paid}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-rose-600">
                      {row.balance}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-[6px] text-xs font-medium ${getStatusBadge(
                          row.status
                        )}`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </>
                )}

                {/* Awaiting Approval View Rows (Figma 6680:32459) */}
                {activeTab === "awaiting" && (
                  <>
                    <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                      {row.expenseNumber}
                    </td>
                    <td className="py-3.5 px-4 text-[#575765]">{row.date}</td>
                    <td className="py-3.5 px-4 font-medium text-[#3D3D49]">
                      {row.category}
                    </td>
                    <td className="py-3.5 px-4 text-[#575765] max-w-[280px] truncate">
                      {row.description}
                    </td>
                    <td className="py-3.5 px-4 text-[#575765]">{row.method}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                      {row.amount}
                    </td>
                    <td
                      className="py-3.5 px-4 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {/* Revision Button (Figma 6680:33034) */}
                        <button
                          type="button"
                          onClick={(e) => handleOpenRevisionModal(row, e)}
                          className="px-3 py-1.5 rounded-[6px] text-white text-[13px] font-medium bg-[#F92424] hover:opacity-90 transition cursor-pointer shadow-sm"
                        >
                          Revision
                        </button>

                        {/* Approve Button */}
                        <button
                          type="button"
                          onClick={(e) => handleApprove(row.id, e)}
                          className="px-3 py-1.5 rounded-[6px] text-white text-[13px] font-medium bg-[#009689] hover:opacity-90 transition cursor-pointer shadow-sm"
                        >
                          Approve
                        </button>
                      </div>
                    </td>
                  </>
                )}

                {/* Revision Requested View Rows (Figma 6685:33355) */}
                {activeTab === "revision" && (
                  <>
                    <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                      {row.expenseNumber}
                    </td>
                    <td className="py-3.5 px-4 text-[#575765]">{row.date}</td>
                    <td className="py-3.5 px-4 font-medium text-[#3D3D49]">
                      {row.category}
                    </td>
                    <td className="py-3.5 px-4 text-[#575765] max-w-[400px]">
                      {row.reason ||
                        "Its tooo much and don't seem appropriate to me please revise this"}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-[6px] text-xs font-medium bg-[#FFEBEB] text-[#F92424] border border-[#F92424]/30">
                        Revision Requested
                      </span>
                    </td>
                  </>
                )}

                {/* Options Action */}
                <td
                  className="py-3.5 px-4 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ActionDropdown
                    expenseNumber={row.expenseNumber}
                    onDelete={() => handleDelete(row.id)}
                    dropUp={idx >= filteredData.length - 3 && filteredData.length > 4}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-t border-[#E9ECEF] text-xs text-[#8C8C9A]">
        <div className="flex items-center gap-2">
          <span>Per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
            className="rounded-[6px] border border-[#E9ECEF] bg-white px-2 py-1 text-xs text-[#3D3D49] outline-none"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex size-7 items-center justify-center rounded-[6px] border border-[#E9ECEF] bg-white text-[#575765] hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <span className="px-2 font-medium text-[#3D3D49]">
            Page 25
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p + 1)}
            className="flex size-7 items-center justify-center rounded-[6px] border border-[#E9ECEF] bg-white text-[#575765] hover:bg-gray-50"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* Request Revision Modal (Figma 6685:34898, 6685:37671) */}
      {revisionModalRow && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={handleCloseRevisionModal}
        >
          <div
            className="w-full max-w-[620px] rounded-[12px] bg-white shadow-2xl border border-[#EDEDED] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#EDEDED] px-6 py-4">
              <h3 className="text-[20px] font-medium text-[#3D3D49]">
                Revision Requested
              </h3>
              <button
                type="button"
                onClick={handleCloseRevisionModal}
                className="text-[#575765] hover:text-[#3D3D49] p-1 rounded-md hover:bg-gray-100 transition"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-5">
              {/* Item Info Box */}
              <div className="bg-[#F8FAFD] border border-[#EDEDED] rounded-[8px] p-4 flex flex-col gap-1">
                <span className="font-semibold text-[#3D3D49] text-[16px]">
                  {revisionModalRow.expenseNumber}
                </span>
                <span className="text-[#575765] text-[13px]">
                  {revisionModalRow.category}
                </span>
              </div>

              {/* Reason Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-medium text-[#575765]">
                  Reason
                </label>
                <textarea
                  rows={3}
                  value={revisionReason}
                  onChange={(e) => setRevisionReason(e.target.value)}
                  placeholder="Enter revision reason..."
                  className="w-full rounded-[8px] border border-[#EDEDED] p-3 text-sm text-[#3D3D49] outline-none focus:border-gray-900 transition resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center gap-3 border-t border-[#EDEDED] p-5">
              <button
                type="button"
                onClick={handleCloseRevisionModal}
                className="h-[47px] flex-1 rounded-[8px] border border-[#EDEDED] bg-white text-[#3D3D49] font-medium text-[15px] hover:bg-gray-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRevision}
                className="h-[47px] flex-1 rounded-[8px] bg-[#F92424] text-white font-medium text-[15px] hover:opacity-95 transition cursor-pointer shadow-sm"
              >
                Revision Requested
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
