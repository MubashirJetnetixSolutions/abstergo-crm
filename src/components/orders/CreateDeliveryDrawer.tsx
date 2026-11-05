"use client";

import React, { useState } from "react";
import {
  CloseIcon,
  ChevronDownIcon,
  CheckmarkCircleIcon,
  CalendarIcon,
  ProductsIcon,
} from "../icons/Icons";

interface CreateDeliveryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orderCode?: string;
  totalItems?: number | string;
  receivedItems?: number | string;
  pendingItems?: number | string;
}

export default function CreateDeliveryDrawer({
  isOpen,
  onClose,
  orderCode = "ORD-1024",
  totalItems = 20,
  receivedItems = 2,
  pendingItems = 20,
}: CreateDeliveryDrawerProps) {
  const [deliveryDate, setDeliveryDate] = useState("2026-09-09");
  const [deliveredBy, setDeliveredBy] = useState("Yaw Darko");
  const [deliveryAddress, setDeliveryAddress] = useState("14 Ring Road Central, Accra");
  const [reference, setReference] = useState(orderCode);
  const [itemQuantities, setItemQuantities] = useState<{ [key: string]: number }>({
    item1: 16,
    item2: 16,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  const handleQtyChange = (key: string, val: number) => {
    setItemQuantities((prev) => ({
      ...prev,
      [key]: Math.max(0, Math.min(20, val)),
    }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity animate-fade-in"
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-[480px] bg-white shadow-2xl flex flex-col justify-between border-l border-[#EDEDED] animate-slide-in-right overflow-y-auto">
          {/* Top Header */}
          <div className="p-6 border-b border-[#EDEDED] flex items-center justify-between gap-4 shrink-0">
            <h2 className="font-semibold text-[#2B2523] text-[16px] leading-tight">
              Create Delivery
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="size-8 hover:bg-neutral-100 text-[#575765] hover:text-[#2B2523] rounded-[6px] flex items-center justify-center transition-colors cursor-pointer"
            >
              <CloseIcon className="size-4" />
            </button>
          </div>

          {/* Drawer Body Content */}
          <form onSubmit={handleSubmit} className="flex-1 p-6 flex flex-col gap-6">
            {/* Top 3 Metric Stat Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[12px] text-[#575765] font-normal">
                  Total Items
                </span>
                <span className="text-[14px] sm:text-[15px] font-semibold text-[#0D79E4] tracking-tight">
                  {totalItems}
                </span>
              </div>

              <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[12px] text-[#575765] font-normal">
                  Received
                </span>
                <span className="text-[14px] sm:text-[15px] font-semibold text-[#009689] tracking-tight">
                  {receivedItems}
                </span>
              </div>

              <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[12px] text-[#575765] font-normal">
                  Pending
                </span>
                <span className="text-[14px] sm:text-[15px] font-semibold text-[#F92424] tracking-tight">
                  {pendingItems}
                </span>
              </div>
            </div>

            {/* Delivery Details Form */}
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-[#2B2523] text-[14px]">
                Delivery Details
              </h3>

              {/* Delivery Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] text-[#575765] font-normal">
                  Delivery Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C] pr-10"
                  />
                  <CalendarIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Delivered By */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] text-[#575765] font-normal">
                  Delivered By
                </label>
                <div className="relative">
                  <div className="w-full h-11 px-4 py-2 bg-white border border-[#EDEDED] rounded-[8px] flex items-center justify-between cursor-pointer focus-within:border-[#FF611C]">
                    <div className="flex items-center gap-2.5">
                      <div className="size-6 rounded-full bg-[#F3EEFF] text-[#8A58FF] text-[11px] font-medium flex items-center justify-center">
                        YD
                      </div>
                      <span className="text-[13px] text-[#2B2523] font-medium">
                        {deliveredBy}
                      </span>
                    </div>
                    <ChevronDownIcon className="size-4 text-[#575765]" />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] text-[#575765] font-normal">
                  Delivery Address *
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C]"
                />
              </div>

              {/* Reference */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] text-[#575765] font-normal">
                  Reference
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  className="w-full h-11 px-4 py-2.5 bg-[#F9F9FB] border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] font-normal focus:outline-none focus:border-[#FF611C]"
                />
              </div>
            </div>

            {/* Delivery Items */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-[#2B2523] text-[14px]">
                Delivery Items
              </h3>

              {/* Item Card 1 */}
              <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-3 bg-white shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-[6px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center shrink-0 text-[#575765]">
                    <ProductsIcon className="size-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-[#2B2523] text-[13px] truncate">
                      Dell Latitude 5440
                    </span>
                    <span className="text-[11px] text-[#575765]">DL-5440</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] text-[#575765]">
                    Deliver Quantity
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={itemQuantities.item1}
                      onChange={(e) =>
                        handleQtyChange("item1", parseInt(e.target.value) || 0)
                      }
                      className="w-full h-10 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>
                  <span className="text-[11px] text-[#575765]">Max 20</span>
                </div>
              </div>

              {/* Item Card 2 */}
              <div className="border border-[#EDEDED] rounded-[10px] p-4 flex flex-col gap-3 bg-white shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-[6px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center shrink-0 text-[#575765]">
                    <ProductsIcon className="size-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-medium text-[#2B2523] text-[13px] truncate">
                      Dell Latitude 5440
                    </span>
                    <span className="text-[11px] text-[#575765]">DL-5440</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] text-[#575765]">
                    Deliver Quantity
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={0}
                      max={20}
                      value={itemQuantities.item2}
                      onChange={(e) =>
                        handleQtyChange("item2", parseInt(e.target.value) || 0)
                      }
                      className="w-full h-10 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#2B2523] focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>
                  <span className="text-[11px] text-[#575765]">Max 20</span>
                </div>
              </div>
            </div>
          </form>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-[#EDEDED] bg-white flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#2B2523] font-medium text-[13px] transition-colors cursor-pointer shadow-sm"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 h-11 rounded-[8px] text-white font-medium text-[13px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
              }}
            >
              <CheckmarkCircleIcon className="size-4 text-white" />
              <span>Receive Stock</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
