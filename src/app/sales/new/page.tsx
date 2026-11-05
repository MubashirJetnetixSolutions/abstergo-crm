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
  SearchIcon,
  ProductsIcon,
  DeleteIcon,
  PlusCircleIcon,
  CheckIcon,
  PrinterIcon,
} from "@/components/icons/Icons";

interface ProductCatalogItem {
  id: string;
  name: string;
  sku: string;
  priceNum: number;
  priceFormatted: string;
  stock: number;
  stockStatus: "3 in stock" | "8 in stock" | "12 in stock";
  category: string;
}

interface CartItem {
  id: string;
  name: string;
  sku: string;
  priceNum: number;
  priceFormatted: string;
  qty: number;
}

const CATEGORIES = [
  "All",
  "Laptops",
  "Monitors",
  "Accessories",
  "Networking",
  "Storage",
  "Power",
  "Printers",
];

const INITIAL_CATALOG: ProductCatalogItem[] = [
  { id: "p1", name: "Dell Latitude 5440", sku: "DL-5440", priceNum: 485000, priceFormatted: "485 000 CFA", stock: 3, stockStatus: "3 in stock", category: "Laptops" },
  { id: "p2", name: "Dell Latitude 5440", sku: "DL-5440", priceNum: 485000, priceFormatted: "485 000 CFA", stock: 8, stockStatus: "8 in stock", category: "Laptops" },
  { id: "p3", name: "Dell Latitude 5440", sku: "DL-5440", priceNum: 485000, priceFormatted: "485 000 CFA", stock: 8, stockStatus: "8 in stock", category: "Laptops" },
  { id: "p4", name: "Dell Latitude 5440", sku: "DL-5440", priceNum: 485000, priceFormatted: "485 000 CFA", stock: 12, stockStatus: "12 in stock", category: "Laptops" },
  { id: "p5", name: "Dell Latitude 5440", sku: "DL-5440", priceNum: 485000, priceFormatted: "485 000 CFA", stock: 12, stockStatus: "12 in stock", category: "Laptops" },
  { id: "p6", name: "Dell Latitude 5440", sku: "DL-5440", priceNum: 485000, priceFormatted: "485 000 CFA", stock: 3, stockStatus: "3 in stock", category: "Laptops" },
  { id: "p7", name: "Dell Latitude 5440", sku: "DL-5440", priceNum: 485000, priceFormatted: "485 000 CFA", stock: 8, stockStatus: "8 in stock", category: "Laptops" },
  { id: "p8", name: "Dell Latitude 5440", sku: "DL-5440", priceNum: 485000, priceFormatted: "485 000 CFA", stock: 12, stockStatus: "12 in stock", category: "Laptops" },
  { id: "p9", name: "Dell Latitude 5440", sku: "DL-5440", priceNum: 485000, priceFormatted: "485 000 CFA", stock: 12, stockStatus: "12 in stock", category: "Laptops" },
  { id: "p10", name: "Dell Latitude 5440", sku: "DL-5440", priceNum: 485000, priceFormatted: "485 000 CFA", stock: 12, stockStatus: "12 in stock", category: "Laptops" },
  { id: "p11", name: "Dell Latitude 5440", sku: "DL-5440", priceNum: 485000, priceFormatted: "485 000 CFA", stock: 12, stockStatus: "12 in stock", category: "Laptops" },
  { id: "p12", name: "Dell Latitude 5440", sku: "DL-5440", priceNum: 485000, priceFormatted: "485 000 CFA", stock: 12, stockStatus: "12 in stock", category: "Laptops" },
];

const INITIAL_CART: CartItem[] = [
  { id: "c1", name: "Samsung 1TB SSD", sku: "SS-SSD1T · 68 000 CFA each", priceNum: 61200, priceFormatted: "61 200 CFA", qty: 12 },
  { id: "c2", name: "Samsung 1TB SSD", sku: "SS-SSD1T · 68 000 CFA each", priceNum: 61200, priceFormatted: "61 200 CFA", qty: 12 },
  { id: "c3", name: "Samsung 1TB SSD", sku: "SS-SSD1T · 68 000 CFA each", priceNum: 61200, priceFormatted: "61 200 CFA", qty: 12 },
];

