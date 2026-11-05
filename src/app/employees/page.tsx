"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  SearchIcon,
  FilterIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreVerticalIcon,
  ContactsStatIcon,
} from "@/components/icons/Icons";

function PlusIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" strokeLinecap="round" />
    </svg>
  );
}

function StatUsersIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface EmployeeRow {
  id: string;
  code: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  phone: string;
  specialization?: string;
  repairs: number;
  orders: number;
  sales: number;
  paymentsReceived: string;
  status: "Active" | "Inactive";
}

const SALESMAN_DATA: EmployeeRow[] = [
  {
    id: "s1",
    code: "SAL-001",
    name: "Kwesi Boateng-Acheampong...",
    initials: "KB",
    avatarBg: "bg-[#EFEAFF]",
    avatarText: "text-[#8A58FF]",
    phone: "+233 24 500 1234",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Active",
  },
  {
    id: "s2",
    code: "SAL-002",
    name: "Marcus Trescothik",
    initials: "MT",
    avatarBg: "bg-[#E7F2FC]",
    avatarText: "text-[#0D79E4]",
    phone: "+233 24 500 2345",
    repairs: 8,
    orders: 12,
    sales: 22,
    paymentsReceived: "210,000.00 CFA",
    status: "Active",
  },
  {
    id: "s3",
    code: "SAL-003",
    name: "Emmanuel Boateng",
    initials: "EB",
    avatarBg: "bg-[#EFEAFF]",
    avatarText: "text-[#8A58FF]",
    phone: "+233 24 500 3456",
    repairs: 4,
    orders: 7,
    sales: 9,
    paymentsReceived: "95,000.00 CFA",
    status: "Active",
  },
  {
    id: "s4",
    code: "SAL-004",
    name: "Abena Osei-Bonsu",
    initials: "AO",
    avatarBg: "bg-[#FFF6E6]",
    avatarText: "text-[#EDAC00]",
    phone: "+233 24 500 4567",
    repairs: 11,
    orders: 15,
    sales: 18,
    paymentsReceived: "175,000.00 CFA",
    status: "Inactive",
  },
  {
    id: "s5",
    code: "SAL-005",
    name: "Kwame Mensah",
    initials: "KM",
    avatarBg: "bg-[#E5F4F3]",
    avatarText: "text-[#009689]",
    phone: "+233 24 500 5678",
    repairs: 5,
    orders: 8,
    sales: 16,
    paymentsReceived: "140,000.00 CFA",
    status: "Active",
  },
  {
    id: "s6",
    code: "SAL-006",
    name: "Kweku Aidoo",
    initials: "KA",
    avatarBg: "bg-[#E7F2FC]",
    avatarText: "text-[#0D79E4]",
    phone: "+233 24 500 6789",
    repairs: 2,
    orders: 4,
    sales: 6,
    paymentsReceived: "60,000.00 CFA",
    status: "Inactive",
  },
  {
    id: "s7",
    code: "SAL-007",
    name: "Kwesi Boateng-Acheampong...",
    initials: "KB",
    avatarBg: "bg-[#EFEAFF]",
    avatarText: "text-[#8A58FF]",
    phone: "+233 24 500 1234",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Active",
  },
  {
    id: "s8",
    code: "SAL-008",
    name: "Marcus Trescothik",
    initials: "MT",
    avatarBg: "bg-[#E7F2FC]",
    avatarText: "text-[#0D79E4]",
    phone: "+233 24 500 2345",
    repairs: 7,
    orders: 9,
    sales: 15,
    paymentsReceived: "155,000.00 CFA",
    status: "Active",
  },
];

