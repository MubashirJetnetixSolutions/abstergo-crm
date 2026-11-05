"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import AdjustStockDrawer from "@/components/products/AdjustStockDrawer";
import {
  ChevronLeftIcon,
  EditIcon,
  MoreVerticalIcon,
  UploadIcon,
  FileIcon,
  ProductsIcon,
  InventoryIcon,
  PurchasesIcon,
  DeliveriesIcon,
  ExpenseIcon,
  OrdersIcon,
  QuotationsIcon,
  SettingsIcon,
  DeleteIcon,
} from "@/components/icons/Icons";

type ProductTabKey =
  | "Overview"
  | "Stock Movement"
  | "Price History"
  | "Purchases"
  | "Sales"
  | "Orders"
  | "Repairs"
  | "Images"
  | "Documents"
  | "Activity";

const TABS: ProductTabKey[] = [
  "Overview",
  "Stock Movement",
  "Price History",
  "Purchases",
  "Sales",
  "Orders",
  "Repairs",
  "Images",
  "Documents",
  "Activity",
];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const sku = (params?.id as string) || "DL-5440";
  const [activeTab, setActiveTab] = useState<ProductTabKey>("Overview");
  const [isAdjustStockOpen, setIsAdjustStockOpen] = useState(false);
  const [isProductActive, setIsProductActive] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Products" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* 1. Header & Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Link
                href="/products"
                className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] shrink-0"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight">
                    Dell Latitude 5440
                  </h1>
                  <span
                    className={`px-2 py-0.5 rounded-[6px] border ${
                      isProductActive
                        ? "border-[#009689] bg-[#E5F4F3] text-[#009689]"
                        : "border-[#8C8C9A] bg-neutral-100 text-[#575765]"
                    } text-[11px] font-normal leading-tight`}
                  >
                    {isProductActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-[14px] text-[#575765] font-normal">
                  Created on 19 Aug 2026 at 10:42 AM by{" "}
                  <span className="font-medium text-[#3D3D49]">Jean Martin</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              {/* Adjust Stock Button (Opens Side Drawer) */}
              <button
                type="button"
                onClick={() => setIsAdjustStockOpen(true)}
                className="h-11 px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] font-medium text-[11px] transition-colors cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <SettingsIcon className="size-4 text-[#575765]" />
                <span>Adjust Stock</span>
              </button>

              {/* Edit Product Button */}
              <Link
                href="/products/new"
                className="h-11 px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] font-medium text-[11px] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <EditIcon className="size-4 text-[#575765]" />
                <span>Edit Product</span>
              </Link>

              {/* More Actions Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  aria-label="More options"
                  className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
                >
                  <MoreVerticalIcon className="size-4" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1.5 z-40 w-36 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 flex flex-col text-left animate-in fade-in duration-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProductActive((prev) => !prev);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <span
                        className={`size-2 rounded-full ${
                          isProductActive ? "bg-amber-500" : "bg-[#009689]"
                        }`}
                      />
                      <span>{isProductActive ? "Deactivate" : "Activate"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        if (confirm("Are you sure you want to delete this product?")) {
                          router.push("/products");
                        }
                      }}
                      className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#F92424] hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <DeleteIcon className="size-3.5 text-[#F92424]" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. Top Summary Info Bar */}
          <div className="w-full bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">SKU</span>
              <span className="font-semibold text-[#2B2523] text-[11px]">
                {sku}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Category</span>
              <span className="font-normal text-[#2B2523] text-[11px]">
                Laptops
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Brand</span>
              <span className="font-normal text-[#2B2523] text-[11px]">
                Dell
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Warranty</span>
              <span className="font-normal text-[#2B2523] text-[11px]">
                12 Months
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[16px] text-[#575765] font-normal">Status</span>
              <div>
                <span className="inline-block px-2 py-0.5 rounded-[6px] border border-[#009689] bg-[#E5F4F3] text-[#009689] text-[11px] font-normal">
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* 3. Five Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">Stock</span>
              <span className="text-[16px] font-semibold text-[#2B2523] tracking-tight">
                6 500 000 CFA</span>
            </div>

            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">Available</span>
              <span className="text-[16px] font-semibold text-[#009689] tracking-tight">
                5 Units
              </span>
            </div>

            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">Cost Price</span>
              <span className="text-[16px] font-semibold text-[#2B2523] tracking-tight">
                520 000 CFA</span>
            </div>

            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2">
              <span className="text-[16px] text-[#575765] font-normal">Wholesaler Price</span>
              <span className="text-[16px] font-semibold text-[#2B2523] tracking-tight">
                650 000 CFA</span>
            </div>

            <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
              <span className="text-[16px] text-[#575765] font-normal">Reseller Price</span>
              <span className="text-[16px] font-semibold text-[#2B2523] tracking-tight">
                700 000 CFA</span>
            </div>
          </div>

          {/* 4. Tabs Navigation Bar */}
          <div className="border-b border-[#EDEDED] overflow-x-auto">
            <nav className="flex items-center gap-6 min-w-max">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-3 text-[16px] font-medium transition-colors border-b-2 relative cursor-pointer ${isActive
                      ? "text-[#FF611C] border-[#FF611C]"
                      : "text-[#575765] border-transparent hover:text-[#3D3D49]"
                      }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* 5. Active Tab Contents */}
          <div className="w-full">
            {activeTab === "Overview" && <ProductOverviewTab />}
            {activeTab === "Stock Movement" && <StockMovementTab />}
            {activeTab === "Price History" && <PriceHistoryTab />}
            {activeTab === "Purchases" && <PurchasesTab />}
            {activeTab === "Sales" && <SalesTab />}
            {activeTab === "Orders" && <OrdersTab />}
            {activeTab === "Repairs" && <RepairsTab />}
            {activeTab === "Images" && <ImagesTab />}
            {activeTab === "Documents" && <DocumentsTab />}
            {activeTab === "Activity" && <ActivityTab />}
          </div>
        </main>
      </div>

      {/* Adjust Stock Side Drawer Modal */}
      <AdjustStockDrawer
        isOpen={isAdjustStockOpen}
        onClose={() => setIsAdjustStockOpen(false)}
        productName="Dell Latitude 5440"
        sku={sku}
      />
    </div>
  );
}

/* =========================================================================
   TAB 1: Product Overview Tab
   ========================================================================= */
function ProductOverviewTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left 8 Cols: Product Info, Description, Pricing */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Product Information Card */}
        <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
          <h3 className="font-medium text-[#575765] text-[20px]">
            Product Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-[11px]">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Product Name:</span>
              <span className="font-normal text-[#3D3D49]">Dell Latitude 5440</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Category:</span>
              <span className="font-normal text-[#3D3D49]">Laptops</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Brand:</span>
              <span className="font-normal text-[#3D3D49]">Dell</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Subcategory:</span>
              <span className="font-normal text-[#3D3D49]">Business Laptops</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Model:</span>
              <span className="font-normal text-[#3D3D49]">Latitude 5440</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">Barcode:</span>
              <span className="font-normal text-[#3D3D49]">8901234567890</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-[#575765]">SKU:</span>
              <span className="font-normal text-[#3D3D49]">DL-5440</span>
            </div>
          </div>
        </div>

        {/* Product Description Card */}
        <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-3">
          <h3 className="font-medium text-[#575765] text-[20px]">
            Product Description
          </h3>
          <p className="text-[11px] text-[#575765] font-normal leading-relaxed">
            High-performance laptop designed for work, creativity, and everyday productivity. Features a 14-inch Full HD display, Intel Core i7 processor, 16GB RAM, 512GB SSD, Intel Iris Xe graphics, Wi-Fi 6, Bluetooth 5.2, and Windows 11. Slim, lightweight, and built for smooth multitasking and professional use.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
          <h3 className="font-medium text-[#575765] text-[20px]">Pricing</h3>
          <div className="flex flex-col divide-y divide-[#EDEDED] text-[11px]">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">Cost Price</span>
              <span className="text-[#3D3D49] font-medium">520 000 CFA</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">Wholesale Price</span>
              <span className="text-[#3D3D49] font-medium">650 000 CFA</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">Reseller Price</span>
              <span className="text-[#3D3D49] font-medium">620 000 CFA</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">Min. Selling Price</span>
              <span className="text-[#3D3D49] font-medium">590 000 CFA</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">Tax</span>
              <span className="text-[#3D3D49] font-medium">18%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right 4 Cols: Inventory Summary Card */}
      <div className="lg:col-span-4">
        <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4 sticky top-6">
          <h3 className="font-medium text-[#575765] text-[20px]">
            Inventory Summary
          </h3>

          <div className="flex flex-col divide-y divide-[#EDEDED] text-[11px]">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">Low Stock Threshold</span>
              <span className="text-[#3D3D49] font-medium">2</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">Min Stock</span>
              <span className="text-[#3D3D49] font-medium">0</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">Max Stock</span>
              <span className="text-[#3D3D49] font-medium">150</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">Incoming</span>
              <span className="text-[#FF611C] font-medium">5</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">In-Repair</span>
              <span className="text-[#3D3D49] font-medium">0</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">Current Stock</span>
              <span className="text-[#0D79E4] font-medium">5</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">Total Stock</span>
              <span className="text-[#009689] font-medium">10</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#575765]">Warehouse</span>
              <span className="text-[#3D3D49] font-medium">Main Warehouse</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 2: Stock Movement Tab (Exact Mockup 1)
   ========================================================================= */
function StockMovementTab() {
  const stockMovements = [
    {
      id: "1",
      date: "19 Aug 2026",
      ref: "SAL-1048",
      type: "Sale",
      qtyIn: "-",
      qtyOut: "+6",
      balance: "10",
      location: "Main Warehouse",
      user: "Joseph J. Martin",
      initials: "AS",
      reason: "Returned from customer",
    },
    {
      id: "2",
      date: "19 Aug 2026",
      ref: "SAL-1048",
      type: "Purchase",
      qtyIn: "+10",
      qtyOut: "-",
      balance: "10",
      location: "Main Warehouse",
      user: "Joseph J. Martin",
      initials: "AS",
      reason: "Returned from customer",
    },
    {
      id: "3",
      date: "19 Aug 2026",
      ref: "SAL-1048",
      type: "Sale",
      qtyIn: "-",
      qtyOut: "+6",
      balance: "10",
      location: "Main Warehouse",
      user: "Joseph J. Martin",
      initials: "AS",
      reason: "Returned from customer",
    },
    {
      id: "4",
      date: "19 Aug 2026",
      ref: "SAL-1048",
      type: "Purchase",
      qtyIn: "+10",
      qtyOut: "-",
      balance: "10",
      location: "Main Warehouse",
      user: "Joseph J. Martin",
      initials: "AS",
      reason: "Returned from customer",
    },
    {
      id: "5",
      date: "19 Aug 2026",
      ref: "SAL-1048",
      type: "Sale",
      qtyIn: "-",
      qtyOut: "+6",
      balance: "10",
      location: "Main Warehouse",
      user: "Joseph J. Martin",
      initials: "AS",
      reason: "Returned from customer",
    },
    {
      id: "6",
      date: "19 Aug 2026",
      ref: "SAL-1048",
      type: "Adjustment",
      qtyIn: "+10",
      qtyOut: "-",
      balance: "10",
      location: "Main Warehouse",
      user: "Joseph J. Martin",
      initials: "AS",
      reason: "Returned from customer",
    },
    {
      id: "7",
      date: "19 Aug 2026",
      ref: "SAL-1048",
      type: "Purchase",
      qtyIn: "-",
      qtyOut: "+6",
      balance: "10",
      location: "Main Warehouse",
      user: "Joseph J. Martin",
      initials: "AS",
      reason: "Returned from customer",
    },
    {
      id: "8",
      date: "19 Aug 2026",
      ref: "SAL-1048",
      type: "Adjustment",
      qtyIn: "+10",
      qtyOut: "-",
      balance: "10",
      location: "Main Warehouse",
      user: "Joseph J. Martin",
      initials: "AS",
      reason: "Returned from customer",
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#3D3D49] text-[20px]">Stock Movements</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-xs text-[#575765] font-medium">
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Reference</th>
              <th className="py-3 px-3">Type</th>
              <th className="py-3 px-3">Quantity In</th>
              <th className="py-3 px-3">Quantity Out</th>
              <th className="py-3 px-3">Balance</th>
              <th className="py-3 px-3">Location</th>
              <th className="py-3 px-3">User</th>
              <th className="py-3 px-3">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[13px] text-[#3D3D49]">
            {stockMovements.map((m) => (
              <tr key={m.id} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 whitespace-nowrap">{m.date}</td>
                <td className="py-3.5 px-3 font-medium text-[#FF611C] whitespace-nowrap">
                  {m.ref}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-[4px] border text-xs font-normal ${
                      m.type === "Purchase"
                        ? "bg-[#E7F2FC] border-[#C5E1FA] text-[#0D79E4]"
                        : m.type === "Sale"
                        ? "bg-[#F3EEFF] border-[#E3D4FF] text-[#8A58FF]"
                        : "bg-[#FFF6E5] border-[#FBE3B5] text-[#EDAC00]"
                    }`}
                  >
                    {m.type}
                  </span>
                </td>
                <td
                  className={`py-3.5 px-3 font-medium whitespace-nowrap ${
                    m.qtyIn.startsWith("+") ? "text-[#009689]" : "text-[#3D3D49]"
                  }`}
                >
                  {m.qtyIn}
                </td>
                <td
                  className={`py-3.5 px-3 font-medium whitespace-nowrap ${
                    m.qtyOut.startsWith("+") ? "text-[#F92424]" : "text-[#3D3D49]"
                  }`}
                >
                  {m.qtyOut}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">{m.balance}</td>
                <td className="py-3.5 px-3 text-[#575765] whitespace-nowrap">{m.location}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[10px] font-semibold flex items-center justify-center shrink-0">
                      {m.initials}
                    </span>
                    <span className="text-[#3D3D49]">{m.user}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 text-[#575765] whitespace-nowrap">{m.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 3: Price History Tab (Exact Mockup 2)
   ========================================================================= */
function PriceHistoryTab() {
  const priceHistoryList = [
    {
      id: "1",
      ref: "PUR-118",
      date: "19 Aug 2026",
      priceType: "Retail",
      prevPrice: "680 000 CFA",
      newPrice: "700 000 CFA",
      change: "+20 000 CFA",
      isPositive: true,
      reason: "Supplier Cost Increase",
      user: "Joseph J. Martin",
      initials: "AS",
    },
    {
      id: "2",
      ref: "PUR-118",
      date: "DL-5440",
      priceType: "Retail",
      prevPrice: "680 000 CFA",
      newPrice: "650 000 CFA",
      change: "+ 20 000 CFA",
      isPositive: true,
      reason: "1280 000 CFA",
      user: "Joseph J. Martin",
      initials: "AS",
    },
    {
      id: "3",
      ref: "PUR-118",
      date: "DL-5440",
      priceType: "Retail",
      prevPrice: "680 000 CFA",
      newPrice: "650 000 CFA",
      change: "- 20 000 CFA",
      isPositive: false,
      reason: "1280 000 CFA",
      user: "Joseph J. Martin",
      initials: "AS",
    },
    {
      id: "4",
      ref: "PUR-118",
      date: "DL-5440",
      priceType: "Retail",
      prevPrice: "680 000 CFA",
      newPrice: "650 000 CFA",
      change: "+ 20 000 CFA",
      isPositive: true,
      reason: "1280 000 CFA",
      user: "Joseph J. Martin",
      initials: "AS",
    },
    {
      id: "5",
      ref: "PUR-118",
      date: "DL-5440",
      priceType: "Retail",
      prevPrice: "680 000 CFA",
      newPrice: "650 000 CFA",
      change: "- 20 000 CFA",
      isPositive: false,
      reason: "1280 000 CFA",
      user: "Joseph J. Martin",
      initials: "AS",
    },
    {
      id: "6",
      ref: "PUR-118",
      date: "DL-5440",
      priceType: "Retail",
      prevPrice: "680 000 CFA",
      newPrice: "650 000 CFA",
      change: "- 20 000 CFA",
      isPositive: false,
      reason: "1280 000 CFA",
      user: "Joseph J. Martin",
      initials: "AS",
    },
    {
      id: "7",
      ref: "PUR-118",
      date: "DL-5440",
      priceType: "Retail",
      prevPrice: "680 000 CFA",
      newPrice: "650 000 CFA",
      change: "+ 20 000 CFA",
      isPositive: true,
      reason: "1280 000 CFA",
      user: "Joseph J. Martin",
      initials: "AS",
    },
    {
      id: "8",
      ref: "PUR-118",
      date: "DL-5440",
      priceType: "Retail",
      prevPrice: "680 000 CFA",
      newPrice: "650 000 CFA",
      change: "+ 20 000 CFA",
      isPositive: true,
      reason: "1280 000 CFA",
      user: "Joseph J. Martin",
      initials: "AS",
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#3D3D49] text-[20px]">Price History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-xs text-[#575765] font-medium">
              <th className="py-3 px-3">Reference</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Price Type</th>
              <th className="py-3 px-3">Previous Price</th>
              <th className="py-3 px-3">New Price</th>
              <th className="py-3 px-3">Change</th>
              <th className="py-3 px-3">Reason</th>
              <th className="py-3 px-3">Changed By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[13px] text-[#3D3D49]">
            {priceHistoryList.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C] whitespace-nowrap">
                  {p.ref}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">{p.date}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">{p.priceType}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">{p.prevPrice}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">{p.newPrice}</td>
                <td
                  className={`py-3.5 px-3 font-medium whitespace-nowrap ${
                    p.isPositive ? "text-[#009689]" : "text-[#F92424]"
                  }`}
                >
                  {p.change}
                </td>
                <td className="py-3.5 px-3 text-[#575765] whitespace-nowrap">{p.reason}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[10px] font-semibold flex items-center justify-center shrink-0">
                      {p.initials}
                    </span>
                    <span className="text-[#3D3D49]">{p.user}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 4: Purchases Tab (Exact Mockup 3)
   ========================================================================= */
function PurchasesTab() {
  const purchasesList = [
    {
      id: "1",
      purchaseNo: "PUR-118",
      date: "19 Aug 2026",
      supplier: "Dell Technologies EMEA",
      quantity: "5 Units",
      unitCost: "520 000 CFA",
      total: "2 600 000 50 CFA",
      received: "5 Units",
      pending: "2 Units",
      status: "Ordered",
    },
    {
      id: "2",
      purchaseNo: "PUR-117",
      date: "19 Aug 2026",
      supplier: "Dell Technologies EMEA",
      quantity: "10 Units",
      unitCost: "520 000 CFA",
      total: "5 200 000 CFA",
      received: "5 Units",
      pending: "2 Units",
      status: "Ordered",
    },
    {
      id: "3",
      purchaseNo: "PUR-116",
      date: "19 Aug 2026",
      supplier: "Dell Technologies EMEA",
      quantity: "5 Units",
      unitCost: "520 000 CFA",
      total: "2 600 000 50 CFA",
      received: "5 Units",
      pending: "2 Units",
      status: "Ordered",
    },
    {
      id: "4",
      purchaseNo: "PUR-115",
      date: "05 Aug 2026",
      supplier: "Dell Technologies EMEA",
      quantity: "10 Units",
      unitCost: "520 000 CFA",
      total: "5 200 000 CFA",
      received: "5 Units",
      pending: "2 Units",
      status: "Ordered",
    },
    {
      id: "5",
      purchaseNo: "PUR-114",
      date: "05 Aug 2026",
      supplier: "Dell Technologies EMEA",
      quantity: "5 Units",
      unitCost: "520 000 CFA",
      total: "2 600 000 50 CFA",
      received: "5 Units",
      pending: "2 Units",
      status: "Ordered",
    },
    {
      id: "6",
      purchaseNo: "PUR-113",
      date: "04 Aug 2026",
      supplier: "Dell Technologies EMEA",
      quantity: "10 Units",
      unitCost: "520 000 CFA",
      total: "5 200 000 CFA",
      received: "5 Units",
      pending: "2 Units",
      status: "Ordered",
    },
    {
      id: "7",
      purchaseNo: "PUR-112",
      date: "04 Aug 2026",
      supplier: "Dell Technologies EMEA",
      quantity: "5 Units",
      unitCost: "520 000 CFA",
      total: "2 600 000 50 CFA",
      received: "5 Units",
      pending: "2 Units",
      status: "Ordered",
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#3D3D49] text-[20px]">Purchase History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-xs text-[#575765] font-medium">
              <th className="py-3 px-3">Purchase#</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Supplier</th>
              <th className="py-3 px-3">Quantity</th>
              <th className="py-3 px-3">Unit Cost</th>
              <th className="py-3 px-3">Total</th>
              <th className="py-3 px-3">Received</th>
              <th className="py-3 px-3">Pending</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[13px] text-[#3D3D49]">
            {purchasesList.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C] whitespace-nowrap">
                  {p.purchaseNo}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">{p.date}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">{p.supplier}</td>
                <td className="py-3.5 px-3 font-medium whitespace-nowrap">{p.quantity}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">{p.unitCost}</td>
                <td className="py-3.5 px-3 font-medium whitespace-nowrap">{p.total}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">{p.received}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">{p.pending}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span className="inline-block px-2.5 py-0.5 rounded-[4px] border border-[#C5E1FA] bg-[#E7F2FC] text-[#0D79E4] text-xs font-normal">
                    {p.status}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right whitespace-nowrap">
                  <button
                    type="button"
                    className="size-8 rounded-[6px] hover:bg-neutral-100 inline-flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition cursor-pointer"
                  >
                    <MoreVerticalIcon className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 5: Sales Tab (Exact Mockup 4)
   ========================================================================= */
function SalesTab() {
  const salesList = [
    {
      id: "1",
      saleNo: "SAL-1048",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      items: "5 Units",
      unitPrice: "520 000 CFA",
      discount: "0 CFA",
      total: "2 600 000 50 CFA",
      payment: "Paid",
      delivery: "Delivered",
    },
    {
      id: "2",
      saleNo: "SAL-1048",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      items: "5 Units",
      unitPrice: "520 000 CFA",
      discount: "0 CFA",
      total: "2 600 000 50 CFA",
      payment: "Pending",
      delivery: "Pending",
    },
    {
      id: "3",
      saleNo: "SAL-1048",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      items: "5 Units",
      unitPrice: "520 000 CFA",
      discount: "0 CFA",
      total: "2 600 000 50 CFA",
      payment: "Overdue",
      delivery: "Overdue",
    },
    {
      id: "4",
      saleNo: "SAL-1048",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      items: "5 Units",
      unitPrice: "520 000 CFA",
      discount: "0 CFA",
      total: "2 600 000 50 CFA",
      payment: "Overdue",
      delivery: "Overdue",
    },
    {
      id: "5",
      saleNo: "SAL-1048",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      items: "5 Units",
      unitPrice: "520 000 CFA",
      discount: "0 CFA",
      total: "2 600 000 50 CFA",
      payment: "Pending",
      delivery: "Pending",
    },
    {
      id: "6",
      saleNo: "SAL-1048",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      items: "5 Units",
      unitPrice: "520 000 CFA",
      discount: "0 CFA",
      total: "2 600 000 50 CFA",
      payment: "Partial",
      delivery: "Partial",
    },
    {
      id: "7",
      saleNo: "SAL-1048",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      items: "5 Units",
      unitPrice: "520 000 CFA",
      discount: "0 CFA",
      total: "2 600 000 50 CFA",
      payment: "Partial",
      delivery: "Partial",
    },
    {
      id: "8",
      saleNo: "SAL-1048",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      items: "5 Units",
      unitPrice: "520 000 CFA",
      discount: "0 CFA",
      total: "2 600 000 50 CFA",
      payment: "Paid",
      delivery: "Delivered",
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#3D3D49] text-[20px]">Sales History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-xs text-[#575765] font-medium">
              <th className="py-3 px-3">Sale#</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Items</th>
              <th className="py-3 px-3">Unit Price</th>
              <th className="py-3 px-3">Discount</th>
              <th className="py-3 px-3">Total</th>
              <th className="py-3 px-3">Payment</th>
              <th className="py-3 px-3">Delivery</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[13px] text-[#3D3D49]">
            {salesList.map((s) => (
              <tr key={s.id} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C] whitespace-nowrap">
                  {s.saleNo}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">{s.date}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-[#E5F4F3] text-[#009689] text-[10px] font-semibold flex items-center justify-center shrink-0">
                      {s.initials}
                    </span>
                    <span className="text-[#3D3D49]">{s.customer}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">{s.items}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">{s.unitPrice}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">{s.discount}</td>
                <td className="py-3.5 px-3 font-medium whitespace-nowrap">{s.total}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-[4px] border text-xs font-normal ${
                      s.payment === "Paid"
                        ? "bg-[#E5F4F3] border-[#BDE5E2] text-[#009689]"
                        : s.payment === "Pending"
                        ? "bg-[#E7F2FC] border-[#C5E1FA] text-[#0D79E4]"
                        : s.payment === "Overdue"
                        ? "bg-[#FEE9E9] border-[#FCC8C8] text-[#F92424]"
                        : "bg-[#FFF6E5] border-[#FBE3B5] text-[#EDAC00]"
                    }`}
                  >
                    {s.payment}
                  </span>
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-[4px] border text-xs font-normal ${
                      s.delivery === "Delivered"
                        ? "bg-[#E5F4F3] border-[#BDE5E2] text-[#009689]"
                        : s.delivery === "Pending"
                        ? "bg-[#E7F2FC] border-[#C5E1FA] text-[#0D79E4]"
                        : s.delivery === "Overdue"
                        ? "bg-[#FEE9E9] border-[#FCC8C8] text-[#F92424]"
                        : "bg-[#FFF6E5] border-[#FBE3B5] text-[#EDAC00]"
                    }`}
                  >
                    {s.delivery}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right whitespace-nowrap">
                  <button
                    type="button"
                    className="size-8 rounded-[6px] hover:bg-neutral-100 inline-flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition cursor-pointer"
                  >
                    <MoreVerticalIcon className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 6: Orders Tab (Exact Mockup 5)
   ========================================================================= */
function OrdersTab() {
  const ordersList = [
    {
      id: "1",
      orderNo: "ORD-1024",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      ordered: "10",
      available: "5",
      purchased: "5",
      delivered: "5",
      remaining: "5",
      total: "6 500 000 CFA",
      status: "Pending Stock",
    },
    {
      id: "2",
      orderNo: "ORD-1024",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      ordered: "10",
      available: "5",
      purchased: "5",
      delivered: "5",
      remaining: "5",
      total: "6 500 000 CFA",
      status: "In-progress",
    },
    {
      id: "3",
      orderNo: "ORD-1024",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      ordered: "10",
      available: "5",
      purchased: "5",
      delivered: "5",
      remaining: "5",
      total: "6 500 000 CFA",
      status: "In-progress",
    },
    {
      id: "4",
      orderNo: "ORD-1024",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      ordered: "10",
      available: "5",
      purchased: "5",
      delivered: "5",
      remaining: "5",
      total: "6 500 000 CFA",
      status: "Pending Stock",
    },
    {
      id: "5",
      orderNo: "ORD-1024",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      ordered: "10",
      available: "5",
      purchased: "5",
      delivered: "5",
      remaining: "5",
      total: "6 500 000 CFA",
      status: "Completed",
    },
    {
      id: "6",
      orderNo: "ORD-1024",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      ordered: "10",
      available: "5",
      purchased: "5",
      delivered: "5",
      remaining: "5",
      total: "6 500 000 CFA",
      status: "Completed",
    },
    {
      id: "7",
      orderNo: "ORD-1024",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      ordered: "10",
      available: "5",
      purchased: "5",
      delivered: "5",
      remaining: "5",
      total: "6 500 000 CFA",
      status: "Completed",
    },
    {
      id: "8",
      orderNo: "ORD-1024",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      initials: "AB",
      ordered: "10",
      available: "5",
      purchased: "5",
      delivered: "5",
      remaining: "5",
      total: "6 500 000 CFA",
      status: "Pending Stock",
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#3D3D49] text-[20px]">Order History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-xs text-[#575765] font-medium">
              <th className="py-3 px-3">Order#</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Ordered</th>
              <th className="py-3 px-3">Available</th>
              <th className="py-3 px-3">Purchased</th>
              <th className="py-3 px-3">Delivered</th>
              <th className="py-3 px-3">Remaining</th>
              <th className="py-3 px-3">Total</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[13px] text-[#3D3D49]">
            {ordersList.map((o) => (
              <tr key={o.id} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C] whitespace-nowrap">
                  {o.orderNo}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">{o.date}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-[#E5F4F3] text-[#009689] text-[10px] font-semibold flex items-center justify-center shrink-0">
                      {o.initials}
                    </span>
                    <span className="text-[#3D3D49]">{o.customer}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">{o.ordered}</td>
                <td className="py-3.5 px-3 text-[#009689] font-medium whitespace-nowrap">
                  {o.available}
                </td>
                <td className="py-3.5 px-3 text-[#8A58FF] font-medium whitespace-nowrap">
                  {o.purchased}
                </td>
                <td className="py-3.5 px-3 text-[#0D79E4] font-medium whitespace-nowrap">
                  {o.delivered}
                </td>
                <td className="py-3.5 px-3 text-[#F92424] font-medium whitespace-nowrap">
                  {o.remaining}
                </td>
                <td className="py-3.5 px-3 font-medium whitespace-nowrap">{o.total}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-[4px] border text-xs font-normal ${
                      o.status === "Completed"
                        ? "bg-[#E5F4F3] border-[#BDE5E2] text-[#009689]"
                        : o.status === "In-progress"
                        ? "bg-[#F3EEFF] border-[#E3D4FF] text-[#8A58FF]"
                        : "bg-[#FFEFE8] border-[#FFD0B8] text-[#FF611C]"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right whitespace-nowrap">
                  <button
                    type="button"
                    className="size-8 rounded-[6px] hover:bg-neutral-100 inline-flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition cursor-pointer"
                  >
                    <MoreVerticalIcon className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 7: Repairs Tab (Exact Mockup 1)
   ========================================================================= */
function RepairsTab() {
  const repairsList = [
    {
      id: "1",
      repairNo: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      customerInitials: "AB",
      serialImei: "DL5440-23881",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      techInitials: "MC",
      cost: "6 500 000 CFA",
      status: "Received",
      statusType: "received",
    },
    {
      id: "2",
      repairNo: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      customerInitials: "AB",
      serialImei: "DL5440-23881",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      techInitials: "MC",
      cost: "6 500 000 CFA",
      status: "In-Repair",
      statusType: "in-repair-yellow",
    },
    {
      id: "3",
      repairNo: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      customerInitials: "AB",
      serialImei: "DL5440-23881",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      techInitials: "MC",
      cost: "6 500 000 CFA",
      status: "In-Repair",
      statusType: "in-repair-purple",
    },
    {
      id: "4",
      repairNo: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      customerInitials: "AB",
      serialImei: "DL5440-23881",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      techInitials: "MC",
      cost: "6 500 000 CFA",
      status: "Irreparable",
      statusType: "irreparable",
    },
    {
      id: "5",
      repairNo: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      customerInitials: "AB",
      serialImei: "DL5440-23881",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      techInitials: "MC",
      cost: "6 500 000 CFA",
      status: "Draft",
      statusType: "draft",
    },
    {
      id: "6",
      repairNo: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      customerInitials: "AB",
      serialImei: "DL5440-23881",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      techInitials: "MC",
      cost: "6 500 000 CFA",
      status: "In-Repair",
      statusType: "in-repair-purple",
    },
    {
      id: "7",
      repairNo: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      customerInitials: "AB",
      serialImei: "DL5440-23881",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      techInitials: "MC",
      cost: "6 500 000 CFA",
      status: "Received",
      statusType: "received",
    },
    {
      id: "8",
      repairNo: "REP-0234",
      date: "19 Aug 2026",
      customer: "ABC Technologies",
      customerInitials: "AB",
      serialImei: "DL5440-23881",
      issue: "Display Issue",
      technician: "Marie Coulibaly",
      techInitials: "MC",
      cost: "6 500 000 CFA",
      status: "Completed",
      statusType: "completed",
    },
  ];

  const getStatusBadge = (status: string, type: string) => {
    switch (type) {
      case "completed":
        return "bg-[#E5F4F3] border-[#BDE5E2] text-[#009689]";
      case "received":
        return "bg-[#E7F2FC] border-[#C5E1FA] text-[#0D79E4]";
      case "in-repair-yellow":
        return "bg-[#FFF6E5] border-[#FBE3B5] text-[#EDAC00]";
      case "in-repair-purple":
        return "bg-[#F3EEFF] border-[#E3D4FF] text-[#8A58FF]";
      case "irreparable":
        return "bg-[#FEE9E9] border-[#FCC8C8] text-[#F92424]";
      case "draft":
        return "bg-[#F1F2F4] border-[#EDEDED] text-[#575765]";
      default:
        return "bg-[#F1F2F4] border-[#EDEDED] text-[#575765]";
    }
  };

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
      <h3 className="font-medium text-[#3D3D49] text-[20px]">Repair History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="border-b border-[#EDEDED] text-xs text-[#575765] font-medium">
              <th className="py-3 px-3">Repair#</th>
              <th className="py-3 px-3">Date</th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Issue</th>
              <th className="py-3 px-3">Technician</th>
              <th className="py-3 px-3">Cost</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDEDED] text-[13px] text-[#3D3D49]">
            {repairsList.map((r) => (
              <tr key={r.id} className="hover:bg-neutral-50/70 transition-colors">
                <td className="py-3.5 px-3 font-medium text-[#FF611C] whitespace-nowrap">
                  {r.repairNo}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">{r.date}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-[#E5F4F3] text-[#009689] text-[10px] font-semibold flex items-center justify-center shrink-0">
                      {r.customerInitials}
                    </span>
                    <span className="text-[#3D3D49]">{r.customer}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">{r.issue}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-[#FFEFE8] text-[#FF611C] text-[10px] font-semibold flex items-center justify-center shrink-0">
                      {r.techInitials}
                    </span>
                    <span className="text-[#3D3D49]">{r.technician}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap font-medium">{r.cost}</td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-[4px] border text-xs font-normal ${getStatusBadge(
                      r.status,
                      r.statusType
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right whitespace-nowrap">
                  <button
                    type="button"
                    className="size-8 rounded-[6px] hover:bg-neutral-100 inline-flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition cursor-pointer"
                  >
                    <MoreVerticalIcon className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 8: Images Tab (Exact Mockup 2)
   ========================================================================= */
interface MockupProductImage {
  id: string;
  url?: string;
}

function PhoneIllustration() {
  return (
    <svg
      viewBox="0 0 160 140"
      className="w-full h-full object-contain p-2 select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="screenGlow" cx="60%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#FFF2A8" />
          <stop offset="35%" stopColor="#C9AC3C" />
          <stop offset="70%" stopColor="#3F3765" />
          <stop offset="100%" stopColor="#1E1933" />
        </radialGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A4F5D" />
          <stop offset="100%" stopColor="#2E333F" />
        </linearGradient>
        <linearGradient id="lensRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6C7282" />
          <stop offset="100%" stopColor="#1A1C24" />
        </linearGradient>
      </defs>

      {/* Back Phone (Left) */}
      <g transform="translate(18, 12)">
        {/* Phone Body */}
        <rect
          x="0"
          y="0"
          width="56"
          height="112"
          rx="10"
          fill="url(#bodyGrad)"
          stroke="#1E2028"
          strokeWidth="1.5"
        />
        {/* Camera 1 */}
        <circle cx="12" cy="18" r="6" fill="#121318" stroke="url(#lensRing)" strokeWidth="1.2" />
        <circle cx="12" cy="18" r="3.2" fill="#050608" />
        <circle cx="10.8" cy="16.8" r="1.2" fill="#FFFFFF" fillOpacity="0.4" />

        {/* Camera 2 */}
        <circle cx="12" cy="34" r="6" fill="#121318" stroke="url(#lensRing)" strokeWidth="1.2" />
        <circle cx="12" cy="34" r="3.2" fill="#050608" />
        <circle cx="10.8" cy="32.8" r="1.2" fill="#FFFFFF" fillOpacity="0.4" />

        {/* Camera 3 */}
        <circle cx="12" cy="50" r="6" fill="#121318" stroke="url(#lensRing)" strokeWidth="1.2" />
        <circle cx="12" cy="50" r="3.2" fill="#050608" />
        <circle cx="10.8" cy="48.8" r="1.2" fill="#FFFFFF" fillOpacity="0.4" />

        {/* Flash */}
        <circle cx="24" cy="26" r="2.2" fill="#FFFFFF" fillOpacity="0.8" stroke="#3A3E4B" strokeWidth="0.8" />

        {/* Subtle Samsung text watermark */}
        <text
          x="28"
          y="98"
          fontSize="4.5"
          textAnchor="middle"
          fill="#6B7280"
          fillOpacity="0.4"
          fontFamily="sans-serif"
          fontWeight="600"
          letterSpacing="0.5"
        >
          SAMSUNG
        </text>
      </g>

      {/* Front Phone (Right) */}
      <g transform="translate(74, 12)">
        {/* Phone Outer Bezel */}
        <rect
          x="0"
          y="0"
          width="56"
          height="112"
          rx="10"
          fill="#0D0E12"
          stroke="#3A3E4B"
          strokeWidth="1.2"
        />
        {/* Screen with Wallpaper */}
        <rect
          x="2.5"
          y="2.5"
          width="51"
          height="107"
          rx="8"
          fill="url(#screenGlow)"
        />
        {/* Dark nebula orb overlay */}
        <ellipse cx="26" cy="56" rx="20" ry="24" fill="#E8C858" fillOpacity="0.85" />
        <circle cx="18" cy="62" r="18" fill="#201C34" fillOpacity="0.9" />

        {/* Hole Punch Front Camera */}
        <circle cx="28" cy="7" r="1.8" fill="#000000" stroke="#1F222E" strokeWidth="0.6" />
        <circle cx="27.5" cy="6.5" r="0.5" fill="#FFFFFF" fillOpacity="0.5" />
      </g>
    </svg>
  );
}

function ImagesTab() {
  const [imagesList, setImagesList] = useState<MockupProductImage[]>([
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
  ]);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleUploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const newImgs: MockupProductImage[] = Array.from(e.target.files).map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      url: URL.createObjectURL(file),
    }));
    setImagesList((prev) => [...prev, ...newImgs]);
  };

  const handleDeleteImage = (id: string) => {
    setImagesList((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
      {/* Top Header Row with Upload Images Button */}
      <div className="flex items-center justify-end">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleUploadFiles}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="h-10 px-4 bg-[#2C2D35] hover:bg-[#3D3E4A] text-white rounded-[8px] flex items-center gap-2 text-[13px] font-medium transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.06)] cursor-pointer"
        >
          <div className="size-4 rounded-full border border-white/80 flex items-center justify-center">
            <svg
              className="size-2.5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
          <span>Upload Images</span>
        </button>
      </div>

      {/* Grid of Product Image Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {imagesList.map((item) => (
          <div
            key={item.id}
            className="relative bg-[#E5E6EA] rounded-[10px] p-2 aspect-[4/3] flex items-center justify-center group overflow-hidden border border-[#DFE0E5]"
          >
            {/* Delete Trash Button */}
            <button
              type="button"
              onClick={() => handleDeleteImage(item.id)}
              className="absolute top-2 right-2 size-6 rounded-[4px] bg-white border border-[#EDEDED] flex items-center justify-center text-[#F92424] hover:bg-[#FEE9E9] transition-colors shadow-xs z-10 cursor-pointer"
              title="Delete Image"
            >
              <svg
                className="size-3.5 text-[#F92424]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>

            {/* Display Image or Illustration */}
            {item.url ? (
              <img
                src={item.url}
                alt="Product Preview"
                className="w-full h-full object-contain select-none"
              />
            ) : (
              <PhoneIllustration />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 9: Documents Tab
   ========================================================================= */
interface ProductDoc {
  id: string;
  name: string;
  type: string;
  size: string;
}

const INITIAL_DOCS: ProductDoc[] = [
  {
    id: "1",
    name: "Dell Latitude 5440 Datasheet.pdf",
    type: "PDF document",
    size: "2.5mb",
  },
  {
    id: "2",
    name: "Dell Latitude 5440 User Manual.pdf",
    type: "PDF document",
    size: "4.1mb",
  },
];

function DocumentsTab() {
  const [docs, setDocs] = useState<ProductDoc[]>(INITIAL_DOCS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newDocs: ProductDoc[] = Array.from(files).map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      name: file.name,
      type: file.type.includes("pdf")
        ? "PDF document"
        : file.type.includes("image")
        ? "Image file"
        : "Document file",
      size: `${(file.size / (1024 * 1024)).toFixed(1)}mb`,
    }));

    setDocs((prev) => [...prev, ...newDocs]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-medium text-[#575765] text-[11px]">Documents</h3>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          multiple
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2.5 rounded-[8px] flex items-center gap-2 text-white font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
          style={{
            background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
          }}
        >
          <UploadIcon className="size-4 text-white" />
          <span>Upload Files</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="border border-[#EDEDED] rounded-[10px] p-4 flex items-center justify-between gap-3 hover:bg-neutral-50/50 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="size-10 rounded-[8px] bg-[#FFEFE8] flex items-center justify-center shrink-0">
                <FileIcon className="size-5 text-[#FF611C]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                  {doc.name}
                </span>
                <span className="text-[11px] text-[#575765] font-normal">
                  {doc.type} · {doc.size}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleDelete(doc.id)}
                className="px-2.5 py-1 text-[11px] font-normal text-[#575765] hover:text-[#F92424] transition-colors cursor-pointer"
              >
                Delete
              </button>
              <button
                type="button"
                className="px-2.5 py-1 text-[11px] font-normal text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
              >
                View
              </button>
              <button
                type="button"
                className="px-3 py-1.5 rounded-[6px] text-white text-[11px] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
                style={{
                  background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                }}
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   TAB 10: Activity Tab
   ========================================================================= */
function ActivityTab() {
  const activities = [
    {
      title: "Stock adjusted: +120 units added",
      author: "Jean Martin",
      time: "2 min ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#E5F4F3] text-[#009689]",
      icon: InventoryIcon,
    },
    {
      title: "Price revision updated to 700,000 CFA",
      author: "Admin",
      time: "1 hour ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#FFEFE8] text-[#FF611C]",
      icon: ExpenseIcon,
    },
    {
      title: "Purchase PUR-118 recorded for 5 units",
      author: "Jean Martin",
      time: "3 hours ago",
      date: "19 Aug 2026",
      badgeColor: "bg-[#E7F2FC] text-[#0D79E4]",
      icon: PurchasesIcon,
    },
  ];

  return (
    <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6 max-w-3xl">
      <div className="flex flex-col divide-y divide-[#EDEDED]">
        {activities.map((act, idx) => {
          const IconComp = act.icon;
          return (
            <div key={idx} className="py-4 flex items-start justify-between gap-4 first:pt-0 last:pb-0">
              <div className="flex items-start gap-3.5">
                <div
                  className={`size-9 rounded-full flex items-center justify-center shrink-0 ${act.badgeColor}`}
                >
                  <IconComp className="size-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[#3D3D49] text-[11px]">
                    {act.title}
                  </span>
                  <span className="text-[11px] text-[#575765] font-normal">
                    {act.author}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end text-right shrink-0">
                <span className="text-[11px] text-[#575765] font-normal">
                  {act.time}
                </span>
                <span className="text-[11px] text-[#575765] opacity-70">
                  {act.date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
