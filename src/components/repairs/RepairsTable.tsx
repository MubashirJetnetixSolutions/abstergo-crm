"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  EditIcon,
  EyeIcon,
  DeleteIcon,
} from "@/components/icons/Icons";

interface RepairRow {
  id: string;
  repairNumber: string;
  customer: string;
  customerInitials: string;
  customerColor: string;
  product: string;
  received: string;
  expected: string;
  warranty: string;
  priority: "High" | "Medium" | "Low";
  technician: string;
  technicianInitials: string;
  technicianColor: string;
  status: "Received" | "In Progress" | "Pending" | "Ready for Pickup" | "Completed";
}

const REPAIRS_DATA: RepairRow[] = [
  {
    id: "1",
    repairNumber: "REP-1012",
    customer: "ABC Technologies",
    customerInitials: "AT",
    customerColor: "bg-blue-100 text-blue-700",
    product: "Apple iPhone 15 — 128GB Black",
    received: "2 Items",
    expected: "28 Sep 2026",
    warranty: "22,000 CFA",
    priority: "High",
    technician: "Mike Johnson",
    technicianInitials: "MJ",
    technicianColor: "bg-purple-100 text-purple-700",
    status: "Received",
  },
  {
    id: "2",
    repairNumber: "REP-1012",
    customer: "ABC Technologies",
    customerInitials: "AT",
    customerColor: "bg-blue-100 text-blue-700",
    product: "Apple iPhone 15 — 128GB Black",
    received: "2 Items",
    expected: "28 Sep 2026",
    warranty: "22,000 CFA",
    priority: "Medium",
    technician: "Mike Johnson",
    technicianInitials: "MJ",
    technicianColor: "bg-purple-100 text-purple-700",
    status: "In Progress",
  },
  {
    id: "3",
    repairNumber: "REP-1012",
    customer: "ABC Technologies",
    customerInitials: "AT",
    customerColor: "bg-blue-100 text-blue-700",
    product: "Apple iPhone 15 — 128GB Black",
    received: "2 Items",
    expected: "28 Sep 2026",
    warranty: "22,000 CFA",
    priority: "Low",
    technician: "Christopher Cord",
    technicianInitials: "CC",
    technicianColor: "bg-emerald-100 text-emerald-700",
    status: "Pending",
  },
  {
    id: "4",
    repairNumber: "REP-1012",
    customer: "ABC Technologies",
    customerInitials: "AT",
    customerColor: "bg-blue-100 text-blue-700",
    product: "Apple iPhone 15 — 128GB Black",
    received: "2 Items",
    expected: "28 Sep 2026",
    warranty: "22,000 CFA",
    priority: "High",
    technician: "Mike Johnson",
    technicianInitials: "MJ",
    technicianColor: "bg-purple-100 text-purple-700",
    status: "Ready for Pickup",
  },
  {
    id: "5",
    repairNumber: "REP-1012",
    customer: "ABC Technologies",
    customerInitials: "AT",
    customerColor: "bg-blue-100 text-blue-700",
    product: "Apple iPhone 15 — 128GB Black",
    received: "2 Items",
    expected: "28 Sep 2026",
    warranty: "22,000 CFA",
    priority: "Medium",
    technician: "Christopher Cord",
    technicianInitials: "CC",
    technicianColor: "bg-emerald-100 text-emerald-700",
    status: "Completed",
  },
  {
    id: "6",
    repairNumber: "REP-1012",
    customer: "ABC Technologies",
    customerInitials: "AT",
    customerColor: "bg-blue-100 text-blue-700",
    product: "Apple iPhone 15 — 128GB Black",
    received: "2 Items",
    expected: "28 Sep 2026",
    warranty: "22,000 CFA",
    priority: "Low",
    technician: "Mike Johnson",
    technicianInitials: "MJ",
    technicianColor: "bg-purple-100 text-purple-700",
    status: "Received",
  },
  {
    id: "7",
    repairNumber: "REP-1012",
    customer: "ABC Technologies",
    customerInitials: "AT",
    customerColor: "bg-blue-100 text-blue-700",
    product: "Apple iPhone 15 — 128GB Black",
    received: "2 Items",
    expected: "28 Sep 2026",
    warranty: "22,000 CFA",
    priority: "High",
    technician: "Jean Martin",
    technicianInitials: "JM",
    technicianColor: "bg-amber-100 text-amber-700",
    status: "In Progress",
  },
  {
    id: "8",
    repairNumber: "REP-1012",
    customer: "ABC Technologies",
    customerInitials: "AT",
    customerColor: "bg-blue-100 text-blue-700",
    product: "Apple iPhone 15 — 128GB Black",
    received: "2 Items",
    expected: "28 Sep 2026",
    warranty: "22,000 CFA",
    priority: "Medium",
    technician: "Mike Johnson",
    technicianInitials: "MJ",
    technicianColor: "bg-purple-100 text-purple-700",
    status: "Ready for Pickup",
  },
];

