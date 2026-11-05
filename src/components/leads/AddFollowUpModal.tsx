"use client";

import React, { useState } from "react";
import { CheckmarkCircleIcon } from "@/components/icons/Icons";

interface AddFollowUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmailOrNotes?: string;
}

export default function AddFollowUpModal({
  isOpen,
  onClose,
  defaultEmailOrNotes = "kwame.mensah@mensahent.gh",
}: AddFollowUpModalProps) {
  const [activityType, setActivityType] = useState("Call");
  const [date, setDate] = useState("2026-08-09");
  const [time, setTime] = useState("10:00");
  const [result, setResult] = useState("Interested");
  const [notes, setNotes] = useState(defaultEmailOrNotes);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[12px] border border-[#EDEDED] p-6 max-w-[460px] w-full shadow-xl flex flex-col gap-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EDEDED]">
          <h3 className="font-semibold text-[#3D3D49] text-base">
            Add Follow-up
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-[#8C8C9A] hover:text-[#3D3D49] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex flex-col gap-4 text-xs">
          {/* 1. Activity Details */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-[#3D3D49] text-[14px]">
              Activity Details
            </h4>

            {/* Activity Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#575765] font-normal">
                Activity Type
              </label>
              <div className="relative">
                <select
                  value={activityType}
                  onChange={(e) => setActivityType(e.target.value)}
                  className="w-full border border-[#EDEDED] rounded-[8px] px-3.5 py-2.5 text-[#3D3D49] text-xs bg-white outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                >
                  <option value="Call">Call</option>
                  <option value="Email">Email</option>
                  <option value="Appointment">Appointment</option>
                  <option value="Meeting">Meeting</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#575765]">
                  <svg viewBox="0 0 20 20" fill="none" className="size-4" stroke="currentColor">
                    <path d="M5 7.5l5 5 5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-2 gap-3">
              {/* Date Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#575765] font-normal">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-[#EDEDED] rounded-[8px] px-3.5 py-2 text-[#3D3D49] text-xs bg-white outline-none focus:border-[#FF611C] cursor-pointer"
                />
              </div>

              {/* Time Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[#575765] font-normal">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border border-[#EDEDED] rounded-[8px] px-3.5 py-2 text-[#3D3D49] text-xs bg-white outline-none focus:border-[#FF611C] cursor-pointer"
                />
              </div>
            </div>

            {/* Result */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#575765] font-normal">Result</label>
              <div className="relative">
                <select
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  className="w-full border border-[#EDEDED] rounded-[8px] px-3.5 py-2.5 text-[#3D3D49] text-xs bg-white outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                >
                  <option value="Interested">Interested</option>
                  <option value="Appointment Booked">Appointment Booked</option>
                  <option value="Not-Interested">Not-Interested</option>
                  <option value="Follow-up Required">Follow-up Required</option>
                  <option value="Converted">Converted</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#575765]">
                  <svg viewBox="0 0 20 20" fill="none" className="size-4" stroke="currentColor">
                    <path d="M5 7.5l5 5 5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Additionl Details */}
          <div className="flex flex-col gap-3 pt-1">
            <h4 className="font-semibold text-[#3D3D49] text-[14px]">
              Additionl Details
            </h4>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#575765] font-normal">
                Meeting Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border border-[#EDEDED] rounded-[8px] p-3 text-xs text-[#3D3D49] outline-none focus:border-[#FF611C] resize-none"
              />
            </div>

            {/* Warning / Notice Box */}
            <div className="bg-[#FFF0EB] border border-[#FFD8CC] rounded-[6px] p-2.5 flex items-center gap-2 text-xs text-[#FF611C]">
              <svg viewBox="0 0 20 20" fill="none" className="size-4 text-[#FF611C] shrink-0" stroke="currentColor" strokeWidth="1.5">
                <circle cx="10" cy="10" r="7" />
                <path d="M10 7v3.5M10 13.5h.01" strokeLinecap="round" />
              </svg>
              <span>
                Follow-ups are recorded here for tracking but handled externally.
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#EDEDED]">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-[8px] border border-[#EDEDED] bg-white text-sm font-medium text-[#575765] hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-[8px] text-sm font-medium text-white flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition cursor-pointer"
            style={{
              background:
                "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
            }}
          >
            <CheckmarkCircleIcon className="size-4 text-white" />
            <span>Add Follow-up</span>
          </button>
        </div>
      </div>
    </div>
  );
}
