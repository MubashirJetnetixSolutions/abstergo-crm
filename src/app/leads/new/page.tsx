"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import { ChevronLeftIcon, ChevronDownIcon } from "@/components/icons/Icons";

export default function AddLeadPage() {
  const router = useRouter();

  // Contact Information state
  const [leadName, setLeadName] = useState("Kwame Mensah");
  const [company, setCompany] = useState("Mensah Enterprises");
  const [email, setEmail] = useState("kwame.mensah@mensahent.gh");
  const [phone, setPhone] = useState("+233 24 555 0192");

  // Basic Information state
  const [source, setSource] = useState("Manual");
  const [priority, setPriority] = useState("High");
  const [salesman, setSalesman] = useState("Marcus Nonren");

  // Additional Information state
  const [notes, setNotes] = useState(
    "This is the primary laptop for our finance director. Please prioritize."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/leads");
  };

  // Helper for initials
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || "AS";
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Leads Pipeline" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Link
                href="/leads"
                className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>
              <div className="flex flex-col">
                <h1 className="font-semibold text-[#3D3D49] text-[24px] leading-tight">
                  Add Lead
                </h1>
                <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                  Create a new lead.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/leads"
                className="px-5 py-2.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#575765] hover:text-[#3D3D49] font-medium text-xs transition-colors cursor-pointer"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-[8px] text-[#F8FAFD] font-medium text-xs shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Create Lead
              </button>
            </div>
          </div>

          {/* Form & Preview Grid */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Left 8 Columns: Form Cards */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* 1. Contact Information */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-semibold text-[#3D3D49] text-[20px]">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Lead Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#575765] font-normal">
                      Lead Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Lead Name"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Company / Organization */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#575765] font-normal">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company / Organization"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#575765] font-normal">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#575765] font-normal">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Basic Information */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-semibold text-[#3D3D49] text-[20px]">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Lead Source */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#575765] font-normal">
                      Lead Source
                    </label>
                    <div className="relative">
                      <select
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Manual">Manual</option>
                        <option value="Form">Form</option>
                        <option value="Website">Website</option>
                        <option value="Referral">Referral</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Priority Level */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-[#575765] font-normal">
                      Priority Level
                    </label>
                    <div className="relative">
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Assign Salesman */}
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="text-xs text-[#575765] font-normal">
                      Assign Salesman
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3.5 flex items-center gap-2 pointer-events-none z-10">
                        <span className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[10px] font-semibold flex items-center justify-center">
                          {getInitials(salesman)}
                        </span>
                      </div>
                      <select
                        value={salesman}
                        onChange={(e) => setSalesman(e.target.value)}
                        className="w-full h-11 pl-12 pr-10 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="Marcus Nonren">Marcus Nonren</option>
                        <option value="Kwesi Boateng">Kwesi Boateng</option>
                        <option value="Jean Martin">Jean Martin</option>
                        <option value="Michael Adu">Michael Adu</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Additional Information */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-semibold text-[#3D3D49] text-[20px]">
                  Additional Information
                </h2>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-[#575765] font-normal">
                    Lead Notes
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter lead notes..."
                    className="w-full px-4 py-3 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Lead Preview Card */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6 sticky top-6">
                <h2 className="font-semibold text-[#3D3D49] text-[20px]">
                  Lead Preview
                </h2>

                {/* Identity Header */}
                <div className="flex items-center gap-3.5 pb-5 border-b border-[#EDEDED]">
                  <div className="size-11 rounded-full bg-[#F3E8FF] text-[#8A58FF] font-medium text-xs flex items-center justify-center shrink-0">
                    {getInitials(leadName)}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-semibold text-[#3D3D49] text-[13px] leading-tight">
                      {leadName || "Kwame Mensah"}
                    </h3>
                    <p className="text-xs text-[#575765] font-normal">
                      {company || "Mensah Enterprises"}
                    </p>
                  </div>
                </div>

                {/* Summary Key-Values */}
                <div className="flex flex-col gap-3.5 text-xs">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#575765] font-normal w-20 shrink-0">
                      Source:
                    </span>
                    <span className="text-[#3D3D49] font-normal text-right">
                      {source}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#575765] font-normal w-20 shrink-0">
                      Email:
                    </span>
                    <span className="text-[#3D3D49] font-normal text-right">
                      {phone || "+233 24 555 0192"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#575765] font-normal w-20 shrink-0">
                      Contact:
                    </span>
                    <span className="text-[#3D3D49] font-normal text-right break-all">
                      {email || "kwame.mensah@mensahent.gh"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
