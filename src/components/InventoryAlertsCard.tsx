"use client";

import React from "react";
import { ExternalLinkIcon } from "./icons/Icons";

interface InventoryItem {
  sno: string;
  name: string;
  code: string;
  stock: string;
  status: "Out of stock" | "Low stock" | "In-stock";
}

const inventoryList: InventoryItem[] = [
  {
    sno: "#1",
    name: "Dell Latitude 5440",
    code: "DL-5440",
    stock: "3 Items",
    status: "Out of stock",
  },
  {
    sno: "#2",
    name: "HP ProBook 450 G10",
    code: "HP-PB450",
    stock: "3 Items",
    status: "Out of stock",
  },
  {
    sno: "#3",
    name: "Logitech MX Keys Keyboard",
    code: "LG-MXK",
    stock: "8 Items",
    status: "Low stock",
  },
  {
    sno: "#4",
    name: "USB-C 65W Charger",
    code: "USB-65W",
    stock: "22 Items",
    status: "In-stock",
  },
  {
    sno: "#5",
    name: "Lenovo ThinkPad E14",
    code: "LN-E14",
    stock: "8 Items",
    status: "Low stock",
  },
  {
    sno: "#6",
    name: "Dell Latitude 5440",
    code: "DL-5440",
    stock: "24 Items",
    status: "In-stock",
  },
];

export default function InventoryAlertsCard() {
  return (
    <div
      className="bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-full"
      data-node-id="6043:1426"
    >
      {/* Header */}
      <div className="min-h-[52px] px-4 py-3 border-b border-[#EDEDED] flex items-center justify-between gap-4 shrink-0">
        <h3 className="font-medium text-[#575765] text-[20px]">
          Inventory Alerts
        </h3>
        <button className="bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] px-2.5 py-1.5 flex items-center gap-1 text-[#575765] text-[11px] font-medium transition-colors cursor-pointer">
          <ExternalLinkIcon className="size-4 text-[#575765]" />
          <span>View Products</span>
        </button>
      </div>

      {/* Summary */}
      <div className="p-4 border-b border-[#EDEDED]">
        <div className="flex flex-col gap-1">
          <span className="font-normal text-[#575765] text-[11px]">
            Total Inventory
          </span>
          <span className="font-medium text-[#3D3D49] text-[11px]">
            48 Products
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="p-4 flex flex-col gap-4 overflow-y-auto">
        {/* Table Column Headers */}
        <div className="flex items-center text-[11px] font-normal text-[#575765] px-1">
          <span className="w-10 shrink-0">S.no</span>
          <span className="flex-1 min-w-0">Product</span>
          <span className="w-20 shrink-0">Stock</span>
          <span className="w-[100px] shrink-0 text-right">Status</span>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-3.5">
          {inventoryList.map((item, idx) => {
            const isOutOfStock = item.status === "Out of stock";
            const isLowStock = item.status === "Low stock";

            return (
              <div
                key={idx}
                className="flex items-center text-[11px] px-1 py-0.5"
              >
                {/* S.no */}
                <span className="w-10 shrink-0 font-normal text-[#575765]">
                  {item.sno}
                </span>

                {/* Product Name & SKU */}
                <div className="flex-1 min-w-0 flex flex-col pr-2">
                  <span className="font-medium text-[#3D3D49] text-[11px] truncate">
                    {item.name}
                  </span>
                  <span className="font-normal text-[#575765] text-[11px] truncate">
                    {item.code}
                  </span>
                </div>

                {/* Stock Count */}
                <span className="w-20 shrink-0 font-medium text-[#3D3D49] text-[11px]">
                  {item.stock}
                </span>

                {/* Status Badge */}
                <div className="w-[100px] shrink-0 flex justify-end">
                  <div
                    className={`px-2 py-0.5 rounded-[6px] border text-[11px] font-normal leading-normal whitespace-nowrap ${
                      isOutOfStock
                        ? "bg-[#FEE9E9] border-[#F92424] text-[#F92424]"
                        : isLowStock
                        ? "bg-[#FDF7E5] border-[#EDAC00] text-[#EDAC00]"
                        : "bg-[#E5F4F3] border-[#009689] text-[#009689]"
                    }`}
                  >
                    {item.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
