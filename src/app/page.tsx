import React from "react";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import OverviewSection from "@/components/OverviewSection";
import ClicksPerMonthCard from "@/components/ClicksPerMonthCard";
import SalesTeamPerformanceCard from "@/components/SalesTeamPerformanceCard";
import OutstandingPaymentsCard from "@/components/OutstandingPaymentsCard";
import PendingDeliveriesCard from "@/components/PendingDeliveriesCard";
import RepairOverviewCard from "@/components/RepairOverviewCard";
import InventoryAlertsCard from "@/components/InventoryAlertsCard";
import RecentActivityCard from "@/components/RecentActivityCard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="Dashboard" />

        {/* Dashboard Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-8 max-w-[1680px] w-full mx-auto">
          {/* Section 1: Overview */}
          <OverviewSection />

          {/* Section 2: Performance Analytics */}
          <section className="w-full flex flex-col gap-6" data-node-id="6026:1985">
            <h2 className="font-medium text-[#575765] text-[20px] leading-none">
              Performance Analytics
            </h2>

            {/* Row 1: Clicks per Month + Sales Team Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 xl:col-span-7 h-full">
                <ClicksPerMonthCard />
              </div>
              <div className="lg:col-span-5 xl:col-span-5 h-full">
                <SalesTeamPerformanceCard />
              </div>
            </div>

            {/* Row 2: Outstanding Payments + Pending Deliveries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <div className="h-full">
                <OutstandingPaymentsCard />
              </div>
              <div className="h-full">
                <PendingDeliveriesCard />
              </div>
            </div>

            {/* Row 3: Repair Overview + Inventory Alerts + Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
              <div className="h-full">
                <RepairOverviewCard />
              </div>
              <div className="h-full">
                <InventoryAlertsCard />
              </div>
              <div className="h-full md:col-span-2 xl:col-span-1">
                <RecentActivityCard />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
