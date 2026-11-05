"use client";

import React from "react";
import { ExternalLinkIcon } from "./icons/Icons";

interface DeliveryItem {
  orderId: string;
  client: string;
  status: "In-progress" | "Pending Stock" | "Completed" | "Ready to dispatch";
  progressPercent: string;
  amount: string;
  count: string;
  countColor?: string;
}

const deliveries: DeliveryItem[] = [
  {
    orderId: "#ORD-1024",
    client: "ABC Technologies",
    status: "In-progress",
    progressPercent: "50%",
    amount: "1.84M CFA",
    count: "5/10",
    countColor: "#0D79E4",
  },
  {
    orderId: "#ORD-1024",
    client: "ABC Technologies",
    status: "Pending Stock",
    progressPercent: "80%",
    amount: "1.84M CFA",
    count: "8/10",
    countColor: "#0D79E4",
  },
  {
    orderId: "#ORD-1024",
    client: "ABC Technologies",
    status: "Completed",
    progressPercent: "40%",
    amount: "1.84M CFA",
    count: "4/10",
    countColor: "#0D79E4",
  },
  {
    orderId: "#ORD-1024",
    client: "ABC Technologies",
    status: "Pending Stock",
    progressPercent: "20%",
    amount: "1.84M CFA",
    count: "2/10",
    countColor: "#FF611C",
  },
  {
    orderId: "#ORD-1024",
    client: "ABC Technologies",
    status: "Ready to dispatch",
    progressPercent: "20%",
    amount: "1.84M CFA",
    count: "2/10",
    countColor: "#0D79E4",
  },
];

export default function PendingDeliveriesCard() {
  return (
    <div
      className="bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-full"
      data-node-id="6043:723"
    >
      {/* Header */}
      <div className="min-h-[52px] px-4 py-3 border-b border-[#EDEDED] flex items-center justify-between gap-4 shrink-0">
        <h3 className="font-medium text-[#575765] text-[20px]">
          Pending Deliveries
        </h3>
        <button className="bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] px-2.5 py-1.5 flex items-center gap-1 text-[#575765] text-[11px] font-medium transition-colors cursor-pointer">
          <ExternalLinkIcon className="size-4 text-[#575765]" />
          <span>View Details</span>
        </button>
      </div>

      {/* Order List */}
      <div className="p-4 flex flex-col gap-3 overflow-y-auto">
        {deliveries.map((item, idx) => {
          const isInProgress = item.status === "In-progress";
          const isPendingStock = item.status === "Pending Stock";
          const isCompleted = item.status === "Completed";
          const isReadyToDispatch = item.status === "Ready to dispatch";

          return (
            <div
              key={idx}
              className="bg-white border border-[#EDEDED] rounded-[8px] px-3 py-2.5 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-[#3D3D49] text-[11px]">
                    {item.orderId}
                  </span>
                  <span className="font-normal text-[#575765] text-[11px]">
                    {item.client}
                  </span>
                </div>

                <div
                  className={`px-2 py-0.5 rounded-[6px] border text-[11px] font-normal leading-normal shrink-0 ${
                    isInProgress
                      ? "bg-[#F3EEFF] border-[#8A58FF] text-[#8A58FF]"
                      : isPendingStock
                      ? "bg-[#FFEFE8] border-[#FF611C] text-[#FF611C]"
                      : isCompleted
                      ? "bg-[#E5F4F3] border-[#009689] text-[#009689]"
                      : "bg-[#E7F2FC] border-[#0D79E4] text-[#0D79E4]"
                  }`}
                >
                  {item.status}
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-[#F0F1FA] border border-[#F0F1FA] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0D79E4] rounded-full transition-all duration-500"
                  style={{ width: item.progressPercent }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] leading-tight">
                <span className="font-normal text-[#575765]">
                  {item.amount}
                </span>
                <span
                  className="font-medium text-[11px]"
                  style={{ color: item.countColor || "#0D79E4" }}
                >
                  {item.count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
