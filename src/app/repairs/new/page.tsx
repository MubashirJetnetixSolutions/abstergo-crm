"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  CalendarIcon,
  RepairsIcon,
} from "@/components/icons/Icons";

interface CustomerOption {
  id: string;
  name: string;
  initials: string;
  bg: string;
  textColor: string;
}

const CUSTOMERS_LIST: CustomerOption[] = [
  { id: "1", name: "Jason Colder", initials: "JC", bg: "bg-[#E7F2FC]", textColor: "text-[#0D79E4]" },
  { id: "2", name: "Dell Technologies West Africa", initials: "DT", bg: "bg-[#F3EEFF]", textColor: "text-[#8A58FF]" },
  { id: "3", name: "HP Global Solutions", initials: "HP", bg: "bg-[#FFEFE8]", textColor: "text-[#FF611C]" },
  { id: "4", name: "Absto Technologies Ltd", initials: "AT", bg: "bg-[#E5F4F3]", textColor: "text-[#009689]" },
  { id: "5", name: "Lenovo Direct EMEA", initials: "LD", bg: "bg-[#FDF7E5]", textColor: "text-[#EDAC00]" },
  { id: "6", name: "Tech Solutions SARL", initials: "TS", bg: "bg-[#FEE9E9]", textColor: "text-[#F92424]" },
  { id: "7", name: "Samsung Distribution Hub", initials: "SD", bg: "bg-[#E7F2FC]", textColor: "text-[#0D79E4]" },
];

