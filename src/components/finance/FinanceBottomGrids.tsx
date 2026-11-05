"use client";

import React from "react";
import {
  SalesIcon as SaleIcon,
  DeliveriesIcon,
  RepairIcon,
  MoneyIcon,
  PurchasesIcon,
} from "@/components/icons/Icons";

export default function FinanceBottomGrids() {
  const categories = [
    { name: "Salaries", amount: "4,200,000 CFA", pct: 75, color: "bg-[#1E75FF]" },
    { name: "Rent", amount: "1,800,000 CFA", pct: 45, color: "bg-[#FF611C]" },
    { name: "Marketing", amount: "1,080,000 CFA", pct: 30, color: "bg-[#0D9488]" },
    { name: "Utilities", amount: "365,000 CFA", pct: 20, color: "bg-[#8247FF]" },
    { name: "Software", amount: "360,000 CFA", pct: 20, color: "bg-[#F1A80A]" },
    { name: "Maintenance", amount: "320,000 CFA", pct: 18, color: "bg-[#1E75FF]" },
    { name: "Transport", amount: "185,000 CFA", pct: 12, color: "bg-[#FF611C]" },
    { name: "Office", amount: "95,000 CFA", pct: 8, color: "bg-[#0D9488]" },
  ];

  const payables = [
    {
      invoice: "#INV-1088",
      company: "DataSoft Solutions",
      overdue: "13d overdue",
      amount: "2,400,000 CFA",
      status: "Overdue",
      statusColor: "bg-[#FFF0F0] text-[#E02D3C] border-[#FFD5D8]",
    },
    {
      invoice: "#INV-1088",
      company: "DataSoft Solutions",
      overdue: "13d overdue",
      amount: "2,400,000 CFA",
      status: "Partial",
      statusColor: "bg-[#FFF8E6] text-[#D97706] border-[#FDE68A]",
    },
    {
      invoice: "#INV-1088",
      company: "DataSoft Solutions",
      overdue: "13d overdue",
      amount: "2,400,000 CFA",
      status: "Partial",
      statusColor: "bg-[#FFF8E6] text-[#D97706] border-[#FDE68A]",
    },
  ];

  const activities = [
    {
      icon: SaleIcon,
      iconColor: "text-[#1E75FF] bg-blue-50",
      title: "Sale #INV-1048 created",
      subtitle: "1,240,000 CFA",
      author: "Jean Martin",
      time: "2 min ago",
    },
    {
      icon: DeliveriesIcon,
      iconColor: "text-[#FF611C] bg-orange-50",
      title: "Delivery #DEL-082 completed",
      subtitle: "Tech Solutions SARL",
      author: "System",
      time: "2 min ago",
    },
    {
      icon: RepairIcon,
      iconColor: "text-[#8247FF] bg-purple-50",
      title: "Repair #REP-203 assigned",
      subtitle: "MacBook Pro – Screen",
      author: "Alain Koné",
      time: "2 min ago",
    },
    {
      icon: MoneyIcon,
      iconColor: "text-[#0D9488] bg-teal-50",
      title: "Payment received from ABC Technologies",
      subtitle: "850,000 CFA",
      author: "System",
      time: "2 min ago",
    },
    {
      icon: PurchasesIcon,
      iconColor: "text-[#1E75FF] bg-blue-50",
      title: "Purchase #PUR-118 received",
      subtitle: "24 units — Dell Latitude",
      author: "Paul Koffi",
      time: "2 min ago",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Expenses by Category */}
      <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm flex flex-col justify-between">
        <h2 className="text-[20px] font-medium text-[#575765]  mb-4">
          Expenses by Category
        </h2>

        <div className="space-y-4">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#3D3D49]">{cat.name}</span>
                <span className="font-semibold text-[#3D3D49]">
                  {cat.amount}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className={`h-full rounded-full ${cat.color}`}
                  style={{ width: `${cat.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Receivables & Payables */}
      <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h2 className="text-[20px] font-medium text-[#575765]  mb-4">
            Receivables & Payables
          </h2>

          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E9ECEF]">
            <div>
              <p className="text-xs text-[#8C8C9A]">Total Receivables</p>
              <p className="text-base font-bold text-emerald-600 mt-1">
                20.90M CFA
              </p>
            </div>
            <div>
              <p className="text-xs text-[#8C8C9A]">Total Payables</p>
              <p className="text-base font-bold text-[#FF611C] mt-1">
                26.20M CFA
              </p>
            </div>
          </div>

          <div className="divide-y divide-[#E9ECEF] mt-3">
            {payables.map((item, idx) => (
              <div key={idx} className="py-3.5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#3D3D49]">
                    {item.invoice}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-[#8C8C9A]">{item.company}</p>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[#8C8C9A]">{item.overdue}</span>
                  <span className="font-bold text-rose-600">{item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Transaction Activity */}
      <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h2 className="text-[20px] font-medium text-[#575765]  mb-4">
            Transaction Activity
          </h2>

          <div className="space-y-4">
            {activities.map((act, idx) => {
              const IconComp = act.icon;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-[8px] ${act.iconColor}`}
                  >
                    <IconComp className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-semibold text-[#3D3D49] truncate">
                        {act.title}
                      </p>
                      <span className="text-[11px] text-[#8C8C9A] shrink-0">
                        {act.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8C8C9A] truncate">
                      {act.subtitle}
                    </p>
                    <p className="text-[11px] text-[#575765] mt-0.5">
                      {act.author}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
