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
  EditIcon,
  EyeIcon,
  DeleteIcon,
} from "@/components/icons/Icons";

interface DeliveryRow {
  id: string;
  deliveryNumber: string;
  orderNumber: string;
  customer: string;
  customerInitials: string;
  customerColor: string;
  deliveryDate: string;
  items: string;
  deliveryAddress: string;
  deliveredBy: string;
  deliveredByInitials: string;
  deliveredByColor: string;
  deliveryValue: string;
  status: "Delivered" | "Overdue" | "Pending" | "Partial";
}

const DELIVERIES_DATA: DeliveryRow[] = [
  {
    id: "1",
    deliveryNumber: "DEL-1082",
    orderNumber: "ORD-1024",
    customer: "ABC Technologies",
    customerInitials: "AS",
    customerColor: "bg-teal-100 text-teal-700",
    deliveryDate: "31 Aug 2026",
    items: "2 Items",
    deliveryAddress: "Central Business Area",
    deliveredBy: "Mike Johnson",
    deliveredByInitials: "MJ",
    deliveredByColor: "bg-blue-100 text-blue-700",
    deliveryValue: "22,000 CFA",
    status: "Delivered",
  },
  {
    id: "2",
    deliveryNumber: "DEL-1082",
    orderNumber: "ORD-1024",
    customer: "ABC Technologies",
    customerInitials: "AS",
    customerColor: "bg-orange-100 text-orange-700",
    deliveryDate: "31 Aug 2026",
    items: "2 Items",
    deliveryAddress: "Central Business Area",
    deliveredBy: "Mike Johnson",
    deliveredByInitials: "MJ",
    deliveredByColor: "bg-blue-100 text-blue-700",
    deliveryValue: "22,000 CFA",
    status: "Delivered",
  },
  {
    id: "3",
    deliveryNumber: "DEL-1082",
    orderNumber: "ORD-1024",
    customer: "ABC Technologies",
    customerInitials: "AS",
    customerColor: "bg-blue-100 text-blue-700",
    deliveryDate: "31 Aug 2026",
    items: "2 Items",
    deliveryAddress: "Central Business Area",
    deliveredBy: "Mike Johnson",
    deliveredByInitials: "MJ",
    deliveredByColor: "bg-blue-100 text-blue-700",
    deliveryValue: "22,000 CFA",
    status: "Overdue",
  },
  {
    id: "4",
    deliveryNumber: "DEL-1082",
    orderNumber: "ORD-1024",
    customer: "ABC Technologies",
    customerInitials: "AS",
    customerColor: "bg-orange-100 text-orange-700",
    deliveryDate: "31 Aug 2026",
    items: "2 Items",
    deliveryAddress: "Central Business Area",
    deliveredBy: "Mike Johnson",
    deliveredByInitials: "MJ",
    deliveredByColor: "bg-blue-100 text-blue-700",
    deliveryValue: "22,000 CFA",
    status: "Pending",
  },
  {
    id: "5",
    deliveryNumber: "DEL-1082",
    orderNumber: "ORD-1024",
    customer: "ABC Technologies",
    customerInitials: "AS",
    customerColor: "bg-amber-100 text-amber-700",
    deliveryDate: "31 Aug 2026",
    items: "2 Items",
    deliveryAddress: "Central Business Area",
    deliveredBy: "Mike Johnson",
    deliveredByInitials: "MJ",
    deliveredByColor: "bg-blue-100 text-blue-700",
    deliveryValue: "22,000 CFA",
    status: "Overdue",
  },
  {
    id: "6",
    deliveryNumber: "DEL-1082",
    orderNumber: "ORD-1024",
    customer: "ABC Technologies",
    customerInitials: "AS",
    customerColor: "bg-purple-100 text-purple-700",
    deliveryDate: "31 Aug 2026",
    items: "2 Items",
    deliveryAddress: "Central Business Area",
    deliveredBy: "Mike Johnson",
    deliveredByInitials: "MJ",
    deliveredByColor: "bg-blue-100 text-blue-700",
    deliveryValue: "22,000 CFA",
    status: "Delivered",
  },
  {
    id: "7",
    deliveryNumber: "DEL-1082",
    orderNumber: "ORD-1024",
    customer: "ABC Technologies",
    customerInitials: "AS",
    customerColor: "bg-blue-100 text-blue-700",
    deliveryDate: "31 Aug 2026",
    items: "2 Items",
    deliveryAddress: "Central Business Area",
    deliveredBy: "Mike Johnson",
    deliveredByInitials: "MJ",
    deliveredByColor: "bg-blue-100 text-blue-700",
    deliveryValue: "22,000 CFA",
    status: "Delivered",
  },
  {
    id: "8",
    deliveryNumber: "DEL-1082",
    orderNumber: "ORD-1024",
    customer: "ABC Technologies",
    customerInitials: "AS",
    customerColor: "bg-amber-100 text-amber-700",
    deliveryDate: "31 Aug 2026",
    items: "2 Items",
    deliveryAddress: "Central Business Area",
    deliveredBy: "Mike Johnson",
    deliveredByInitials: "MJ",
    deliveredByColor: "bg-blue-100 text-blue-700",
    deliveryValue: "22,000 CFA",
    status: "Pending",
  },
  {
    id: "9",
    deliveryNumber: "DEL-1082",
    orderNumber: "ORD-1024",
    customer: "ABC Technologies",
    customerInitials: "AS",
    customerColor: "bg-blue-100 text-blue-700",
    deliveryDate: "31 Aug 2026",
    items: "2 Items",
    deliveryAddress: "Central Business Area",
    deliveredBy: "Mike Johnson",
    deliveredByInitials: "MJ",
    deliveredByColor: "bg-blue-100 text-blue-700",
    deliveryValue: "22,000 CFA",
    status: "Partial",
  },
  {
    id: "10",
    deliveryNumber: "DEL-1082",
    orderNumber: "ORD-1024",
    customer: "ABC Technologies",
    customerInitials: "AS",
    customerColor: "bg-teal-100 text-teal-700",
    deliveryDate: "31 Aug 2026",
    items: "2 Items",
    deliveryAddress: "Central Business Area",
    deliveredBy: "Mike Johnson",
    deliveredByInitials: "MJ",
    deliveredByColor: "bg-blue-100 text-blue-700",
    deliveryValue: "22,000 CFA",
    status: "Partial",
  },
];

