"use client";

import React, { useState } from "react";
import { CheckmarkCircleIcon } from "@/components/icons/Icons";

interface ConvertToCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  leadData?: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    source?: string;
    initials?: string;
  };
}

export default function ConvertToCustomerModal({
  isOpen,
  onClose,
  onConfirm,
  leadData = {
    name: "Kwame Mensah",
    company: "Mensah Enterprises",
    email: "kwame.mensah@mensahent.gh",
    phone: "+233 24 555 0192",
    source: "Manual",
    initials: "AS",
  },
}: ConvertToCustomerModalProps) {
  const [fullName, setFullName] = useState(leadData.name || "Kwame Mensah");
  const [company, setCompany] = useState(leadData.company || "Mensah Enterprises");
  const [email, setEmail] = useState(leadData.email || "kwame.mensah@mensahent.gh");
  const [phone, setPhone] = useState(leadData.phone || "+233 24 555 0192");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[12px] border border-[#EDEDED] p-6 max-w-[480px] w-full shadow-2xl flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EDEDED]">
          <h3 className="font-semibold text-[#3D3D49] text-base">
            Convert to Customer
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-[#8C8C9A] hover:text-[#3D3D49] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex flex-col gap-4.5">
          {/* Top Converting Lead Box */}
          <div className="bg-[#F8FAFD] border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3D3D49]">
                Converting Lead
              </span>
              <span className="px-2 py-0.5 text-[11px] rounded-[4px] bg-[#E9ECEF] text-[#575765] font-normal">
                {leadData.source || "Manual"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-[#F3E8FF] text-[#8A58FF] flex items-center justify-center font-medium text-xs shrink-0">
                {leadData.initials || "AS"}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[#3D3D49] text-xs">
                  {leadData.name || "Kwame Mensah"}
                </span>
                <span className="text-[11px] text-[#575765]">
                  {leadData.company || "Mensah Enterprises"}
                </span>
              </div>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#3D3D49] text-[14px]">
              Customer Details
            </h4>

            {/* Grid 2x2 Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#575765] font-normal">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-[#EDEDED] rounded-[8px] px-3.5 py-2.5 text-[#3D3D49] text-xs bg-white outline-none focus:border-[#009689]"
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#575765] font-normal">
                  Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full border border-[#EDEDED] rounded-[8px] px-3.5 py-2.5 text-[#3D3D49] text-xs bg-white outline-none focus:border-[#009689]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#575765] font-normal">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#EDEDED] rounded-[8px] px-3.5 py-2.5 text-[#3D3D49] text-xs bg-white outline-none focus:border-[#009689]"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#575765] font-normal">
                  Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-[#EDEDED] rounded-[8px] px-3.5 py-2.5 text-[#3D3D49] text-xs bg-white outline-none focus:border-[#009689]"
                />
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-[#F0F7FF] border border-[#3B82F6]/60 rounded-[8px] p-3 flex items-start gap-2.5 text-xs text-[#0D79E4]">
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="size-4.5 text-[#0D79E4] shrink-0 mt-0.5"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="10" cy="10" r="7" />
              <path d="M10 9v4M10 7h.01" strokeLinecap="round" />
            </svg>
            <span className="leading-snug text-[11.5px]">
              This will create a new customer record. Review and edit the details below before confirming.
            </span>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#EDEDED]">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-[8px] border border-[#EDEDED] bg-white text-xs font-medium text-[#575765] hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-2.5 rounded-[8px] bg-[#009689] hover:bg-[#00877a] text-xs font-medium text-white flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
          >
            <CheckmarkCircleIcon className="size-4 text-white" />
            <span>Covert to customer</span>
          </button>
        </div>
      </div>
    </div>
  );
}
