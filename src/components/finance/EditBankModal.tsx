"use client";

import React, { useState, useEffect } from "react";
import { XIcon, InfoShieldAlertIcon } from "@/components/icons/Icons";

export interface BankAccount {
  id: string;
  name: string;
  accountType: string;
  amount: number;
  percentage: number;
  color: string;
}

interface EditBankModalProps {
  isOpen: boolean;
  bank: BankAccount | null;
  onClose: () => void;
  onSave: (bankId: string, newAmount: number) => void;
}

export default function EditBankModal({
  isOpen,
  bank,
  onClose,
  onSave,
}: EditBankModalProps) {
  const [amountStr, setAmountStr] = useState("");

  useEffect(() => {
    if (bank) {
      setAmountStr(bank.amount.toString());
    }
  }, [bank]);

  if (!isOpen || !bank) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amountStr) || 0;
    onSave(bank.id, num);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1D1E2C]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-[620px] max-w-full rounded-[16px] bg-white shadow-2xl border border-[#EDEDED] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EDEDED]">
          <h3 className="text-[18px] font-semibold text-[#1D1E2C]">
            Edit Bank Amount
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#575765] hover:text-[#1D1E2C] hover:bg-[#F8FAFD] transition"
          >
            <XIcon className="size-5" />
          </button>
        </div>

        {/* Content Body */}
        <form onSubmit={handleSave}>
          <div className="p-6 flex flex-col gap-5">
            {/* Bank Card Info */}
            <div className="rounded-[10px] bg-[#F8FAFD] border border-[#EDEDED] p-4 flex flex-col gap-1">
              <span className="text-[16px] font-semibold text-[#1D1E2C]">
                {bank.name}
              </span>
              <span className="text-[13px] text-[#575765]">
                {bank.accountType || "Main Account"}
              </span>
            </div>

            {/* Input Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-[#3D3D49]">
                Amount (CFA)
              </label>
              <input
                type="number"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="Enter amount"
                className="w-full rounded-[8px] border border-[#E0E2E7] px-4 py-2.5 text-[15px] text-[#1D1E2C] placeholder:text-gray-400 focus:outline-none focus:border-[#FF611C] focus:ring-1 focus:ring-[#FF611C] transition"
                required
              />
            </div>

            {/* Alert Messages Banner */}
            <div className="rounded-[8px] bg-[#EFF6FF] border border-[#BFDBFE] p-3 flex items-center gap-3">
              <InfoShieldAlertIcon className="size-5 text-[#2563EB] shrink-0" />
              <span className="text-[13px] text-[#1D4ED8]">
                This amount will not affect any record in finance.
              </span>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#EDEDED] bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-[8px] border border-[#E0E2E7] text-[#3D3D49] hover:bg-[#F8FAFD] text-[14px] font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-[8px] bg-[#1D1E2C] text-white hover:bg-black text-[14px] font-medium transition shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
