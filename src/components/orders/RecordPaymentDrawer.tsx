"use client";

import React, { useState } from "react";
import {
  CloseIcon,
  ChevronDownIcon,
  CheckmarkCircleIcon,
  CalendarIcon,
} from "../icons/Icons";

interface RecordPaymentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderCode?: string;
  orderTotal?: string;
  paidAmount?: string;
  outstandingAmount?: string;
}

export default function RecordPaymentDrawer({
  isOpen,
  onClose,
  orderCode = "ORD-1024",
  orderTotal = "6 500 000 CFA",
  paidAmount = "2 000 000 CFA",
  outstandingAmount = "4 500 000 CFA",
}: RecordPaymentDrawerProps) {
  const [amount, setAmount] = useState("65 000");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentDate, setPaymentDate] = useState("2026-09-07");
  const [reference, setReference] = useState(orderCode);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-fade-in"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-[480px] bg-white shadow-2xl flex flex-col justify-between border-l border-[#EDEDED] animate-slide-in-right overflow-y-auto">
          {/* Top Header */}
          <div className="p-6 border-b border-[#EDEDED] flex items-center justify-between gap-4 shrink-0">
            <h2 className="font-semibold text-[#2B2523] text-[16px] leading-tight">
              Add Payment
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="size-8 hover:bg-neutral-100 text-[#575765] hover:text-[#2B2523] rounded-[6px] flex items-center justify-center transition-colors cursor-pointer"
            >
              <CloseIcon className="size-4" />
            </button>
          </div>

          {/* Drawer Body Content */}
          <form onSubmit={handleSubmit} className="flex-1 p-6 flex flex-col gap-6">
            {/* Top 3 Metric Stat Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[12px] text-[#575765] font-normal">
                  Order Total
                </span>
                <span className="text-[13px] sm:text-[14px] font-semibold text-[#0D79E4] tracking-tight truncate">
                  {orderTotal}
                </span>
              </div>

              <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[12px] text-[#575765] font-normal">
                  Paid
                </span>
                <span className="text-[13px] sm:text-[14px] font-semibold text-[#009689] tracking-tight truncate">
                  {paidAmount}
                </span>
              </div>

              <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[12px] text-[#575765] font-normal">
                  Outstanding
                </span>
                <span className="text-[13px] sm:text-[14px] font-semibold text-[#F92424] tracking-tight truncate">
                  {outstandingAmount}
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
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
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
                    className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C] pr-10"
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
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full h-11 px-4 py-2.5 bg-[#F9F9FB] border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C]"
                />
              </div>
            </div>
          </form>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-[#EDEDED] bg-white flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#2B2523] font-medium text-[13px] transition-colors cursor-pointer shadow-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 h-11 rounded-[8px] text-white font-medium text-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
              }}
            >
              <CheckmarkCircleIcon className="size-4 text-white" />
              <span>Add Payment</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
