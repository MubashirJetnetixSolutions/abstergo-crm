"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  ExportIcon,
  FilterIcon,
  CalendarIcon,
  MoreVerticalIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EditIcon,
  EyeIcon,
  DeleteIcon,
  CloseIcon,
} from "../icons/Icons";
import { QuotationTab } from "@/app/quotations/page";
import RevisionRequestedModal from "./RevisionRequestedModal";
import ApproveQuotationModal from "./ApproveQuotationModal";

/* =========================================================================
   TYPES
   ========================================================================= */
interface QuotationRowTab1 {
  id: string;
  quoteCode: string;
  customerName: string;
  customerInitials: string;
  customerAvatarBg: string;
  customerAvatarColor: string;
  items: string;
  total: string;
  validUntil: string;
  salesman: string;
  salesmanInitials: string;
  salesmanAvatarBg: string;
  salesmanAvatarColor: string;
  created: string;
  status: { label: string; bg: string; border: string; text: string };
}

interface QuotationRowTab2 {
  id: string;
  quoteCode: string;
  customerName: string;
  customerInitials: string;
  customerAvatarBg: string;
  customerAvatarColor: string;
  items: string;
  total: string;
  validUntil: string;
  salesman: string;
  salesmanInitials: string;
  salesmanAvatarBg: string;
  salesmanAvatarColor: string;
  approved?: boolean;
  revision?: boolean;
}

interface QuotationRowTab3 {
  id: string;
  quoteCode: string;
  customerName: string;
  customerInitials: string;
  customerAvatarBg: string;
  customerAvatarColor: string;
  validUntil: string;
  salesman: string;
  salesmanInitials: string;
  salesmanAvatarBg: string;
  salesmanAvatarColor: string;
  created: string;
  reason: string;
}

/* =========================================================================
   INITIAL DATA MATCHING MOCKUP IMAGES EXACTLY
   ========================================================================= */
// Tab 1: Quotations (Image 1 Mockup)
const INITIAL_TAB1: QuotationRowTab1[] = [
  {
    id: "tab1-1",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E7F2FC]",
    customerAvatarColor: "text-[#0D79E4]",
    items: "2 Items",
    total: "CFA 428,500",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    status: { label: "Converted", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
  },
  {
    id: "tab1-2",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E7F2FC]",
    customerAvatarColor: "text-[#0D79E4]",
    items: "2 Items",
    total: "CFA 428,500",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    status: { label: "Approved", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
  },
  {
    id: "tab1-3",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E7F2FC]",
    customerAvatarColor: "text-[#0D79E4]",
    items: "2 Items",
    total: "CFA 428,500",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    status: { label: "Converted", bg: "bg-[#E7F2FC]", border: "border-[#0D79E4]", text: "text-[#0D79E4]" },
  },
  {
    id: "tab1-4",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E7F2FC]",
    customerAvatarColor: "text-[#0D79E4]",
    items: "2 Items",
    total: "CFA 428,500",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    status: { label: "Approved", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
  },
  {
    id: "tab1-5",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E7F2FC]",
    customerAvatarColor: "text-[#0D79E4]",
    items: "2 Items",
    total: "CFA 428,500",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    status: { label: "Draft", bg: "bg-[#F3F4F6]", border: "border-[#E5E7EB]", text: "text-[#6B7280]" },
  },
  {
    id: "tab1-6",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E7F2FC]",
    customerAvatarColor: "text-[#0D79E4]",
    items: "2 Items",
    total: "CFA 428,500",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    status: { label: "Approved", bg: "bg-[#E5F4F3]", border: "border-[#009689]", text: "text-[#009689]" },
  },
  {
    id: "tab1-7",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E7F2FC]",
    customerAvatarColor: "text-[#0D79E4]",
    items: "2 Items",
    total: "CFA 428,500",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    status: { label: "Draft", bg: "bg-[#F3F4F6]", border: "border-[#E5E7EB]", text: "text-[#6B7280]" },
  },
  {
    id: "tab1-8",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E7F2FC]",
    customerAvatarColor: "text-[#0D79E4]",
    items: "2 Items",
    total: "CFA 428,500",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    status: { label: "Pending", bg: "bg-[#FEF3C7]", border: "border-[#F59E0B]", text: "text-[#D97706]" },
  },
  {
    id: "tab1-9",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E7F2FC]",
    customerAvatarColor: "text-[#0D79E4]",
    items: "2 Items",
    total: "CFA 428,500",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    status: { label: "Revision", bg: "bg-[#FEE2E2]", border: "border-[#EF4444]", text: "text-[#DC2626]" },
  },
  {
    id: "tab1-10",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E7F2FC]",
    customerAvatarColor: "text-[#0D79E4]",
    items: "2 Items",
    total: "CFA 428,500",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    status: { label: "Pending", bg: "bg-[#FEF3C7]", border: "border-[#F59E0B]", text: "text-[#D97706]" },
  },
];

