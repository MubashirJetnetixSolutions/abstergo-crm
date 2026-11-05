"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  ExportIcon,
  UploadIcon,
  FilterIcon,
  MoreVerticalIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ProductsIcon,
  CloseIcon,
  EditIcon,
  EyeIcon,
  DeleteIcon,
} from "../icons/Icons";

export interface ProductRecord {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  stock: string;
  incoming: number;
  available: number;
  price: string;
  cost: string;
  warranty: string;
  status: "Active" | "Inactive";
}

const INITIAL_PRODUCTS: ProductRecord[] = [
  {
    id: "1",
    sku: "DL-5440",
    name: "Dell Latitude 5440",
    category: "Laptops",
    brand: "Dell",
    stock: "10 In Stock",
    incoming: 5,
    available: 5,
    price: "700 000 CFA",
    cost: "520 000 CFA",
    warranty: "12 Months",
    status: "Active",
  },
  {
    id: "2",
    sku: "HP-450G10",
    name: "HP ProBook 450 G10",
    category: "Laptops",
    brand: "HP",
    stock: "8 In Stock",
    incoming: 3,
    available: 8,
    price: "650 000 CFA",
    cost: "480 000 CFA",
    warranty: "12 Months",
    status: "Active",
  },
  {
    id: "3",
    sku: "MBP-14M3",
    name: "Apple MacBook Pro 14 M3",
    category: "Laptops",
    brand: "Apple",
    stock: "4 In Stock",
    incoming: 2,
    available: 4,
    price: "1 450 000 CFA",
    cost: "1 200 000 CFA",
    warranty: "12 Months",
    status: "Active",
  },
  {
    id: "4",
    sku: "MX-KEYS",
    name: "Logitech MX Keys S",
    category: "Accessories",
    brand: "Logitech",
    stock: "25 In Stock",
    incoming: 10,
    available: 25,
    price: "85 000 CFA",
    cost: "60 000 CFA",
    warranty: "6 Months",
    status: "Active",
  },
  {
    id: "5",
    sku: "MX-MST3",
    name: "Logitech MX Master 3S",
    category: "Accessories",
    brand: "Logitech",
    stock: "18 In Stock",
    incoming: 5,
    available: 18,
    price: "75 000 CFA",
    cost: "50 000 CFA",
    warranty: "6 Months",
    status: "Active",
  },
  {
    id: "6",
    sku: "DL-OPT7090",
    name: "Dell OptiPlex 7090 Tower",
    category: "Desktops",
    brand: "Dell",
    stock: "6 In Stock",
    incoming: 4,
    available: 6,
    price: "820 000 CFA",
    cost: "640 000 CFA",
    warranty: "12 Months",
    status: "Active",
  },
  {
    id: "7",
    sku: "IP15P-256",
    name: "Apple iPhone 15 Pro 256GB",
    category: "Smartphones",
    brand: "Apple",
    stock: "7 In Stock",
    incoming: 10,
    available: 7,
    price: "950 000 CFA",
    cost: "820 000 CFA",
    warranty: "12 Months",
    status: "Active",
  },
  {
    id: "8",
    sku: "SMS-S24U",
    name: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    brand: "Samsung",
    stock: "5 In Stock",
    incoming: 3,
    available: 5,
    price: "920 000 CFA",
    cost: "790 000 CFA",
    warranty: "12 Months",
    status: "Active",
  },
  {
    id: "9",
    sku: "LNV-T14G4",
    name: "Lenovo ThinkPad T14 Gen 4",
    category: "Laptops",
    brand: "Lenovo",
    stock: "0 Out of Stock",
    incoming: 8,
    available: 0,
    price: "780 000 CFA",
    cost: "600 000 CFA",
    warranty: "3 Months",
    status: "Inactive",
  },
  {
    id: "10",
    sku: "HP-ENVY27",
    name: "HP Envy 27 4K Display",
    category: "Peripherals",
    brand: "HP",
    stock: "12 In Stock",
    incoming: 0,
    available: 12,
    price: "380 000 CFA",
    cost: "290 000 CFA",
    warranty: "3 Months",
    status: "Active",
  },
  {
    id: "11",
    sku: "DL-U2723QE",
    name: "Dell UltraSharp U2723QE",
    category: "Peripherals",
    brand: "Dell",
    stock: "9 In Stock",
    incoming: 4,
    available: 9,
    price: "420 000 CFA",
    cost: "330 000 CFA",
    warranty: "6 Months",
    status: "Active",
  },
  {
    id: "12",
    sku: "SMS-T7-1TB",
    name: "Samsung Portable SSD T7 1TB",
    category: "Accessories",
    brand: "Samsung",
    stock: "0 Out of Stock",
    incoming: 15,
    available: 0,
    price: "95 000 CFA",
    cost: "70 000 CFA",
    warranty: "3 Months",
    status: "Inactive",
  },
];

