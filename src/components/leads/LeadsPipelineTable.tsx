"use client";

import React, { useState } from "react";
import Link from "next/link";
import AddFollowUpModal from "@/components/leads/AddFollowUpModal";
import ConvertToCustomerModal from "@/components/leads/ConvertToCustomerModal";
import {
  MoreVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  PlusCircleIcon,
  ExternalLinkIcon,
  CheckmarkCircleIcon,
} from "@/components/icons/Icons";

export interface LeadItem {
  id: string;
  leadNumber: string;
  leadName: string;
  initials: string;
  avatarColor: string;
  avatarTextColor: string;
  companyName: string;
  contact: string;
  source: "Manual" | "Form" | "Website" | "Referral";
  priority: "High" | "Medium" | "Low";
  technician: string;
  technicianInitials: string;
  technicianAvatarBg: string;
  stage: "Contacted" | "Qualified" | "Follow-up" | "Converted" | "Lost Deal";
  lastFollowUp: string;
}

export const MOCK_LEADS: LeadItem[] = [
  {
    id: "1",
    leadNumber: "LD-1029",
    leadName: "Kwesi Boateng-Ach...",
    initials: "KB",
    avatarColor: "bg-[#F3E8FF]",
    avatarTextColor: "text-[#8A58FF]",
    companyName: "ABC Technologies",
    contact: "kwame.mensah@mensah...",
    source: "Manual",
    priority: "High",
    technician: "Marcus Johnson",
    technicianInitials: "MJ",
    technicianAvatarBg: "bg-[#E7F2FC] text-[#0D79E4]",
    stage: "Follow-up",
    lastFollowUp: "Aug 27, 2026",
  },
  {
    id: "2",
    leadNumber: "LD-1028",
    leadName: "Marcus Trescothik",
    initials: "MT",
    avatarColor: "bg-[#E7F2FC]",
    avatarTextColor: "text-[#0D79E4]",
    companyName: "Apex Retail Ltd",
    contact: "marcus.t@apex.gh",
    source: "Website",
    priority: "Low",
    technician: "Kwesi Boateng",
    technicianInitials: "KB",
    technicianAvatarBg: "bg-[#FFF0EB] text-[#FF611C]",
    stage: "Converted",
    lastFollowUp: "Aug 27, 2026",
  },
  {
    id: "3",
    leadNumber: "LD-1027",
    leadName: "Ama Serwaa",
    initials: "AS",
    avatarColor: "bg-[#FFF0EB]",
    avatarTextColor: "text-[#FF611C]",
    companyName: "Gold Coast Logistics",
    contact: "ama.serwaa@goldcoast.gh",
    source: "Referral",
    priority: "High",
    technician: "Jean Martin",
    technicianInitials: "JM",
    technicianAvatarBg: "bg-[#E5F4F3] text-[#009689]",
    stage: "Converted",
    lastFollowUp: "Aug 27, 2026",
  },
  {
    id: "4",
    leadNumber: "LD-1026",
    leadName: "Kofi Annan Jr",
    initials: "KA",
    avatarColor: "bg-[#E7F2FC]",
    avatarTextColor: "text-[#0D79E4]",
    companyName: "Volta Power Corp",
    contact: "kofi.annan@volta.gh",
    source: "Form",
    priority: "High",
    technician: "Marcus Johnson",
    technicianInitials: "MJ",
    technicianAvatarBg: "bg-[#E7F2FC] text-[#0D79E4]",
    stage: "Converted",
    lastFollowUp: "Aug 27, 2026",
  },
  {
    id: "5",
    leadNumber: "LD-1025",
    leadName: "Esi Sutherland",
    initials: "ES",
    avatarColor: "bg-[#E5F4F3]",
    avatarTextColor: "text-[#009689]",
    companyName: "Modern Agro Ltd",
    contact: "esi.s@modernagro.gh",
    source: "Manual",
    priority: "Medium",
    technician: "Kwesi Boateng",
    technicianInitials: "KB",
    technicianAvatarBg: "bg-[#FFF0EB] text-[#FF611C]",
    stage: "Qualified",
    lastFollowUp: "Aug 27, 2026",
  },
  {
    id: "6",
    leadNumber: "LD-1024",
    leadName: "Yaw Ofori",
    initials: "YO",
    avatarColor: "bg-[#FFF0EB]",
    avatarTextColor: "text-[#FF611C]",
    companyName: "Accra Digital Hub",
    contact: "yaw.ofori@accradigital.gh",
    source: "Website",
    priority: "Low",
    technician: "Jean Martin",
    technicianInitials: "JM",
    technicianAvatarBg: "bg-[#E5F4F3] text-[#009689]",
    stage: "Converted",
    lastFollowUp: "Aug 27, 2026",
  },
  {
    id: "7",
    leadNumber: "LD-1023",
    leadName: "Abena Osei-Bonsu",
    initials: "AO",
    avatarColor: "bg-[#E5F4F3]",
    avatarTextColor: "text-[#009689]",
    companyName: "GreenTech Solutions",
    contact: "fatima@northernfarms.gh",
    source: "Manual",
    priority: "Low",
    technician: "Marcus Johnson",
    technicianInitials: "MJ",
    technicianAvatarBg: "bg-[#E7F2FC] text-[#0D79E4]",
    stage: "Follow-up",
    lastFollowUp: "Aug 27, 2026",
  },
  {
    id: "8",
    leadNumber: "LD-1022",
    leadName: "Kojo Mensah",
    initials: "KM",
    avatarColor: "bg-[#FFF0EB]",
    avatarTextColor: "text-[#FF611C]",
    companyName: "Kumasi Mining Supplies",
    contact: "kojo.mensah@kumasi.gh",
    source: "Form",
    priority: "Medium",
    technician: "Kwesi Boateng",
    technicianInitials: "KB",
    technicianAvatarBg: "bg-[#FFF0EB] text-[#FF611C]",
    stage: "Contacted",
    lastFollowUp: "Aug 27, 2026",
  },
  {
    id: "9",
    leadNumber: "LD-1021",
    leadName: "Akosua Dapaah",
    initials: "AD",
    avatarColor: "bg-[#FFF8E6]",
    avatarTextColor: "text-[#EDAC00]",
    companyName: "Pioneer Foods Ltd",
    contact: "akosua.d@pioneer.gh",
    source: "Referral",
    priority: "Medium",
    technician: "Jean Martin",
    technicianInitials: "JM",
    technicianAvatarBg: "bg-[#E5F4F3] text-[#009689]",
    stage: "Qualified",
    lastFollowUp: "Aug 27, 2026",
  },
  {
    id: "10",
    leadNumber: "LD-1020",
    leadName: "Nana Kwame",
    initials: "NK",
    avatarColor: "bg-[#F3E8FF]",
    avatarTextColor: "text-[#8A58FF]",
    companyName: "Starline Telecoms",
    contact: "nana.kwame@starline.gh",
    source: "Website",
    priority: "Low",
    technician: "Marcus Johnson",
    technicianInitials: "MJ",
    technicianAvatarBg: "bg-[#E7F2FC] text-[#0D79E4]",
    stage: "Lost Deal",
    lastFollowUp: "Aug 27, 2026",
  },
  {
    id: "11",
    leadNumber: "LD-1019",
    leadName: "Efua Mensah",
    initials: "EM",
    avatarColor: "bg-[#E7F2FC]",
    avatarTextColor: "text-[#0D79E4]",
    companyName: "Zenith Holdings",
    contact: "efua.m@zenith.gh",
    source: "Form",
    priority: "Low",
    technician: "Kwesi Boateng",
    technicianInitials: "KB",
    technicianAvatarBg: "bg-[#FFF0EB] text-[#FF611C]",
    stage: "Contacted",
    lastFollowUp: "Aug 27, 2026",
  },
  {
    id: "12",
    leadNumber: "LD-1018",
    leadName: "Samuel Darko",
    initials: "SD",
    avatarColor: "bg-[#FFF8E6]",
    avatarTextColor: "text-[#EDAC00]",
    companyName: "Apex Logistics",
    contact: "samuel.darko@apex.gh",
    source: "Referral",
    priority: "Medium",
    technician: "Jean Martin",
    technicianInitials: "JM",
    technicianAvatarBg: "bg-[#E5F4F3] text-[#009689]",
    stage: "Follow-up",
    lastFollowUp: "Aug 27, 2026",
  },
];