/* =========================================================================
   ACTION DROPDOWN (Edit, View, Delete)
   ========================================================================= */
function ActionDropdown({
  repairNumber,
  onDelete,
  dropUp = false,
}: {
  repairNumber: string;
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
            href="/repairs/new"
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <EditIcon className="size-3.5 text-[#575765]" />
            <span>Edit</span>
          </Link>

          {/* View Option */}
          <Link
            href={`/repairs/${repairNumber}`}
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

export default function RepairsTable() {
  const router = useRouter();
  const [repairs, setRepairs] = useState<RepairRow[]>(REPAIRS_DATA);
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [technicianFilter, setTechnicianFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("25");

  const handleDelete = (id: string) => {
    setRepairs((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredData = repairs.filter((row) => {
    if (priorityFilter && priorityFilter !== "All") {
      if (row.priority.toLowerCase() !== priorityFilter.toLowerCase()) return false;
    }
    if (technicianFilter && technicianFilter !== "All") {
      if (row.technician.toLowerCase() !== technicianFilter.toLowerCase()) return false;
    }
    if (statusFilter && statusFilter !== "All") {
      if (row.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = `${row.repairNumber} ${row.customer} ${row.product} ${row.technician} ${row.status}`
        .toLowerCase()
        .includes(q);
      if (!match) return false;
    }
    return true;
  });

  const getPriorityBadge = (priority: RepairRow["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-[#FFF0F0] text-[#E02D3C] border border-[#FFD5D8]";
      case "Medium":
        return "bg-[#FFF8E6] text-[#D97706] border border-[#FDE68A]";
      case "Low":
        return "bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getStatusBadge = (status: RepairRow["status"]) => {
    switch (status) {
      case "Received":
        return "bg-[#E7F2FC] text-[#1E75FF] border border-[#C2E0FC]";
      case "In Progress":
        return "bg-[#F3EEFF] text-[#8247FF] border border-[#D8C7FF]";
      case "Pending":
        return "bg-[#FDF7E5] text-[#D97706] border border-[#F6E2A4]";
      case "Ready for Pickup":
        return "bg-[#E5F4F3] text-[#0D9488] border border-[#A7DFDB]";
      case "Completed":
        return "bg-[#EAF8E8] text-[#22C55E] border border-[#B9EAB5]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-[12px] border border-[#E9ECEF] bg-white shadow-sm overflow-hidden flex flex-col">
      {/* Table Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-[#E9ECEF]">
        <h2 className="text-[20px] font-medium text-[#575765]">Repairs</h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search repairs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[32px] w-[220px] rounded-[8px] border border-[#E9ECEF] bg-white pl-9 pr-3 text-sm text-[#3D3D49] shadow-sm outline-none focus:border-gray-900 transition"
            />
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8C8C9A]" />
          </div>

          {/* Action Buttons */}
          <button
            type="button"
            className="flex h-[32px] items-center gap-2 rounded-[8px] border border-[#E9ECEF] bg-white px-3.5 text-sm font-medium text-[#575765] shadow-sm hover:bg-gray-50 transition"
          >
            <ExportIcon className="size-4 text-[#575765]" />
            <span>Export</span>
          </button>

          <button
            type="button"
            className="flex h-[32px] items-center gap-2 rounded-[8px] border border-[#E9ECEF] bg-white px-3.5 text-sm font-medium text-[#575765] shadow-sm hover:bg-gray-50 transition"
          >
            <UploadIcon className="size-4 text-[#575765]" />
            <span>Upload</span>
          </button>

          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className={`flex h-[32px] items-center gap-2 rounded-[8px] border border-[#E9ECEF] px-3.5 text-sm font-medium text-[#575765] shadow-sm transition cursor-pointer ${
              showFilters ? "bg-neutral-100 font-semibold" : "bg-white hover:bg-gray-50"
            }`}
          >
            <FilterIcon className="size-4 text-[#575765]" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table Filter Bar Row (Figma 6738:29847) */}
      {showFilters && (
        <div className="min-h-[52px] px-5 py-3 border-b border-[#EDEDED] flex flex-wrap items-center gap-3 bg-white" data-node-id="6738:29847">
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

          {/* Priority Dropdown */}
          <div className="relative inline-flex items-center">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-8 py-1.5 text-[#575765] text-[13px] appearance-none outline-none cursor-pointer hover:border-neutral-300 transition-colors"
            >
              <option value="All">Priority: All</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
            </select>
            <ChevronDownIcon className="size-4 text-[#575765] absolute right-2.5 pointer-events-none" />
          </div>

          {/* Technician Dropdown */}
          <div className="relative inline-flex items-center">
            <select
              value={technicianFilter}
              onChange={(e) => setTechnicianFilter(e.target.value)}
              className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-8 py-1.5 text-[#575765] text-[13px] appearance-none outline-none cursor-pointer hover:border-neutral-300 transition-colors"
            >
              <option value="All">All Technician</option>
              <option value="Mike Johnson">Mike Johnson</option>
              <option value="Christopher Cord">Christopher Cord</option>
              <option value="Jean Martin">Jean Martin</option>
              <option value="Kwame Mensah">Kwame Mensah</option>
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
              <option value="Received">Received</option>
              <option value="In Progress">In Progress</option>
              <option value="Ready for Pickup">Ready for Pickup</option>
              <option value="Completed">Completed</option>
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
          <thead className="border-b border-[#E9ECEF] bg-[#F8FAFD] text-[#8C8C9A] text-xs font-medium uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Delivery #</th>
              <th className="py-3.5 px-4 font-semibold">Customer</th>
              <th className="py-3.5 px-4 font-semibold">Product</th>
              <th className="py-3.5 px-4 font-semibold">Received</th>
              <th className="py-3.5 px-4 font-semibold">Expected</th>
              <th className="py-3.5 px-4 font-semibold">Warranty</th>
              <th className="py-3.5 px-4 font-semibold">Priority</th>
              <th className="py-3.5 px-4 font-semibold">Technician</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold text-right">-</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9ECEF]">
            {filteredData.map((row, idx) => (
              <tr
                key={row.id}
                onClick={() => router.push(`/repairs/${row.repairNumber}`)}
                className="hover:bg-gray-50/75 transition cursor-pointer"
              >
                {/* Repair Number */}
                <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                  {row.repairNumber}
                </td>

                {/* Customer */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${row.customerColor}`}
                    >
                      {row.customerInitials}
                    </div>
                    <span className="font-medium text-[#3D3D49]">
                      {row.customer}
                    </span>
                  </div>
                </td>

                {/* Product */}
                <td className="py-3.5 px-4 font-medium text-[#575765]">
                  {row.product}
                </td>

                {/* Received */}
                <td className="py-3.5 px-4 text-[#575765]">{row.received}</td>

                {/* Expected */}
                <td className="py-3.5 px-4 text-[#575765]">{row.expected}</td>

                {/* Warranty */}
                <td className="py-3.5 px-4 font-medium text-[#3D3D49]">
                  {row.warranty}
                </td>

                {/* Priority */}
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-[6px] text-xs font-semibold ${getPriorityBadge(
                      row.priority
                    )}`}
                  >
                    • {row.priority}
                  </span>
                </td>

                {/* Technician */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold ${row.technicianColor}`}
                    >
                      {row.technicianInitials}
                    </div>
                    <span className="font-medium text-[#3D3D49]">
                      {row.technician}
                    </span>
                  </div>
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-[6px] text-xs font-medium ${getStatusBadge(
                      row.status
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>

                {/* Options Action */}
                <td
                  className="py-3.5 px-4 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ActionDropdown
                    repairNumber={row.repairNumber}
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
          <span>Showing</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
            className="rounded-[6px] border border-[#E9ECEF] bg-white px-2 py-1 text-xs text-[#3D3D49] outline-none"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>per page</span>
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
            Page {currentPage} of 12
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
    </div>
  );
}
