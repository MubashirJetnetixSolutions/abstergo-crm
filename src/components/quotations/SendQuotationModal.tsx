"use client";

import React, { useState, useEffect } from "react";
import { CloseIcon, SentIcon } from "../icons/Icons";

interface SendQuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotationCode?: string;
  customerName?: string;
}

export default function SendQuotationModal({
  isOpen,
  onClose,
  quotationCode = "QOT-0265",
  customerName = "Kumasi Polytechnic",
}: SendQuotationModalProps) {
  const [to, setTo] = useState("ict@kpoly.edu.gh");
  const [subject, setSubject] = useState(
    `Quotation ${quotationCode} — Abstergo Technology`
  );
  const [message, setMessage] = useState(
    `Dear Prof. Yaw Boafo,\n\nPlease find attached quotation ${quotationCode} for your review.\n\nThis quotation is valid until 2026-09-25.\n\nKind regards,\nAma Owusu`
  );

  useEffect(() => {
    setSubject(`Quotation ${quotationCode} — Abstergo Technology`);
    setMessage(
      `Dear Prof. Yaw Boafo,\n\nPlease find attached quotation ${quotationCode} for your review.\n\nThis quotation is valid until 2026-09-25.\n\nKind regards,\nAma Owusu`
    );
  }, [quotationCode]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-fade-in"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative bg-white rounded-[16px] shadow-2xl border border-[#EDEDED] max-w-[460px] w-full overflow-hidden flex flex-col z-10 animate-scale-up"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
          <h3 className="text-[#2D2D38] font-semibold text-[16px] leading-tight">
            Send Quotation
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

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 pt-3 pb-6 flex flex-col gap-4">
          {/* Quotation Info Box */}
          <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-[10px] p-3.5 flex flex-col gap-1">
            <span className="font-semibold text-[#1F2937] text-[14px]">
              {quotationCode}
            </span>
            <span className="text-[12px] text-[#6B7280]">
              {customerName}
            </span>
          </div>

          {/* To */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-[#4B5563] font-medium">To</label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full h-10 px-3.5 bg-white border border-[#E5E7EB] rounded-[8px] text-[13px] text-[#1F2937] font-normal focus:outline-none focus:border-[#FF611C] transition-colors"
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-[#4B5563] font-medium">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full h-10 px-3.5 bg-white border border-[#E5E7EB] rounded-[8px] text-[13px] text-[#1F2937] font-normal focus:outline-none focus:border-[#FF611C] transition-colors"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] text-[#4B5563] font-medium">
              Message
            </label>
            <textarea
              rows={7}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3.5 bg-white border border-[#E5E7EB] rounded-[8px] text-[13px] text-[#1F2937] font-normal focus:outline-none focus:border-[#FF611C] resize-none leading-relaxed transition-colors"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 bg-white hover:bg-neutral-50 border border-[#E5E7EB] rounded-[8px] text-[#374151] font-medium text-[13px] transition-colors cursor-pointer flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-[8px] text-white font-medium text-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
              }}
            >
              <SentIcon className="size-4 text-white" />
              <span>Send Quotation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
