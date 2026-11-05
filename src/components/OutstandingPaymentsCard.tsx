"use client";

import React from "react";

interface PaymentItem {
  company: string;
  overdueText: string;
  amount: string;
  status: "overdue" | "Warning" | "Current";
}

const payments: PaymentItem[] = [
  {
    company: "ABC Technologies",
    overdueText: "32d overdue",
    amount: "1.85M CFA",
    status: "overdue",
  },
  {
    company: "Tech Solutions SARL",
    overdueText: "18 d overdue",
    amount: "1.24M CFA",
    status: "Warning",
  },
  {
    company: "InfoSystems CI",
    overdueText: "32d overdue",
    amount: "1.85M CFA",
    status: "Current",
  },
  {
    company: "Bureau Plus",
    overdueText: "32d overdue",
    amount: "1.85M CFA",
    status: "overdue",
  },
];

export default function OutstandingPaymentsCard() {
  return (
    <div
      className="bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-full"
      data-node-id="6043:676"
    >
      {/* Header */}
      <div className="min-h-[52px] px-4 py-3 border-b border-[#EDEDED] flex items-center justify-between gap-4 shrink-0">
        <h3 className="font-medium text-[#575765] text-[20px]">
          Outstanding Payments
        </h3>
        <button className="bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] px-2.5 py-1.5 flex items-center gap-1 text-[#575765] text-[11px] font-medium transition-colors cursor-pointer">
          <span>View all Outstanding</span>
        </button>
      </div>

      {/* Summary with Segmented Bar */}
      <div className="p-4 border-b border-[#EDEDED] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1 shrink-0">
          <span className="font-normal text-[#575765] text-[11px]">
            42 customers with balances
          </span>
          <span className="font-medium text-[#3D3D49] text-[11px]">
            7.86M CFA
          </span>
        </div>

        {/* Segmented Timeline / Progress */}
        <div className="flex-1 max-w-[488px] flex flex-col gap-2.5">
          {/* Multi-color bar */}
          <div className="w-full h-2 bg-[#F0F1FA] border border-[#F0F1FA] rounded-full overflow-hidden flex">
            <div className="flex-1 bg-[#009689]" />
            <div className="flex-1 bg-[#EDAC00]" />
            <div className="flex-1 bg-[#8A58FF]" />
            <div className="flex-1 bg-[#0D79E4]" />
            <div className="flex-1 bg-[#FF611C]" />
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#575765]">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#009689]" />
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#EDAC00]" />
              <span>1–30 days</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#8A58FF]" />
              <span>31–60 days</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#0D79E4]" />
              <span>61–90 days</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#FF611C]" />
              <span>90+ days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="p-4 flex flex-col gap-3 overflow-y-auto">
        {payments.map((p, idx) => {
          const isOverdue = p.status === "overdue";
          const isWarning = p.status === "Warning";
          const isCurrent = p.status === "Current";

          return (
            <div
              key={idx}
              className="bg-white border border-[#EDEDED] rounded-[8px] px-3 py-2 flex items-center justify-between gap-4"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                  {p.company}
                </span>
                <span className="font-normal text-[#575765] text-[11px]">
                  {p.overdueText}
                </span>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="font-medium text-[#3D3D49] text-[11px]">
                  {p.amount}
                </span>

                <div
                  className={`px-2 py-0.5 rounded-[6px] border text-[11px] font-normal leading-normal ${
                    isOverdue
                      ? "bg-[#FFEFE8] border-[#FF611C] text-[#FF611C]"
                      : isWarning
                      ? "bg-[#FDF7E5] border-[#EDAC00] text-[#EDAC00]"
                      : "bg-[#E5F4F3] border-[#009689] text-[#009689]"
                  }`}
                >
                  {p.status}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
