"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  EditIcon,
  OrdersIcon,
  InvoicesIcon,
} from "@/components/icons/Icons";

export default function DeliveryDetailPage() {
  const params = useParams();
  const deliveryId = (params?.id as string) || "DEL-1079";

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
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="font-semibold text-[#3D3D49] text-[24px] leading-tight">
                    #{deliveryId}
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-medium bg-[#E7F2FC] text-[#1E75FF] border border-[#C2E0FC]">
                    Pending
                  </span>
                </div>
                <p className="text-[14px] text-[#8C8C9A]">
                  Created on 19 Aug 2026 at 10:42 AM by Jean Martin
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/deliveries/new"
                className="flex items-center gap-2 rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-2.5 text-sm font-semibold text-[#3D3D49] shadow-sm transition hover:bg-gray-50"
              >
                <EditIcon className="size-4 text-[#575765]" />
                <span>Edit Delivery</span>
              </Link>

              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-[8px] border border-[#E9ECEF] bg-white text-[#575765] shadow-sm hover:bg-gray-50 transition"
              >
                <MoreVerticalIcon className="size-5" />
              </button>
            </div>
          </div>

          {/* Top Meta Summary Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 rounded-[12px] border border-[#E9ECEF] bg-white p-5 shadow-sm text-xs">
            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[16px]">Customer</p>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#3D3D49] text-sm">
                  Absto Technologies
                </span>
                <ExternalLinkIcon className="size-3.5 text-[#8C8C9A]" />
              </div>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[16px]">Delivery Date</p>
              <p className="font-semibold text-[#3D3D49] text-sm">
                2026-08-10
              </p>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[16px]">Method</p>
              <p className="font-semibold text-[#3D3D49] text-sm">Courier</p>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[16px]">Delivered By</p>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#3D3D49] text-sm">
                  Yaw Darko
                </span>
                <ExternalLinkIcon className="size-3.5 text-[#8C8C9A]" />
              </div>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[16px]">Delivery Status</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-xs font-medium bg-[#E5F4F3] text-[#0D9488]">
                Delivered
              </span>
            </div>
          </div>

          {/* 4 KPI Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-4 shadow-sm">
              <span className="text-[16px] text-[#8C8C9A] font-medium">
                Total Items
              </span>
              <p className="text-[11px] font-bold text-[#3D3D49] mt-2">3</p>
            </div>

            <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-4 shadow-sm">
              <span className="text-[16px] text-[#8C8C9A] font-medium">Delivered</span>
              <p className="text-[11px] font-bold text-emerald-600 mt-2">0</p>
            </div>

            <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-4 shadow-sm">
              <span className="text-[16px] text-[#8C8C9A] font-medium">Pending</span>
              <p className="text-[11px] font-bold text-[#3D3D49] mt-2">3</p>
            </div>

            <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-4 shadow-sm">
              <span className="text-[16px] text-[#8C8C9A] font-medium">
                Delivery Value
              </span>
              <p className="text-[11px] font-bold text-[#3D3D49] mt-2">
                152,600 CFA</p>
            </div>
          </div>

          {/* Main Grid: Left 8 cols, Right 4 cols */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Main (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Delivery Information */}
              <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm">
                <h2 className="text-[20px] font-semibold text-[#3D3D49] mb-4 pb-3 border-b border-[#E9ECEF]">
                  Delivery Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 text-xs">
                  <div className="flex justify-between sm:justify-start sm:gap-8">
                    <span className="text-[#8C8C9A] w-28">Method:</span>
                    <span className="font-semibold text-[#3D3D49]">
                      Company Delivery
                    </span>
                  </div>
                  <div className="flex justify-between sm:justify-start sm:gap-8">
                    <span className="text-[#8C8C9A] w-28">Delivered by:</span>
                    <span className="font-semibold text-[#3D3D49]">
                      Emmanuel Boateng
                    </span>
                  </div>
                  <div className="flex justify-between sm:justify-start sm:gap-8">
                    <span className="text-[#8C8C9A] w-28">Delivery Value:</span>
                    <span className="font-semibold text-[#3D3D49]">
                      43,980 CFA</span>
                  </div>
                  <div className="flex justify-between sm:justify-start sm:gap-8">
                    <span className="text-[#8C8C9A] w-28">Created at:</span>
                    <span className="font-semibold text-[#3D3D49]">
                      19 Aug 2026, 10:42 AM
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm space-y-4">
                <h2 className="text-[20px] font-semibold text-[#3D3D49]">Items</h2>
                <div className="overflow-x-auto rounded-[8px] border border-[#E9ECEF]">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#E9ECEF] bg-[#F8FAFD] text-[#8C8C9A] font-medium">
                      <tr>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-3">SKU</th>
                        <th className="py-3 px-3">Ordered</th>
                        <th className="py-3 px-3">Delivered</th>
                        <th className="py-3 px-3">Pending</th>
                        <th className="py-3 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9ECEF]">
                      <tr className="hover:bg-gray-50/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-[6px] bg-gray-100 text-xs">
                              💻
                            </div>
                            <div>
                              <p className="font-semibold text-[#3D3D49]">
                                Dell Latitude 5440 — Core i7 / 16GB / 512GB
                              </p>
                              <p className="text-[11px] text-[#8C8C9A]">
                                Intel Core i7-1365U, 16GB DDR4, 512GB NVMe SSD, 14&quot; FHD IPS
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-[#575765]">LAP-HP-840</td>
                        <td className="py-3 px-3 font-medium text-[#3D3D49]">
                          10
                        </td>
                        <td className="py-3 px-3 font-bold text-emerald-600">
                          5
                        </td>
                        <td className="py-3 px-3 font-bold text-amber-600">
                          5
                        </td>
                        <td className="py-3 px-3">
                          <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[11px] font-medium">
                            Partial
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-[6px] bg-gray-100 text-xs">
                              💻
                            </div>
                            <div>
                              <p className="font-semibold text-[#3D3D49]">
                                Dell Latitude 5440 — Core i7 / 16GB / 512GB
                              </p>
                              <p className="text-[11px] text-[#8C8C9A]">
                                Intel Core i7-1365U, 16GB DDR4, 512GB NVMe SSD, 14&quot; FHD IPS
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-[#575765]">LAP-HP-840</td>
                        <td className="py-3 px-3 font-medium text-[#3D3D49]">
                          10
                        </td>
                        <td className="py-3 px-3 font-bold text-emerald-600">
                          5
                        </td>
                        <td className="py-3 px-3 font-bold text-amber-600">
                          5
                        </td>
                        <td className="py-3 px-3">
                          <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[11px] font-medium">
                            Partial
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="flex size-8 items-center justify-center rounded-[6px] bg-gray-100 text-xs">
                              💻
                            </div>
                            <div>
                              <p className="font-semibold text-[#3D3D49]">
                                Dell Latitude 5440 — Core i7 / 16GB / 512GB
                              </p>
                              <p className="text-[11px] text-[#8C8C9A]">
                                Intel Core i7-1365U, 16GB DDR4, 512GB NVMe SSD, 14&quot; FHD IPS
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-[#575765]">LAP-HP-840</td>
                        <td className="py-3 px-3 font-medium text-[#3D3D49]">
                          10
                        </td>
                        <td className="py-3 px-3 font-bold text-emerald-600">
                          10
                        </td>
                        <td className="py-3 px-3 font-bold text-[#575765]">
                          0
                        </td>
                        <td className="py-3 px-3">
                          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[11px] font-medium">
                            Delivered
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Linked Records */}
              <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm">
                <h2 className="text-[20px] font-semibold text-[#3D3D49] mb-4">
                  Linked Records
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-[8px] border border-[#E9ECEF] p-4 flex flex-col justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-[8px] bg-orange-50 text-[#FF611C]">
                        <OrdersIcon className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#3D3D49]">
                          Order
                        </p>
                        <p className="text-sm font-semibold text-[#3D3D49]">
                          ORD-1024
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#E9ECEF]">
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        Partial
                      </span>
                      <Link
                        href="/orders/ORD-1024"
                        className="text-xs font-semibold text-[#3D3D49] hover:text-[#FF611C] flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ExternalLinkIcon className="size-3" />
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-[8px] border border-[#E9ECEF] p-4 flex flex-col justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-[8px] bg-blue-50 text-[#1E75FF]">
                        <InvoicesIcon className="size-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#3D3D49]">
                          Invoice
                        </p>
                        <p className="text-sm font-semibold text-[#3D3D49]">
                          INV-0248
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-[#E9ECEF]">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        Active
                      </span>
                      <Link
                        href="/invoices"
                        className="text-xs font-semibold text-[#3D3D49] hover:text-[#FF611C] flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ExternalLinkIcon className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Customer Details */}
              <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm space-y-4">
                <h2 className="text-[20px] font-semibold text-[#3D3D49] pb-3 border-b border-[#E9ECEF]">
                  Customer Details
                </h2>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">
                    AS
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#3D3D49]">
                      Argon Technology
                    </p>
                    <p className="text-xs text-[#8C8C9A]">Business Customer</p>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs border-t border-[#E9ECEF] pt-3">
                  <div className="flex justify-between">
                    <span className="text-[#8C8C9A]">Email:</span>
                    <span className="font-medium text-[#3D3D49]">
                      jason7654@gmail.com
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C8C9A]">Contact:</span>
                    <span className="font-medium text-[#3D3D49]">
                      +226 25 30 12 3...
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C8C9A]">Address:</span>
                    <span className="font-medium text-[#3D3D49]">
                      Ouagadougou, Burkina Fas...
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C8C9A]">Outstanding:</span>
                    <span className="font-bold text-rose-600">
                      1 250 00. CFA..
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C8C9A]">Payment Terms:</span>
                    <span className="font-medium text-[#3D3D49]">Monthly</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 rounded-[8px] border border-[#E9ECEF] bg-white py-2 text-xs font-semibold text-[#3D3D49] hover:bg-gray-50 transition"
                >
                  <ExternalLinkIcon className="size-3.5" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
