"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import AddFollowUpModal from "@/components/leads/AddFollowUpModal";
import ConvertToCustomerModal from "@/components/leads/ConvertToCustomerModal";
import {
  ChevronLeftIcon,
  CheckmarkCircleIcon,
  EditIcon,
  MoreVerticalIcon,
  ExternalLinkIcon,
  DeleteIcon,
  PlusCircleIcon,
} from "@/components/icons/Icons";

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = (params?.id as string) || "LD-1029";

  const [activeTab, setActiveTab] = useState<"Overview" | "Activity">("Overview");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFollowUpModalOpen, setIsFollowUpModalOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Leads Pipeline" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/leads"
                className="flex size-11 items-center justify-center rounded-[8px] border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
              >
                <ChevronLeftIcon className="size-5" />
              </Link>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <h1 className="font-semibold text-[#3D3D49] text-[24px] leading-tight">
                    Kwame Mensah
                  </h1>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-normal bg-[#F3E8FF] text-[#8A58FF] border border-[#8A58FF]">
                    Qualified
                  </span>
                </div>
                <p className="text-[14px] text-[#575765]">
                  <span>Created on 19 Aug 2026 at 10:42 AM by </span>
                  <span className="font-semibold text-[#3D3D49]">
                    Jean Martin
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Convert to Customer Button */}
              <button
                type="button"
                onClick={() => setIsConvertModalOpen(true)}
                className="flex items-center gap-2 rounded-[8px] bg-[#009689] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#00877a] transition cursor-pointer"
              >
                <CheckmarkCircleIcon className="size-4 text-white" />
                <span>Convert to customer</span>
              </button>

              {/* Edit Lead Button */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-2.5 text-sm font-medium text-[#3D3D49] shadow-sm transition hover:bg-gray-50"
              >
                <EditIcon className="size-4 text-[#575765]" />
                <span>Edit Lead</span>
              </button>

              {/* 3-Dots Action Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex size-10 items-center justify-center rounded-[8px] border border-[#E9ECEF] bg-white text-[#575765] shadow-sm hover:bg-gray-50 transition cursor-pointer"
                >
                  <MoreVerticalIcon className="size-5" />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-44 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1.5 z-40">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsFollowUpModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#3D3D49] hover:bg-[#F8FAFD] transition-colors text-left"
                    >
                      <PlusCircleIcon className="size-4 text-[#575765]" />
                      <span>Add Follow-up</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsDeleteModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#F92424] hover:bg-red-50 transition-colors text-left"
                    >
                      <DeleteIcon className="size-4 text-[#F92424]" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Top Quick-Info Summary Bar */}
          <div className="w-full bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">
                Lead Source
              </span>
              <span className="font-semibold text-[#2B2523] text-sm">
                Manual
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">
                Company
              </span>
              <span className="font-semibold text-[#2B2523] text-sm truncate">
                Mensah Enterprises
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">
                Salesman
              </span>
              <div className="flex items-center gap-1.5 font-semibold text-[#2B2523] text-sm">
                <span className="truncate">Kwesi Boateng</span>
                <ExternalLinkIcon className="size-3.5 text-[#FF611C] shrink-0" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">
                Priority
              </span>
              <div>
                <span className="inline-block px-2 py-0.5 rounded-[6px] border border-[#009689] bg-[#E5F4F3] text-[#009689] text-xs font-medium">
                  • Low
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">
                Status
              </span>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded-[6px] border border-[#8A58FF] bg-[#F3E8FF] text-[#8A58FF] text-xs font-normal">
                  Qualified
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#EDEDED] gap-2">
            {(["Overview", "Activity"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-4 text-[16px] font-medium transition-colors border-b-2 cursor-pointer ${
                    isActive
                      ? "text-[#FF611C] border-[#FF611C] font-semibold"
                      : "text-[#575765] border-transparent hover:text-[#3D3D49]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Tab 1: Overview Content */}
          {activeTab === "Overview" && (
            <div className="flex flex-col gap-6 max-w-[900px]">
              {/* Customer Information Card */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-sm flex flex-col gap-4">
                <h2 className="font-semibold text-[#3D3D49] text-[20px] pb-3 border-b border-[#EDEDED]">
                  Customer Information
                </h2>

                <div className="flex flex-col divide-y divide-[#F3F4F6] text-xs text-[#3D3D49]">
                  <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-[#575765] font-normal">Lead Name:</span>
                    <span className="sm:col-span-2 font-normal text-[#3D3D49]">
                      Kwame Mensah
                    </span>
                  </div>

                  <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-[#575765] font-normal">Company:</span>
                    <span className="sm:col-span-2 font-normal text-[#3D3D49]">
                      Mensah Enterprises
                    </span>
                  </div>

                  <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-[#575765] font-normal">Email:</span>
                    <span className="sm:col-span-2 font-normal text-[#3D3D49]">
                      kwame.mensah@mensahent.gh
                    </span>
                  </div>

                  <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-[#575765] font-normal">Phone:</span>
                    <span className="sm:col-span-2 font-normal text-[#3D3D49]">
                      +233 24 555 0192
                    </span>
                  </div>

                  <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-[#575765] font-normal">Source:</span>
                    <span className="sm:col-span-2 font-normal text-[#3D3D49]">
                      Form
                    </span>
                  </div>

                  <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-[#575765] font-normal">Referred By:</span>
                    <span className="sm:col-span-2 font-normal text-[#3D3D49]">
                      ABC Technologies
                    </span>
                  </div>

                  <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-[#575765] font-normal">Created Date:</span>
                    <span className="sm:col-span-2 font-normal text-[#3D3D49]">
                      Aug 27, 2026
                    </span>
                  </div>

                  <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-[#575765] font-normal">Created By:</span>
                    <span className="sm:col-span-2 font-normal text-[#3D3D49]">
                      Kwesi Boateng-Acheampong
                    </span>
                  </div>

                  <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-[#575765] font-normal">Last Follow-up:</span>
                    <span className="sm:col-span-2 font-normal text-[#3D3D49]">
                      Aug 30, 2026
                    </span>
                  </div>

                  <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <span className="text-[#575765] font-normal">Next Follow-up:</span>
                    <span className="sm:col-span-2 font-normal text-[#3D3D49]">
                      Sep 3, 2026
                    </span>
                  </div>
                </div>
              </div>

              {/* Lead Notes Card */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-sm flex flex-col gap-3">
                <h2 className="font-semibold text-[#3D3D49] text-[20px]">
                  Lead Notes
                </h2>
                <p className="text-xs text-[#575765] font-normal leading-relaxed">
                  This is the primary laptop for our finance director. Please prioritize.
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: Activity Content */}
          {activeTab === "Activity" && (
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-sm flex flex-col gap-6 max-w-[900px]">
              {/* Activity Timeline Items */}
              <div className="flex flex-col gap-6">
                {/* Item 1: Call */}
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full border border-[#8A58FF] bg-[#F3E8FF]/40 text-[#8A58FF] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 20 20" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4.167 3.333h2.5l1.25 3.125-1.563 1.563a12.5 12.5 0 005.626 5.625l1.562-1.563 3.125 1.25v2.5a1.667 1.667 0 01-1.667 1.667A14.167 14.167 0 012.5 5a1.667 1.667 0 011.667-1.667z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#3D3D49] text-sm">
                          Call
                        </span>
                        <span className="px-2 py-0.5 rounded-[6px] text-xs font-normal border border-[#8A58FF] bg-[#F3E8FF] text-[#8A58FF]">
                          Appointment Booked
                        </span>
                      </div>
                      <div className="flex flex-col items-end text-right">
                        <span className="text-xs text-[#3D3D49] font-medium">
                          2 min ago
                        </span>
                        <span className="text-[11px] text-[#8C8C9A]">
                          19 Aug 2026
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-[#575765]">Michael Adu</span>
                    <p className="text-xs text-[#575765] leading-relaxed mt-0.5">
                      Customer confirmed budget. Requested detailed quotation for 10 Dell Latitude 5440 and 5 LG monitors.
                    </p>
                  </div>
                </div>

                {/* Item 2: Email */}
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full border border-[#009689] bg-[#E5F4F3]/40 text-[#009689] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 20 20" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2.5 5.833A1.667 1.667 0 014.167 4.167h11.666A1.667 1.667 0 0117.5 5.833v8.334a1.667 1.667 0 01-1.667 1.666H4.167A1.667 1.667 0 012.5 14.167V5.833z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M17.5 5.833l-7.5 5-7.5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#3D3D49] text-sm">
                          Email
                        </span>
                        <span className="px-2 py-0.5 rounded-[6px] text-xs font-normal border border-[#009689] bg-[#E5F4F3] text-[#009689]">
                          Interested
                        </span>
                      </div>
                      <div className="flex flex-col items-end text-right">
                        <span className="text-xs text-[#3D3D49] font-medium">
                          2 min ago
                        </span>
                        <span className="text-[11px] text-[#8C8C9A]">
                          19 Aug 2026
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-[#575765]">Michael Adu</span>
                    <p className="text-xs text-[#575765] leading-relaxed mt-0.5">
                      Customer confirmed budget. Requested detailed quotation for 10 Dell Latitude 5440 and 5 LG monitors.
                    </p>
                  </div>
                </div>

                {/* Item 3: Appointment */}
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full border border-[#FF611C] bg-[#FFF0EB]/40 text-[#FF611C] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 20 20" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3.333" y="4.167" width="13.333" height="12.5" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M13.333 2.5v3.333M6.667 2.5v3.333M3.333 8.333h13.334" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#3D3D49] text-sm">
                          Appointment
                        </span>
                        <span className="px-2 py-0.5 rounded-[6px] text-xs font-normal border border-[#FF611C] bg-[#FFF0EB] text-[#FF611C]">
                          Not-Interested
                        </span>
                      </div>
                      <div className="flex flex-col items-end text-right">
                        <span className="text-xs text-[#3D3D49] font-medium">
                          2 min ago
                        </span>
                        <span className="text-[11px] text-[#8C8C9A]">
                          19 Aug 2026
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-[#575765]">Michael Adu</span>
                    <p className="text-xs text-[#575765] leading-relaxed mt-0.5">
                      Customer confirmed budget. Requested detailed quotation for 10 Dell Latitude 5440 and 5 LG monitors.
                    </p>
                  </div>
                </div>

                {/* Item 4: Lead created */}
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full border border-[#FF611C] bg-[#FFF0EB]/40 text-[#FF611C] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 20 20" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.5">
                      <path d="M10 10a3.333 3.333 0 100-6.667 3.333 3.333 0 000 6.667zM3.333 16.667a6.667 6.667 0 0113.334 0" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-[#3D3D49] text-sm">
                        Lead created
                      </span>
                      <div className="flex flex-col items-end text-right">
                        <span className="text-xs text-[#3D3D49] font-medium">
                          2 min ago
                        </span>
                        <span className="text-[11px] text-[#8C8C9A]">
                          19 Aug 2026
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-[#575765]">Ama Owusu</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Follow-up Modal */}
      <AddFollowUpModal
        isOpen={isFollowUpModalOpen}
        onClose={() => setIsFollowUpModalOpen(false)}
        defaultEmailOrNotes="kwame.mensah@mensahent.gh"
      />

      {/* Convert to Customer Modal */}
      <ConvertToCustomerModal
        isOpen={isConvertModalOpen}
        onClose={() => setIsConvertModalOpen(false)}
        leadData={{
          name: "Kwame Mensah",
          company: "Mensah Enterprises",
          email: "kwame.mensah@mensahent.gh",
          phone: "+233 24 555 0192",
          source: "Manual",
          initials: "AS",
        }}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[12px] border border-[#EDEDED] p-6 max-w-sm w-full shadow-xl flex flex-col gap-4">
            <h3 className="font-semibold text-[#3D3D49] text-base">
              Delete Lead
            </h3>
            <p className="text-xs text-[#575765] leading-relaxed">
              Are you sure you want to delete this lead? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EDEDED]">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-[6px] border border-[#EDEDED] bg-white text-xs font-medium text-[#575765] hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  router.push("/leads");
                }}
                className="px-4 py-2 rounded-[6px] bg-[#F92424] text-xs font-medium text-white hover:bg-red-700 shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
