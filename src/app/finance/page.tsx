"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import FinanceOverviewTab from "@/components/finance/FinanceOverviewTab";
import FinanceProductsAnalyticsTab from "@/components/finance/FinanceProductsAnalyticsTab";
import FinanceProfitAnalysisTab from "@/components/finance/FinanceProfitAnalysisTab";
import FinanceSalesRepTab from "@/components/finance/FinanceSalesRepTab";
import EditBankModal, { BankAccount } from "@/components/finance/EditBankModal";

type FinanceTabKey = "overview" | "products" | "profit" | "sales-rep";

interface TabOption {
  key: FinanceTabKey;
  label: string;
}

const FINANCE_TABS: TabOption[] = [
  { key: "overview", label: "Overview" },
  { key: "products", label: "Products Analytics" },
  { key: "profit", label: "Profit Analysis" },
  { key: "sales-rep", label: "Sales Rep Performance" },
];

const INITIAL_BANKS: BankAccount[] = [
  {
    id: "1",
    name: "HDFB Bank",
    accountType: "Main Account",
    amount: 4280000,
    percentage: 40,
    color: "#009689",
  },
  {
    id: "2",
    name: "Standard Chartered",
    accountType: "Operations Account",
    amount: 4280000,
    percentage: 40,
    color: "#8A58FF",
  },
  {
    id: "3",
    name: "Ecobank",
    accountType: "Reserve Account",
    amount: 3890000,
    percentage: 20,
    color: "#EDAC00",
  },
];

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<FinanceTabKey>("overview");
  const [banks, setBanks] = useState<BankAccount[]>(INITIAL_BANKS);
  const [editingBank, setEditingBank] = useState<BankAccount | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Total treasure computed or default: 12,450,000 CFA
  const totalTreasure = banks.reduce((sum, b) => sum + b.amount, 0);

  const handleOpenEdit = (bank: BankAccount) => {
    setEditingBank(bank);
    setIsEditModalOpen(true);
  };

  const handleSaveBankAmount = (bankId: string, newAmount: number) => {
    setBanks((prev) => {
      const updated = prev.map((b) =>
        b.id === bankId ? { ...b, amount: newAmount } : b
      );
      const newTotal = updated.reduce((sum, b) => sum + b.amount, 0);
      return updated.map((b) => ({
        ...b,
        percentage: newTotal > 0 ? Math.round((b.amount / newTotal) * 100) : 0,
      }));
    });
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Finance" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Tab Navigation */}
          <div className="border border-[#EDEDED] bg-white rounded-[8px] px-4 flex items-center gap-8 text-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            {FINANCE_TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`py-3 text-[13px] font-medium transition cursor-pointer border-b-2 ${
                    isActive
                      ? "text-[#FF611C] border-[#FF611C]"
                      : "text-[#575765] border-transparent hover:text-[#1D1E2C]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Active Tab View */}
          {activeTab === "overview" && (
            <FinanceOverviewTab
              banks={banks}
              totalTreasure={totalTreasure || 12450000}
              onEditBank={handleOpenEdit}
            />
          )}

          {activeTab === "products" && <FinanceProductsAnalyticsTab />}

          {activeTab === "profit" && <FinanceProfitAnalysisTab />}

          {activeTab === "sales-rep" && <FinanceSalesRepTab />}
        </main>
      </div>

      {/* Edit Bank Amount Modal */}
      <EditBankModal
        isOpen={isEditModalOpen}
        bank={editingBank}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingBank(null);
        }}
        onSave={handleSaveBankAmount}
      />
    </div>
  );
}
