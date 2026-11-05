"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";

// Dynamically import ReactApexChart to prevent SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[290px] flex items-center justify-center text-neutral-400">
      Loading chart...
    </div>
  ),
});

export default function ClicksPerMonthCard() {
  const [activeTab, setActiveTab] = useState("Monthly");

  const categories = [
    "June 1",
    "June 3",
    "June 5",
    "June 7",
    "June 9",
    "June 11",
    "June 13",
    "June 15",
    "June 17",
    "June 19",
    "June 21",
    "June 23",
    "June 25",
    "June 27",
    "June 29",
  ];

  const series = [
    {
      name: "Clicks / Revenue",
      data: [
        500, 2200, 1180, 1250, 1380, 2050, 1500, 1050, 2820, 1580, 2020, 1480,
        980, 2750, 1500,
      ],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: 290,
      toolbar: { show: false },
      zoom: { enabled: false },
      parentHeightOffset: 0,
      fontFamily: "var(--font-geist-sans), sans-serif",
    },
    colors: ["#FF611C"],
    dataLabels: { enabled: false },
    stroke: {
      curve: "smooth",
      width: 2.5,
      colors: ["#FF611C"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.35,
        opacityTo: 0.02,
        stops: [0, 95, 100],
        colorStops: [
          { offset: 0, color: "#FF611C", opacity: 0.35 },
          { offset: 100, color: "#FF611C", opacity: 0.0 },
        ],
      },
    },
    grid: {
      borderColor: "#EDEDED",
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 10, right: 20, bottom: 0, left: 10 },
    },
    xaxis: {
      categories: categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#50515D",
          fontSize: "12px",
          fontWeight: 400,
          fontFamily: "var(--font-geist-sans), sans-serif",
        },
      },
    },
    yaxis: {
      min: 500,
      max: 3000,
      tickAmount: 5,
      labels: {
        formatter: (val) => (val != null ? `${val.toLocaleString()} CFA` : ""),
        style: {
          colors: "#50515D",
          fontSize: "13px",
          fontWeight: 500,
          fontFamily: "var(--font-geist-sans), sans-serif",
        },
      },
    },
    tooltip: {
      theme: "light",
      x: { show: true },
      y: {
        formatter: (val) => (val != null ? `${val.toLocaleString()} CFA` : ""),
      },
    },
  };

  return (
    <div
      className="bg-white border border-[#EDEDED] rounded-[12px] overflow-hidden flex flex-col shadow-[0_1px_3px_rgba(0,0,0,0.02)] h-full"
      data-node-id="6026:2062"
    >
      {/* Header */}
      <div className="min-h-[52px] px-4 py-3 border-b border-[#EDEDED] flex items-center justify-between gap-4">
        <h3 className="font-medium text-[#575765] text-[20px]">
          Clicks per Month
        </h3>

        {/* Tab Controls */}
        <div className="bg-white border border-[#EDEDED] rounded-[6px] p-[2px] flex items-center gap-[2px]">
          {["Daily", "Text", "Text"].map((tab, idx) => {
            const isLast = idx === 2;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(tab)}
                className={`px-2.5 py-1 text-[11px] rounded-[4px] font-normal transition-all cursor-pointer ${
                  isLast
                    ? "bg-[#FF611C] text-white shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.5)] font-medium"
                    : "text-[#575765] hover:bg-neutral-100 bg-white"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Row */}
      <div className="p-4 border-b border-[#EDEDED] grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="font-normal text-[#575765] text-[11px]">
            Total Sales
          </span>
          <span className="font-medium text-[#3D3D49] text-[11px]">
            25.6M CFA
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-normal text-[#575765] text-[11px]">
            Avg Order Value
          </span>
          <span className="font-medium text-[#3D3D49] text-[11px]">
            103K CFA
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-normal text-[#575765] text-[11px]">
            Total Transactions
          </span>
          <span className="font-medium text-[#3D3D49] text-[11px]">
            249
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="flex-1 px-2 pt-4 pb-2">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={320}
        />
      </div>
    </div>
  );
}
