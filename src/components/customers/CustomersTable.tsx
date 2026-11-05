"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  ExportIcon,
  UploadIcon,
  FilterIcon,
  MoreVerticalIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  EditIcon,
  EyeIcon,
  DeleteIcon,
} from "../icons/Icons";

export interface CustomerRecord {
  id: string;
  code: string;
  customerName: string;
  customerInitials: string;
  customerAvatarBg: string;
  customerAvatarColor: string;
  contactName: string | null;
  contactInitials?: string;
  contactAvatarBg?: string;
  contactAvatarColor?: string;
  phone: string;
  email: string;
  type: "Business Owner" | "Individual";
  orders: string;
  totalSales: string;
  outstanding: string | null;
  status: "Active" | "Inactive";
  createdAt?: string;
}

const INITIAL_CUSTOMERS: CustomerRecord[] = [
  {
    id: "1",
    code: "CUST-0008",
    customerName: "Arson Technology",
    customerInitials: "AT",
    customerAvatarBg: "#F3EEFF",
    customerAvatarColor: "#8A58FF",
    contactName: "Joseph J. Martin",
    contactInitials: "JM",
    contactAvatarBg: "#E7F2FC",
    contactAvatarColor: "#0D79E4",
    phone: "+233 54 221 8874",
    email: "abena.amponsah@gmail.com",
    type: "Business Owner",
    orders: "2 Orders",
    totalSales: "428,500 CFA",
    outstanding: "48,500 CFA",
    status: "Active",
  },
  {
    id: "2",
    code: "CUST-0008",
    customerName: "Daniel J. Martin",
    customerInitials: "DM",
    customerAvatarBg: "#FFEFE8",
    customerAvatarColor: "#FF611C",
    contactName: null,
    phone: "+233 54 221 8874",
    email: "abena.amponsah@gmail.com",
    type: "Individual",
    orders: "2 Orders",
    totalSales: "428,500 CFA",
    outstanding: "48,500 CFA",
    status: "Active",
  },
  {
    id: "3",
    code: "CUST-0008",
    customerName: "Arson Technology",
    customerInitials: "AT",
    customerAvatarBg: "#E5F4F3",
    customerAvatarColor: "#009689",
    contactName: "Joseph J. Martin",
    contactInitials: "JM",
    contactAvatarBg: "#F3EEFF",
    contactAvatarColor: "#8A58FF",
    phone: "+233 54 221 8874",
    email: "abena.amponsah@gmail.com",
    type: "Business Owner",
    orders: "2 Orders",
    totalSales: "428,500 CFA",
    outstanding: null,
    status: "Active",
  },
  {
    id: "4",
    code: "CUST-0008",
    customerName: "Arson Technology",
    customerInitials: "AT",
    customerAvatarBg: "#E5F4F3",
    customerAvatarColor: "#009689",
    contactName: "Joseph J. Martin",
    contactInitials: "JM",
    contactAvatarBg: "#FFEFE8",
    contactAvatarColor: "#FF611C",
    phone: "+233 54 221 8874",
    email: "abena.amponsah@gmail.com",
    type: "Business Owner",
    orders: "2 Orders",
    totalSales: "428,500 CFA",
    outstanding: null,
    status: "Active",
  },
  {
    id: "5",
    code: "CUST-0008",
    customerName: "Daniel J. Martin",
    customerInitials: "DM",
    customerAvatarBg: "#F3EEFF",
    customerAvatarColor: "#8A58FF",
    contactName: null,
    phone: "+233 54 221 8874",
    email: "abena.amponsah@gmail.com",
    type: "Individual",
    orders: "2 Orders",
    totalSales: "428,500 CFA",
    outstanding: null,
    status: "Inactive",
  },
  {
    id: "6",
    code: "CUST-0008",
    customerName: "Arson Technology",
    customerInitials: "AT",
    customerAvatarBg: "#E5F4F3",
    customerAvatarColor: "#009689",
    contactName: "Joseph J. Martin",
    contactInitials: "JM",
    contactAvatarBg: "#E5F4F3",
    contactAvatarColor: "#009689",
    phone: "+233 54 221 8874",
    email: "abena.amponsah@gmail.com",
    type: "Business Owner",
    orders: "2 Orders",
    totalSales: "428,500 CFA",
    outstanding: "48,500 CFA",
    status: "Active",
  },
  {
    id: "7",
    code: "CUST-0008",
    customerName: "Daniel J. Martin",
    customerInitials: "DM",
    customerAvatarBg: "#E7F2FC",
    customerAvatarColor: "#0D79E4",
    contactName: null,
    phone: "+233 54 221 8874",
    email: "abena.amponsah@gmail.com",
    type: "Individual",
    orders: "2 Orders",
    totalSales: "428,500 CFA",
    outstanding: null,
    status: "Inactive",
  },
  {
    id: "8",
    code: "CUST-0008",
    customerName: "Arson Technology",
    customerInitials: "AT",
    customerAvatarBg: "#FDF7E5",
    customerAvatarColor: "#EDAC00",
    contactName: "Joseph J. Martin",
    contactInitials: "JM",
    contactAvatarBg: "#E5F4F3",
    contactAvatarColor: "#009689",
    phone: "+233 54 221 8874",
    email: "abena.amponsah@gmail.com",
    type: "Business Owner",
    orders: "2 Orders",
    totalSales: "428,500 CFA",
    outstanding: "48,500 CFA",
    status: "Active",
  },
  {
    id: "9",
    code: "CUST-0008",
    customerName: "Arson Technology",
    customerInitials: "AT",
    customerAvatarBg: "#F3EEFF",
    customerAvatarColor: "#8A58FF",
    contactName: "Joseph J. Martin",
    contactInitials: "JM",
    contactAvatarBg: "#F3EEFF",
    contactAvatarColor: "#8A58FF",
    phone: "+233 54 221 8874",
    email: "abena.amponsah@gmail.com",
    type: "Business Owner",
    orders: "2 Orders",
    totalSales: "428,500 CFA",
    outstanding: "48,500 CFA",
    status: "Inactive",
  },
  {
    id: "10",
    code: "CUST-0008",
    customerName: "Daniel J. Martin",
    customerInitials: "DM",
    customerAvatarBg: "#FDF7E5",
    customerAvatarColor: "#EDAC00",
    contactName: null,
    phone: "+233 54 221 8874",
    email: "abena.amponsah@gmail.com",
    type: "Individual",
    orders: "2 Orders",
    totalSales: "428,500 CFA",
    outstanding: null,
    status: "Active",
  },
];

