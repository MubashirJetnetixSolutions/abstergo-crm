"use client";

import React, { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  SearchIcon,
  FilterIcon,
  MoreVerticalIcon,
  PlusCircleIcon,
  UserGroupIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  EyeIcon,
  DeleteIcon,
} from "@/components/icons/Icons";

export interface EmailTemplateRow {
  id: string;
  name: string;
  category: string;
  subject: string;
  trigger: string;
  recipient: "Customer" | "Supplier";
  status: "Active" | "Inactive";
  lastUpdated: string;
  bodyPreview?: string;
}

const INITIAL_TEMPLATES_DATA: EmailTemplateRow[] = [
  {
    id: "1",
    name: "Quotation Email",
    category: "Sales",
    subject: "Your Quotation {{quotation_number}}",
    trigger: "Send Quotation",
    recipient: "Customer",
    status: "Active",
    lastUpdated: "Aug 27, 2026",
    bodyPreview:
      "Dear {{customer_name}},\n\nThank you for requesting a quotation with Abstergo Industries. Please find your detailed quotation #{{quotation_number}} attached.\n\nBest regards,\nSales Team",
  },
  {
    id: "2",
    name: "Order Confirmation",
    category: "Orders",
    subject: "Order Confirmation #{{order_number}}",
    trigger: "Order Confirmation",
    recipient: "Customer",
    status: "Active",
    lastUpdated: "Aug 27, 2026",
    bodyPreview:
      "Hello {{customer_name}},\n\nYour order #{{order_number}} has been successfully confirmed and is being processed.\n\nThank you for your business!",
  },
  {
    id: "3",
    name: "Invoice Email",
    category: "Finance",
    subject: "Invoice #{{invoice_number}} from Abstergo",
    trigger: "Send Invoice",
    recipient: "Customer",
    status: "Inactive",
    lastUpdated: "Aug 27, 2026",
    bodyPreview:
      "Dear {{customer_name}},\n\nPlease review your invoice #{{invoice_number}} for recent purchases. The payment balance is {{total_amount}}.\n\nFinance Department",
  },
  {
    id: "4",
    name: "Payment Receipt",
    category: "Finance",
    subject: "Receipt for Payment on Invoice #{{invoice_number}}",
    trigger: "Payment Received",
    recipient: "Customer",
    status: "Active",
    lastUpdated: "Aug 27, 2026",
    bodyPreview:
      "We have received your payment of {{amount_paid}}. Thank you for your prompt settlement.\n\nAccount Status: Paid in full.",
  },
  {
    id: "5",
    name: "Payment Reminder",
    category: "Finance",
    subject: "Payment Reminder: Invoice #{{invoice_number}} Due Soon",
    trigger: "Payment Due",
    recipient: "Customer",
    status: "Active",
    lastUpdated: "Aug 27, 2026",
    bodyPreview:
      "Friendly reminder that payment for invoice #{{invoice_number}} is due on {{due_date}}.\n\nPlease let us know if you have any questions.",
  },
  {
    id: "6",
    name: "Overdue Invoice",
    category: "Finance",
    subject: "URGENT: Invoice #{{invoice_number}} is Overdue",
    trigger: "Invoice Overdue",
    recipient: "Customer",
    status: "Active",
    lastUpdated: "Aug 27, 2026",
    bodyPreview:
      "Our records indicate that invoice #{{invoice_number}} was due on {{due_date}} and remains unpaid. Please settle as soon as possible.",
  },
  {
    id: "7",
    name: "Delivery Notification",
    category: "Delivery",
    subject: "Your Order #{{order_number}} is Out for Delivery",
    trigger: "Order Dispatched",
    recipient: "Customer",
    status: "Inactive",
    lastUpdated: "Aug 27, 2026",
    bodyPreview:
      "Good news! Your delivery #{{delivery_number}} has been dispatched with our courier {{courier_name}}.\n\nExpected arrival: Today by 5:00 PM.",
  },
  {
    id: "8",
    name: "Repair Received",
    category: "Repair",
    subject: "Repair Ticket #{{repair_code}} Created",
    trigger: "Repair Created",
    recipient: "Customer",
    status: "Active",
    lastUpdated: "Aug 27, 2026",
    bodyPreview:
      "Your device {{device_model}} has been received for diagnostics under ticket #{{repair_code}}.\n\nTechnician assigned: {{technician_name}}.",
  },
  {
    id: "9",
    name: "Repair Ready",
    category: "Repair",
    subject: "Your Device is Ready for Pickup (Ticket #{{repair_code}})",
    trigger: "Repair Completed",
    recipient: "Customer",
    status: "Active",
    lastUpdated: "Aug 27, 2026",
    bodyPreview:
      "Repair service for {{device_model}} has been completed. You may collect your device from our service center during business hours.",
  },
  {
    id: "10",
    name: "Warranty Expiry",
    category: "Warranty",
    subject: "Notice: Warranty for {{product_name}} Expiring Soon",
    trigger: "Warranty Expiry",
    recipient: "Customer",
    status: "Inactive",
    lastUpdated: "Aug 27, 2026",
    bodyPreview:
      "Your warranty for {{product_name}} (Serial: {{serial_number}}) is scheduled to expire on {{expiry_date}}. Contact us to renew your coverage.",
  },
  {
    id: "11",
    name: "Purchase Order",
    category: "Purchase",
    subject: "Purchase Order #{{purchase_code}} - Abstergo",
    trigger: "Purchase Created",
    recipient: "Supplier",
    status: "Active",
    lastUpdated: "Aug 27, 2026",
    bodyPreview:
      "Dear {{supplier_name}},\n\nPlease accept our purchase order #{{purchase_code}} for the requested stock quantities.\n\nProcurement Team",
  },
  {
    id: "12",
    name: "Purchase Received",
    category: "Purchase",
    subject: "Confirmation of Goods Received for PO #{{purchase_code}}",
    trigger: "Purchase Received",
    recipient: "Supplier",
    status: "Active",
    lastUpdated: "Aug 27, 2026",
    bodyPreview:
      "All goods specified under purchase order #{{purchase_code}} have been delivered and inspected in our warehouse.",
  },
];

