"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
} from "@/components/icons/Icons";

export default function AddExpensePage() {
  const router = useRouter();

  // Form states matching mockup
  const [expenseNumber, setExpenseNumber] = useState("EXP-1030");
  const [expenseDate, setExpenseDate] = useState("Mensah Enterprises");
  const [category, setCategory] = useState("kwame.mensah@mensahent.gh");
  const [description, setDescription] = useState("kwame.mensah@mensahent.gh");

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amount, setAmount] = useState("200.00");

  const [notes, setNotes] = useState(
    "This is the primary laptop for our finance director. Please prioritize."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate creation and navigate back to expenses list
    router.push("/expense");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Good Morning" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Row: Back button, Add Expense, Cancel & Create Expense */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/expense"
                className="flex size-11 items-center justify-center rounded-[8px] border border-[#EDEDED] bg-white text-[#575765] shadow-sm transition hover:bg-gray-50 hover:text-[#3D3D49]"
              >
                <ChevronLeftIcon className="size-5" />
              </Link>
              <div className="flex flex-col gap-0.5">
                <h1 className="font-semibold text-[#3D3D49] text-[24px] leading-tight">
                  Add Expense
                </h1>
                <p className="text-[14px] text-[#8C8C9A]">
                  Create a new expense.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/expense")}
                className="px-5 py-2.5 rounded-[8px] border border-[#EDEDED] bg-white text-sm font-medium text-[#575765] shadow-sm transition hover:bg-gray-50 hover:text-[#3D3D49] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-[8px] text-sm font-semibold text-white shadow-sm transition hover:opacity-95 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Create Expense
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Card 1: Expense Information */}
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-6 shadow-sm">
              <h2 className="text-[18px] font-semibold text-[#3D3D49] mb-5">
                Expense Information
              </h2>

              <div className="flex flex-col gap-5">
                {/* Row 1: Expense # & Expense Date * */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#575765] mb-2 font-normal">
                      Expense #
                    </label>
                    <input
                      type="text"
                      value={expenseNumber}
                      onChange={(e) => setExpenseNumber(e.target.value)}
                      className="w-full rounded-[8px] border border-[#EDEDED] bg-white px-4 py-2.5 text-sm font-normal text-[#3D3D49] shadow-sm focus:border-[#FF611C] focus:outline-none focus:ring-1 focus:ring-[#FF611C]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#575765] mb-2 font-normal">
                      Expense Date <span className="text-[#3D3D49]">*</span>
                    </label>
                    <input
                      type="text"
                      value={expenseDate}
                      onChange={(e) => setExpenseDate(e.target.value)}
                      className="w-full rounded-[8px] border border-[#EDEDED] bg-white px-4 py-2.5 text-sm font-normal text-[#3D3D49] shadow-sm focus:border-[#FF611C] focus:outline-none focus:ring-1 focus:ring-[#FF611C]"
                    />
                  </div>
                </div>

                {/* Row 2: Category * */}
                <div>
                  <label className="block text-sm text-[#575765] mb-2 font-normal">
                    Category <span className="text-[#3D3D49]">*</span>
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-[8px] border border-[#EDEDED] bg-white px-4 py-2.5 text-sm font-normal text-[#3D3D49] shadow-sm focus:border-[#FF611C] focus:outline-none focus:ring-1 focus:ring-[#FF611C]"
                  />
                </div>

                {/* Row 3: Description * */}
                <div>
                  <label className="block text-sm text-[#575765] mb-2 font-normal">
                    Description <span className="text-[#3D3D49]">*</span>
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-[8px] border border-[#EDEDED] bg-white px-4 py-2.5 text-sm font-normal text-[#3D3D49] shadow-sm focus:border-[#FF611C] focus:outline-none focus:ring-1 focus:ring-[#FF611C]"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Payment Details */}
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-6 shadow-sm">
              <h2 className="text-[18px] font-semibold text-[#3D3D49] mb-5">
                Payment Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-[#575765] mb-2 font-normal">
                    Payment Method
                  </label>
                  <div className="relative">
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full appearance-none rounded-[8px] border border-[#EDEDED] bg-white px-4 py-2.5 text-sm font-normal text-[#3D3D49] shadow-sm focus:border-[#FF611C] focus:outline-none focus:ring-1 focus:ring-[#FF611C] cursor-pointer"
                    >
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Mobile Money">Mobile Money</option>
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-[#575765]" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#575765] mb-2 font-normal">
                    Amount (CFA)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded-[8px] border border-[#EDEDED] bg-white px-4 py-2.5 text-sm font-normal text-[#3D3D49] shadow-sm focus:border-[#FF611C] focus:outline-none focus:ring-1 focus:ring-[#FF611C]"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Additional Information */}
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-6 shadow-sm">
              <h2 className="text-[18px] font-semibold text-[#3D3D49] mb-5">
                Additional Information
              </h2>

              <div>
                <label className="block text-sm text-[#575765] mb-2 font-normal">
                  Notes
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-[8px] border border-[#EDEDED] bg-white px-4 py-2.5 text-sm font-normal text-[#3D3D49] shadow-sm focus:border-[#FF611C] focus:outline-none focus:ring-1 focus:ring-[#FF611C]"
                />
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