export default function CustomersTable() {
  const router = useRouter();
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS);
  const [showFilters, setShowFilters] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("2025-08-08");
  const [endDate, setEndDate] = useState("2026-08-08");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
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

  const handleRowClick = (customer: CustomerRecord) => {
    router.push(`/customers/${customer.code}`);
  };

  const filteredCustomers = customers.filter((cust) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matches =
        cust.customerName.toLowerCase().includes(q) ||
        cust.code.toLowerCase().includes(q) ||
        (cust.contactName && cust.contactName.toLowerCase().includes(q)) ||
        cust.email.toLowerCase().includes(q) ||
        cust.phone.toLowerCase().includes(q) ||
        cust.type.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (typeFilter && cust.type.toLowerCase() !== typeFilter.toLowerCase()) {
      return false;
    }

    if (statusFilter && cust.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }

    return true;
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Table Card Container */}
      <div
        className="w-full bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col"
        data-node-id="6242:7198"
      >
        {/* Table Top Header Bar */}
        <div className="min-h-[52px] px-5 py-2.5 border-b border-[#EDEDED] flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-medium text-[#575765] text-[20px]">
            Customers
          </h3>

          <div className="flex items-center gap-2">
            {/* Inline Expandable Search Input / Button */}
            {showSearch ? (
              <div className="relative flex items-center animate-in fade-in duration-150">
                <SearchIcon className="size-4 text-[#8C8C9A] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customers..."
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

            {/* Upload Button */}
            <button
              type="button"
              className="h-[34px] px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
            >
              <UploadIcon className="size-5" />
              <span className="font-medium text-[11px]">Upload</span>
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
          <div
            className="min-h-[52px] px-5 py-3 border-b border-[#EDEDED] flex flex-wrap items-center gap-3 bg-white animate-in fade-in duration-150"
            data-node-id="6736:29343"
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

            {/* Type Dropdown */}
            <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 transition-colors">
              <span className="text-[13px] text-[#575765] mr-1.5 whitespace-nowrap">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer pr-5 appearance-none font-medium"
              >
                <option value="">All</option>
                <option value="Individual">Individual</option>
                <option value="Business Owner">Business Owner</option>
              </select>
              <ChevronDownIcon className="size-3.5 text-[#575765] pointer-events-none absolute right-2" />
            </div>

            {/* Status Dropdown */}
            <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 transition-colors">
              <span className="text-[13px] text-[#575765] mr-1.5 whitespace-nowrap">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer pr-5 appearance-none font-medium"
              >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDownIcon className="size-3.5 text-[#575765] pointer-events-none absolute right-2" />
            </div>

            {/* Reset Filters button */}
            {(typeFilter || statusFilter || startDate || endDate || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setTypeFilter("");
                  setStatusFilter("");
                  setStartDate("");
                  setEndDate("");
                  setSearchQuery("");
                }}
                className="text-[12px] text-[#FF611C] hover:underline font-medium ml-1 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}

        {/* Scrollable Data Table Container */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            {/* Table Head */}
            <thead>
              <tr className="border-b border-[#EDEDED] bg-white text-[#575765] text-[11px] font-medium select-none">
                <th className="py-3 px-4 w-[220px]">Customer</th>
                <th className="py-3 px-4 w-[200px]">Contact Person</th>
                <th className="py-3 px-4 w-[160px]">Phone</th>
                <th className="py-3 px-4 w-[220px]">Email</th>
                <th className="py-3 px-4 w-[150px]">Type</th>
                <th className="py-3 px-4 w-[120px]">Orders</th>
                <th className="py-3 px-4">Total Sales</th>
                <th className="py-3 px-4">Outstanding</th>
                <th className="py-3 px-4 w-[100px]">Status</th>
                <th className="py-3 px-4 w-[60px] text-right">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-[#8C8C9A]">
                    No customers found matching the filters.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((item, idx) => {
                  const isBusiness = item.type === "Business Owner";
                  const isActive = item.status === "Active";

                  return (
                    <tr
                      key={item.id + "-" + idx}
                      onClick={() => handleRowClick(item)}
                      className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Customer Name & Initials */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="size-8 rounded-full flex items-center justify-center shrink-0 font-normal text-[11px]"
                            style={{
                              backgroundColor: item.customerAvatarBg,
                              color: item.customerAvatarColor,
                            }}
                          >
                            {item.customerInitials}
                          </div>
                          <span className="font-normal text-[#3D3D49] group-hover:text-[#FF611C] transition-colors truncate">
                            {item.customerName}
                          </span>
                        </div>
                      </td>

                      {/* Contact Person */}
                      <td className="py-4 px-4">
                        {item.contactName ? (
                          <div className="flex items-center gap-3">
                            <div
                              className="size-8 rounded-full flex items-center justify-center shrink-0 font-normal text-[11px]"
                              style={{
                                backgroundColor: item.contactAvatarBg,
                                color: item.contactAvatarColor,
                              }}
                            >
                              {item.contactInitials}
                            </div>
                            <span className="font-normal text-[#3D3D49] truncate">
                              {item.contactName}
                            </span>
                          </div>
                        ) : (
                          <span className="text-[#575765] pl-3 font-normal">-</span>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-4 font-normal text-[#3D3D49] whitespace-nowrap">
                        {item.phone}
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4 font-normal text-[#3D3D49] truncate max-w-[220px]">
                        {item.email}
                      </td>

                      {/* Type Badge */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-[6px] border text-[11px] font-normal leading-tight ${
                            isBusiness
                              ? "bg-[#E7F2FC] border-[#0D79E4] text-[#0D79E4]"
                              : "bg-[#F3EEFF] border-[#8A58FF] text-[#8A58FF]"
                          }`}
                        >
                          {item.type}
                        </div>
                      </td>

                      {/* Orders */}
                      <td className="py-4 px-4 font-normal text-[#3D3D49] whitespace-nowrap">
                        {item.orders}
                      </td>

                      {/* Total Sales */}
                      <td className="py-4 px-4 font-normal text-[#3D3D49] whitespace-nowrap">
                        {item.totalSales}
                      </td>

                      {/* Outstanding */}
                      <td className="py-4 px-4 font-normal whitespace-nowrap">
                        {item.outstanding ? (
                          <span className="text-[#F92424]">
                            {item.outstanding}
                          </span>
                        ) : (
                          <span className="text-[#575765]">-</span>
                        )}
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-[6px] border text-[11px] font-normal leading-tight ${
                            isActive
                              ? "bg-[#E5F4F3] border-[#009689] text-[#009689]"
                              : "bg-[#FEE9E9] border-[#F92424] text-[#F92424]"
                          }`}
                        >
                          {item.status}
                        </div>
                      </td>

                      {/* Actions Dropdown */}
                      <td
                        className="py-4 px-4 text-right relative"
                        onClick={(e) => e.stopPropagation()}
                      >
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
                            aria-label="Actions"
                          >
                            <MoreVerticalIcon className="size-4" />
                          </button>

                          {activeMenuId === idx && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-full mt-1 z-30 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 flex flex-col text-left animate-in fade-in zoom-in-95 duration-100"
                            >
                              <Link
                                href="/customers/new"
                                onClick={() => setActiveMenuId(null)}
                                className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <EditIcon className="size-3.5 text-[#575765]" />
                                <span>Edit</span>
                              </Link>
                              <Link
                                href={`/customers/${item.code}`}
                                onClick={() => setActiveMenuId(null)}
                                className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                              >
                                <EyeIcon className="size-3.5 text-[#575765]" />
                                <span>View</span>
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  setCustomers((prev) => prev.filter((_, i) => i !== idx));
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="w-full py-2 flex items-center justify-end gap-3 text-[11px] text-[#575765]">
        {/* Per page selector */}
        <div className="relative">
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            aria-label="Items per page"
            className="bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-neutral-50 appearance-none pr-7 text-[11px] text-[#575765] outline-none"
          >
            <option value={10}>Per page: 10</option>
            <option value={20}>Per page: 20</option>
            <option value={50}>Per page: 50</option>
          </select>
          <ChevronDownIcon className="size-3.5 text-[#575765] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Prev Page Button */}
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          className="size-7 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] flex items-center justify-center text-[#575765] cursor-pointer disabled:opacity-40"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        {/* Current Page Text */}
        <span className="font-normal text-[#575765] px-1">
          Page {currentPage}
        </span>

        {/* Next Page Button */}
        <button
          type="button"
          onClick={() => setCurrentPage((p) => p + 1)}
          className="size-7 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] flex items-center justify-center text-[#575765] cursor-pointer"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