/* =========================================================================
   ACTION DROPDOWN (Edit, View, Delete)
   ========================================================================= */
function ActionDropdown({
  onView,
  onEdit,
  onDelete,
  dropUp = false,
}: {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  dropUp?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div
      className="relative inline-block text-left"
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Actions"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="rounded-[6px] border border-[#EDEDED] p-1.5 text-[#575765] hover:bg-gray-100 hover:text-gray-700 transition inline-flex items-center justify-center cursor-pointer"
      >
        <MoreVerticalIcon className="size-4" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 ${
            dropUp ? "bottom-full mb-1.5" : "top-full mt-1.5"
          } z-50 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 flex flex-col text-left animate-in fade-in zoom-in-95 duration-100`}
        >
          {/* Edit Option */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onEdit();
            }}
            className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <EditIcon className="size-3.5 text-[#575765]" />
            <span>Edit</span>
          </button>

          {/* View Option */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onView();
            }}
            className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <EyeIcon className="size-3.5 text-[#575765]" />
            <span>View</span>
          </button>

          {/* Delete Option */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onDelete();
            }}
            className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#F92424] hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <DeleteIcon className="size-3.5 text-[#F92424]" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplateRow[]>(INITIAL_TEMPLATES_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Filters based on table heads
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRecipient, setSelectedRecipient] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");

  // Modals state
  const [viewingTemplate, setViewingTemplate] = useState<EmailTemplateRow | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplateRow | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Template form state
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "Sales",
    subject: "",
    trigger: "",
    recipient: "Customer" as "Customer" | "Supplier",
    status: "Active" as "Active" | "Inactive",
    bodyPreview: "",
  });

  const handleDelete = (id: string) => {
    setTemplates((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveEdit = () => {
    if (!editingTemplate) return;
    setTemplates((prev) =>
      prev.map((item) =>
        item.id === editingTemplate.id
          ? {
              ...editingTemplate,
              lastUpdated: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
            }
          : item
      )
    );
    setEditingTemplate(null);
  };

  const handleCreateTemplate = () => {
    if (!newTemplate.name.trim() || !newTemplate.subject.trim()) return;
    const created: EmailTemplateRow = {
      id: String(Date.now()),
      name: newTemplate.name,
      category: newTemplate.category,
      subject: newTemplate.subject,
      trigger: newTemplate.trigger || "Custom Action",
      recipient: newTemplate.recipient,
      status: newTemplate.status,
      lastUpdated: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      bodyPreview: newTemplate.bodyPreview,
    };
    setTemplates((prev) => [created, ...prev]);
    setIsCreateModalOpen(false);
    setNewTemplate({
      name: "",
      category: "Sales",
      subject: "",
      trigger: "",
      recipient: "Customer",
      status: "Active",
      bodyPreview: "",
    });
  };

  // Filter logic based on table heads
  const filteredData = templates.filter((row) => {
    if (selectedCategory !== "All" && row.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }
    if (selectedRecipient !== "All" && row.recipient.toLowerCase() !== selectedRecipient.toLowerCase()) {
      return false;
    }
    if (selectedStatus !== "All" && row.status.toLowerCase() !== selectedStatus.toLowerCase()) {
      return false;
    }
    if (startDate) {
      const rowDate = new Date(row.lastUpdated);
      const start = new Date(startDate);
      if (!isNaN(rowDate.getTime()) && !isNaN(start.getTime())) {
        rowDate.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        if (rowDate < start) return false;
      }
    }
    if (endDate) {
      const rowDate = new Date(row.lastUpdated);
      const end = new Date(endDate);
      if (!isNaN(rowDate.getTime()) && !isNaN(end.getTime())) {
        rowDate.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        if (rowDate > end) return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = `${row.name} ${row.category} ${row.subject} ${row.trigger} ${row.recipient} ${row.status}`
        .toLowerCase()
        .includes(q);
      if (!match) return false;
    }
    return true;
  });

  const activeCount = templates.filter((t) => t.status === "Active").length;
  const inactiveCount = templates.filter((t) => t.status === "Inactive").length;

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Email Templates" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-8 max-w-[1680px] w-full mx-auto">
          {/* Section Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight tracking-tight">
                Email Templates
              </h1>
              <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                Invoices, payments, and revenue
              </p>
            </div>

            {/* Add New Template Button */}
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-3 rounded-[8px] flex items-center gap-2 border border-white/20 text-[#F8FAFD] font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
              style={{
                background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
              }}
            >
              <PlusCircleIcon className="size-5 text-white" />
              <span>Add New Template</span>
            </button>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Total Templates */}
            <div className="flex flex-col gap-6 justify-between rounded-[12px] border border-[#EDEDED] bg-white p-5 py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#575765] text-[16px]">
                  Total Templates
                </span>
                <div className="flex size-12 items-center justify-center rounded-[14px] bg-[#FF611C] text-white shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.4)] border-2 border-[#E9EDF2]">
                  <UserGroupIcon className="size-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-[20px] font-medium text-[#3D3D49] leading-none">
                  {templates.length}
                </span>
              </div>
            </div>

            {/* 2. Active */}
            <div className="flex flex-col gap-6 justify-between rounded-[12px] border border-[#EDEDED] bg-white p-5 py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#575765] text-[16px]">
                  Active
                </span>
                <div className="flex size-12 items-center justify-center rounded-[14px] bg-[#009689] text-white shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.4)] border-2 border-[#E9EDF2]">
                  <UserGroupIcon className="size-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-[20px] font-medium text-[#3D3D49] leading-none">
                  {activeCount}
                </span>
              </div>
            </div>

            {/* 3. Inactive */}
            <div className="flex flex-col gap-6 justify-between rounded-[12px] border border-[#EDEDED] bg-white p-5 py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#575765] text-[16px]">
                  Inactive
                </span>
                <div className="flex size-12 items-center justify-center rounded-[14px] bg-[#F92424] text-white shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.4)] border-2 border-[#E9EDF2]">
                  <UserGroupIcon className="size-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-[20px] font-medium text-[#3D3D49] leading-none">
                  {inactiveCount}
                </span>
              </div>
            </div>

            {/* 4. Recently Updated */}
            <div className="flex flex-col gap-6 justify-between rounded-[12px] border border-[#EDEDED] bg-white p-5 py-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-[#575765] text-[16px]">
                  Recently Updated
                </span>
                <div className="flex size-12 items-center justify-center rounded-[14px] bg-[#8A58FF] text-white shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.4)] border-2 border-[#E9EDF2]">
                  <UserGroupIcon className="size-6 text-white" />
                </div>
              </div>
              <div>
                <span className="text-[11px] lg:text-[20px] font-medium text-[#3D3D49] leading-none truncate block">
                  {templates[0]?.name || "Quotation Email"}
                </span>
              </div>
            </div>
          </div>

          {/* Email Templates Card with Table & Header */}
          <div className="flex flex-col gap-5">
            <div className="rounded-[12px] border border-[#EDEDED] bg-white shadow-sm overflow-hidden flex flex-col">
              {/* Table Card Header Controls */}
              <div className="flex items-center justify-between p-4 pl-5 border-b border-[#EDEDED]">
                <h2 className="text-[16px] font-medium text-[#3D3D49]">
                  Email Templates
                </h2>

                <div className="flex items-center gap-2.5">
                  {/* Expandable Search Field (click expands in place) */}
                  {isSearchOpen ? (
                    <div className="flex items-center gap-2 border border-[#EDEDED] rounded-[8px] px-3 py-1.5 bg-white transition-all duration-200 w-[220px] shadow-sm">
                      <SearchIcon className="size-4 text-[#8C8C9A] shrink-0" />
                      <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-xs text-[#3D3D49] outline-none bg-transparent w-full"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (searchQuery) {
                            setSearchQuery("");
                          } else {
                            setIsSearchOpen(false);
                          }
                        }}
                        className="text-xs text-[#8C8C9A] hover:text-[#3D3D49] cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      aria-label="Search"
                      onClick={() => setIsSearchOpen(true)}
                      className="flex size-[34px] items-center justify-center rounded-[8px] border border-[#EDEDED] bg-white text-[#575765] shadow-sm hover:bg-gray-50 transition cursor-pointer"
                      title="Search templates"
                    >
                      <SearchIcon className="size-4 text-[#575765]" />
                    </button>
                  )}

                  {/* Filter Button */}
                  <button
                    type="button"
                    onClick={() => setShowFilters((prev) => !prev)}
                    className={`flex h-[34px] items-center gap-2 rounded-[8px] border px-4 text-xs font-medium shadow-sm transition cursor-pointer ${
                      showFilters
                        ? "bg-neutral-100 font-semibold border-neutral-300 text-[#1D1E2C]"
                        : "border-[#EDEDED] bg-white text-[#575765] hover:bg-gray-50"
                    }`}
                  >
                    <FilterIcon className="size-4 text-[#575765]" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {/* Dedicated Filter Subheader Row (based on Table Heads) */}
              {showFilters && (
                <div className="min-h-[56px] border-b border-[#EDEDED] px-5 py-2.5 flex flex-wrap gap-3 items-center bg-white">
                  {/* Start Date */}
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#575765] font-normal">Start Date:</span>
                    <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 focus-within:border-[#FF611C] transition-colors">
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="text-[12px] text-[#3D3D49] bg-transparent outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#575765] font-normal">End Date:</span>
                    <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 focus-within:border-[#FF611C] transition-colors">
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="text-[12px] text-[#3D3D49] bg-transparent outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="relative inline-flex items-center">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-8 py-1.5 text-[#575765] text-[12px] appearance-none outline-none cursor-pointer hover:border-neutral-300 transition-colors"
                    >
                      <option value="All">Category: All</option>
                      <option value="Sales">Sales</option>
                      <option value="Orders">Orders</option>
                      <option value="Finance">Finance</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Repair">Repair</option>
                      <option value="Warranty">Warranty</option>
                      <option value="Purchase">Purchase</option>
                    </select>
                    <ChevronDownIcon className="size-3 text-[#575765] absolute right-2.5 pointer-events-none" />
                  </div>

                  {/* Recipient Filter */}
                  <div className="relative inline-flex items-center">
                    <select
                      value={selectedRecipient}
                      onChange={(e) => setSelectedRecipient(e.target.value)}
                      className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-8 py-1.5 text-[#575765] text-[12px] appearance-none outline-none cursor-pointer hover:border-neutral-300 transition-colors"
                    >
                      <option value="All">Recipient: All</option>
                      <option value="Customer">Customer</option>
                      <option value="Supplier">Supplier</option>
                    </select>
                    <ChevronDownIcon className="size-3 text-[#575765] absolute right-2.5 pointer-events-none" />
                  </div>

                  {/* Status Filter */}
                  <div className="relative inline-flex items-center">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-8 py-1.5 text-[#575765] text-[12px] appearance-none outline-none cursor-pointer hover:border-neutral-300 transition-colors"
                    >
                      <option value="All">Status: All</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <ChevronDownIcon className="size-3 text-[#575765] absolute right-2.5 pointer-events-none" />
                  </div>

                  {/* Reset Filters */}
                  {(selectedCategory !== "All" ||
                    selectedRecipient !== "All" ||
                    selectedStatus !== "All" ||
                    startDate ||
                    endDate) && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategory("All");
                        setSelectedRecipient("All");
                        setSelectedStatus("All");
                        setStartDate("");
                        setEndDate("");
                      }}
                      className="text-[11px] text-[#FF611C] hover:underline font-medium cursor-pointer"
                    >
                      Reset filters
                    </button>
                  )}
                </div>
              )}

              {/* Table */}
              <div className="overflow-x-auto pb-16">
                <table className="w-full text-left">
                  <thead className="border-b border-[#EDEDED] bg-white text-[#575765] text-[11px] font-medium">
                    <tr>
                      <th className="py-3 px-4 font-medium w-[160px]">
                        Template Name
                      </th>
                      <th className="py-3 px-4 font-medium w-[100px]">
                        Category
                      </th>
                      <th className="py-3 px-4 font-medium w-[280px]">
                        Subject
                      </th>
                      <th className="py-3 px-4 font-medium w-[160px]">
                        Trigger / Used For
                      </th>
                      <th className="py-3 px-4 font-medium w-[100px]">
                        Recipient
                      </th>
                      <th className="py-3 px-4 font-medium w-[80px]">
                        Status
                      </th>
                      <th className="py-3 px-4 font-medium w-[120px]">
                        Last Updated
                      </th>
                      <th className="py-3 px-4 font-medium text-right w-[40px]"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDEDED]">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-[#8C8C9A]">
                          <p className="text-sm font-medium text-[#3D3D49]">
                            No email templates found
                          </p>
                          <p className="text-xs text-[#8C8C9A] mt-1">
                            Try adjusting your filters or search query
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((row, idx) => (
                        <tr
                          key={row.id}
                          className="hover:bg-gray-50/50 transition cursor-pointer"
                          onClick={() => setViewingTemplate(row)}
                        >
                          <td className="py-4 px-4 font-medium text-[#3D3D49] text-[11px] truncate max-w-[160px]">
                            {row.name}
                          </td>
                          <td className="py-4 px-4 font-normal text-[#3D3D49] text-[11px] truncate max-w-[100px]">
                            {row.category}
                          </td>
                          <td className="py-4 px-4 font-normal text-[#3D3D49] text-[11px] truncate max-w-[280px]">
                            {row.subject}
                          </td>
                          <td className="py-4 px-4 font-medium text-[#3D3D49] text-[11px] truncate max-w-[160px]">
                            {row.trigger}
                          </td>
                          <td className="py-4 px-4 font-normal text-[#3D3D49] text-[11px] truncate max-w-[100px]">
                            {row.recipient}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex items-center px-2 py-1 rounded-[6px] text-[11px] font-normal ${
                                row.status === "Active"
                                  ? "bg-[#E5F4F3] text-[#009689] border border-[#009689]"
                                  : "bg-[#FEE9E9] text-[#F92424] border border-[#F92424]"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-normal text-[#3D3D49] text-[11px] truncate max-w-[120px]">
                            {row.lastUpdated}
                          </td>
                          <td
                            className="py-4 px-4 text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ActionDropdown
                              onView={() => setViewingTemplate(row)}
                              onEdit={() => setEditingTemplate({ ...row })}
                              onDelete={() => handleDelete(row.id)}
                              dropUp={idx >= filteredData.length - 2 && filteredData.length > 2}
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination Footer Card */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-3 px-4 shadow-sm flex items-center justify-end gap-2 text-[11px] font-medium text-[#575765]">
              <div className="flex items-center gap-2 border border-[#EDEDED] rounded-[6px] px-3 py-1.5 bg-white cursor-pointer">
                <span>Per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer text-[#3D3D49]"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>

              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="flex size-8 items-center justify-center rounded-[6px] border border-[#EDEDED] bg-white text-[#575765] hover:bg-gray-50 disabled:opacity-50 cursor-pointer"
              >
                <ChevronLeftIcon className="size-4" />
              </button>

              <span className="px-2 text-[#575765]">Page {currentPage}</span>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => p + 1)}
                className="flex size-8 items-center justify-center rounded-[6px] border border-[#EDEDED] bg-white text-[#575765] hover:bg-gray-50 cursor-pointer"
              >
                <ChevronRightIcon className="size-4" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* =========================================================================
         VIEW TEMPLATE MODAL
         ========================================================================= */}
      {viewingTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setViewingTemplate(null)}
        >
          <div
            className="w-full max-w-[620px] rounded-[12px] bg-white shadow-2xl border border-[#EDEDED] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#EDEDED] px-6 py-4">
              <h3 className="text-[18px] font-semibold text-[#3D3D49]">
                View Email Template
              </h3>
              <button
                type="button"
                onClick={() => setViewingTemplate(null)}
                className="size-7 rounded-full flex items-center justify-center text-[#8C8C9A] hover:bg-neutral-100 hover:text-[#3D3D49] transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-4 text-xs text-[#3D3D49]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[#8C8C9A] block font-medium">Template Name</span>
                  <span className="text-[14px] font-semibold text-[#1D1E2C] mt-0.5 block">
                    {viewingTemplate.name}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C8C9A] block font-medium">Category</span>
                  <span className="text-[13px] font-medium text-[#3D3D49] mt-0.5 block">
                    {viewingTemplate.category}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[#8C8C9A] block font-medium">Subject Line</span>
                <div className="mt-1 p-2.5 bg-[#F8FAFD] border border-[#EDEDED] rounded-[8px] font-mono text-[12px] text-[#3D3D49]">
                  {viewingTemplate.subject}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-[#8C8C9A] block font-medium">Trigger</span>
                  <span className="text-[13px] font-medium text-[#3D3D49] mt-0.5 block">
                    {viewingTemplate.trigger}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C8C9A] block font-medium">Recipient</span>
                  <span className="text-[13px] font-medium text-[#3D3D49] mt-0.5 block">
                    {viewingTemplate.recipient}
                  </span>
                </div>
                <div>
                  <span className="text-[#8C8C9A] block font-medium">Status</span>
                  <span
                    className={`inline-flex items-center mt-1 px-2 py-0.5 rounded-[4px] text-[11px] font-medium ${
                      viewingTemplate.status === "Active"
                        ? "bg-[#E5F4F3] text-[#009689]"
                        : "bg-[#FEE9E9] text-[#F92424]"
                    }`}
                  >
                    {viewingTemplate.status}
                  </span>
                </div>
              </div>

              {/* Template Body Preview */}
              <div>
                <span className="text-[#8C8C9A] block font-medium mb-1">
                  Email Body Preview
                </span>
                <div className="p-4 bg-[#FAFAFC] border border-[#EDEDED] rounded-[8px] text-[12px] text-[#575765] whitespace-pre-line leading-relaxed min-h-[120px]">
                  {viewingTemplate.bodyPreview ||
                    "Dear Customer,\n\nThis is an automated notification regarding your recent request. Please find all the relevant details attached.\n\nThank you,\nAbstergo Team"}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-[#EDEDED] bg-[#F8FAFD]">
              <button
                type="button"
                onClick={() => {
                  const toEdit = viewingTemplate;
                  setViewingTemplate(null);
                  setEditingTemplate({ ...toEdit });
                }}
                className="px-4 py-2 rounded-[6px] text-white text-xs font-medium bg-[#FF611C] hover:opacity-90 transition cursor-pointer"
              >
                Edit Template
              </button>
              <button
                type="button"
                onClick={() => setViewingTemplate(null)}
                className="px-4 py-2 rounded-[6px] border border-[#EDEDED] bg-white text-[#575765] text-xs font-medium hover:bg-neutral-50 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         EDIT TEMPLATE MODAL
         ========================================================================= */}
      {editingTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setEditingTemplate(null)}
        >
          <div
            className="w-full max-w-[620px] rounded-[12px] bg-white shadow-2xl border border-[#EDEDED] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#EDEDED] px-6 py-4">
              <h3 className="text-[18px] font-semibold text-[#3D3D49]">
                Edit Email Template
              </h3>
              <button
                type="button"
                onClick={() => setEditingTemplate(null)}
                className="size-7 rounded-full flex items-center justify-center text-[#8C8C9A] hover:bg-neutral-100 hover:text-[#3D3D49] transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#575765] block font-medium mb-1">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={editingTemplate.name}
                    onChange={(e) =>
                      setEditingTemplate({ ...editingTemplate, name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                  />
                </div>
                <div>
                  <label className="text-[#575765] block font-medium mb-1">
                    Category
                  </label>
                  <select
                    value={editingTemplate.category}
                    onChange={(e) =>
                      setEditingTemplate({ ...editingTemplate, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] bg-white"
                  >
                    <option value="Sales">Sales</option>
                    <option value="Orders">Orders</option>
                    <option value="Finance">Finance</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Repair">Repair</option>
                    <option value="Warranty">Warranty</option>
                    <option value="Purchase">Purchase</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#575765] block font-medium mb-1">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={editingTemplate.subject}
                  onChange={(e) =>
                    setEditingTemplate({ ...editingTemplate, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[#575765] block font-medium mb-1">
                    Trigger / Action
                  </label>
                  <input
                    type="text"
                    value={editingTemplate.trigger}
                    onChange={(e) =>
                      setEditingTemplate({ ...editingTemplate, trigger: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                  />
                </div>
                <div>
                  <label className="text-[#575765] block font-medium mb-1">
                    Recipient
                  </label>
                  <select
                    value={editingTemplate.recipient}
                    onChange={(e) =>
                      setEditingTemplate({
                        ...editingTemplate,
                        recipient: e.target.value as "Customer" | "Supplier",
                      })
                    }
                    className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] bg-white"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Supplier">Supplier</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#575765] block font-medium mb-1">
                    Status
                  </label>
                  <select
                    value={editingTemplate.status}
                    onChange={(e) =>
                      setEditingTemplate({
                        ...editingTemplate,
                        status: e.target.value as "Active" | "Inactive",
                      })
                    }
                    className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#575765] block font-medium mb-1">
                  Template Content
                </label>
                <textarea
                  rows={4}
                  value={editingTemplate.bodyPreview || ""}
                  onChange={(e) =>
                    setEditingTemplate({
                      ...editingTemplate,
                      bodyPreview: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-[#EDEDED] bg-[#F8FAFD]">
              <button
                type="button"
                onClick={() => setEditingTemplate(null)}
                className="px-4 py-2 rounded-[6px] border border-[#EDEDED] bg-white text-[#575765] text-xs font-medium hover:bg-neutral-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-[6px] text-white text-xs font-medium bg-[#FF611C] hover:opacity-90 transition cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
         ADD NEW TEMPLATE MODAL
         ========================================================================= */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div
            className="w-full max-w-[620px] rounded-[12px] bg-white shadow-2xl border border-[#EDEDED] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#EDEDED] px-6 py-4">
              <h3 className="text-[18px] font-semibold text-[#3D3D49]">
                Add New Email Template
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="size-7 rounded-full flex items-center justify-center text-[#8C8C9A] hover:bg-neutral-100 hover:text-[#3D3D49] transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#575765] block font-medium mb-1">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Service Update"
                    value={newTemplate.name}
                    onChange={(e) =>
                      setNewTemplate({ ...newTemplate, name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                  />
                </div>
                <div>
                  <label className="text-[#575765] block font-medium mb-1">
                    Category
                  </label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) =>
                      setNewTemplate({ ...newTemplate, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] bg-white"
                  >
                    <option value="Sales">Sales</option>
                    <option value="Orders">Orders</option>
                    <option value="Finance">Finance</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Repair">Repair</option>
                    <option value="Warranty">Warranty</option>
                    <option value="Purchase">Purchase</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#575765] block font-medium mb-1">
                  Subject Line *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Important update regarding {{order_number}}"
                  value={newTemplate.subject}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, subject: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-[#575765] block font-medium mb-1">
                    Trigger / Action
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. On Status Change"
                    value={newTemplate.trigger}
                    onChange={(e) =>
                      setNewTemplate({ ...newTemplate, trigger: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                  />
                </div>
                <div>
                  <label className="text-[#575765] block font-medium mb-1">
                    Recipient
                  </label>
                  <select
                    value={newTemplate.recipient}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        recipient: e.target.value as "Customer" | "Supplier",
                      })
                    }
                    className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] bg-white"
                  >
                    <option value="Customer">Customer</option>
                    <option value="Supplier">Supplier</option>
                  </select>
                </div>
                <div>
                  <label className="text-[#575765] block font-medium mb-1">
                    Status
                  </label>
                  <select
                    value={newTemplate.status}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        status: e.target.value as "Active" | "Inactive",
                      })
                    }
                    className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#575765] block font-medium mb-1">
                  Template Content
                </label>
                <textarea
                  rows={4}
                  placeholder="Write email body template here..."
                  value={newTemplate.bodyPreview}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, bodyPreview: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-[6px] border border-[#EDEDED] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-3.5 border-t border-[#EDEDED] bg-[#F8FAFD]">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-[6px] border border-[#EDEDED] bg-white text-[#575765] text-xs font-medium hover:bg-neutral-50 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateTemplate}
                className="px-4 py-2 rounded-[6px] text-white text-xs font-medium bg-[#FF611C] hover:opacity-90 transition cursor-pointer"
              >
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
