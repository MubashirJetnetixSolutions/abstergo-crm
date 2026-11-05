"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import LeadsStatCards from "@/components/leads/LeadsStatCards";
import LeadsPipelineTable, { MOCK_LEADS, LeadItem } from "@/components/leads/LeadsPipelineTable";
import LeadsKanbanBoard from "@/components/leads/LeadsKanbanBoard";
import {
  PlusCircleIcon,
  FilterIcon,
  SearchIcon,
  ChevronDownIcon,
} from "@/components/icons/Icons";

export default function LeadsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Filter States
  const [selectedStage, setSelectedStage] = useState("All Stages");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [selectedPriority, setSelectedPriority] = useState("All Priorities");
  const [selectedTechnician, setSelectedTechnician] = useState("All Technicians");

  const STAGE_OPTIONS = [
    "All Stages",
    "Contacted",
    "Qualified",
    "Follow-up",
    "Converted",
    "Lost Deal",
  ];
  const SOURCE_OPTIONS = ["All Sources", "Manual", "Form", "Website", "Referral"];
  const PRIORITY_OPTIONS = [
    "All Priorities",
    "High Priority",
    "Medium Priority",
    "Low Priority",
  ];
  const TECHNICIAN_OPTIONS = [
    "All Technicians",
    "Marcus Johnson",
    "Kwesi Boateng",
    "Jean Martin",
  ];

  // Filtered Leads for Table
  const filteredLeads = useMemo(() => {
    return MOCK_LEADS.filter((lead) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = lead.leadName.toLowerCase().includes(query);
        const matchesCompany = lead.companyName.toLowerCase().includes(query);
        const matchesContact = lead.contact.toLowerCase().includes(query);
        const matchesNumber = lead.leadNumber.toLowerCase().includes(query);
        if (!matchesName && !matchesCompany && !matchesContact && !matchesNumber) {
          return false;
        }
      }

      // Stage
      if (selectedStage !== "All Stages" && lead.stage !== selectedStage) {
        return false;
      }

      // Source
      if (selectedSource !== "All Sources" && lead.source !== selectedSource) {
        return false;
      }

      // Priority
      if (selectedPriority !== "All Priorities") {
        const priorityMatch = selectedPriority.replace(" Priority", "");
        if (lead.priority !== priorityMatch) {
          return false;
        }
      }

      // Technician
      if (
        selectedTechnician !== "All Technicians" &&
        lead.technician !== selectedTechnician
      ) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedStage, selectedSource, selectedPriority, selectedTechnician]);

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Leads Pipeline" />

        {/* Main Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Page Heading Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight tracking-tight">
                Leads Pipeline
              </h1>
              <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                Leads, pipeline, and opportunities
              </p>
            </div>

            {/* Top Right Action Group */}
            <div className="flex items-center gap-3">
              {/* View Toggle (List vs Grid/Kanban) */}
              <div className="flex items-center bg-white border border-[#EDEDED] rounded-[8px] p-1 shadow-sm">
                {/* List View Button */}
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-[6px] transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-[#FF611C] text-white shadow-sm"
                      : "text-[#575765] hover:text-[#3D3D49] hover:bg-neutral-100"
                  }`}
                  title="List View"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                  >
                    <path
                      d="M3.33334 5H16.6667M3.33334 10H16.6667M3.33334 15H16.6667"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {/* Grid / Kanban View Button */}
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-[6px] transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-[#FF611C] text-white shadow-sm"
                      : "text-[#575765] hover:text-[#3D3D49] hover:bg-neutral-100"
                  }`}
                  title="Kanban Board View"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                  >
                    <rect
                      x="3.25"
                      y="3.25"
                      width="5.5"
                      height="5.5"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="11.25"
                      y="3.25"
                      width="5.5"
                      height="5.5"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="3.25"
                      y="11.25"
                      width="5.5"
                      height="5.5"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <rect
                      x="11.25"
                      y="11.25"
                      width="5.5"
                      height="5.5"
                      rx="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
              </div>

              {/* Add New Lead Button */}
              <Link
                href="/leads/new"
                className="px-4 py-2.5 rounded-[8px] flex items-center gap-2 text-white font-medium text-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer border border-white/20"
                style={{
                  background:
                    "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                <PlusCircleIcon className="size-4 text-white" />
                <span>Add New Lead</span>
              </Link>
            </div>
          </div>

          {/* 5 Top Stat Cards */}
          <LeadsStatCards />

          {/* Main Card Section */}
          <div className="bg-white border border-[#EDEDED] rounded-[12px] shadow-sm flex flex-col overflow-hidden">
            {/* Card Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-[#EDEDED]">
              <h2 className="font-medium text-[#575765] text-[20px]">
                Leads Pipeline
              </h2>

              <div className="flex items-center gap-2.5">
                {/* Search Box / Button */}
                {isSearchOpen ? (
                  <div className="flex items-center gap-2 border border-[#EDEDED] rounded-[8px] px-3 py-1.5 bg-white transition-all">
                    <SearchIcon className="size-4 text-[#8C8C9A]" />
                    <input
                      type="text"
                      placeholder="Search leads..."
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

            {/* Dedicated Filter Subheader Row (Figma 6423:24689) */}
            {isFilterOpen && (
              <div className="min-h-[56px] border-b border-[#EDEDED] px-5 py-2.5 flex flex-wrap gap-3 items-center bg-white">
                {/* 1. All Stages Dropdown */}
                <div className="relative inline-flex items-center">
                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="bg-white border border-[#EDEDED] rounded-[8px] pl-3.5 pr-8 py-1.5 text-xs font-normal text-[#575765] appearance-none outline-none cursor-pointer hover:border-[#D1D5DB] transition-all"
                  >
                    {STAGE_OPTIONS.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="size-3 text-[#575765] absolute right-2.5 pointer-events-none" />
                </div>

                {/* 2. All Sources Dropdown */}
                <div className="relative inline-flex items-center">
                  <select
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                    className="bg-white border border-[#EDEDED] rounded-[8px] pl-3.5 pr-8 py-1.5 text-xs font-normal text-[#575765] appearance-none outline-none cursor-pointer hover:border-[#D1D5DB] transition-all"
                  >
                    {SOURCE_OPTIONS.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="size-3 text-[#575765] absolute right-2.5 pointer-events-none" />
                </div>

                {/* 3. Priority Dropdown */}
                <div className="relative inline-flex items-center">
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="bg-white border border-[#EDEDED] rounded-[8px] pl-3.5 pr-8 py-1.5 text-xs font-normal text-[#575765] appearance-none outline-none cursor-pointer hover:border-[#D1D5DB] transition-all"
                  >
                    {PRIORITY_OPTIONS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="size-3 text-[#575765] absolute right-2.5 pointer-events-none" />
                </div>

                {/* 4. All Technicians Dropdown */}
                <div className="relative inline-flex items-center">
                  <select
                    value={selectedTechnician}
                    onChange={(e) => setSelectedTechnician(e.target.value)}
                    className="bg-white border border-[#EDEDED] rounded-[8px] pl-3.5 pr-8 py-1.5 text-xs font-normal text-[#575765] appearance-none outline-none cursor-pointer hover:border-[#D1D5DB] transition-all"
                  >
                    {TECHNICIAN_OPTIONS.map((tech) => (
                      <option key={tech} value={tech}>
                        {tech}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="size-3 text-[#575765] absolute right-2.5 pointer-events-none" />
                </div>

                {/* Reset Filters (if any filter active) */}
                {(selectedStage !== "All Stages" ||
                  selectedSource !== "All Sources" ||
                  selectedPriority !== "All Priorities" ||
                  selectedTechnician !== "All Technicians") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStage("All Stages");
                      setSelectedSource("All Sources");
                      setSelectedPriority("All Priorities");
                      setSelectedTechnician("All Technicians");
                    }}
                    className="text-xs text-[#FF611C] hover:underline px-2 py-1 font-medium cursor-pointer"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            )}

            {/* Views Switcher: Table View vs Kanban Card View */}
            {viewMode === "list" ? (
              <LeadsPipelineTable leads={filteredLeads} />
            ) : (
              <LeadsKanbanBoard
                selectedStage={selectedStage}
                selectedPriority={selectedPriority}
                selectedTechnician={selectedTechnician}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