export default function CreateRepairPage() {
  const router = useRouter();

  // Customer Details
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerOption>(CUSTOMERS_LIST[0]);
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const customerDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        customerDropdownRef.current &&
        !customerDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCustomerDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Repair Information
  const [repairType, setRepairType] = useState("External Repair");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const type = params.get("type");
      if (type === "Warranty") {
        setRepairType("Warranty");
      } else if (type === "External Repair" || type === "External") {
        setRepairType("External Repair");
      } else if (type === "Internal Repair" || type === "Internal") {
        setRepairType("Internal Repair");
      }
    }
  }, []);
  const [dateReceived, setDateReceived] = useState("04/04/2027");
  const [expectedCompletion, setExpectedCompletion] = useState("04/08/2027");
  const [priority, setPriority] = useState("High");
  const [technician, setTechnician] = useState("Jean Martin");
  const [technicianInitials] = useState("JM");

  // Devices selection states (For Warranty - Mockup 2)
  const devicesList = [
    { id: "1", name: "Dell Latitude 5440", sku: "DL-5440", price: "485 000 CFA", items: "2 Items" },
    { id: "2", name: "Dell Latitude 5440", sku: "DL-5440", price: "485 000 CFA", items: "2 Items" },
    { id: "3", name: "Dell Latitude 5440", sku: "DL-5440", price: "485 000 CFA", items: "2 Items" },
    { id: "4", name: "Dell Latitude 5440", sku: "DL-5440", price: "485 000 CFA", items: "2 Items" },
  ];
  const [selectedDeviceId, setSelectedDeviceId] = useState("1");
  const [deviceQuantity, setDeviceQuantity] = useState(1);

  // Device Details form states (For External & Internal Repair - Mockup 1)
  const [productName, setProductName] = useState("Dell Lattitude 3450");
  const [category, setCategory] = useState("Laptop");
  const [subcategory, setSubcategory] = useState("Lattitude");
  const [brand, setBrand] = useState("Dell");
  const [model, setModel] = useState("4567");
  const [description, setDescription] = useState(
    "Sleek and modern display along with 4 usb ports."
  );

  // Pricing & Warranty states
  const [isNotInWarranty, setIsNotInWarranty] = useState(false);
  const [repairCost, setRepairCost] = useState("800");

  // Issue & Initial Diagnosis
  const [reportedIssue, setReportedIssue] = useState(
    "Please ensure all 10 laptops are new, factory-sealed and include original accessories. Kindly provide serial/IMEI details with the delivery note."
  );
  const [deviceCondition, setDeviceCondition] = useState(
    "Screen Crack, Battery Issues and Camera Damaged"
  );
  const [accessories, setAccessories] = useState<string[]>([
    "Screen Crack",
    "Battery Issues",
    "Camera Damaged",
  ]);
  const [customerNotes, setCustomerNotes] = useState(
    "Please ensure all 10 laptops are new, factory-sealed and include original accessories. Kindly provide serial/IMEI details with the delivery note."
  );

  const handleRemoveAccessory = (tag: string) => {
    setAccessories((prev) => prev.filter((item) => item !== tag));
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Repairs" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Row: Back button, Title & Subtitle, Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/repairs"
                className="size-10 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#2B2523] transition-colors shadow-sm shrink-0"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>
              <div className="flex flex-col">
                <h1 className="font-semibold text-[#2B2523] text-[20px] leading-tight">
                  Create Repair
                </h1>
                <p className="text-[13px] text-[#575765] font-normal">
                  Create a new purchase for your inventory
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/repairs")}
                className="px-5 py-2.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[13px] font-medium text-[#2B2523] transition-colors cursor-pointer shadow-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => router.push("/repairs")}
                className="px-5 py-2.5 rounded-[8px] text-[13px] font-medium text-white shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
                style={{
                  background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Create Order
              </button>
            </div>
          </div>

          {/* Main Grid: Left 8 cols, Right 4 cols */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Card 1: Customer Details */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                <h2 className="text-[16px] font-semibold text-[#2B2523]">
                  Customer Details
                </h2>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-[#575765] font-normal">
                    Select Customer
                  </label>
                  <div className="relative" ref={customerDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsCustomerDropdownOpen((prev) => !prev)}
                      className="w-full h-11 px-4 py-2 bg-white hover:bg-neutral-50/50 border border-[#EDEDED] rounded-[8px] flex items-center justify-between cursor-pointer focus:outline-none focus:border-[#FF611C] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`size-6 rounded-full ${selectedCustomer.bg} ${selectedCustomer.textColor} text-[11px] font-semibold flex items-center justify-center`}
                        >
                          {selectedCustomer.initials}
                        </div>
                        <span className="text-[13px] text-[#2B2523] font-medium">
                          {selectedCustomer.name}
                        </span>
                      </div>
                      <ChevronDownIcon
                        className={`size-4 text-[#575765] transition-transform ${
                          isCustomerDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isCustomerDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1.5 z-30 max-h-60 overflow-y-auto animate-fade-in">
                        {CUSTOMERS_LIST.map((cust) => (
                          <button
                            key={cust.id}
                            type="button"
                            onClick={() => {
                              setSelectedCustomer(cust);
                              setIsCustomerDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors cursor-pointer ${
                              selectedCustomer.id === cust.id ? "bg-[#FFF6F2]" : ""
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`size-6 rounded-full ${cust.bg} ${cust.textColor} text-[11px] font-semibold flex items-center justify-center`}
                              >
                                {cust.initials}
                              </div>
                              <span
                                className={`text-[13px] ${
                                  selectedCustomer.id === cust.id
                                    ? "font-semibold text-[#FF611C]"
                                    : "font-medium text-[#2B2523]"
                                }`}
                              >
                                {cust.name}
                              </span>
                            </div>
                            {selectedCustomer.id === cust.id && (
                              <span className="text-[#FF611C] text-[13px] font-bold">
                                ✓
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Repair Information */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                <h2 className="text-[16px] font-semibold text-[#2B2523]">
                  Repair Information
                </h2>
                <div className="flex flex-col gap-4">
                  {/* Repair Type */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#575765] font-normal">
                      Repair Type
                    </label>
                    <div className="relative">
                      <select
                        value={repairType}
                        onChange={(e) => setRepairType(e.target.value)}
                        className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-medium appearance-none pr-10 focus:outline-none focus:border-[#FF611C] cursor-pointer"
                      >
                        <option value="External Repair">External Repair</option>
                        <option value="Internal Repair">Internal Repair</option>
                        <option value="Warranty">Warranty</option>
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#575765]" />
                    </div>
                  </div>

                  {/* Date Received & Expected Completion */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#575765] font-normal">
                        Date Received *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={dateReceived}
                          onChange={(e) => setDateReceived(e.target.value)}
                          className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none focus:border-[#FF611C] pr-10"
                        />
                        <CalendarIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#575765]" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#575765] font-normal">
                        Expected Completion
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={expectedCompletion}
                          onChange={(e) => setExpectedCompletion(e.target.value)}
                          className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none focus:border-[#FF611C] pr-10"
                        />
                        <CalendarIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#575765]" />
                      </div>
                    </div>
                  </div>

                  {/* Priority & Technician */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#575765] font-normal">
                        Priority
                      </label>
                      <div className="relative">
                        <select
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-medium appearance-none pr-10 focus:outline-none focus:border-[#FF611C] cursor-pointer"
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                        <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#575765]" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#575765] font-normal">
                        Technician
                      </label>
                      <div className="relative">
                        <div className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] flex items-center justify-between cursor-pointer focus-within:border-[#FF611C]">
                          <div className="flex items-center gap-2.5">
                            <div className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-semibold flex items-center justify-center">
                              {technicianInitials}
                            </div>
                            <span className="text-[13px] text-[#2B2523] font-medium">
                              {technician}
                            </span>
                          </div>
                          <ChevronDownIcon className="size-4 text-[#575765]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conditional Cards based on repairType:
                  If Warranty -> Mockup 2 (Devices grid + Warranty pricing)
                  If External / Internal Repair -> Mockup 1 (Device Details form + Repair Cost 800) */}
              {repairType === "Warranty" ? (
                <>
                  {/* Card 3: Devices (Matches Mockup 2) */}
                  <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4 animate-fade-in">
                    <h2 className="text-[16px] font-semibold text-[#2B2523]">
                      Devices
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {devicesList.map((dev) => {
                        const isSelected = selectedDeviceId === dev.id;
                        return (
                          <div
                            key={dev.id}
                            onClick={() => setSelectedDeviceId(dev.id)}
                            className={`rounded-[10px] p-3.5 flex flex-col justify-between gap-3 relative cursor-pointer transition-all ${
                              isSelected
                                ? "border-2 border-[#FF611C] bg-[#FFF8F5] shadow-xs"
                                : "border border-[#EDEDED] bg-white hover:border-[#D0D0D0]"
                            }`}
                          >
                            {/* Top Checkbox */}
                            <div className="absolute top-3.5 right-3.5 z-10">
                              {isSelected ? (
                                <div className="size-5 rounded-[4px] bg-[#FF611C] text-white flex items-center justify-center text-[11px] font-bold shadow-xs">
                                  ✓
                                </div>
                              ) : (
                                <div className="size-5 rounded-[4px] bg-[#EDEDED] border border-[#D9D9D9]" />
                              )}
                            </div>

                            {/* Laptop Product Image */}
                            <div className="w-full h-24 rounded-[8px] overflow-hidden bg-[#F8F9FA] flex items-center justify-center p-1">
                              <img
                                src="/images/dell-latitude.jpg"
                                alt={dev.name}
                                className="w-full h-full object-contain mix-blend-multiply"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col">
                              <span className="font-semibold text-[#2B2523] text-[13px] leading-tight">
                                {dev.name}
                              </span>
                              <span className="text-[11px] text-[#575765] mt-0.5">
                                {dev.sku}
                              </span>
                            </div>

                            {/* Price, Items & Quantity Stepper */}
                            <div className="flex items-end justify-between pt-1">
                              <div className="flex flex-col">
                                <span className="text-[13px] font-semibold text-[#2B2523]">
                                  {dev.price}
                                </span>
                                <span className="text-[11px] font-medium text-[#FF611C]">
                                  {dev.items}
                                </span>
                              </div>

                              {isSelected && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="flex items-center gap-2 border border-[#EDEDED] bg-white rounded-[6px] px-2 py-0.5 shadow-2xs"
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setDeviceQuantity((q) => Math.max(1, q - 1))
                                    }
                                    className="text-[#575765] hover:text-[#2B2523] text-[13px] font-bold leading-none cursor-pointer"
                                  >
                                    ⊖
                                  </button>
                                  <span className="text-[12px] font-medium text-[#2B2523] min-w-[12px] text-center">
                                    {deviceQuantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setDeviceQuantity((q) => q + 1)}
                                    className="text-[#575765] hover:text-[#2B2523] text-[13px] font-bold leading-none cursor-pointer"
                                  >
                                    ⊕
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card 4: Pricing Details (Matches Mockup 2 with Warranty toggle) */}
                  <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4 animate-fade-in">
                    <h2 className="text-[16px] font-semibold text-[#2B2523]">
                      Pricing Details
                    </h2>

                    {/* Toggle Switch */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isNotInWarranty}
                        onClick={() => setIsNotInWarranty((prev) => !prev)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                          isNotInWarranty ? "bg-[#FF611C]" : "bg-[#E5E7EB]"
                        }`}
                      >
                        <div
                          className={`bg-white size-4 rounded-full shadow-md transform transition-transform ${
                            isNotInWarranty ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span className="text-[13px] text-[#575765] font-normal">
                        Repair thing is not included in warranty
                      </span>
                    </div>

                    {/* Estimated Cost */}
                    <div className="flex flex-col gap-1.5">
                      <div className="text-[13px] text-[#575765]">
                        <span>Estimated Cost (CFA)</span>
                        <span className="mx-1">·</span>
                        {isNotInWarranty ? (
                          <span className="text-[#FF611C] font-medium">
                            Paid Repair
                          </span>
                        ) : (
                          <span className="text-[#009689] font-medium">
                            Warranty — no charge
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        value={isNotInWarranty ? repairCost : "0"}
                        onChange={(e) => setRepairCost(e.target.value)}
                        disabled={!isNotInWarranty}
                        readOnly={!isNotInWarranty}
                        className={`w-full h-11 px-4 border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none transition-colors ${
                          isNotInWarranty
                            ? "bg-white focus:border-[#FF611C]"
                            : "bg-[#F9F9FB] cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Card 3: Device Details (Matches Mockup 1) */}
                  <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4 animate-fade-in">
                    <h2 className="text-[16px] font-semibold text-[#2B2523]">
                      Device Details
                    </h2>

                    <div className="flex flex-col gap-4">
                      {/* Product Name * */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] text-[#575765] font-normal">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none focus:border-[#FF611C]"
                        />
                      </div>

                      {/* Category * & Subcategory */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[13px] text-[#575765] font-normal">
                            Category *
                          </label>
                          <div className="relative">
                            <select
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                              className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-medium appearance-none pr-10 focus:outline-none focus:border-[#FF611C] cursor-pointer"
                            >
                              <option value="Laptop">Laptop</option>
                              <option value="Desktop">Desktop</option>
                              <option value="Mobile">Mobile</option>
                              <option value="Tablet">Tablet</option>
                            </select>
                            <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#575765]" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[13px] text-[#575765] font-normal">
                            Subcategory
                          </label>
                          <input
                            type="text"
                            value={subcategory}
                            onChange={(e) => setSubcategory(e.target.value)}
                            className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none focus:border-[#FF611C]"
                          />
                        </div>
                      </div>

                      {/* Brand & Model */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[13px] text-[#575765] font-normal">
                            Brand
                          </label>
                          <div className="relative">
                            <select
                              value={brand}
                              onChange={(e) => setBrand(e.target.value)}
                              className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-medium appearance-none pr-10 focus:outline-none focus:border-[#FF611C] cursor-pointer"
                            >
                              <option value="Dell">Dell</option>
                              <option value="HP">HP</option>
                              <option value="Apple">Apple</option>
                              <option value="Lenovo">Lenovo</option>
                            </select>
                            <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#575765]" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[13px] text-[#575765] font-normal">
                            Model
                          </label>
                          <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none focus:border-[#FF611C]"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] text-[#575765] font-normal">
                          Description
                        </label>
                        <input
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none focus:border-[#FF611C]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card 4: Pricing Details (Matches Mockup 1) */}
                  <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4 animate-fade-in">
                    <h2 className="text-[16px] font-semibold text-[#2B2523]">
                      Pricing Details
                    </h2>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#575765] font-normal">
                        Repair Cost (CFA)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={repairCost}
                          onChange={(e) => setRepairCost(e.target.value)}
                          className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none focus:border-[#FF611C]"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col pointer-events-none text-[#575765]">
                          <span className="text-[10px] leading-tight">▲</span>
                          <span className="text-[10px] leading-tight">▼</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Card 5: Issue & Initial Diagnosis */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                <h2 className="text-[16px] font-semibold text-[#2B2523]">
                  Issue & Initial Diagnosis
                </h2>

                <div className="flex flex-col gap-4">
                  {/* Reported Issue */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#575765] font-normal">
                      Reported Issue
                    </label>
                    <input
                      type="text"
                      value={reportedIssue}
                      onChange={(e) => setReportedIssue(e.target.value)}
                      className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Device Condition & Accessories Received */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#575765] font-normal">
                        Device Condition
                      </label>
                      <input
                        type="text"
                        value={deviceCondition}
                        onChange={(e) => setDeviceCondition(e.target.value)}
                        className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none focus:border-[#FF611C]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#575765] font-normal">
                        Accessories Received
                      </label>
                      <div className="w-full min-h-[44px] p-2 bg-white border border-[#EDEDED] rounded-[8px] flex flex-wrap items-center gap-2">
                        {accessories.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] text-[12px] font-medium bg-[#E7F2FC] text-[#0D79E4] border border-[#0D79E4]/20"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveAccessory(tag)}
                              className="text-[#0D79E4] hover:text-blue-900 font-bold leading-none cursor-pointer"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Customer Notes */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#575765] font-normal">
                      Customer Notes
                    </label>
                    <input
                      type="text"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-6">
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="text-[16px] font-semibold text-[#2B2523] pb-3 border-b border-[#EDEDED]">
                  Repair Summary
                </h2>

                {/* Summary Header Item */}
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-[#FFEFE8] text-[#FF611C] flex items-center justify-center shrink-0">
                    <RepairsIcon className="size-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-semibold text-[#2B2523]">
                      REP-1027
                    </span>
                    <span className="text-[12px] text-[#575765]">
                      ABC Technologies Ltd
                    </span>
                  </div>
                </div>

                {/* Details List */}
                <div className="flex flex-col gap-3 text-[13px] border-t border-[#EDEDED] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#575765]">Device</span>
                    <span className="font-medium text-[#2B2523]">
                      {repairType === "Warranty" ? `${deviceQuantity} Items` : "1 Device"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#575765]">Type</span>
                    <span className="font-medium text-[#2B2523]">{repairType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#575765]">Priority</span>
                    <span className="font-medium text-[#2B2523]">{priority}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="border-t border-[#EDEDED] pt-4 flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-[#2B2523]">
                    Grand Total
                  </span>
                  <span className="text-[14px] font-semibold text-[#2B2523]">
                    {repairType === "Warranty" && !isNotInWarranty
                      ? "0 CFA"
                      : `${repairCost || "1260"} CFA`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
