"use client";

import React from "react";
import { OrdersIcon, CheckCircleIcon } from "../icons/Icons";

interface ConvertToOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  quotationCode?: string;
  customerName?: string;
}

export default function ConvertToOrderModal({
  isOpen,
  onClose,
  onConfirm,
  quotationCode = "QOT-0536",
  customerName = "Kumasi Polytechnic",
}: ConvertToOrderModalProps) {
  if (!isOpen) return null;

  const handleConvert = () => {
    if (onConfirm) {
      onConfirm();
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

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-[16px] shadow-2xl border border-[#EDEDED] max-w-[430px] w-full px-7 py-8 flex flex-col items-center text-center z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Top Order Icon Circular Badge */}
        <div className="size-12 rounded-full bg-[#FFEFE8] flex items-center justify-center text-[#FF611C] mb-4">
          <OrdersIcon className="size-6 text-[#FF611C]" />
        </div>

        {/* Title */}
        <h3 className="text-[#3D3D49] font-medium text-[20px] mb-2 leading-tight">
          Convert to Order?
        </h3>

        {/* Subtitle / Description */}
        <p className="text-[13px] text-[#575765] leading-relaxed mb-5 max-w-[330px]">
          This quotation will be converted into a confirmed order for{" "}
          <strong className="font-semibold text-[#3D3D49]">
            {customerName}
          </strong>
          . The quotation status will be updated to Converted.
        </p>

        {/* Quotation Info (QOT-0536 & Kumasi Polytechnic) */}
        <div className="flex flex-col items-center gap-0.5 mb-7">
          <span className="text-[#FF611C] font-semibold text-[18px]">
            {quotationCode}
          </span>
          <span className="text-[13px] text-[#575765] font-normal">
            {customerName}
          </span>
        </div>

        {/* Action Buttons Row */}
        <div className="w-full flex items-center gap-3">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[13px] font-medium text-[#3D3D49] transition-colors cursor-pointer flex items-center justify-center"
          >
            Close
          </button>

          {/* Convert Button */}
          <button
            type="button"
            onClick={handleConvert}
            className="flex-1 h-11 bg-[#2E2E38] hover:bg-[#1E1E24] text-white rounded-[8px] text-[13px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
          >
            <CheckCircleIcon className="size-4 text-white" />
            <span>Convert</span>
          </button>
        </div>
      </div>
    </div>
  );
}