// Tab 2: Awaiting Approval (Image 2 Mockup)
const INITIAL_TAB2: QuotationRowTab2[] = Array.from({ length: 10 }, (_, i) => ({
  id: `tab2-${i + 1}`,
  quoteCode: i === 0 || i % 2 === 0 ? "QOT-0536" : "QOT-0320",
  customerName: i === 0 || i % 2 === 0 ? "Kumasi Polytechnic" : "Joseph J. Martin",
  customerInitials: i === 0 || i % 2 === 0 ? "KP" : "AS",
  customerAvatarBg: "bg-[#E7F2FC]",
  customerAvatarColor: "text-[#0D79E4]",
  items: "2 Items",
  total: "CFA 428,500",
  validUntil: "12 Aug, 2026",
  salesman: "Yaw Darko Martin",
  salesmanInitials: "YD",
  salesmanAvatarBg: "bg-[#E7F2FC]",
  salesmanAvatarColor: "text-[#0D79E4]",
  approved: false,
  revision: false,
}));

// Tab 3: Revision Requested (Image 3 Mockup)
const INITIAL_TAB3: QuotationRowTab3[] = [
  {
    id: "tab3-1",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E5F4F3]",
    customerAvatarColor: "text-[#009689]",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    reason: "Its tooo much and don't seem appropriate to me..",
  },
  {
    id: "tab3-2",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E7F2FC]",
    customerAvatarColor: "text-[#0D79E4]",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    reason: "Its tooo much and don't seem appropriate to me..",
  },
  {
    id: "tab3-3",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E5F4F3]",
    customerAvatarColor: "text-[#009689]",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#FDF7E5]",
    salesmanAvatarColor: "text-[#EDAC00]",
    created: "12 Aug, 2026",
    reason: "Its tooo much and don't seem appropriate to me..",
  },
  {
    id: "tab3-4",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#FFEFE8]",
    customerAvatarColor: "text-[#FF611C]",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#FFEFE8]",
    salesmanAvatarColor: "text-[#FF611C]",
    created: "12 Aug, 2026",
    reason: "Its tooo much and don't seem appropriate to me..",
  },
  {
    id: "tab3-5",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E5F4F3]",
    customerAvatarColor: "text-[#009689]",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E5F4F3]",
    salesmanAvatarColor: "text-[#009689]",
    created: "12 Aug, 2026",
    reason: "Its tooo much and don't seem appropriate to me..",
  },
  {
    id: "tab3-6",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#F3EEFF]",
    customerAvatarColor: "text-[#8A58FF]",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#FFEFE8]",
    salesmanAvatarColor: "text-[#FF611C]",
    created: "12 Aug, 2026",
    reason: "Its tooo much and don't seem appropriate to me..",
  },
  {
    id: "tab3-7",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#E7F2FC]",
    customerAvatarColor: "text-[#0D79E4]",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    reason: "Its tooo much and don't seem appropriate to me..",
  },
  {
    id: "tab3-8",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#FFEFE8]",
    customerAvatarColor: "text-[#FF611C]",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#FDF7E5]",
    salesmanAvatarColor: "text-[#EDAC00]",
    created: "12 Aug, 2026",
    reason: "Its tooo much and don't seem appropriate to me..",
  },
  {
    id: "tab3-9",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#FDF7E5]",
    customerAvatarColor: "text-[#EDAC00]",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#F3EEFF]",
    salesmanAvatarColor: "text-[#8A58FF]",
    created: "12 Aug, 2026",
    reason: "Its tooo much and don't seem appropriate to me..",
  },
  {
    id: "tab3-10",
    quoteCode: "QOT-0320",
    customerName: "Joseph J. Martin",
    customerInitials: "AS",
    customerAvatarBg: "bg-[#FFEFE8]",
    customerAvatarColor: "text-[#FF611C]",
    validUntil: "12 Aug, 2026",
    salesman: "Yaw Darko Martin",
    salesmanInitials: "YD",
    salesmanAvatarBg: "bg-[#E7F2FC]",
    salesmanAvatarColor: "text-[#0D79E4]",
    created: "12 Aug, 2026",
    reason: "Its tooo much and don't seem appropriate to me..",
  },
];

