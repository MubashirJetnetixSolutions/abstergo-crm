"use client";

import React, { useState } from "react";
import {
  CloseIcon,
  ChevronDownIcon,
  CheckmarkCircleIcon,
  InfoIcon,
} from "../icons/Icons";

interface AdjustStockDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  sku?: string;
}

export default function AdjustStockDrawer({
  isOpen,
  onClose,
  productName = "Dell Latitude 5440",
  sku = "DL-5440",
}: AdjustStockDrawerProps) {
  const [adjustmentType, setAdjustmentType] = useState("Increase Stock");
  const [quantity, setQuantity] = useState("120");
  const [reason, setReason] = useState("Readjusting the stock");
  const [warehouse, setWarehouse] = useState("Main Warehouse");
  const [notes, setNotes] = useState("kwame.mensah@mensahent.gh");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
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
        <div
          className="w-screen max-w-[500px] bg-white shadow-2xl flex flex-col justify-between border-l border-[#EDEDED] animate-slide-in-right overflow-y-auto"
          data-node-id="6429:28356"
        >
          {/* Top Header */}
          <div className="p-6 border-b border-[#EDEDED] flex items-center justify-between gap-4 shrink-0">
            <div className="flex flex-col">
              <h2 className="font-medium text-[#3D3D49] text-[11px] leading-tight">
                Adjust Stock
              </h2>
              <span className="text-[11px] text-[#575765] font-normal">
                {productName} ({sku})
              </span>
            </div>
            <button
              onClick={onClose}
              className="size-9 bg-neutral-100 hover:bg-neutral-200 text-[#575765] rounded-[6px] flex items-center justify-center transition-colors cursor-pointer"
            >
              <CloseIcon className="size-4" />
            </button>
          </div>

          {/* Drawer Body Content */}
          <form onSubmit={handleSubmit} className="flex-1 p-6 flex flex-col gap-6">
            {/* Top 3 Metric Stat Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[11px] text-[#575765] font-normal">
                  Current Stock
                </span>
                <span className="text-[11px] font-semibold text-[#0D79E4]">
                  408
                </span>
              </div>

              <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[11px] text-[#575765] font-normal">
                  Incoming
                </span>
                <span className="text-[11px] font-semibold text-[#FF611C]">
                  200
                </span>
              </div>

              <div className="bg-white border border-[#EDEDED] rounded-[8px] p-3.5 flex flex-col gap-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <span className="text-[11px] text-[#575765] font-normal">
                  Available
                </span>
                <span className="text-[11px] font-semibold text-[#009689]">
                  208
                </span>
              </div>
            </div>

            {/* Adjustment Details */}
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-[#575765] text-[11px]">
                Adjustment Details
              </h3>

              {/* Adjustment Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#575765] font-normal">
                  Adjustment Type
                </label>
                <div className="relative">
                  <select
                    value={adjustmentType}
                    onChange={(e) => setAdjustmentType(e.target.value)}
                    className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                  >
                    <option value="Increase Stock">Increase Stock</option>
                    <option value="Decrease Stock">Decrease Stock</option>
                    <option value="Damaged">Damaged</option>
                    <option value="Returned">Returned</option>
                  </select>
                  <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#575765] font-normal">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                />
              </div>

              {/* Reason */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#575765] font-normal">
                  Reason
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Reason for adjustment"
                  className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                />
              </div>

              {/* Select Warehouse */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#575765] font-normal">
                  Select Warehouse
                </label>
                <div className="relative">
                  <select
                    value={warehouse}
                    onChange={(e) => setWarehouse(e.target.value)}
                    className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                  >
                    <option value="Main Warehouse">Main Warehouse</option>
                    <option value="Secondary Warehouse">Secondary Warehouse</option>
                  </select>
                  <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="flex flex-col gap-4">
              <h3 className="font-medium text-[#575765] text-[11px]">
                Additional Details
              </h3>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] text-[#575765] font-normal">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] resize-none"
                />
              </div>

              {/* Warning Alert */}
              <div className="p-3.5 rounded-[8px] border border-[#FFD0B8] bg-[#FFF4EE] flex items-start gap-2.5">
                <InfoIcon className="size-4 text-[#FF611C] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#E04F0E] font-normal leading-relaxed">
                  Stock adjustments only update inventory quantities. They will not affect any Purchase Invoice, Sales Invoice, Order, Sale, or Payment records.
                </p>
              </div>
            </div>
          </form>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-[#EDEDED] bg-white flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#575765] hover:text-[#3D3D49] font-medium text-[11px] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-[8px] text-white font-medium text-[11px] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-2"
              style={{
                background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
              }}
            >
              <CheckmarkCircleIcon className="size-4 text-white" />
              <span>Adjust Stock</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
