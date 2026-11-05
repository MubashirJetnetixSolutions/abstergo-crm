"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import RecordPaymentDrawer from "@/components/orders/RecordPaymentDrawer";
import CreateDeliveryDrawer from "@/components/orders/CreateDeliveryDrawer";
import {
  ChevronLeftIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  DeliveriesIcon,
  QuotationsIcon,
  InvoicesIcon,
  PurchasesIcon,
  ProductsIcon,
  OrdersIcon,
  MoneyIcon,
  EditIcon,
  AbstergoLogo,
  PlusCircleIcon,
  DeleteIcon,
} from "@/components/icons/Icons";

type OrderTabKey =
  | "Overview"
  | "Items"
  | "Payments"
  | "Purchases"
  | "Deliveries"
  | "Quotation"
  | "Invoice"
  | "Activity";

const TABS: OrderTabKey[] = [
  "Overview",
  "Items",
  "Payments",
  "Purchases",
  "Deliveries",
  "Quotation",
  "Invoice",
  "Activity",
];

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = (params?.id as string) || "ORD-1024";
  const [activeTab, setActiveTab] = useState<OrderTabKey>("Overview");
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
  const [isDeliveryDrawerOpen, setIsDeliveryDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFullWidthTab = activeTab === "Quotation" || activeTab === "Invoice";

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Orders" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* 1. Header & Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Link
                href="/orders"
                className="size-10 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shadow-sm shrink-0"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="font-semibold text-[#2B2523] text-[22px] leading-tight">
                    #{orderId}
                  </h1>
                  <span className="px-2 py-0.5 rounded-[4px] border border-[#F92424]/20 bg-[#FEE9E9] text-[#F92424] text-[11px] font-medium leading-tight">
                    Overdue
                  </span>
                  <span className="px-2 py-0.5 rounded-[4px] border border-[#0D79E4]/20 bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-medium leading-tight">
                    Pending
                  </span>
                </div>
                <p className="text-[13px] text-[#575765] font-normal">
                  Created on 19 Aug 2026 at 10:42 AM by{" "}
                  <span className="font-medium text-[#2B2523]">Jean Martin</span>
                </p>
              </div>
            </div>

            {/* Action Buttons Matching Mockups */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Ready to Dispatch Button (Green) */}
              <button
                type="button"
                className="h-10 px-4 rounded-[8px] bg-[#22C55E] hover:bg-[#16A34A] text-white font-medium text-[13px] flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" />
                  <path d="M8.5 12.5l2.5 2.5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Ready to Dispatch</span>
              </button>

              {/* Edit Product Button */}
              <button
                type="button"
                className="h-10 px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#3D3D49] font-medium text-[13px] flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
              >
                <EditIcon className="size-4 text-[#575765]" />
                <span>Edit Product</span>
              </button>

              {/* More Options Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  aria-label="More options"
                  className="size-10 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer shadow-sm"
                >
                  <MoreVerticalIcon className="size-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 z-40 w-44 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 flex flex-col text-left animate-in fade-in duration-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsPaymentDrawerOpen(true);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <PlusCircleIcon className="size-4 text-[#575765]" />
                      <span>Add Payment</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsDeliveryDrawerOpen(true);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <DeliveriesIcon className="size-4 text-[#575765]" />
                      <span>Create Delivery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        if (confirm("Are you sure you want to delete this order?")) {
                          router.push("/orders");
                        }
                      }}
                      className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#F92424] hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <DeleteIcon className="size-4 text-[#F92424]" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. Top Summary Info Bar (6 columns) */}
          <div className="w-full bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] text-[#575765] font-normal">Customer</span>
              <div className="flex items-center gap-1.5 text-[#2B2523] font-medium text-[14px]">
                <span className="truncate">Absto Technologies</span>
                <ExternalLinkIcon className="size-3.5 text-[#FF611C] shrink-0" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] text-[#575765] font-normal">Order Date</span>
              <span className="font-medium text-[#2B2523] text-[14px]">
                19 Aug 2026
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] text-[#575765] font-normal">Technician</span>
              <div className="flex items-center gap-1.5 text-[#2B2523] font-medium text-[14px]">
                <span className="truncate">Jean Martin</span>
                <ExternalLinkIcon className="size-3.5 text-[#FF611C] shrink-0" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] text-[#575765] font-normal">Invoice</span>
              <div className="flex items-center gap-1.5 text-[#2B2523] font-medium text-[14px]">
                <span>INV-1048</span>
                <ExternalLinkIcon className="size-3.5 text-[#FF611C] shrink-0" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] text-[#575765] font-normal">Payment Status</span>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-[4px] border border-[#F92424]/20 bg-[#FEE9E9] text-[#F92424] text-[11px] font-medium">
                  Overdue
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] text-[#575765] font-normal">Delivery Status</span>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-[4px] border border-[#0D79E4]/20 bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-medium">
                  Pending
                </span>
              </div>
            </div>
          </div>

          {/* 3. Four Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[14px] text-[#575765] font-normal">Order Total</span>
              <span className="text-[24px] font-semibold text-[#2B2523] tracking-tight">
                6 500 000 CFA</span>
            </div>

            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[14px] text-[#575765] font-normal">Paid</span>
              <span className="text-[24px] font-semibold text-[#009689] tracking-tight">
                2 000 000 CFA</span>
            </div>

            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[14px] text-[#575765] font-normal">Outstanding</span>
              <span className="text-[24px] font-semibold text-[#F92424] tracking-tight">
                4 500 000 CFA</span>
            </div>

            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[14px] text-[#575765] font-normal">Expected Delivery</span>
              <span className="text-[24px] font-semibold text-[#2B2523] tracking-tight">
                25 Aug 2026
              </span>
            </div>
          </div>

          {/* 4. Tabs Navigation Bar */}
          <div className="border-b border-[#EDEDED] overflow-x-auto bg-white rounded-t-[12px] px-6">
            <nav className="flex items-center gap-8 min-w-max">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3.5 text-[14px] font-medium transition-colors border-b-2 relative cursor-pointer ${
                      isActive
                        ? "text-[#FF611C] border-[#FF611C]"
                        : "text-[#575765] border-transparent hover:text-[#2B2523]"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 5. Main Tab Content (Full Width for Quotation & Invoice, 2-Column Grid for Others) */}
          {isFullWidthTab ? (
            <div className="w-full">
              {activeTab === "Quotation" && <OrderQuotationTab />}
              {activeTab === "Invoice" && <OrderInvoiceTab />}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 8 Columns */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {activeTab === "Overview" && <OrderOverviewTab />}
                {activeTab === "Items" && <OrderItemsTab />}
                {activeTab === "Payments" && <OrderPaymentsTab />}
                {activeTab === "Purchases" && <OrderPurchasesTab />}
                {activeTab === "Deliveries" && <OrderDeliveriesTab />}
                {activeTab === "Activity" && <OrderActivityTab />}
              </div>

              {/* Right 4 Columns: Sticky Sidebar Cards */}
              <div className="lg:col-span-4 flex flex-col gap-6 sticky top-6">
                {/* Customer Details Card (Only shown on Overview tab as in Image 1) */}
                {activeTab === "Overview" && (
                  <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                    <h3 className="font-semibold text-[#2B2523] text-[16px]">Customer Details</h3>
                    <div className="flex items-center gap-3 pb-3 border-b border-[#EDEDED]">
                      <div className="size-10 rounded-full bg-[#F3EEFF] text-[#8A58FF] text-[13px] font-medium flex items-center justify-center shrink-0">
                        AS
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-[#2B2523] text-[14px] truncate">
                          Argon Technology
                        </span>
                        <span className="text-[12px] text-[#575765]">Business Customer</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 text-[13px]">
                      <div className="flex justify-between items-center">
                        <span className="text-[#575765]">Email:</span>
                        <span className="text-[#2B2523] truncate max-w-[200px]">jason7654@gmail.com</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#575765]">Contact:</span>
                        <span className="text-[#2B2523]">+226 25 30 12 34</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#575765]">Address:</span>
                        <span className="text-[#2B2523] truncate max-w-[200px]">Ouagadougou, Burkina Faso</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#575765]">Outstanding:</span>
                        <span className="text-[#F92424] font-semibold">1250 000 CFA</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[#575765]">Payment Terms:</span>
                        <span className="text-[#2B2523]">Monthly</span>
                      </div>
                    </div>

                    <button className="w-full py-2.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center gap-2 text-[13px] text-[#3D3D49] font-medium cursor-pointer transition-colors shadow-sm">
                      <ExternalLinkIcon className="size-3.5 text-[#575765]" />
                      <span>View Details</span>
                    </button>
                  </div>
                )}

                {/* Payment Card (Shown on Overview, Items, Payments, Purchases, Deliveries, Activity) */}
                <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                  <h3 className="font-semibold text-[#2B2523] text-[16px]">Payment</h3>
                  <div className="flex flex-col gap-2 text-[13px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[#575765]">Paid:</span>
                      <span className="text-[#009689] font-medium">2 000 000 CFA</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#575765]">Outstanding:</span>
                      <span className="text-[#F92424] font-medium">850 000 CFA</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-[#EDEDED] overflow-hidden">
                    <div className="h-full bg-[#FF611C] rounded-full w-[70%]" />
                  </div>

                  {/* Add Payment Button */}
                  <button
                    type="button"
                    onClick={() => setIsPaymentDrawerOpen(true)}
                    className="w-full py-2.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center gap-2 text-[13px] text-[#2B2523] font-medium transition-colors cursor-pointer shadow-sm"
                  >
                    <svg className="size-4 text-[#575765]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v8M8 12h8" strokeLinecap="round" />
                    </svg>
                    <span>Add Payment</span>
                  </button>
                </div>

                {/* Fulfilment Card */}
                <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#2B2523] text-[16px]">Fulfilment</h3>
                    <span className="text-[13px] text-[#2B2523] font-medium">5/10</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-[#EDEDED] overflow-hidden">
                    <div className="h-full bg-[#FF611C] rounded-full w-[50%]" />
                  </div>

                  {/* Create Delivery Button */}
                  <button
                    type="button"
                    onClick={() => setIsDeliveryDrawerOpen(true)}
                    className="w-full py-2.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center gap-2 text-[13px] text-[#2B2523] font-medium transition-colors cursor-pointer shadow-sm"
                  >
                    <svg className="size-4 text-[#575765]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v8M8 12h8" strokeLinecap="round" />
                    </svg>
                    <span>Create Delivery</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Payment Side Drawer */}
      <RecordPaymentDrawer
        isOpen={isPaymentDrawerOpen}
        onClose={() => setIsPaymentDrawerOpen(false)}
        orderCode={orderId}
        orderTotal="6 500 000 CFA"
        paidAmount="2 000 000 CFA"
        outstandingAmount="4 500 000 CFA"
      />

      {/* Create Delivery Side Drawer */}
      <CreateDeliveryDrawer
        isOpen={isDeliveryDrawerOpen}
        onClose={() => setIsDeliveryDrawerOpen(false)}
        orderCode={orderId}
        totalItems={20}
        receivedItems={2}
        pendingItems={20}
      />
    </div>
  );
}

/* =========================================================================
   TAB 1: Order Overview Tab (Mockup 1)
   ========================================================================= */
function OrderOverviewTab() {
  return (
    <div className="flex flex-col gap-6">
      {/* Order Information */}
      <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
        <h3 className="font-semibold text-[#2B2523] text-[16px]">Order Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-12 text-[13px]">
          <div className="flex items-center justify-between">
            <span className="text-[#575765]">Order Date:</span>
            <span className="text-[#2B2523] font-medium">19 Aug 2026</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#575765]">Expected Delivery:</span>
            <span className="text-[#2B2523] font-medium">25 Aug 2026</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#575765]">Customer Type:</span>
            <span className="text-[#2B2523] font-medium">Retailer</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#575765]">Created by:</span>
            <span className="text-[#2B2523] font-medium">Jean Martin</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#575765]">Technician:</span>
            <span className="text-[#2B2523] font-medium">Jean Martin</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#575765]">Created at:</span>
            <span className="text-[#2B2523] font-medium">19 Aug 2026, 10:42 AM</span>
          </div>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
        <h3 className="font-semibold text-[#2B2523] text-[16px]">Pricing Summary</h3>
        <div className="flex flex-col divide-y divide-[#EDEDED] text-[13px]">
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#575765]">Subtotal</span>
            <span className="text-[#2B2523] font-medium">6 090 000 CFA</span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#575765]">Discount</span>
            <span className="text-[#2B2523] font-medium">1000 CFA</span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#575765]">Tax</span>
            <span className="text-[#2B2523] font-medium">6 000 CFA</span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#575765]">Grand Total</span>
            <span className="text-[#2B2523] font-semibold">6 500 000 CFA</span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#575765]">Paid</span>
            <span className="text-[#009689] font-semibold">6 500 000 CFA</span>
          </div>
          <div className="py-3 flex items-center justify-between">
            <span className="text-[#575765]">Outstanding</span>
            <span className="text-[#F92424] font-semibold">6 500 000 CFA</span>
          </div>
        </div>
      </div>

      {/* Linked Records */}
      <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
        <h3 className="font-semibold text-[#2B2523] text-[16px]">Linked Records</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Quotation */}
          <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-[6px] bg-[#F3EEFF] text-[#8A58FF] flex items-center justify-center">
                <QuotationsIcon className="size-4" />
              </div>
              <span className="font-medium text-[#2B2523] text-[13px]">Quotation</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#2B2523] text-[13px]">QUO-0248</span>
                <p className="text-[12px] text-[#009689] font-medium">Approved</p>
              </div>
              <Link
                href="/quotations/QUO-0248"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#EDEDED] rounded-[6px] text-[12px] text-[#575765] hover:text-[#2B2523] hover:bg-neutral-50 transition-colors shadow-sm"
              >
                <span>View Details</span>
                <ExternalLinkIcon className="size-3 text-[#575765]" />
              </Link>
            </div>
          </div>

          {/* Invoice */}
          <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-[6px] bg-[#E7F2FC] text-[#0D79E4] flex items-center justify-center">
                <InvoicesIcon className="size-4" />
              </div>
              <span className="font-medium text-[#2B2523] text-[13px]">Invoice</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#2B2523] text-[13px]">INV-0248</span>
              </div>
              <Link
                href="/invoices"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#EDEDED] rounded-[6px] text-[12px] text-[#575765] hover:text-[#2B2523] hover:bg-neutral-50 transition-colors shadow-sm"
              >
                <span>View Details</span>
                <ExternalLinkIcon className="size-3 text-[#575765]" />
              </Link>
            </div>
          </div>

          {/* Purchase */}
          <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-[6px] bg-[#FDF7E5] text-[#EDAC00] flex items-center justify-center">
                <PurchasesIcon className="size-4" />
              </div>
              <span className="font-medium text-[#2B2523] text-[13px]">Purchase</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#2B2523] text-[13px]">PUR-0248</span>
                <p className="text-[12px] text-[#575765]">10 items · 5 delivered</p>
              </div>
              <Link
                href="/purchases"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#EDEDED] rounded-[6px] text-[12px] text-[#575765] hover:text-[#2B2523] hover:bg-neutral-50 transition-colors shadow-sm"
              >
                <span>View Details</span>
                <ExternalLinkIcon className="size-3 text-[#575765]" />
              </Link>
            </div>
          </div>

          {/* Delivery */}
          <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-[6px] bg-[#E5F4F3] text-[#009689] flex items-center justify-center">
                <DeliveriesIcon className="size-4" />
              </div>
              <span className="font-medium text-[#2B2523] text-[13px]">Delivery</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-[#2B2523] text-[13px]">DEL-0248</span>
                <p className="text-[12px] text-[#575765]">10 items · 5 delivered</p>
              </div>
              <Link
                href="/deliveries"
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#EDEDED] rounded-[6px] text-[12px] text-[#575765] hover:text-[#2B2523] hover:bg-neutral-50 transition-colors shadow-sm"
              >
                <span>View Details</span>
                <ExternalLinkIcon className="size-3 text-[#575765]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 2: Items Tab (Mockup 2)
   ========================================================================= */
function OrderItemsTab() {
  const lineItems = [
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2 Items", unitPrice: "650 000 CFA", discount: "- 20 000 CFA", total: "1 280 000 CFA", warranty: "12 Months", warrantyDate: "19 Aug 2027", status: "Delivered", statusBg: "bg-[#E5F4F3] text-[#009689]" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2 Items", unitPrice: "650 000 CFA", discount: "- 20 000 CFA", total: "1 280 000 CFA", warranty: "12 Months", warrantyDate: "19 Aug 2027", status: "Delivered", statusBg: "bg-[#E5F4F3] text-[#009689]" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2 Items", unitPrice: "650 000 CFA", discount: "- 20 000 CFA", total: "1 280 000 CFA", warranty: "12 Months", warrantyDate: "19 Aug 2027", status: "Pending", statusBg: "bg-[#E7F2FC] text-[#0D79E4]" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2 Items", unitPrice: "650 000 CFA", discount: "- 20 000 CFA", total: "1 280 000 CFA", warranty: "12 Months", warrantyDate: "19 Aug 2027", status: "Pending", statusBg: "bg-[#E7F2FC] text-[#0D79E4]" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2 Items", unitPrice: "650 000 CFA", discount: "- 20 000 CFA", total: "1 280 000 CFA", warranty: "12 Months", warrantyDate: "19 Aug 2027", status: "Pending", statusBg: "bg-[#E7F2FC] text-[#0D79E4]" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2 Items", unitPrice: "650 000 CFA", discount: "- 20 000 CFA", total: "1 280 000 CFA", warranty: "12 Months", warrantyDate: "19 Aug 2027", status: "Delivered", statusBg: "bg-[#E5F4F3] text-[#009689]" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2 Items", unitPrice: "650 000 CFA", discount: "- 20 000 CFA", total: "1 280 000 CFA", warranty: "12 Months", warrantyDate: "19 Aug 2027", status: "Delivered", statusBg: "bg-[#E5F4F3] text-[#009689]" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2 Items", unitPrice: "650 000 CFA", discount: "- 20 000 CFA", total: "1 280 000 CFA", warranty: "12 Months", warrantyDate: "19 Aug 2027", status: "Partial", statusBg: "bg-[#FDF7E5] text-[#EDAC00]" },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-semibold text-[#2B2523] text-[16px]">Line Items</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[850px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-[12px] text-[#575765] font-medium">
              <th className="py-3 px-3">Product</th>
              <th className="py-3 px-3">SKU</th>
              <th className="py-3 px-3">Items</th>
              <th className="py-3 px-3">Unit Price</th>
              <th className="py-3 px-3">Discount</th>
              <th className="py-3 px-3">Total</th>
              <th className="py-3 px-3">Warranty</th>
              <th className="py-3 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[12px] text-[#2B2523]">
            {lineItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-[6px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center shrink-0 text-[#575765]">
                      <ProductsIcon className="size-4.5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-[#2B2523] truncate">{item.name}</span>
                      <span className="text-[11px] text-[#575765]">{item.sku}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-3 text-[#575765]">{item.sku}</td>
                <td className="py-3.5 px-3 font-medium text-[#2B2523]">{item.items}</td>
                <td className="py-3.5 px-3 text-[#2B2523]">{item.unitPrice}</td>
                <td className="py-3.5 px-3 text-[#575765]">{item.discount}</td>
                <td className="py-3.5 px-3 font-medium text-[#2B2523]">{item.total}</td>
                <td className="py-3.5 px-3">
                  <div className="flex flex-col">
                    <span className="text-[#2B2523] font-medium">{item.warranty}</span>
                    <span className="text-[11px] text-[#575765]">{item.warrantyDate}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <span className={`px-2.5 py-0.5 rounded-[4px] text-[11px] font-medium ${item.statusBg}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 3: Payments Tab (Mockup 3)
   ========================================================================= */
function OrderPaymentsTab() {
  const paymentHistory = [
    { code: "PAY-00821", date: "19 Aug 2026", method: "Bank Transfer", amount: "2 000 000 CFA", ref: "BT-829102", initials: "AS", name: "Joseph J. Martin", status: "Paid", statusBg: "bg-[#E5F4F3] text-[#009689]" },
    { code: "PAY-00821", date: "19 Aug 2026", method: "Bank Transfer", amount: "2 000 000 CFA", ref: "BT-829102", initials: "AS", name: "Joseph J. Martin", status: "Paid", statusBg: "bg-[#E5F4F3] text-[#009689]" },
    { code: "PAY-00821", date: "19 Aug 2026", method: "Bank Transfer", amount: "2 000 000 CFA", ref: "BT-829102", initials: "AS", name: "Joseph J. Martin", status: "Partial", statusBg: "bg-[#FDF7E5] text-[#EDAC00]" },
    { code: "PAY-00821", date: "19 Aug 2026", method: "Bank Transfer", amount: "2 000 000 CFA", ref: "BT-829102", initials: "AS", name: "Joseph J. Martin", status: "Overdue", statusBg: "bg-[#FEE9E9] text-[#F92424]" },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-semibold text-[#2B2523] text-[16px]">Payment History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[780px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-[12px] text-[#575765] font-medium">
              <th className="py-3 px-3">Payment #</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Method</th>
              <th className="py-3 px-3">Amount</th>
              <th className="py-3 px-3">Reference</th>
              <th className="py-3 px-3">Received By</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[12px] text-[#2B2523]">
            {paymentHistory.map((pay, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C]">{pay.code}</td>
                <td className="py-3.5 px-3 text-[#2B2523]">{pay.date}</td>
                <td className="py-3.5 px-3 text-[#2B2523]">{pay.method}</td>
                <td className="py-3.5 px-3 font-medium text-[#2B2523]">{pay.amount}</td>
                <td className="py-3.5 px-3 text-[#575765]">{pay.ref}</td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-medium flex items-center justify-center">
                      {pay.initials}
                    </div>
                    <span className="text-[#2B2523]">{pay.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <span className={`px-2.5 py-0.5 rounded-[4px] text-[11px] font-medium ${pay.statusBg}`}>
                    {pay.status}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <button className="text-[#575765] hover:text-[#2B2523] cursor-pointer">
                    <MoreVerticalIcon className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 4: Purchases Tab (Mockup 4)
   ========================================================================= */
function OrderPurchasesTab() {
  const purchases = [
    { code: "PUR-119", supplier: "Dell Technologies EMEA", product: "HP ProBook 450 G10", items: "5 units", expectedArrival: "28 Aug 2026" },
    { code: "PUR-119", supplier: "Dell Technologies EMEA", product: "HP ProBook 450 G10", items: "5 units", expectedArrival: "28 Aug 2026" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {purchases.map((pur, idx) => (
        <div
          key={idx}
          className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-[#FFEFE8] text-[#FF611C] flex items-center justify-center">
                <PurchasesIcon className="size-4.5" />
              </div>
              <h4 className="font-semibold text-[#2B2523] text-[15px]">#{pur.code}</h4>
            </div>

            <Link
              href="/purchases"
              className="px-3.5 py-1.5 border border-[#EDEDED] rounded-[8px] bg-white hover:bg-neutral-50 text-[12px] text-[#2B2523] font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <ExternalLinkIcon className="size-3.5 text-[#575765]" />
              <span>View Purchase</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-[13px]">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] text-[#575765]">Supplier</span>
              <span className="font-medium text-[#2B2523]">{pur.supplier}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] text-[#575765]">Product</span>
              <span className="font-medium text-[#2B2523]">{pur.product}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] text-[#575765]">Items</span>
              <span className="font-medium text-[#2B2523]">{pur.items}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] text-[#575765]">Expected Arrival</span>
              <span className="font-medium text-[#2B2523]">{pur.expectedArrival}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================================
   TAB 5: Deliveries Tab (Mockup 5)
   ========================================================================= */
function OrderDeliveriesTab() {
  const deliveries = [
    { code: "DEL-00821", date: "19 Aug 2026", items: "5 units", initials: "AS", name: "Joseph J. Martin" },
    { code: "DEL-00821", date: "19 Aug 2026", items: "5 units", initials: "AS", name: "Joseph J. Martin" },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-semibold text-[#2B2523] text-[16px]">Fulfilment Progress</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-[12px] text-[#575765] font-medium">
              <th className="py-3 px-3">Delivery #</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Items</th>
              <th className="py-3 px-3">Signed By</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[12px] text-[#2B2523]">
            {deliveries.map((del, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C]">{del.code}</td>
                <td className="py-3.5 px-3 text-[#2B2523]">{del.date}</td>
                <td className="py-3.5 px-3 font-medium text-[#2B2523]">{del.items}</td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-[#F3EEFF] text-[#8A58FF] text-[11px] font-medium flex items-center justify-center">
                      {del.initials}
                    </div>
                    <span className="text-[#2B2523]">{del.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <button className="text-[#575765] hover:text-[#2B2523] cursor-pointer">
                    <MoreVerticalIcon className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 6: Quotation Tab (Mockup Image 1)
   ========================================================================= */
function OrderQuotationTab() {
  const quoteItems = [
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2", unitPrice: "5,200 CFA", discount: "12 000 CFA", tax: "8%", total: "127 000 CFA" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2", unitPrice: "5,200 CFA", discount: "12 000 CFA", tax: "8%", total: "127 000 CFA" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2", unitPrice: "5,200 CFA", discount: "12 000 CFA", tax: "8%", total: "127 000 CFA" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2", unitPrice: "5,200 CFA", discount: "12 000 CFA", tax: "8%", total: "127 000 CFA" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2", unitPrice: "5,200 CFA", discount: "12 000 CFA", tax: "8%", total: "127 000 CFA" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2", unitPrice: "5,200 CFA", discount: "12 000 CFA", tax: "8%", total: "127 000 CFA" },
  ];

  return (
    <div className="w-full bg-white border border-[#EDEDED] rounded-[14px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
      {/* 1. Header with Abstergo Logo and Quotation Badge */}
      <div className="flex items-center justify-between pb-6 border-b border-[#EDEDED]">
        <div className="flex items-center gap-3">
          <AbstergoLogo className="size-9" />
          <div className="flex flex-col">
            <span className="font-bold text-[#2B2523] text-[14px] tracking-wide leading-tight">ABSTERGO</span>
            <span className="text-[12px] font-bold text-[#FF611C] tracking-widest leading-tight">CRM</span>
          </div>
        </div>

        <button className="h-9 px-3.5 rounded-[6px] bg-[#FF611C] hover:bg-[#e05314] text-white text-[12px] font-medium flex items-center gap-2 shadow-sm transition-colors cursor-pointer">
          <QuotationsIcon className="size-4 text-white" />
          <span>Quotation</span>
        </button>
      </div>

      {/* 2. Bill To & Metadata */}
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex flex-col gap-1 text-[13px]">
          <span className="font-semibold text-[#2B2523] text-[14px]">Bill To</span>
          <span className="text-[#575765]">Carolo Technologies</span>
          <span className="text-[#575765]">+49 176 12345678</span>
          <span className="text-[#575765]">carlo.tech@email.com</span>
        </div>

        <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-2 min-w-[280px] bg-white text-[13px]">
          <div className="flex items-center justify-between gap-6">
            <span className="text-[#575765]">Quote Number:</span>
            <span className="font-medium text-[#2B2523]">QOT-0320</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-[#575765]">Order Number:</span>
            <span className="font-medium text-[#2B2523]">ORD-0320</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-[#575765]">Sale Date:</span>
            <span className="font-medium text-[#2B2523]">June 24, 2026</span>
          </div>
        </div>
      </div>

      {/* 3. Items Section */}
      <div className="flex flex-col gap-3">
        <h4 className="font-semibold text-[#2B2523] text-[16px]">Items</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#EDEDED] text-[12px] text-[#575765] font-medium">
                <th className="py-2.5 px-3">Product</th>
                <th className="py-2.5 px-3">SKU</th>
                <th className="py-2.5 px-3">Items</th>
                <th className="py-2.5 px-3">Unit Price</th>
                <th className="py-2.5 px-3">Discount</th>
                <th className="py-2.5 px-3">Tax</th>
                <th className="py-2.5 px-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDEDED] text-[12px] text-[#2B2523]">
              {quoteItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-[6px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center shrink-0 text-[#575765]">
                        <ProductsIcon className="size-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-[#2B2523] truncate">{item.name}</span>
                        <span className="text-[11px] text-[#575765]">{item.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#575765]">{item.sku}</td>
                  <td className="py-3 px-3 font-medium text-[#2B2523]">{item.items}</td>
                  <td className="py-3 px-3 text-[#2B2523]">{item.unitPrice}</td>
                  <td className="py-3 px-3 text-[#575765]">{item.discount}</td>
                  <td className="py-3 px-3 text-[#575765]">{item.tax}</td>
                  <td className="py-3 px-3 font-medium text-right text-[#2B2523]">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Bottom Grid: Comments + Notes + Pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-[#EDEDED]">
        {/* Left Side (Col-span-8): Managing Director's Comments and 2 side-by-side cards */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Managing Director's Comments */}
          <div className="border border-[#EDEDED] rounded-[10px] p-5 flex flex-col gap-2.5 bg-white">
            <span className="font-semibold text-[#2B2523] text-[13px]">
              Managing Director&apos;s Comments:
            </span>
            <div className="text-[#575765] text-[12px] leading-relaxed flex flex-col gap-3">
              <p>
                Supply and preparation of a 12-month product warranty document, including customer and product information, warranty coverage, exclusions, warranty conditions, covered-failure procedures, customer rights, and company/customer signature sections.
              </p>
              <p>
                12-Month Product Warranty Document – Design, preparation, and printing of a customized product warranty certificate.
              </p>
            </div>
          </div>

          {/* Side by side Note and Terms & Conditions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-2 bg-white">
              <span className="font-semibold text-[#2B2523] text-[13px]">Note</span>
              <p className="text-[#575765] text-[12px] leading-relaxed">
                Client requested quote for 2 units for personal use. Possible upsell to 4 units if budget allows.
              </p>
            </div>

            <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-2 bg-white">
              <span className="font-semibold text-[#2B2523] text-[13px]">
                Terms & Conditions
              </span>
              <p className="text-[#575765] text-[12px] leading-relaxed">
                Prices are valid for 30 days from quotation date. All prices are inclusive of VAT at 12%. Payment must be received before delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side (Col-span-4): Totals Box */}
        <div className="lg:col-span-4">
          <div className="border border-[#EDEDED] rounded-[10px] p-5 flex flex-col justify-between gap-4 bg-white">
            <div className="flex flex-col gap-2.5 text-[13px]">
              <div className="flex justify-between items-center">
                <span className="text-[#575765]">Subtotal</span>
                <span className="font-medium text-[#2B2523]">6 090 000 CFA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#575765]">Discount</span>
                <span className="font-medium text-[#2B2523]">1000 CFA</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#575765]">Tax</span>
                <span className="font-medium text-[#2B2523]">6 000 CFA</span>
              </div>
            </div>
            <div className="flex justify-between pt-3 border-t border-[#EDEDED] items-center">
              <span className="font-semibold text-[#2B2523] text-[15px]">Total</span>
              <span className="font-semibold text-[#2B2523] text-[15px]">6 500 000 CFA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 7: Invoice Tab (Mockup Image 2)
   ========================================================================= */
function OrderInvoiceTab() {
  const invoiceItems = [
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2", unitPrice: "5,200 CFA", discount: "12 000 CFA", tax: "8%", total: "127 000 CFA" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2", unitPrice: "5,200 CFA", discount: "12 000 CFA", tax: "8%", total: "127 000 CFA" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2", unitPrice: "5,200 CFA", discount: "12 000 CFA", tax: "8%", total: "127 000 CFA" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2", unitPrice: "5,200 CFA", discount: "12 000 CFA", tax: "8%", total: "127 000 CFA" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2", unitPrice: "5,200 CFA", discount: "12 000 CFA", tax: "8%", total: "127 000 CFA" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: "2", unitPrice: "5,200 CFA", discount: "12 000 CFA", tax: "8%", total: "127 000 CFA" },
  ];

  return (
    <div className="w-full bg-white border border-[#EDEDED] rounded-[14px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
      {/* 1. Header with Abstergo Logo and Paid Badge + Invoice Badge */}
      <div className="flex items-center justify-between pb-6 border-b border-[#EDEDED]">
        <div className="flex items-center gap-3">
          <AbstergoLogo className="size-9" />
          <div className="flex flex-col">
            <span className="font-bold text-[#2B2523] text-[14px] tracking-wide leading-tight">ABSTERGO</span>
            <span className="text-[12px] font-bold text-[#FF611C] tracking-widest leading-tight">CRM</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="px-2.5 py-1 rounded-[6px] border border-[#009689]/20 bg-[#E5F4F3] text-[#009689] text-[12px] font-medium">
            Paid
          </span>
          <button className="h-9 px-3.5 rounded-[6px] bg-[#FF611C] hover:bg-[#e05314] text-white text-[12px] font-medium flex items-center gap-2 shadow-sm transition-colors cursor-pointer">
            <InvoicesIcon className="size-4 text-white" />
            <span>Invoice</span>
          </button>
        </div>
      </div>

      {/* 2. Bill To & Metadata */}
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="flex flex-col gap-1 text-[13px]">
          <span className="font-semibold text-[#2B2523] text-[14px]">Bill To</span>
          <span className="text-[#575765]">Carolo Technologies</span>
          <span className="text-[#575765]">+49 176 12345678</span>
          <span className="text-[#575765]">carlo.tech@email.com</span>
        </div>

        <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-2 min-w-[280px] bg-white text-[13px]">
          <div className="flex items-center justify-between gap-6">
            <span className="text-[#575765]">Quote Number:</span>
            <span className="font-medium text-[#2B2523]">QOT-0320</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-[#575765]">Order Number:</span>
            <span className="font-medium text-[#2B2523]">ORD-0320</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-[#575765]">Sale Date:</span>
            <span className="font-medium text-[#2B2523]">June 24, 2026</span>
          </div>
        </div>
      </div>

      {/* 3. Items Section */}
      <div className="flex flex-col gap-3">
        <h4 className="font-semibold text-[#2B2523] text-[16px]">Items</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#EDEDED] text-[12px] text-[#575765] font-medium">
                <th className="py-2.5 px-3">Product</th>
                <th className="py-2.5 px-3">SKU</th>
                <th className="py-2.5 px-3">Items</th>
                <th className="py-2.5 px-3">Unit Price</th>
                <th className="py-2.5 px-3">Discount</th>
                <th className="py-2.5 px-3">Tax</th>
                <th className="py-2.5 px-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDEDED] text-[12px] text-[#2B2523]">
              {invoiceItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-[6px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center shrink-0 text-[#575765]">
                        <ProductsIcon className="size-4.5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium text-[#2B2523] truncate">{item.name}</span>
                        <span className="text-[11px] text-[#575765]">{item.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#575765]">{item.sku}</td>
                  <td className="py-3 px-3 font-medium text-[#2B2523]">{item.items}</td>
                  <td className="py-3 px-3 text-[#2B2523]">{item.unitPrice}</td>
                  <td className="py-3 px-3 text-[#575765]">{item.discount}</td>
                  <td className="py-3 px-3 text-[#575765]">{item.tax}</td>
                  <td className="py-3 px-3 font-medium text-right text-[#2B2523]">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Bottom Grid: 3-column layout (Note, Terms & Conditions, Totals) as in Image 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#EDEDED]">
        {/* Note */}
        <div className="border border-[#EDEDED] rounded-[10px] p-5 flex flex-col gap-2 bg-white">
          <span className="font-semibold text-[#2B2523] text-[13px]">Note</span>
          <p className="text-[#575765] text-[12px] leading-relaxed">
            Client requested quote for 2 units for personal use. Possible upsell to 4 units if budget allows.
          </p>
        </div>

        {/* Terms & Conditions */}
        <div className="border border-[#EDEDED] rounded-[10px] p-5 flex flex-col gap-2 bg-white">
          <span className="font-semibold text-[#2B2523] text-[13px]">
            Terms & Conditions
          </span>
          <p className="text-[#575765] text-[12px] leading-relaxed">
            Prices are valid for 30 days from quotation date. All prices are inclusive of VAT at 12%. Payment must be received before delivery.
          </p>
        </div>

        {/* Totals */}
        <div className="border border-[#EDEDED] rounded-[10px] p-5 flex flex-col justify-between gap-4 bg-white">
          <div className="flex flex-col gap-2.5 text-[13px]">
            <div className="flex justify-between items-center">
              <span className="text-[#575765]">Subtotal</span>
              <span className="font-medium text-[#2B2523]">6 090 000 CFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#575765]">Discount</span>
              <span className="font-medium text-[#2B2523]">1000 CFA</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#575765]">Tax</span>
              <span className="font-medium text-[#2B2523]">6 000 CFA</span>
            </div>
          </div>
          <div className="flex justify-between pt-3 border-t border-[#EDEDED] items-center">
            <span className="font-semibold text-[#2B2523] text-[15px]">Total</span>
            <span className="font-semibold text-[#2B2523] text-[15px]">6 500 000 CFA</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 8: Activity Tab (Mockup Image 3)
   ========================================================================= */
function OrderActivityTab() {
  const activities = [
    { title: "Order created", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", badgeColor: "bg-[#E7F2FC] text-[#0D79E4]", icon: OrdersIcon },
    { title: "Quotation QUO-0248 converted to Order", author: "System", time: "2 min ago", date: "19 Aug 2026", badgeColor: "bg-[#FFEFE8] text-[#FF611C]", icon: QuotationsIcon },
    { title: "5 units allocated from stock", author: "Warehouse", time: "2 min ago", date: "19 Aug 2026", badgeColor: "bg-[#F3EEFF] text-[#8A58FF]", icon: ProductsIcon },
    { title: "Purchase PUR-118 created for remaining 5 units", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", badgeColor: "bg-[#E5F4F3] text-[#009689]", icon: PurchasesIcon },
    { title: "Delivery DEL-082 created — 5 / 10 units", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", badgeColor: "bg-[#E7F2FC] text-[#0D79E4]", icon: DeliveriesIcon },
    { title: "Payment of 2,000,000 CFA recorded (Bank Transfer)", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", badgeColor: "bg-[#E7F2FC] text-[#0D79E4]", icon: MoneyIcon },
    { title: "Order created", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", badgeColor: "bg-[#E7F2FC] text-[#0D79E4]", icon: OrdersIcon },
    { title: "Quotation QUO-0248 converted to Order", author: "System", time: "2 min ago", date: "19 Aug 2026", badgeColor: "bg-[#FFEFE8] text-[#FF611C]", icon: QuotationsIcon },
    { title: "5 units allocated from stock", author: "Warehouse", time: "2 min ago", date: "19 Aug 2026", badgeColor: "bg-[#F3EEFF] text-[#8A58FF]", icon: ProductsIcon },
    { title: "Purchase PUR-118 created for remaining 5 units", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", badgeColor: "bg-[#E5F4F3] text-[#009689]", icon: PurchasesIcon },
    { title: "Delivery DEL-082 created — 5 / 10 units", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", badgeColor: "bg-[#E7F2FC] text-[#0D79E4]", icon: DeliveriesIcon },
    { title: "Payment of 2,000,000 CFA recorded (Bank Transfer)", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", badgeColor: "bg-[#E7F2FC] text-[#0D79E4]", icon: MoneyIcon },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="flex flex-col divide-y divide-[#EDEDED]">
        {activities.map((act, idx) => {
          const IconComp = act.icon;
          return (
            <div key={idx} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3.5">
                <div className={`size-10 rounded-full flex items-center justify-center shrink-0 ${act.badgeColor}`}>
                  <IconComp className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[#2B2523] text-[14px]">{act.title}</span>
                  <span className="text-[12px] text-[#575765] font-normal">{act.author}</span>
                </div>
              </div>
              <div className="flex flex-col items-end text-right shrink-0 text-[12px] text-[#575765]">
                <span>{act.time}</span>
                <span>{act.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
