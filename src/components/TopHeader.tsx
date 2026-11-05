"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BellIcon,
  SettingsIcon,
  SearchIcon,
  ChevronDownIcon,
  PlusCircleIcon,
  CustomersIcon,
  ProductsIcon,
  OrdersIcon,
  QuotationsIcon,
  PurchasesIcon,
  SalesIcon,
} from "./icons/Icons";

export default function TopHeader({ title = "Customers" }: { title?: string }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isDropdownOpen]);

  return (
    <header className="w-full pt-2 px-2 shrink-0">
      <div className="w-full h-[56px] bg-white border border-[#EDEDED] rounded-[6px] p-3 flex items-center justify-between gap-4">
        {/* Left Title & Welcome */}
        <div className="flex flex-col justify-center min-w-0">
          <span className="text-[#575765] opacity-80 text-[13px] font-normal leading-none mb-0.5">
            Hello, Michael
          </span>
          <h1 className="text-[#575765] text-[24px] font-medium leading-tight tracking-tight">
            {title}
          </h1>
        </div>

        {/* Center Search Bar */}
        <div className="w-[280px] max-w-full hidden md:block">
          <div className="w-full bg-white border border-[#EDEDED] rounded-[8px] px-3 py-2 flex items-center justify-between gap-3 focus-within:border-[#FF611C]/60 focus-within:ring-2 focus-within:ring-[#FF611C]/10 transition-all">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent border-none outline-none text-[#3D3D49] placeholder:text-[#3D3D49]/50 text-[11px] font-medium"
            />
            <SearchIcon className="size-[14px] text-[#575765]/70 shrink-0" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Create New Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] px-3 py-1.5 flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer h-[36px]"
            >
              <PlusCircleIcon className="size-4 text-[#575765]" />
              <span className="font-medium text-[11px] whitespace-nowrap">
                Create New
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] w-52 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg p-1.5 z-50 flex flex-col gap-0.5">
                <Link
                  href="/customers/new"
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-[#575765] hover:text-[#FF611C] hover:bg-[#FF611C]/5 rounded-[6px] transition-colors group"
                >
                  <CustomersIcon className="size-4 text-[#8C8C9A] group-hover:text-[#FF611C] transition-colors shrink-0" />
                  <span>Create Customer</span>
                </Link>
                <Link
                  href="/products/new"
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-[#575765] hover:text-[#FF611C] hover:bg-[#FF611C]/5 rounded-[6px] transition-colors group"
                >
                  <ProductsIcon className="size-4 text-[#8C8C9A] group-hover:text-[#FF611C] transition-colors shrink-0" />
                  <span>Create Product</span>
                </Link>
                <Link
                  href="/orders/new"
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-[#575765] hover:text-[#FF611C] hover:bg-[#FF611C]/5 rounded-[6px] transition-colors group"
                >
                  <OrdersIcon className="size-4 text-[#8C8C9A] group-hover:text-[#FF611C] transition-colors shrink-0" />
                  <span>Create Order</span>
                </Link>
                <Link
                  href="/quotations/new"
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-[#575765] hover:text-[#FF611C] hover:bg-[#FF611C]/5 rounded-[6px] transition-colors group"
                >
                  <QuotationsIcon className="size-4 text-[#8C8C9A] group-hover:text-[#FF611C] transition-colors shrink-0" />
                  <span>Create Quotation</span>
                </Link>
                <Link
                  href="/purchases/new"
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-[#575765] hover:text-[#FF611C] hover:bg-[#FF611C]/5 rounded-[6px] transition-colors group"
                >
                  <PurchasesIcon className="size-4 text-[#8C8C9A] group-hover:text-[#FF611C] transition-colors shrink-0" />
                  <span>Create Purchase</span>
                </Link>
                <Link
                  href="/sales/new"
                  onClick={() => setIsDropdownOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium text-[#575765] hover:text-[#FF611C] hover:bg-[#FF611C]/5 rounded-[6px] transition-colors group"
                >
                  <SalesIcon className="size-4 text-[#8C8C9A] group-hover:text-[#FF611C] transition-colors shrink-0" />
                  <span>Create Sale</span>
                </Link>
              </div>
            )}
          </div>

          {/* Notification Button */}
          <button
            aria-label="Notifications"
            className="size-[36px] bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer shrink-0"
          >
            <BellIcon className="size-4" />
          </button>

          {/* Settings Button */}
          <button
            aria-label="Settings"
            className="size-[36px] bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer shrink-0"
          >
            <SettingsIcon className="size-4" />
          </button>

          {/* User Profile Avatar with Chevron */}
          <div className="flex items-center gap-2 pl-1 cursor-pointer">
            <div className="size-8 rounded-[8px] overflow-hidden shrink-0 relative bg-neutral-100 border border-[#EDEDED]">
              <Image
                src="/avatar.jpg"
                alt="Michael Jos"
                width={32}
                height={32}
                className="size-full object-cover object-top"
              />
            </div>
            <ChevronDownIcon className="size-4 text-[#575765]" />
          </div>
        </div>
      </div>
    </header>
  );
}