/* =========================================================================
   REUSABLE: Table Row Action Menu (Edit, View, Delete)
   ========================================================================= */
interface ActionMenuProps {
  quoteCode: string;
  onDelete: () => void;
  dropUp?: boolean;
}

function TableRowActionMenu({
  quoteCode,
  onDelete,
  dropUp = false,
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
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
        className="size-8 rounded-[6px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] hover:bg-neutral-100 transition-colors cursor-pointer ml-auto"
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
          <Link
            href="/quotations/new"
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <EditIcon className="size-3.5 text-[#575765]" />
            <span>Edit</span>
          </Link>

          {/* View Option */}
          <Link
            href={`/quotations/${quoteCode}`}
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
          >
            <EyeIcon className="size-3.5 text-[#575765]" />
            <span>View</span>
          </Link>

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

/* =========================================================================
   MAIN COMPONENT: QuotationsTable
   ========================================================================= */
interface QuotationsTableProps {
  activeTab?: QuotationTab;
  onTabChange?: (tab: QuotationTab) => void;
}

export default function QuotationsTable({
  activeTab = "Quotations",
}: QuotationsTableProps) {
  const router = useRouter();

  // Tab Data States
  const [tab1Rows, setTab1Rows] = useState<QuotationRowTab1[]>(INITIAL_TAB1);
  const [tab2Rows, setTab2Rows] = useState<QuotationRowTab2[]>(INITIAL_TAB2);
  const [tab3Rows, setTab3Rows] = useState<QuotationRowTab3[]>(INITIAL_TAB3);

  // Filter & Search States
  const [showFilters, setShowFilters] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("Approved");
  const [salesmanFilter, setSalesmanFilter] = useState("All");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(25);
  const [perPage, setPerPage] = useState(10);

  const handleRowClick = (quoteCode: string) => {
    router.push(`/quotations/${quoteCode}`);
  };

  // Tab 2 actions: Approve & Revision Modal
  const [selectedRevisionItem, setSelectedRevisionItem] = useState<{
    id: string;
    quoteCode: string;
    customerName: string;
  } | null>(null);

  const [selectedApproveItem, setSelectedApproveItem] = useState<{
    id: string;
    quoteCode: string;
    customerName: string;
  } | null>(null);

  const handleOpenApproveModal = (
    item: QuotationRowTab2,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setSelectedApproveItem({
      id: item.id,
      quoteCode: item.quoteCode,
      customerName: item.customerName,
    });
  };

  const handleConfirmApprove = () => {
    if (selectedApproveItem) {
      setTab2Rows((prev) =>
        prev.map((r) =>
          r.id === selectedApproveItem.id
            ? { ...r, approved: true, revision: false }
            : r
        )
      );
      setSelectedApproveItem(null);
    }
  };

  const handleOpenRevisionModal = (
    item: QuotationRowTab2,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setSelectedRevisionItem({
      id: item.id,
      quoteCode: item.quoteCode,
      customerName: "Kumasi Polytechnic",
    });
  };

  const handleConfirmRevision = () => {
    if (selectedRevisionItem) {
      setTab2Rows((prev) =>
        prev.map((r) =>
          r.id === selectedRevisionItem.id
            ? { ...r, revision: true, approved: false }
            : r
        )
      );
      setSelectedRevisionItem(null);
    }
  };

  // Delete Handlers
  const handleDeleteTab1 = (id: string) => {
    setTab1Rows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDeleteTab2 = (id: string) => {
    setTab2Rows((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDeleteTab3 = (id: string) => {
    setTab3Rows((prev) => prev.filter((r) => r.id !== id));
  };

  // Filter by search query if user enters text
  const getFilteredTab1 = () => {
    let rows = tab1Rows;
    if (statusFilter && statusFilter !== "All" && statusFilter !== "Approved") {
      rows = rows.filter(
        (r) => r.status.label.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    if (!searchQuery.trim()) return rows;
    const q = searchQuery.toLowerCase();
    return rows.filter(
      (r) =>
        r.quoteCode.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.salesman.toLowerCase().includes(q) ||
        r.status.label.toLowerCase().includes(q)
    );
  };

  const getFilteredTab2 = () => {
    let rows = tab2Rows;
    if (salesmanFilter && salesmanFilter !== "All") {
      rows = rows.filter(
        (r) => r.salesman.toLowerCase() === salesmanFilter.toLowerCase()
      );
    }
    if (!searchQuery.trim()) return rows;
    const q = searchQuery.toLowerCase();
    return rows.filter(
      (r) =>
        r.quoteCode.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.salesman.toLowerCase().includes(q)
    );
  };

  const getFilteredTab3 = () => {
    let rows = tab3Rows;
    if (salesmanFilter && salesmanFilter !== "All") {
      rows = rows.filter(
        (r) => r.salesman.toLowerCase() === salesmanFilter.toLowerCase()
      );
    }
    if (!searchQuery.trim()) return rows;
    const q = searchQuery.toLowerCase();
    return rows.filter(
      (r) =>
        r.quoteCode.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.salesman.toLowerCase().includes(q) ||
        r.reason.toLowerCase().includes(q)
    );
  };

  const displayedTab1 = getFilteredTab1();
  const displayedTab2 = getFilteredTab2();
  const displayedTab3 = getFilteredTab3();

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Table Card Container */}
      <div className="w-full bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col">
        {/* Table Top Header Bar */}
        <div className="min-h-[52px] px-5 py-2.5 border-b border-[#EDEDED] flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-medium text-[#575765] text-[20px]">
            Quotations
          </h3>

          <div className="flex items-center gap-2">
            {/* Search Icon & Expandable Search Input */}
            {showSearch ? (
              <div className="flex items-center gap-2 bg-white border border-[#FF611C] rounded-[8px] px-3 h-[34px] shadow-sm animate-in fade-in zoom-in-95 duration-100">
                <SearchIcon className="size-4 text-[#FF611C]" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search quotations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[12px] text-[#3D3D49] outline-none w-48 sm:w-60"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                  className="text-[#575765] hover:text-[#3D3D49]"
                >
                  <CloseIcon className="size-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSearch(true)}
                aria-label="Search"
                className="size-[34px] bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer shrink-0"
              >
                <SearchIcon className="size-5" />
              </button>
            )}

            {/* Export Button */}
            <button
              type="button"
              className="h-[34px] px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
            >
              <ExportIcon className="size-5" />
              <span className="font-medium text-[11px]">Export</span>
            </button>

            {/* Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`h-[34px] px-4 border rounded-[8px] flex items-center gap-2 transition-colors cursor-pointer ${
                showFilters
                  ? "bg-[#FFEFE8] border-[#FF611C] text-[#FF611C]"
                  : "bg-white hover:bg-neutral-50 border-[#EDEDED] text-[#575765] hover:text-[#3D3D49]"
              }`}
            >
              <FilterIcon className="size-5" />
              <span className="font-medium text-[11px]">Filter</span>
            </button>
          </div>
        </div>

        {/* Table Filter Bar Row (Toggleable) */}
        {showFilters && (
          <div className="min-h-[52px] px-5 py-3 border-b border-[#EDEDED] flex flex-wrap items-center gap-3 bg-white">
            {/* Start Date */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-[#575765] font-normal">Start Date:</span>
              <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 focus-within:border-[#FF611C] transition-colors">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer"
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
                  className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Tab 1: Status Dropdown Pill */}
            {activeTab === "Quotations" && (
              <div className="relative inline-flex items-center">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-8 py-1.5 text-[#575765] text-[13px] appearance-none outline-none cursor-pointer hover:border-neutral-300 transition-colors"
                >
                  <option value="Approved">Status: Approved</option>
                  <option value="All">Status: All</option>
                  <option value="Converted">Status: Converted</option>
                  <option value="Draft">Status: Draft</option>
                  <option value="Pending">Status: Pending</option>
                  <option value="Revision">Status: Revision</option>
                </select>
                <ChevronDownIcon className="size-4 text-[#575765] absolute right-2.5 pointer-events-none" />
              </div>
            )}

            {/* Tab 2 & Tab 3: Salesman Dropdown Pill */}
            {(activeTab === "Awaiting Approval" || activeTab === "Revision Requested") && (
              <div className="relative inline-flex items-center">
                <select
                  value={salesmanFilter}
                  onChange={(e) => setSalesmanFilter(e.target.value)}
                  className="bg-white border border-[#EDEDED] rounded-[6px] pl-3 pr-8 py-1.5 text-[#575765] text-[13px] appearance-none outline-none cursor-pointer hover:border-neutral-300 transition-colors"
                >
                  <option value="All">Salesman: All</option>
                  <option value="Yaw Darko Martin">Salesman: Yaw Darko Martin</option>
                  <option value="Joseph J. Martin">Salesman: Joseph J. Martin</option>
                  <option value="Emmanuel Darko">Salesman: Emmanuel Darko</option>
                </select>
                <ChevronDownIcon className="size-4 text-[#575765] absolute right-2.5 pointer-events-none" />
              </div>
            )}

            {(startDate || endDate) && (
              <button
                type="button"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                }}
                className="text-[11px] text-[#FF611C] hover:underline cursor-pointer"
              >
                Reset Dates
              </button>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 1: Quotations Table View (Image 1 Mockup)
            Action three dots: Edit, View, Delete
           ========================================================================= */}
        {activeTab === "Quotations" && (
          <div className="w-full overflow-x-auto pb-16">
            <table className="w-full text-left border-collapse min-w-[1050px]">
              <thead>
                <tr className="border-b border-[#EDEDED] bg-white text-[#575765] text-[11px] font-medium select-none">
                  <th className="py-3 px-4">Quotation#</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Valid Until</th>
                  <th className="py-3 px-4">Salesman</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
                {displayedTab1.map((item, idx) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item.quoteCode)}
                    className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Quotation ID */}
                    <td className="py-4 px-4 font-normal text-[#3D3D49] group-hover:text-[#FF611C] transition-colors whitespace-nowrap">
                      {item.quoteCode}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`size-7 rounded-full flex items-center justify-center shrink-0 font-medium text-[11px] ${item.customerAvatarBg} ${item.customerAvatarColor}`}
                        >
                          {item.customerInitials}
                        </div>
                        <span className="font-normal text-[#3D3D49] truncate">
                          {item.customerName}
                        </span>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                      {item.items}
                    </td>

                    {/* Total */}
                    <td className="py-4 px-4 font-normal text-[#3D3D49] whitespace-nowrap">
                      {item.total}
                    </td>

                    {/* Valid Until */}
                    <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                      {item.validUntil}
                    </td>

                    {/* Salesman */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`size-7 rounded-full flex items-center justify-center shrink-0 font-medium text-[11px] ${item.salesmanAvatarBg} ${item.salesmanAvatarColor}`}
                        >
                          {item.salesmanInitials}
                        </div>
                        <span className="font-normal text-[#3D3D49] truncate">
                          {item.salesman}
                        </span>
                      </div>
                    </td>

                    {/* Created */}
                    <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                      {item.created}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-[6px] border text-[11px] font-normal ${item.status.bg} ${item.status.border} ${item.status.text}`}
                      >
                        {item.status.label}
                      </span>
                    </td>

                    {/* Action Three-Dots Menu with Edit, View, Delete */}
                    <td
                      className="py-4 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <TableRowActionMenu
                        quoteCode={item.quoteCode}
                        onDelete={() => handleDeleteTab1(item.id)}
                        dropUp={idx >= 6}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* =========================================================================
            TAB 2: Awaiting Approval Table View (Image 2 Mockup)
            Columns: Quotation#, Customer, Items, Total, Valid Until, Salesman, Request (Revision & Approve), Action (Edit, View, Delete)
           ========================================================================= */}
        {activeTab === "Awaiting Approval" && (
          <div className="w-full overflow-x-auto pb-16">
            <table className="w-full text-left border-collapse min-w-[1050px]">
              <thead>
                <tr className="border-b border-[#EDEDED] bg-white text-[#575765] text-[11px] font-medium select-none">
                  <th className="py-3 px-4">Quotation#</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Valid Until</th>
                  <th className="py-3 px-4">Salesman</th>
                  <th className="py-3 px-4">Request</th>
                  <th className="py-3 px-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
                {displayedTab2.map((item, idx) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item.quoteCode)}
                    className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Quotation ID */}
                    <td className="py-4 px-4 font-normal text-[#3D3D49] group-hover:text-[#FF611C] transition-colors whitespace-nowrap">
                      {item.quoteCode}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`size-7 rounded-full flex items-center justify-center shrink-0 font-medium text-[11px] ${item.customerAvatarBg} ${item.customerAvatarColor}`}
                        >
                          {item.customerInitials}
                        </div>
                        <span className="font-normal text-[#3D3D49] truncate">
                          {item.customerName}
                        </span>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                      {item.items}
                    </td>

                    {/* Total */}
                    <td className="py-4 px-4 font-normal text-[#3D3D49] whitespace-nowrap">
                      {item.total}
                    </td>

                    {/* Valid Until */}
                    <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                      {item.validUntil}
                    </td>

                    {/* Salesman */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`size-7 rounded-full flex items-center justify-center shrink-0 font-medium text-[11px] ${item.salesmanAvatarBg} ${item.salesmanAvatarColor}`}
                        >
                          {item.salesmanInitials}
                        </div>
                        <span className="font-normal text-[#3D3D49] truncate">
                          {item.salesman}
                        </span>
                      </div>
                    </td>

                    {/* Request Action Buttons: Revision & Approve */}
                    <td
                      className="py-4 px-4 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleOpenRevisionModal(item, e)}
                          className={`px-5 py-1.5 rounded-[6px] font-medium text-[11px] shadow-sm transition-colors cursor-pointer ${
                            item.revision
                              ? "bg-[#991B1B] text-white"
                              : "bg-[#DC2626] hover:bg-[#B91C1C] text-white"
                          }`}
                        >
                          {item.revision ? "Requested" : "Revision"}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleOpenApproveModal(item, e)}
                          className={`px-5 py-1.5 rounded-[6px] font-medium text-[11px] shadow-sm transition-colors cursor-pointer ${
                            item.approved
                              ? "bg-[#065F46] text-white"
                              : "bg-[#10B981] hover:bg-[#059669] text-white"
                          }`}
                        >
                          {item.approved ? "Approved" : "Approve"}
                        </button>
                      </div>
                    </td>

                    {/* Action Three-Dots Menu with Edit, View, Delete */}
                    <td
                      className="py-4 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <TableRowActionMenu
                        quoteCode={item.quoteCode}
                        onDelete={() => handleDeleteTab2(item.id)}
                        dropUp={idx >= 6}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* =========================================================================
            TAB 3: Revision Requested Table View (Image 3 Mockup)
            Columns: Quotation#, Customer, Valid Until, Salesman, Created, Reason, Request (Revision Requested badge), Action (Edit, View, Delete)
           ========================================================================= */}
        {activeTab === "Revision Requested" && (
          <div className="w-full overflow-x-auto pb-16">
            <table className="w-full text-left border-collapse min-w-[1050px]">
              <thead>
                <tr className="border-b border-[#EDEDED] bg-white text-[#575765] text-[11px] font-medium select-none">
                  <th className="py-3 px-4">Quotation#</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Valid Until</th>
                  <th className="py-3 px-4">Salesman</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4">Reason</th>
                  <th className="py-3 px-4">Request</th>
                  <th className="py-3 px-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
                {displayedTab3.map((item, idx) => (
                  <tr
                    key={item.id}
                    onClick={() => handleRowClick(item.quoteCode)}
                    className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Quotation ID */}
                    <td className="py-4 px-4 font-normal text-[#3D3D49] group-hover:text-[#FF611C] transition-colors whitespace-nowrap">
                      {item.quoteCode}
                    </td>

                    {/* Customer with varied avatar colors */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`size-7 rounded-full flex items-center justify-center shrink-0 font-medium text-[11px] ${item.customerAvatarBg} ${item.customerAvatarColor}`}
                        >
                          {item.customerInitials}
                        </div>
                        <span className="font-normal text-[#3D3D49] truncate">
                          {item.customerName}
                        </span>
                      </div>
                    </td>

                    {/* Valid Until */}
                    <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                      {item.validUntil}
                    </td>

                    {/* Salesman with varied avatar colors */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`size-7 rounded-full flex items-center justify-center shrink-0 font-medium text-[11px] ${item.salesmanAvatarBg} ${item.salesmanAvatarColor}`}
                        >
                          {item.salesmanInitials}
                        </div>
                        <span className="font-normal text-[#3D3D49] truncate">
                          {item.salesman}
                        </span>
                      </div>
                    </td>

                    {/* Created */}
                    <td className="py-4 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                      {item.created}
                    </td>

                    {/* Reason */}
                    <td
                      className="py-4 px-4 text-[#575765] font-normal max-w-[280px] truncate"
                      title={item.reason}
                    >
                      {item.reason}
                    </td>

                    {/* Request Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-[6px] bg-[#FEE9E9] text-[#F92424] text-[11px] font-normal border border-[#F92424]/20 inline-block whitespace-nowrap">
                        Revision Requested
                      </span>
                    </td>

                    {/* Action Three-Dots Menu with Edit, View, Delete */}
                    <td
                      className="py-4 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <TableRowActionMenu
                        quoteCode={item.quoteCode}
                        onDelete={() => handleDeleteTab3(item.id)}
                        dropUp={idx >= 6}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table Footer / Pagination Controls */}
        <div className="px-5 py-3 border-t border-[#EDEDED] flex flex-wrap items-center justify-end gap-6 text-[11px] text-[#575765] select-none">
          {/* Per Page Dropdown */}
          <div className="flex items-center gap-2">
            <span>Per page:</span>
            <div className="relative inline-flex items-center">
              <select
                value={perPage}
                onChange={(e) => setPerPage(Number(e.target.value))}
                className="bg-transparent text-[#3D3D49] font-medium pr-5 pl-1 py-1 appearance-none outline-none cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <ChevronDownIcon className="size-3.5 text-[#575765] absolute right-0 pointer-events-none" />
            </div>
          </div>

          {/* Page Navigator */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              aria-label="Previous Page"
              className="p-1 rounded-[4px] hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
            >
              <ChevronLeftIcon className="size-4 text-[#575765]" />
            </button>

            <span className="text-[#3D3D49] font-medium">Page {currentPage}</span>

            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              aria-label="Next Page"
              className="p-1 rounded-[4px] hover:bg-neutral-100 cursor-pointer transition-colors"
            >
              <ChevronRightIcon className="size-4 text-[#575765]" />
            </button>
          </div>
        </div>
      </div>

      {/* Revision Requested Modal (Image Mockup) */}
      <RevisionRequestedModal
        isOpen={Boolean(selectedRevisionItem)}
        onClose={() => setSelectedRevisionItem(null)}
        onConfirm={handleConfirmRevision}
        quotationCode={selectedRevisionItem?.quoteCode || "QOT-0320"}
        customerName={selectedRevisionItem?.customerName || "Kumasi Polytechnic"}
        initialReason="Monthly office stationery and printer"
      />

      {/* Approve Quotation Modal (Image Mockup) */}
      <ApproveQuotationModal
        isOpen={Boolean(selectedApproveItem)}
        onClose={() => setSelectedApproveItem(null)}
        onConfirm={handleConfirmApprove}
        quotationCode={selectedApproveItem?.quoteCode || "QOT-0536"}
        customerName={selectedApproveItem?.customerName || "Kumasi Polytechnic"}
      />
    </div>
  );
}
