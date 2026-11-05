"use client";

import React, { useState, useRef, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  SearchIcon,
  PlusIcon,
  MoreVerticalIcon,
  CheckmarkCircleIcon,
  EditIcon,
  DeleteIcon,
  ChevronDownIcon,
} from "@/components/icons/Icons";

type SettingsTab =
  | "brands"
  | "models"
  | "categories"
  | "warehouse"
  | "suppliers"
  | "expenses"
  | "specialization"
  | "skills"
  | "security"
  | "admin";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("brands");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  useEffect(() => {
    if (!activeMenuId) return;
    const handleOutside = () => setActiveMenuId(null);
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, [activeMenuId]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalStatus, setModalStatus] = useState("Active");
  const [modalParentBrand, setModalParentBrand] = useState("Dell");
  const [modalPhone, setModalPhone] = useState("+1 (713) 555-0182");
  const [modalAddress, setModalAddress] = useState("125 Industrial Avenue, Houston, TX");
  const [modalDesc, setModalDesc] = useState("");
  const [modalSupplierPurchases, setModalSupplierPurchases] = useState("7,860,000 CFA");
  const [modalSupplierEmail, setModalSupplierEmail] = useState("suppli56@gmail.com");

  // Tab 1: Brands
  const [brands, setBrands] = useState([
    { id: "1", name: "Dell", productsLinked: 26, lastUpdated: "Dec 27, 2026", status: "Active" },
    { id: "2", name: "Lenovo", productsLinked: 26, lastUpdated: "Dec 27, 2026", status: "Active" },
    { id: "3", name: "Toshiba", productsLinked: 26, lastUpdated: "Dec 27, 2026", status: "Active" },
    { id: "4", name: "HP", productsLinked: 26, lastUpdated: "Dec 27, 2026", status: "Active" },
    { id: "5", name: "Acer", productsLinked: 26, lastUpdated: "Dec 27, 2026", status: "Active" },
  ]);

  // Tab 2: Models (Exact Mockup 1)
  const [models, setModels] = useState([
    { id: "1", name: "Lattitude", firstColLabel: "Category Name", parentBrand: "Dell", lastUpdated: "Dec 27, 2026", status: "Active" },
    { id: "2", name: "Thinkpad", firstColLabel: "Brand Name", parentBrand: "Lenovo", lastUpdated: "Dec 27, 2026", status: "Active" },
    { id: "3", name: "Toshiba Pro", firstColLabel: "Brand Name", parentBrand: "Toshiba", lastUpdated: "Dec 27, 2026", status: "Active" },
    { id: "4", name: "Acer Lite", firstColLabel: "Brand Name", parentBrand: "Acer", lastUpdated: "Dec 27, 2026", status: "Active" },
    { id: "5", name: "Inspiron", firstColLabel: "Brand Name", parentBrand: "HP", lastUpdated: "Dec 27, 2026", status: "Inactive" },
  ]);

  // Tab 3: Product Categories
  const [categories, setCategories] = useState([
    { id: "1", name: "Dell", subCategories: 12, description: "Laptops, notebooks, and portable comput...", lastUpdated: "Dec 27, 2026", status: "Active" },
    { id: "2", name: "Lenovo", subCategories: 12, description: "Laptops, notebooks, and portable comput...", lastUpdated: "Dec 27, 2026", status: "Active" },
    { id: "3", name: "Toshiba", subCategories: 12, description: "Laptops, notebooks, and portable comput...", lastUpdated: "Dec 27, 2026", status: "Active" },
    { id: "4", name: "HP", subCategories: 12, description: "Laptops, notebooks, and portable comput...", lastUpdated: "Dec 27, 2026", status: "Inactive" },
    { id: "5", name: "Acer", subCategories: 12, description: "Laptops, notebooks, and portable comput...", lastUpdated: "Dec 27, 2026", status: "Active" },
  ]);



  // Tab 4: Warehouse (Image Mockup 2)
  const [warehouses, setWarehouses] = useState([
    { id: "1", name: "Main Warehouse", productsLinked: 24, phone: "+1 (713) 555-0182", status: "Active" },
    { id: "2", name: "Main Warehouse", productsLinked: 24, phone: "+1 (713) 555-0182", status: "Active" },
    { id: "3", name: "Main Warehouse", productsLinked: 24, phone: "+1 (713) 555-0182", status: "Active" },
    { id: "4", name: "Main Warehouse", productsLinked: 24, phone: "+1 (713) 555-0182", status: "Active" },
    { id: "5", name: "Main Warehouse", productsLinked: 24, phone: "+1 (713) 555-0182", status: "Active" },
    { id: "6", name: "Main Warehouse", productsLinked: 24, phone: "+1 (713) 555-0182", status: "Active" },
    { id: "7", name: "Main Warehouse", productsLinked: 24, phone: "+1 (713) 555-0182", status: "Active" },
  ]);

  // Tab 5: Suppliers (Exact Mockup 2)
  const [suppliers, setSuppliers] = useState([
    { id: "1", name: "Marco Cronos", phone: "+1 (713) 555-0182", purchases: "7,860,000 CFA", email: "suppli56@gmail.com", status: "Active" },
    { id: "2", name: "Marco Cronos", phone: "+1 (713) 555-0182", purchases: "7,860,000 CFA", email: "suppli56@gmail.com", status: "Active" },
    { id: "3", name: "Marco Cronos", phone: "+1 (713) 555-0182", purchases: "7,860,000 CFA", email: "suppli56@gmail.com", status: "Active" },
    { id: "4", name: "Marco Cronos", phone: "+1 (713) 555-0182", purchases: "7,860,000 CFA", email: "suppli56@gmail.com", status: "Active" },
    { id: "5", name: "Marco Cronos", phone: "+1 (713) 555-0182", purchases: "7,860,000 CFA", email: "suppli56@gmail.com", status: "Active" },
    { id: "6", name: "Marco Cronos", phone: "+1 (713) 555-0182", purchases: "7,860,000 CFA", email: "suppli56@gmail.com", status: "Active" },
    { id: "7", name: "Marco Cronos", phone: "+1 (713) 555-0182", purchases: "7,860,000 CFA", email: "suppli56@gmail.com", status: "Active" },
  ]);

  // Tab 6: Expense Categories
  const [expenses, setExpenses] = useState([
    { id: "1", name: "Rent", status: "Active" },
    { id: "2", name: "Utilities", status: "Active" },
    { id: "3", name: "Salaries", status: "Active" },
    { id: "4", name: "Marketing", status: "Active" },
    { id: "5", name: "Transport", status: "Active" },
    { id: "6", name: "Office Supplies", status: "Active" },
    { id: "7", name: "Software & Subscriptions", status: "Active" },
  ]);

  // Tab 7: Technician Specialization (Exact Mockup 3)
  const [specializations, setSpecializations] = useState([
    { id: "1", name: "Laptop & Desktop", description: "Main storage and dispatch warehouse." },
    { id: "2", name: "Laptop & Desktop", description: "Main storage and dispatch warehouse." },
    { id: "3", name: "Laptop & Desktop", description: "Main storage and dispatch warehouse." },
    { id: "4", name: "Laptop & Desktop", description: "Main storage and dispatch warehouse." },
    { id: "5", name: "Laptop & Desktop", description: "Main storage and dispatch warehouse." },
    { id: "6", name: "Laptop & Desktop", description: "Main storage and dispatch warehouse." },
    { id: "7", name: "Laptop & Desktop", description: "Main storage and dispatch warehouse." },
  ]);



  // Tab 7: Technician Skills
  const [skills, setSkills] = useState([
    { id: "1", name: "Screen Replacement", description: "Best for internal repair" },
    { id: "2", name: "Motherboard Repair", description: "---" },
    { id: "3", name: "Printer Repair", description: "---" },
    { id: "4", name: "Server Rack", description: "---" },
    { id: "5", name: "Battery Replacement", description: "---" },
  ]);



  // Tab 9: Password & Security State
  const [currentPassword, setCurrentPassword] = useState("Kwame Mensah");
  const [newPassword, setNewPassword] = useState("kwame.mensah@mensahent.gh");
  const [confirmPassword, setConfirmPassword] = useState("+233 24 555 0192");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  // Tab 10: Admin Profile State
  const [adminFirstName, setAdminFirstName] = useState("James");
  const [adminLastName, setAdminLastName] = useState("Anderson");
  const [adminEmail, setAdminEmail] = useState("admin@abestro.com");
  const [adminPhone, setAdminPhone] = useState("+49 151 2345 6789");
  const [adminImage, setAdminImage] = useState<{
    name: string;
    size: string;
    previewUrl: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      const previewUrl = URL.createObjectURL(file);
      setAdminImage({
        name: file.name,
        size: `${sizeInMB} MB`,
        previewUrl,
      });
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Tab navigation items
  const navTabs = [
    { id: "brands", label: "Brands" },
    { id: "models", label: "Models" },
    { id: "categories", label: "Product Categories" },
    { id: "warehouse", label: "Warehouse" },
    { id: "suppliers", label: "Suppliers" },
    { id: "expenses", label: "Expense Categories" },
    { id: "specialization", label: "Specialization" },
    { id: "skills", label: "Technician Skills" },
    { id: "security", label: "Password & Security" },
    { id: "admin", label: "Admin Profile" },
  ] as const;

  // Open Add Modal with fresh defaults matching image mockups
  const openAddModal = () => {
    if (activeTab === "models") {
      setModalName("Inspiron");
      setModalParentBrand("HP");
      setModalStatus("Active");
      setModalPhone("");
      setModalAddress("");
      setModalDesc("");
      setModalSupplierPurchases("");
      setModalSupplierEmail("");
    } else if (activeTab === "suppliers") {
      setModalName("Marco Crono");
      setModalPhone("+1 (713) 555-0182");
      setModalSupplierEmail("marcocrno2@gmail.com");
      setModalSupplierPurchases("7,860,000 CFA");
      setModalStatus("Active");
      setModalParentBrand("Dell");
      setModalAddress("");
      setModalDesc("");
    } else if (activeTab === "specialization") {
      setModalName("Laptop & Desktop");
      setModalDesc("Main storage and dispatch warehouse.");
      setModalStatus("Active");
      setModalParentBrand("Dell");
      setModalPhone("");
      setModalAddress("");
      setModalSupplierPurchases("");
      setModalSupplierEmail("");
    } else {
      setModalName("");
      setModalStatus("Active");
      setModalParentBrand("Dell");
      setModalPhone("+1 (713) 555-0182");
      setModalAddress("125 Industrial Avenue, Houston, TX");
      setModalDesc("");
      setModalSupplierPurchases("7,860,000 CFA");
      setModalSupplierEmail("suppli56@gmail.com");
    }
    setIsAddModalOpen(true);
  };

  // Add Item Handler
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalName.trim()) return;

    if (activeTab === "brands") {
      setBrands([
        ...brands,
        {
          id: String(Date.now()),
          name: modalName,
          productsLinked: 0,
          lastUpdated: "Dec 27, 2026",
          status: modalStatus,
        },
      ]);
    } else if (activeTab === "models") {
      setModels([
        ...models,
        {
          id: String(Date.now()),
          name: modalName || "Inspiron",
          firstColLabel: "Category Name",
          parentBrand: modalParentBrand || "HP",
          lastUpdated: "Dec 27, 2026",
          status: modalStatus,
        },
      ]);
    } else if (activeTab === "categories") {
      setCategories([
        ...categories,
        {
          id: String(Date.now()),
          name: modalName,
          subCategories: 0,
          description: modalDesc || "Laptops, notebooks, and portable comput...",
          lastUpdated: "Dec 27, 2026",
          status: modalStatus,
        },
      ]);
    } else if (activeTab === "warehouse") {
      setWarehouses([
        ...warehouses,
        {
          id: String(Date.now()),
          name: modalName || "Main Warehouse",
          productsLinked: 24,
          phone: modalPhone || "+1 (713) 555-0182",
          status: modalStatus,
        },
      ]);
    } else if (activeTab === "suppliers") {
      setSuppliers([
        ...suppliers,
        {
          id: String(Date.now()),
          name: modalName || "Marco Crono",
          phone: modalPhone || "+1 (713) 555-0182",
          purchases: modalSupplierPurchases || "7,860,000 CFA",
          email: modalSupplierEmail || "marcocrno2@gmail.com",
          status: modalStatus,
        },
      ]);
    } else if (activeTab === "expenses") {
      setExpenses([
        ...expenses,
        { id: String(Date.now()), name: modalName, status: modalStatus },
      ]);
    } else if (activeTab === "specialization") {
      setSpecializations([
        ...specializations,
        {
          id: String(Date.now()),
          name: modalName || "Laptop & Desktop",
          description: modalDesc || "Main storage and dispatch warehouse.",
        },
      ]);
    } else if (activeTab === "skills") {
      setSkills([
        ...skills,
        {
          id: String(Date.now()),
          name: modalName,
          description: modalDesc || "---",
        },
      ]);
    }

    setIsAddModalOpen(false);
  };

  const getModalTitle = () => {
    switch (activeTab) {
      case "brands":
        return "Add Brands";
      case "models":
        return "Add Model";
      case "categories":
        return "Add Product Category";
      case "warehouse":
        return "Add Warehouse";
      case "suppliers":
        return "Add Supplier";
      case "expenses":
        return "Add Expense Categories";
      case "specialization":
        return "Add Specialization";
      case "skills":
        return "Add Skills";
      default:
        return "Add Item";
    }
  };

  const getAddButtonText = () => {
    switch (activeTab) {
      case "brands":
        return "Add Brand";
      case "models":
        return "Add Models";
      case "categories":
        return "Add Categories";
      case "warehouse":
        return "Add Warehouse";
      case "suppliers":
        return "Add Supplier";
      case "expenses":
        return "Add Expense Category";
      case "specialization":
        return "Add Specialization";
      case "skills":
        return "Add Skills";
      default:
        return "Add Item";
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case "brands":
        return "Brand";
      case "models":
        return "Models";
      case "categories":
        return "Product Categories";
      case "warehouse":
        return "Warehouse";
      case "suppliers":
        return "Supplier";
      case "expenses":
        return "Expense Categories";
      case "specialization":
        return "Technician Specialization";
      case "skills":
        return "Technician Skills";
      case "security":
        return "Password & Security";
      case "admin":
        return "Admin Profile";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Settings" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col md:flex-row gap-6 max-w-[1680px] w-full mx-auto items-start">
          {/* Settings Left Vertical Tabs Menu */}
          <div className="w-full md:w-[240px] shrink-0 bg-white border border-[#EDEDED] rounded-[12px] p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-1 select-none">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id as SettingsTab);
                    setSearchQuery("");
                    setActiveMenuId(null);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-[8px] text-[14px] text-xs transition-all cursor-pointer ${isActive
                      ? "bg-[#FFEFE8] text-[#FF611C] font-semibold"
                      : "text-[#575765] hover:text-[#3D3D49] hover:bg-neutral-50 font-normal"
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Settings Right Main Content Panel */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            {/* Header / Table Container for List Tabs */}
            {activeTab !== "security" && activeTab !== "admin" ? (
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
                  <h2 className="font-semibold text-[#3D3D49] text-[20px]">
                    {getTabTitle()}
                  </h2>

                  <div className="flex items-center gap-3">
                    {/* Search Input Box */}
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-[180px] sm:w-[220px] h-9 pl-3.5 pr-8 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      />
                      <SearchIcon className="size-3.5 text-[#8C8C9A] absolute right-3 pointer-events-none" />
                    </div>

                    {/* Add Button */}
                    <button
                      type="button"
                      onClick={openAddModal}
                      className="h-9 px-4 rounded-[8px] text-white font-medium text-xs flex items-center gap-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:opacity-95 transition-opacity cursor-pointer shrink-0"
                      style={{
                        background:
                          "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                      }}
                    >
                      <PlusIcon className="size-3.5 text-white stroke-[2.5]" />
                      <span>{getAddButtonText()}</span>
                    </button>
                  </div>
                </div>

                {/* Tab 1: Brands List */}
                {activeTab === "brands" && (
                  <div className="flex flex-col gap-3.5">
                    {brands
                      .filter((b) =>
                        b.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((brand) => (
                        <div
                          key={brand.id}
                          className="border border-[#EDEDED] rounded-[10px] p-4 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-5 items-center gap-4 hover:border-neutral-300 transition-colors relative"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Brand Name
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {brand.name}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Products Linked
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {brand.productsLinked}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Last Updated
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {brand.lastUpdated}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Status
                            </span>
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded-[4px] bg-[#E5F4F3] text-[#009689] border border-[#009689] text-[11px] font-medium">
                                {brand.status}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-end relative">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveMenuId(
                                  activeMenuId === brand.id ? null : brand.id
                                )
                              }
                              className="size-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#8C8C9A] transition-colors cursor-pointer"
                            >
                              <MoreVerticalIcon className="size-4" />
                            </button>

                            {activeMenuId === brand.id && (
                              <div className="absolute right-0 top-9 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-40">
                                <button
                                  type="button"
                                  onClick={() => setActiveMenuId(null)}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#3D3D49] hover:bg-[#F8FAFD]"
                                >
                                  <EditIcon className="size-3.5 text-[#575765]" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setBrands(brands.filter((b) => b.id !== brand.id));
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#F92424] hover:bg-red-50"
                                >
                                  <DeleteIcon className="size-3.5 text-[#F92424]" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Tab 2: Models (Exact Mockup 1) */}
                {activeTab === "models" && (
                  <div className="flex flex-col gap-3.5">
                    {models
                      .filter(
                        (m) =>
                          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.parentBrand.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((mod) => (
                        <div
                          key={mod.id}
                          className="border border-[#EDEDED] rounded-[10px] p-4 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-5 items-center gap-4 hover:border-neutral-300 transition-colors relative"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              {mod.firstColLabel}
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {mod.name}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Parent Brand
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {mod.parentBrand}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Last Updated
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {mod.lastUpdated}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Status
                            </span>
                            <div>
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-[4px] border text-[11px] font-medium ${
                                  mod.status === "Active"
                                    ? "bg-[#E5F4F3] text-[#009689] border-[#009689]"
                                    : "bg-[#FEE9E9] text-[#F92424] border-[#F92424]"
                                }`}
                              >
                                {mod.status}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-end relative">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveMenuId(
                                  activeMenuId === mod.id ? null : mod.id
                                )
                              }
                              className="size-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#8C8C9A] transition-colors cursor-pointer"
                            >
                              <MoreVerticalIcon className="size-4" />
                            </button>

                            {activeMenuId === mod.id && (
                              <div className="absolute right-0 top-9 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-40">
                                <button
                                  type="button"
                                  onClick={() => setActiveMenuId(null)}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#3D3D49] hover:bg-[#F8FAFD]"
                                >
                                  <EditIcon className="size-3.5 text-[#575765]" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setModels(models.filter((m) => m.id !== mod.id));
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#F92424] hover:bg-red-50"
                                >
                                  <DeleteIcon className="size-3.5 text-[#F92424]" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Tab 3: Product Categories (Sub Categories removed) */}
                {activeTab === "categories" && (
                  <div className="flex flex-col gap-3.5">
                    {categories
                      .filter((c) =>
                        c.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((cat) => (
                        <div
                          key={cat.id}
                          className="border border-[#EDEDED] rounded-[10px] p-4 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-5 items-center gap-4 hover:border-neutral-300 transition-colors relative"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Category Name
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {cat.name}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1 sm:col-span-2">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Description
                            </span>
                            <span className="text-xs font-normal text-[#3D3D49] truncate">
                              {cat.description}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Last Updated
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {cat.lastUpdated}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-[4px] border text-[11px] font-medium ${
                                  cat.status === "Active"
                                    ? "bg-[#E5F4F3] text-[#009689] border-[#009689]"
                                    : "bg-[#FEE9E9] text-[#F92424] border-[#F92424]"
                                }`}
                              >
                                {cat.status}
                              </span>
                            </div>

                            <div className="relative">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(
                                    activeMenuId === cat.id ? null : cat.id
                                  );
                                }}
                                className="size-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#8C8C9A] transition-colors cursor-pointer"
                              >
                                <MoreVerticalIcon className="size-4" />
                              </button>

                              {activeMenuId === cat.id && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute right-0 top-9 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-40"
                                >
                                  <button
                                    type="button"
                                    onClick={() => setActiveMenuId(null)}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#3D3D49] hover:bg-[#F8FAFD]"
                                  >
                                    <EditIcon className="size-3.5 text-[#575765]" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCategories(
                                        categories.filter((c) => c.id !== cat.id)
                                      );
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#F92424] hover:bg-red-50"
                                  >
                                    <DeleteIcon className="size-3.5 text-[#F92424]" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}



                {/* Tab 4: Warehouse (Image Mockup 2) */}
                {activeTab === "warehouse" && (
                  <div className="flex flex-col gap-3.5">
                    {warehouses
                      .filter(
                        (w) =>
                          w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.phone.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((wh) => (
                        <div
                          key={wh.id}
                          className="border border-[#EDEDED] rounded-[10px] p-4 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-5 items-center gap-4 hover:border-neutral-300 transition-colors relative"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Warehouse Name
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {wh.name}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Products Linked
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {wh.productsLinked}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Phone
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {wh.phone}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Status
                            </span>
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded-[4px] bg-[#E5F4F3] text-[#009689] border border-[#009689] text-[11px] font-medium">
                                {wh.status}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-end relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(
                                  activeMenuId === wh.id ? null : wh.id
                                );
                              }}
                              className="size-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#8C8C9A] transition-colors cursor-pointer"
                            >
                              <MoreVerticalIcon className="size-4" />
                            </button>

                            {activeMenuId === wh.id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 top-9 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-40"
                              >
                                <button
                                  type="button"
                                  onClick={() => setActiveMenuId(null)}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#3D3D49] hover:bg-[#F8FAFD]"
                                >
                                  <EditIcon className="size-3.5 text-[#575765]" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setWarehouses(
                                      warehouses.filter((w) => w.id !== wh.id)
                                    );
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#F92424] hover:bg-red-50"
                                >
                                  <DeleteIcon className="size-3.5 text-[#F92424]" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Tab 5: Suppliers (Exact Mockup 2) */}
                {activeTab === "suppliers" && (
                  <div className="flex flex-col gap-3.5">
                    {suppliers
                      .filter(
                        (s) =>
                          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((sup) => (
                        <div
                          key={sup.id}
                          className="border border-[#EDEDED] rounded-[10px] p-4 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] grid grid-cols-2 sm:grid-cols-6 items-center gap-4 hover:border-neutral-300 transition-colors relative"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Supplier Name
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {sup.name}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Phone
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {sup.phone}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Purchases
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {sup.purchases}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Email
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49] truncate">
                              {sup.email}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Status
                            </span>
                            <div>
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-[4px] border text-[11px] font-medium ${
                                  sup.status === "Active"
                                    ? "bg-[#E5F4F3] text-[#009689] border-[#009689]"
                                    : "bg-[#FEE9E9] text-[#F92424] border-[#F92424]"
                                }`}
                              >
                                {sup.status}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-end relative">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveMenuId(
                                  activeMenuId === sup.id ? null : sup.id
                                )
                              }
                              className="size-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#8C8C9A] transition-colors cursor-pointer"
                            >
                              <MoreVerticalIcon className="size-4" />
                            </button>

                            {activeMenuId === sup.id && (
                              <div className="absolute right-0 top-9 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-40">
                                <button
                                  type="button"
                                  onClick={() => setActiveMenuId(null)}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#3D3D49] hover:bg-[#F8FAFD]"
                                >
                                  <EditIcon className="size-3.5 text-[#575765]" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSuppliers(suppliers.filter((s) => s.id !== sup.id));
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#F92424] hover:bg-red-50"
                                >
                                  <DeleteIcon className="size-3.5 text-[#F92424]" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Tab 6: Expense Categories */}
                {activeTab === "expenses" && (
                  <div className="flex flex-col gap-3.5">
                    {expenses
                      .filter((e) =>
                        e.name.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((exp) => (
                        <div
                          key={exp.id}
                          className="border border-[#EDEDED] rounded-[10px] p-4 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center justify-between gap-4 hover:border-neutral-300 transition-colors relative"
                        >
                          <div className="flex flex-col gap-1 flex-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Category Name
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {exp.name}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1 w-32">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Status
                            </span>
                            <div>
                              <span className="inline-block px-2.5 py-0.5 rounded-[4px] bg-[#E5F4F3] text-[#009689] border border-[#009689] text-[11px] font-medium">
                                {exp.status}
                              </span>
                            </div>
                          </div>

                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveMenuId(
                                  activeMenuId === exp.id ? null : exp.id
                                )
                              }
                              className="size-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#8C8C9A] transition-colors cursor-pointer"
                            >
                              <MoreVerticalIcon className="size-4" />
                            </button>

                            {activeMenuId === exp.id && (
                              <div className="absolute right-0 top-9 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-40">
                                <button
                                  type="button"
                                  onClick={() => setActiveMenuId(null)}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#3D3D49] hover:bg-[#F8FAFD]"
                                >
                                  <EditIcon className="size-3.5 text-[#575765]" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setExpenses(
                                      expenses.filter((e) => e.id !== exp.id)
                                    );
                                    setActiveMenuId(null);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#F92424] hover:bg-red-50"
                                >
                                  <DeleteIcon className="size-3.5 text-[#F92424]" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Tab 7: Technician Specialization (Exact Mockup 3) */}
                {activeTab === "specialization" && (
                  <div className="flex flex-col gap-3.5">
                    {specializations
                      .filter(
                        (s) =>
                          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.description.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((spec) => (
                        <div
                          key={spec.id}
                          className="border border-[#EDEDED] rounded-[10px] p-4 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] grid grid-cols-1 sm:grid-cols-2 items-center gap-4 hover:border-neutral-300 transition-colors relative"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Specialization Name
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {spec.name}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-col gap-1 flex-1">
                              <span className="text-[11px] text-[#8C8C9A] font-normal">
                                Description
                              </span>
                              <span className="text-xs font-normal text-[#3D3D49]">
                                {spec.description}
                              </span>
                            </div>

                            <div className="relative">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(
                                    activeMenuId === spec.id ? null : spec.id
                                  );
                                }}
                                className="size-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#8C8C9A] transition-colors shrink-0 cursor-pointer"
                              >
                                <MoreVerticalIcon className="size-4" />
                              </button>

                              {activeMenuId === spec.id && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute right-0 top-9 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-40"
                                >
                                  <button
                                    type="button"
                                    onClick={() => setActiveMenuId(null)}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#3D3D49] hover:bg-[#F8FAFD]"
                                  >
                                    <EditIcon className="size-3.5 text-[#575765]" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSpecializations(
                                        specializations.filter((s) => s.id !== spec.id)
                                      );
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#F92424] hover:bg-red-50"
                                  >
                                    <DeleteIcon className="size-3.5 text-[#F92424]" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}

                {/* Tab 8: Technician Skills (Exact Mockup 2) */}
                {activeTab === "skills" && (
                  <div className="flex flex-col gap-3.5">
                    {skills
                      .filter((sk) =>
                        sk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        sk.description.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((sk) => (
                        <div
                          key={sk.id}
                          className="border border-[#EDEDED] rounded-[10px] p-4 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] grid grid-cols-1 sm:grid-cols-2 items-center gap-4 hover:border-neutral-300 transition-colors relative"
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[11px] text-[#8C8C9A] font-normal">
                              Skill Name
                            </span>
                            <span className="text-xs font-semibold text-[#3D3D49]">
                              {sk.name}
                            </span>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-col gap-1 flex-1">
                              <span className="text-[11px] text-[#8C8C9A] font-normal">
                                Description
                              </span>
                              <span className="text-xs font-normal text-[#3D3D49]">
                                {sk.description}
                              </span>
                            </div>

                            <div className="relative">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMenuId(
                                    activeMenuId === sk.id ? null : sk.id
                                  );
                                }}
                                className="size-8 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#8C8C9A] transition-colors shrink-0 cursor-pointer"
                              >
                                <MoreVerticalIcon className="size-4" />
                              </button>

                              {activeMenuId === sk.id && (
                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute right-0 top-9 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-40"
                                >
                                  <button
                                    type="button"
                                    onClick={() => setActiveMenuId(null)}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#3D3D49] hover:bg-[#F8FAFD]"
                                  >
                                    <EditIcon className="size-3.5 text-[#575765]" />
                                    <span>Edit</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSkills(
                                        skills.filter((s) => s.id !== sk.id)
                                      );
                                      setActiveMenuId(null);
                                    }}
                                    className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-[#F92424] hover:bg-red-50"
                                  >
                                    <DeleteIcon className="size-3.5 text-[#F92424]" />
                                    <span>Delete</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}


              </div>
            ) : null}

            {/* Tab 9: Password & Security (Exact Mockup 4) */}
            {activeTab === "security" && (
              <div className="flex flex-col gap-5">
                <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-6">
                  <h2 className="font-semibold text-[#3D3D49] text-[20px]">
                    Change Passwords
                  </h2>

                  <div className="flex flex-col gap-5 max-w-4xl">
                    {/* Current Password */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#575765] font-normal">
                        Current Password *
                      </label>
                      <div className="relative flex items-center border border-[#EDEDED] rounded-[8px] bg-white focus-within:border-[#FF611C]">
                        <input
                          type={showCurrentPass ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full h-11 px-4 py-2.5 text-xs text-[#3D3D49] outline-none bg-transparent pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                          className="absolute right-3.5 text-[#8C8C9A] hover:text-[#3D3D49] cursor-pointer"
                        >
                          <svg viewBox="0 0 20 20" fill="none" className="size-4.5" stroke="currentColor" strokeWidth="1.5">
                            <path d="M10 4.5C4.5 4.5 2 10 2 10s2.5 5.5 8 5.5 8-5.5 8-5.5-2.5-5.5-8-5.5z" />
                            <circle cx="10" cy="10" r="2.5" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* New & Confirm Password Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* New Password */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-[#575765] font-normal">
                          New Password *
                        </label>
                        <div className="relative flex items-center border border-[#EDEDED] rounded-[8px] bg-white focus-within:border-[#FF611C]">
                          <input
                            type={showNewPass ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full h-11 px-4 py-2.5 text-xs text-[#3D3D49] outline-none bg-transparent pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPass(!showNewPass)}
                            className="absolute right-3.5 text-[#8C8C9A] hover:text-[#3D3D49] cursor-pointer"
                          >
                            <svg viewBox="0 0 20 20" fill="none" className="size-4.5" stroke="currentColor" strokeWidth="1.5">
                              <path d="M10 4.5C4.5 4.5 2 10 2 10s2.5 5.5 8 5.5 8-5.5 8-5.5-2.5-5.5-8-5.5z" />
                              <circle cx="10" cy="10" r="2.5" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs text-[#575765] font-normal">
                          Confirm Password *
                        </label>
                        <div className="relative flex items-center border border-[#EDEDED] rounded-[8px] bg-white focus-within:border-[#FF611C]">
                          <input
                            type={showConfirmPass ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full h-11 px-4 py-2.5 text-xs text-[#3D3D49] outline-none bg-transparent pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                            className="absolute right-3.5 text-[#8C8C9A] hover:text-[#3D3D49] cursor-pointer"
                          >
                            <svg viewBox="0 0 20 20" fill="none" className="size-4.5" stroke="currentColor" strokeWidth="1.5">
                              <path d="M10 4.5C4.5 4.5 2 10 2 10s2.5 5.5 8 5.5 8-5.5 8-5.5-2.5-5.5-8-5.5z" />
                              <circle cx="10" cy="10" r="2.5" />
                            </svg>
                          </button>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            className="text-[#FF611C] hover:underline text-xs font-normal cursor-pointer"
                          >
                            Forgot Password
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    className="px-5 py-2.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#575765] hover:text-[#3D3D49] font-medium text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-[8px] text-[#F8FAFD] font-medium text-xs shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                    }}
                  >
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* Tab 10: Admin Profile (Exact Mockup 5) */}
            {activeTab === "admin" && (
              <div className="flex flex-col gap-6">
                {/* 1. Upload Image Card */}
                <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-4">
                  <h2 className="font-semibold text-[#3D3D49] text-[20px]">
                    Upload Image
                  </h2>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {!adminImage ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`border border-dashed rounded-[10px] p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer ${
                        isDragging
                          ? "border-[#0D79E4] bg-[#E7F2FC]/30"
                          : "border-[#EDEDED] bg-[#FAFAFA]/50 hover:bg-[#FAFAFA]"
                      }`}
                    >
                      {/* Document / Upload Icon with badge */}
                      <div className="relative flex items-center justify-center size-14 rounded-lg bg-neutral-100 text-[#8C8C9A]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="size-8 text-[#A0AEC0]"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <path d="M14 2v6h6" />
                        </svg>
                        <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-[#0D79E4] text-white flex items-center justify-center shadow-sm">
                          <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            className="size-3.5 stroke-white"
                            strokeWidth="2.5"
                          >
                            <path
                              d="M10 14V6M6 10l4-4 4 4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      <p className="text-xs text-[#3D3D49]">
                        <span className="font-semibold underline cursor-pointer">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-[11px] text-[#8C8C9A]">
                        Maximum file size is 50 MB.
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {/* Uploaded Image Preview & Details Card */}
                      <div className="border border-[#EDEDED] rounded-[10px] p-4 flex items-center justify-between gap-4 bg-[#FAFAFA]/60">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="size-14 rounded-[8px] overflow-hidden border border-[#EDEDED] bg-white flex items-center justify-center shrink-0 shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={adminImage.previewUrl}
                              alt="Admin Profile Preview"
                              className="size-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium text-[#3D3D49] text-xs truncate">
                              {adminImage.name}
                            </span>
                            <span className="text-[11px] text-[#8C8C9A]">
                              Image file · {adminImage.size}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3 py-1.5 border border-[#EDEDED] bg-white hover:bg-neutral-50 rounded-[6px] text-xs font-normal text-[#575765] hover:text-[#3D3D49] transition-colors cursor-pointer"
                          >
                            Change
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setAdminImage(null);
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="px-3 py-1.5 border border-[#EDEDED] bg-white hover:bg-[#FEE9E9] rounded-[6px] text-xs font-normal text-[#F92424] hover:border-[#F92424]/30 transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Basic Details Card */}
                <div className="bg-white border border-[#EDEDED] rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-5">
                  <h2 className="font-semibold text-[#3D3D49] text-[20px]">
                    Basic Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* First Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#575765] font-normal">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={adminFirstName}
                        onChange={(e) => setAdminFirstName(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#575765] font-normal">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={adminLastName}
                        onChange={(e) => setAdminLastName(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#575765] font-normal">
                        Email
                      </label>
                      <input
                        type="email"
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-[#575765] font-normal">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                        className="w-full h-11 px-4 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    className="px-5 py-2.5 bg-white hover:bg-neutral-50 border border-[#EDEDED] rounded-[8px] text-[#575765] hover:text-[#3D3D49] font-medium text-xs transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-[8px] text-[#F8FAFD] font-medium text-xs shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition-opacity cursor-pointer"
                    style={{
                      background:
                        "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Item Modal (Exact Mockups 1-5) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[12px] border border-[#EDEDED] p-6 max-w-[440px] w-full shadow-2xl flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#3D3D49] text-[16px]">
                {getModalTitle()}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#8C8C9A] hover:text-[#3D3D49] p-1 rounded-md transition cursor-pointer"
              >
                <svg
                  className="size-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleAddItem} className="flex flex-col gap-4">
              {/* Tab 1: Add Brands (Mockup 1) */}
              {activeTab === "brands" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dell"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Status *
                    </label>
                    <div className="relative">
                      <select
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
                        className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}

              {/* Tab 2: Add Model (Image 1 Mockup) */}
              {activeTab === "models" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Model Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Inspiron"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Parent Brand
                    </label>
                    <div className="relative">
                      <select
                        value={modalParentBrand}
                        onChange={(e) => setModalParentBrand(e.target.value)}
                        className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="HP">HP</option>
                        <option value="Dell">Dell</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Toshiba">Toshiba</option>
                        <option value="Acer">Acer</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Status *
                    </label>
                    <div className="relative">
                      <select
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
                        className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}

              {/* Tab 3: Add Product Category */}
              {activeTab === "categories" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Category Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dell"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Status *
                    </label>
                    <div className="relative">
                      <select
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
                        className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}



              {/* Tab 4: Add Warehouse (Mockup 4) */}
              {activeTab === "warehouse" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Warehouse Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Main Warehouse"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Phone
                    </label>
                    <input
                      type="text"
                      placeholder="+1 (713) 555-0182"
                      value={modalPhone}
                      onChange={(e) => setModalPhone(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="125 Industrial Avenue, Houston, TX"
                      value={modalAddress}
                      onChange={(e) => setModalAddress(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Status *
                    </label>
                    <div className="relative">
                      <select
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
                        className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}

              {/* Tab: Add Supplier (Image 2 Mockup) */}
              {activeTab === "suppliers" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Supplier Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Marco Crono"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Phone
                    </label>
                    <input
                      type="text"
                      placeholder="+1 (713) 555-0182"
                      value={modalPhone}
                      onChange={(e) => setModalPhone(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="marcocrno2@gmail.com"
                      value={modalSupplierEmail}
                      onChange={(e) => setModalSupplierEmail(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Status *
                    </label>
                    <div className="relative">
                      <select
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
                        className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}

              {/* Tab 5: Add Expense Categories (Mockup 5) */}
              {activeTab === "expenses" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Category Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Software & Subscriptions"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Status *
                    </label>
                    <div className="relative">
                      <select
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
                        className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}

              {/* Tab: Add Specialization (Image 3 Mockup) */}
              {activeTab === "specialization" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Specialization Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Laptop & Desktop"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="Main storage and dispatch warehouse."
                      value={modalDesc}
                      onChange={(e) => setModalDesc(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Status *
                    </label>
                    <div className="relative">
                      <select
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
                        className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}

              {/* Tab 7: Add Skills */}
              {activeTab === "skills" && (
                <>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Skill Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Screen Replacement"
                      value={modalName}
                      onChange={(e) => setModalName(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Description
                    </label>
                    <input
                      type="text"
                      placeholder="Best for internal repair"
                      value={modalDesc}
                      onChange={(e) => setModalDesc(e.target.value)}
                      className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Status *
                    </label>
                    <div className="relative">
                      <select
                        value={modalStatus}
                        onChange={(e) => setModalStatus(e.target.value)}
                        className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </>
              )}



              {/* Modal Action Buttons: Cancel and Add (Exact Mockup Layout) */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-full h-11 rounded-[8px] border border-[#EDEDED] bg-white text-[13px] font-normal text-[#3D3D49] hover:bg-neutral-50 transition cursor-pointer flex items-center justify-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full h-11 rounded-[8px] text-[13px] font-medium text-white flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:opacity-95 transition cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                  }}
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
