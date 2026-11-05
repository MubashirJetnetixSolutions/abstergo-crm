"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import { ChevronLeftIcon, ChevronDownIcon } from "@/components/icons/Icons";

const ALL_SKILLS = [
  "Screen Replacement",
  "Motherboard Repair",
  "Printer Repair",
  "Server Rack",
  "CCTV Installation",
  "Battery Replacement",
  "SSD Upgrade",
  "OS Installation",
  "Data Recovery",
  "Network Setup",
  "Structured Cabling",
];

export default function AddTechniciansPage() {
  const router = useRouter();

  // Form states matching Mockup 2
  const [employeeType, setEmployeeType] = useState("Technician");
  const [firstName, setFirstName] = useState("Kwame Mensah");
  const [lastName, setLastName] = useState("Mensah");
  const [email, setEmail] = useState("kwame.mensah@mensahent.gh");
  const [phone, setPhone] = useState("+233 24 555 0192");

  const [specialization, setSpecialization] = useState("Laptop & Desktop");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Screen Replacement",
    "Motherboard Repair",
    "Printer Repair",
    "Server Rack",
    "CCTV Installation",
    "Battery Replacement",
    "SSD Upgrade",
    "OS Installation",
    "Data Recovery",
    "Network Setup",
    "Structured Cabling",
  ]);

  const [streetAddress, setStreetAddress] = useState("123 Main Street");
  const [city, setCity] = useState("New York");
  const [stateRegion, setStateRegion] = useState("New York");
  const [country, setCountry] = useState("United States");
  const [postalCode, setPostalCode] = useState("1000001");

  const [capabilities, setCapabilities] = useState(
    "This is the primary laptop for our finance director. Please prioritize."
  );

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/employees");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Good Morning" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <Link
                href="/employees"
                className="flex size-10 items-center justify-center rounded-[8px] border border-[#EDEDED] bg-white text-[#575765] shadow-sm transition hover:bg-neutral-50 hover:text-[#3D3D49]"
              >
                <ChevronLeftIcon className="size-4.5" />
              </Link>
              <div>
                <h1 className="text-[20px] font-semibold text-[#3D3D49] tracking-tight leading-tight">
                  Add Employee
                </h1>
                <p className="text-xs text-[#8C8C9A] mt-0.5">
                  Create a new employee.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/employees"
                className="h-10 px-5 rounded-[8px] border border-[#EDEDED] bg-white text-xs font-medium text-[#3D3D49] hover:bg-neutral-50 flex items-center justify-center transition cursor-pointer"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={handleSubmit}
                className="h-10 px-5 rounded-[8px] text-xs font-medium text-white flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:opacity-95 transition cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Create Employee
              </button>
            </div>
          </div>

          {/* Form & Preview Layout: 2 Columns */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Left Column (8 cols): Contact Info, Professional Details, Address, Capabilities */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Card 1: Contact Information */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-sm flex flex-col gap-5">
                <h2 className="text-[16px] font-semibold text-[#3D3D49]">
                  Contact Information
                </h2>

                <div className="flex flex-col gap-4">
                  {/* Employee Type* */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-normal text-[#575765]">
                      Employee Type*
                    </label>
                    <div className="relative">
                      <select
                        value={employeeType}
                        onChange={(e) => setEmployeeType(e.target.value)}
                        className="w-full h-11 pl-3.5 pr-10 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] transition appearance-none cursor-pointer"
                      >
                        <option value="Technician">Technician</option>
                        <option value="Salesman">Salesman</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#8C8C9A] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-normal text-[#575765]">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full h-11 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-normal text-[#575765]">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full h-11 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] transition"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-normal text-[#575765]">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-normal text-[#575765]">
                        Phone
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-11 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Professional Details (Specific to Technician) */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-sm flex flex-col gap-5">
                <h2 className="text-[16px] font-semibold text-[#3D3D49]">
                  Professional Details
                </h2>

                <div className="flex flex-col gap-4">
                  {/* Specialization */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-normal text-[#575765]">
                      Specialization
                    </label>
                    <div className="relative">
                      <select
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        className="w-full h-11 px-3.5 pr-8 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none cursor-pointer transition"
                      >
                        <option value="Laptop & Desktop">Laptop &amp; Desktop</option>
                        <option value="Motherboard & Chip-level">Motherboard &amp; Chip-level</option>
                        <option value="Mobile Devices">Mobile Devices</option>
                        <option value="Network & Infrastructure">Network &amp; Infrastructure</option>
                        <option value="Printers & Peripherals">Printers &amp; Peripherals</option>
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8C8C9A]" />
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-normal text-[#575765]">
                      Skills
                    </label>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {ALL_SKILLS.map((skill) => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleSkill(skill)}
                            className={`px-3 py-1.5 rounded-[6px] text-xs font-normal border transition cursor-pointer select-none ${
                              isSelected
                                ? "bg-[#F4F4F6] text-[#3D3D49] border-[#D4D4D8]"
                                : "bg-white text-[#8C8C9A] border-[#EDEDED] hover:border-[#D4D4D8] hover:text-[#575765]"
                            }`}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Main Address */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-sm flex flex-col gap-5">
                <h2 className="text-[16px] font-semibold text-[#3D3D49]">
                  Main Address
                </h2>

                <div className="flex flex-col gap-4">
                  {/* Street Address */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-normal text-[#575765]">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      className="w-full h-11 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] transition"
                    />
                  </div>

                  {/* City & State / Region */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-normal text-[#575765]">
                        City
                      </label>
                      <div className="relative">
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full h-11 px-3.5 pr-8 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none cursor-pointer transition"
                        >
                          <option value="New York">New York</option>
                          <option value="Los Angeles">Los Angeles</option>
                          <option value="Chicago">Chicago</option>
                          <option value="Houston">Houston</option>
                          <option value="Accra">Accra</option>
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8C8C9A]" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-normal text-[#575765]">
                        State / Region
                      </label>
                      <div className="relative">
                        <select
                          value={stateRegion}
                          onChange={(e) => setStateRegion(e.target.value)}
                          className="w-full h-11 px-3.5 pr-8 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none cursor-pointer transition"
                        >
                          <option value="New York">New York</option>
                          <option value="California">California</option>
                          <option value="Illinois">Illinois</option>
                          <option value="Texas">Texas</option>
                          <option value="Greater Accra">Greater Accra</option>
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8C8C9A]" />
                      </div>
                    </div>
                  </div>

                  {/* Country* & Postal Code */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-normal text-[#575765]">
                        Country*
                      </label>
                      <div className="relative">
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full h-11 px-3.5 pr-8 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none cursor-pointer transition"
                        >
                          <option value="United States">United States</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#8C8C9A]" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-normal text-[#575765]">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full h-11 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 4: Additional Information */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-sm flex flex-col gap-5">
                <h2 className="text-[16px] font-semibold text-[#3D3D49]">
                  Additional Information
                </h2>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-normal text-[#575765]">
                    Technician Capabilities
                  </label>
                  <textarea
                    rows={3}
                    value={capabilities}
                    onChange={(e) => setCapabilities(e.target.value)}
                    className="w-full p-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] transition resize-none leading-relaxed"
                  />
                </div>
              </div>
            </div>

            {/* Right Column (4 cols): Technician Preview Card */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-sm flex flex-col gap-5 sticky top-6">
                <h2 className="text-[16px] font-semibold text-[#3D3D49]">
                  Technician Preview
                </h2>

                {/* Avatar and Name */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="size-11 rounded-full bg-[#EFEAFF] text-[#8A58FF] font-semibold text-sm flex items-center justify-center shrink-0">
                    AS
                  </div>
                  <span className="font-semibold text-[15px] text-[#3D3D49]">
                    {firstName || "Kwame Mensah"}
                  </span>
                </div>

                {/* Metadata details */}
                <div className="flex flex-col gap-3 pt-2 text-xs border-t border-[#EDEDED]/60">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[#8C8C9A] shrink-0">Email:</span>
                    <span className="font-medium text-[#3D3D49] truncate text-right">
                      {email || "kwame.mensah@mensahent.gh"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-[#8C8C9A] shrink-0">Contact:</span>
                    <span className="font-medium text-[#3D3D49] truncate text-right">
                      {phone || "+233 24 555 0192"}
                    </span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[#8C8C9A] shrink-0">Source:</span>
                    <span className="font-medium text-[#3D3D49] text-right">
                      123 Liberation Road, Accra
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
