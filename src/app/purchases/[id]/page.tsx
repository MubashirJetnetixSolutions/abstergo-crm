"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  EditIcon,
  CheckmarkCircleIcon,
  ProductsIcon,
  OrdersIcon,
  InvoicesIcon,
  PurchasesIcon,
  PlusCircleIcon,
  DeleteIcon,
  DownloadIcon,
  EyeIcon,
  FileIcon,
  MoneyIcon,
  DeliveriesIcon,
  CalendarIcon,
  ChevronDownIcon,
  CloseIcon,
  AbstergoLogo,
} from "@/components/icons/Icons";

type PurchaseTabKey =
  | "Overview"
  | "Receiving"
  | "Payments"
  | "Invoice"
  | "Documents"
  | "Activity";

const TABS: PurchaseTabKey[] = [
  "Overview",
  "Receiving",
  "Payments",
  "Invoice",
  "Documents",
  "Activity",
];

export default function PurchaseDetailPage() {
  const params = useParams();
  const purchaseId = (params?.id as string) || "PUR-1005";
  const [activeTab, setActiveTab] = useState<PurchaseTabKey>("Overview");

  // Payment Off-Canvas Drawer State (Image Mockup 1)
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("65 000");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentDate, setPaymentDate] = useState("2026-09-07");
  const [paymentReference, setPaymentReference] = useState("ORD-1024");

  // Receive Stock Off-Canvas Drawer State (Image Mockup)
  const [isReceiveStockDrawerOpen, setIsReceiveStockDrawerOpen] = useState(false);
  const [receiveStockItems, setReceiveStockItems] = useState([
    { id: "1", name: "Dell Latitude 5440", sku: "DL-5440", qtyReceiving: 16, maxQty: 20 },
    { id: "2", name: "Dell Latitude 5440", sku: "DL-5440", qtyReceiving: 16, maxQty: 20 },
    { id: "3", name: "Dell Latitude 5440", sku: "DL-5440", qtyReceiving: 16, maxQty: 20 },
  ]);

  // More Options Dropdown State
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Shared payments state
  const [payments, setPayments] = useState([
    {
      code: "PAY-EXP-001",
      date: "12 Aug, 2026",
      method: "Bank Transfer",
      amount: "61,925 CFA",
      ref: "TXN-GH-44120",
      initials: "NE",
      name: "Nathan Elionos",
      lastUpdated: "12 Aug, 2026",
    },
    {
      code: "PAY-EXP-001",
      date: "12 Aug, 2026",
      method: "Bank Transfer",
      amount: "61,925 CFA",
      ref: "TXN-GH-44120",
      initials: "AS",
      name: "Joseph J. Martin",
      lastUpdated: "12 Aug, 2026",
    },
    {
      code: "PAY-EXP-001",
      date: "12 Aug, 2026",
      method: "Bank Transfer",
      amount: "61,925 CFA",
      ref: "TXN-GH-44120",
      initials: "NE",
      name: "Nathan Elionos",
      lastUpdated: "12 Aug, 2026",
    },
  ]);

  const handleRecordPayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!paymentAmount) return;
    const newItem = {
      code: `PAY-EXP-00${payments.length + 1}`,
      date: paymentDate || "12 Aug, 2026",
      method: paymentMethod,
      amount: `${paymentAmount} CFA`,
      ref: paymentReference || `TXN-GH-${Math.floor(10000 + Math.random() * 90000)}`,
      initials: "NE",
      name: "Nathan Elionos",
      lastUpdated: "12 Aug, 2026",
    };
    setPayments([newItem, ...payments]);
    setIsPaymentDrawerOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Purchases" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* 1. Header & Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Link
                href="/purchases"
                className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] shrink-0"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight">
                    {purchaseId}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-[6px] border border-[#EDEDED] bg-[#F5F5F5] text-[#575765] text-[11px] font-normal leading-tight">
                    Draft
                  </span>
                  <span className="px-2.5 py-0.5 rounded-[6px] border border-[#0D79E4] bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-normal leading-tight">
                    Internal
                  </span>
                </div>
                <p className="text-[14px] text-[#575765] font-normal">
                  Created on 19 Aug 2026 at 10:42 AM by{" "}
                  <span className="font-medium text-[#3D3D49]">Jean Martin</span>
                </p>
              </div>
            </div>

            {/* Action Buttons: Add Payment & Edit Purchase */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Add Payment Button (Opens Off-Canvas Drawer) */}
              <button
                type="button"
                onClick={() => setIsPaymentDrawerOpen(true)}
                className="h-11 px-4 rounded-[8px] flex items-center gap-2 text-white font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
                style={{
                  background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                <PlusCircleIcon className="size-4 text-white" />
                <span>Add Payment</span>
              </button>

              {/* Edit Purchase Button */}
              <Link
                href="/purchases/new"
                className="h-11 px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] font-medium text-[11px] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <EditIcon className="size-4 text-[#575765]" />
                <span>Edit Purchase</span>
              </Link>

              {/* More Options Dropdown */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsMoreMenuOpen((prev) => !prev)}
                  aria-label="More options"
                  className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
                >
                  <MoreVerticalIcon className="size-4" />
                </button>

                {isMoreMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-[#EDEDED] rounded-[10px] shadow-lg py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        setIsReceiveStockDrawerOpen(true);
                      }}
                      className="w-full px-3.5 py-2.5 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <PurchasesIcon className="size-4 text-[#FF611C]" />
                      <span>Receive Items</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                      }}
                      className="w-full px-3.5 py-2.5 text-left text-[12px] font-medium text-[#F92424] hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <DeleteIcon className="size-4 text-[#F92424]" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. Top Summary Info Bar */}
          <div className="w-full bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Customer</span>
              <div className="flex items-center gap-1.5 text-[#3D3D49] font-medium text-[11px]">
                <span className="truncate">Absto Technologies</span>
                <ExternalLinkIcon className="size-3.5 text-[#FF611C] shrink-0" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Purchase Date</span>
              <span className="font-normal text-[#2B2523] text-[11px]">
                19 Aug 2026
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Payment Terms</span>
              <span className="font-normal text-[#2B2523] text-[11px]">
                15 Days
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Technician</span>
              <div className="flex items-center gap-1.5 text-[#3D3D49] font-normal text-[11px]">
                <span className="truncate">Jean Martin</span>
                <ExternalLinkIcon className="size-3.5 text-[#FF611C] shrink-0" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Expected Date</span>
              <span className="font-normal text-[#2B2523] text-[11px]">
                12 Aug, 2026
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Purchase Status</span>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-[6px] border border-[#009689] bg-[#E5F4F3] text-[#009689] text-[11px] font-normal">
                  Approved
                </span>
              </div>
            </div>
          </div>

          {/* 3. Five Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">Grand Total</span>
              <span className="text-[11px] font-semibold text-[#2B2523] tracking-tight">
                49,280 CFA</span>
            </div>

            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">Paid</span>
              <span className="text-[11px] font-semibold text-[#009689] tracking-tight">
                0 CFA</span>
            </div>

            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">Balance</span>
              <span className="text-[11px] font-semibold text-[#F92424] tracking-tight">
                49,280 CFA</span>
            </div>

            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">Total Items</span>
              <span className="text-[11px] font-semibold text-[#2B2523] tracking-tight">
                12
              </span>
            </div>

            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">Received Items</span>
              <span className="text-[11px] font-semibold text-[#8A58FF] tracking-tight">
                8
              </span>
            </div>
          </div>

          {/* 4. Tabs Navigation Bar */}
          <div className="border-b border-[#EDEDED] overflow-x-auto">
            <nav className="flex items-center gap-6 min-w-max">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 text-[16px] font-medium transition-colors border-b-2 relative cursor-pointer ${isActive
                      ? "text-[#FF611C] border-[#FF611C]"
                      : "text-[#575765] border-transparent hover:text-[#3D3D49]"
                      }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 5. Active Tab Contents */}
          <div className="w-full">
            {activeTab === "Overview" && <PurchaseOverviewTab />}
            {activeTab === "Receiving" && (
              <PurchaseReceivingTab
                onOpenReceiveStock={() => setIsReceiveStockDrawerOpen(true)}
              />
            )}
            {activeTab === "Payments" && (
              <PurchasePaymentsTab
                payments={payments}
                onOpenPaymentDrawer={() => setIsPaymentDrawerOpen(true)}
              />
            )}
            {activeTab === "Invoice" && <PurchaseInvoiceTab purchaseId={purchaseId} />}
            {activeTab === "Documents" && <PurchaseDocumentsTab />}
            {activeTab === "Activity" && <PurchaseActivityTab />}
          </div>
        </main>
      </div>

      {/* =========================================================================
          OFF-CANVAS: ADD PAYMENT DRAWER (Image Mockup 1)
          ========================================================================= */}
      {isPaymentDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsPaymentDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-[480px] bg-white shadow-2xl flex flex-col justify-between border-l border-[#EDEDED] animate-in slide-in-from-right duration-200 overflow-y-auto">
              {/* Top Header */}
              <div className="p-6 border-b border-[#EDEDED] flex items-center justify-between gap-4 shrink-0">
                <h2 className="font-semibold text-[#2B2523] text-[16px] leading-tight">
                  Add Payment
                </h2>
                <button
                  type="button"
                  onClick={() => setIsPaymentDrawerOpen(false)}
                  className="size-8 hover:bg-neutral-100 text-[#575765] hover:text-[#2B2523] rounded-[6px] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>

              {/* Drawer Body Content */}
              <form onSubmit={handleRecordPayment} className="flex-1 p-6 flex flex-col gap-6">
                {/* Top 3 Metric Stat Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <span className="text-[12px] text-[#575765] font-normal">
                      Order Total
                    </span>
                    <span className="text-[13px] sm:text-[14px] font-semibold text-[#0D79E4] tracking-tight truncate">
                      6 500 000 CFA
                    </span>
                  </div>

                  <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <span className="text-[12px] text-[#575765] font-normal">
                      Paid
                    </span>
                    <span className="text-[13px] sm:text-[14px] font-semibold text-[#009689] tracking-tight truncate">
                      2 000 000 CFA
                    </span>
                  </div>

                  <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <span className="text-[12px] text-[#575765] font-normal">
                      Outstanding
                    </span>
                    <span className="text-[13px] sm:text-[14px] font-semibold text-[#F92424] tracking-tight truncate">
                      4 500 000 CFA
                    </span>
                  </div>
                </div>

                {/* Payment Details Form */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold text-[#2B2523] text-[14px]">
                    Payment Details
                  </h3>

                  {/* Amount */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-[#575765] font-normal">
                      Amount (CFA)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C]"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col pointer-events-none text-[#575765]">
                        <span className="text-[10px] leading-tight cursor-pointer">▲</span>
                        <span className="text-[10px] leading-tight cursor-pointer">▼</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-[#575765] font-normal">
                      Payment Method
                    </label>
                    <div className="relative">
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Mobile Money">Mobile Money</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Cheque">Cheque</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Payment Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-[#575765] font-normal">
                      Payment Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C] pr-10 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer cursor-pointer"
                      />
                      <CalendarIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Reference */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-[#575765] font-normal">
                      Reference
                    </label>
                    <input
                      type="text"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      className="w-full h-11 px-4 py-2.5 bg-[#F9F9FB] border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>
                </div>
              </form>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-[#EDEDED] bg-white flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPaymentDrawerOpen(false)}
                  className="flex-1 h-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#2B2523] font-medium text-[13px] transition-colors cursor-pointer shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRecordPayment}
                  className="flex-1 h-11 rounded-[8px] text-white font-medium text-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                  }}
                >
                  <CheckmarkCircleIcon className="size-4 text-white" />
                  <span>Record Payment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          OFF-CANVAS: RECEIVE STOCK DRAWER (Image Mockup 1)
          ========================================================================= */}
      {isReceiveStockDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsReceiveStockDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-[480px] bg-white shadow-2xl flex flex-col justify-between border-l border-[#EDEDED] animate-in slide-in-from-right duration-200 overflow-y-auto">
              {/* Top Header */}
              <div className="p-6 border-b border-[#EDEDED] flex items-center justify-between gap-4 shrink-0">
                <h2 className="font-semibold text-[#2B2523] text-[16px] leading-tight">
                  Receive Stock
                </h2>
                <button
                  type="button"
                  onClick={() => setIsReceiveStockDrawerOpen(false)}
                  className="size-8 hover:bg-neutral-100 text-[#575765] hover:text-[#2B2523] rounded-[6px] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>

              {/* Drawer Body Content */}
              <div className="flex-1 p-6 flex flex-col gap-6">
                {/* Top 3 Metric Stat Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <span className="text-[12px] text-[#575765] font-normal">
                      Total Items
                    </span>
                    <span className="text-[14px] font-semibold text-[#0D79E4] tracking-tight">
                      20
                    </span>
                  </div>

                  <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <span className="text-[12px] text-[#575765] font-normal">
                      Received
                    </span>
                    <span className="text-[14px] font-semibold text-[#009689] tracking-tight">
                      2
                    </span>
                  </div>

                  <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <span className="text-[12px] text-[#575765] font-normal">
                      Pending
                    </span>
                    <span className="text-[14px] font-semibold text-[#F92424] tracking-tight">
                      20
                    </span>
                  </div>
                </div>

                {/* Items Section: Payment Details (matching mockup title) */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold text-[#2B2523] text-[14px]">
                    Payment Details
                  </h3>

                  {receiveStockItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="bg-white border border-[#EDEDED] rounded-[8px] p-4 flex flex-col gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                    >
                      {/* Product Header */}
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-[6px] bg-gradient-to-br from-[#2A2A38] to-[#1A1A24] border border-[#EDEDED] flex items-center justify-center text-white shrink-0 shadow-xs">
                          <ProductsIcon className="size-5 text-[#FF611C]" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-[13px] text-[#1F1F2C] truncate">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#8C8C9A]">
                            {item.sku}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Receiving */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] text-[#575765] font-normal">
                          Quantity Receiving
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max={item.maxQty}
                            value={item.qtyReceiving}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0;
                              setReceiveStockItems((prev) =>
                                prev.map((it, idx) =>
                                  idx === index ? { ...it, qtyReceiving: val } : it
                                )
                              );
                            }}
                            className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C]"
                          />
                        </div>
                        <span className="text-[11px] text-[#575765] font-normal">
                          Max {item.maxQty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-[#EDEDED] bg-white flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsReceiveStockDrawerOpen(false)}
                  className="flex-1 h-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#2B2523] font-medium text-[13px] transition-colors cursor-pointer shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsReceiveStockDrawerOpen(false)}
                  className="flex-1 h-11 rounded-[8px] text-white font-medium text-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                  }}
                >
                  <CheckmarkCircleIcon className="size-4 text-white" />
                  <span>Receive Stock</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   TAB 1: Purchase Overview Tab
   ========================================================================= */
function PurchaseOverviewTab() {
  const lineItems = [
    { name: "Dell Latitude 5440", desc: "Dell Latitude 5440 — Core i7 / 16GB / 512GB", sku: "DL-5440", ordered: "Lenovo", received: "10 Units", pending: "5 Units", unitCost: "3,900 CFA", total: "78,000 CFA" },
    { name: "Dell Latitude 5440", desc: "Dell Latitude 5440 — Core i7 / 16GB / 512GB", sku: "DL-5440", ordered: "Lenovo", received: "10 Units", pending: "5 Units", unitCost: "3,900 CFA", total: "78,000 CFA" },
    { name: "Dell Latitude 5440", desc: "Dell Latitude 5440 — Core i7 / 16GB / 512GB", sku: "DL-5440", ordered: "Lenovo", received: "10 Units", pending: "5 Units", unitCost: "3,900 CFA", total: "78,000 CFA" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left 8 Columns */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Purchase Information */}
        <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
          <h3 className="font-medium text-[#575765] text-[20px]">Purchase Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-[11px]">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Purchase Number:</span>
              <span className="text-[#3D3D49]">PUR-1024</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Expected Delivery:</span>
              <span className="text-[#3D3D49]">12 Aug, 2026</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Invoice Number:</span>
              <span className="text-[#3D3D49]">INV-1048</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Technician:</span>
              <span className="text-[#3D3D49]">Jean Martin</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Purchase Type:</span>
              <span className="text-[#3D3D49]">Order</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Created by:</span>
              <span className="text-[#3D3D49]">Jean Martin</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Reference:</span>
              <span className="text-[#3D3D49]">ORD-1024</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Created at:</span>
              <span className="text-[#3D3D49]">19 Aug 2026, 10:42 AM</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Payment Terms:</span>
              <span className="text-[#3D3D49]">30 Days</span>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
          <h3 className="font-medium text-[#575765] text-[20px]">Line Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead>
                <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
                  <th className="py-2.5 px-3">Product</th>
                  <th className="py-2.5 px-3">SKU</th>
                  <th className="py-2.5 px-3">Ordered</th>
                  <th className="py-2.5 px-3">Received</th>
                  <th className="py-2.5 px-3">Pending</th>
                  <th className="py-2.5 px-3">Unit Cost</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
                {lineItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-[6px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center text-[#FF611C] shrink-0">
                          <ProductsIcon className="size-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium truncate">{item.name}</span>
                          <span className="text-[11px] text-[#575765]">{item.desc}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-[#575765]">{item.sku}</td>
                    <td className="py-3 px-3 text-[#575765]">{item.ordered}</td>
                    <td className="py-3 px-3 font-medium text-[#009689]">{item.received}</td>
                    <td className="py-3 px-3 font-medium text-[#FF611C]">{item.pending}</td>
                    <td className="py-3 px-3">{item.unitCost}</td>
                    <td className="py-3 px-3 font-medium text-right">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Supplier Notes */}
        <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-3">
          <h3 className="font-medium text-[#575765] text-[20px]">Supplier Notes</h3>
          <p className="text-[11px] text-[#575765] leading-relaxed">
            Please ensure all items are securely packaged before shipment. Delivery should be completed within the agreed timeframe. Kindly include the purchase invoice and delivery note with the shipment. Please ensure all 10 laptops are new, factory-sealed and include original accessories. Kindly provide serial/IMEI details with the delivery note.
          </p>
        </div>

        {/* Linked Records */}
        <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
          <h3 className="font-medium text-[#575765] text-[20px]">Linked Records</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Order */}
            <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-[6px] bg-[#FFEFE8] text-[#FF611C] flex items-center justify-center">
                  <OrdersIcon className="size-4" />
                </div>
                <span className="font-medium text-[#3D3D49] text-[11px]">Order</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-[#3D3D49] text-[11px]">ORD-1024</span>
                  <p className="text-[11px] text-[#EDAC00]">Partial</p>
                </div>
                <button className="flex items-center gap-1 text-[11px] text-[#575765] hover:text-[#FF611C] cursor-pointer">
                  <span>View Details</span>
                  <ExternalLinkIcon className="size-3" />
                </button>
              </div>
            </div>

            {/* Invoice */}
            <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-[6px] bg-[#E7F2FC] text-[#0D79E4] flex items-center justify-center">
                  <InvoicesIcon className="size-4" />
                </div>
                <span className="font-medium text-[#3D3D49] text-[11px]">Invoice</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-[#3D3D49] text-[11px]">INV-0248</span>
                </div>
                <button className="flex items-center gap-1 text-[11px] text-[#575765] hover:text-[#FF611C] cursor-pointer">
                  <span>View Details</span>
                  <ExternalLinkIcon className="size-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right 4 Columns */}
      <div className="lg:col-span-4 flex flex-col gap-6 sticky top-6">
        {/* Supplier Details */}
        <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
          <h3 className="font-medium text-[#575765] text-[20px]">Supplier Details</h3>
          <div className="flex items-center gap-3 pb-3 border-b border-[#EDEDED]">
            <div className="size-10 rounded-full bg-[#F3EEFF] text-[#8A58FF] text-[11px] font-medium flex items-center justify-center shrink-0">
              HG
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                HP Ghana Authorized Distributor
              </span>
              <span className="text-[11px] text-[#575765]">SUP-003</span>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#575765]">Contact Person:</span>
              <span className="text-[#3D3D49]">Akosua Tetteh</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#575765]">Email:</span>
              <span className="text-[#3D3D49] truncate max-w-[180px]">jason7654@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#575765]">Contact:</span>
              <span className="text-[#3D3D49]">+226 25 30 12 3...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#575765]">Address:</span>
              <span className="text-[#3D3D49] truncate max-w-[180px]">Ouagadougou, Burkina Faso</span>
            </div>
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
          <h3 className="font-medium text-[#575765] text-[20px]">Pricing Summary</h3>
          <div className="flex flex-col divide-y divide-[#EDEDED] text-[11px]">
            <div className="py-2.5 flex justify-between">
              <span className="text-[#575765]">Subtotal</span>
              <span className="font-medium text-[#3D3D49]">22,850,000 CFA</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#575765]">Discount</span>
              <span className="font-medium text-[#3D3D49]">10,000 CFA</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#575765]">Tax</span>
              <span className="font-medium text-[#3D3D49]">18%</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#575765]">Grand Total</span>
              <span className="font-semibold text-[#3D3D49]">24,850,000 CFA</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#575765]">Paid</span>
              <span className="font-semibold text-[#009689]">24,850,000 CFA</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-[#575765]">Outstanding</span>
              <span className="font-semibold text-[#F92424]">49,280 CFA</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 2: Receiving Tab
   ========================================================================= */
function PurchaseReceivingTab({
  onOpenReceiveStock,
}: {
  onOpenReceiveStock: () => void;
}) {
  const receivingItems = [
    { name: "Dell Latitude 5440", desc: "Dell Latitude 5440 — Core i7 / 16GB / 512GB", sku: "DL-5440", brand: "Lenovo", category: "Laptops", ordered: "10 Units", received: "5 Units", pending: "5 Units", status: "Received", statusBg: "bg-[#E5F4F3] border-[#009689] text-[#009689]" },
    { name: "Dell Latitude 5440", desc: "Dell Latitude 5440 — Core i7 / 16GB / 512GB", sku: "DL-5440", brand: "Lenovo", category: "Laptops", ordered: "10 Units", received: "5 Units", pending: "5 Units", status: "Partially Received", statusBg: "bg-[#FDF7E5] border-[#EDAC00] text-[#EDAC00]" },
    { name: "Dell Latitude 5440", desc: "Dell Latitude 5440 — Core i7 / 16GB / 512GB", sku: "DL-5440", brand: "Lenovo", category: "Laptops", ordered: "10 Units", received: "5 Units", pending: "5 Units", status: "Received", statusBg: "bg-[#E5F4F3] border-[#009689] text-[#009689]" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onOpenReceiveStock}
          className="px-4 py-2.5 rounded-[8px] text-white font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-2"
          style={{
            background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
          }}
        >
          <PurchasesIcon className="size-4 text-white" />
          <span>Receive Item</span>
        </button>
      </div>

      <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
        <h3 className="font-medium text-[#575765] text-[20px]">Receiving History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
                <th className="py-2.5 px-3">Product</th>
                <th className="py-2.5 px-3">SKU</th>
                <th className="py-2.5 px-3">Brand</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Ordered</th>
                <th className="py-2.5 px-3">Received</th>
                <th className="py-2.5 px-3">Pending</th>
                <th className="py-2.5 px-3">Delivery</th>
                <th className="py-2.5 px-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
              {receivingItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <div className="size-8 rounded-[6px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center text-[#FF611C] shrink-0">
                        <ProductsIcon className="size-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-medium truncate">{item.name}</span>
                        <span className="text-[11px] text-[#575765]">{item.desc}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#575765]">{item.sku}</td>
                  <td className="py-3 px-3 text-[#575765]">{item.brand}</td>
                  <td className="py-3 px-3 text-[#575765]">{item.category}</td>
                  <td className="py-3 px-3">{item.ordered}</td>
                  <td className="py-3 px-3 font-medium text-[#009689]">{item.received}</td>
                  <td className="py-3 px-3 font-medium text-[#FF611C]">{item.pending}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-0.5 rounded-[6px] border text-[11px] font-normal ${item.statusBg}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button className="text-[#575765] hover:text-[#3D3D49] cursor-pointer">
                      <MoreVerticalIcon className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 3: Payments Tab (With Add Payment Drawer Trigger)
   ========================================================================= */
function PurchasePaymentsTab({
  payments,
  onOpenPaymentDrawer,
}: {
  payments: Array<{
    code: string;
    date: string;
    method: string;
    amount: string;
    ref: string;
    initials: string;
    name: string;
    lastUpdated: string;
  }>;
  onOpenPaymentDrawer: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={onOpenPaymentDrawer}
          className="px-4 py-2.5 rounded-[8px] text-white font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-2"
          style={{
            background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
          }}
        >
          <CheckmarkCircleIcon className="size-4 text-white" />
          <span>Record Payment</span>
        </button>
      </div>

      <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
        <h3 className="font-medium text-[#575765] text-[20px]">Payment History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
                <th className="py-2.5 px-3">Payment#</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Reference</th>
                <th className="py-2.5 px-3">Received By</th>
                <th className="py-2.5 px-3">Last Updated</th>
                <th className="py-2.5 px-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
              {payments.map((p, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3 px-3 font-medium text-[#FF611C]">{p.code}</td>
                  <td className="py-3 px-3 text-[#575765]">{p.date}</td>
                  <td className="py-3 px-3 text-[#575765]">{p.method}</td>
                  <td className="py-3 px-3 font-medium">{p.amount}</td>
                  <td className="py-3 px-3 text-[#575765]">{p.ref}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-medium flex items-center justify-center">
                        {p.initials}
                      </div>
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#575765]">{p.lastUpdated}</td>
                  <td className="py-3 px-3 text-right">
                    <button className="text-[#575765] hover:text-[#3D3D49] cursor-pointer">
                      <MoreVerticalIcon className="size-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 4: Invoice Tab (Matching Image Mockup 2)
   ========================================================================= */
function PurchaseInvoiceTab({ purchaseId = "PUR-1005" }: { purchaseId?: string }) {
  const invoiceItems = [
    { name: "Dell Latitude 5440", sku: "DL-5440", items: 2, unitPrice: "CFA 5,200", discount: "CFA 12 000", tax: "8%", total: "CFA 127 000" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: 2, unitPrice: "CFA 5,200", discount: "CFA 12 000", tax: "8%", total: "CFA 127 000" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: 2, unitPrice: "CFA 5,200", discount: "CFA 12 000", tax: "8%", total: "CFA 127 000" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: 2, unitPrice: "CFA 5,200", discount: "CFA 12 000", tax: "8%", total: "CFA 127 000" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: 2, unitPrice: "CFA 5,200", discount: "CFA 12 000", tax: "8%", total: "CFA 127 000" },
    { name: "Dell Latitude 5440", sku: "DL-5440", items: 2, unitPrice: "CFA 5,200", discount: "CFA 12 000", tax: "8%", total: "CFA 127 000" },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[14px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-8 w-full">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <AbstergoLogo className="size-10" />
          <div className="flex flex-col">
            <span className="font-bold text-[16px] tracking-tight text-[#1F1F2C] leading-none">
              ABSTERGO
            </span>
            <span className="font-semibold text-[11px] tracking-widest text-[#575765] mt-0.5">
              CRM
            </span>
          </div>
        </div>

        {/* Actions / Badges */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-[6px] bg-[#E5F4F3] text-[#009689] text-xs font-semibold">
            Paid
          </span>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-[6px] bg-[#FF611C] hover:bg-[#e04f10] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition cursor-pointer"
          >
            <InvoicesIcon className="size-3.5 text-white" />
            <span>Invoice</span>
          </button>
        </div>
      </div>

      {/* Bill To & Invoice Info */}
      <div className="flex flex-wrap items-start justify-between gap-6 pt-2">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-[#8C8C9A]">Bill To</span>
          <span className="text-sm font-semibold text-[#1F1F2C] mt-1.5">
            Carolo Technologies
          </span>
          <span className="text-xs text-[#575765] mt-1">
            +49 176 12345678
          </span>
          <span className="text-xs text-[#575765]">
            carlo.tech@email.com
          </span>
        </div>

        <div className="border border-[#EDEDED] rounded-[8px] p-4 flex flex-col gap-2 min-w-[260px] text-xs bg-white">
          <div className="flex items-center justify-between gap-6">
            <span className="text-[#8C8C9A]">Invoice Number:</span>
            <span className="font-semibold text-[#1F1F2C]">INV-1005</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-[#8C8C9A]">Purchase Number:</span>
            <span className="font-semibold text-[#1F1F2C]">{purchaseId}</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-[#8C8C9A]">Sale Date:</span>
            <span className="font-semibold text-[#1F1F2C]">June 24, 2026</span>
          </div>
        </div>
      </div>

      {/* Items Section */}
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-[#1F1F2C] text-[15px]">Items</h3>
        <div className="overflow-x-auto rounded-[8px] border border-[#EDEDED]">
          <table className="w-full text-left border-collapse min-w-[850px] text-xs">
            <thead>
              <tr className="border-b border-[#EDEDED] bg-[#F8FAFD] text-[#8C8C9A] font-medium">
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Items</th>
                <th className="py-3 px-3">Unit Price</th>
                <th className="py-3 px-3">Discount</th>
                <th className="py-3 px-3">Tax</th>
                <th className="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDEDED] text-[#3D3D49]">
              {invoiceItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-[6px] bg-gradient-to-br from-[#2A2A38] to-[#1A1A24] border border-[#EDEDED] flex items-center justify-center text-white shrink-0 shadow-xs">
                        <ProductsIcon className="size-4.5 text-[#FF611C]" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-xs text-[#1F1F2C] truncate">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-[#8C8C9A]">
                          {item.sku}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#575765]">{item.sku}</td>
                  <td className="py-3 px-3 text-[#1F1F2C]">{item.items}</td>
                  <td className="py-3 px-3 text-[#1F1F2C]">{item.unitPrice}</td>
                  <td className="py-3 px-3 text-[#1F1F2C]">{item.discount}</td>
                  <td className="py-3 px-3 text-[#1F1F2C]">{item.tax}</td>
                  <td className="py-3 px-4 font-semibold text-[#1F1F2C] text-right">
                    {item.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom 3 Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Card 1: Note */}
        <div className="border border-[#EDEDED] rounded-[10px] p-4.5 bg-white flex flex-col gap-2">
          <span className="font-semibold text-xs text-[#1F1F2C]">Note</span>
          <p className="text-xs text-[#575765] leading-relaxed">
            Client requested quote for 2 units for personal use. Possible upsell to 4 units if budget allows.
          </p>
        </div>

        {/* Card 2: Terms & Conditions */}
        <div className="border border-[#EDEDED] rounded-[10px] p-4.5 bg-white flex flex-col gap-2">
          <span className="font-semibold text-xs text-[#1F1F2C]">Terms & Conditions</span>
          <p className="text-xs text-[#575765] leading-relaxed">
            Prices are valid for 30 days from quotation date. All prices are inclusive of VAT at 12%. Payment must be received before delivery.
          </p>
        </div>

        {/* Card 3: Totals Calculation */}
        <div className="border border-[#EDEDED] rounded-[10px] p-4.5 bg-white flex flex-col justify-between gap-3 text-xs">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-[#575765]">
              <span>Subtotal</span>
              <span className="font-medium text-[#1F1F2C]">CFA 6 090 000</span>
            </div>
            <div className="flex items-center justify-between text-[#575765]">
              <span>Tax</span>
              <span className="font-medium text-[#1F1F2C]">CFA 6 000</span>
            </div>
          </div>
          <div className="border-t border-[#EDEDED] pt-3 flex items-center justify-between font-bold text-sm text-[#1F1F2C]">
            <span>Total</span>
            <span>CFA 6 500 000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 5: Documents Tab (With Real File Uploader)
   ========================================================================= */
function PurchaseDocumentsTab() {
  const [documents, setDocuments] = useState([
    { id: "1", title: "Dell Latitude 5440 Datasheet.pdf", subtitle: "Image file · 2.5mb" },
    { id: "2", title: "Dell Latitude 5440 Datasheet.pdf", subtitle: "Image file · 2.5mb" },
    { id: "3", title: "Dell Latitude 5440 Datasheet.pdf", subtitle: "Image file · 2.5mb" },
    { id: "4", title: "Dell Latitude 5440 Datasheet.pdf", subtitle: "Image file · 2.5mb" },
    { id: "5", title: "Dell Latitude 5440 Datasheet.pdf", subtitle: "Image file · 2.5mb" },
    { id: "6", title: "Dell Latitude 5440 Datasheet.pdf", subtitle: "Image file · 2.5mb" },
    { id: "7", title: "Dell Latitude 5440 Datasheet.pdf", subtitle: "Image file · 2.5mb" },
    { id: "8", title: "Dell Latitude 5440 Datasheet.pdf", subtitle: "Image file · 2.5mb" },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [viewingDoc, setViewingDoc] = useState<{ id: string; title: string; subtitle: string } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newDocs = Array.from(files).map((file, idx) => ({
      id: `doc-${Date.now()}-${idx}`,
      title: file.name,
      subtitle: `${file.type.includes("pdf") ? "PDF document" : "Image file"} · ${(file.size / (1024 * 1024)).toFixed(1)}mb`,
    }));
    setDocuments((prev) => [...newDocs, ...prev]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const handleDownload = (doc: { title: string }) => {
    const element = document.createElement("a");
    const file = new Blob([`Content for ${doc.title}`], { type: "application/pdf" });
    element.href = URL.createObjectURL(file);
    element.download = doc.title;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        multiple
        className="hidden"
      />

      <div className="flex items-center justify-between">
        <h3 className="font-medium text-[#575765] text-[20px]">Documents</h3>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2.5 rounded-[8px] text-white font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-2"
          style={{
            background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
          }}
        >
          <PlusCircleIcon className="size-4 text-white" />
          <span>Upload Files</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-[#EDEDED] rounded-[10px] p-4 flex items-center justify-between gap-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:border-[#FF611C]/30 transition"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-9 rounded-[6px] bg-[#FFEFE8] text-[#FF611C] flex items-center justify-center shrink-0">
                <FileIcon className="size-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-medium text-[#3D3D49] text-[16px] truncate">
                  {doc.title}
                </span>
                <span className="text-[11px] text-[#575765]">{doc.subtitle}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleDelete(doc.id)}
                className="px-2.5 py-1 text-[11px] text-[#575765] hover:text-[#F92424] transition-colors cursor-pointer"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setViewingDoc(doc)}
                className="px-2.5 py-1 text-[11px] text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
              >
                View
              </button>
              <button
                type="button"
                onClick={() => handleDownload(doc)}
                className="px-3 py-1 text-[11px] text-white rounded-[6px] transition-opacity hover:opacity-95 cursor-pointer shadow-sm"
                style={{
                  background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[12px] border border-[#EDEDED] shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-5 border-b border-[#EDEDED]">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-[6px] bg-[#FFEFE8] text-[#FF611C] flex items-center justify-center">
                  <FileIcon className="size-4 text-[#FF611C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3D3D49] text-sm">
                    {viewingDoc.title}
                  </h3>
                  <p className="text-[11px] text-[#8C8C9A]">
                    {viewingDoc.subtitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="text-[#8C8C9A] hover:text-[#3D3D49] p-1 rounded-md transition cursor-pointer"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            <div className="p-8 text-center bg-[#F8FAFD] flex flex-col items-center justify-center min-h-[200px]">
              <FileIcon className="size-14 text-[#FF611C] mb-3 opacity-80" />
              <p className="text-sm font-semibold text-[#3D3D49]">
                {viewingDoc.title}
              </p>
              <p className="text-xs text-[#8C8C9A] mt-1">
                Document preview is ready for download
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t border-[#EDEDED] bg-white">
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="px-4 py-2 text-xs font-medium text-[#575765] hover:text-[#3D3D49] hover:bg-gray-50 rounded-[8px] border border-[#EDEDED] transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownload(viewingDoc);
                  setViewingDoc(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white rounded-[8px] transition hover:opacity-95 cursor-pointer shadow-sm"
                style={{
                  background:
                    "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   TAB 6: Activity Tab
   ========================================================================= */
function PurchaseActivityTab() {
  const activities = [
    { title: "Purchase ordered from HP Ghana — linked to Order ORD-1990", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", color: "bg-[#E7F2FC] text-[#0D79E4]", icon: PurchasesIcon },
    { title: "Partial receipt recorded — 5 units received", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", color: "bg-[#E5F4F3] text-[#009689]", icon: DeliveriesIcon },
    { title: "Payment of 20,000 CFA recorded via Bank Transfer", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", color: "bg-[#FDF7E5] text-[#EDAC00]", icon: MoneyIcon },
    { title: "Purchase ordered — status changed to Ordered", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", color: "bg-[#FFEFE8] text-[#FF611C]", icon: PurchasesIcon },
    { title: "Purchase ordered from HP Ghana — linked to Order ORD-1990", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", color: "bg-[#E7F2FC] text-[#0D79E4]", icon: PurchasesIcon },
    { title: "Partial receipt recorded — 5 units received", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", color: "bg-[#E5F4F3] text-[#009689]", icon: DeliveriesIcon },
    { title: "Payment of 20,000 CFA recorded via Bank Transfer", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", color: "bg-[#FDF7E5] text-[#EDAC00]", icon: MoneyIcon },
    { title: "Purchase ordered — status changed to Ordered", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", color: "bg-[#FFEFE8] text-[#FF611C]", icon: PurchasesIcon },
    { title: "Purchase created — linked to Order ORD-2024", author: "Jean Martin", time: "2 min ago", date: "19 Aug 2026", color: "bg-[#E7F2FC] text-[#0D79E4]", icon: PurchasesIcon },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
      <div className="flex flex-col divide-y divide-[#EDEDED]">
        {activities.map((act, idx) => {
          const IconComp = act.icon;
          return (
            <div key={idx} className="py-4 flex items-start justify-between gap-4 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3.5">
                <div className={`size-9 rounded-full flex items-center justify-center shrink-0 ${act.color}`}>
                  <IconComp className="size-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[#3D3D49] text-[11px]">{act.title}</span>
                  <span className="text-[11px] text-[#575765] font-normal">{act.author}</span>
                </div>
              </div>
              <div className="flex flex-col items-end text-right shrink-0">
                <span className="text-[11px] text-[#575765] font-normal">{act.time}</span>
                <span className="text-[11px] text-[#575765] opacity-70">{act.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
