import React from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import ProductsStatCards from "@/components/products/ProductsStatCards";
import ProductsTable from "@/components/products/ProductsTable";
import { PlusCircleIcon } from "@/components/icons/Icons";

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Products" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-8 max-w-[1680px] w-full mx-auto">
          {/* Section Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight tracking-tight">
                Products
              </h1>
              <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                Invoices, payments, and revenue
              </p>
            </div>

            {/* Add New Product Button */}
            <Link
              href="/products/new"
              className="px-4 py-3 rounded-[8px] flex items-center gap-2 border border-white/20 text-white font-medium text-[11px] sm:text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
              style={{
                background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
              }}
            >
              <PlusCircleIcon className="size-5 text-white" />
              <span>Add New Product</span>
            </Link>
          </div>

          {/* 4 Stat Cards */}
          <ProductsStatCards />

          {/* Products Data Table */}
          <ProductsTable />
        </main>
      </div>
    </div>
  );
}