export default function ProductsTable() {
  const router = useRouter();
  const [products, setProducts] = useState<ProductRecord[]>(INITIAL_PRODUCTS);
  const [showFilters, setShowFilters] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [warrantyFilter, setWarrantyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setActiveMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRowClick = (product: ProductRecord) => {
    router.push(`/products/${product.sku}`);
  };

  const filteredProducts = products.filter((product) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matches =
        product.name.toLowerCase().includes(q) ||
        product.sku.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.stock.toLowerCase().includes(q) ||
        product.price.toLowerCase().includes(q) ||
        product.cost.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (categoryFilter && product.category.toLowerCase() !== categoryFilter.toLowerCase()) {
      return false;
    }

    if (brandFilter && product.brand.toLowerCase() !== brandFilter.toLowerCase()) {
      return false;
    }

    if (warrantyFilter && product.warranty.toLowerCase() !== warrantyFilter.toLowerCase()) {
      return false;
    }

    if (statusFilter && product.status.toLowerCase() !== statusFilter.toLowerCase()) {
      return false;
    }

    return true;
  });

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Table Card Container */}
      <div
        className="w-full bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col"
        data-node-id="6175:19830"
      >
        {/* Table Top Header Bar */}
        <div className="min-h-[52px] px-5 py-2.5 border-b border-[#EDEDED] flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-medium text-[#575765] text-[20px]">
            Products
          </h3>

          <div className="flex items-center gap-2">
            {/* Inline Expandable Search Input / Button */}
            {showSearch ? (
              <div className="relative flex items-center animate-in fade-in duration-150">
                <SearchIcon className="size-4 text-[#8C8C9A] absolute left-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  autoFocus
                  className="h-[34px] pl-9 pr-8 text-xs border border-[#EDEDED] rounded-[8px] bg-white text-[#3D3D49] focus:outline-none focus:border-[#FF611C] w-48 sm:w-64 transition-all"
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(false);
                    setSearchQuery("");
                  }}
                  className="absolute right-2.5 text-[#8C8C9A] hover:text-[#3D3D49] p-0.5 cursor-pointer"
                  aria-label="Close search"
                >
                  <CloseIcon className="size-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowSearch(true)}
                aria-label="Search"
                className="size-[34px] bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center justify-center text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer shrink-0"
              >
                <SearchIcon className="size-5" />
              </button>
            )}

            {/* Export Button */}
            <button
              type="button"
              className="h-[34px] px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
            >
              <ExportIcon className="size-5" />
              <span className="font-medium text-[11px]">Export</span>
            </button>

            {/* Upload Button */}
            <button
              type="button"
              className="h-[34px] px-4 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
            >
              <UploadIcon className="size-5" />
              <span className="font-medium text-[11px]">Upload</span>
            </button>

            {/* Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className={`h-[34px] px-4 border border-[#EDEDED] rounded-[8px] flex items-center gap-2 text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer ${
                showFilters ? "bg-neutral-100 font-semibold" : "bg-white hover:bg-neutral-50"
              }`}
            >
              <FilterIcon className="size-5" />
              <span className="font-medium text-[11px]">Filter</span>
            </button>
          </div>
        </div>

        {/* Table Filter Bar Row (conditionally visible) */}
        {showFilters && (
          <div
            className="min-h-[52px] px-5 py-3 border-b border-[#EDEDED] flex flex-wrap items-center gap-3 bg-white animate-in fade-in duration-150"
            data-node-id="6736:29382"
          >
            {/* Category Filter */}
            <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 transition-colors">
              <span className="text-[13px] text-[#575765] mr-1.5 whitespace-nowrap">Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer pr-5 appearance-none font-medium"
              >
                <option value="">All Categories</option>
                <option value="Laptops">Laptops</option>
                <option value="Desktops">Desktops</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Accessories">Accessories</option>
                <option value="Peripherals">Peripherals</option>
              </select>
              <ChevronDownIcon className="size-3.5 text-[#575765] pointer-events-none absolute right-2" />
            </div>

            {/* Brand Filter */}
            <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 transition-colors">
              <span className="text-[13px] text-[#575765] mr-1.5 whitespace-nowrap">Brand:</span>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer pr-5 appearance-none font-medium"
              >
                <option value="">All Brands</option>
                <option value="Dell">Dell</option>
                <option value="HP">HP</option>
                <option value="Apple">Apple</option>
                <option value="Lenovo">Lenovo</option>
                <option value="Logitech">Logitech</option>
                <option value="Samsung">Samsung</option>
              </select>
              <ChevronDownIcon className="size-3.5 text-[#575765] pointer-events-none absolute right-2" />
            </div>

            {/* Warranty Filter */}
            <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 transition-colors">
              <span className="text-[13px] text-[#575765] mr-1.5 whitespace-nowrap">Warranty:</span>
              <select
                value={warrantyFilter}
                onChange={(e) => setWarrantyFilter(e.target.value)}
                className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer pr-5 appearance-none font-medium"
              >
                <option value="">All Warranties</option>
                <option value="12 Months">12 Months</option>
                <option value="6 Months">6 Months</option>
                <option value="3 Months">3 Months</option>
              </select>
              <ChevronDownIcon className="size-3.5 text-[#575765] pointer-events-none absolute right-2" />
            </div>

            {/* Status Filter */}
            <div className="relative flex items-center bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 hover:border-gray-400 transition-colors">
              <span className="text-[13px] text-[#575765] mr-1.5 whitespace-nowrap">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-[13px] text-[#3D3D49] bg-transparent outline-none cursor-pointer pr-5 appearance-none font-medium"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <ChevronDownIcon className="size-3.5 text-[#575765] pointer-events-none absolute right-2" />
            </div>

            {/* Reset Filters button */}
            {(categoryFilter || brandFilter || warrantyFilter || statusFilter || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter("");
                  setBrandFilter("");
                  setWarrantyFilter("");
                  setStatusFilter("");
                  setSearchQuery("");
                }}
                className="text-[12px] text-[#FF611C] hover:underline font-medium ml-1 cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}

        {/* Scrollable Data Table Container */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            {/* Table Head */}
            <thead>
              <tr className="border-b border-[#EDEDED] bg-white text-[#575765] text-[11px] font-medium select-none">
                <th className="py-3 px-4 w-[240px]">Product</th>
                <th className="py-3 px-4 w-[120px]">SKU</th>
                <th className="py-3 px-4 w-[130px]">Category</th>
                <th className="py-3 px-4 w-[110px]">Brand</th>
                <th className="py-3 px-4 w-[130px]">Stock</th>
                <th className="py-3 px-4 w-[100px]">Incoming</th>
                <th className="py-3 px-4 w-[100px]">Available</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Cost</th>
                <th className="py-3 px-4 w-[120px]">Warranty</th>
                <th className="py-3 px-4 w-[90px]">Status</th>
                <th className="py-3 px-4 w-[60px] text-right">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#EDEDED] text-[11px] text-[#3D3D49]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-8 text-center text-[#8C8C9A]">
                    No products found matching the filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((item, idx) => (
                  <tr
                    key={item.id + "-" + item.sku}
                    onClick={() => handleRowClick(item)}
                    className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Product Details */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-[6px] bg-neutral-100 border border-[#EDEDED] flex items-center justify-center shrink-0 text-[#FF611C] p-1">
                          <ProductsIcon className="size-5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-[#3D3D49] group-hover:text-[#FF611C] transition-colors truncate">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#575765] font-normal">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-3.5 px-4 text-[#575765] font-normal">
                      {item.sku}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-[#3D3D49] font-normal">
                      {item.category}
                    </td>

                    {/* Brand */}
                    <td className="py-3.5 px-4 text-[#3D3D49] font-normal">
                      {item.brand}
                    </td>

                    {/* Stock */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-[6px] border text-[11px] font-normal ${
                          item.stock.includes("Out of")
                            ? "border-[#F92424] bg-[#FEE9E9] text-[#F92424]"
                            : "border-[#009689] bg-[#E5F4F3] text-[#009689]"
                        }`}
                      >
                        {item.stock}
                      </span>
                    </td>

                    {/* Incoming */}
                    <td className="py-3.5 px-4 text-[#FF611C] font-medium">
                      {item.incoming}
                    </td>

                    {/* Available */}
                    <td className="py-3.5 px-4 text-[#009689] font-medium">
                      {item.available}
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-normal text-[#3D3D49] whitespace-nowrap">
                      {item.price}
                    </td>

                    {/* Cost */}
                    <td className="py-3.5 px-4 font-normal text-[#3D3D49] whitespace-nowrap">
                      {item.cost}
                    </td>

                    {/* Warranty */}
                    <td className="py-3.5 px-4 text-[#575765] font-normal whitespace-nowrap">
                      {item.warranty}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-[6px] border text-[11px] font-normal ${
                          item.status === "Active"
                            ? "border-[#009689] bg-[#E5F4F3] text-[#009689]"
                            : "border-[#8C8C9A] bg-neutral-100 text-[#575765]"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* Action Dropdown */}
                    <td
                      className="py-3.5 px-4 text-right relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="relative inline-block text-left"
                        ref={activeMenuId === idx ? actionMenuRef : null}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMenuId(activeMenuId === idx ? null : idx);
                          }}
                          className="size-7 bg-white hover:bg-neutral-100 border border-[#EDEDED] rounded-[6px] inline-flex items-center justify-center text-[#575765] cursor-pointer transition-colors"
                          aria-label="Actions"
                        >
                          <MoreVerticalIcon className="size-4" />
                        </button>

                        {activeMenuId === idx && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-full mt-1 z-30 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 flex flex-col text-left animate-in fade-in zoom-in-95 duration-100"
                          >
                            <Link
                              href="/products/new"
                              onClick={() => setActiveMenuId(null)}
                              className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <EditIcon className="size-3.5 text-[#575765]" />
                              <span>Edit</span>
                            </Link>
                            <Link
                              href={`/products/${item.sku}`}
                              onClick={() => setActiveMenuId(null)}
                              className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#3D3D49] hover:bg-[#F8FAFD] flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <EyeIcon className="size-3.5 text-[#575765]" />
                              <span>View</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                setProducts((prev) => prev.filter((_, i) => i !== idx));
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-2 text-left text-[12px] font-medium text-[#F92424] hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <DeleteIcon className="size-3.5 text-[#F92424]" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="w-full py-2 flex items-center justify-end gap-3 text-[11px] text-[#575765]">
        <div className="relative">
          <select
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value))}
            aria-label="Items per page"
            className="bg-white border border-[#EDEDED] rounded-[6px] px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-neutral-50 appearance-none pr-7 text-[11px] text-[#575765] outline-none"
          >
            <option value={10}>Per page: 10</option>
            <option value={20}>Per page: 20</option>
            <option value={50}>Per page: 50</option>
          </select>
          <ChevronDownIcon className="size-3.5 text-[#575765] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          className="size-7 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] flex items-center justify-center text-[#575765] cursor-pointer disabled:opacity-40"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        <span className="font-normal text-[#575765] px-1">
          Page {currentPage}
        </span>

        <button
          type="button"
          onClick={() => setCurrentPage((p) => p + 1)}
          className="size-7 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[6px] flex items-center justify-center text-[#575765] cursor-pointer"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
