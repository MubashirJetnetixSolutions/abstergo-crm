"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  MoreVerticalIcon,
  EditIcon,
  FileIcon,
  PlusCircleIcon,
  UploadIcon,
  CheckmarkCircleIcon,
  DeliveriesIcon,
  RepairsIcon,
  XIcon,
} from "@/components/icons/Icons";

type ExpenseTabKey = "Payments" | "Documents" | "Activity";

const TABS: ExpenseTabKey[] = ["Payments", "Documents", "Activity"];

interface PaymentItem {
  id: string;
  code: string;
  date: string;
  method: string;
  amount: string;
  reference: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  receivedBy: string;
  lastUpdated: string;
}

interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
  fileSize?: string;
}

interface ActivityItem {
  id: string;
  iconBg: string;
  iconColor: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  time: string;
  date: string;
}

export default function ExpenseDetailPage() {
  const params = useParams();
  const expenseId = (params?.id as string) || "EXP-1025";
  const [activeTab, setActiveTab] = useState<ExpenseTabKey>("Payments");

  // State for Image 1 (Payments tab data)
  const [payments, setPayments] = useState<PaymentItem[]>([
    {
      id: "pay-1",
      code: "PAY-EXP-001",
      date: "12 Aug, 2026",
      method: "Bank Transfer",
      amount: "CFA 61,925",
      reference: "TXN-GH-44120",
      initials: "NE",
      avatarBg: "bg-[#F3E8FF]",
      avatarColor: "text-[#7C3AED]",
      receivedBy: "Nathan Elionos",
      lastUpdated: "12 Aug, 2026",
    },
    {
      id: "pay-2",
      code: "PAY-EXP-001",
      date: "12 Aug, 2026",
      method: "Bank Transfer",
      amount: "CFA 61,925",
      reference: "TXN-GH-44120",
      initials: "AS",
      avatarBg: "bg-[#E0F2FE]",
      avatarColor: "text-[#0284C7]",
      receivedBy: "Joseph J. Martin",
      lastUpdated: "12 Aug, 2026",
    },
    {
      id: "pay-3",
      code: "PAY-EXP-001",
      date: "12 Aug, 2026",
      method: "Bank Transfer",
      amount: "CFA 61,925",
      reference: "TXN-GH-44120",
      initials: "NE",
      avatarBg: "bg-[#FFEDD5]",
      avatarColor: "text-[#EA580C]",
      receivedBy: "Nathan Elionos",
      lastUpdated: "12 Aug, 2026",
    },
  ]);

  // State for Image 2 (Documents tab data)
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "doc-1",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file • 2.5mb",
      fileSize: "2.5 MB",
    },
    {
      id: "doc-2",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file • 2.5mb",
      fileSize: "2.5 MB",
    },
    {
      id: "doc-3",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file • 2.5mb",
      fileSize: "2.5 MB",
    },
    {
      id: "doc-4",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file • 2.5mb",
      fileSize: "2.5 MB",
    },
    {
      id: "doc-5",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file • 2.5mb",
      fileSize: "2.5 MB",
    },
  ]);

  // State for Image 3 (Activity tab data)
  const [activities] = useState<ActivityItem[]>([
    {
      id: "act-1",
      iconBg: "bg-[#E5F4F3]",
      iconColor: "text-[#009689]",
      icon: CheckmarkCircleIcon,
      title: "Device collected by Kofi Acheampong — repair completed",
      subtitle: "Ama Owusu",
      time: "2 min ago",
      date: "19 Aug 2026",
    },
    {
      id: "act-2",
      iconBg: "bg-[#E7F2FC]",
      iconColor: "text-[#0D79E4]",
      icon: DeliveriesIcon,
      title: "Device marked Ready for Pickup",
      subtitle: "Emmanuel Boateng",
      time: "2 min ago",
      date: "19 Aug 2026",
    },
    {
      id: "act-3",
      iconBg: "bg-[#FFEFE8]",
      iconColor: "text-[#FF611C]",
      icon: RepairsIcon,
      title: "Repair created — warranty repair",
      subtitle: "Ama Owusu",
      time: "2 min ago",
      date: "19 Aug 2026",
    },
  ]);

  // Modals state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [viewingDoc, setViewingDoc] = useState<DocumentItem | null>(null);

  // New payment form state
  const [newPayment, setNewPayment] = useState({
    amount: "61,925",
    method: "Bank Transfer",
    reference: "TXN-GH-44120",
    receivedBy: "Nathan Elionos",
  });

  // New document upload form state
  const [newDocTitle, setNewDocTitle] = useState("");

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayment.amount) return;

    const initials =
      newPayment.receivedBy
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "NE";

    const newItem: PaymentItem = {
      id: `pay-${Date.now()}`,
      code: `PAY-EXP-00${payments.length + 1}`,
      date: "12 Aug, 2026",
      method: newPayment.method,
      amount: `CFA ${newPayment.amount}`,
      reference:
        newPayment.reference ||
        `TXN-GH-${Math.floor(10000 + Math.random() * 90000)}`,
      initials,
      avatarBg: "bg-[#F3E8FF]",
      avatarColor: "text-[#7C3AED]",
      receivedBy: newPayment.receivedBy,
      lastUpdated: "12 Aug, 2026",
    };

    setPayments([newItem, ...payments]);
    setIsPaymentModalOpen(false);
  };

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    const title = newDocTitle.trim() || "Dell Latitude 5440 Datasheet.pdf";
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      title: title.endsWith(".pdf") ? title : `${title}.pdf`,
      subtitle: "Image file • 2.5mb",
      fileSize: "2.5 MB",
    };
    setDocuments([newDoc, ...documents]);
    setNewDocTitle("");
    setIsUploadModalOpen(false);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  const handleDownloadDocument = (doc: DocumentItem) => {
    const element = document.createElement("a");
    const file = new Blob([`Content for ${doc.title}`], {
      type: "application/pdf",
    });
    element.href = URL.createObjectURL(file);
    element.download = doc.title;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header with title="Good Morning" matching all 3 images */}
        <TopHeader title="Good Morning" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* 1. Header Row (EXP-1025, Partial, Record Payment, Edit Purchase, More Options) */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/expense"
                className="flex size-11 items-center justify-center rounded-[8px] border border-[#EDEDED] bg-white text-[#575765] shadow-sm transition hover:bg-gray-50 hover:text-[#3D3D49]"
              >
                <ChevronLeftIcon className="size-5" />
              </Link>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="font-semibold text-[#3D3D49] text-[24px] leading-tight">
                    {expenseId}
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-normal bg-[#E7F2FC] text-[#0D79E4] border border-[#0D79E4]/20">
                    Partial
                  </span>
                </div>
                <p className="text-[14px] text-[#8C8C9A]">
                  Created on 19 Aug 2026 at 10:42 AM by{" "}
                  <span className="text-[#3D3D49] font-medium">Jean Martin</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(true)}
                className="flex items-center gap-2 rounded-[8px] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                <PlusCircleIcon className="size-4 text-white" />
                <span>Record Payment</span>
              </button>

              <Link
                href="/purchases/new"
                className="flex items-center gap-2 rounded-[8px] border border-[#EDEDED] bg-white px-4 py-2.5 text-sm font-semibold text-[#3D3D49] shadow-sm transition hover:bg-gray-50 cursor-pointer"
              >
                <EditIcon className="size-4 text-[#575765]" />
                <span>Edit Purchase</span>
              </Link>

              <button
                type="button"
                aria-label="More options"
                className="flex size-11 items-center justify-center rounded-[8px] border border-[#EDEDED] bg-white text-[#575765] shadow-sm hover:bg-gray-50 transition cursor-pointer"
              >
                <MoreVerticalIcon className="size-4" />
              </button>
            </div>
          </div>

          {/* 2. Top Summary Info Bar (Expense #, Expense Date, Category, Payment Method, Repair Status) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-sm text-xs">
            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[13px] sm:text-[14px]">
                Expense #
              </p>
              <p className="font-semibold text-[#3D3D49] text-sm">
                {expenseId}
              </p>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[13px] sm:text-[14px]">
                Expense Date
              </p>
              <p className="font-semibold text-[#3D3D49] text-sm">
                19 Aug 2026
              </p>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[13px] sm:text-[14px]">
                Category
              </p>
              <p className="font-semibold text-[#3D3D49] text-sm">
                Office Expense
              </p>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[13px] sm:text-[14px]">
                Payment Method
              </p>
              <p className="font-semibold text-[#3D3D49] text-sm">
                Bank Transfer
              </p>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[13px] sm:text-[14px]">
                Repair Status
              </p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-xs font-medium bg-[#E5F4F3] text-[#009689]">
                Paid
              </span>
            </div>
          </div>

          {/* 3. 5 Metric KPI Cards (Parts Cost, Labor Cost, Paid, Balance, Grand Total) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-sm">
              <span className="text-[14px] text-[#8C8C9A] font-medium">
                Parts Cost
              </span>
              <p className="text-[22px] font-bold text-[#3D3D49] mt-2">
                CFA 8,500
              </p>
            </div>

            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-sm">
              <span className="text-[14px] text-[#8C8C9A] font-medium">
                Labor Cost
              </span>
              <p className="text-[22px] font-bold text-[#3D3D49] mt-2">
                CFA 15,000
              </p>
            </div>

            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-sm">
              <span className="text-[14px] text-[#8C8C9A] font-medium">Paid</span>
              <p className="text-[22px] font-bold text-[#00A389] mt-2">CFA 0</p>
            </div>

            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-sm">
              <span className="text-[14px] text-[#8C8C9A] font-medium">
                Balance
              </span>
              <p className="text-[22px] font-bold text-[#F92424] mt-2">
                CFA 49,280
              </p>
            </div>

            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-sm">
              <span className="text-[14px] text-[#8C8C9A] font-medium">
                Grand Total
              </span>
              <p className="text-[22px] font-bold text-[#3D3D49] mt-2">
                CFA 49,280
              </p>
            </div>
          </div>

          {/* 4. Navigation Tabs: Exactly 3 tabs as in all 3 images (Payments, Documents, Activity) */}
          <div className="flex border-b border-[#EDEDED] gap-8 text-sm font-medium">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-[15px] sm:text-[16px] transition relative cursor-pointer ${
                  activeTab === tab
                    ? "text-[#FF611C] font-semibold"
                    : "text-[#8C8C9A] hover:text-[#3D3D49]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF611C] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* =========================================================================
              TAB 1: Payments (Matches Image 1)
              ========================================================================= */}
          {activeTab === "Payments" && (
            <div className="space-y-4">
              {/* Top Record Payment Button on the right */}
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="flex items-center gap-2 rounded-[8px] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:opacity-95 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                  }}
                >
                  <PlusCircleIcon className="size-4 text-white" />
                  <span>Record Payment</span>
                </button>
              </div>

              {/* Payment History Card & Table */}
              <div className="rounded-[12px] border border-[#EDEDED] bg-white p-6 shadow-sm space-y-4">
                <h2 className="text-[20px] font-semibold text-[#3D3D49]">
                  Payment History
                </h2>

                <div className="overflow-x-auto rounded-[8px] border border-[#EDEDED]">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="border-b border-[#EDEDED] bg-[#F8FAFD] text-[#8C8C9A] font-medium">
                      <tr>
                        <th className="py-3 px-4 font-medium">Payment#</th>
                        <th className="py-3 px-4 font-medium">Date</th>
                        <th className="py-3 px-4 font-medium">Method</th>
                        <th className="py-3 px-4 font-medium">Amount</th>
                        <th className="py-3 px-4 font-medium">Reference</th>
                        <th className="py-3 px-4 font-medium">Received By</th>
                        <th className="py-3 px-4 font-medium">Last Updated</th>
                        <th className="py-3 px-4 font-medium text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDEDED] text-[#3D3D49]">
                      {payments.map((p) => (
                        <tr
                          key={p.id}
                          className="hover:bg-neutral-50/70 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-semibold text-[#FF611C]">
                            {p.code}
                          </td>
                          <td className="py-3.5 px-4 text-[#575765]">{p.date}</td>
                          <td className="py-3.5 px-4 text-[#575765]">{p.method}</td>
                          <td className="py-3.5 px-4 font-medium text-[#3D3D49]">
                            {p.amount}
                          </td>
                          <td className="py-3.5 px-4 text-[#575765]">{p.reference}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`size-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${p.avatarBg} ${p.avatarColor}`}
                              >
                                {p.initials}
                              </div>
                              <span className="font-medium text-[#3D3D49]">
                                {p.receivedBy}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[#575765]">
                            {p.lastUpdated}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              aria-label="Payment actions"
                              className="text-[#8C8C9A] hover:text-[#3D3D49] p-1 rounded hover:bg-gray-100 transition cursor-pointer"
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
            </div>
          )}

          {/* =========================================================================
              TAB 2: Documents (Matches Image 2)
              ========================================================================= */}
          {activeTab === "Documents" && (
            <div className="space-y-4">
              {/* Header Bar with Action Button */}
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-semibold text-[#3D3D49]">
                  Documents
                </h2>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="flex items-center gap-2 rounded-[8px] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition hover:opacity-95 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                  }}
                >
                  <UploadIcon className="size-4 text-white" />
                  <span>Upload Files</span>
                </button>
              </div>

              {/* 2-Column Grid of Document Cards (Exact Match to Image 2) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-white border border-[#EDEDED] rounded-[10px] p-4 flex items-center justify-between gap-4 shadow-sm hover:border-[#FF611C]/30 transition"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="size-10 rounded-[8px] bg-[#FFEFE8] text-[#FF611C] flex items-center justify-center shrink-0">
                        <FileIcon className="size-5 text-[#FF611C]" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-[#3D3D49] text-sm truncate">
                          {doc.title}
                        </span>
                        <span className="text-xs text-[#8C8C9A] mt-0.5">
                          {doc.subtitle}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="px-2.5 py-1 text-xs text-[#8C8C9A] hover:text-[#F92424] font-medium transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewingDoc(doc)}
                        className="px-2.5 py-1 text-xs text-[#575765] hover:text-[#3D3D49] font-medium transition-colors cursor-pointer"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadDocument(doc)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white rounded-[6px] transition hover:opacity-95 cursor-pointer shadow-sm"
                        style={{
                          background:
                            "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                        }}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 3: Activity (Matches Image 3)
              ========================================================================= */}
          {activeTab === "Activity" && (
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-6 shadow-sm">
              <div className="flex flex-col divide-y divide-[#EDEDED]">
                {activities.map((act) => {
                  const IconComp = act.icon;
                  return (
                    <div
                      key={act.id}
                      className="py-4.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`size-10 rounded-full flex items-center justify-center shrink-0 ${act.iconBg} ${act.iconColor}`}
                        >
                          <IconComp className="size-5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-[#3D3D49] text-sm">
                            {act.title}
                          </span>
                          <span className="text-xs text-[#8C8C9A] mt-0.5">
                            {act.subtitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end text-right shrink-0">
                        <span className="text-xs font-medium text-[#8C8C9A]">
                          {act.time}
                        </span>
                        <span className="text-xs text-[#8C8C9A] mt-0.5">
                          {act.date}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* =========================================================================
          RECORD PAYMENT MODAL
          ========================================================================= */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[12px] border border-[#EDEDED] shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-5 border-b border-[#EDEDED]">
              <h3 className="font-semibold text-[#3D3D49] text-lg">
                Record Payment
              </h3>
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(false)}
                className="text-[#8C8C9A] hover:text-[#3D3D49] p-1 rounded-md transition"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#575765] mb-1.5">
                  Amount (CFA) *
                </label>
                <input
                  type="text"
                  required
                  value={newPayment.amount}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, amount: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm border border-[#EDEDED] rounded-[8px] focus:outline-none focus:border-[#FF611C] focus:ring-1 focus:ring-[#FF611C]"
                  placeholder="e.g. 61,925"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575765] mb-1.5">
                  Payment Method
                </label>
                <select
                  value={newPayment.method}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, method: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm border border-[#EDEDED] rounded-[8px] focus:outline-none focus:border-[#FF611C] focus:ring-1 focus:ring-[#FF611C] bg-white"
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Mobile Money">Mobile Money</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575765] mb-1.5">
                  Reference / Transaction ID
                </label>
                <input
                  type="text"
                  value={newPayment.reference}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, reference: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm border border-[#EDEDED] rounded-[8px] focus:outline-none focus:border-[#FF611C] focus:ring-1 focus:ring-[#FF611C]"
                  placeholder="e.g. TXN-GH-44120"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#575765] mb-1.5">
                  Received By
                </label>
                <input
                  type="text"
                  value={newPayment.receivedBy}
                  onChange={(e) =>
                    setNewPayment({ ...newPayment, receivedBy: e.target.value })
                  }
                  className="w-full px-3.5 py-2 text-sm border border-[#EDEDED] rounded-[8px] focus:outline-none focus:border-[#FF611C] focus:ring-1 focus:ring-[#FF611C]"
                  placeholder="e.g. Nathan Elionos"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EDEDED]">
                <button
                  type="button"
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-[#575765] hover:text-[#3D3D49] hover:bg-gray-50 rounded-[8px] border border-[#EDEDED] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white rounded-[8px] transition hover:opacity-95"
                  style={{
                    background:
                      "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                  }}
                >
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          UPLOAD DOCUMENT MODAL
          ========================================================================= */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[12px] border border-[#EDEDED] shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-5 border-b border-[#EDEDED]">
              <h3 className="font-semibold text-[#3D3D49] text-lg">
                Upload Document
              </h3>
              <button
                type="button"
                onClick={() => setIsUploadModalOpen(false)}
                className="text-[#8C8C9A] hover:text-[#3D3D49] p-1 rounded-md transition"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <form onSubmit={handleUploadDocument} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#575765] mb-1.5">
                  Document Title
                </label>
                <input
                  type="text"
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-[#EDEDED] rounded-[8px] focus:outline-none focus:border-[#FF611C] focus:ring-1 focus:ring-[#FF611C]"
                  placeholder="Dell Latitude 5440 Datasheet.pdf"
                />
              </div>

              <div className="border-2 border-dashed border-[#EDEDED] rounded-[10px] p-6 text-center hover:border-[#FF611C]/50 transition cursor-pointer bg-[#F8FAFD]">
                <div className="mx-auto size-10 rounded-full bg-[#FFEFE8] text-[#FF611C] flex items-center justify-center mb-2">
                  <UploadIcon className="size-5" />
                </div>
                <p className="text-xs font-semibold text-[#3D3D49]">
                  Click to choose file or drag and drop
                </p>
                <p className="text-[11px] text-[#8C8C9A] mt-1">
                  PDF, PNG, JPG up to 10MB
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EDEDED]">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-[#575765] hover:text-[#3D3D49] hover:bg-gray-50 rounded-[8px] border border-[#EDEDED] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-semibold text-white rounded-[8px] transition hover:opacity-95"
                  style={{
                    background:
                      "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                  }}
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW DOCUMENT MODAL
          ========================================================================= */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[12px] border border-[#EDEDED] shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between p-5 border-b border-[#EDEDED]">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-[6px] bg-[#FFEFE8] text-[#FF611C] flex items-center justify-center">
                  <FileIcon className="size-4 text-[#FF611C]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#3D3D49] text-sm">
                    {viewingDoc.title}
                  </h3>
                  <p className="text-[11px] text-[#8C8C9A]">
                    {viewingDoc.subtitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="text-[#8C8C9A] hover:text-[#3D3D49] p-1 rounded-md transition"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="p-8 text-center bg-[#F8FAFD] flex flex-col items-center justify-center min-h-[220px]">
              <FileIcon className="size-16 text-[#FF611C] mb-3 opacity-80" />
              <p className="text-sm font-semibold text-[#3D3D49]">
                {viewingDoc.title}
              </p>
              <p className="text-xs text-[#8C8C9A] mt-1">
                Document preview is ready for download
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 p-4 border-t border-[#EDEDED] bg-white">
              <button
                type="button"
                onClick={() => setViewingDoc(null)}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-[#575765] hover:text-[#3D3D49] hover:bg-gray-50 rounded-[8px] border border-[#EDEDED] transition"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadDocument(viewingDoc);
                  setViewingDoc(null);
                }}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white rounded-[8px] transition hover:opacity-95"
                style={{
                  background:
                    "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