const QUICK_AMOUNTS = [
  "€100.00",
  "€200.00",
  "€300.00",
  "€400.00",
  "€500.00",
  "€600.00",
  "€700.00",
  "€800.00",
];

export default function AddSalePage() {
  const router = useRouter();

  // Basic Details states
  const [customer, setCustomer] = useState("Digital Pro SARL");
  const [saleDate, setSaleDate] = useState("2026-11-04");
  const [technician, setTechnician] = useState("Martin Cooper");

  // Product Catalog states
  const [activeCategory, setActiveCategory] = useState("Laptops");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([
    "p1",
    "p3",
    "p7",
  ]);

  // Cart & Note states
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [note, setNote] = useState("Need this devices immediate purposes.");
  const [discountPercent, setDiscountPercent] = useState("10");

  // Modal states
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("200.00");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [selectedQuickAmount, setSelectedQuickAmount] = useState("€600.00");

  // Toggle catalog item selection
  const handleToggleProduct = (product: ProductCatalogItem) => {
    if (selectedProductIds.includes(product.id)) {
      setSelectedProductIds(selectedProductIds.filter((id) => id !== product.id));
    } else {
      setSelectedProductIds([...selectedProductIds, product.id]);
    }
  };

  // Quantity changes in cart
  const handleQtyChange = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const handleDeleteCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleConfirmPayment = () => {
    setShowCheckoutModal(false);
    setShowSuccessModal(true);
  };

  const filteredCatalog = INITIAL_CATALOG.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Sales" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Link
                href="/sales"
                className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] shrink-0"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>
              <div className="flex flex-col">
                <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight">
                  Add New Sale
                </h1>
                <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                  Select products to add to the cart
                </p>
              </div>
            </div>

            {/* Top Right Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/sales"
                className="px-5 py-2.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#575765] hover:text-[#3D3D49] font-medium text-[11px] transition-colors"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={() => setShowCheckoutModal(true)}
                className="px-5 py-2.5 rounded-[8px] text-white font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
                style={{
                  background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Create Sale
              </button>
            </div>
          </div>

          {/* 1. Basic Details Card */}
          <div className="bg-white border border-[#EDEDED] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#EDEDED]">
              <h2 className="font-medium text-[#575765] text-[20px]">
                Basic Details
              </h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Select Customer */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] text-[#575765] font-normal">
                  Select Customer
                </label>
                <div className="relative">
                  <select
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] appearance-none cursor-pointer focus:outline-none focus:border-[#FF611C] pr-10"
                  >
                    <option value="Digital Pro SARL">Digital Pro SARL</option>
                    <option value="Argon Technology">Argon Technology</option>
                    <option value="Jason Colder">Jason Colder</option>
                    <option value="Absto Technologies">Absto Technologies</option>
                  </select>
                  <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Sale date* */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] text-[#575765] font-normal">
                  Sale date*
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={saleDate}
                    onChange={(e) => setSaleDate(e.target.value)}
                    className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] focus:outline-none focus:border-[#FF611C] pr-10 cursor-pointer"
                  />
                  <CalendarIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                      <span className="text-[11px] text-[#3D3D49]">
                        {technician}
                      </span>
                    </div>
                    <ChevronDownIcon className="size-4 text-[#575765]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Main 2-Column Section: Products Catalog (Left) & Cart / Items (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7-8 Columns: Products Catalog Grid */}
            <div className="lg:col-span-8 bg-white border border-[#EDEDED] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-[#EDEDED]">
                <h2 className="font-medium text-[#575765] text-[20px]">
                  Products
                </h2>
              </div>

              {/* Search Bar */}
              <div className="p-4 border-b border-[#EDEDED]">
                <div className="w-full h-10 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] flex items-center justify-between focus-within:border-[#FF611C] transition-colors">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-transparent border-none outline-none text-[11px] text-[#3D3D49]"
                  />
                  <SearchIcon className="size-4 text-[#575765] shrink-0" />
                </div>
              </div>

              {/* Category Pills Tabs */}
              <div className="px-4 py-3 border-b border-[#EDEDED] flex items-center gap-2 overflow-x-auto">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-[6px] text-[11px] font-medium transition-all shrink-0 cursor-pointer ${isActive
                          ? "bg-[#FF611C] text-white shadow-[0_2px_8px_rgba(255,97,28,0.3)]"
                          : "bg-white border border-[#EDEDED] text-[#575765] hover:text-[#3D3D49] hover:bg-neutral-50"
                        }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Product Cards Grid */}
              <div className="p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {filteredCatalog.map((prod) => {
                  const isSelected = selectedProductIds.includes(prod.id);
                  return (
                    <div
                      key={prod.id}
                      onClick={() => handleToggleProduct(prod)}
                      className={`rounded-[12px] p-3 flex flex-col gap-3 transition-all cursor-pointer border ${isSelected
                          ? "bg-[#FF611C]/5 border-[#FF611C]"
                          : "bg-white border-[#EDEDED] hover:border-neutral-300"
                        }`}
                    >
                      {/* Top Row: Thumbnail + Checkbox */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="w-[84px] h-[28px] bg-[#F5F5F5] border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#FF611C]">
                          <ProductsIcon className="size-5" />
                        </div>

                        {/* Checkbox */}
                        <div
                          className={`size-5 rounded-[4px] flex items-center justify-center transition-colors ${isSelected ? "bg-[#FF611C]" : "bg-[#EDEDED]"
                            }`}
                        >
                          {isSelected && <CheckIcon className="size-3 text-white" />}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-col">
                          <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                            {prod.name}
                          </span>
                          <span className="text-[11px] text-[#575765] opacity-80">
                            {prod.sku}
                          </span>
                        </div>

                        <div className="flex flex-col">
                          <span className="font-normal text-[#3D3D49] text-[11px]">
                            {prod.priceFormatted}
                          </span>
                          <span
                            className={`text-[11px] font-medium ${prod.stock <= 3
                                ? "text-[#F92424]"
                                : prod.stock <= 8
                                  ? "text-[#EDAC00]"
                                  : "text-[#009689]"
                              }`}
                          >
                            {prod.stockStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 4-5 Columns: Cart & Checkout Summary */}
            <div className="lg:col-span-4 bg-white border border-[#EDEDED] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col gap-5 sticky top-6">
              <div className="px-6 py-4 border-b border-[#EDEDED]">
                <h2 className="font-medium text-[#575765] text-[20px]">Items</h2>
              </div>

              <div className="px-6 flex flex-col gap-5">
                {/* Customer Box */}
                <div className="p-3 border border-[#EDEDED] rounded-[10px] bg-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="size-8 rounded-full bg-[#F3EEFF] text-[#8A58FF] font-medium text-[11px] flex items-center justify-center shrink-0">
                      AS
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                        Digital Pro SARL
                      </span>
                      <span className="text-[11px] text-[#575765]">
                        Business Customer
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end whitespace-nowrap">
                    <span className="text-[11px] text-[#575765]">Balance:</span>
                    <span className="font-medium text-[#F92424] text-[11px]">
                      1 240 000 CFA</span>
                  </div>
                </div>

                {/* Selected Cart Items List */}
                <div className="flex flex-col gap-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 border border-[#EDEDED] rounded-[10px] bg-white flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="size-11 rounded-[8px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center text-[#FF611C] shrink-0">
                            <ProductsIcon className="size-5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-[#575765] truncate">
                              {item.sku}
                            </span>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteCartItem(item.id)}
                          className="size-7 rounded-[6px] bg-[#FEE9E9] text-[#F92424] flex items-center justify-center hover:bg-red-100 transition-colors cursor-pointer shrink-0"
                        >
                          <DeleteIcon className="size-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#3D3D49] text-[11px]">
                          {item.priceFormatted}
                        </span>

                        {/* Quantity Counter */}
                        <div className="inline-flex items-center border border-[#EDEDED] rounded-[6px] overflow-hidden bg-white">
                          <button
                            type="button"
                            onClick={() => handleQtyChange(item.id, -1)}
                            className="size-7 flex items-center justify-center text-[#575765] hover:bg-neutral-100 cursor-pointer font-bold"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-[11px] font-medium text-[#3D3D49]">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQtyChange(item.id, 1)}
                            className="size-7 flex items-center justify-center text-[#575765] hover:bg-neutral-100 cursor-pointer font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Note Section */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#575765] font-normal">
                    Add Note
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full h-10 px-3 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] focus:outline-none focus:border-[#FF611C]"
                  />
                </div>

                {/* Pricing Summary */}
                <div className="flex flex-col divide-y divide-[#EDEDED] text-[11px] pt-1">
                  <div className="py-2 flex justify-between">
                    <span className="text-[#575765]">Subtotal (3 Items)</span>
                    <span className="text-[#3D3D49] font-normal">
                      2 130 000 CFA</span>
                  </div>

                  <div className="py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[#575765]">Global discount</span>
                      <div className="flex items-center border border-[#EDEDED] rounded-[4px] px-1.5 py-0.5 w-12 justify-between">
                        <input
                          type="text"
                          value={discountPercent}
                          onChange={(e) => setDiscountPercent(e.target.value)}
                          className="w-5 text-[11px] outline-none text-[#3D3D49]"
                        />
                        <span className="text-[11px] text-[#575765]">✕</span>
                      </div>
                    </div>
                    <span className="text-[#F92424] font-medium">
                      - 106 500 CFA</span>
                  </div>

                  <div className="py-3 flex justify-between font-medium text-[11px]">
                    <span className="text-[#3D3D49]">Total</span>
                    <span className="text-[#3D3D49]">2 023 500 CFA</span>
                  </div>
                </div>

                {/* Proceed to Checkout Button */}
                <div className="pb-6">
                  <button
                    type="button"
                    onClick={() => setShowCheckoutModal(true)}
                    className="w-full py-3 rounded-[8px] flex items-center justify-center gap-2 text-white font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
                    style={{
                      background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                    }}
                  >
                    <PlusCircleIcon className="size-4 text-white" />
                    <span>Proceed to checkout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* =========================================================================
          POPUP MODAL 1: Checkout Modal (node-id 6117:3663)
          ========================================================================= */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white border border-[#EDEDED] rounded-[16px] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col gap-6 p-6">
            {/* Back Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="size-9 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                <ChevronLeftIcon className="size-4" />
              </button>
              <h2 className="font-medium text-[#3D3D49] text-[20px]">
                Back to Cart
              </h2>
            </div>

            {/* Customer Box */}
            <div className="p-4 border border-[#EDEDED] rounded-[10px] bg-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-9 rounded-full bg-[#F3EEFF] text-[#8A58FF] font-medium text-[11px] flex items-center justify-center shrink-0">
                  AS
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                    Argon Technology
                  </span>
                  <span className="text-[11px] text-[#575765]">
                    Business Customer
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end whitespace-nowrap">
                <span className="text-[11px] text-[#575765]">Balance:</span>
                <span className="font-medium text-[#F92424] text-[11px]">
                  1 240 000 CFA</span>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="flex flex-col divide-y divide-[#EDEDED] text-[11px]">
              <div className="py-2 flex justify-between">
                <span className="text-[#575765]">Subtotal (3 Items)</span>
                <span className="text-[#3D3D49] font-medium">2 130 000 CFA</span>
              </div>
              <div className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[#575765]">Global discount</span>
                  <div className="flex items-center border border-[#EDEDED] rounded-[4px] px-1.5 py-0.5 w-12 justify-between">
                    <span className="text-[11px] text-[#3D3D49]">10</span>
                    <span className="text-[11px] text-[#575765]">✕</span>
                  </div>
                </div>
                <span className="text-[#F92424] font-medium">- 106 500 CFA</span>
              </div>
              <div className="py-2.5 flex justify-between font-semibold text-[11px]">
                <span className="text-[#3D3D49]">Total</span>
                <span className="text-[#3D3D49]">2 023 500 CFA</span>
              </div>
            </div>

            {/* Receive Payment Section */}
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-[#575765] text-[11px]">
                Receive Payment:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Amount */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#575765]">Amount</label>
                  <div className="h-11 px-3 bg-white border border-[#EDEDED] rounded-[8px] flex items-center justify-between focus-within:border-[#FF611C]">
                    <input
                      type="text"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full bg-transparent outline-none text-[11px] text-[#3D3D49]"
                    />
                    <span className="text-[#575765] text-[11px] font-medium">$</span>
                  </div>
                </div>

                {/* Method */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] text-[#575765]">Method</label>
                  <div className="relative">
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full h-11 px-3 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] appearance-none cursor-pointer focus:outline-none focus:border-[#FF611C]"
                    >
                      <option value="Cash">Cash</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Mobile Money">Mobile Money</option>
                    </select>
                    <ChevronDownIcon className="size-4 text-[#575765] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Quick Amount Pills */}
              <div className="grid grid-cols-4 gap-2">
                {QUICK_AMOUNTS.map((amt) => {
                  const isSelected = selectedQuickAmount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setSelectedQuickAmount(amt)}
                      className={`h-9 rounded-[6px] text-[11px] font-medium transition-all cursor-pointer ${isSelected
                          ? "bg-[#FF611C] text-white shadow-[0_2px_6px_rgba(255,97,28,0.3)]"
                          : "bg-white border border-[#EDEDED] text-[#3D3D49] hover:bg-neutral-50"
                        }`}
                    >
                      {amt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Confirm Payment Button */}
            <button
              type="button"
              onClick={handleConfirmPayment}
              className="w-full py-3 rounded-[8px] flex items-center justify-center gap-2 text-white font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer mt-2"
              style={{
                background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
              }}
            >
              <CheckIcon className="size-4 text-white" />
              <span>Confirm Payment · 2 525 000 CFA</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          POPUP MODAL 2: Sale Created Success Modal (node-id 6121:4632)
          ========================================================================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-[#EDEDED] rounded-[16px] shadow-2xl max-w-md w-full p-8 flex flex-col items-center text-center gap-5">
            {/* Green Check Circle */}
            <div className="size-14 rounded-full bg-[#E5F4F3] border border-[#009689] flex items-center justify-center text-[#009689]">
              <CheckIcon className="size-7" />
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-[#3D3D49] text-[16px]">
                Sale Created
              </h3>
              <p className="text-[11px] text-[#575765]">
                Invoice - <span className="font-medium text-[#FF611C]">INV-2039</span> created
              </p>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-semibold text-[#FF611C] text-[11px]">
                485 000 CFA</span>
              <span className="text-[11px] text-[#575765]">Walk-In Customer</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 w-full mt-3">
              <button
                type="button"
                onClick={() => router.push("/sales")}
                className="py-2.5 border border-[#EDEDED] rounded-[8px] font-medium text-[11px] text-[#575765] hover:text-[#3D3D49] hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="py-2.5 rounded-[8px] flex items-center justify-center gap-2 text-white font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
                style={{
                  background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                <PrinterIcon className="size-4 text-white" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
