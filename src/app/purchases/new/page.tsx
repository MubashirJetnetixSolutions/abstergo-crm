"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  SearchIcon,
  PlusCircleIcon,
  DeleteIcon,
  CalendarIcon,
  AlertCircleIcon,
} from "@/components/icons/Icons";

interface ProductItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  qty: number;
  inStock: number;
  unitPrice: number;
}

const AVAILABLE_PRODUCTS = [
  { id: "1", name: "Dell Latitude 5440", category: "Laptops", sku: "LN-E14", price: 485000, inStock: 23 },
  { id: "2", name: "Dell Latitude 5787", category: "Laptops", sku: "LN-E15", price: 520000, inStock: 12 },
  { id: "3", name: "Dell Latitude 7654", category: "Laptops", sku: "LN-E16", price: 610000, inStock: 8 },
  { id: "4", name: "Dell Latitude 7520", category: "Laptops", sku: "LN-E17", price: 580000, inStock: 15 },
  { id: "5", name: "HP EliteBook 840 G9", category: "Laptops", sku: "HP-840", price: 650000, inStock: 7 },
  { id: "6", name: "Lenovo ThinkPad X1 Carbon", category: "Laptops", sku: "TP-X1", price: 920000, inStock: 5 },
];

export default function CreatePurchasePage() {
  const router = useRouter();

  // Form states
  const [supplier, setSupplier] = useState("Jason Colder");
  const [supplierInitials] = useState("JC");
  const [purchaseType, setPurchaseType] = useState("Order Purchase");
  const [purchaseDate, setPurchaseDate] = useState("2027-04-04");
  const [expectedDelivery, setExpectedDelivery] = useState("2027-04-08");
  const [paymentTerms, setPaymentTerms] = useState("30 Days");
  const [notes, setNotes] = useState(
    "Please ensure all 10 laptops are new, factory-sealed and include original accessories. Kindly provide serial/IMEI details with the delivery note."
  );

  // Search & Item selection (Selectable Search)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = AVAILABLE_PRODUCTS.filter(
    (prod) =>
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Selected items table
  const [items, setItems] = useState<ProductItem[]>([
    {
      id: "1",
      name: "Dell Latitude 5440",
      category: "Laptops",
      sku: "LN-E14",
      qty: 2,
      inStock: 23,
      unitPrice: 35000,
    },
    {
      id: "2",
      name: "Dell Latitude 5440",
      category: "Laptops",
      sku: "LN-E14",
      qty: 2,
      inStock: 23,
      unitPrice: 35000,
    },
    {
      id: "3",
      name: "Dell Latitude 5440",
      category: "Laptops",
      sku: "LN-E14",
      qty: 2,
      inStock: 2,
      unitPrice: 35000,
    },
  ]);

  const handleAddProductClick = () => {
    let prodsToAdd = AVAILABLE_PRODUCTS.filter((p) =>
      selectedProductIds.includes(p.id)
    );

    if (prodsToAdd.length === 0 && searchQuery.trim()) {
      const match = filteredProducts[0];
      if (match) prodsToAdd = [match];
    }

    if (prodsToAdd.length === 0) return;

    setItems((prev) => {
      const updated = [...prev];
      prodsToAdd.forEach((prod) => {
        const existingIdx = updated.findIndex((it) => it.sku === prod.sku);
        if (existingIdx >= 0) {
          updated[existingIdx] = {
            ...updated[existingIdx],
            qty: updated[existingIdx].qty + 1,
          };
        } else {
          updated.push({
            id: `${prod.id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            name: prod.name,
            category: prod.category,
            sku: prod.sku,
            qty: 1,
            inStock: prod.inStock,
            unitPrice: prod.price,
          });
        }
      });
      return updated;
    });

    setSelectedProductIds([]);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const totalItemsCount = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const discount = items.length > 0 ? 1000 : 0;
  const grandTotal = Math.max(0, subtotal - discount);

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Purchases" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Row: Back button, Title & Subtitle, Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/purchases"
                className="flex size-11 items-center justify-center rounded-[8px] border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900"
              >
                <ChevronLeftIcon className="size-5" />
              </Link>
              <div className="flex flex-col gap-0.5">
                <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight tracking-tight">
                  Create Purchase
                </h1>
                <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                  Create a new purchase for your inventory
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/purchases")}
                className="px-5 py-2.5 rounded-[8px] border border-gray-200 bg-white text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => router.push("/purchases")}
                className="px-6 py-2.5 rounded-[8px] text-sm font-semibold text-white shadow-sm transition hover:opacity-95"
                style={{
                  background:
                    "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Create Order
              </button>
            </div>
          </div>

          {/* Main Grid: Left 8 cols, Right 4 cols */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Supplier Details */}
              <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-[#3D3D49] mb-4">
                  Supplier Details
                </h2>
                <div>
                  <label className="block text-xs font-semibold text-[#8C8C9A] uppercase tracking-wider mb-2">
                    Select Supplier
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-3 text-left text-sm text-[#3D3D49] shadow-sm transition hover:bg-gray-50/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex size-7 items-center justify-center rounded-full bg-[#E7F2FC] text-xs font-bold text-[#1E75FF]">
                          {supplierInitials}
                        </div>
                        <span className="font-medium text-[#3D3D49]">
                          {supplier}
                        </span>
                      </div>
                      <ChevronDownIcon className="size-4 text-[#8C8C9A]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-[#3D3D49] mb-5">
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#8C8C9A] uppercase tracking-wider mb-2">
                      Purchase Type
                    </label>
                    <div className="relative">
                      <select
                        value={purchaseType}
                        onChange={(e) => setPurchaseType(e.target.value)}
                        className="w-full appearance-none rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-3 text-sm font-medium text-[#3D3D49] shadow-sm focus:border-gray-900 focus:outline-none"
                      >
                        <option value="Order Purchase">Order Purchase</option>
                        <option value="Direct Purchase">Direct Purchase</option>
                        <option value="Internal Stock">Internal Stock</option>
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-[#8C8C9A]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#8C8C9A] uppercase tracking-wider mb-2">
                        Purchase Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={purchaseDate}
                          onChange={(e) => setPurchaseDate(e.target.value)}
                          className="w-full rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-3 text-sm font-medium text-[#3D3D49] shadow-sm focus:border-gray-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#8C8C9A] uppercase tracking-wider mb-2">
                        Expected Delivery <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={expectedDelivery}
                          onChange={(e) => setExpectedDelivery(e.target.value)}
                          className="w-full rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-3 text-sm font-medium text-[#3D3D49] shadow-sm focus:border-gray-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#8C8C9A] uppercase tracking-wider mb-2">
                      Payment Terms
                    </label>
                    <div className="relative">
                      <select
                        value={paymentTerms}
                        onChange={(e) => setPaymentTerms(e.target.value)}
                        className="w-full appearance-none rounded-[8px] border border-[#E9ECEF] bg-white px-4 py-3 text-sm font-medium text-[#3D3D49] shadow-sm focus:border-gray-900 focus:outline-none"
                      >
                        <option value="30 Days">30 Days</option>
                        <option value="15 Days">15 Days</option>
                        <option value="Immediate">Immediate</option>
                        <option value="60 Days">60 Days</option>
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 size-4 text-[#8C8C9A]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Items */}
              <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-[#3D3D49]">
                    Purchase Items
                  </h2>
                  <button
                    type="button"
                    onClick={handleAddProductClick}
                    className="flex items-center gap-2 rounded-[8px] px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95 transition cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                    }}
                  >
                    <PlusCircleIcon className="size-4 text-white" />
                    <span>
                      {selectedProductIds.length > 1
                        ? `Add Products (${selectedProductIds.length})`
                        : "Add Product"}
                    </span>
                  </button>
                </div>

                {/* Selectable Search */}
                <div className="relative" ref={searchRef}>
                  <div
                    onClick={() => setIsSearchOpen(true)}
                    className="flex items-center justify-between w-full rounded-[8px] border border-[#E9ECEF] bg-white px-3.5 py-2.5 text-sm text-[#3D3D49] shadow-sm cursor-pointer hover:border-gray-400 focus-within:border-gray-900 transition"
                  >
                    <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0 mr-2">
                      {selectedProductIds.length > 0 &&
                        selectedProductIds.map((id) => {
                          const prod = AVAILABLE_PRODUCTS.find((p) => p.id === id);
                          if (!prod) return null;
                          return (
                            <span
                              key={id}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#E7F2FC] text-[#0D79E4] text-xs font-medium"
                            >
                              <span>{prod.name}</span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleSelectProduct(id);
                                }}
                                className="hover:text-red-500 font-bold ml-0.5 cursor-pointer"
                              >
                                ×
                              </button>
                            </span>
                          );
                        })}
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setIsSearchOpen(true);
                        }}
                        onFocus={() => setIsSearchOpen(true)}
                        placeholder={
                          selectedProductIds.length === 0
                            ? "Search and select products..."
                            : "Search more..."
                        }
                        className="flex-1 min-w-[140px] bg-transparent outline-none text-sm text-[#3D3D49] placeholder:text-[#8C8C9A]"
                      />
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-[#8C8C9A]">
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearchQuery("");
                          }}
                          className="hover:text-[#3D3D49] p-0.5 text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                      <SearchIcon className="size-4" />
                      <ChevronDownIcon
                        className={`size-4 transition-transform duration-150 ${
                          isSearchOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Dropdown Options */}
                  {isSearchOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 z-30 max-h-72 overflow-y-auto rounded-[8px] border border-[#E9ECEF] bg-white p-2 shadow-lg divide-y divide-[#F1F3F5] animate-in fade-in zoom-in-95 duration-100">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((prod) => {
                          const isSelected = selectedProductIds.includes(prod.id);
                          return (
                            <div
                              key={prod.id}
                              onClick={() => toggleSelectProduct(prod.id)}
                              className={`flex w-full items-center justify-between p-2.5 rounded-[6px] transition cursor-pointer ${
                                isSelected ? "bg-[#F0F7FF]" : "hover:bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`size-4.5 rounded-[4px] border flex items-center justify-center transition-colors shrink-0 ${
                                    isSelected
                                      ? "bg-[#0D79E4] border-[#0D79E4] text-white"
                                      : "border-gray-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <span className="text-[11px] font-bold leading-none">
                                      ✓
                                    </span>
                                  )}
                                </div>
                                <div className="flex size-9 items-center justify-center rounded-[6px] bg-gray-100 border border-gray-200 text-base font-bold shrink-0">
                                  💻
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-[#3D3D49]">
                                    {prod.name}
                                  </p>
                                  <p className="text-xs text-[#8C8C9A]">
                                    {prod.category} · {prod.sku}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-bold text-[#3D3D49]">
                                  {prod.price.toLocaleString()} CFA
                                </p>
                                <p className="text-[11px] font-medium text-emerald-600">
                                  {prod.inStock} in stock
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-xs text-[#8C8C9A]">
                          No products found matching &quot;{searchQuery}&quot;
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto rounded-[8px] border border-[#E9ECEF]">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-[#E9ECEF] bg-[#F8FAFD] text-[#8C8C9A] font-medium">
                      <tr>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-3">SKU</th>
                        <th className="py-3 px-3">Qty</th>
                        <th className="py-3 px-3">In Stock</th>
                        <th className="py-3 px-3">Unit Price</th>
                        <th className="py-3 px-3">Subtotal</th>
                        <th className="py-3 px-3 text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9ECEF]">
                      {items.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50/50 transition"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="flex size-8 items-center justify-center rounded-[6px] bg-gray-100 text-xs">
                                💻
                              </div>
                              <div>
                                <p className="font-semibold text-[#3D3D49]">
                                  {item.name}
                                </p>
                                <p className="text-[11px] text-[#8C8C9A]">
                                  {item.category}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-medium text-[#575765]">
                            {item.sku}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1.5 rounded-[6px] border border-[#E9ECEF] bg-white px-2 py-1 w-fit shadow-sm">
                              <span className="font-bold text-[#3D3D49] w-4 text-center">
                                {item.qty}
                              </span>
                              <div className="flex flex-col">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQty(item.id, 1)}
                                  className="text-[9px] text-[#8C8C9A] hover:text-[#3D3D49]"
                                >
                                  ▲
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQty(item.id, -1)}
                                  className="text-[9px] text-[#8C8C9A] hover:text-[#3D3D49]"
                                >
                                  ▼
                                </button>
                              </div>
                            </div>
                          </td>
                          <td
                            className={`py-3 px-3 font-bold ${item.inStock > 5
                                ? "text-emerald-600"
                                : "text-rose-500"
                              }`}
                          >
                            {item.inStock}
                          </td>
                          <td className="py-3 px-3 font-semibold text-[#3D3D49]">
                            {item.unitPrice.toLocaleString()} CFA
                          </td>
                          <td className="py-3 px-3 font-bold text-[#3D3D49]">
                            {(item.unitPrice * item.qty).toLocaleString()} CFA
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="rounded-[6px] p-1.5 text-[#8C8C9A] hover:bg-red-50 hover:text-red-600 transition"
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

              {/* Additional Details */}
              <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm">
                <h2 className="text-base font-semibold text-[#3D3D49] mb-4">
                  Additional Details
                </h2>
                <div>
                  <label className="block text-xs font-semibold text-[#8C8C9A] uppercase tracking-wider mb-2">
                    Supplier Notes
                  </label>
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-[8px] border border-[#E9ECEF] bg-white p-4 text-sm text-[#3D3D49] shadow-sm focus:border-gray-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-6 rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm space-y-6">
                <h2 className="text-base font-semibold text-[#3D3D49] pb-3 border-b border-[#E9ECEF]">
                  Purchase Summary
                </h2>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C8C9A]">Total Items</span>
                    <span className="font-semibold text-[#3D3D49]">
                      {totalItemsCount} Items
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C8C9A]">Payment Terms</span>
                    <span className="font-semibold text-[#3D3D49]">
                      {paymentTerms}
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5 border-t border-[#E9ECEF] pt-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C8C9A]">Subtotal</span>
                    <span className="font-semibold text-[#3D3D49]">
                      {subtotal.toLocaleString()} CFA
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C8C9A]">Discount</span>
                    <span className="font-semibold text-[#3D3D49]">
                      {discount.toLocaleString()} CFA
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C8C9A]">Tax</span>
                    <span className="font-semibold text-[#3D3D49]">18%</span>
                  </div>
                </div>

                <div className="border-t border-[#E9ECEF] pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#3D3D49]">
                      Grand Total
                    </span>
                    <span className="text-base font-bold text-[#3D3D49]">
                      {grandTotal.toLocaleString()} CFA
                    </span>
                  </div>
                </div>

                {/* Warning / Note Box */}
                <div className="flex items-start gap-3 rounded-[8px] border border-[#FFD0B8] bg-[#FFF5F0] p-3.5 text-xs text-[#E04F0E]">
                  <AlertCircleIcon className="size-4 shrink-0 text-[#FF611C] mt-0.5" />
                  <p className="leading-relaxed">
                    Inventory is NOT updated when creating an order purchase.
                    Stock updates only when adding internal Stock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
