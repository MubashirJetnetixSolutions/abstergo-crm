"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MoreVerticalIcon,
  ExternalLinkIcon,
} from "@/components/icons/Icons";

interface TransactionRow {
  id: string;
  transactionNumber: string;
  date: string;
  reason: "Sale" | "Delivery" | "Purchase" | "Expense";
  reference: string;
  party: string;
  partyInitials: string;
  partyColor: string;
  amount: string;
  direction: "In" | "Out";
}

const TRANSACTIONS_DATA: TransactionRow[] = [
  {
    id: "1",
    transactionNumber: "TXN-9042",
    date: "2026-09-01",
    reason: "Sale",
    reference: "INV-1088",
    party: "Arson Builders & CO",
    partyInitials: "AB",
    partyColor: "bg-teal-100 text-teal-700",
    amount: "8,500,000 CFA",
    direction: "In",
  },
  {
    id: "2",
    transactionNumber: "TXN-9042",
    date: "2026-09-01",
    reason: "Delivery",
    reference: "INV-1088",
    party: "Marcus Norotnomse",
    partyInitials: "MN",
    partyColor: "bg-orange-100 text-orange-700",
    amount: "8,500,000 CFA",
    direction: "In",
  },
  {
    id: "3",
    transactionNumber: "TXN-9042",
    date: "2026-09-01",
    reason: "Sale",
    reference: "INV-1088",
    party: "ABC Technologies",
    partyInitials: "AS",
    partyColor: "bg-blue-100 text-blue-700",
    amount: "8,500,000 CFA",
    direction: "Out",
  },
  {
    id: "4",
    transactionNumber: "TXN-9042",
    date: "2026-09-01",
    reason: "Delivery",
    reference: "INV-1088",
    party: "Arson Builders & CO",
    partyInitials: "AB",
    partyColor: "bg-amber-100 text-amber-700",
    amount: "8,500,000 CFA",
    direction: "In",
  },
  {
    id: "5",
    transactionNumber: "TXN-9042",
    date: "2026-09-01",
    reason: "Sale",
    reference: "INV-1088",
    party: "Jetnetix Solutions",
    partyInitials: "JS",
    partyColor: "bg-blue-100 text-blue-700",
    amount: "8,500,000 CFA",
    direction: "Out",
  },
  {
    id: "6",
    transactionNumber: "TXN-9042",
    date: "2026-09-01",
    reason: "Sale",
    reference: "INV-1088",
    party: "Arson Builders & CO",
    partyInitials: "AB",
    partyColor: "bg-purple-100 text-purple-700",
    amount: "8,500,000 CFA",
    direction: "Out",
  },
  {
    id: "7",
    transactionNumber: "TXN-9042",
    date: "2026-09-01",
    reason: "Delivery",
    reference: "INV-1088",
    party: "Imadi Innovations",
    partyInitials: "IM",
    partyColor: "bg-amber-100 text-amber-700",
    amount: "8,500,000 CFA",
    direction: "In",
  },
];

export default function RecentTransactionsTable() {
  return (
    <div className="rounded-[12px] border border-[#E9ECEF] bg-white shadow-sm overflow-hidden flex flex-col">
      {/* Table Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-[#E9ECEF]">
        <h2 className="text-[20px] font-medium text-[#575765]  ">
          Recent Transactions
        </h2>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-[8px] border border-[#E9ECEF] bg-white px-3 py-1.5 text-xs font-semibold text-[#3D3D49] hover:bg-gray-50 transition"
        >
          <ExternalLinkIcon className="size-3.5" />
          <span>View Details</span>
        </button>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-[#E9ECEF] bg-[#F8FAFD] text-[#8C8C9A] text-xs font-medium uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Transaction #</th>
              <th className="py-3.5 px-4 font-semibold">Date</th>
              <th className="py-3.5 px-4 font-semibold">Reason</th>
              <th className="py-3.5 px-4 font-semibold">Reference</th>
              <th className="py-3.5 px-4 font-semibold">Party</th>
              <th className="py-3.5 px-4 font-semibold">Amount</th>
              <th className="py-3.5 px-4 font-semibold">Direction</th>
              <th className="py-3.5 px-4 font-semibold text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9ECEF]">
            {TRANSACTIONS_DATA.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50/75 transition">
                <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                  {row.transactionNumber}
                </td>
                <td className="py-3.5 px-4 text-[#575765]">{row.date}</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-[#575765]">
                    {row.reason}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-[#FF611C]">
                  {row.reference}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${row.partyColor}`}
                    >
                      {row.partyInitials}
                    </div>
                    <span className="font-medium text-[#3D3D49]">
                      {row.party}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-bold text-emerald-600">
                  {row.amount}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${row.direction === "In"
                        ? "bg-[#E5F4F3] text-[#0D9488] border border-[#A7DFDB]"
                        : "bg-[#FFF0F0] text-[#E02D3C] border border-[#FFD5D8]"
                      }`}
                  >
                    {row.direction === "In" ? "↙ In" : "↗ Out"}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                  >
                    <MoreVerticalIcon className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
