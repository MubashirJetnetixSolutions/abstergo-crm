"use client";

import React from "react";

interface ApproveQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  quotationCode?: string;
  customerName?: string;
}

export default function ApproveQuotationModal({
  isOpen,
  onClose,
  onConfirm,
  quotationCode = "QOT-0536",
  customerName = "Kumasi Polytechnic",
}: ApproveQuotationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-150"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-[16px] shadow-2xl border border-[#EDEDED] max-w-[430px] w-full p-6 flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Top Circular Success Badge */}
        <div className="flex justify-center mb-3.5">
          <div className="size-12 rounded-full bg-[#E5F7ED] flex items-center justify-center">
            <svg
              className="size-6 text-[#22C55E]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                d="M8.5 12.5l2.5 2.5 5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[20px] font-semibold text-[#1F2937] text-center mb-2 tracking-tight">
          Approve Quotation
        </h3>

        {/* Description Text */}
        <p className="text-[13px] text-[#6B7280] text-center leading-normal mb-5">
          Mark this quotation -{" "}
          <span className="font-semibold text-[#1F2937]">
            Quote #{quotationCode}
          </span>{" "}
          as Approved.
          <br />
          You can then convert it to an order.
        </p>

        {/* Center Quote Code & Customer Highlight */}
        <div className="flex flex-col items-center justify-center mb-6">
          <span className="text-[17px] font-semibold text-[#FF611C] tracking-wide">
            {quotationCode}
          </span>
          <span className="text-[13px] text-[#4B5563] mt-0.5">
            {customerName}
          </span>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-[#EDEDED] pt-5 grid grid-cols-2 gap-3">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full h-10 rounded-[8px] border border-[#E5E7EB] bg-white hover:bg-neutral-50 text-[13px] font-medium text-[#374151] transition-colors cursor-pointer flex items-center justify-center shadow-xs"
          >
            Close
          </button>

          {/* Approve Button */}
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full h-10 rounded-[8px] bg-[#22C55E] hover:bg-[#16A34A] text-[13px] font-medium text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
          >
            <svg
              className="size-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="12" cy="12" r="9" />
              <path
                d="M8.5 12.5l2.5 2.5 5-5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Approve</span>
          </button>
        </div>
      </div>
    </div>
  );
}
