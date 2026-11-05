"use client";

import React from "react";
import FinanceOverviewStatCards from "./FinanceOverviewStatCards";
import TreasureOverview from "./TreasureOverview";
import RevenueOverviewChart from "./RevenueOverviewChart";
import RecentTransactionsTable from "./RecentTransactionsTable";
import FinanceBottomGrids from "./FinanceBottomGrids";
import { BankAccount } from "./EditBankModal";

interface FinanceOverviewTabProps {
  banks: BankAccount[];
  totalTreasure: number;
  onEditBank: (bank: BankAccount) => void;
}

export default function FinanceOverviewTab({
  banks,
  totalTreasure,
  onEditBank,
}: FinanceOverviewTabProps) {
  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Section 1: Finance Overview */}
      <div className="flex flex-col gap-4">
        <h2 className="text-[20px] font-semibold text-[#1D1E2C]">
          Finance Overview
        </h2>
        <FinanceOverviewStatCards />
      </div>

      {/* Section 2: Treasure Overview */}
      <TreasureOverview
        banks={banks}
        totalAvailable={totalTreasure}
        onEditBank={onEditBank}
      />

      {/* Section 3: Performance Analytics */}
      <div className="flex flex-col gap-6">
        <h2 className="text-[20px] font-semibold text-[#1D1E2C]">
          Performance Analytics
        </h2>

        {/* Revenue Overview Bar Chart using ApexCharts */}
        <RevenueOverviewChart />

        {/* Recent Transactions Table */}
        <RecentTransactionsTable />
      </div>

      {/* Section 4: Bottom 3 Insights Grids */}
      <FinanceBottomGrids />
    </div>
  );
}