const TECHNICIAN_DATA: EmployeeRow[] = [
  {
    id: "t1",
    code: "TECH-001",
    name: "Kwesi Boateng-Achea...",
    initials: "KB",
    avatarBg: "bg-[#EFEAFF]",
    avatarText: "text-[#8A58FF]",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 12,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Active",
  },
  {
    id: "t2",
    code: "TECH-002",
    name: "Marcus Trescothik",
    initials: "MT",
    avatarBg: "bg-[#E7F2FC]",
    avatarText: "text-[#0D79E4]",
    phone: "+233 24 500 2345",
    specialization: "Mobile & Tablet",
    repairs: 19,
    orders: 8,
    sales: 10,
    paymentsReceived: "120,000.00 CFA",
    status: "Active",
  },
  {
    id: "t3",
    code: "TECH-003",
    name: "Emmanuel Boateng",
    initials: "EB",
    avatarBg: "bg-[#EFEAFF]",
    avatarText: "text-[#8A58FF]",
    phone: "+233 24 500 3456",
    specialization: "Screen & Display",
    repairs: 8,
    orders: 4,
    sales: 6,
    paymentsReceived: "85,000.00 CFA",
    status: "Active",
  },
  {
    id: "t4",
    code: "TECH-004",
    name: "Abena Osei-Bonsu",
    initials: "AO",
    avatarBg: "bg-[#FFF6E6]",
    avatarText: "text-[#EDAC00]",
    phone: "+233 24 500 4567",
    specialization: "Audio & Accessories",
    repairs: 15,
    orders: 11,
    sales: 17,
    paymentsReceived: "190,000.00 CFA",
    status: "Inactive",
  },
  {
    id: "t5",
    code: "TECH-005",
    name: "Kwame Mensah",
    initials: "KM",
    avatarBg: "bg-[#E5F4F3]",
    avatarText: "text-[#009689]",
    phone: "+233 24 500 5678",
    specialization: "Laptop & Desktop",
    repairs: 14,
    orders: 6,
    sales: 12,
    paymentsReceived: "145,000.00 CFA",
    status: "Active",
  },
  {
    id: "t6",
    code: "TECH-006",
    name: "Kweku Aidoo",
    initials: "KA",
    avatarBg: "bg-[#E7F2FC]",
    avatarText: "text-[#0D79E4]",
    phone: "+233 24 500 6789",
    specialization: "Mobile & Tablet",
    repairs: 5,
    orders: 3,
    sales: 4,
    paymentsReceived: "45,000.00 CFA",
    status: "Inactive",
  },
  {
    id: "t7",
    code: "TECH-007",
    name: "Kwesi Boateng-Achea...",
    initials: "KB",
    avatarBg: "bg-[#EFEAFF]",
    avatarText: "text-[#8A58FF]",
    phone: "+233 24 500 1234",
    specialization: "Screen & Display",
    repairs: 10,
    orders: 7,
    sales: 11,
    paymentsReceived: "135,000.00 CFA",
    status: "Active",
  },
  {
    id: "t8",
    code: "TECH-008",
    name: "Marcus Trescothik",
    initials: "MT",
    avatarBg: "bg-[#E7F2FC]",
    avatarText: "text-[#0D79E4]",
    phone: "+233 24 500 2345",
    specialization: "Audio & Accessories",
    repairs: 11,
    orders: 9,
    sales: 13,
    paymentsReceived: "150,000.00 CFA",
    status: "Active",
  },
];

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState<"salesman" | "technician">("salesman");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Data states
  const [salesData, setSalesData] = useState<EmployeeRow[]>(SALESMAN_DATA);
  const [techData, setTechData] = useState<EmployeeRow[]>(TECHNICIAN_DATA);

  // Filter visibility toggle
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  // Tab-specific filters (Salesman tab)
  const [salesmanFilter, setSalesmanFilter] = useState("All");
  const [salesmanStatusFilter, setSalesmanStatusFilter] = useState("All");

  // Tab-specific filters (Technician tab)
  const [technicianFilter, setTechnicianFilter] = useState("All");
  const [specializationFilter, setSpecializationFilter] = useState("All");
  const [technicianStatusFilter, setTechnicianStatusFilter] = useState("All");

  // Search
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    function handleClickOutside() {
      setActiveMenuId(null);
    }
    if (activeMenuId) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeMenuId]);

  const currentData = activeTab === "salesman" ? salesData : techData;
  const totalCount = currentData.length;
  const activeCount = currentData.filter((i) => i.status === "Active").length;
  const inactiveCount = currentData.filter((i) => i.status === "Inactive").length;

  const filteredData = currentData.filter((item) => {
    // Tab filters
    if (activeTab === "salesman") {
      if (salesmanFilter !== "All" && !item.name.toLowerCase().includes(salesmanFilter.toLowerCase())) {
        return false;
      }
      if (salesmanStatusFilter !== "All" && item.status !== salesmanStatusFilter) {
        return false;
      }
    } else {
      if (technicianFilter !== "All" && !item.name.toLowerCase().includes(technicianFilter.toLowerCase())) {
        return false;
      }
      if (specializationFilter !== "All" && item.specialization !== specializationFilter) {
        return false;
      }
      if (technicianStatusFilter !== "All" && item.status !== technicianStatusFilter) {
        return false;
      }
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = (
        item.name.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        (item.specialization && item.specialization.toLowerCase().includes(q))
      );
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Employees" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-5 max-w-[1680px] w-full mx-auto">
          {/* Header Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col">
              <h1 className="text-[24px] font-semibold text-[#3D3D49] tracking-tight leading-tight">
                Employees
              </h1>
              <p className="text-[13px] text-[#575765] mt-1 font-normal">
                Manage technicians and track assigned work and performance
              </p>
            </div>

            <Link
              href={activeTab === "salesman" ? "/salesmen/new" : "/technicians/new"}
              className="px-4 py-2.5 rounded-[8px] flex items-center gap-2 text-white font-medium text-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer border border-white/20"
              style={{
                background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
              }}
            >
              <PlusIcon className="size-4 text-white" />
              <span>Add New Employee</span>
            </Link>
          </div>

          {/* Tabs Container */}
          <div className="w-full bg-white border border-[#EDEDED] rounded-[8px] px-4 flex items-center gap-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <button
              type="button"
              onClick={() => {
                setActiveTab("salesman");
                setActiveMenuId(null);
              }}
              className={`py-3 text-[13px] font-medium transition-colors border-b-2 cursor-pointer ${
                activeTab === "salesman"
                  ? "text-[#FF611C] border-[#FF611C]"
                  : "text-[#575765] border-transparent hover:text-[#3D3D49]"
              }`}
            >
              Salesman
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("technician");
                setActiveMenuId(null);
              }}
              className={`py-3 text-[13px] font-medium transition-colors border-b-2 cursor-pointer ${
                activeTab === "technician"
                  ? "text-[#FF611C] border-[#FF611C]"
                  : "text-[#575765] border-transparent hover:text-[#3D3D49]"
              }`}
            >
              Technician
            </button>
          </div>

          {/* 3 Top Stat Cards (Images 1 & 2 Mockup: Total, Active, Inactive) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {/* 1. Total */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 sm:p-6 flex flex-col justify-between shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02)] transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <span className="font-normal text-[#575765] text-[15px] leading-tight">Total</span>
                <div className="flex size-9 sm:size-10 items-center justify-center rounded-[8px] bg-[#1E75FF] text-white shrink-0 shadow-sm">
                  <StatUsersIcon className="size-4.5" />
                </div>
              </div>
              <div className="mt-4 flex flex-col">
                <span className="text-[28px] font-semibold text-[#2B2523] leading-none">{totalCount}</span>
              </div>
            </div>

            {/* 2. Active */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 sm:p-6 flex flex-col justify-between shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02)] transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <span className="font-normal text-[#575765] text-[15px] leading-tight">Active</span>
                <div className="flex size-9 sm:size-10 items-center justify-center rounded-[8px] bg-[#009689] text-white shrink-0 shadow-sm">
                  <StatUsersIcon className="size-4.5" />
                </div>
              </div>
              <div className="mt-4 flex flex-col">
                <span className="text-[28px] font-semibold text-[#2B2523] leading-none">{activeCount}</span>
              </div>
            </div>

            {/* 3. Inactive */}
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 sm:p-6 flex flex-col justify-between shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02)] transition hover:shadow-md">
              <div className="flex items-start justify-between">
                <span className="font-normal text-[#575765] text-[15px] leading-tight">Inactive</span>
                <div className="flex size-9 sm:size-10 items-center justify-center rounded-[8px] bg-[#FF4D4F] text-white shrink-0 shadow-sm">
                  <StatUsersIcon className="size-4.5" />
                </div>
              </div>
              <div className="mt-4 flex flex-col">
                <span className="text-[28px] font-semibold text-[#2B2523] leading-none">{inactiveCount}</span>
              </div>
            </div>
          </div>

          {/* Main Card Section */}
          <div className="bg-white border border-[#EDEDED] rounded-[12px] shadow-sm flex flex-col overflow-hidden">
            {/* Card Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-[#EDEDED]">
              <h2 className="font-medium text-[#575765] text-[20px]">
                {activeTab === "salesman" ? "Salesman" : "Technicians"}
              </h2>

              <div className="flex items-center gap-2.5">
                {/* Search Box / Button */}
                {isSearchOpen ? (
                  <div className="flex items-center gap-2 border border-[#EDEDED] rounded-[8px] px-3 py-1.5 bg-white transition-all">
                    <SearchIcon className="size-4 text-[#8C8C9A]" />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-xs text-[#3D3D49] outline-none bg-transparent w-[140px] sm:w-[180px]"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="text-xs text-[#8C8C9A] hover:text-[#3D3D49] cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 rounded-[8px] border border-[#EDEDED] bg-white text-[#575765] hover:bg-neutral-50 transition-colors shadow-sm cursor-pointer"
                    title="Search"
                  >
                    <SearchIcon className="size-4" />
                  </button>
                )}

                {/* Filter Button */}
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-[8px] border text-xs font-medium transition-colors shadow-sm cursor-pointer ${
                    isFilterOpen
                      ? "border-[#FF611C] text-[#FF611C] bg-[#FFF0EB]"
                      : "border-[#EDEDED] bg-white text-[#575765] hover:bg-neutral-50"
                  }`}
                >
                  <FilterIcon className="size-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Dedicated Filter Subheader Row */}
            {isFilterOpen && (
              <div className="min-h-[56px] border-b border-[#EDEDED] px-5 py-2.5 flex flex-wrap gap-3 items-center bg-white">
                {activeTab === "salesman" ? (
                  <>
                    {/* Salesman Dropdown */}
                    <div className="relative">
                      <select
                        value={salesmanFilter}
                        onChange={(e) => setSalesmanFilter(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">All Salesmen</option>
                        <option value="Kwesi Boateng">Kwesi Boateng</option>
                        <option value="Marcus Trescothik">Marcus Trescothik</option>
                        <option value="Emmanuel Boateng">Emmanuel Boateng</option>
                        <option value="Abena Osei-Bonsu">Abena Osei-Bonsu</option>
                        <option value="Kwame Mensah">Kwame Mensah</option>
                        <option value="Kweku Aidoo">Kweku Aidoo</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Status Dropdown */}
                    <div className="relative">
                      <select
                        value={salesmanStatusFilter}
                        onChange={(e) => setSalesmanStatusFilter(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">Status: All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {(salesmanFilter !== "All" || salesmanStatusFilter !== "All") && (
                      <button
                        type="button"
                        onClick={() => {
                          setSalesmanFilter("All");
                          setSalesmanStatusFilter("All");
                        }}
                        className="text-xs text-[#FF611C] hover:underline font-medium ml-1 cursor-pointer"
                      >
                        Reset filters
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {/* Technician Dropdown */}
                    <div className="relative">
                      <select
                        value={technicianFilter}
                        onChange={(e) => setTechnicianFilter(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">All Technicians</option>
                        <option value="Kwesi Boateng">Kwesi Boateng</option>
                        <option value="Marcus Trescothik">Marcus Trescothik</option>
                        <option value="Emmanuel Boateng">Emmanuel Boateng</option>
                        <option value="Abena Osei-Bonsu">Abena Osei-Bonsu</option>
                        <option value="Kwame Mensah">Kwame Mensah</option>
                        <option value="Kweku Aidoo">Kweku Aidoo</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Specialization Dropdown */}
                    <div className="relative">
                      <select
                        value={specializationFilter}
                        onChange={(e) => setSpecializationFilter(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">Specialization: All</option>
                        <option value="Laptop & Desktop">Laptop & Desktop</option>
                        <option value="Mobile & Tablet">Mobile & Tablet</option>
                        <option value="Screen & Display">Screen & Display</option>
                        <option value="Audio & Accessories">Audio & Accessories</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Status Dropdown */}
                    <div className="relative">
                      <select
                        value={technicianStatusFilter}
                        onChange={(e) => setTechnicianStatusFilter(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">Status: All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {(technicianFilter !== "All" || specializationFilter !== "All" || technicianStatusFilter !== "All") && (
                      <button
                        type="button"
                        onClick={() => {
                          setTechnicianFilter("All");
                          setSpecializationFilter("All");
                          setTechnicianStatusFilter("All");
                        }}
                        className="text-xs text-[#FF611C] hover:underline font-medium ml-1 cursor-pointer"
                      >
                        Reset filters
                      </button>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Table Container */}
            <div className="overflow-x-auto border border-[#EDEDED] rounded-[8px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAFAFA] border-b border-[#EDEDED] text-[11px] text-[#8C8C9A] font-medium">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">
                      {activeTab === "salesman" ? "Salesman" : "Technician"}
                    </th>
                    <th className="py-3 px-4">Phone</th>
                    {activeTab === "technician" && (
                      <th className="py-3 px-4">Specialization</th>
                    )}
                    <th className="py-3 px-4">Repairs</th>
                    <th className="py-3 px-4">Orders</th>
                    <th className="py-3 px-4">Sales</th>
                    <th className="py-3 px-4">Payments Received</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEDED] text-[#3D3D49]">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={activeTab === "technician" ? 10 : 9}
                        className="py-8 text-center text-xs text-[#8C8C9A]"
                      >
                        No {activeTab === "salesman" ? "salesmen" : "technicians"} found
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-normal text-[#3D3D49] whitespace-nowrap">
                        <Link
                          href={
                            activeTab === "salesman"
                              ? `/salesmen/${row.code}`
                              : `/technicians/${row.code}`
                          }
                          className="hover:text-[#FF611C] hover:underline cursor-pointer"
                        >
                          {row.code}
                        </Link>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`size-6 rounded-full ${row.avatarBg} ${row.avatarText} text-[10px] font-semibold flex items-center justify-center shrink-0`}
                          >
                            {row.initials}
                          </span>
                          <span className="text-[#3D3D49] font-normal">{row.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#3D3D49] whitespace-nowrap">
                        {row.phone}
                      </td>
                      {activeTab === "technician" && (
                        <td className="py-3.5 px-4 text-[#3D3D49] whitespace-nowrap">
                          {row.specialization}
                        </td>
                      )}
                      <td className="py-3.5 px-4 text-[#3D3D49] font-normal">
                        {row.repairs}
                      </td>
                      <td className="py-3.5 px-4 text-[#3D3D49] font-normal">
                        {row.orders}
                      </td>
                      <td className="py-3.5 px-4 text-[#3D3D49] font-normal">
                        {row.sales}
                      </td>
                      <td className="py-3.5 px-4 text-[#3D3D49] font-normal whitespace-nowrap">
                        {row.paymentsReceived}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-[4px] border text-[11px] font-medium ${
                            row.status === "Active"
                              ? "bg-[#E5F4F3] text-[#009689] border-[#009689]"
                              : "bg-[#FEE9E9] text-[#F92424] border-[#F92424]"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMenuId(activeMenuId === row.id ? null : row.id)
                          }
                          className="size-7 rounded-[6px] border border-[#EDEDED] flex items-center justify-center hover:bg-neutral-100 text-[#8C8C9A] cursor-pointer"
                        >
                          <MoreVerticalIcon className="size-4" />
                        </button>
                        {activeMenuId === row.id && (
                          <div className="absolute right-4 mt-1 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-30 flex flex-col text-xs text-left animate-in fade-in zoom-in-95 duration-100">
                            <Link
                              href={
                                activeTab === "salesman"
                                  ? `/salesmen/${row.code}`
                                  : `/technicians/${row.code}`
                              }
                              onClick={() => setActiveMenuId(null)}
                              className="px-3 py-1.5 hover:bg-neutral-50 text-[#3D3D49] cursor-pointer block"
                            >
                              View Details
                            </Link>
                            <button
                              type="button"
                              onClick={() => setActiveMenuId(null)}
                              className="px-3 py-1.5 hover:bg-neutral-50 text-[#3D3D49] cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (activeTab === "salesman") {
                                  setSalesData((prev) => prev.filter((item) => item.id !== row.id));
                                } else {
                                  setTechData((prev) => prev.filter((item) => item.id !== row.id));
                                }
                                setActiveMenuId(null);
                              }}
                              className="px-3 py-1.5 hover:bg-[#FEE9E9] text-[#F92424] cursor-pointer"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-end gap-4 text-xs text-[#8C8C9A] pt-2">
              <div className="flex items-center gap-1.5">
                <span>Per page:</span>
                <span className="font-medium text-[#3D3D49]">10</span>
                <ChevronDownIcon className="size-3 text-[#8C8C9A]" />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="p-1 hover:text-[#3D3D49] cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeftIcon className="size-3.5" />
                </button>
                <span>Page 25</span>
                <button
                  type="button"
                  className="p-1 hover:text-[#3D3D49] cursor-pointer"
                  title="Next"
                >
                  <ChevronRightIcon className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
