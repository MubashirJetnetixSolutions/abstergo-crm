"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  CalendarIcon,
  PlusCircleIcon,
  DeleteIcon,
  SearchIcon,
  ProductsIcon,
  QuotationsIcon,
  CheckIcon,
  PercentCircleIcon,
} from "@/components/icons/Icons";

interface QuotationItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  qty: number;
  inStock: number;
  unitCost: string;
  subtotal: string;
}

interface AvailableProduct {
  id: string;
  name: string;
  code: string;
  price: string;
  unitCost: string;
  stock: string;
  inStock: number;
  sku: string;
}

const defaultSuggestedProducts: AvailableProduct[] = [
  { id: "p1", name: "Dell Latitude 5440", code: "DL-5440", price: "485 000 CFA", unitCost: "35 000 CFA", stock: "3 in stock", inStock: 23, sku: "LN-E14" },
  { id: "p2", name: "Dell Latitude 5787", code: "DL-5440", price: "485 000 CFA", unitCost: "35 000 CFA", stock: "3 in stock", inStock: 23, sku: "LN-E14" },
  { id: "p3", name: "Dell Latitude 7654", code: "DL-5440", price: "485 000 CFA", unitCost: "35 000 CFA", stock: "3 in stock", inStock: 2, sku: "LN-E14" },
  { id: "p4", name: "Dell Latitude 7520", code: "DL-5440", price: "485 000 CFA", unitCost: "35 000 CFA", stock: "3 in stock", inStock: 23, sku: "LN-E14" },
];

