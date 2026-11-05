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

export interface OrderRecord {
  id: string;
  orderCode: string;
  orderDate: string;
  customerName: string;
  customerInitials: string;
  items: string;
  orderTotal: string;
  stockStatus: string;
  paymentStatus: { label: string; bg: string; border: string; text: string };
  deliveryStatus: { label: string; bg: string; border: string; text: string };
  technicianName: string;
  technicianInitials: string;
  status: { label: string; bg: string; border: string; text: string };
}

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: "1",
    orderCode: "ORD-1024",
    orderDate: "12 Aug, 2026",
    customerName: "Argon Technology",
    customerInitials: "AS",
    items: "14 Items",
    orderTotal: "85,000 CFA",
    stockStatus: "Out of stock",
    paymentStatus: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    deliveryStatus: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    technicianName: "Joseph J. Martin",
    technicianInitials: "AS",
    status: { label: "In-progress", bg: "bg-[#F3EEFF]", border: "border-[#8A58FF]", text: "text-[#8A58FF]" },
  },
  {
    id: "2",
    orderCode: "ORD-1024",
    orderDate: "12 Aug, 2026",
    customerName: "Argon Technology",
    customerInitials: "AS",
    items: "14 Items",
    orderTotal: "85,000 CFA",
    stockStatus: "Out of stock",
    paymentStatus: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    deliveryStatus: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    technicianName: "Joseph J. Martin",
    technicianInitials: "AS",
    status: { label: "In-progress", bg: "bg-[#F3EEFF]", border: "border-[#8A58FF]", text: "text-[#8A58FF]" },
  },
  {
    id: "3",
    orderCode: "ORD-1024",
    orderDate: "12 Aug, 2026",
    customerName: "Argon Technology",
    customerInitials: "AS",
    items: "14 Items",
    orderTotal: "85,000 CFA",
    stockStatus: "Out of stock",
    paymentStatus: { label: "Paid", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    deliveryStatus: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    technicianName: "Joseph J. Martin",
    technicianInitials: "AS",
    status: { label: "Completed", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
  },
  {
    id: "4",
    orderCode: "ORD-1024",
    orderDate: "12 Aug, 2026",
    customerName: "Argon Technology",
    customerInitials: "AS",
    items: "14 Items",
    orderTotal: "85,000 CFA",
    stockStatus: "Out of stock",
    paymentStatus: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    deliveryStatus: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    technicianName: "Joseph J. Martin",
    technicianInitials: "AS",
    status: { label: "Completed", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
  },
  {
    id: "5",
    orderCode: "ORD-1024",
    orderDate: "12 Aug, 2026",
    customerName: "Argon Technology",
    customerInitials: "AS",
    items: "14 Items",
    orderTotal: "85,000 CFA",
    stockStatus: "Out of stock",
    paymentStatus: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
    deliveryStatus: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
    technicianName: "Joseph J. Martin",
    technicianInitials: "AS",
    status: { label: "Completed", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
  },
  {
    id: "6",
    orderCode: "ORD-1024",
    orderDate: "12 Aug, 2026",
    customerName: "Argon Technology",
    customerInitials: "AS",
    items: "14 Items",
    orderTotal: "85,000 CFA",
    stockStatus: "Out of stock",
    paymentStatus: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    deliveryStatus: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    technicianName: "Joseph J. Martin",
    technicianInitials: "AS",
    status: { label: "Pending Stock", bg: "bg-[#FFEFE8]", border: "border-[#FF611C]", text: "text-[#FF611C]" },
  },
  {
    id: "7",
    orderCode: "ORD-1024",
    orderDate: "12 Aug, 2026",
    customerName: "Argon Technology",
    customerInitials: "AS",
    items: "14 Items",
    orderTotal: "85,000 CFA",
    stockStatus: "Out of stock",
    paymentStatus: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    deliveryStatus: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    technicianName: "Joseph J. Martin",
    technicianInitials: "AS",
    status: { label: "Ready to Dispatch", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
  },
  {
    id: "8",
    orderCode: "ORD-1024",
    orderDate: "12 Aug, 2026",
    customerName: "Argon Technology",
    customerInitials: "AS",
    items: "14 Items",
    orderTotal: "85,000 CFA",
    stockStatus: "Out of stock",
    paymentStatus: { label: "Paid", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    deliveryStatus: { label: "Delivered", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    technicianName: "Joseph J. Martin",
    technicianInitials: "AS",
    status: { label: "Pending Stock", bg: "bg-[#FFEFE8]", border: "border-[#FF611C]", text: "text-[#FF611C]" },
  },
  {
    id: "9",
    orderCode: "ORD-1024",
    orderDate: "12 Aug, 2026",
    customerName: "Argon Technology",
    customerInitials: "AS",
    items: "14 Items",
    orderTotal: "85,000 CFA",
    stockStatus: "Out of stock",
    paymentStatus: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    deliveryStatus: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
    technicianName: "Joseph J. Martin",
    technicianInitials: "AS",
    status: { label: "Ready to Dispatch", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
  },
];

export default function OrdersTable() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_ORDERS);
  const [showFilters, setShowFilters] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("2025-08-08");
  const [endDate, setEndDate] = useState("2026-08-08");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("");
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

  const handleRowClick = (order: OrderRecord) => {
    router.push(`/orders/${order.orderCode}`);
  };

  const filteredOrders = orders.filter((order) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matches =
        order.orderCode.toLowerCase().includes(q) ||
        order.customerName.toLowerCase().includes(q) ||
        order.technicianName.toLowerCase().includes(q) ||
        order.items.toLowerCase().includes(q) ||
        order.orderTotal.toLowerCase().includes(q) ||
        order.stockStatus.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (paymentFilter && order.paymentStatus.label.toLowerCase() !== paymentFilter.toLowerCase()) {
      return false;
    }

    if (deliveryFilter && order.deliveryStatus.label.toLowerCase() !== deliveryFilter.toLowerCase()) {
      return false;
    }

    if (statusFilter && order.status.label.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }

    return true;
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Table Card Container */}
      <div
        className="w-full bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col"
        data-node-id="6131:2560"
      >
        {/* Table Top Header Bar */}
        <div className="min-h-[52px] px-5 py-2.5 border-b border-[#EDEDED] flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-medium text-[#575765] text-[20px]">
            Orders
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
                  placeholder="Search orders..."
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
            data-node-id="6736:29424"
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

            {/* Payment Dropdown Filter */}
            <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 transition-colors">
              <span className="text-[13px] text-[#575765] mr-1.5 whitespace-nowrap">Payment:</span>
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer pr-5 appearance-none font-medium"
              >
                <option value="">All</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
              </select>
              <ChevronDownIcon className="size-3.5 text-[#575765] pointer-events-none absolute right-2" />
            </div>

            {/* Delivery Dropdown Filter */}
            <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 transition-colors">
              <span className="text-[13px] text-[#575765] mr-1.5 whitespace-nowrap">Delivery:</span>
              <select
                value={deliveryFilter}
                onChange={(e) => setDeliveryFilter(e.target.value)}
                className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer pr-5 appearance-none font-medium"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Partial">Partial</option>
                <option value="Overdue">Overdue</option>
                <option value="Delivered">Delivered</option>
              </select>
              <ChevronDownIcon className="size-3.5 text-[#575765] pointer-events-none absolute right-2" />
            </div>

            {/* Status Dropdown Filter */}
            <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 transition-colors">
              <span className="text-[13px] text-[#575765] mr-1.5 whitespace-nowrap">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer pr-5 appearance-none font-medium"
              >
                <option value="">All</option>
                <option value="In-progress">In-progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending Stock">Pending Stock</option>
                <option value="Ready to Dispatch">Ready to Dispatch</option>
              </select>
              <ChevronDownIcon className="size-3.5 text-[#575765] pointer-events-none absolute right-2" />
            </div>

            {/* Reset Filters button */}
            {(startDate || endDate || paymentFilter || deliveryFilter || statusFilter) && (
              <button
                type="button"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setPaymentFilter("");
                  setDeliveryFilter("");
                  setStatusFilter("");
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
          <table className="w-full text-left border-collapse min-w-[1250px]">
            {/* Table Head */}
            <thead>
              <tr className="border-b border-[#EDEDED] bg-white text-[#575765] text-[11px] font-medium select-none">
                <th className="py-3 px-4 w-[130px]">Order ID</th>
                <th className="py-3 px-4 w-[140px]">Order Date</th>
                <th className="py-3 px-4 w-[220px]">Customer</th>
                <th className="py-3 px-4 w-[110px]">Items</th>
                <th className="py-3 px-4 w-[130px]">Order Total</th>
                <th className="py-3 px-4 w-[130px]">Stock Status</th>
                <th className="py-3 px-4 w-[110px]">Payment</th>
                <th className="py-3 px-4 w-[110px]">Delivery</th>
                <th className="py-3 px-4 w-[180px]">Technician</th>
                <th className="py-3 px-4 w-[140px]">Status</th>
                <th className="py-3 px-4 w-[60px] text-right">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-[#8C8C9A]">
                    No orders found matching the filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((item, idx) => (
                  <tr
                    key={item.id + "-" + idx}
                    onClick={() => handleRowClick(item)}
                    className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Order ID */}
                    <td className="py-4 px-4 font-medium text-[#FF611C]">
                      {item.orderCode}
                    </td>

                    {/* Order Date */}
                    <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                      {item.orderDate}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="size-7 rounded-full bg-[#F3EEFF] text-[#8A58FF] text-[11px] font-medium flex items-center justify-center shrink-0">
                          {item.customerInitials}
                        </div>
                        <span className="font-normal text-[#3D3D49] group-hover:text-[#FF611C] transition-colors truncate">
                          {item.customerName}
                        </span>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                      {item.items}
                    </td>

                    {/* Order Total */}
                    <td className="py-4 px-4 font-normal text-[#3D3D49] whitespace-nowrap">
                      {item.orderTotal}
                    </td>

                    {/* Stock Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-[6px] border border-[#F92424] bg-[#FEE9E9] text-[#F92424] text-[11px] font-normal">
                        {item.stockStatus}
                      </span>
                    </td>

                    {/* Payment */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-[6px] border text-[11px] font-normal ${item.paymentStatus.bg} ${item.paymentStatus.border} ${item.paymentStatus.text}`}>
                        {item.paymentStatus.label}
                      </span>
                    </td>

                    {/* Delivery */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-[6px] border text-[11px] font-normal ${item.deliveryStatus.bg} ${item.deliveryStatus.border} ${item.deliveryStatus.text}`}>
                        {item.deliveryStatus.label}
                      </span>
                    </td>

                    {/* Technician */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="size-7 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-medium flex items-center justify-center shrink-0">
                          {item.technicianInitials}
                        </div>
                        <span className="font-normal text-[#3D3D49] truncate">
                          {item.technicianName}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-[6px] border text-[11px] font-normal ${item.status.bg} ${item.status.border} ${item.status.text}`}>
                        {item.status.label}
                      </span>
                    </td>

                    {/* Action Dropdown */}
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
                              href="/orders/new"
                              onClick={() => setActiveMenuId(null)}
                              className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <EditIcon className="size-3.5 text-[#575765]" />
                              <span>Edit</span>
                            </Link>
                            <Link
                              href={`/orders/${item.orderCode}`}
                              onClick={() => setActiveMenuId(null)}
                              className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <EyeIcon className="size-3.5 text-[#575765]" />
                              <span>View</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setOrders((prev) => prev.filter((_, i) => i !== idx));
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="w-full py-2 flex items-center justify-end gap-3 text-[11px] text-[#575765]">
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

        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          className="size-7 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] flex items-center justify-center text-[#575765] cursor-pointer disabled:opacity-40"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        <span className="font-normal text-[#575765] px-1">
          Page {currentPage}
        </span>

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
