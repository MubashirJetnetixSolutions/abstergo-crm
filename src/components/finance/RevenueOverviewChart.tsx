"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import { CalendarIcon } from "@/components/icons/Icons";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[360px] flex items-center justify-center text-neutral-400">
      Loading chart...
    </div>
  ),
});

export default function RevenueOverviewChart() {
  const [dateRange] = useState("Aug 1, 2026 - Aug 31, 2026");

  const series = [
    {
      name: "Revenue",
      data: [2800, 1100, 1400, 2600, 1600, 2200, 2900, 2300, 1100, 2500, 700, 2000],
    },
    {
      name: "Expenses",
      data: [1100, 400, 550, 1050, 650, 900, 1150, 900, 400, 1000, 300, 800],
    },
    {
      name: "Net Profit",
      data: [1900, 700, 950, 1800, 1100, 1500, 2000, 1550, 700, 1700, 450, 1300],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 360,
      toolbar: { show: false },
      fontFamily: "var(--font-geist-sans), sans-serif",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    colors: ["#8247FF", "#FF611C", "#1E75FF"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#8C8C9A",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 3000,
      tickAmount: 6,
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
        style: {
          colors: "#8C8C9A",
          fontSize: "12px",
          fontWeight: 500,
        },
      },
    },
    grid: {
      borderColor: "#F1F3F5",
      strokeDashArray: 0,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => (val != null ? `${val.toLocaleString()} CFA` : ""),
      },
    },
    legend: {
      show: false,
    },
  };

  return (
    <div className="rounded-[12px] border border-[#E9ECEF] bg-white p-6 shadow-sm flex flex-col gap-6">
      {/* Chart Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-[20px] font-medium text-[#575765] ">
          Revenue Overview
        </h2>

        <div className="flex items-center gap-2 rounded-[8px] border border-[#E9ECEF] bg-white px-3.5 py-1.5 text-xs font-medium text-[#575765] shadow-sm">
          <CalendarIcon className="size-4 text-[#8C8C9A]" />
          <span>{dateRange}</span>
        </div>
      </div>

      {/* Legend Row */}
      <div className="flex flex-wrap items-center gap-8 text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="size-3.5 rounded-[3px] bg-[#8247FF]" />
          <span className="text-[#3D3D49]">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-3.5 rounded-[3px] bg-[#FF611C]" />
          <span className="text-[#3D3D49]">Expenses</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-3.5 rounded-[3px] bg-[#1E75FF]" />
          <span className="text-[#3D3D49]">Net Profit</span>
        </div>
      </div>

      {/* ApexChart Bar Graph */}
      <div className="w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={360}
        />
      </div>
    </div>
  );
}