export default function CreateQuotationPage() {
  const router = useRouter();

  // Form states
  const [quotationCode] = useState("QOT-0536");
  const [salesman, setSalesman] = useState("Martin Cooper");
  const [requestDate, setRequestDate] = useState("2027-04-04");
  const [validUntil, setValidUntil] = useState("2027-04-04");

  // Client Information
  const [clientName, setClientName] = useState("Argon Technology");
  const [clientEmail, setClientEmail] = useState("jason7654@gmail.com");
  const [clientContact, setClientContact] = useState("+226 25 30 12 34");
  const [clientRequirements, setClientRequirements] = useState(
    "Supply and preparation of a 12-month product warranty document, including customer and product information, warranty coverage, exclusions, warranty conditions, covered-failure procedures, customer rights, and company/customer signature sections."
  );

  // Search and items
  const [searchQuery, setSearchQuery] = useState("Dell Latitude");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [discountType, setDiscountType] = useState("Percentage");
  const [discountValue, setDiscountValue] = useState("18");
  const [mdComments, setMdComments] = useState(
    "Client requested quote for 2 units for personal use. Possible upsell to 4 units if budget allows."
  );
  const [notes, setNotes] = useState(
    "Client requested quote for 2 units for personal use. Possible upsell to 4 units if budget allows."
  );
  const [terms, setTerms] = useState(
    "Quotation is valid until the stated expiry date. Delivery timeline is subject to product availability. Payment terms are as specified above."
  );

  // Sidebar checkboxes
  const [sendToRep, setSendToRep] = useState(true);
  const [sendToSalesDirector, setSendToSalesDirector] = useState(true);
  const [sendToMD, setSendToMD] = useState(true);

  const [items, setItems] = useState<QuotationItem[]>([
    { id: "1", name: "Dell Latitude 5440", category: "DL-5440", sku: "LN-E14", qty: 2, inStock: 23, unitCost: "35 000 CFA", subtotal: "127000 CFA" },
    { id: "2", name: "Dell Latitude 5440", category: "DL-5440", sku: "LN-E14", qty: 2, inStock: 23, unitCost: "35 000 CFA", subtotal: "127000 CFA" },
    { id: "3", name: "Dell Latitude 5440", category: "DL-5440", sku: "LN-E14", qty: 2, inStock: 2, unitCost: "35 000 CFA", subtotal: "127000 CFA" },
    { id: "4", name: "Dell Latitude 5440", category: "DL-5440", sku: "LN-E14", qty: 2, inStock: 23, unitCost: "35 000 CFA", subtotal: "127000 CFA" },
    { id: "5", name: "Dell Latitude 5440", category: "DL-5440", sku: "LN-E14", qty: 2, inStock: 2, unitCost: "35 000 CFA", subtotal: "127000 CFA" },
    { id: "6", name: "Dell Latitude 5440", category: "DL-5440", sku: "LN-E14", qty: 2, inStock: 2, unitCost: "35 000 CFA", subtotal: "127000 CFA" },
  ]);

  const toggleProductSelection = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const handleAddSelectedProducts = () => {
    const idsToAdd =
      selectedProductIds.length > 0
        ? selectedProductIds
        : [defaultSuggestedProducts[0].id];

    const newItems: QuotationItem[] = idsToAdd.map((pId) => {
      const prod = defaultSuggestedProducts.find((p) => p.id === pId);
      return {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        name: prod?.name || "Dell Latitude 5440",
        category: prod?.code || "DL-5440",
        sku: prod?.sku || "LN-E14",
        qty: 2,
        inStock: prod?.inStock ?? 23,
        unitCost: prod?.unitCost || "35 000 CFA",
        subtotal: "127000 CFA",
      };
    });

    setItems((prev) => [...newItems, ...prev]);
    setSelectedProductIds([]);
  };

  const handleQtyChange = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/quotations/QOT-0536");
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Quotations" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Link
                href="/quotations"
                className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] shrink-0"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>
              <div className="flex flex-col">
                <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight">
                  Create Quotation
                </h1>
                <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                  Create a quotation for a customer and add products, pricing and terms
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/quotations"
                className="px-5 py-2.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#575765] hover:text-[#3D3D49] font-medium text-[11px] transition-colors"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-[8px] text-white font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
                style={{
                  background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Create Quotation
              </button>
            </div>
          </div>

          {/* Form Grid */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Columns */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* 1. Quotation Information */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#575765] text-[20px]">
                  Quotation Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Quotation # */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Quotation #
                    </label>
                    <input
                      type="text"
                      value={quotationCode}
                      disabled
                      className="w-full h-11 px-4 py-2.5 bg-[#F5F5F5] border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal cursor-not-allowed"
                    />
                  </div>

                  {/* Select Salesman */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Select Salesman*
                    </label>
                    <div className="relative">
                      <div className="w-full h-11 px-3 py-2 bg-white border border-[#EDEDED] rounded-[8px] flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-medium flex items-center justify-center">
                            AS
                          </div>
                          <span className="text-[11px] text-[#3D3D49]">{salesman}</span>
                        </div>
                        <ChevronDownIcon className="size-4 text-[#575765]" />
                      </div>
                    </div>
                  </div>

                  {/* Request Date */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Request Date*
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={requestDate}
                        onChange={(e) => setRequestDate(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] pr-10"
                      />
                      <CalendarIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Valid Until */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Valid Until*
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={validUntil}
                        onChange={(e) => setValidUntil(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] pr-10"
                      />
                      <CalendarIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Client Information */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#575765] text-[20px]">
                  Client Information
                </h2>
                <div className="flex flex-col gap-5">
                  {/* Full Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Email Address & Contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] text-[#575765] font-normal">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="Email Address"
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] text-[#575765] font-normal">
                        Contact
                      </label>
                      <input
                        type="text"
                        value={clientContact}
                        onChange={(e) => setClientContact(e.target.value)}
                        placeholder="Contact"
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                      />
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={clientRequirements}
                      onChange={(e) => setClientRequirements(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Requested Products */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-medium text-[#575765] text-[20px]">
                    Requested Products
                  </h2>
                  <button
                    type="button"
                    onClick={handleAddSelectedProducts}
                    className="px-4 py-2 rounded-[8px] text-white font-medium text-[11px] shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:opacity-95 flex items-center gap-2 cursor-pointer transition-transform active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                    }}
                  >
                    <PlusCircleIcon className="size-4 text-white" />
                    <span>
                      Add Product{selectedProductIds.length > 0 ? ` (${selectedProductIds.length})` : ""}
                    </span>
                  </button>
                </div>

                {/* Search autosuggest list */}
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] flex items-center justify-between focus-within:border-[#FF611C]">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search product..."
                      className="flex-1 bg-transparent border-none outline-none text-[11px] text-[#3D3D49]"
                    />
                    <SearchIcon className="size-4 text-[#575765]" />
                  </div>

                  {/* Suggested Products Dropdown Box */}
                  <div className="border border-[#EDEDED] rounded-[8px] bg-white divide-y divide-[#EDEDED] shadow-sm overflow-hidden">
                    {defaultSuggestedProducts
                      .filter(
                        (p) =>
                          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.code.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((p) => {
                        const isSelected = selectedProductIds.includes(p.id);
                        return (
                          <div
                            key={p.id}
                            onClick={() => toggleProductSelection(p.id)}
                            className={`p-3 flex items-center justify-between transition-colors cursor-pointer select-none ${
                              isSelected
                                ? "bg-[#FFF6F2] hover:bg-[#FFEFE7]"
                                : "hover:bg-neutral-50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {/* Selection checkbox */}
                              <div
                                className={`size-4 rounded-[4px] border flex items-center justify-center transition-colors shrink-0 ${
                                  isSelected
                                    ? "bg-[#FF611C] border-[#FF611C] text-white"
                                    : "border-[#D1D5DB] bg-white"
                                }`}
                              >
                                {isSelected && <CheckIcon className="size-2.5 text-white" />}
                              </div>

                              <div className="size-8 rounded-[6px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center text-[#FF611C] shrink-0">
                                <ProductsIcon className="size-4" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium text-[#3D3D49] text-[11px]">{p.name}</span>
                                <span className="text-[11px] text-[#575765]">{p.code}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="font-medium text-[#3D3D49] text-[11px]">{p.price}</span>
                              <span className="text-[11px] text-[#009689]">{p.stock}</span>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Selected Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-[#EDEDED] text-[11px] text-[#575765] font-medium">
                        <th className="py-2.5 px-3">Product</th>
                        <th className="py-2.5 px-3">SKU</th>
                        <th className="py-2.5 px-3">Qty</th>
                        <th className="py-2.5 px-3">In Stock</th>
                        <th className="py-2.5 px-3">Unit Cost</th>
                        <th className="py-2.5 px-3">Subtotal</th>
                        <th className="py-2.5 px-3 text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
                      {items.map((item) => (
                        <tr key={item.id} className="hover:bg-neutral-50/70 transition-colors">
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2.5">
                              <div className="size-8 rounded-[6px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center text-[#FF611C] shrink-0">
                                <ProductsIcon className="size-4" />
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="font-medium text-[#3D3D49] truncate">{item.name}</span>
                                <span className="text-[11px] text-[#575765]">{item.category}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-[#575765]">{item.sku}</td>
                          <td className="py-3 px-3">
                            <div className="inline-flex items-center border border-[#EDEDED] rounded-[6px] overflow-hidden bg-white">
                              <button
                                type="button"
                                onClick={() => handleQtyChange(item.id, -1)}
                                className="px-2 py-1 text-[#575765] hover:bg-neutral-100 cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2 py-1 text-[11px] font-medium">{item.qty}</span>
                              <button
                                type="button"
                                onClick={() => handleQtyChange(item.id, 1)}
                                className="px-2 py-1 text-[#575765] hover:bg-neutral-100 cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className={`py-3 px-3 font-medium ${item.inStock > 5 ? "text-[#009689]" : "text-[#F92424]"}`}>
                            {item.inStock}
                          </td>
                          <td className="py-3 px-3">{item.unitCost}</td>
                          <td className="py-3 px-3 font-medium">{item.subtotal}</td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleDeleteItem(item.id)}
                              className="text-[#575765] hover:text-[#F92424] cursor-pointer"
                            >
                              <DeleteIcon className="size-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. Discount Section */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#575765] text-[20px]">Discount</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Discount Type */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Discount Type
                    </label>
                    <div className="relative">
                      <select
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Percentage">Percentage</option>
                        <option value="Fixed">Fixed Amount</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Discount Value */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Discount Value
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        placeholder="18"
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] pr-10"
                      />
                      <PercentCircleIcon className="size-4 text-[#A0A0A0] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Managing Director's Comments */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#575765] text-[20px]">
                  Managing Director&apos;s Comments:
                </h2>
                <div className="flex flex-col gap-2">
                  <textarea
                    rows={3}
                    value={mdComments}
                    onChange={(e) => setMdComments(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* 6. Notes & Terms */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#575765] text-[20px]">
                  Notes & Terms
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Notes
                    </label>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Terms & Conditions
                    </label>
                    <textarea
                      rows={4}
                      value={terms}
                      onChange={(e) => setTerms(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Sticky Sidebar Cards */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-6">
              {/* Quotations Summary Card */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#575765] text-[20px]">
                  Quotations Summary
                </h2>

                {/* Header Profile */}
                <div className="flex items-center gap-3 pb-3 border-b border-[#EDEDED]">
                  <div className="size-10 rounded-full bg-[#FFEFE8] text-[#FF611C] flex items-center justify-center shrink-0">
                    <QuotationsIcon className="size-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#3D3D49] text-[11px]">
                      {quotationCode}
                    </span>
                    <span className="text-[11px] text-[#575765]">
                      Abstergo Technology
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 text-[11px] pb-3 border-b border-[#EDEDED]">
                  <div className="flex justify-between">
                    <span className="text-[#575765]">Date:</span>
                    <span className="text-[#3D3D49] font-medium">2026-08-31</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#575765]">Valid Until:</span>
                    <span className="text-[#3D3D49] font-medium">2026-08-31</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#575765]">Items:</span>
                    <span className="text-[#3D3D49] font-medium">{items.length}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-[#575765]">Subtotal</span>
                    <span className="text-[#3D3D49] font-medium">6 090 000 CFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#575765]">Discount</span>
                    <span className="text-[#3D3D49] font-medium">1000 CFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#575765]">Tax</span>
                    <span className="text-[#3D3D49] font-medium">6 000 CFA</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#EDEDED]">
                    <span className="text-[#575765] font-semibold">Total</span>
                    <span className="text-[#3D3D49] font-semibold text-[11px]">
                      6 500 000 CFA</span>
                  </div>
                </div>
              </div>

              {/* Quotation sent to Card */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                <h2 className="font-medium text-[#575765] text-[20px]">
                  Quotation sent to
                </h2>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sendToRep}
                      onChange={(e) => setSendToRep(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`size-4.5 rounded-[4px] border flex items-center justify-center transition-colors ${
                        sendToRep
                          ? "bg-[#FF611C] border-[#FF611C] text-white"
                          : "bg-white border-[#EDEDED]"
                      }`}
                    >
                      {sendToRep && <CheckIcon className="size-3 text-white" />}
                    </div>
                    <span className="text-[11px] text-[#3D3D49]">
                      Requesting Sales Representative
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sendToSalesDirector}
                      onChange={(e) => setSendToSalesDirector(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`size-4.5 rounded-[4px] border flex items-center justify-center transition-colors ${
                        sendToSalesDirector
                          ? "bg-[#FF611C] border-[#FF611C] text-white"
                          : "bg-white border-[#EDEDED]"
                      }`}
                    >
                      {sendToSalesDirector && <CheckIcon className="size-3 text-white" />}
                    </div>
                    <span className="text-[11px] text-[#3D3D49]">
                      Sales Director (copy)
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={sendToMD}
                      onChange={(e) => setSendToMD(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`size-4.5 rounded-[4px] border flex items-center justify-center transition-colors ${
                        sendToMD
                          ? "bg-[#FF611C] border-[#FF611C] text-white"
                          : "bg-white border-[#EDEDED]"
                      }`}
                    >
                      {sendToMD && <CheckIcon className="size-3 text-white" />}
                    </div>
                    <span className="text-[11px] text-[#3D3D49]">
                      Managing Director (copy)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
