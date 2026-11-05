"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  UploadIcon,
  FileIcon,
  ProductsIcon,
} from "@/components/icons/Icons";

export default function AddProductPage() {
  const router = useRouter();

  // Form states
  const [productName, setProductName] = useState("Dell Latitude 5440");
  const [status, setStatus] = useState("Active");
  const [sku, setSku] = useState("DL-5440");
  const [barcode, setBarcode] = useState("REG-2026-24569");
  const [category, setCategory] = useState("Laptop");
  const [subcategory, setSubcategory] = useState("Business Laptops");
  const [brand, setBrand] = useState("Dell");
  const [model, setModel] = useState("Latitude 5440");
  const [description, setDescription] = useState(
    "Sleek and modern display along with 4 usb ports."
  );

  const [costPrice, setCostPrice] = useState("520 000 CFA");
  const [tax, setTax] = useState("18");
  const [wholesalePrice, setWholesalePrice] = useState("700 000 CFA");
  const [resellerPrice, setResellerPrice] = useState("700 000 CFA");

  const [lowStockThreshold, setLowStockThreshold] = useState("5");
  const [reorderLevel, setReorderLevel] = useState("10");
  const [minStock, setMinStock] = useState("2");
  const [maxStock, setMaxStock] = useState("50");
  const [warehouse, setWarehouse] = useState("Main Warehouse");
  const [warranty, setWarranty] = useState("12 Monhs");

  // Product Images state
  const [productImages, setProductImages] = useState<
    Array<{ id: string; name: string; size: string; type: string; url?: string }>
  >([
    {
      id: "1",
      name: "Dell Latitude 5440 Datasheet.jpeg",
      size: "2.5mb",
      type: "Image file",
      url: "",
    },
    {
      id: "2",
      name: "Dell Latitude 5440 Datasheet.jpeg",
      size: "2.5mb",
      type: "Image file",
      url: "",
    },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<{
    id: string;
    name: string;
    size: string;
    type: string;
    url?: string;
  } | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newItems = Array.from(files).map((file, idx) => {
      const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
      const formattedSize =
        Number(sizeInMb) < 0.1 ? `${(file.size / 1024).toFixed(0)}kb` : `${sizeInMb}mb`;
      return {
        id: `${Date.now()}-${idx}`,
        name: file.name,
        size: formattedSize,
        type: file.type.startsWith("image/") ? "Image file" : "File",
        url: URL.createObjectURL(file),
      };
    });
    setProductImages((prev) => [...newItems, ...prev]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDeleteImage = (id: string) => {
    setProductImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleDownloadImage = (img: { name: string; url?: string }) => {
    if (img.url) {
      const a = document.createElement("a");
      a.href = img.url;
      a.download = img.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      const blob = new Blob([`Sample preview data for ${img.name}`], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = img.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/products/DL-5440");
  };

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
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Link
                href="/products"
                className="size-11 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.02)] shrink-0"
              >
                <ChevronLeftIcon className="size-4" />
              </Link>
              <div className="flex flex-col">
                <h1 className="font-medium text-[#3D3D49] text-[24px] leading-tight">
                  Add Product
                </h1>
                <p className="font-normal text-[#575765] opacity-80 text-[14px]">
                  Create a new product and configure pricing, inventory and tracking.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/products"
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
                Create Product
              </button>
            </div>
          </div>

          {/* Form & Preview Grid */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 8 Columns: Form Cards */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* 1. Basic Information Section */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#3D3D49] text-[15px]">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Product Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Product Name"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Status */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* SKU */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      SKU *
                    </label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      placeholder="SKU"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Barcode */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Barcode
                    </label>
                    <input
                      type="text"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      placeholder="Barcode"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Category */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Laptop">Laptop</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Monitors">Monitors</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Subcategory */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Subcategory
                    </label>
                    <input
                      type="text"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      placeholder="Subcategory"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Brand */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Brand
                    </label>
                    <div className="relative">
                      <select
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Dell">Dell</option>
                        <option value="HP">HP</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Apple">Apple</option>
                        <option value="Asus">Asus</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Model */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Model
                    </label>
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Model"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] text-[#575765] font-normal">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description..."
                    className="w-full p-3 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] resize-none"
                  />
                </div>
              </div>

              {/* 2. Product Images Section */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#3D3D49] text-[15px]">Product Images</h2>

                {/* Drag & Drop Zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragging(false);
                  }}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full border-2 border-dashed rounded-[10px] p-8 sm:p-10 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer text-center ${isDragging
                    ? "border-[#0D79E4] bg-[#E7F2FC]/20"
                    : "border-[#EDEDED] bg-[#F8FAFD]/30 hover:bg-[#F8FAFD]/70"
                    }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                  <div className="size-11 rounded-full bg-[#E7F2FC] text-[#0D79E4] flex items-center justify-center shadow-xs">
                    <svg
                      className="size-5 text-[#0D79E4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] text-[#3D3D49] font-normal">
                      <span className="text-[#0D79E4] underline cursor-pointer hover:text-[#0b66c2]">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-[12px] text-[#8C8C9A] font-normal">
                      Maximum file size is 50 MB.
                    </p>
                  </div>
                </div>

                {/* Uploaded Files List */}
                <div className="flex flex-col gap-3">
                  {productImages.length === 0 ? (
                    <div className="py-8 text-center text-[13px] text-[#8C8C9A]">
                      No images uploaded yet. Click above or drag images to upload.
                    </div>
                  ) : (
                    productImages.map((img) => (
                      <div
                        key={img.id}
                        className="border border-[#EDEDED] rounded-[10px] p-4 bg-white flex items-center justify-between gap-4 hover:border-[#DFDFE6] transition-colors"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="size-10 rounded-[8px] bg-[#FFF2EC] flex items-center justify-center shrink-0">
                            <FileIcon className="size-5 text-[#FF611C]" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-[#3D3D49] text-[13px] truncate">
                              {img.name}
                            </span>
                            <span className="text-[12px] text-[#8C8C9A] font-normal">
                              {img.type} · {img.size}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(img.id)}
                            className="px-2 py-1 text-[13px] font-normal text-[#575765] hover:text-[#F92424] transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreviewImage(img)}
                            className="px-2 py-1 text-[13px] font-normal text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDownloadImage(img)}
                            className="px-4 py-2 rounded-[8px] text-white text-[13px] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
                            style={{
                              background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                            }}
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Image Preview Modal */}
              {previewImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
                  <div className="bg-white rounded-[12px] p-6 max-w-lg w-full shadow-2xl flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="text-[14px] font-medium text-[#3D3D49] truncate max-w-[360px]">
                          {previewImage.name}
                        </h3>
                        <span className="text-[12px] text-[#8C8C9A]">
                          {previewImage.type} · {previewImage.size}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewImage(null)}
                        className="size-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="w-full h-64 bg-neutral-100 rounded-[8px] flex items-center justify-center overflow-hidden border border-[#EDEDED]">
                      {previewImage.url ? (
                        <img
                          src={previewImage.url}
                          alt={previewImage.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-[#8C8C9A]">
                          <div className="size-16 rounded-[8px] bg-[#FFF2EC] flex items-center justify-center text-[#FF611C]">
                            <FileIcon className="size-8" />
                          </div>
                          <span className="text-xs">Image Preview Available</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setPreviewImage(null)}
                        className="px-4 py-2 border border-[#EDEDED] rounded-[8px] text-[13px] text-[#575765] hover:bg-neutral-50 transition cursor-pointer"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadImage(previewImage)}
                        className="px-4 py-2 rounded-[8px] text-white text-[13px] font-medium transition cursor-pointer"
                        style={{
                          background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                        }}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Pricing Details Section */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                <h2 className="font-medium text-[#3D3D49] text-[15px]">Pricing Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Cost Price */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Cost Price (CFA)
                    </label>
                    <input
                      type="text"
                      value={costPrice}
                      onChange={(e) => setCostPrice(e.target.value)}
                      placeholder="520 000 CFA"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Tax */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Tax (%)
                    </label>
                    <input
                      type="text"
                      value={tax}
                      onChange={(e) => setTax(e.target.value)}
                      placeholder="18"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Wholesale Price */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Wholesale Price (CFA)
                    </label>
                    <input
                      type="text"
                      value={wholesalePrice}
                      onChange={(e) => setWholesalePrice(e.target.value)}
                      placeholder="700 000 CFA"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Reseller Price */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] text-[#575765] font-normal">
                      Reseller Price (CFA)
                    </label>
                    <input
                      type="text"
                      value={resellerPrice}
                      onChange={(e) => setResellerPrice(e.target.value)}
                      placeholder="700 000 CFA"
                      className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[11px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C]"
                    />
                  </div>
                </div>
              </div>

              {/* 4. Warranty Details Section */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden">
                <div className="px-6 py-4 border-b border-[#EDEDED]">
                  <h2 className="font-medium text-[#3D3D49] text-[15px]">Warranty Details</h2>
                </div>
                <div className="p-6 flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] text-[#575765] font-normal">
                      Warranty Duration
                    </label>
                    <div className="relative">
                      <select
                        value={warranty}
                        onChange={(e) => setWarranty(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="12 Monhs">12 Monhs</option>
                        <option value="12 Months">12 Months</option>
                        <option value="6 Months">6 Months</option>
                        <option value="3 Months">3 Months</option>
                        <option value="24 Months">24 Months</option>
                        <option value="No Warranty">No Warranty</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Inventory Settings Section */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden">
                <div className="px-6 py-4 border-b border-[#EDEDED]">
                  <h2 className="font-medium text-[#3D3D49] text-[15px]">Inventory Settings</h2>
                </div>
                <div className="p-6 flex flex-col gap-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Default Warehouse */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] text-[#575765] font-normal">
                        Default Warehouse
                      </label>
                      <div className="relative">
                        <select
                          value={warehouse}
                          onChange={(e) => setWarehouse(e.target.value)}
                          className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                        >
                          <option value="Main Warehouse">Main Warehouse</option>
                          <option value="Secondary Warehouse">Secondary Warehouse</option>
                        </select>
                        <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Low Stock Threshold */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] text-[#575765] font-normal">
                        Low Stock Threshold
                      </label>
                      <div className="relative">
                        <select
                          value={lowStockThreshold}
                          onChange={(e) => setLowStockThreshold(e.target.value)}
                          className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                        >
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="20">20</option>
                        </select>
                        <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Min Stock */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] text-[#575765] font-normal">
                        Min Stock
                      </label>
                      <div className="relative">
                        <select
                          value={minStock}
                          onChange={(e) => setMinStock(e.target.value)}
                          className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                        >
                          <option value="2">2</option>
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="15">15</option>
                        </select>
                        <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Max Stock */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] text-[#575765] font-normal">
                        Max Stock
                      </label>
                      <div className="relative">
                        <select
                          value={maxStock}
                          onChange={(e) => setMaxStock(e.target.value)}
                          className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] font-normal focus:outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                        >
                          <option value="50">50</option>
                          <option value="100">100</option>
                          <option value="200">200</option>
                          <option value="500">500</option>
                        </select>
                        <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 4 Columns: Product Summary Card */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6 sticky top-6">
                <h2 className="font-medium text-[#3D3D49] text-[15px]">Product Summary</h2>

                {/* Identity Header */}
                <div className="flex items-center gap-3.5 pb-5 border-b border-[#EDEDED]">
                  <div className="size-12 rounded-[8px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center shrink-0 text-[#FF611C] p-2">
                    <ProductsIcon className="size-6 text-[#FF611C]" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-medium text-[#3D3D49] text-[11px] leading-tight">
                      {productName || "Dell Latitude 5440"}
                    </h3>
                    <p className="text-[11px] text-[#575765] font-normal">
                      SKU: {sku || "DL-5440"}
                    </p>
                  </div>
                </div>

                {/* Summary Key-Values */}
                <div className="flex flex-col gap-3.5 text-[11px]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#575765] font-normal">Category:</span>
                    <span className="text-[#3D3D49] font-normal text-right">
                      {category}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#575765] font-normal">Retail Price:</span>
                    <span className="text-[#3D3D49] font-normal text-right">
                      {resellerPrice || "700 000 CFA"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#575765] font-normal">Cost:</span>
                    <span className="text-[#3D3D49] font-normal text-right">
                      {costPrice || "520 000 CFA"}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[#575765] font-normal">Warranty:</span>
                    <span className="text-[#3D3D49] font-normal text-right">
                      {warranty || "12 Months"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
