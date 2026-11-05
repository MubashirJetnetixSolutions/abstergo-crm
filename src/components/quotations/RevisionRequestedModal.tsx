"use client";

import React, { useState } from "react";
import { CloseIcon } from "../icons/Icons";

interface RevisionRequestedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: (reason: string) => void;
  quotationCode?: string;
  customerName?: string;
  initialReason?: string;
}

export default function RevisionRequestedModal({
  isOpen,
  onClose,
  onConfirm,
  quotationCode = "QOT-0320",
  customerName = "Kumasi Polytechnic",
  initialReason = "Monthly office stationery and printer",
}: RevisionRequestedModalProps) {
  const [reason, setReason] = useState(initialReason);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onConfirm) {
      onConfirm(reason);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-150"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-[16px] shadow-2xl border border-[#EDEDED] max-w-[440px] w-full p-6 flex flex-col gap-4 z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header with Title & Close Icon */}
        <div className="flex items-center justify-between">
          <h3 className="text-[#2D2D38] font-semibold text-[16px] leading-tight">
            Revision Requested
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-[#9CA3AF] hover:text-[#4B5563] p-1 rounded-[6px] hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>

        {/* Quotation Info Box */}
        <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-[10px] p-3.5 flex flex-col gap-1">
          <span className="font-semibold text-[#1F2937] text-[15px]">
            {quotationCode}
          </span>
          <span className="text-[12px] text-[#6B7280]">
            {customerName}
          </span>
        </div>

        {/* Reason Field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-[#4B5563]">
            Reason
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for revision..."
            className="w-full p-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#1F2937] font-normal focus:outline-none focus:border-[#DC2626] transition-colors resize-none leading-relaxed"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-3 pt-2">
          {/* Cancel */}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[13px] font-medium text-[#3D3D49] transition-colors cursor-pointer flex items-center justify-center"
          >
            Cancel
          </button>

          {/* Request Revision */}
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 h-11 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-[8px] text-[13px] font-medium flex items-center justify-center transition-colors cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
          >
            Request Revision
          </button>
        </div>
      </div>
    </div>
  );
}