interface LeadsPipelineTableProps {
  leads: LeadItem[];
}

export default function LeadsPipelineTable({ leads }: LeadsPipelineTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedLeadForFollowUp, setSelectedLeadForFollowUp] = useState<LeadItem | null>(null);
  const [selectedLeadForConvert, setSelectedLeadForConvert] = useState<LeadItem | null>(null);

  const getPriorityBadge = (priority: LeadItem["priority"]) => {
    switch (priority) {
      case "High":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-xs font-medium bg-[#FEE9E9] text-[#F92424] border border-[#F92424]">
            • High
          </span>
        );
      case "Medium":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-xs font-medium bg-[#FFF8E6] text-[#EDAC00] border border-[#EDAC00]">
            • Medium
          </span>
        );
      case "Low":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] text-xs font-medium bg-[#E5F4F3] text-[#009689] border border-[#009689]">
            • Low
          </span>
        );
    }
  };

  const getStageBadge = (stage: LeadItem["stage"]) => {
    switch (stage) {
      case "Follow-up":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-normal bg-[#FFF0EB] text-[#FF611C] border border-[#FF611C]">
            Follow-up
          </span>
        );
      case "Converted":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-normal bg-[#E5F4F3] text-[#009689] border border-[#009689]">
            Converted
          </span>
        );
      case "Qualified":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-normal bg-[#F3E8FF] text-[#8A58FF] border border-[#8A58FF]">
            Qualified
          </span>
        );
      case "Contacted":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-normal bg-[#FFF8E6] text-[#EDAC00] border border-[#EDAC00]">
            Contacted
          </span>
        );
      case "Lost Deal":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-xs font-normal bg-[#FEE9E9] text-[#F92424] border border-[#F92424]">
            Lost Deal
          </span>
        );
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1100px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-[12px] font-medium text-[#575765] bg-white">
              <th className="py-3.5 px-4 font-normal">Lead #</th>
              <th className="py-3.5 px-4 font-normal">Lead Name</th>
              <th className="py-3.5 px-4 font-normal">Company Name</th>
              <th className="py-3.5 px-4 font-normal">Contact</th>
              <th className="py-3.5 px-4 font-normal">Source</th>
              <th className="py-3.5 px-4 font-normal">Priority</th>
              <th className="py-3.5 px-4 font-normal">Technician Assigned</th>
              <th className="py-3.5 px-4 font-normal">Stage</th>
              <th className="py-3.5 px-4 font-normal">Last Follow-up</th>
              <th className="py-3.5 px-4 text-center font-normal w-[48px]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-xs text-[#3D3D49]">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-[#8C8C9A]">
                  <p className="text-sm font-medium text-[#3D3D49]">No leads found</p>
                  <p className="text-xs text-[#8C8C9A] mt-1">Try adjusting your filters or search query</p>
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-neutral-50/70 transition-colors"
                >
                {/* Lead # */}
                <td className="py-4 px-4 font-normal text-[#575765] text-[11px]">
                  <Link href={`/leads/${lead.leadNumber}`} className="hover:text-[#FF611C] transition-colors">
                    {lead.leadNumber}
                  </Link>
                </td>

                {/* Lead Name */}
                <td className="py-4 px-4">
                  <Link href={`/leads/${lead.leadNumber}`} className="flex items-center gap-2.5 group">
                    <div
                      className={`size-7 text-[11px] rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${lead.avatarColor} ${lead.avatarTextColor}`}
                    >
                      {lead.initials}
                    </div>
                    <span className="font-normal text-[11px] text-[#3D3D49] group-hover:text-[#FF611C] transition-colors truncate max-w-[160px]">
                      {lead.leadName}
                    </span>
                  </Link>
                </td>

                {/* Company Name */}
                <td className="py-4 px-4 text-[#575765] font-normal text-[11px]">
                  {lead.companyName}
                </td>

                {/* Contact */}
                <td className="py-4 px-4 text-[#575765] font-normal text-[11px] truncate max-w-[180px]">
                  {lead.contact}
                </td>

                {/* Source */}
                <td className="py-4 px-4">
                  <span className="inline-block px-2.5 py-0.5 text-[11px] rounded-[4px] bg-[#F3F4F6] text-[#575765] text-xs font-normal">
                    {lead.source}
                  </span>
                </td>

                {/* Priority */}
                <td className="py-4 px-4 ">{getPriorityBadge(lead.priority)}</td>

                {/* Technician Assigned */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`size-6 text-[11px] rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0 ${lead.technicianAvatarBg}`}
                    >
                      {lead.technicianInitials}
                    </div>
                    <span className="text-[#3D3D49] font-normal text-[11px]">
                      {lead.technician}
                    </span>
                  </div>
                </td>

                {/* Stage */}
                <td className="py-4 px-4">{getStageBadge(lead.stage)}</td>

                {/* Last Follow-up */}
                <td className="py-4 px-4 text-[#575765] text-[11px]">
                  {lead.lastFollowUp}
                </td>

                {/* Action */}
                <td className="py-4 px-4 text-center relative">
                  <button
                    type="button"
                    onClick={() => setActiveMenuId(activeMenuId === lead.id ? null : lead.id)}
                    className="size-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#8C8C9A] transition-colors mx-auto cursor-pointer"
                  >
                    <MoreVerticalIcon className="size-4" />
                  </button>

                  {activeMenuId === lead.id && (
                    <div className="absolute right-4 top-12 w-44 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1.5 z-40 text-left">
                      <Link
                        href={`/leads/${lead.leadNumber}`}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#3D3D49] hover:bg-[#F8FAFD] transition-colors"
                        onClick={() => setActiveMenuId(null)}
                      >
                        <ExternalLinkIcon className="size-3.5 text-[#575765]" />
                        <span>View Details</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          setSelectedLeadForConvert(lead);
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#009689] hover:bg-[#E5F4F3]/50 transition-colors text-left cursor-pointer"
                      >
                        <CheckmarkCircleIcon className="size-3.5 text-[#009689]" />
                        <span>Convert to customer</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveMenuId(null);
                          setSelectedLeadForFollowUp(lead);
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-[#3D3D49] hover:bg-[#F8FAFD] transition-colors text-left cursor-pointer"
                      >
                        <PlusCircleIcon className="size-3.5 text-[#FF611C]" />
                        <span>Add Follow-up</span>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="pt-4 flex flex-wrap items-center justify-end gap-4 text-xs text-[#575765]">
        <div className="flex items-center gap-2">
          <span>Per page:</span>
          <div className="border border-[#EDEDED] rounded-[6px] px-2.5 py-1 bg-white flex items-center gap-1.5 cursor-pointer">
            <span>{perPage}</span>
            <ChevronDownIcon className="size-3 text-[#575765]" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-1 rounded-[6px] border border-[#EDEDED] bg-white hover:bg-gray-50 text-[#575765]"
          >
            <ChevronLeftIcon className="size-3.5" />
          </button>
          <span>Page 25</span>
          <button
            type="button"
            className="p-1 rounded-[6px] border border-[#EDEDED] bg-white hover:bg-gray-50 text-[#575765]"
          >
            <ChevronRightIcon className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Add Follow-up Modal for Table */}
      {selectedLeadForFollowUp && (
        <AddFollowUpModal
          isOpen={Boolean(selectedLeadForFollowUp)}
          onClose={() => setSelectedLeadForFollowUp(null)}
          defaultEmailOrNotes="kwame.mensah@mensahent.gh"
        />
      )}

      {/* Convert to Customer Modal for Table */}
      {selectedLeadForConvert && (
        <ConvertToCustomerModal
          isOpen={Boolean(selectedLeadForConvert)}
          onClose={() => setSelectedLeadForConvert(null)}
          leadData={{
            name: selectedLeadForConvert.leadName,
            company: selectedLeadForConvert.companyName,
            email: selectedLeadForConvert.contact,
            phone: "+233 24 555 0192",
            source: selectedLeadForConvert.source,
            initials: selectedLeadForConvert.initials,
          }}
        />
      )}
    </div>
  );
}
