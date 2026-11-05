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
  InfoIcon,
} from "@/components/icons/Icons";

interface SelectedItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  qty: number;
  inStock: number;
  unitPriceNum: number;
  unitPrice: string;
  subtotal: string;
}

interface CatalogProduct {
  id: string;
  name: string;
  category: string;
  sku: string;
  unitPrice: number;
  priceFormatted: string;
  stockFormatted: string;
  inStock: number;
}

const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: "p1",
    name: "Dell Latitude 5440",
    category: "Laptops",
    sku: "LN-E14",
    unitPrice: 35000,
    priceFormatted: "485 000 CFA",
    stockFormatted: "3 in stock",
    inStock: 23,
  },
  {
    id: "p2",
    name: "Dell Latitude 5787",
    category: "Laptops",
    sku: "LN-E14",
    unitPrice: 35000,
    priceFormatted: "485 000 CFA",
    stockFormatted: "3 in stock",
    inStock: 2,
  },
  {
    id: "p3",
    name: "Dell Latitude 7654",
    category: "Laptops",
    sku: "LN-E14",
    unitPrice: 35000,
    priceFormatted: "485 000 CFA",
    stockFormatted: "3 in stock",
    inStock: 23,
  },
  {
    id: "p4",
    name: "Dell Latitude 7520",
    category: "Laptops",
    sku: "LN-E14",
    unitPrice: 35000,
    priceFormatted: "485 000 CFA",
    stockFormatted: "3 in stock",
    inStock: 2,
  },
];

