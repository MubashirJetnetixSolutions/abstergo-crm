"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SearchIcon,
  FilterIcon,
  MoreVerticalIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/components/icons/Icons";

interface TechnicianRow {
  id: string;
  code: string;
  name: string;
  initials: string;
  avatarColor: string;
  phone: string;
  specialization: string;
  repairs: number;
  orders: number;
  sales: number;
  paymentsReceived: string;
  status: "Active" | "Inactive";
}

const TECHNICIANS_DATA: TechnicianRow[] = [
  {
    id: "1",
    code: "TECH-001",
    name: "Kwesi Boateng-Achea...",
    initials: "KB",
    avatarColor: "bg-purple-100 text-purple-700",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Active",
  },
  {
    id: "2",
    code: "TECH-001",
    name: "Marcus Trescothik",
    initials: "MT",
    avatarColor: "bg-blue-100 text-blue-700",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Active",
  },
  {
    id: "3",
    code: "TECH-001",
    name: "Marcus Trescothik",
    initials: "MT",
    avatarColor: "bg-orange-100 text-orange-700",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Active",
  },
  {
    id: "4",
    code: "TECH-001",
    name: "Marcus Trescothik",
    initials: "MT",
    avatarColor: "bg-blue-100 text-blue-700",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Active",
  },
  {
    id: "5",
    code: "TECH-001",
    name: "Marcus Trescothik",
    initials: "MT",
    avatarColor: "bg-teal-100 text-teal-700",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Active",
  },
  {
    id: "6",
    code: "TECH-001",
    name: "Kwesi Boateng-Achea...",
    initials: "KB",
    avatarColor: "bg-orange-100 text-orange-700",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Active",
  },
  {
    id: "7",
    code: "TECH-001",
    name: "Abena Osei-Bonsu",
    initials: "AO",
    avatarColor: "bg-teal-100 text-teal-700",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Inactive",
  },
  {
    id: "8",
    code: "TECH-001",
    name: "Marcus Trescothik",
    initials: "MT",
    avatarColor: "bg-orange-100 text-orange-700",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Active",
  },
  {
    id: "9",
    code: "TECH-001",
    name: "Kwesi Boateng-Achea...",
    initials: "KB",
    avatarColor: "bg-amber-100 text-amber-700",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Active",
  },
  {
    id: "10",
    code: "TECH-001",
    name: "Abena Osei-Bonsu",
    initials: "AO",
    avatarColor: "bg-purple-100 text-purple-700",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Inactive",
  },
  {
    id: "11",
    code: "TECH-001",
    name: "Kwesi Boateng-Achea...",
    initials: "KB",
    avatarColor: "bg-blue-100 text-blue-700",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Active",
  },
  {
    id: "12",
    code: "TECH-001",
    name: "Abena Osei-Bonsu",
    initials: "AO",
    avatarColor: "bg-amber-100 text-amber-700",
    phone: "+233 24 500 1234",
    specialization: "Laptop & Desktop",
    repairs: 6,
    orders: 5,
    sales: 14,
    paymentsReceived: "160,000.00 CFA",
    status: "Inactive",
  },
];

export default function TechniciansTable() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState("10");

  const filteredData = TECHNICIANS_DATA.filter((row) =>
    `${row.code} ${row.name} ${row.phone} ${row.specialization} ${row.status}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-[12px] border border-[#E9ECEF] bg-white shadow-sm overflow-hidden flex flex-col">
      {/* Table Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-[#E9ECEF]">
        <h2 className="text-[20px] font-semibold text-[#3D3D49]">
          Technicians
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              className="flex items-center gap-2 rounded-[8px] border border-[#E9ECEF] bg-white px-3 py-2 text-[#575765] hover:bg-gray-50"
            >
              <span>All Stages</span>
              <ChevronDownIcon className="size-3.5 text-[#8C8C9A]" />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-[8px] border border-[#E9ECEF] bg-white px-3 py-2 text-[#575765] hover:bg-gray-50"
            >
              <span>All Sources</span>
              <ChevronDownIcon className="size-3.5 text-[#8C8C9A]" />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-[8px] border border-[#E9ECEF] bg-white px-3 py-2 text-[#575765] hover:bg-gray-50"
            >
              <span>High Priority</span>
              <ChevronDownIcon className="size-3.5 text-[#8C8C9A]" />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 rounded-[8px] border border-[#E9ECEF] bg-white px-3 py-2 text-[#575765] hover:bg-gray-50"
            >
              <span>All Technicians</span>
              <ChevronDownIcon className="size-3.5 text-[#8C8C9A]" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[28px] w-[160px] rounded-[8px] border border-[#E9ECEF] bg-white pl-8 pr-3 text-xs text-[#3D3D49] shadow-sm outline-none focus:border-gray-900 transition"
            />
            <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#8C8C9A]" />
          </div>

          <button
            type="button"
            className="flex h-[28px] items-center gap-1.5 rounded-[8px] border border-[#E9ECEF] bg-white px-3 text-xs font-medium text-[#575765] shadow-sm hover:bg-gray-50 transition"
          >
            <FilterIcon className="size-3.5 text-[#575765]" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E9ECEF] bg-[#F8FAFD] text-[#8C8C9A] font-medium uppercase tracking-wider">
            <tr>
              <th className="py-3.5 px-4 font-semibold">ID</th>
              <th className="py-3.5 px-4 font-semibold">Technician</th>
              <th className="py-3.5 px-4 font-semibold">Phone</th>
              <th className="py-3.5 px-4 font-semibold">Specialization</th>
              <th className="py-3.5 px-4 font-semibold">Repairs</th>
              <th className="py-3.5 px-4 font-semibold">Orders</th>
              <th className="py-3.5 px-4 font-semibold">Sales</th>
              <th className="py-3.5 px-4 font-semibold">Payments Received</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9ECEF]">
            {filteredData.map((row) => (
              <tr
                key={row.id}
                onClick={() => router.push(`/technicians/${row.code}`)}
                className="hover:bg-gray-50/75 transition cursor-pointer"
              >
                <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                  {row.code}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex size-7 items-center justify-center rounded-full text-xs font-bold ${row.avatarColor}`}
                    >
                      {row.initials}
                    </div>
                    <span className="font-medium text-[#3D3D49]">
                      {row.name}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-[#575765]">{row.phone}</td>
                <td className="py-3.5 px-4 text-[#575765]">
                  {row.specialization}
                </td>
                <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                  {row.repairs}
                </td>
                <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                  {row.orders}
                </td>
                <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                  {row.sales}
                </td>
                <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">
                  {row.paymentsReceived}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                      row.status === "Active"
                        ? "bg-[#E5F4F3] text-[#0D9488] border border-[#A7DFDB]"
                        : "bg-[#FFF0F0] text-[#E02D3C] border border-[#FFD5D8]"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td
                  className="py-3.5 px-4 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                  >
                    <MoreVerticalIcon className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-t border-[#E9ECEF] text-xs text-[#8C8C9A]">
        <div className="flex items-center gap-2">
          <span>Per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
            className="rounded-[6px] border border-[#E9ECEF] bg-white px-2 py-1 text-xs text-[#3D3D49] outline-none"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex size-7 items-center justify-center rounded-[6px] border border-[#E9ECEF] bg-white text-[#575765] hover:bg-gray-50 disabled:opacity-50"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <span className="px-2 font-medium text-[#3D3D49]">
            Page 25
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p + 1)}
            className="flex size-7 items-center justify-center rounded-[6px] border border-[#E9ECEF] bg-white text-[#575765] hover:bg-gray-50"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
