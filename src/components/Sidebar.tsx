"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AbstergoLogo,
  DashboardIcon,
  CustomersIcon,
  ProductsIcon,
  OrdersIcon,
  SalesIcon,
  QuotationsIcon,
  InvoicesIcon,
  WarrantyIcon,
  PurchasesIcon,
  RepairsIcon,
  DeliveriesIcon,
  ExpenseIcon,
  FinanceIcon,
  LeadsPipelineIcon,
  EmailTemplatesIcon,
  TechniciansIcon,
  HrEmployeesIcon,
  SettingsIcon,
  ChevronSelectorIcon,
} from "./icons/Icons";

interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const businessItems: NavItem[] = [
  { id: "dashboard", name: "Dashboard", href: "/", icon: DashboardIcon },
  { id: "customers", name: "Customers", href: "/customers", icon: CustomersIcon },
  { id: "products", name: "Products", href: "/products", icon: ProductsIcon },
  { id: "orders", name: "Orders", href: "/orders", icon: OrdersIcon },
  { id: "sales", name: "Sales", href: "/sales", icon: SalesIcon },
  { id: "quotations", name: "Quotations", href: "/quotations", icon: QuotationsIcon },
  { id: "invoices", name: "Invoices", href: "/invoices", icon: InvoicesIcon },
  { id: "warranty", name: "Warranty", href: "/warranties", icon: WarrantyIcon },
  { id: "purchases", name: "Purchases", href: "/purchases", icon: PurchasesIcon },
  { id: "repairs", name: "Repairs", href: "/repairs", icon: RepairsIcon },
  { id: "deliveries", name: "Deliveries", href: "/deliveries", icon: DeliveriesIcon },
  { id: "expense", name: "Expense", href: "/expense", icon: ExpenseIcon },
  { id: "finance", name: "Finance", href: "/finance", icon: FinanceIcon },
];

