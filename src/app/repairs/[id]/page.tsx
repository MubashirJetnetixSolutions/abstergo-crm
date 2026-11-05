"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  EditIcon,
  RepairIcon,
  CheckmarkCircleIcon,
  ProductsIcon,
  OrdersIcon,
  InvoicesIcon,
  PlusCircleIcon,
  DeleteIcon,
  DownloadIcon,
  EyeIcon,
  FileIcon,
  MoneyIcon,
  DeliveriesIcon,
  CancelCircleIcon,
  UploadIcon,
  XIcon,
  CalendarIcon,
  ChevronDownIcon,
  PrinterIcon,
} from "@/components/icons/Icons";

type RepairTabKey =
  | "Overview"
  | "Payments"
  | "Documents"
  | "Activity";

const TABS: RepairTabKey[] = [
  "Overview",
  "Payments",
  "Documents",
  "Activity",
];

export default function RepairDetailPage() {
  const params = useParams();
  const repairId = (params?.id as string) || "REP-1012";
  const [activeTab, setActiveTab] = useState<RepairTabKey>("Overview");

  // Repair workflow state: "idle" (shows Start Repair), "in_progress" (shows Complete Repair & Irreparable), or "ready_for_pickup" (shows Pickup Device)
  const [repairState, setRepairState] = useState<"idle" | "in_progress" | "ready_for_pickup">("idle");

  // Modals state
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isIrreparableModalOpen, setIsIrreparableModalOpen] = useState(false);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);

  // Form states matching mockups
  const [initialDiagnose, setInitialDiagnose] = useState(
    "Faulty display cable and loose GPU connection. Display panel intact but cable needs replacement."
  );
  const [finalDiagnose, setFinalDiagnose] = useState(
    "1. Power button unresponsive after restart.\n2. Screen flickering intermittently.\n3. Sometimes goes completely black.\n4. Power button unresponsive after restart."
  );
  const [irreparableReason, setIrreparableReason] = useState(
    "1. Power button unresponsive after restart.\n2. Screen flickering intermittently.\n3. Sometimes goes completely black.\n4. Power button unresponsive after restart."
  );

  // Payments State (Image 1 Mockup)
  const [payments, setPayments] = useState([
    {
      id: "pay-1",
      code: "PAY-EXP-001",
      date: "12 Aug, 2026",
      method: "Bank Transfer",
      amount: "61,925 CFA",
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
      amount: "61,925 CFA",
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
      amount: "61,925 CFA",
      reference: "TXN-GH-44120",
      initials: "NE",
      avatarBg: "bg-[#FFEDD5]",
      avatarColor: "text-[#EA580C]",
      receivedBy: "Nathan Elionos",
      lastUpdated: "12 Aug, 2026",
    },
  ]);
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("65 000");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [paymentDate, setPaymentDate] = useState("07/09/2026");
  const [paymentReference, setPaymentReference] = useState(repairId);

  // Documents State (Image 2 Mockup with Real File Uploader)
  const [documents, setDocuments] = useState([
    {
      id: "doc-1",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file • 2.5mb",
    },
    {
      id: "doc-2",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file • 2.5mb",
    },
    {
      id: "doc-3",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file • 2.5mb",
    },
    {
      id: "doc-4",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file • 2.5mb",
    },
    {
      id: "doc-5",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file • 2.5mb",
    },
  ]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [viewingDoc, setViewingDoc] = useState<{ id: string; title: string; subtitle: string } | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const newDocs = Array.from(files).map((file, idx) => ({
      id: `doc-${Date.now()}-${idx}`,
      title: file.name,
      subtitle: `${file.type.includes("pdf") ? "PDF document" : "Image file"} • ${(file.size / (1024 * 1024)).toFixed(1)}mb`,
    }));
    setDocuments((prev) => [...newDocs, ...prev]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const handleDownloadDocument = (doc: { title: string }) => {
    const element = document.createElement("a");
    const file = new Blob([`Content for ${doc.title}`], { type: "application/pdf" });
    element.href = URL.createObjectURL(file);
    element.download = doc.title;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleRecordPayment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!paymentAmount) return;
    const newItem = {
      id: `pay-${Date.now()}`,
      code: `PAY-EXP-00${payments.length + 1}`,
      date: paymentDate || "12 Aug, 2026",
      method: paymentMethod,
      amount: `${paymentAmount} CFA`,
      reference: paymentReference || `TXN-GH-${Math.floor(10000 + Math.random() * 90000)}`,
      initials: "NE",
      avatarBg: "bg-[#F3E8FF]",
      avatarColor: "text-[#7C3AED]",
      receivedBy: "Nathan Elionos",
      lastUpdated: "12 Aug, 2026",
    };
    setPayments([newItem, ...payments]);
    setIsPaymentDrawerOpen(false);
  };

  // Activity State (Image 3 Mockup)
  const [activities] = useState([
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
      icon: RepairIcon,
      title: "Repair created — warranty repair",
      subtitle: "Ama Owusu",
      time: "2 min ago",
      date: "19 Aug 2026",
    },
  ]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Repairs" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/repairs"
                className="flex size-11 items-center justify-center rounded-[8px] border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
              >
                <ChevronLeftIcon className="size-5" />
              </Link>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="font-semibold text-[#3D3D49] text-[24px] leading-tight">
                    {repairId}
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-medium bg-[#E7F2FC] text-[#1E75FF] border border-[#C2E0FC]">
                    Received
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-medium bg-[#FFF0F0] text-[#E02D3C] border border-[#FFD5D8]">
                    • High
                  </span>
                </div>
                <p className="text-[14px] text-[#8C8C9A]">
                  Created on 19 Aug 2026 at 10:42 AM by Jean Martin
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {repairState === "idle" ? (
                <button
                  type="button"
                  onClick={() => setIsStartModalOpen(true)}
                  className="flex items-center gap-2 rounded-[8px] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 cursor-pointer"
                  style={{
                    background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                  }}
                >
                  <RepairIcon className="size-4 text-white" />
                  <span>Start Repair</span>
                </button>
              ) : repairState === "in_progress" ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsCompleteModalOpen(true)}
                    className="flex items-center gap-2 rounded-[8px] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 cursor-pointer bg-[#34A853] hover:bg-[#2e9449]"
                  >
                    <CheckmarkCircleIcon className="size-4.5 text-white" />
                    <span>Complete Repair</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsIrreparableModalOpen(true)}
                    className="flex items-center gap-2 rounded-[8px] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 cursor-pointer bg-[#D93025] hover:bg-[#c3281e]"
                  >
                    <CancelCircleIcon className="size-4.5 text-white" />
                    <span>Irreparable</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsPickupModalOpen(true)}
                  className="flex items-center gap-2 rounded-[8px] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-95 cursor-pointer bg-[#34A853] hover:bg-[#2e9449]"
                >
                  <CheckmarkCircleIcon className="size-4.5 text-white" />
                  <span>Pickup Device</span>
                </button>
              )}

              <Link
                href="/repairs/new"
                className="flex items-center gap-2 rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-2.5 text-sm font-semibold text-[#3D3D49] shadow-sm transition hover:bg-gray-50"
              >
                <EditIcon className="size-4 text-[#575765]" />
                <span>Edit Purchase</span>
              </Link>

              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-[8px] border border-[#E9ECEF] bg-white text-[#575765] shadow-sm hover:bg-gray-50 transition cursor-pointer"
              >
                <MoreVerticalIcon className="size-5" />
              </button>
            </div>
          </div>

          {/* Top Meta Summary Bar */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 rounded-[12px] border border-[#E9ECEF] bg-white p-5 shadow-sm text-xs">
            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[16px]">Customer</p>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#3D3D49] text-sm">
                  Absto Technologies
                </span>
                <ExternalLinkIcon className="size-3.5 text-[#8C8C9A]" />
              </div>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[16px]">Repair Date</p>
              <p className="font-semibold text-[#3D3D49] text-sm">
                19 Aug 2026
              </p>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[16px]">Days in Repair</p>
              <p className="font-semibold text-[#3D3D49] text-sm">2 Days</p>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[16px]">Technician</p>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#3D3D49] text-sm">
                  Jean Martin
                </span>
                <ExternalLinkIcon className="size-3.5 text-[#8C8C9A]" />
              </div>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[16px]">Expected Date</p>
              <p className="font-semibold text-[#3D3D49] text-sm">
                12 Aug, 2026
              </p>
            </div>

            <div>
              <p className="text-[#8C8C9A] font-medium mb-1 text-[16px]">Repair Status</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-xs font-medium bg-[#E7F2FC] text-[#1E75FF]">
                Received
              </span>
            </div>
          </div>

          {/* 5 KPI Stat Cards (Matching mockups with 'value CFA' format) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-sm">
              <span className="text-[14px] text-[#8C8C9A] font-medium">
                Parts Cost
              </span>
              <p className="text-[22px] font-bold text-[#3D3D49] mt-2">
                8,500 CFA
              </p>
            </div>

            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-sm">
              <span className="text-[14px] text-[#8C8C9A] font-medium">
                Labor Cost
              </span>
              <p className="text-[22px] font-bold text-[#3D3D49] mt-2">
                15,000 CFA
              </p>
            </div>

            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-sm">
              <span className="text-[14px] text-[#8C8C9A] font-medium">Paid</span>
              <p className="text-[22px] font-bold text-[#00A389] mt-2">0 CFA</p>
            </div>

            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-sm">
              <span className="text-[14px] text-[#8C8C9A] font-medium">Balance</span>
              <p className="text-[22px] font-bold text-[#F92424] mt-2">
                49,280 CFA
              </p>
            </div>

            <div className="rounded-[12px] border border-[#EDEDED] bg-white p-5 shadow-sm">
              <span className="text-[14px] text-[#8C8C9A] font-medium">
                Grand Total
              </span>
              <p className="text-[22px] font-bold text-[#3D3D49] mt-2">
                49,280 CFA
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#E9ECEF] gap-6 text-sm font-medium">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-1 text-[16px] transition relative ${activeTab === tab
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

          {/* Tab Content */}
          {activeTab === "Overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Main (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Repair Information */}
                <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm">
                  <h2 className="text-[20px] font-semibold text-[#3D3D49] mb-4 pb-3 border-b border-[#E9ECEF]">
                    Repair Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 text-xs">
                    <div className="flex justify-between sm:justify-start sm:gap-8">
                      <span className="text-[#8C8C9A] w-28">Type:</span>
                      <span className="font-semibold text-[#3D3D49]">
                        Warranty
                      </span>
                    </div>
                    <div className="flex justify-between sm:justify-start sm:gap-8">
                      <span className="text-[#8C8C9A] w-28">Received:</span>
                      <span className="font-semibold text-[#3D3D49]">
                        2026-08-05
                      </span>
                    </div>
                    <div className="flex justify-between sm:justify-start sm:gap-8">
                      <span className="text-[#8C8C9A] w-28">Condition:</span>
                      <span className="font-semibold text-[#3D3D49]">
                        Normal
                      </span>
                    </div>
                    <div className="flex justify-between sm:justify-start sm:gap-8">
                      <span className="text-[#8C8C9A] w-28">Expected:</span>
                      <span className="font-semibold text-[#3D3D49]">
                        2026-08-12
                      </span>
                    </div>
                    <div className="flex justify-between sm:justify-start sm:gap-8">
                      <span className="text-[#8C8C9A] w-28">Accessories:</span>
                      <span className="font-semibold text-[#3D3D49]">
                        Original box, cable, charger
                      </span>
                    </div>
                    <div className="flex justify-between sm:justify-start sm:gap-8">
                      <span className="text-[#8C8C9A] w-28">Technician:</span>
                      <span className="font-semibold text-[#3D3D49]">
                        Jean Martin
                      </span>
                    </div>
                    <div className="flex justify-between sm:justify-start sm:gap-8">
                      <span className="text-[#8C8C9A] w-28">Reference:</span>
                      <span className="font-semibold text-[#3D3D49]">
                        ORD-1024
                      </span>
                    </div>
                    <div className="flex justify-between sm:justify-start sm:gap-8">
                      <span className="text-[#8C8C9A] w-28">Created by:</span>
                      <span className="font-semibold text-[#3D3D49]">
                        Jean Martin
                      </span>
                    </div>
                    <div className="flex justify-between sm:justify-start sm:gap-8">
                      <span className="text-[#8C8C9A] w-28">Priority:</span>
                      <span className="font-semibold text-[#E02D3C]">
                        High
                      </span>
                    </div>
                    <div className="flex justify-between sm:justify-start sm:gap-8">
                      <span className="text-[#8C8C9A] w-28">Created at:</span>
                      <span className="font-semibold text-[#3D3D49]">
                        19 Aug 2026, 10:42 AM
                      </span>
                    </div>
                  </div>
                </div>

                {/* Issues & Diagnosis */}
                <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm space-y-4">
                  <h2 className="text-[20px] font-semibold text-[#3D3D49]">
                    Issues & Diagnosis
                  </h2>

                  <div>
                    <h3 className="text-xs font-semibold text-[#8C8C9A] uppercase tracking-wider mb-1.5">
                      Reported Issue
                    </h3>
                    <p className="text-xs text-[#3D3D49] leading-relaxed">
                      Screen flickering intermittently. Sometimes goes completely black. Power button unresponsive after restart.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-[#E02D3C] uppercase tracking-wider mb-1.5">
                      Initial Diagnosis
                    </h3>
                    <p className="text-xs text-[#3D3D49] leading-relaxed">
                      Faulty display cable and loose GPU connection. Display panel intact but cable needs replacement.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E9ECEF]">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-semibold text-[#0D9488] uppercase tracking-wider">
                        Final Diagnosis
                      </h3>
                      <button
                        type="button"
                        className="flex items-center gap-1.5 text-xs font-medium text-[#3D3D49] border border-[#E9ECEF] rounded-[6px] px-2.5 py-1 hover:bg-gray-50 transition"
                      >
                        <EditIcon className="size-3.5" />
                        <span>Edit Diagnose</span>
                      </button>
                    </div>
                    <ol className="list-decimal list-inside text-xs text-[#3D3D49] space-y-1">
                      <li>Power button unresponsive after restart.</li>
                      <li>Screen flickering intermittently.</li>
                      <li>Sometimes goes completely black.</li>
                      <li>Power button unresponsive after restart.</li>
                    </ol>
                  </div>
                </div>

                {/* Customer Notes */}
                <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm">
                  <h2 className="text-[20px] font-semibold text-[#3D3D49] mb-3">
                    Customer Notes
                  </h2>
                  <p className="text-xs text-[#575765] leading-relaxed">
                    This is the primary laptop for our finance director. Please prioritize.
                  </p>
                </div>

                {/* Linked Records */}
                <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm">
                  <h2 className="text-[20px] font-semibold text-[#3D3D49] mb-4">
                    Linked Records
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-[8px] border border-[#E9ECEF] p-4 flex flex-col justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-[8px] bg-orange-50 text-[#FF611C]">
                          <OrdersIcon className="size-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#3D3D49]">
                            Order
                          </p>
                          <p className="text-sm font-semibold text-[#3D3D49]">
                            ORD-1024
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#E9ECEF]">
                        <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                          Partial
                        </span>
                        <Link
                          href="/orders/ORD-1024"
                          className="text-xs font-semibold text-[#3D3D49] hover:text-[#FF611C] flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ExternalLinkIcon className="size-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Customer Details */}
                <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm space-y-4">
                  <h2 className="text-[20px] font-semibold text-[#3D3D49] pb-3 border-b border-[#E9ECEF]">
                    Customer Details
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700">
                      AS
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#3D3D49]">
                        Argon Technology
                      </p>
                      <p className="text-xs text-[#8C8C9A]">
                        Business Customer
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs border-t border-[#E9ECEF] pt-3">
                    <div className="flex justify-between">
                      <span className="text-[#8C8C9A]">Email:</span>
                      <span className="font-medium text-[#3D3D49]">
                        jason7654@gmail.com
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C8C9A]">Contact:</span>
                      <span className="font-medium text-[#3D3D49]">
                        +226 25 30 12 3...
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C8C9A]">Address:</span>
                      <span className="font-medium text-[#3D3D49]">
                        Ouagadougou, Burkina Fas...
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 rounded-[8px] border border-[#E9ECEF] bg-white py-2 text-xs font-semibold text-[#3D3D49] hover:bg-gray-50 transition"
                  >
                    <ExternalLinkIcon className="size-3.5" />
                    <span>View Details</span>
                  </button>
                </div>

                {/* Device Details */}
                <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm space-y-3.5">
                  <h2 className="text-[20px] font-semibold text-[#3D3D49] pb-3 border-b border-[#E9ECEF]">
                    Device Details
                  </h2>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#8C8C9A]">Product:</span>
                      <span className="font-medium text-[#3D3D49] text-right">
                        Samsung Galaxy S24 Ultra 256...
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C8C9A]">SKU:</span>
                      <span className="font-medium text-[#3D3D49]">
                        PHN-SAM-S24U
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C8C9A]">Sale Date:</span>
                      <span className="font-medium text-[#3D3D49]">
                        2026-05-10
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C8C9A]">Warranty:</span>
                      <span className="font-semibold text-emerald-600">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Parts & Costs (Commented out per user request - uncomment later) */}
          {/* activeTab === "Parts & Costs" && (
            <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-semibold text-[#3D3D49]">
                  Parts & Replacement Costs
                </h2>
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-[8px] bg-[#1C1D22] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-black transition"
                >
                  <PlusCircleIcon className="size-4 text-white" />
                  <span>Add Part</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-[8px] border border-[#E9ECEF]">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-[#E9ECEF] bg-[#F8FAFD] text-[#8C8C9A] font-medium">
                    <tr>
                      <th className="py-3 px-4">Part Name</th>
                      <th className="py-3 px-3">SKU</th>
                      <th className="py-3 px-3">Quantity</th>
                      <th className="py-3 px-3">Unit Cost</th>
                      <th className="py-3 px-3">Total Cost</th>
                      <th className="py-3 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E9ECEF]">
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3 px-4 font-semibold text-[#3D3D49]">
                        Samsung OLED Display Assembly
                      </td>
                      <td className="py-3 px-3 text-[#575765]">DSP-SAM-S24</td>
                      <td className="py-3 px-3 font-bold text-[#3D3D49]">1</td>
                      <td className="py-3 px-3 text-[#3D3D49]">8,500 CFA</td>
                      <td className="py-3 px-3 font-bold text-[#3D3D49]">
                        8,500 CFA</td>
                      <td className="py-3 px-3">
                        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[11px] font-medium">
                          Installed
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="py-3 px-4 font-semibold text-[#3D3D49]">
                        Display Flex Ribbon Cable
                      </td>
                      <td className="py-3 px-3 text-[#575765]">CAB-FLX-004</td>
                      <td className="py-3 px-3 font-bold text-[#3D3D49]">1</td>
                      <td className="py-3 px-3 text-[#3D3D49]">1,200 CFA</td>
                      <td className="py-3 px-3 font-bold text-[#3D3D49]">
                        1,200 CFA</td>
                      <td className="py-3 px-3">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px] font-medium">
                          Pending
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) */}

          {/* =========================================================================
              TAB 2: Payments (Image 1 Mockup)
              ========================================================================= */}
          {activeTab === "Payments" && (
            <div className="space-y-4">
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsPaymentDrawerOpen(true)}
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
              TAB 3: Documents (Image 2 Mockup with Real File Uploader)
              ========================================================================= */}
          {activeTab === "Documents" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-[20px] font-semibold text-[#3D3D49]">
                  Documents
                </h2>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    multiple
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
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
              </div>

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
              TAB 4: Activity (Image 3 Mockup)
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
          MODAL 1: Start Repair Modal (Image 1 Mockup)
          ========================================================================= */}
      {isStartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[12px] border border-[#EDEDED] shadow-2xl w-full max-w-[560px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#EDEDED]">
              <h3 className="font-semibold text-[#3D3D49] text-[18px]">
                Start Repair
              </h3>
              <button
                type="button"
                onClick={() => setIsStartModalOpen(false)}
                className="text-[#8C8C9A] hover:text-[#3D3D49] p-1 rounded-md transition cursor-pointer"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-2">
              <label className="block text-xs sm:text-[13px] font-medium text-[#575765]">
                Initial Diagnose
              </label>
              <textarea
                rows={4}
                value={initialDiagnose}
                onChange={(e) => setInitialDiagnose(e.target.value)}
                className="w-full rounded-[8px] border border-[#EDEDED] p-3.5 text-xs sm:text-sm text-[#3D3D49] focus:outline-none focus:border-[#FF611C] focus:ring-1 focus:ring-[#FF611C] leading-relaxed resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#EDEDED] bg-white">
              <button
                type="button"
                onClick={() => setIsStartModalOpen(false)}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#575765] bg-white border border-[#EDEDED] rounded-[8px] hover:bg-gray-50 transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setRepairState("in_progress");
                  setIsStartModalOpen(false);
                }}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white rounded-[8px] shadow-sm transition hover:opacity-95 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Start Repair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: Complete Repair Modal (Image 3 Mockup)
          ========================================================================= */}
      {isCompleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[12px] border border-[#EDEDED] shadow-2xl w-full max-w-[560px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#EDEDED]">
              <h3 className="font-semibold text-[#3D3D49] text-[18px]">
                Complete Repair
              </h3>
              <button
                type="button"
                onClick={() => setIsCompleteModalOpen(false)}
                className="text-[#8C8C9A] hover:text-[#3D3D49] p-1 rounded-md transition cursor-pointer"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-2">
              <label className="block text-xs sm:text-[13px] font-medium text-[#575765]">
                Final Diagnose
              </label>
              <textarea
                rows={5}
                value={finalDiagnose}
                onChange={(e) => setFinalDiagnose(e.target.value)}
                className="w-full rounded-[8px] border border-[#EDEDED] p-3.5 text-xs sm:text-sm text-[#3D3D49] focus:outline-none focus:border-[#FF611C] focus:ring-1 focus:ring-[#FF611C] leading-relaxed resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#EDEDED] bg-white">
              <button
                type="button"
                onClick={() => setIsCompleteModalOpen(false)}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#575765] bg-white border border-[#EDEDED] rounded-[8px] hover:bg-gray-50 transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setRepairState("ready_for_pickup");
                  setIsCompleteModalOpen(false);
                }}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#34A853] hover:bg-[#2e9449] rounded-[8px] shadow-sm transition hover:opacity-95 cursor-pointer"
              >
                Complete Repair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 3: Irreparable Modal (Image 4 Mockup)
          ========================================================================= */}
      {isIrreparableModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[12px] border border-[#EDEDED] shadow-2xl w-full max-w-[560px] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4.5 border-b border-[#EDEDED]">
              <h3 className="font-semibold text-[#3D3D49] text-[18px]">
                Irreparable
              </h3>
              <button
                type="button"
                onClick={() => setIsIrreparableModalOpen(false)}
                className="text-[#8C8C9A] hover:text-[#3D3D49] p-1 rounded-md transition cursor-pointer"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-2">
              <label className="block text-xs sm:text-[13px] font-medium text-[#575765]">
                Reason
              </label>
              <textarea
                rows={5}
                value={irreparableReason}
                onChange={(e) => setIrreparableReason(e.target.value)}
                className="w-full rounded-[8px] border border-[#EDEDED] p-3.5 text-xs sm:text-sm text-[#3D3D49] focus:outline-none focus:border-[#FF611C] focus:ring-1 focus:ring-[#FF611C] leading-relaxed resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#EDEDED] bg-white">
              <button
                type="button"
                onClick={() => setIsIrreparableModalOpen(false)}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#575765] bg-white border border-[#EDEDED] rounded-[8px] hover:bg-gray-50 transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setRepairState("idle");
                  setIsIrreparableModalOpen(false);
                }}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white rounded-[8px] shadow-sm transition hover:opacity-95 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Mark as Irreparable
              </button>
            </div>
          </div>
        </div>
      )}
      {/* =========================================================================
          OFF-CANVAS: ADD PAYMENT DRAWER (Image Mockup)
          ========================================================================= */}
      {isPaymentDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop overlay */}
          <div
            onClick={() => setIsPaymentDrawerOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
          />

          {/* Slide-over Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-[480px] bg-white shadow-2xl flex flex-col justify-between border-l border-[#EDEDED] animate-in slide-in-from-right duration-200 overflow-y-auto">
              {/* Top Header */}
              <div className="p-6 border-b border-[#EDEDED] flex items-center justify-between gap-4 shrink-0">
                <h2 className="font-semibold text-[#2B2523] text-[16px] leading-tight">
                  Add Payment
                </h2>
                <button
                  type="button"
                  onClick={() => setIsPaymentDrawerOpen(false)}
                  className="size-8 hover:bg-neutral-100 text-[#575765] hover:text-[#2B2523] rounded-[6px] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <XIcon className="size-4" />
                </button>
              </div>

              {/* Drawer Body Content */}
              <form onSubmit={handleRecordPayment} className="flex-1 p-6 flex flex-col gap-6">
                {/* Top 3 Metric Stat Cards */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <span className="text-[12px] text-[#575765] font-normal">
                      Repair Total
                    </span>
                    <span className="text-[13px] sm:text-[14px] font-semibold text-[#1E75FF] tracking-tight truncate">
                      500.00 CFA
                    </span>
                  </div>

                  <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <span className="text-[12px] text-[#575765] font-normal">
                      Paid
                    </span>
                    <span className="text-[13px] sm:text-[14px] font-semibold text-[#00A389] tracking-tight truncate">
                      300.00 CFA
                    </span>
                  </div>

                  <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                    <span className="text-[12px] text-[#575765] font-normal">
                      Outstanding
                    </span>
                    <span className="text-[13px] sm:text-[14px] font-semibold text-[#F92424] tracking-tight truncate">
                      200.00 CFA
                    </span>
                  </div>
                </div>

                {/* Payment Details Form */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold text-[#2B2523] text-[14px]">
                    Payment Details
                  </h3>

                  {/* Amount */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-[#575765] font-normal">
                      Amount (CFA)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C]"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col pointer-events-none text-[#575765]">
                        <span className="text-[10px] leading-tight cursor-pointer">▲</span>
                        <span className="text-[10px] leading-tight cursor-pointer">▼</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-[#575765] font-normal">
                      Payment Method
                    </label>
                    <div className="relative">
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Mobile Money">Mobile Money</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Cheque">Cheque</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Payment Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-[#575765] font-normal">
                      Payment Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C] pr-10"
                      />
                      <CalendarIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Reference */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-[#575765] font-normal">
                      Reference
                    </label>
                    <input
                      type="text"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      className="w-full h-11 px-4 py-2.5 bg-[#F9F9FB] border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>
                </div>
              </form>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-[#EDEDED] bg-white flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPaymentDrawerOpen(false)}
                  className="flex-1 h-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#2B2523] font-medium text-[13px] transition-colors cursor-pointer shadow-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRecordPayment}
                  className="flex-1 h-11 rounded-[8px] text-white font-medium text-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                  }}
                >
                  <CheckmarkCircleIcon className="size-4 text-white" />
                  <span>Record Payment</span>
                </button>
              </div>
            </div>
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
                className="text-[#8C8C9A] hover:text-[#3D3D49] p-1 rounded-md transition cursor-pointer"
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
                className="px-4 py-2 text-xs sm:text-sm font-medium text-[#575765] hover:text-[#3D3D49] hover:bg-gray-50 rounded-[8px] border border-[#EDEDED] transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDownloadDocument(viewingDoc);
                  setViewingDoc(null);
                }}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-white rounded-[8px] transition hover:opacity-95 cursor-pointer"
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
      {/* =========================================================================
          MODAL: Pickup Device Modal (Image Mockup 2)
          ========================================================================= */}
      {isPickupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[16px] border border-[#EDEDED] shadow-2xl w-full max-w-[480px] p-6 text-center animate-in fade-in zoom-in-95 duration-150">
            <div className="size-12 rounded-full bg-[#E5F4F3] flex items-center justify-center text-[#009689] mx-auto mb-3">
              <CheckmarkCircleIcon className="size-6 text-[#009689]" />
            </div>

            <h3 className="text-[19px] font-semibold text-[#2B2523]">
              Pickup Device
            </h3>

            <p className="text-xs text-[#575765] mt-1">
              Your Repair - <span className="text-[#FF611C] font-semibold">{repairId}</span> completed
            </p>

            <h4 className="text-[17px] font-semibold text-[#FF611C] mt-3">
              Samsung Galaxy S24 Ultra 256GB
            </h4>

            <p className="text-xs text-[#575765] mt-1">
              Absto Technologies
            </p>

            <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-[#EDEDED]">
              <button
                type="button"
                onClick={() => setIsPickupModalOpen(false)}
                className="flex-1 py-2.5 text-sm font-medium text-[#575765] hover:text-[#3D3D49] hover:bg-neutral-50 rounded-[8px] border border-[#EDEDED] transition cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 text-sm font-semibold text-white rounded-[8px] shadow-sm hover:opacity-95 transition flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                <PrinterIcon className="size-4 text-white" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
