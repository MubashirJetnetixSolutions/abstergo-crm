"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
} from "@/components/icons/Icons";

interface OrderItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  ordered: number;
  pending: number;
  deliverQty: number;
}

export default function CreateDeliveryPage() {
  const router = useRouter();

  // Form states
  const [customer, setCustomer] = useState("ABC Technologies Ltd");
  const [customerInitials] = useState("AB");
  const [selectedOrder, setSelectedOrder] = useState("ORD-2024");
  const [deliveryDate, setDeliveryDate] = useState("2026-09-09");
  const [deliveredBy, setDeliveredBy] = useState("Yaw Darko");
  const [deliveredByInitials] = useState("YD");
  const [deliveryAddress, setDeliveryAddress] = useState(
    "14 Ring Road Central, Accra"
  );

  const [items, setItems] = useState<OrderItem[]>([
    {
      id: "1",
      name: "Dell Latitude 5440",
      category: "Laptops",
      sku: "LN-E14",
      ordered: 20,
      pending: 15,
      deliverQty: 15,
    },
    {
      id: "2",
      name: "Dell Latitude 5440",
      category: "Laptops",
      sku: "LN-E14",
      ordered: 20,
      pending: 15,
      deliverQty: 15,
    },
  ]);

  const handleQtyChange = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            deliverQty: Math.max(
              1,
              Math.min(item.pending, item.deliverQty + delta)
            ),
          }
          : item
      )
    );
  };

  const totalQty = items.reduce((sum, item) => sum + item.deliverQty, 0);

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Deliveries" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/deliveries"
                className="flex size-11 items-center justify-center rounded-[8px] border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
              >
                <ChevronLeftIcon className="size-5" />
              </Link>
              <div className="flex flex-col gap-0.5">
                <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight tracking-tight">
                  Create Delivery
                </h1>
                <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                  Create a new delivery for your order
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/deliveries")}
                className="px-5 py-2.5 rounded-[8px] border border-gray-200 bg-white text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => router.push("/deliveries")}
                className="px-6 py-2.5 rounded-[8px] text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                style={{
                  background:
                    "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Create Delivery
              </button>
            </div>
          </div>

          {/* Main Grid: Left 8 cols, Right 4 cols */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Customer Details */}
              <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-[#3D3D49] mb-4">
                  Customer Details
                </h2>
                <div>
                  <label className="block text-xs font-semibold text-[#8C8C9A] uppercase tracking-wider mb-2">
                    Select Customer
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-3 text-left text-sm text-[#3D3D49] shadow-sm transition hover:bg-gray-50/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-7 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700">
                          {customerInitials}
                        </div>
                        <span className="font-medium text-[#3D3D49]">
                          {customer}
                        </span>
                      </div>
                      <ChevronDownIcon className="size-4 text-[#8C8C9A]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-[#3D3D49] mb-4">
                  Order Details
                </h2>
                <div>
                  <label className="block text-xs font-semibold text-[#8C8C9A] uppercase tracking-wider mb-2">
                    Select Order
                  </label>
                  <div className="relative">
                    <select
                      value={selectedOrder}
                      onChange={(e) => setSelectedOrder(e.target.value)}
                      className="w-full appearance-none rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-3 text-sm font-medium text-[#3D3D49] shadow-sm focus:border-gray-900 focus:outline-none"
                    >
                      <option value="ORD-2024">ORD-2024</option>
                      <option value="ORD-2025">ORD-2025</option>
                      <option value="ORD-2026">ORD-2026</option>
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-[#8C8C9A]" />
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-[#3D3D49] mb-5">
                  Delivery Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#8C8C9A] uppercase tracking-wider mb-2">
                        Delivery Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-3 text-sm font-medium text-[#3D3D49] shadow-sm focus:border-gray-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#8C8C9A] uppercase tracking-wider mb-2">
                        Delivered By
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-3 text-left text-sm text-[#3D3D49] shadow-sm transition hover:bg-gray-50/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex size-7 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">
                              {deliveredByInitials}
                            </div>
                            <span className="font-medium text-[#3D3D49]">
                              {deliveredBy}
                            </span>
                          </div>
                          <ChevronDownIcon className="size-4 text-[#8C8C9A]" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#8C8C9A] uppercase tracking-wider mb-2">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-3 text-sm font-medium text-[#3D3D49] shadow-sm focus:border-gray-900 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm space-y-4">
                <h2 className="text-base font-semibold text-[#3D3D49]">
                  Order Items
                </h2>
                <div className="overflow-x-auto rounded-[8px] border border-[#E9ECEF]">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#E9ECEF] bg-[#F8FAFD] text-[#8C8C9A] font-medium">
                      <tr>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-3">SKU</th>
                        <th className="py-3 px-3">Ordered</th>
                        <th className="py-3 px-3">Pending</th>
                        <th className="py-3 px-3">Deliver Qty</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9ECEF]">
                      {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="flex size-8 items-center justify-center rounded-[6px] bg-gray-100 text-xs">
                                💻
                              </div>
                              <div>
                                <p className="font-semibold text-[#3D3D49]">
                                  {item.name}
                                </p>
                                <p className="text-[11px] text-[#8C8C9A]">
                                  {item.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-medium text-[#575765]">
                            {item.sku}
                          </td>
                          <td className="py-3 px-3 font-semibold text-[#3D3D49]">
                            {item.ordered}
                          </td>
                          <td className="py-3 px-3 font-bold text-amber-600">
                            {item.pending}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2 rounded-[6px] border border-[#E9ECEF] bg-white px-2 py-1 w-fit shadow-sm">
                              <span className="font-bold text-[#3D3D49] w-4 text-center">
                                {item.deliverQty}
                              </span>
                              <div className="flex flex-col">
                                <button
                                  type="button"
                                  onClick={() => handleQtyChange(item.id, 1)}
                                  className="text-[9px] text-[#8C8C9A] hover:text-[#3D3D49]"
                                >
                                  ▲
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleQtyChange(item.id, -1)}
                                  className="text-[9px] text-[#8C8C9A] hover:text-[#3D3D49]"
                                >
                                  ▼
                                </button>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-6 rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm space-y-5">
                <h2 className="text-base font-semibold text-[#3D3D49] pb-3 border-b border-[#E9ECEF]">
                  Delivery Summary
                </h2>

                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                    DEL
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#3D3D49]">
                      DEL-1092
                    </p>
                    <p className="text-xs text-[#8C8C9A]">
                      ABC Technologies Ltd
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs border-t border-[#E9ECEF] pt-4">
                  <div className="flex justify-between">
                    <span className="text-[#8C8C9A]">Order:</span>
                    <span className="font-semibold text-[#3D3D49]">
                      ORD-2024
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C8C9A]">Date:</span>
                    <span className="font-semibold text-[#3D3D49]">
                      {deliveryDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C8C9A]">Items:</span>
                    <span className="font-semibold text-[#3D3D49]">
                      2 Products
                    </span>
                  </div>
                </div>

                <div className="flex justify-between border-t border-[#E9ECEF] pt-4 text-xs font-bold text-[#3D3D49]">
                  <span>Total Qty</span>
                  <span className="text-sm">{totalQty} Items</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
