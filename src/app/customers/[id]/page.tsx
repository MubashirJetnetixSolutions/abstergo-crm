"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  EditIcon,
  EyeIcon,
  DeleteIcon,
  MoreVerticalIcon,
  UploadIcon,
  FileIcon,
  OrdersIcon,
  QuotationsIcon,
  InventoryIcon,
  PurchasesIcon,
  DeliveriesIcon,
  ExpenseIcon,
} from "@/components/icons/Icons";

type TabKey =
  | "Overview"
  | "Orders"
  | "Sales"
  | "Quotations"
  | "Invoices"
  | "Payments"
  | "Deliveries"
  | "Repairs"
  | "Documents"
  | "Activity";

const TABS: TabKey[] = [
  "Overview",
  "Orders",
  "Sales",
  "Quotations",
  "Invoices",
  "Payments",
  "Deliveries",
  "Repairs",
  "Documents",
  "Activity",
];

/* =========================================================================
   REUSABLE: Table Row Action Dropdown Menu
   ========================================================================= */
interface ActionItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  danger?: boolean;
}

function TableRowActionDropdown({
  isOpen,
  onToggle,
  onClose,
  items,
  dropUp = false,
}: {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  items: ActionItem[];
  dropUp?: boolean;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      className="relative inline-block text-left"
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="size-7 bg-white hover:bg-neutral-100 border border-[#EDEDED] rounded-[6px] inline-flex items-center justify-center text-[#575765] cursor-pointer transition-colors"
        aria-label="Actions"
      >
        <MoreVerticalIcon className="size-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 ${
            dropUp ? "bottom-full mb-1" : "top-full mt-1"
          } z-50 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 flex flex-col text-left animate-in fade-in zoom-in-95 duration-100`}
        >
          {items.map((item, idx) => {
            const content = (
              <>
                {item.icon}
                <span>{item.label}</span>
              </>
            );

            const className = `w-full px-3 py-2 text-left text-[12px] font-medium flex items-center gap-2 transition-colors cursor-pointer ${
              item.danger
                ? "text-[#F92424] hover:bg-red-50"
                : "text-[#3D3D49] hover:bg-[#F8FAFD]"
            }`;

            if (item.href) {
              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => onClose()}
                  className={className}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  item.onClick?.();
                  onClose();
                }}
                className={className}
              >
                {content}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   MAIN COMPONENT: CustomerDetailPage
   ========================================================================= */
export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = (params?.id as string) || "CUST-0008";
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");

  // Top action bar more options dropdown
  const [isTopMenuOpen, setIsTopMenuOpen] = useState(false);
  const topMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (topMenuRef.current && !topMenuRef.current.contains(event.target as Node)) {
        setIsTopMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteCustomer = () => {
    setIsTopMenuOpen(false);
    if (confirm("Are you sure you want to delete this customer?")) {
      router.push("/customers");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* 1. Header Profile & Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Link
                href="/customers"
                className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] shrink-0"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>

              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight">
                    Abena Amponsah
                  </h1>

                  {/* Status & Type Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-[6px] border border-[#009689] bg-[#E5F4F3] text-[#009689] text-[11px] font-normal leading-tight">
                      Active
                    </span>
                    <span className="px-2 py-0.5 rounded-[6px] border border-[#8A58FF] bg-[#F3EEFF] text-[#8A58FF] text-[11px] font-normal leading-tight">
                      Individual
                    </span>
                    <span className="px-2 py-0.5 rounded-[6px] border border-[#0D79E4] bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-normal leading-tight">
                      Reseller
                    </span>
                  </div>
                </div>

                <p className="text-[14px] text-[#575765] font-normal">
                  Created on 19 Aug 2026 at 10:42 AM by{" "}
                  <span className="font-medium text-[#3D3D49]">Jean Martin</span>
                </p>
              </div>
            </div>

            {/* Top Right Action Buttons */}
            <div className="flex items-center gap-2">
              <Link
                href="/customers/new"
                className="h-11 px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] font-medium text-[11px] transition-colors"
              >
                <EditIcon className="size-4 text-[#575765]" />
                <span>Edit Customer</span>
              </Link>

              {/* Three dots dropdown with Delete option */}
              <div className="relative" ref={topMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsTopMenuOpen((prev) => !prev)}
                  aria-label="More options"
                  className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
                >
                  <MoreVerticalIcon className="size-4" />
                </button>

                {isTopMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 z-50 w-36 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 flex flex-col text-left animate-in fade-in zoom-in-95 duration-100">
                    <button
                      type="button"
                      onClick={handleDeleteCustomer}
                      className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#F92424] hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <DeleteIcon className="size-3.5 text-[#F92424]" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. Top Summary Info Bar */}
          <div className="w-full bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">
                Customer ID
              </span>
              <span className="font-semibold text-[#2B2523] text-[11px]">
                {customerId}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Type</span>
              <span className="font-normal text-[#2B2523] text-[11px]">
                Individual
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Email</span>
              <span className="font-normal text-[#2B2523] text-[11px] truncate">
                abena.amponsah@gmail.com
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Phone</span>
              <span className="font-normal text-[#2B2523] text-[11px]">
                +233 54 221 8874
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Status</span>
              <div>
                <span className="inline-block px-2 py-0.5 rounded-[6px] border border-[#009689] bg-[#E5F4F3] text-[#009689] text-[11px] font-normal">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* 3. Four Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Orders */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">
                Total Orders
              </span>
              <span className="text-[11px] font-semibold text-[#2B2523] tracking-tight">
                6 500 000 CFA
              </span>
            </div>

            {/* Total Sales */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">
                Total Sales
              </span>
              <span className="text-[11px] font-semibold text-[#8A58FF] tracking-tight">
                428,500 CFA
              </span>
            </div>

            {/* Outstanding */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">
                Outstanding
              </span>
              <span className="text-[11px] font-semibold text-[#F92424] tracking-tight">
                48,500 CFA
              </span>
            </div>

            {/* Total Paid */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">
                Total Paid
              </span>
              <span className="text-[11px] font-semibold text-[#009689] tracking-tight">
                380,000 CFA
              </span>
            </div>
          </div>

          {/* 4. Tabs Navigation Bar */}
          <div className="border-b border-[#EDEDED] overflow-x-auto">
            <nav className="flex items-center gap-6 min-w-max">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 text-[16px] font-medium transition-colors border-b-2 relative cursor-pointer ${
                      isActive
                        ? "text-[#FF611C] border-[#FF611C]"
                        : "text-[#575765] border-transparent hover:text-[#3D3D49]"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 5. Active Tab Contents */}
          <div className="w-full">
            {activeTab === "Overview" && <OverviewTabView />}
            {activeTab === "Orders" && <OrdersTabView />}
            {activeTab === "Sales" && <SalesTabView />}
            {activeTab === "Quotations" && <QuotationsTabView />}
            {activeTab === "Invoices" && <InvoicesTabView />}
            {activeTab === "Payments" && <PaymentsTabView />}
            {activeTab === "Deliveries" && <DeliveriesTabView />}
            {activeTab === "Repairs" && <RepairsTabView />}
            {activeTab === "Documents" && <DocumentsTabView />}
            {activeTab === "Activity" && <ActivityTabView />}
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 1: Overview Tab View
   (Matches clean 2-column layout without any red icon)
   ========================================================================= */
function OverviewTabView() {
  const leftCol = [
    { label: "Customer ID:", value: "CUST-0001" },
    { label: "Business Type:", value: "Wholesaler" },
    { label: "Phone:", value: "+233 20 123 4567" },
    { label: "Billing Address:", value: "P.O. Box CT 5678, Cantonments, Accra" },
    { label: "Sales Agent:", value: "Ama Owusu" },
  ];

  const rightCol = [
    { label: "Customer Type:", value: "Business" },
    { label: "Email:", value: "k.asante@abctech.com.gh" },
    { label: "Address:", value: "14 Liberation Road, Accra, Greater Accra" },
    { label: "Payment Terms:", value: "30 Days" },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
      <h3 className="font-medium text-[#575765] text-[20px]">
        Customer Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-[11px] max-w-4xl">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {leftCol.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-baseline">
              <span className="col-span-5 text-[#575765] font-normal">
                {item.label}
              </span>
              <span className="col-span-7 text-[#3D3D49] font-normal">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {rightCol.map((item, idx) => (
            <div key={idx} className="grid grid-cols-12 gap-2 items-baseline">
              <span className="col-span-5 text-[#575765] font-normal">
                {item.label}
              </span>
              <span className="col-span-7 text-[#3D3D49] font-normal">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 2: Orders Tab View
   (Action three dots dropdown with Edit and View)
   ========================================================================= */
function OrdersTabView() {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const orders = [
    {
      id: "ORD-1030",
      date: "19 Aug 2026",
      ordered: 10,
      available: 5,
      purchased: 5,
      delivered: 5,
      remaining: 5,
      total: "6 500 000 CFA",
      payment: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
      delivery: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
      status: { label: "Pending Stock", bg: "bg-[#FFEFE8]", border: "border-[#FF611C]", text: "text-[#FF611C]" },
    },
    {
      id: "ORD-1030",
      date: "19 Aug 2026",
      ordered: 10,
      available: 5,
      purchased: 5,
      delivered: 5,
      remaining: 5,
      total: "6 500 000 CFA",
      payment: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
      delivery: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
      status: { label: "In-progress", bg: "bg-[#F3EEFF]", border: "border-[#8A58FF]", text: "text-[#8A58FF]" },
    },
    {
      id: "ORD-1030",
      date: "19 Aug 2026",
      ordered: 10,
      available: 5,
      purchased: 5,
      delivered: 5,
      remaining: 5,
      total: "6 500 000 CFA",
      payment: { label: "Paid", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
      delivery: { label: "Delivered", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
      status: { label: "Completed", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    },
    {
      id: "ORD-1030",
      date: "19 Aug 2026",
      ordered: 10,
      available: 5,
      purchased: 5,
      delivered: 5,
      remaining: 5,
      total: "6 500 000 CFA",
      payment: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
      delivery: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
      status: { label: "In-progress", bg: "bg-[#F3EEFF]", border: "border-[#8A58FF]", text: "text-[#8A58FF]" },
    },
    {
      id: "ORD-1030",
      date: "19 Aug 2026",
      ordered: 10,
      available: 5,
      purchased: 5,
      delivered: 5,
      remaining: 5,
      total: "6 500 000 CFA",
      payment: { label: "Paid", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
      delivery: { label: "Delivered", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
      status: { label: "Completed", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#575765] text-[20px]">Orders History</h3>
      <div className="overflow-x-auto pb-16">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
              <th className="py-3 px-3">Order#</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Ordered</th>
              <th className="py-3 px-3">Available</th>
              <th className="py-3 px-3">Purchased</th>
              <th className="py-3 px-3">Delivered</th>
              <th className="py-3 px-3">Remaining</th>
              <th className="py-3 px-3">Total</th>
              <th className="py-3 px-3">Payment</th>
              <th className="py-3 px-3">Delivery</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
            {orders.map((o, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C]">{o.id}</td>
                <td className="py-3.5 px-3">{o.date}</td>
                <td className="py-3.5 px-3">{o.ordered}</td>
                <td className="py-3.5 px-3">{o.available}</td>
                <td className="py-3.5 px-3">{o.purchased}</td>
                <td className="py-3.5 px-3">{o.delivered}</td>
                <td className="py-3.5 px-3">{o.remaining}</td>
                <td className="py-3.5 px-3 font-normal">{o.total}</td>
                <td className="py-3.5 px-3">
                  <span className={`px-2 py-0.5 rounded-[6px] border text-[11px] ${o.payment.bg} ${o.payment.border} ${o.payment.text}`}>
                    {o.payment.label}
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className={`px-2 py-0.5 rounded-[6px] border text-[11px] ${o.delivery.bg} ${o.delivery.border} ${o.delivery.text}`}>
                    {o.delivery.label}
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className={`px-2 py-0.5 rounded-[6px] border text-[11px] ${o.status.bg} ${o.status.border} ${o.status.text}`}>
                    {o.status.label}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <TableRowActionDropdown
                    isOpen={activeMenuIndex === idx}
                    onToggle={() =>
                      setActiveMenuIndex(activeMenuIndex === idx ? null : idx)
                    }
                    onClose={() => setActiveMenuIndex(null)}
                    items={[
                      {
                        label: "Edit",
                        icon: <EditIcon className="size-3.5 text-[#575765]" />,
                        href: `/orders/new`,
                      },
                      {
                        label: "View",
                        icon: <EyeIcon className="size-3.5 text-[#575765]" />,
                        href: `/orders/${o.id}`,
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 3: Sales Tab View
   (Action three dots dropdown with Edit and View)
   ========================================================================= */
function SalesTabView() {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const sales = [
    {
      id: "SAL-1048",
      date: "19 Aug 2026",
      items: "5 Units",
      unitPrice: "520 000 CFA",
      discount: "0 CFA",
      total: "2 600 00050 CFA",
      payment: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
      delivery: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    },
    {
      id: "SAL-1048",
      date: "19 Aug 2026",
      items: "5 Units",
      unitPrice: "520 000 CFA",
      discount: "0 CFA",
      total: "2 600 00050 CFA",
      payment: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
      delivery: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    },
    {
      id: "SAL-1048",
      date: "19 Aug 2026",
      items: "5 Units",
      unitPrice: "520 000 CFA",
      discount: "0 CFA",
      total: "2 600 00050 CFA",
      payment: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
      delivery: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
    },
    {
      id: "SAL-1048",
      date: "19 Aug 2026",
      items: "5 Units",
      unitPrice: "520 000 CFA",
      discount: "0 CFA",
      total: "2 600 00050 CFA",
      payment: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
      delivery: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#575765] text-[20px]">Sales History</h3>
      <div className="overflow-x-auto pb-16">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
              <th className="py-3 px-3">Sale#</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Items</th>
              <th className="py-3 px-3">Unit Price</th>
              <th className="py-3 px-3">Discount</th>
              <th className="py-3 px-3">Total</th>
              <th className="py-3 px-3">Payment</th>
              <th className="py-3 px-3">Delivery</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
            {sales.map((s, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C]">{s.id}</td>
                <td className="py-3.5 px-3">{s.date}</td>
                <td className="py-3.5 px-3">{s.items}</td>
                <td className="py-3.5 px-3">{s.unitPrice}</td>
                <td className="py-3.5 px-3">{s.discount}</td>
                <td className="py-3.5 px-3 font-normal">{s.total}</td>
                <td className="py-3.5 px-3">
                  <span className={`px-2 py-0.5 rounded-[6px] border text-[11px] ${s.payment.bg} ${s.payment.border} ${s.payment.text}`}>
                    {s.payment.label}
                  </span>
                </td>
                <td className="py-3.5 px-3">
                  <span className={`px-2 py-0.5 rounded-[6px] border text-[11px] ${s.delivery.bg} ${s.delivery.border} ${s.delivery.text}`}>
                    {s.delivery.label}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <TableRowActionDropdown
                    isOpen={activeMenuIndex === idx}
                    onToggle={() =>
                      setActiveMenuIndex(activeMenuIndex === idx ? null : idx)
                    }
                    onClose={() => setActiveMenuIndex(null)}
                    items={[
                      {
                        label: "Edit",
                        icon: <EditIcon className="size-3.5 text-[#575765]" />,
                        href: `/sales/new`,
                      },
                      {
                        label: "View",
                        icon: <EyeIcon className="size-3.5 text-[#575765]" />,
                        href: `/sales/${s.id.replace("#", "")}`,
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 4: Quotations Tab View
   (Heads: quotation, date, amount, status, action three dots with edit, view)
   ========================================================================= */
function QuotationsTabView() {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const quotations = [
    {
      id: "QUO-0248",
      date: "19 Aug 2026",
      amount: "2 600 000 CFA",
      status: { label: "Accepted", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    },
    {
      id: "QUO-0247",
      date: "15 Aug 2026",
      amount: "1 000 000 CFA",
      status: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    },
    {
      id: "QUO-0230",
      date: "02 Aug 2026",
      amount: "4 000 000 CFA",
      status: { label: "Expired", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#575765] text-[20px]">Quotations History</h3>
      <div className="overflow-x-auto pb-16">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
              <th className="py-3 px-3">Quotation</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Amount</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
            {quotations.map((q, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C]">{q.id}</td>
                <td className="py-3.5 px-3">{q.date}</td>
                <td className="py-3.5 px-3 font-normal">{q.amount}</td>
                <td className="py-3.5 px-3">
                  <span className={`px-2 py-0.5 rounded-[6px] border text-[11px] ${q.status.bg} ${q.status.border} ${q.status.text}`}>
                    {q.status.label}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <TableRowActionDropdown
                    isOpen={activeMenuIndex === idx}
                    onToggle={() =>
                      setActiveMenuIndex(activeMenuIndex === idx ? null : idx)
                    }
                    onClose={() => setActiveMenuIndex(null)}
                    items={[
                      {
                        label: "Edit",
                        icon: <EditIcon className="size-3.5 text-[#575765]" />,
                        href: `/quotations/new`,
                      },
                      {
                        label: "View",
                        icon: <EyeIcon className="size-3.5 text-[#575765]" />,
                        href: `/quotations/${q.id}`,
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 5: Invoices Tab View
   (Matches Image Mockup One: Invoice #, Date, Due Date, Reference, Total, Paid, Balance, Status, Action with View)
   ========================================================================= */
function InvoicesTabView() {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const invoices = [
    {
      id: "INV-2044",
      date: "19 Aug 2026",
      dueDate: "19 Sep 2026",
      reference: "ORD - 3456",
      total: "CFA 2 600 00050",
      paid: "CFA 2 600 00050",
      balance: "CFA 2 600 00050",
      status: { label: "Overdue", bg: "bg-[#FEE9E9]", text: "text-[#F92424]" },
    },
    {
      id: "INV-2044",
      date: "19 Aug 2026",
      dueDate: "19 Sep 2026",
      reference: "ORD - 3456",
      total: "CFA 2 600 00050",
      paid: "CFA 2 600 00050",
      balance: "CFA 2 600 00050",
      status: { label: "Overdue", bg: "bg-[#FEE9E9]", text: "text-[#F92424]" },
    },
    {
      id: "INV-2044",
      date: "19 Aug 2026",
      dueDate: "19 Sep 2026",
      reference: "ORD - 3456",
      total: "CFA 2 600 00050",
      paid: "CFA 2 600 00050",
      balance: "CFA 2 600 00050",
      status: { label: "Partial", bg: "bg-[#FDF7E5]", text: "text-[#EDAC00]" },
    },
    {
      id: "INV-2044",
      date: "19 Aug 2026",
      dueDate: "19 Sep 2026",
      reference: "ORD - 3456",
      total: "CFA 2 600 00050",
      paid: "CFA 2 600 00050",
      balance: "CFA 2 600 00050",
      status: { label: "Partial", bg: "bg-[#FDF7E5]", text: "text-[#EDAC00]" },
    },
    {
      id: "INV-2044",
      date: "19 Aug 2026",
      dueDate: "19 Sep 2026",
      reference: "ORD - 3456",
      total: "CFA 2 600 00050",
      paid: "CFA 2 600 00050",
      balance: "CFA 2 600 00050",
      status: { label: "Paid", bg: "bg-[#E5F4F3]", text: "text-[#009689]" },
    },
    {
      id: "INV-2044",
      date: "19 Aug 2026",
      dueDate: "19 Sep 2026",
      reference: "ORD - 3456",
      total: "CFA 2 600 00050",
      paid: "CFA 2 600 00050",
      balance: "CFA 2 600 00050",
      status: { label: "Paid", bg: "bg-[#E5F4F3]", text: "text-[#009689]" },
    },
    {
      id: "INV-2044",
      date: "19 Aug 2026",
      dueDate: "19 Sep 2026",
      reference: "ORD - 3456",
      total: "CFA 2 600 00050",
      paid: "CFA 2 600 00050",
      balance: "CFA 2 600 00050",
      status: { label: "Paid", bg: "bg-[#E5F4F3]", text: "text-[#009689]" },
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#575765] text-[20px]">Invoices</h3>
      <div className="overflow-x-auto pb-16">
        <table className="w-full text-left border-collapse min-w-[950px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
              <th className="py-3 px-3">Invoice #</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Due Date</th>
              <th className="py-3 px-3">Reference</th>
              <th className="py-3 px-3">Total</th>
              <th className="py-3 px-3">Paid</th>
              <th className="py-3 px-3">Balance</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
            {invoices.map((inv, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C]">{inv.id}</td>
                <td className="py-3.5 px-3">{inv.date}</td>
                <td className="py-3.5 px-3">{inv.dueDate}</td>
                <td className="py-3.5 px-3">{inv.reference}</td>
                <td className="py-3.5 px-3 font-normal">{inv.total}</td>
                <td className="py-3.5 px-3 text-[#009689]">{inv.paid}</td>
                <td className="py-3.5 px-3 text-[#F92424] font-medium">{inv.balance}</td>
                <td className="py-3.5 px-3">
                  <span className={`px-2.5 py-0.5 rounded-[6px] text-[11px] font-normal ${inv.status.bg} ${inv.status.text}`}>
                    {inv.status.label}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <TableRowActionDropdown
                    isOpen={activeMenuIndex === idx}
                    onToggle={() =>
                      setActiveMenuIndex(activeMenuIndex === idx ? null : idx)
                    }
                    onClose={() => setActiveMenuIndex(null)}
                    items={[
                      {
                        label: "View",
                        icon: <EyeIcon className="size-3.5 text-[#575765]" />,
                        href: `/invoices/1`,
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 6: Payments Tab View
   (Action three dots dropdown with Edit and View)
   ========================================================================= */
function PaymentsTabView() {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const payments = [
    {
      id: "PAY-00821",
      date: "19 Aug 2026",
      method: "Bank Transfer",
      amount: "2 000 000 CFA",
      ref: "BT-829102",
      receivedBy: "Joseph J. Martin",
      status: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    },
    {
      id: "PAY-00821",
      date: "19 Aug 2026",
      method: "Bank Transfer",
      amount: "2 000 000 CFA",
      ref: "BT-829102",
      receivedBy: "Joseph J. Martin",
      status: { label: "Paid", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    },
    {
      id: "PAY-00821",
      date: "19 Aug 2026",
      method: "Bank Transfer",
      amount: "2 000 000 CFA",
      ref: "BT-829102",
      receivedBy: "Joseph J. Martin",
      status: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    },
    {
      id: "PAY-00821",
      date: "19 Aug 2026",
      method: "Bank Transfer",
      amount: "2 000 000 CFA",
      ref: "BT-829102",
      receivedBy: "Joseph J. Martin",
      status: { label: "Partial", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#575765] text-[20px]">Payment History</h3>
      <div className="overflow-x-auto pb-16">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
              <th className="py-3 px-3">Payment #</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Method</th>
              <th className="py-3 px-3">Amount</th>
              <th className="py-3 px-3">Reference</th>
              <th className="py-3 px-3">Received By</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
            {payments.map((p, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C]">{p.id}</td>
                <td className="py-3.5 px-3">{p.date}</td>
                <td className="py-3.5 px-3">{p.method}</td>
                <td className="py-3.5 px-3 font-normal">{p.amount}</td>
                <td className="py-3.5 px-3 text-[#575765]">{p.ref}</td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-medium flex items-center justify-center shrink-0">
                      AS
                    </div>
                    <span>{p.receivedBy}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <span className={`px-2 py-0.5 rounded-[6px] border text-[11px] ${p.status.bg} ${p.status.border} ${p.status.text}`}>
                    {p.status.label}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <TableRowActionDropdown
                    isOpen={activeMenuIndex === idx}
                    onToggle={() =>
                      setActiveMenuIndex(activeMenuIndex === idx ? null : idx)
                    }
                    onClose={() => setActiveMenuIndex(null)}
                    items={[
                      {
                        label: "Edit",
                        icon: <EditIcon className="size-3.5 text-[#575765]" />,
                        onClick: () => {},
                      },
                      {
                        label: "View",
                        icon: <EyeIcon className="size-3.5 text-[#575765]" />,
                        onClick: () => {},
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 7: Deliveries Tab View
   (Action three dots dropdown with Edit and View)
   ========================================================================= */
function DeliveriesTabView() {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const deliveries = [
    {
      id: "DEL-00821",
      orderId: "ORD-2024",
      date: "19 Aug 2026",
      items: "5 units",
      address: "14 Liberation Road, Accra",
      deliveredBy: "Joseph J. Martin",
      status: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    },
    {
      id: "DEL-00821",
      orderId: "ORD-2024",
      date: "19 Aug 2026",
      items: "5 units",
      address: "14 Liberation Road, Accra",
      deliveredBy: "Joseph J. Martin",
      status: { label: "Delivered", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    },
    {
      id: "DEL-00821",
      orderId: "ORD-2024",
      date: "19 Aug 2026",
      items: "5 units",
      address: "14 Liberation Road, Accra",
      deliveredBy: "Joseph J. Martin",
      status: { label: "Delivered", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    },
    {
      id: "DEL-00821",
      orderId: "ORD-2024",
      date: "19 Aug 2026",
      items: "5 units",
      address: "14 Liberation Road, Accra",
      deliveredBy: "Joseph J. Martin",
      status: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    },
    {
      id: "DEL-00821",
      orderId: "ORD-2024",
      date: "19 Aug 2026",
      items: "5 units",
      address: "14 Liberation Road, Accra",
      deliveredBy: "Joseph J. Martin",
      status: { label: "Overdue", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    },
    {
      id: "DEL-00821",
      orderId: "ORD-2024",
      date: "19 Aug 2026",
      items: "5 units",
      address: "14 Liberation Road, Accra",
      deliveredBy: "Joseph J. Martin",
      status: { label: "Pending", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#575765] text-[20px]">Delivery History</h3>
      <div className="overflow-x-auto pb-16">
        <table className="w-full text-left border-collapse min-w-[950px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
              <th className="py-3 px-3">Delivery #</th>
              <th className="py-3 px-3">Order#</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Items</th>
              <th className="py-3 px-3">Address</th>
              <th className="py-3 px-3">Delivered By</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
            {deliveries.map((d, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C]">{d.id}</td>
                <td className="py-3.5 px-3 font-medium text-[#FF611C]">{d.orderId}</td>
                <td className="py-3.5 px-3">{d.date}</td>
                <td className="py-3.5 px-3">{d.items}</td>
                <td className="py-3.5 px-3 text-[#575765]">{d.address}</td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-medium flex items-center justify-center shrink-0">
                      AS
                    </div>
                    <span>{d.deliveredBy}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <span className={`px-2 py-0.5 rounded-[6px] border text-[11px] ${d.status.bg} ${d.status.border} ${d.status.text}`}>
                    {d.status.label}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <TableRowActionDropdown
                    isOpen={activeMenuIndex === idx}
                    onToggle={() =>
                      setActiveMenuIndex(activeMenuIndex === idx ? null : idx)
                    }
                    onClose={() => setActiveMenuIndex(null)}
                    items={[
                      {
                        label: "Edit",
                        icon: <EditIcon className="size-3.5 text-[#575765]" />,
                        onClick: () => {},
                      },
                      {
                        label: "View",
                        icon: <EyeIcon className="size-3.5 text-[#575765]" />,
                        onClick: () => {},
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 8: Repairs Tab View
   (Serial / IMEI head removed, Action three dots dropdown with Edit and View)
   ========================================================================= */
function RepairsTabView() {
  const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

  const repairs = [
    {
      id: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      cost: "6 500 000 CFA",
      status: { label: "Received", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    },
    {
      id: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      cost: "6 500 000 CFA",
      status: { label: "In-Repair", bg: "bg-[#FDF7E5]", border: "border-[#EDAC00]", text: "text-[#EDAC00]" },
    },
    {
      id: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      cost: "6 500 000 CFA",
      status: { label: "In-Repair", bg: "bg-[#F3EEFF]", border: "border-[#8A58FF]", text: "text-[#8A58FF]" },
    },
    {
      id: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      cost: "6 500 000 CFA",
      status: { label: "Irreparable", bg: "bg-[#FEE9E9]", border: "border-[#F92424]", text: "text-[#F92424]" },
    },
    {
      id: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      cost: "6 500 000 CFA",
      status: { label: "Draft", bg: "bg-neutral-100", border: "border-neutral-300", text: "text-neutral-600" },
    },
    {
      id: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      cost: "6 500 000 CFA",
      status: { label: "In-Repair", bg: "bg-[#F3EEFF]", border: "border-[#8A58FF]", text: "text-[#8A58FF]" },
    },
    {
      id: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      cost: "6 500 000 CFA",
      status: { label: "Received", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
    },
    {
      id: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      cost: "6 500 000 CFA",
      status: { label: "Completed", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#575765] text-[20px]">Repair History</h3>
      <div className="overflow-x-auto pb-16">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
              <th className="py-3 px-3">Repair#</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Issue</th>
              <th className="py-3 px-3">Technician</th>
              <th className="py-3 px-3">Cost</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
            {repairs.map((r, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C]">{r.id}</td>
                <td className="py-3.5 px-3">{r.date}</td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-[#E5F4F3] text-[#009689] text-[11px] font-medium flex items-center justify-center shrink-0">
                      AB
                    </div>
                    <span>{r.customer}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3">{r.issue}</td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-[#FFEFE8] text-[#FF611C] text-[11px] font-medium flex items-center justify-center shrink-0">
                      MC
                    </div>
                    <span>{r.technician}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-normal">{r.cost}</td>
                <td className="py-3.5 px-3">
                  <span className={`px-2 py-0.5 rounded-[6px] border text-[11px] ${r.status.bg} ${r.status.border} ${r.status.text}`}>
                    {r.status.label}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <TableRowActionDropdown
                    isOpen={activeMenuIndex === idx}
                    onToggle={() =>
                      setActiveMenuIndex(activeMenuIndex === idx ? null : idx)
                    }
                    onClose={() => setActiveMenuIndex(null)}
                    items={[
                      {
                        label: "Edit",
                        icon: <EditIcon className="size-3.5 text-[#575765]" />,
                        href: `/repairs/new`,
                      },
                      {
                        label: "View",
                        icon: <EyeIcon className="size-3.5 text-[#575765]" />,
                        href: `/repairs/${r.id}`,
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 9: Documents Tab View
   (Functional file uploader button, dynamic file list, delete & view)
   ========================================================================= */
interface DocumentItem {
  id: string;
  title: string;
  subtitle: string;
}

function DocumentsTabView() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "doc-1",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file · 2.5mb",
    },
    {
      id: "doc-2",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file · 2.5mb",
    },
    {
      id: "doc-3",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file · 2.5mb",
    },
    {
      id: "doc-4",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file · 2.5mb",
    },
    {
      id: "doc-5",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file · 2.5mb",
    },
    {
      id: "doc-6",
      title: "Dell Latitude 5440 Datasheet.pdf",
      subtitle: "Image file · 2.5mb",
    },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs: DocumentItem[] = Array.from(files).map((file) => {
      const ext = file.name.split(".").pop()?.toUpperCase() || "FILE";
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      const sizeStr = file.size >= 1024 * 1024 ? `${sizeMb}mb` : `${Math.round(file.size / 1024)}kb`;
      return {
        id: "doc-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
        title: file.name,
        subtitle: `${ext} file · ${sizeStr}`,
      };
    });

    setDocuments((prev) => [...newDocs, ...prev]);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
      {/* Header with Functional File Uploader Button */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-medium text-[#575765] text-[20px]">Documents</h3>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2.5 rounded-[8px] flex items-center gap-2 text-[#F8FAFD] font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
          style={{
            background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
          }}
        >
          <UploadIcon className="size-4 text-white" />
          <span>Upload Files</span>
        </button>
      </div>

      {/* Documents 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="border border-[#EDEDED] rounded-[10px] p-4 flex items-center justify-between gap-3 hover:bg-neutral-50/50 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-10 rounded-[8px] bg-[#FFEFE8] flex items-center justify-center shrink-0">
                <FileIcon className="size-5 text-[#FF611C]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                  {doc.title}
                </span>
                <span className="text-[11px] text-[#575765] font-normal">
                  {doc.subtitle}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleDelete(doc.id)}
                className="px-2.5 py-1 text-[11px] font-normal text-[#575765] hover:text-[#F92424] transition-colors cursor-pointer"
              >
                Delete
              </button>
              <button
                type="button"
                className="px-2.5 py-1 text-[11px] font-normal text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
              >
                View
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-[6px] text-white text-[11px] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
                style={{
                  background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 10: Activity Tab View
   ========================================================================= */
function ActivityTabView() {
  const activities = [
    {
      title: "Order created",
      author: "Jean Martin",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#E7F2FC] text-[#0D79E4]",
      icon: OrdersIcon,
    },
    {
      title: "Quotation QUO-0248 converted to Order",
      author: "System",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#FFEFE8] text-[#FF611C]",
      icon: QuotationsIcon,
    },
    {
      title: "5 units allocated from stock",
      author: "Warehouse",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#F3EEFF] text-[#8A58FF]",
      icon: InventoryIcon,
    },
    {
      title: "Purchase PUR-118 created for remaining 5 units",
      author: "Jean Martin",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#E5F4F3] text-[#009689]",
      icon: PurchasesIcon,
    },
    {
      title: "Delivery DEL-082 created — 5 / 10 units",
      author: "Jean Martin",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#E7F2FC] text-[#0D79E4]",
      icon: DeliveriesIcon,
    },
    {
      title: "Payment of 2,000,000 CFA recorded (Bank Transfer)",
      author: "Jean Martin",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#E5F4F3] text-[#009689]",
      icon: ExpenseIcon,
    },
    {
      title: "Order created",
      author: "Jean Martin",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#E7F2FC] text-[#0D79E4]",
      icon: OrdersIcon,
    },
    {
      title: "Quotation QUO-0248 converted to Order",
      author: "System",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#FFEFE8] text-[#FF611C]",
      icon: QuotationsIcon,
    },
    {
      title: "5 units allocated from stock",
      author: "Warehouse",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#F3EEFF] text-[#8A58FF]",
      icon: InventoryIcon,
    },
    {
      title: "Purchase PUR-118 created for remaining 5 units",
      author: "Jean Martin",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#E5F4F3] text-[#009689]",
      icon: PurchasesIcon,
    },
    {
      title: "Delivery DEL-082 created — 5 / 10 units",
      author: "Jean Martin",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#E7F2FC] text-[#0D79E4]",
      icon: DeliveriesIcon,
    },
    {
      title: "Payment of 2,000,000 CFA recorded (Bank Transfer)",
      author: "Jean Martin",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#E5F4F3] text-[#009689]",
      icon: ExpenseIcon,
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6 max-w-3xl">
      <div className="flex flex-col divide-y divide-[#EDEDED]">
        {activities.map((act, idx) => {
          const IconComp = act.icon;
          return (
            <div key={idx} className="py-4 flex items-start justify-between gap-4 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3.5">
                <div
                  className={`size-9 rounded-full flex items-center justify-center shrink-0 ${act.badgeColor}`}
                >
                  <IconComp className="size-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[#3D3D49] text-[11px]">
                    {act.title}
                  </span>
                  <span className="text-[11px] text-[#575765] font-normal">
                    {act.author}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end text-right shrink-0">
                <span className="text-[11px] text-[#575765] font-normal">
                  {act.time}
                </span>
                <span className="text-[11px] text-[#575765] opacity-70">
                  {act.date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
