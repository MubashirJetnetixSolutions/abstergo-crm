"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import SendQuotationModal from "@/components/quotations/SendQuotationModal";
import ApproveQuotationModal from "@/components/quotations/ApproveQuotationModal";
import ConvertToOrderModal from "@/components/quotations/ConvertToOrderModal";
import {
  ChevronLeftIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  EditIcon,
  SentIcon,
  AbstergoLogo,
  ProductsIcon,
  CheckCircleIcon,
  DeleteIcon,
  ExportIcon,
  OrdersIcon,
  FileIcon
} from "@/components/icons/Icons";

function ChevronDownIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block shrink-0 ${className}`}>
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const LOG_ITEMS = [
  { name: "Dell Latitude 5440", desc: "DL-5440", sku: "DL-5440", qty: 2, unitPrice: "5,200 CFA", discount: "12,000 CFA", tax: "8%", total: "27,000 CFA" },
  { name: "Dell Latitude 5440", desc: "DL-5440", sku: "DL-5440", qty: 2, unitPrice: "5,200 CFA", discount: "12,000 CFA", tax: "8%", total: "27,000 CFA" },
  { name: "Dell Latitude 5440", desc: "DL-5440", sku: "DL-5440", qty: 2, unitPrice: "5,200 CFA", discount: "12,000 CFA", tax: "8%", total: "27,000 CFA" },
  { name: "Dell Latitude 5440", desc: "DL-5440", sku: "DL-5440", qty: 2, unitPrice: "5,200 CFA", discount: "12,000 CFA", tax: "8%", total: "27,000 CFA" },
  { name: "Dell Latitude 5440", desc: "DL-5440", sku: "DL-5440", qty: 2, unitPrice: "5,200 CFA", discount: "12,000 CFA", tax: "8%", total: "27,000 CFA" },
  { name: "Dell Latitude 5440", desc: "DL-5440", sku: "DL-5440", qty: 2, unitPrice: "5,200 CFA", discount: "12,000 CFA", tax: "8%", total: "27,000 CFA" },
];

function QuotationLogCard({
  quoteId, status, statusColor, editorName, rejectedOn, defaultOpen = false,
}: {
  quoteId: string; status: string;
  statusColor: { border: string; bg: string; text: string };
  editorName: string; rejectedOn: string; defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const footerRow = (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 border-t border-[#EDEDED] bg-[#FAFAFA]">
      <span className="text-[11px] text-[#575765]">Edited by: <span className="font-medium text-[#3D3D49]">{editorName}</span></span>
      <div className="flex items-center gap-3">
        <span className="text-[11px] text-[#575765]">Rejected on: <span className="font-medium text-[#3D3D49]">{rejectedOn}</span></span>
        <button type="button" className="h-8 px-3 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] text-[11px] font-medium text-[#575765] cursor-pointer transition-colors">View</button>
        <button type="button" className="h-8 px-3 bg-[#2E2E38] hover:bg-[#1E1E24] text-white rounded-[6px] text-[11px] font-medium cursor-pointer transition-colors">Download</button>
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
      {/* Accordion Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2.5">
          <AbstergoLogo className="size-8" />
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-[#3D3D49] text-[11px] uppercase tracking-wider">Abstergo</span>
            <span className="font-medium text-[#575765] text-[11px] uppercase tracking-wider">CRM</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-0.5 rounded-[6px] border text-[11px] font-normal ${statusColor.border} ${statusColor.bg} ${statusColor.text}`}>{status}</span>
          <span className="px-3 py-1 rounded-[6px] bg-[#FF611C] text-white text-[11px] font-medium">
            <FileIcon className="size-4 text-white mr-2" />
            Quotation</span>
          <button
            type="button"
            onClick={() => setIsOpen((p) => !p)}
            className="size-8 rounded-[6px] border border-[#EDEDED] bg-white hover:bg-neutral-50 flex items-center justify-center text-[#575765] hover:text-[#3D3D49] cursor-pointer transition-colors"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            <ChevronDownIcon className={`size-4 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`} />
          </button>
        </div>
      </div>

      {/* Expanded body */}
      {isOpen && (
        <div className="px-5 pb-6 flex flex-col gap-6 border-t border-[#EDEDED]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pt-5 pb-5 border-b border-[#EDEDED]">
            <div className="flex flex-col gap-1.5">
              <span className="font-semibold text-[#575765] text-[13px]">Bill To</span>
              <div className="text-[#575765] text-[12px] leading-relaxed flex flex-col">
                <span>Carolo Technologies</span><span>+49 176 12345678</span><span>carlo.tech@email.com</span>
              </div>
            </div>
            <div className="border border-[#EDEDED] rounded-[14px] p-4 sm:px-6 sm:py-3.5 flex flex-col gap-2 min-w-[280px] sm:min-w-[300px]">
              <div className="flex items-center justify-between gap-8 text-[12px]"><span className="text-[#575765]">Quote Number:</span><span className="text-[#3D3D49] font-medium">{quoteId}</span></div>
              <div className="flex items-center justify-between gap-8 text-[12px]"><span className="text-[#575765]">Quotation Date:</span><span className="text-[#3D3D49] font-medium">June 24, 2026</span></div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-[#575765] text-[16px]">Items</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
                    <th className="py-2.5 px-3">Product</th><th className="py-2.5 px-3">SKU</th><th className="py-2.5 px-3">Items</th>
                    <th className="py-2.5 px-3">Unit Price</th><th className="py-2.5 px-3">Discount</th><th className="py-2.5 px-3">Tax</th>
                    <th className="py-2.5 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
                  {LOG_ITEMS.map((item, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="size-8 rounded-[6px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center text-[#FF611C] shrink-0"><ProductsIcon className="size-4" /></div>
                          <div className="flex flex-col min-w-0"><span className="font-medium truncate">{item.name}</span><span className="text-[11px] text-[#575765]">{item.desc}</span></div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-[#575765]">{item.sku}</td>
                      <td className="py-3 px-3 font-medium">{item.qty}</td>
                      <td className="py-3 px-3">{item.unitPrice}</td>
                      <td className="py-3 px-3 text-[#575765]">{item.discount}</td>
                      <td className="py-3 px-3 text-[#575765]">{item.tax}</td>
                      <td className="py-3 px-3 font-medium text-right">{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#EDEDED] text-[11px]">
            <div className="border border-[#EDEDED] rounded-[10px] p-4 sm:p-5 flex flex-col gap-2.5 md:col-span-2 bg-white">
              <span className="font-semibold text-[#3D3D49] text-[13px]">Managing Director&apos;s Comments:</span>
              <div className="text-[#575765] text-[12px] leading-relaxed flex flex-col gap-3">
                <p>Supply and preparation of a 12-month product warranty document, including customer and product information, warranty coverage, exclusions, warranty conditions, covered-failure procedures, customer rights, and company/customer signature sections.</p>
                <p>12-Month Product Warranty Document – Design, preparation, and printing of a customized product warranty certificate.</p>
              </div>
            </div>
            <div className="border border-[#EDEDED] rounded-[10px] p-4 sm:p-5 flex flex-col justify-between gap-3 md:col-span-1 bg-white">
              <div className="flex flex-col gap-2.5 text-[12px]">
                <div className="flex justify-between"><span className="text-[#575765]">Subtotal</span><span className="font-medium text-[#3D3D49]">6,090,000 CFA</span></div>
                <div className="flex justify-between"><span className="text-[#575765]">Discount</span><span className="font-medium text-[#3D3D49]">1,000 CFA</span></div>
                <div className="flex justify-between"><span className="text-[#575765]">Tax</span><span className="font-medium text-[#3D3D49]">6,000 CFA</span></div>
              </div>
              <div className="flex justify-between pt-3 border-t border-[#EDEDED] items-center">
                <span className="font-semibold text-[#3D3D49] text-[15px]">Total</span>
                <span className="font-semibold text-[#3D3D49] text-[15px]">6,500,000 CFA</span>
              </div>
            </div>
            <div className="border border-[#EDEDED] rounded-[10px] p-4 sm:p-5 flex flex-col gap-2 md:col-span-1 bg-white">
              <span className="font-semibold text-[#3D3D49] text-[13px]">Note</span>
              <p className="text-[#575765] text-[12px] leading-relaxed">Client requested quote for 2 units for personal use. Possible upsell to 4 units if budget allows.</p>
            </div>
            <div className="border border-[#EDEDED] rounded-[10px] p-4 sm:p-5 flex flex-col gap-2 md:col-span-1 bg-white">
              <span className="font-semibold text-[#3D3D49] text-[13px]">Terms &amp; Conditions</span>
              <p className="text-[#575765] text-[12px] leading-relaxed">Prices are valid for 30 days from quotation date. All prices are inclusive of VAT at 12%. Payment must be received before delivery.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#EDEDED]">
            <span className="text-[11px] text-[#575765]">Edited by: <span className="font-medium text-[#3D3D49]">{editorName}</span></span>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#575765]">Rejected on: <span className="font-medium text-[#3D3D49]">{rejectedOn}</span></span>
              <button type="button" className="h-8 px-3 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] text-[11px] font-medium text-[#575765] cursor-pointer">View</button>
              <button type="button" className="h-8 px-3 bg-[#2E2E38] hover:bg-[#1E1E24] text-white rounded-[6px] text-[11px] font-medium cursor-pointer">Download</button>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed footer */}
      {!isOpen && footerRow}
    </div>
  );
}

export default function QuotationDetailPage() {
  const router = useRouter();
  const params = useParams();
  const quoteId = (params?.id as string) || "QOT-0320";
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isConvertToOrderModalOpen, setIsConvertToOrderModalOpen] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const actionsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActionsOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        actionsMenuRef.current &&
        !actionsMenuRef.current.contains(event.target as Node)
      ) {
        setIsActionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isActionsOpen]);

  const handleCancelQuotation = () => {
    setIsActionsOpen(false);
    router.push("/quotations");
  };

  const handleDownloadPDF = () => {
    setIsActionsOpen(false);
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleDelete = handleCancelQuotation;

  const items = [
    {
      name: "Dell Latitude 5440 — Core i7 / 16G...",
      desc: "Intel Core i7-1365U, 16GB DDR4, 512GB NV...",
      sku: "DL-5440",
      items: 2,
      unitPrice: "5,200 CFA",
      discount: "12 000 CFA",
      tax: "8%",
      total: "127 000 CFA",
    },
    {
      name: "Dell Latitude 5440 — Core i7 / 16G...",
      desc: "Intel Core i7-1365U, 16GB DDR4, 512GB NV...",
      sku: "DL-5440",
      items: 2,
      unitPrice: "5,200 CFA",
      discount: "12 000 CFA",
      tax: "8%",
      total: "127 000 CFA",
    },
    {
      name: "Dell Latitude 5440 — Core i7 / 16G...",
      desc: "Intel Core i7-1365U, 16GB DDR4, 512GB NV...",
      sku: "DL-5440",
      items: 2,
      unitPrice: "5,200 CFA",
      discount: "12 000 CFA",
      tax: "8%",
      total: "127 000 CFA",
    },
    {
      name: "Dell Latitude 5440 — Core i7 / 16G...",
      desc: "Intel Core i7-1365U, 16GB DDR4, 512GB NV...",
      sku: "DL-5440",
      items: 2,
      unitPrice: "5,200 CFA",
      discount: "12 000 CFA",
      tax: "8%",
      total: "127 000 CFA",
    },
    {
      name: "Dell Latitude 5440 — Core i7 / 16G...",
      desc: "Intel Core i7-1365U, 16GB DDR4, 512GB NV...",
      sku: "DL-5440",
      items: 2,
      unitPrice: "5,200 CFA",
      discount: "12 000 CFA",
      tax: "8%",
      total: "127 000 CFA",
    },
    {
      name: "Dell Latitude 5440 — Core i7 / 16G...",
      desc: "Intel Core i7-1365U, 16GB DDR4, 512GB NV...",
      sku: "DL-5440",
      items: 2,
      unitPrice: "5,200 CFA",
      discount: "12 000 CFA",
      tax: "8%",
      total: "127 000 CFA",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Quotations" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* 1. Header & Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Link
                href="/quotations"
                className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] shrink-0"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight">
                    {quoteId}
                  </h1>
                  <span
                    className={`px-2.5 py-0.5 rounded-[6px] border text-[11px] font-normal leading-tight ${isConverted
                      ? "border-[#0D79E4] bg-[#E7F2FC] text-[#0D79E4]"
                      : "border-[#009689] bg-[#E5F4F3] text-[#009689]"
                      }`}
                  >
                    {isConverted ? "Converted" : "Approved"}
                  </span>
                </div>
                <p className="text-[14px] text-[#575765] font-normal">
                  Created on 19 Aug 2026 at 10:42 AM by{" "}
                  <span className="font-medium text-[#3D3D49]">Jean Martin</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Dynamic Action Button: Approve vs Convert to Order */}
              {!isApproved ? (
                <button
                  type="button"
                  onClick={() => setIsApproveModalOpen(true)}
                  className="h-11 px-4 bg-[#2EB865] hover:bg-[#25A257] text-white rounded-[8px] flex items-center gap-2 text-[13px] font-medium transition-colors cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                >
                  <CheckCircleIcon className="size-4 text-white" />
                  <span>Approve</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsConvertToOrderModalOpen(true)}
                  className="h-11 px-4 bg-[#2E2E38] hover:bg-[#1E1E24] text-white rounded-[8px] flex items-center gap-2 text-[13px] font-medium transition-colors cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                >
                  <OrdersIcon className="size-4 text-white" />
                  <span>Convert to Order</span>
                </button>
              )}

              {/* Edit Quotation Button */}
              <Link
                href="/quotations/new"
                className="h-11 px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] font-medium text-[13px] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <EditIcon className="size-4 text-[#575765]" />
                <span>Edit Quotation</span>
              </Link>

              {/* Three Dots More Options with Delete Dropdown */}
              <div className="relative inline-block text-left" ref={actionsMenuRef}>
                <button
                  type="button"
                  aria-label="More options"
                  onClick={() => setIsActionsOpen((prev) => !prev)}
                  className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
                >
                  <MoreVerticalIcon className="size-4" />
                </button>

                {isActionsOpen && (
                  <div className="absolute right-0 top-full mt-1.5 z-50 w-44 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 flex flex-col text-left animate-in fade-in zoom-in-95 duration-100 divide-y divide-[#F3F4F6]">
                    {/* Download PDF Option */}
                    <button
                      type="button"
                      onClick={handleDownloadPDF}
                      className="w-full px-3.5 py-2.5 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <ExportIcon className="size-4 text-[#575765]" />
                      <span>Download PDF</span>
                    </button>

                    {/* Cancel Quotation Option */}
                    <button
                      type="button"
                      onClick={handleCancelQuotation}
                      className="w-full px-3.5 py-2.5 text-left text-[12px] font-medium text-[#F92424] hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <DeleteIcon className="size-3.5 text-[#F92424]" />
                      <span>Cancel Quotation</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. Top Summary Info Bar */}
          <div className="w-full bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Customer</span>
              <div className="flex items-center gap-1.5 text-[#3D3D49] font-medium text-[11px]">
                <span className="truncate">Absto Technologies</span>
                <ExternalLinkIcon className="size-3.5 text-[#FF611C] shrink-0" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Sale Date</span>
              <span className="font-normal text-[#2B2523] text-[11px]">
                19 Aug 2026
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Value</span>
              <span className="font-medium text-[#2B2523] text-[11px]">
                428,500 CFA</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Technician</span>
              <div className="flex items-center gap-1.5 text-[#3D3D49] font-normal text-[11px]">
                <span className="truncate">Jean Martin</span>
                <ExternalLinkIcon className="size-3.5 text-[#FF611C] shrink-0" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Valid Until</span>
              <span className="font-normal text-[#2B2523] text-[11px]">
                12 Aug, 2026
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Admin Status</span>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-[6px] border border-[#009689] bg-[#E5F4F3] text-[#009689] text-[11px] font-normal">
                  Approved
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Quotation Status</span>
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-[6px] border text-[11px] font-normal ${isConverted
                    ? "border-[#0D79E4] bg-[#E7F2FC] text-[#0D79E4]"
                    : "border-[#009689] bg-[#E5F4F3] text-[#009689]"
                    }`}
                >
                  {isConverted ? "Converted" : "Revision requested"}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Main 2-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Columns: Quotation Document Overview */}
            <div className="lg:col-span-8 flex flex-col gap-6 bg-white border border-[#EDEDED] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-5">
              <div className="flex items-center border-b border-[#EDEDED] pb-2">
                <span className="font-medium text-[#575765] text-[20px]">
                  Overview
                </span>
              </div>

              {/* Quotation Document Card */}


              {/* ── Quotation Log & Decision History ── */}
              <div className="flex flex-col gap-4">
                <span className="font-medium text-[#575765] text-[20px]">
                  Quotation Log &amp; Decision History
                </span>

                <QuotationLogCard
                  quoteId="QOT-0320"
                  status="Revision Requested"
                  statusColor={{ border: "border-[#EDAC00]", bg: "bg-[#FDF7E5]", text: "text-[#EDAC00]" }}
                  editorName="Jean Martin"
                  rejectedOn="12 Aug, 2026"
                  defaultOpen={true}
                />

                <QuotationLogCard
                  quoteId="QOT-0320"
                  status="Revision Requested"
                  statusColor={{ border: "border-[#EDAC00]", bg: "bg-[#FDF7E5]", text: "text-[#EDAC00]" }}
                  editorName="Jean Martin"
                  rejectedOn="12 Aug, 2026"
                  defaultOpen={false}
                />
              </div>
            </div>

            {/* Right 4 Columns: Sticky Sidebar Cards */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-6">
              {/* Customer Details */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                <h3 className="font-medium text-[#575765] text-[20px]">
                  Customer Details
                </h3>
                <div className="flex items-center gap-3 pb-3 border-b border-[#EDEDED]">
                  <div className="size-10 rounded-full bg-[#F3EEFF] text-[#8A58FF] text-[11px] font-medium flex items-center justify-center shrink-0">
                    AS
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                      Argon Technology
                    </span>
                    <span className="text-[11px] text-[#575765]">
                      Business Customer
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#575765]">Email:</span>
                    <span className="text-[#3D3D49] truncate max-w-[180px]">
                      jason7654@gmail.com
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#575765]">Contact:</span>
                    <span className="text-[#3D3D49]">+226 25 30 12 34</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#575765]">Address:</span>
                    <span className="text-[#3D3D49] truncate max-w-[180px]">
                      Ouagadougou, Burkina Faso
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#575765]">Outstanding:</span>
                    <span className="text-[#F92424] font-medium">
                      1250 000 CFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#575765]">Payment Terms:</span>
                    <span className="text-[#3D3D49]">Monthly</span>
                  </div>
                </div>

                <button className="w-full py-2.5 bg-neutral-50 hover:bg-neutral-100 border border-[#EDEDED] rounded-[8px] flex items-center justify-center gap-2 text-[11px] text-[#3D3D49] font-medium cursor-pointer transition-colors">
                  <ExternalLinkIcon className="size-3.5 text-[#575765]" />
                  <span>View Details</span>
                </button>
              </div>


              {/* Activity Card */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                <h3 className="font-medium text-[#575765] text-[20px]">Activity</h3>
                <div className="flex flex-col divide-y divide-[#EDEDED]">
                  {[
                    { color: "bg-[#E7F2FC] text-[#0D79E4]", author: "Jean Martin", time: "2 min ago, 19 Aug 2026" },
                    { color: "bg-[#E5F4F3] text-[#009689]", author: "Jean Martin", time: "2 min ago, 19 Aug 2026" },
                    { color: "bg-[#FDF7E5] text-[#EDAC00]", author: "Jean Martin", time: "2 min ago, 19 Aug 2026" },
                    { color: "bg-[#E5F4F3] text-[#009689]", author: "Jean Martin", time: "2 min ago, 19 Aug 2026" },
                  ].map((act, idx) => (
                    <div key={idx} className="py-3 flex items-start gap-3 first:pt-0 last:pb-0">
                      <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${act.color}`}>
                        <SentIcon className="size-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-medium text-[#3D3D49]">
                          Quotation sent to customer via email
                        </span>
                        <span className="text-[11px] text-[#575765]">
                          {act.time}
                        </span>
                        <span className="text-[11px] text-[#575765] font-medium">
                          {act.author}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Revision Card */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h3 className="font-medium text-[#575765] text-[20px] pb-4 border-b border-[#EDEDED]">
                  Admin Revision
                </h3>
                <div className="flex flex-col">
                  {[1, 2, 3, 4].map((_, idx) => {
                    const isLast = idx === 3;
                    return (
                      <div key={idx} className="flex gap-3.5 relative">
                        {/* Dot & Connecting Line */}
                        <div className="flex flex-col items-center">
                          <span className="size-2 rounded-full bg-[#FF611C] shrink-0 mt-1.5" />
                          {!isLast && (
                            <span className="w-[1.5px] bg-[#EDEDED] grow my-1 min-h-[38px]" />
                          )}
                        </div>

                        {/* Content */}
                        <div
                          className={`flex flex-col gap-1 pb-5 ${isLast ? "pb-0" : ""
                            }`}
                        >
                          <p className="text-[13px] text-[#3D3D49] font-normal leading-snug">
                            Its tooo much and don&apos;t seem appropriate to me
                            please revise this.
                          </p>
                          <span className="text-[11px] text-[#8C8C9A] font-normal">
                            2 min ago, 19 Aug 2026
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Send Quotation Modal */}
      <SendQuotationModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        quotationCode="QOT-0265"
        customerName="Kumasi Polytechnic"
      />

      {/* Approve Quotation Modal (Image Mockup 2) */}
      <ApproveQuotationModal
        isOpen={isApproveModalOpen}
        onClose={() => setIsApproveModalOpen(false)}
        onConfirm={() => setIsApproved(true)}
        quotationCode="QOT-0536"
        customerName="Kumasi Polytechnic"
      />

      {/* Convert to Order Modal (Image Mockup 3) */}
      <ConvertToOrderModal
        isOpen={isConvertToOrderModalOpen}
        onClose={() => setIsConvertToOrderModalOpen(false)}
        onConfirm={() => setIsConverted(true)}
        quotationCode="QOT-0536"
        customerName="Kumasi Polytechnic"
      />
    </div>
  );
}
