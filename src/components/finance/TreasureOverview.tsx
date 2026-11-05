"use client";

import React from "react";
import { EditPencilIcon, ExpenseIcon } from "@/components/icons/Icons";
import { BankAccount } from "./EditBankModal";

interface TreasureOverviewProps {
  banks: BankAccount[];
  totalAvailable: number;
  onEditBank: (bank: BankAccount) => void;
}

export default function TreasureOverview({
  banks,
  totalAvailable,
  onEditBank,
}: TreasureOverviewProps) {
  const formatCFA = (val: number) => {
    return `${val.toLocaleString()} CFA`;
  };

  return (
    <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex size-10 items-center justify-center rounded-[10px] bg-[#FFF4EF] text-[#FF611C] border border-[#FFE1D4] shrink-0">
          <ExpenseIcon className="size-5 text-[#FF611C]" />
        </div>
        <div className="flex items-center gap-2.5">
          <h2 className="text-[18px] font-semibold text-[#1D1E2C]">
            Treasure Overview
          </h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium bg-[#FFF4EF] text-[#FF611C] border border-[#FFE1D4]">
            Current State
          </span>
        </div>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Available Now */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-[14px] font-normal text-[#575765]">
              Available Now
            </span>
            <div className="mt-2 text-[22px] font-bold text-[#1D1E2C] tracking-tight">
              {formatCFA(totalAvailable)}
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 rounded-full bg-[#EDEDED] overflow-hidden">
              <div className="h-full bg-[#FF611C] rounded-full w-full" />
            </div>
            <span className="block mt-2 text-[12px] text-[#575765]">
              Total Treasure
            </span>
          </div>
        </div>

        {/* Bank Cards */}
        {banks.map((bank) => (
          <div key={bank.id} className="flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-normal text-[#575765]">
                  {bank.name}
                </span>
                <button
                  type="button"
                  onClick={() => onEditBank(bank)}
                  className="p-1 text-[#8C8CA1] hover:text-[#FF611C] hover:bg-[#FFF4EF] rounded transition"
                  title="Edit amount"
                >
                  <EditPencilIcon className="size-4" />
                </button>
              </div>
              <div className="mt-2 text-[22px] font-bold text-[#1D1E2C] tracking-tight">
                {formatCFA(bank.amount)}
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full h-2 rounded-full bg-[#EDEDED] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: bank.color,
                    width: `${Math.min(bank.percentage, 100)}%`,
                  }}
                />
              </div>
              <span className="block mt-2 text-[12px] text-[#575765]">
                {bank.percentage}% of total
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