const managementItems: NavItem[] = [
  { id: "leads", name: "Leads Pipeline", href: "/leads", icon: LeadsPipelineIcon },
  { id: "email", name: "Email Templates", href: "/email-templates", icon: EmailTemplatesIcon },
  { id: "employees", name: "Employees", href: "/employees", icon: TechniciansIcon },
  { id: "hr", name: "HR", href: "/hr", icon: HrEmployeesIcon },
  { id: "settings", name: "Settings", href: "/settings", icon: SettingsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-[220px] fixed shrink-0 min-h-screen bg-[#2B2523] h-100 flex flex-col select-none border-r border-[#3d3633]"
      data-node-id="6039:399"
      data-name="SideBar"
    >
      {/* Brand Header */}
      <div className="p-2 h-[64px] w-full shrink-0">
        <Link
          href="/"
          className="h-full w-full bg-[#2B2523] border-[0.5px] border-[rgba(101,91,87,0.4)] rounded-[8px] flex items-center px-3.5 gap-3 relative overflow-hidden"
        >
          {/* Subtle gradient background glow */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#ff611c]/15 to-transparent pointer-events-none" />

          <AbstergoLogo className="size-8 shrink-0" />

          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-white text-[13px] tracking-wide uppercase font-sans">
              Abstergo
            </span>
            <span className="font-semibold text-white/90 text-[11px] tracking-wider uppercase font-sans">
              CRM
            </span>
          </div>
        </Link>
      </div>

      {/* Nav List */}
      <div className="flex-1 flex flex-col gap-1 px-0 py-3 overflow-y-auto">
        {/* Business Group */}
        <div className="flex flex-col gap-1.5 pb-2">
          <div className="px-4 py-1">
            <p className="font-medium text-[#E9EDF2] text-[12px] opacity-70">
              Business
            </p>
          </div>

          <div className="flex flex-col gap-1 w-full">
            {businessItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (isActive) {
                return (
                  <div key={item.id} className="relative px-2.5 w-full flex items-center">
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FF611C] rounded-r-[4px]" />
                    <Link
                      href={item.href}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-[8px] border border-[#FF611C] text-left transition-all relative overflow-hidden"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(255, 97, 28, 0.16) 0%, rgba(255, 97, 28, 0.05) 100%), linear-gradient(90deg, rgb(48, 44, 42) 0%, rgb(48, 44, 42) 100%)",
                      }}
                    >
                      <div className="size-5 shrink-0 flex items-center justify-center text-white">
                        <Icon className="size-5 text-white" />
                      </div>
                      <span className="text-[#F8FAFD] text-[13px] font-medium leading-none truncate">
                        {item.name}
                      </span>
                    </Link>
                  </div>
                );
              }

              return (
                <div key={item.id} className="px-2.5 w-full">
                  <Link
                    href={item.href}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-[8px] bg-transparent hover:bg-[rgba(73,65,61,0.4)] border border-transparent hover:border-[rgba(101,91,87,0.4)] text-left transition-all text-white group"
                  >
                    <div className="size-5 shrink-0 flex items-center justify-center text-white/90 group-hover:text-white">
                      <Icon className="size-5 text-white/90 group-hover:text-white" />
                    </div>
                    <span className="text-[#F8FAFD]/90 group-hover:text-white text-[13px] font-normal leading-none truncate">
                      {item.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Management Group */}
        <div className="flex flex-col gap-1.5 pt-2 pb-4">
          <div className="px-4 py-1">
            <p className="font-medium text-[#E9EDF2] text-[12px] opacity-70">
              Management
            </p>
          </div>

          <div className="flex flex-col gap-1 w-full">
            {managementItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname.startsWith(item.href) ||
                (item.id === "employees" && pathname.startsWith("/technicians"));

              if (isActive) {
                return (
                  <div key={item.id} className="relative px-2.5 w-full flex items-center">
                    <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FF611C] rounded-r-[4px]" />
                    <Link
                      href={item.href}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-[8px] border border-[#FF611C] text-left transition-all relative overflow-hidden"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, rgba(255, 97, 28, 0.16) 0%, rgba(255, 97, 28, 0.05) 100%), linear-gradient(90deg, rgb(48, 44, 42) 0%, rgb(48, 44, 42) 100%)",
                      }}
                    >
                      <div className="size-5 shrink-0 flex items-center justify-center text-white">
                        <Icon className="size-5 text-white" />
                      </div>
                      <span className="text-[#F8FAFD] text-[13px] font-medium leading-none truncate">
                        {item.name}
                      </span>
                    </Link>
                  </div>
                );
              }

              return (
                <div key={item.id} className="px-2.5 w-full">
                  <Link
                    href={item.href}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-[8px] bg-transparent hover:bg-[rgba(73,65,61,0.4)] border border-transparent hover:border-[rgba(101,91,87,0.4)] text-left transition-all text-white group"
                  >
                    <div className="size-5 shrink-0 flex items-center justify-center text-white/90 group-hover:text-white">
                      <Icon className="size-5 text-white/90 group-hover:text-white" />
                    </div>
                    <span className="text-[#F8FAFD]/90 group-hover:text-white text-[13px] font-normal leading-none truncate">
                      {item.name}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-2.5 w-full shrink-0 border-t border-[rgba(101,91,87,0.3)]">
        <div className="bg-[rgba(73,65,61,0.4)] border border-[rgba(101,91,87,0.5)] rounded-[8px] px-2.5 py-2 flex items-center justify-between gap-2 hover:bg-[rgba(73,65,61,0.6)] cursor-pointer transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-8 rounded-[6px] overflow-hidden shrink-0 relative bg-neutral-800">
              <Image
                src="/avatar.jpg"
                alt="Michael Jos"
                width={32}
                height={32}
                className="size-full object-cover object-top"
              />
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <span className="font-medium text-[#F8FAFD] text-[12px] truncate">
                Michael Jos
              </span>
              <span className="text-[#E9EDF2] text-[11px] opacity-80 truncate font-normal">
                Administrator
              </span>
            </div>
          </div>
          <div className="size-4 shrink-0 text-[#E9EDF2]/80">
            <ChevronSelectorIcon className="size-4" />
          </div>
        </div>
      </div>
    </aside>
  );
}