export default function AddOrderPage() {
  const router = useRouter();

  // Form states
  const [customer, setCustomer] = useState("Jason Colder");
  const [paymentTerms, setPaymentTerms] = useState("Partial");
  const [orderDate, setOrderDate] = useState("2026-11-04");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("Standard Sale");
  const [technician, setTechnician] = useState("Martin Cooper");
  const [paymentDueDate, setPaymentDueDate] = useState("Standard Sale");
  const [note, setNote] = useState("Please deliver as soon as possible");

  const [searchQuery, setSearchQuery] = useState("");
  const [discountType, setDiscountType] = useState("Percentage");
  const [discountValue, setDiscountValue] = useState("18");

  // Selected items state (Matching exact mockup initial display)
  const [items, setItems] = useState<SelectedItem[]>([
    {
      id: "item-1",
      name: "Dell Latitude 5440",
      category: "Laptops",
      sku: "LN-E14",
      qty: 2,
      inStock: 23,
      unitPriceNum: 35000,
      unitPrice: "35 000 CFA",
      subtotal: "127000 CFA",
    },
    {
      id: "item-2",
      name: "Dell Latitude 5440",
      category: "Laptops",
      sku: "LN-E14",
      qty: 2,
      inStock: 2,
      unitPriceNum: 35000,
      unitPrice: "35 000 CFA",
      subtotal: "127000 CFA",
    },
    {
      id: "item-3",
      name: "Dell Latitude 5440",
      category: "Laptops",
      sku: "LN-E14",
      qty: 2,
      inStock: 23,
      unitPriceNum: 35000,
      unitPrice: "35 000 CFA",
      subtotal: "127000 CFA",
    },
    {
      id: "item-4",
      name: "Dell Latitude 5440",
      category: "Laptops",
      sku: "LN-E14",
      qty: 2,
      inStock: 2,
      unitPriceNum: 35000,
      unitPrice: "35 000 CFA",
      subtotal: "127000 CFA",
    },
    {
      id: "item-5",
      name: "Dell Latitude 5440",
      category: "Laptops",
      sku: "LN-E14",
      qty: 2,
      inStock: 2,
      unitPriceNum: 35000,
      unitPrice: "35 000 CFA",
      subtotal: "127000 CFA",
    },
  ]);

  // Handle clicking a catalog item to add/multi-select
  const handleSelectProduct = (prod: CatalogProduct) => {
    const newItem: SelectedItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: prod.name,
      category: prod.category,
      sku: prod.sku,
      qty: 2,
      inStock: prod.inStock,
      unitPriceNum: prod.unitPrice,
      unitPrice: "35 000 CFA",
      subtotal: "127000 CFA",
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleQtyChange = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newQty = Math.max(1, item.qty + delta);
        return {
          ...item,
          qty: newQty,
          subtotal: `${(item.unitPriceNum * newQty).toLocaleString()} CFA`,
        };
      })
    );
  };

  const handleDeleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/orders/ORD-1024");
  };

  // Filter products by search query
  const filteredProducts = CATALOG_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Orders" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Link
                href="/orders"
                className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] shrink-0"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>
              <div className="flex flex-col">
                <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight">
                  Add New Order
                </h1>
                <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                  Create a new customer order.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/orders"
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
                Create Order
              </button>
            </div>
          </div>

          {/* Form & Preview Grid */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Columns */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* 1. Order Information Section */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#575765] text-[20px]">Order Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Select Customer */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Select Customer
                    </label>
                    <div className="relative">
                      <div className="w-full h-11 px-3 py-2 bg-white border border-[#EDEDED] rounded-[8px] flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[11px] font-medium flex items-center justify-center">
                            JC
                          </div>
                          <span className="text-[11px] text-[#3D3D49]">{customer}</span>
                        </div>
                        <ChevronDownIcon className="size-4 text-[#575765]" />
                      </div>
                    </div>
                  </div>

                  {/* Payment Terms */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Payment Terms
                    </label>
                    <input
                      type="text"
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                      placeholder="Payment Terms"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Order Date */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Order Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={orderDate}
                        onChange={(e) => setOrderDate(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] pr-10"
                      />
                      <CalendarIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Expected Delivery Date */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Expected Delivery Date
                    </label>
                    <div className="relative">
                      <select
                        value={expectedDeliveryDate}
                        onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Standard Sale">Standard Sale</option>
                        <option value="Express Delivery">Express Delivery</option>
                        <option value="Pickup">Pickup</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Assign Technician */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Assign Technician
                    </label>
                    <div className="relative">
                      <div className="w-full h-11 px-3 py-2 bg-white border border-[#EDEDED] rounded-[8px] flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-[#FFEFE8] text-[#FF611C] text-[11px] font-medium flex items-center justify-center">
                            MC
                          </div>
                          <span className="text-[11px] text-[#3D3D49]">{technician}</span>
                        </div>
                        <ChevronDownIcon className="size-4 text-[#575765]" />
                      </div>
                    </div>
                  </div>

                  {/* Payment Due Date */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Payment Due Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={paymentDueDate}
                        onChange={(e) => setPaymentDueDate(e.target.value)}
                        placeholder="Payment Due Date"
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] pr-10"
                      />
                      <CalendarIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Note */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] text-[#575765] font-normal">
                    Note
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Note"
                    className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                  />
                </div>
              </div>

              {/* 2. Order Items Section (Exact Mockup Layout) */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-medium text-[#3D3D49] text-[20px]">Order Items</h2>

                </div>

                {/* Search / Multi-select Catalog Box */}
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] flex items-center justify-between focus-within:border-[#FF611C]">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search product..."
                      className="flex-1 bg-transparent border-none outline-none text-xs text-[#3D3D49]"
                    />
                    <SearchIcon className="size-4 text-[#575765]" />
                  </div>

                  {/* Multi-Select Products List (Click to Add / Select) */}
                  <div className="border border-[#EDEDED] rounded-[8px] bg-white divide-y divide-[#EDEDED] shadow-xs overflow-hidden">
                    {filteredProducts.length === 0 ? (
                      <div className="p-4 text-center text-xs text-[#8C8C9A]">
                        No matching products found.
                      </div>
                    ) : (
                      filteredProducts.map((p) => {
                        return (
                          <div
                            key={p.id}
                            onClick={() => handleSelectProduct(p)}
                            className="p-3 flex items-center justify-between hover:bg-[#FFF6F2]/40 transition-colors cursor-pointer group select-none"
                          >
                            <div className="flex items-center gap-3">
                              <div className="size-8 rounded-[6px] bg-[#FFF2EC] border border-[#FFE0D1] flex items-center justify-center text-[#FF611C] shrink-0 group-hover:scale-105 transition-transform">
                                <ProductsIcon className="size-4" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium text-[#3D3D49] text-[13px] group-hover:text-[#FF611C] transition-colors">
                                  {p.name}
                                </span>
                                <span className="text-xs text-[#575765]">{p.category}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="font-medium text-[#3D3D49] text-[13px]">
                                {p.priceFormatted}
                              </span>
                              <span className="text-xs text-[#009689] font-normal">
                                {p.stockFormatted}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Dynamic Selected Items Table */}
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-[#EDEDED] text-xs text-[#575765] font-medium">
                        <th className="py-2.5 px-3">Product</th>
                        <th className="py-2.5 px-3">SKU</th>
                        <th className="py-2.5 px-3">Qty</th>
                        <th className="py-2.5 px-3">In Stock</th>
                        <th className="py-2.5 px-3">Unit Price</th>
                        <th className="py-2.5 px-3">Subtotal</th>
                        <th className="py-2.5 px-3 text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDEDED] text-[13px] text-[#3D3D49]">
                      {items.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-xs text-[#8C8C9A]">
                            No items in the order. Click any product above to add it.
                          </td>
                        </tr>
                      ) : (
                        items.map((item) => (
                          <tr key={item.id} className="hover:bg-neutral-50/70 transition-colors">
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2.5">
                                <div className="size-8 rounded-[6px] bg-[#FFF2EC] border border-[#FFE0D1] flex items-center justify-center text-[#FF611C] shrink-0">
                                  <ProductsIcon className="size-4" />
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="font-medium text-[#3D3D49] truncate">
                                    {item.name}
                                  </span>
                                  <span className="text-xs text-[#575765]">{item.category}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-[#575765] text-xs">{item.sku}</td>
                            <td className="py-3 px-3">
                              <div className="inline-flex items-center border border-[#EDEDED] rounded-[6px] overflow-hidden bg-white">
                                <button
                                  type="button"
                                  onClick={() => handleQtyChange(item.id, -1)}
                                  className="px-2.5 py-1 text-[#575765] hover:bg-neutral-100 cursor-pointer font-medium"
                                >
                                  -
                                </button>
                                <span className="px-2.5 py-1 text-xs font-medium">{item.qty}</span>
                                <button
                                  type="button"
                                  onClick={() => handleQtyChange(item.id, 1)}
                                  className="px-2.5 py-1 text-[#575765] hover:bg-neutral-100 cursor-pointer font-medium"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td
                              className={`py-3 px-3 font-medium text-xs ${item.inStock > 5 ? "text-[#009689]" : "text-[#F92424]"
                                }`}
                            >
                              {item.inStock}
                            </td>
                            <td className="py-3 px-3 text-xs">{item.unitPrice}</td>
                            <td className="py-3 px-3 font-medium text-xs">{item.subtotal}</td>
                            <td className="py-3 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleDeleteItem(item.id)}
                                className="text-[#575765] hover:text-[#F92424] transition-colors cursor-pointer p-1"
                              >
                                <DeleteIcon className="size-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. Discount Section */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#575765] text-[20px]">Discount</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                        <option value="Fixed Amount">Fixed Amount</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Discount Value
                    </label>
                    <input
                      type="text"
                      value={discountValue}
                      onChange={(e) => setDiscountValue(e.target.value)}
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Pricing Summary Sticky Card */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5 sticky top-6">
                <h2 className="font-medium text-[#575765] text-[20px]">Pricing Summary</h2>

                <div className="flex flex-col divide-y divide-[#EDEDED] text-[11px]">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#575765]">Subtotal:</span>
                    <span className="text-[#3D3D49] font-medium">
                      {(items.reduce((s, i) => s + i.qty * 35000, 0)).toLocaleString()} CFA
                    </span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#575765]">Discount:</span>
                    <span className="text-[#3D3D49] font-medium">1000 CFA</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#575765]">Tax:</span>
                    <span className="text-[#3D3D49] font-medium">18%</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#575765] font-semibold">Grand Total:</span>
                    <span className="text-[#3D3D49] font-semibold">
                      {(Math.round(items.reduce((s, i) => s + i.qty * 35000, 0) * 1.18 - 1000)).toLocaleString()} CFA
                    </span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#575765]">Available:</span>
                    <span className="text-[#009689] font-medium">
                      {items.filter((i) => i.inStock > 5).length} / {items.length}
                    </span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-[#575765]">Pending:</span>
                    <span className="text-[#F92424] font-medium">
                      {items.filter((i) => i.inStock <= 5).length}
                    </span>
                  </div>
                </div>

                {/* Warning Alert */}
                <div className="p-3.5 rounded-[8px] border border-[#FFD0B8] bg-[#FFF4EE] flex items-start gap-2.5">
                  <InfoIcon className="size-4 text-[#FF611C] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#E04F0E] font-normal leading-relaxed">
                    Partially Available: {items.filter((i) => i.inStock <= 5).length} units need to be purchased.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
