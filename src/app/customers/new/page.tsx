"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import { ChevronLeftIcon, ChevronDownIcon } from "@/components/icons/Icons";

export default function AddCustomerPage() {
  const router = useRouter();

  // Form state initialized with Figma default values
  const [customerType, setCustomerType] = useState("Business Owner");
  const [businessType, setBusinessType] = useState("Reseller");
  const [companyName, setCompanyName] = useState("Argon Technology");
  const [taxId, setTaxId] = useState("REG-2026-24569");

  const [customerId] = useState("CUST-0008");
  const [status, setStatus] = useState("Active");
  const [firstName, setFirstName] = useState("Daniel J.");
  const [lastName, setLastName] = useState("Martin");
  const [email, setEmail] = useState("jason7654@gmail.com");
  const [phone, setPhone] = useState("+226 25 30 12 34");

  const [streetAddress, setStreetAddress] = useState("123 Main Street");
  const [city, setCity] = useState("New York");
  const [stateRegion, setStateRegion] = useState("New York");
  const [country, setCountry] = useState("United States");
  const [postalCode, setPostalCode] = useState("100001");

  const [sameAsMainAddress, setSameAsMainAddress] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/customers/CUST-0008");
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
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Link
                href="/customers"
                className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>
              <div className="flex flex-col">
                <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight">
                  Add Customer
                </h1>
                <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                  Create a new customer.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/customers"
                className="px-5 py-2.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#575765] hover:text-[#3D3D49] font-medium text-[11px] transition-colors"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-[8px] text-[#F8FAFD] font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
                style={{
                  background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Create Customer
              </button>
            </div>
          </div>

          {/* Form & Preview Grid */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Columns: Form Cards */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* 1. Customer Section */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#575765] text-[11px]">Customer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Customer Type */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Customer Type
                    </label>
                    <div className="relative">
                      <select
                        value={customerType}
                        onChange={(e) => setCustomerType(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Business Owner">Business Owner</option>
                        <option value="Individual">Individual</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Business Type */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Business Type
                    </label>
                    <div className="relative">
                      <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Reseller">Reseller</option>
                        <option value="Wholesaler">Wholesaler</option>
                        <option value="Retailer">Retailer</option>
                        <option value="Distributor">Distributor</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Company Name"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Registration / Tax ID */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Registration / Tax ID
                    </label>
                    <input
                      type="text"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      placeholder="Registration / Tax ID"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Basic Information Section */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#575765] text-[11px]">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Customer ID (Readonly) */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Customer ID
                    </label>
                    <input
                      type="text"
                      value={customerId}
                      readOnly
                      className="w-full h-11 px-4 py-2.5 bg-[#F5F5F5] border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal cursor-not-allowed"
                    />
                  </div>

                  {/* Status */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* First Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      First Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Main Address Section */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#575765] text-[11px]">Main Address</h2>
                <div className="flex flex-col gap-5">
                  {/* Street Address */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="Street Address"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* City */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] text-[#575765] font-normal">
                        City
                      </label>
                      <div className="relative">
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                        >
                          <option value="New York">New York</option>
                          <option value="Los Angeles">Los Angeles</option>
                          <option value="Chicago">Chicago</option>
                          <option value="Accra">Accra</option>
                        </select>
                        <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* State / Region */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] text-[#575765] font-normal">
                        State / Region
                      </label>
                      <div className="relative">
                        <select
                          value={stateRegion}
                          onChange={(e) => setStateRegion(e.target.value)}
                          className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                        >
                          <option value="New York">New York</option>
                          <option value="California">California</option>
                          <option value="Illinois">Illinois</option>
                          <option value="Greater Accra">Greater Accra</option>
                        </select>
                        <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Country */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] text-[#575765] font-normal">
                        Country*
                      </label>
                      <div className="relative">
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                        >
                          <option value="United States">United States</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Burkina Faso">Burkina Faso</option>
                          <option value="United Kingdom">United Kingdom</option>
                        </select>
                        <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Postal Code */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] text-[#575765] font-normal">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        placeholder="Postal Code"
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Billing Information Section */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                <h2 className="font-medium text-[#575765] text-[11px]">Billing Information</h2>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={sameAsMainAddress}
                    onChange={(e) => setSameAsMainAddress(e.target.checked)}
                    className="size-5 rounded border-[#EDEDED] text-[#FF611C] focus:ring-[#FF611C] accent-[#FF611C] cursor-pointer"
                  />
                  <span className="text-[11px] text-[#3D3D49] font-normal">
                    Same as main address
                  </span>
                </label>
              </div>
            </div>

            {/* Right 4 Columns: Customer Preview Card */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6 sticky top-6">
                <h2 className="font-medium text-[#575765] text-[11px]">Customer Preview</h2>

                {/* Identity Header */}
                <div className="flex items-center gap-3.5 pb-5 border-b border-[#EDEDED]">
                  <div className="size-11 rounded-full bg-[#F3EEFF] text-[#8A58FF] font-medium text-[11px] flex items-center justify-center shrink-0">
                    AS
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-medium text-[#3D3D49] text-[11px] leading-tight">
                      {companyName || "Argon Technology"}
                    </h3>
                    <p className="text-[11px] text-[#575765] font-normal">
                      CUST-0141
                    </p>
                  </div>
                </div>

                {/* Summary Key-Values */}
                <div className="flex flex-col gap-3.5 text-[11px]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#575765] font-normal w-20 shrink-0">Type:</span>
                    <span className="text-[#3D3D49] font-normal text-right">
                      {customerType}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#575765] font-normal w-20 shrink-0">Email:</span>
                    <span className="text-[#3D3D49] font-normal text-right break-all">
                      {email || "jason7654@gmail.com"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#575765] font-normal w-20 shrink-0">Contact:</span>
                    <span className="text-[#3D3D49] font-normal text-right">
                      {phone || "+226 25 30 12 34"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#575765] font-normal w-20 shrink-0">Address:</span>
                    <span className="text-[#3D3D49] font-normal text-right">
                      Ouagadougou, Burkina Fas..
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