/* =========================================================================
   ACTION DROPDOWN (Edit, View, Delete)
   ========================================================================= */
function ActionDropdown({
  deliveryNumber,
  onDelete,
  dropUp = false,
}: {
  deliveryNumber: string;
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
            href="/deliveries/new"
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <EditIcon className="size-3.5 text-[#575765]" />
            <span>Edit</span>
          </Link>

          {/* View Option */}
          <Link
            href={`/deliveries/${deliveryNumber}`}
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

export default function DeliveriesTable() {
  const router = useRouter();
  const [deliveries, setDeliveries] = useState<DeliveryRow[]>(DELIVERIES_DATA);
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [deliveredByFilter, setDeliveredByFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");

  const handleDelete = (id: string) => {
    setDeliveries((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredData = deliveries.filter((row) => {
    if (deliveredByFilter && deliveredByFilter !== "All") {
      if (row.deliveredBy.toLowerCase() !== deliveredByFilter.toLowerCase()) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = `${row.deliveryNumber} ${row.orderNumber} ${row.customer} ${row.deliveredBy} ${row.status}`
        .toLowerCase()
        .includes(q);
      if (!match) return false;
    }
    return true;
  });

  const getStatusBadge = (status: DeliveryRow["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-[#E5F4F3] text-[#0D9488] border border-[#A7DFDB]";
      case "Overdue":
        return "bg-[#FFF0F0] text-[#E02D3C] border border-[#FFD5D8]";
      case "Pending":
        return "bg-[#E7F2FC] text-[#1E75FF] border border-[#C2E0FC]";
      case "Partial":
        return "bg-[#FFF8E6] text-[#D97706] border border-[#FDE68A]";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-[12px] border border-[#EDEDED] bg-white shadow-sm overflow-hidden flex flex-col">
      {/* Table Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-[#EDEDED]">
        <h2 className="text-[20px] font-medium text-[#575765]">Deliveries</h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search deliveries..."
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
      {showFilters && (
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

          {/* Delivered By Dropdown */}
          <div className="relative inline-flex items-center">
            <select
              value={deliveredByFilter}
              onChange={(e) => setDeliveredByFilter(e.target.value)}
              className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-8 py-1.5 text-[#575765] text-[13px] appearance-none outline-none cursor-pointer hover:border-neutral-300 transition-colors"
            >
              <option value="All">All Delivered By</option>
              <option value="Mike Johnson">Mike Johnson</option>
              <option value="Christopher Cord">Christopher Cord</option>
              <option value="Jean Martin">Jean Martin</option>
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
              <th className="py-3.5 px-4 font-semibold">Order #</th>
              <th className="py-3.5 px-4 font-semibold">Customer</th>
              <th className="py-3.5 px-4 font-semibold">Delivery Date</th>
              <th className="py-3.5 px-4 font-semibold">Items</th>
              <th className="py-3.5 px-4 font-semibold">Delivery Address</th>
              <th className="py-3.5 px-4 font-semibold">Delivered By</th>
              <th className="py-3.5 px-4 font-semibold">Delivery Value</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9ECEF]">
            {filteredData.map((row, idx) => (
              <tr
                key={row.id}
                onClick={() => router.push(`/deliveries/${row.deliveryNumber}`)}
                className="hover:bg-gray-50/75 transition cursor-pointer"
              >
                {/* Delivery # */}
                <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                  {row.deliveryNumber}
                </td>

                {/* Order # */}
                <td className="py-3.5 px-4 font-medium text-[#575765]">
                  {row.orderNumber}
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

                {/* Delivery Date */}
                <td className="py-3.5 px-4 text-[#575765]">
                  {row.deliveryDate}
                </td>

                {/* Items */}
                <td className="py-3.5 px-4 text-[#575765]">{row.items}</td>

                {/* Delivery Address */}
                <td className="py-3.5 px-4 font-medium text-[#3D3D49]">
                  {row.deliveryAddress}
                </td>

                {/* Delivered By */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex size-6 items-center justify-center rounded-full text-[10px] font-bold ${row.deliveredByColor}`}
                    >
                      {row.deliveredByInitials}
                    </div>
                    <span className="font-medium text-[#3D3D49]">
                      {row.deliveredBy}
                    </span>
                  </div>
                </td>

                {/* Delivery Value */}
                <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                  {row.deliveryValue}
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
                    deliveryNumber={row.deliveryNumber}
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
    </div>
  );
}
