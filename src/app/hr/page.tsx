"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopHeader from "@/components/TopHeader";
import {
  SearchIcon,
  PlusIcon,
  FilterIcon,
  MoreVerticalIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckmarkCircleIcon,
  CloseIcon,
  ContactsStatIcon,
} from "@/components/icons/Icons";

function PdfIconBadge({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={`inline-block shrink-0 ${className}`}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" strokeLinecap="round" />
    </svg>
  );
}

function EmployeeUserIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`inline-block shrink-0 ${className}`}>
      <path
        d="M14.1667 17.5V15.8333C14.1667 14.9493 13.8155 14.1014 13.1904 13.4763C12.5652 12.8512 11.7174 12.5 10.8333 12.5H5.83333C4.94928 12.5 4.10143 12.8512 3.47631 13.4763C2.85119 14.1014 2.5 14.9493 2.5 15.8333V17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.33333 9.16667C10.1743 9.16667 11.6667 7.67428 11.6667 5.83333C11.6667 3.99238 10.1743 2.5 8.33333 2.5C6.49238 2.5 5 3.99238 5 5.83333C5 7.67428 6.49238 9.16667 8.33333 9.16667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 17.5V15.8333C17.4989 15.0975 17.2514 14.383 16.7979 13.8055C16.3444 13.228 15.7107 12.8211 15 12.6458"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 2.64584C14.0463 2.81977 14.6826 3.2267 15.1378 3.80499C15.593 4.38328 15.8413 5.09919 15.8413 5.83543C15.8413 6.57166 15.593 7.28757 15.1378 7.86586C14.6826 8.44415 14.0463 8.85108 13.3333 9.02501"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarInputIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`inline-block shrink-0 ${className}`}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockInputIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={`inline-block shrink-0 ${className}`}
    >
      <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface PayrollItem {
  id: string;
  payrollNo: string;
  employee: string;
  initials: string;
  employeeId?: string;
  department?: string;
  period: string;
  baseSalary: string;
  allowances: string;
  bonus?: string;
  deductions: string;
  grossSalary?: string;
  netSalary: string;
  status: string;
  paymentDate: string;
  notes?: string;
}

interface LeaveItem {
  id: string;
  leaveNo: string;
  employee: string;
  initials: string;
  department?: string;
  type: string;
  startDate: string;
  endDate: string;
  days: string;
  submitted?: string;
  notes: string;
  reason?: string;
}

type HrTab = "payrolls" | "attendance" | "leaves";

export default function HrEmployeesPage() {
  const [activeTab, setActiveTab] = useState<HrTab>("payrolls");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter visibility & states
  const [showFilters, setShowFilters] = useState(true);

  // Payrolls filters
  const [payrollEmployee, setPayrollEmployee] = useState("All");
  const [payrollStatus, setPayrollStatus] = useState("All");
  const [payrollMonth, setPayrollMonth] = useState("All");
  const [payrollYear, setPayrollYear] = useState("All");

  // Attendance filters
  const [attendanceEmployee, setAttendanceEmployee] = useState("All");
  const [attendanceStatus, setAttendanceStatus] = useState("All");
  const [attendanceStartDate, setAttendanceStartDate] = useState("");
  const [attendanceEndDate, setAttendanceEndDate] = useState("");

  // Leaves filters
  const [leaveEmployee, setLeaveEmployee] = useState("All");
  const [leaveType, setLeaveType] = useState("All");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");

  // Add Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // View Slip Modal State (Mockup 1)
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false);
  const [selectedPayrollForSlip, setSelectedPayrollForSlip] = useState<PayrollItem | null>(null);

  // Process Payment Modal State (Mockup 2)
  const [isProcessPaymentModalOpen, setIsProcessPaymentModalOpen] = useState(false);
  const [selectedPayrollForProcess, setSelectedPayrollForProcess] = useState<PayrollItem | null>(null);
  const [processPaymentDate, setProcessPaymentDate] = useState("09/08/2026");
  const [processPaymentMethod, setProcessPaymentMethod] = useState("Bank Transfer");
  const [processPaymentNotes, setProcessPaymentNotes] = useState("......");

  // Leave Request Modal State (Mockup 3)
  const [isLeaveRequestModalOpen, setIsLeaveRequestModalOpen] = useState(false);
  const [selectedLeaveForRequest, setSelectedLeaveForRequest] = useState<LeaveItem | null>(null);

  useEffect(() => {
    function handleClickOutside() {
      setActiveMenuId(null);
    }
    if (activeMenuId) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeMenuId]);

  // Modal 1 (Add Payroll) Form states
  const [selectedEmployee, setSelectedEmployee] = useState("Kweku Aidoo — TECH-002Y");
  const [formPayrollPeriod, setFormPayrollPeriod] = useState("2026-09-08");
  const [formBaseSalary, setFormBaseSalary] = useState("50000");
  const [formAllowances, setFormAllowances] = useState("5000");
  const [formDeductions, setFormDeductions] = useState("500");
  const [formNetSalary, setFormNetSalary] = useState("50000");
  const [formNotes, setFormNotes] = useState("Thanks for your efforts");

  // Modal 2 (Add Attendance) Form states
  const [formAttendanceStatus, setFormAttendanceStatus] = useState("Present");
  const [formAttendanceDate, setFormAttendanceDate] = useState("2026-09-08");
  const [formCheckIn, setFormCheckIn] = useState("10:00");
  const [formCheckOut, setFormCheckOut] = useState("20:00");
  const [formAttendanceReason, setFormAttendanceReason] = useState("");

  // Modal 3 (Add Leave) Form states
  const [formLeaveType, setFormLeaveType] = useState("Annual Leave");
  const [formLeaveStartDate, setFormLeaveStartDate] = useState("2026-09-08");
  const [formLeaveEndDate, setFormLeaveEndDate] = useState("2026-09-08");
  const [formLeaveReason, setFormLeaveReason] = useState("");

  // 1. Payrolls Data
  const [payrolls, setPayrolls] = useState<PayrollItem[]>([
    {
      id: "1",
      payrollNo: "PAY-HR-007",
      employee: "Kwame Mensah",
      initials: "AS",
      employeeId: "TECH-001",
      department: "Laptop & Desktop",
      period: "20 Aug 2026",
      baseSalary: "4,5000.00 CFA",
      allowances: "5,000.00 CFA",
      bonus: "500.00 CFA",
      deductions: "525.00 CFA",
      grossSalary: "4,500.00 CFA",
      netSalary: "4,5000.00 CFA",
      status: "Pending",
      paymentDate: "09/08/2026",
      notes: "Thanks for your efforts",
    },
    {
      id: "2",
      payrollNo: "PAY-HR-007",
      employee: "Emmanuel Boateng",
      initials: "EB",
      employeeId: "TECH-002",
      department: "Laptop & Desktop",
      period: "September 2026",
      baseSalary: "4,5000.00 CFA",
      allowances: "5,000.00 CFA",
      bonus: "500.00 CFA",
      deductions: "525.00 CFA",
      grossSalary: "4,500.00 CFA",
      netSalary: "4,5000.00 CFA",
      status: "Pending",
      paymentDate: "09/08/2026",
      notes: "Thanks for your efforts",
    },
    {
      id: "3",
      payrollNo: "PAY-HR-007",
      employee: "Kwesi Boateng-A...",
      initials: "KB",
      period: "September 2026",
      baseSalary: "4,500.00 CFA",
      allowances: "500.00 CFA",
      deductions: "525.00 CFA",
      netSalary: "4,475.00 CFA",
      status: "Draft",
      paymentDate: "Dec 27, 2026",
    },
    {
      id: "4",
      payrollNo: "PAY-HR-007",
      employee: "Kwesi Boateng-A...",
      initials: "KB",
      period: "September 2026",
      baseSalary: "4,500.00 CFA",
      allowances: "500.00 CFA",
      deductions: "525.00 CFA",
      netSalary: "4,475.00 CFA",
      status: "Paid",
      paymentDate: "Dec 27, 2026",
    },
    {
      id: "5",
      payrollNo: "PAY-HR-007",
      employee: "Kwesi Boateng-A...",
      initials: "KB",
      period: "September 2026",
      baseSalary: "4,500.00 CFA",
      allowances: "500.00 CFA",
      deductions: "525.00 CFA",
      netSalary: "4,475.00 CFA",
      status: "Paid",
      paymentDate: "Dec 27, 2026",
    },
    {
      id: "6",
      payrollNo: "PAY-HR-007",
      employee: "Kwesi Boateng-A...",
      initials: "KB",
      period: "September 2026",
      baseSalary: "4,500.00 CFA",
      allowances: "500.00 CFA",
      deductions: "525.00 CFA",
      netSalary: "4,475.00 CFA",
      status: "Pending",
      paymentDate: "Dec 27, 2026",
    },
    {
      id: "7",
      payrollNo: "PAY-HR-007",
      employee: "Kwesi Boateng-A...",
      initials: "KB",
      period: "September 2026",
      baseSalary: "4,500.00 CFA",
      allowances: "500.00 CFA",
      deductions: "525.00 CFA",
      netSalary: "4,475.00 CFA",
      status: "Paid",
      paymentDate: "Dec 27, 2026",
    },
  ]);

  // 2. Attendance Data
  const [attendanceList, setAttendanceList] = useState([
    {
      id: "1",
      date: "Dec 27, 2026",
      employee: "Kwesi Boateng-Achea..",
      initials: "KB",
      checkIn: "08:02",
      checkOut: "17:05",
      workingHours: "9h 3m",
      status: "Present",
      notes: "No show — training program",
    },
    {
      id: "2",
      date: "Dec 26, 2026",
      employee: "Kwame Mensah",
      initials: "KM",
      checkIn: "08:15",
      checkOut: "13:30",
      workingHours: "5h 15m",
      status: "Half Day",
      notes: "Doctor appointment",
    },
    {
      id: "3",
      date: "Dec 25, 2026",
      employee: "Emmanuel Boateng",
      initials: "EB",
      checkIn: "07:55",
      checkOut: "17:10",
      workingHours: "9h 15m",
      status: "Present",
      notes: "On-time arrival",
    },
    {
      id: "4",
      date: "Dec 24, 2026",
      employee: "Abena Osei-Bonsu",
      initials: "AO",
      checkIn: "08:00",
      checkOut: "17:00",
      workingHours: "9h 0m",
      status: "Present",
      notes: "Regular shift",
    },
    {
      id: "5",
      date: "Dec 23, 2026",
      employee: "Marcus Johnson",
      initials: "MJ",
      checkIn: "—",
      checkOut: "—",
      workingHours: "0h",
      status: "On Leave",
      notes: "Annual leave approved",
    },
    {
      id: "6",
      date: "Dec 22, 2026",
      employee: "Kwame Mensah",
      initials: "KM",
      checkIn: "09:30",
      checkOut: "18:00",
      workingHours: "8h 30m",
      status: "Late",
      notes: "Traffic delay reported",
    },
    {
      id: "7",
      date: "Dec 21, 2026",
      employee: "Emmanuel Boateng",
      initials: "EB",
      checkIn: "—",
      checkOut: "—",
      workingHours: "0h",
      status: "Absent",
      notes: "Unexcused absence",
    },
  ]);

  // 3. Leaves Data
  const [leavesList, setLeavesList] = useState<LeaveItem[]>([
    {
      id: "1",
      leaveNo: "PAY-HR-007",
      employee: "Kwame Mensah",
      initials: "KM",
      department: "Laptop & Desktop",
      type: "Annual Leave",
      startDate: "01 Sept 2026",
      endDate: "21 Sept 2026",
      days: "20 days",
      submitted: "20 Aug 2026",
      notes: "Annual vacation leave.",
      reason: "Annual vacation leave.",
    },
    {
      id: "2",
      leaveNo: "PAY-HR-008",
      employee: "Kwesi Boateng-Achea..",
      initials: "KB",
      type: "Sick Leave",
      startDate: "10 Oct 2026",
      endDate: "15 Oct 2026",
      days: "5 Days",
      notes: "Medical rest recommended",
    },
    {
      id: "3",
      leaveNo: "PAY-HR-009",
      employee: "Emmanuel Boateng",
      initials: "EB",
      type: "Casual Leave",
      startDate: "05 Nov 2026",
      endDate: "07 Nov 2026",
      days: "2 Days",
      notes: "Family engagement",
    },
    {
      id: "4",
      leaveNo: "PAY-HR-010",
      employee: "Abena Osei-Bonsu",
      initials: "AO",
      type: "Maternity Leave",
      startDate: "01 Dec 2026",
      endDate: "28 Feb 2027",
      days: "90 Days",
      notes: "Maternity leave approved",
    },
    {
      id: "5",
      leaveNo: "PAY-HR-011",
      employee: "Marcus Johnson",
      initials: "MJ",
      type: "Annual Leave",
      startDate: "15 Dec 2026",
      endDate: "25 Dec 2026",
      days: "10 Days",
      notes: "Year-end vacation",
    },
    {
      id: "6",
      leaveNo: "PAY-HR-012",
      employee: "Kwame Mensah",
      initials: "KM",
      type: "Casual Leave",
      startDate: "02 Jan 2027",
      endDate: "04 Jan 2027",
      days: "2 Days",
      notes: "Personal matters",
    },
    {
      id: "7",
      leaveNo: "PAY-HR-013",
      employee: "Kwesi Boateng-Achea..",
      initials: "KB",
      type: "Sick Leave",
      startDate: "12 Jan 2027",
      endDate: "14 Jan 2027",
      days: "2 Days",
      notes: "Doctor advised rest",
    },
  ]);

  // Tab-specific filtered data
  const filteredPayrolls = payrolls.filter((p) => {
    if (payrollEmployee !== "All" && !p.employee.toLowerCase().includes(payrollEmployee.toLowerCase())) {
      return false;
    }
    if (payrollStatus !== "All" && p.status.toLowerCase() !== payrollStatus.toLowerCase()) {
      return false;
    }
    if (payrollMonth !== "All" && !p.period.toLowerCase().includes(payrollMonth.toLowerCase()) && !p.paymentDate.toLowerCase().includes(payrollMonth.toLowerCase())) {
      return false;
    }
    if (payrollYear !== "All" && !p.period.includes(payrollYear) && !p.paymentDate.includes(payrollYear)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = `${p.payrollNo} ${p.employee} ${p.period} ${p.status} ${p.paymentDate} ${p.netSalary}`
        .toLowerCase()
        .includes(q);
      if (!match) return false;
    }
    return true;
  });

  const filteredAttendance = attendanceList.filter((a) => {
    if (attendanceEmployee !== "All" && !a.employee.toLowerCase().includes(attendanceEmployee.toLowerCase())) {
      return false;
    }
    if (attendanceStatus !== "All" && a.status.toLowerCase() !== attendanceStatus.toLowerCase()) {
      return false;
    }
    if (attendanceStartDate) {
      const rowDate = new Date(a.date);
      const start = new Date(attendanceStartDate);
      if (!isNaN(rowDate.getTime()) && !isNaN(start.getTime())) {
        rowDate.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        if (rowDate < start) return false;
      }
    }
    if (attendanceEndDate) {
      const rowDate = new Date(a.date);
      const end = new Date(attendanceEndDate);
      if (!isNaN(rowDate.getTime()) && !isNaN(end.getTime())) {
        rowDate.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        if (rowDate > end) return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = `${a.employee} ${a.status} ${a.notes} ${a.date} ${a.checkIn} ${a.checkOut}`
        .toLowerCase()
        .includes(q);
      if (!match) return false;
    }
    return true;
  });

  const filteredLeaves = leavesList.filter((l) => {
    if (leaveEmployee !== "All" && !l.employee.toLowerCase().includes(leaveEmployee.toLowerCase())) {
      return false;
    }
    if (leaveType !== "All" && !l.type.toLowerCase().includes(leaveType.toLowerCase())) {
      return false;
    }
    if (leaveStartDate) {
      const rowDate = new Date(l.startDate);
      const start = new Date(leaveStartDate);
      if (!isNaN(rowDate.getTime()) && !isNaN(start.getTime())) {
        rowDate.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        if (rowDate < start) return false;
      }
    }
    if (leaveEndDate) {
      const rowDate = new Date(l.endDate);
      const end = new Date(leaveEndDate);
      if (!isNaN(rowDate.getTime()) && !isNaN(end.getTime())) {
        rowDate.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        if (rowDate > end) return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = `${l.leaveNo} ${l.employee} ${l.type} ${l.days} ${l.notes} ${l.startDate} ${l.endDate}`
        .toLowerCase()
        .includes(q);
      if (!match) return false;
    }
    return true;
  });

  const getCalculatedLeaveDays = () => {
    if (!formLeaveStartDate || !formLeaveEndDate) return 3;
    const start = new Date(formLeaveStartDate);
    const end = new Date(formLeaveEndDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 1;
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "payrolls") {
      setPayrolls([
        {
          id: String(Date.now()),
          payrollNo: `PAY-HR-00${payrolls.length + 1}`,
          employee: selectedEmployee.split(" — ")[0] || "Kwesi Boateng-A...",
          initials: selectedEmployee.slice(0, 2).toUpperCase(),
          period: formPayrollPeriod,
          baseSalary: `${Number(formBaseSalary || 50000).toLocaleString()}.00 CFA`,
          allowances: `${Number(formAllowances || 5000).toLocaleString()}.00 CFA`,
          deductions: `${Number(formDeductions || 500).toLocaleString()}.00 CFA`,
          netSalary: `${Number(formNetSalary || 50000).toLocaleString()}.00 CFA`,
          status: "Pending",
          paymentDate: "Dec 27, 2026",
        },
        ...payrolls,
      ]);
    } else if (activeTab === "attendance") {
      setAttendanceList([
        {
          id: String(Date.now()),
          date: formAttendanceDate,
          employee: selectedEmployee.split(" — ")[0] || "Kwesi Boateng-Achea..",
          initials: selectedEmployee.slice(0, 2).toUpperCase(),
          checkIn: formCheckIn,
          checkOut: formCheckOut,
          workingHours: "9h 3m",
          status: formAttendanceStatus,
          notes: formAttendanceReason || "Annual leave approved",
        },
        ...attendanceList,
      ]);
    } else if (activeTab === "leaves") {
      const daysCount = getCalculatedLeaveDays();
      setLeavesList([
        {
          id: String(Date.now()),
          leaveNo: `PAY-HR-00${leavesList.length + 1}`,
          employee: selectedEmployee.split(" — ")[0] || "Kwesi Boateng-Achea..",
          initials: selectedEmployee.slice(0, 2).toUpperCase(),
          type: formLeaveType,
          startDate: formLeaveStartDate,
          endDate: formLeaveEndDate,
          days: `${daysCount} ${daysCount === 1 ? "Day" : "Days"}`,
          notes: formLeaveReason || "Annual leave approved",
        },
        ...leavesList,
      ]);
    }
    setIsAddModalOpen(false);
  };

  const handleProcessPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPayrollForProcess) {
      setPayrolls((prev) =>
        prev.map((item) =>
          item.id === selectedPayrollForProcess.id
            ? { ...item, status: "Paid", paymentDate: processPaymentDate }
            : item
        )
      );
    }
    setIsProcessPaymentModalOpen(false);
  };

  const getModalTitle = () => {
    switch (activeTab) {
      case "payrolls":
        return "Add Payroll";
      case "attendance":
        return "Add Attendance";
      case "leaves":
        return "Add Leave";
    }
  };

  const getSubmitButtonLabel = () => {
    switch (activeTab) {
      case "payrolls":
        return "Save Payroll";
      case "attendance":
        return "Save Attendance";
      case "leaves":
        return "Save Attendance";
    }
  };

  const getButtonText = () => {
    switch (activeTab) {
      case "payrolls":
        return "Add Payrolls";
      case "attendance":
        return "Add Attendance";
      case "leaves":
        return "Add Leaves";
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "payrolls":
        return "Payrolls";
      case "attendance":
        return "Attendance";
      case "leaves":
        return "Leaves";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFD] text-[#3D3D49] font-sans antialiased">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen ml-[220px]">
        {/* Top Header */}
        <TopHeader title="HR / Employees" />

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 flex flex-col gap-6 max-w-[1680px] w-full mx-auto">
          {/* Top Sub-Tabs Bar */}
          <div className="bg-white border border-[#EDEDED] rounded-[10px] px-6 pt-3 flex items-center gap-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <button
              type="button"
              onClick={() => {
                setActiveTab("payrolls");
                setSearchQuery("");
                setActiveMenuId(null);
              }}
              className={`pb-3 text-xs font-medium relative transition-colors cursor-pointer ${
                activeTab === "payrolls"
                  ? "text-[#FF611C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#FF611C]"
                  : "text-[#575765] hover:text-[#3D3D49]"
              }`}
            >
              Payrolls
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("attendance");
                setSearchQuery("");
                setActiveMenuId(null);
              }}
              className={`pb-3 text-xs font-medium relative transition-colors cursor-pointer ${
                activeTab === "attendance"
                  ? "text-[#FF611C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#FF611C]"
                  : "text-[#575765] hover:text-[#3D3D49]"
              }`}
            >
              Attendance
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("leaves");
                setSearchQuery("");
                setActiveMenuId(null);
              }}
              className={`pb-3 text-xs font-medium relative transition-colors cursor-pointer ${
                activeTab === "leaves"
                  ? "text-[#FF611C] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#FF611C]"
                  : "text-[#575765] hover:text-[#3D3D49]"
              }`}
            >
              Leaves
            </button>
          </div>

          {/* Section Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-[#3D3D49] text-[24px] leading-tight tracking-tight">
                {getPageTitle()}
              </h1>
              <p className="font-normal text-[#575765] text-[13px]">
                Employee management, payroll, attendance and leaves
              </p>
            </div>

            {/* Top Right Add Button */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="h-10 px-4 rounded-[8px] text-white font-medium text-xs flex items-center gap-1.5 shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:opacity-95 transition-opacity cursor-pointer shrink-0"
              style={{
                background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
              }}
            >
              <PlusIcon className="size-3.5 text-white stroke-[2.5]" />
              <span>{getButtonText()}</span>
            </button>
          </div>

          {/* Overview Metric Cards */}
          {activeTab === "attendance" ? (
            /* 5 Stat Cards for Attendance */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Present */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-medium text-[#575765]">Present</span>
                  <div className="size-9 rounded-[8px] bg-[#009689] text-white flex items-center justify-center">
                    <EmployeeUserIcon className="size-5 text-white" />
                  </div>
                </div>
                <div className="text-[24px] font-semibold text-[#3D3D49]">3</div>
              </div>

              {/* Absent */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-medium text-[#575765]">Absent</span>
                  <div className="size-9 rounded-[8px] bg-[#F92424] text-white flex items-center justify-center">
                    <EmployeeUserIcon className="size-5 text-white" />
                  </div>
                </div>
                <div className="text-[24px] font-semibold text-[#3D3D49]">1</div>
              </div>

              {/* Late */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-medium text-[#575765]">Late</span>
                  <div className="size-9 rounded-[8px] bg-[#FF611C] text-white flex items-center justify-center">
                    <EmployeeUserIcon className="size-5 text-white" />
                  </div>
                </div>
                <div className="text-[24px] font-semibold text-[#3D3D49]">1</div>
              </div>

              {/* On Leave */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-medium text-[#575765]">On Leave</span>
                  <div className="size-9 rounded-[8px] bg-[#8A58FF] text-white flex items-center justify-center">
                    <EmployeeUserIcon className="size-5 text-white" />
                  </div>
                </div>
                <div className="text-[24px] font-semibold text-[#3D3D49]">1</div>
              </div>

              {/* Half Day */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-medium text-[#575765]">Half Day</span>
                  <div className="size-9 rounded-[8px] bg-[#0D79E4] text-white flex items-center justify-center">
                    <EmployeeUserIcon className="size-5 text-white" />
                  </div>
                </div>
                <div className="text-[24px] font-semibold text-[#3D3D49]">1</div>
              </div>
            </div>
          ) : (
            /* 4 Stat Cards for Payrolls & Leaves (Figma 6434:31720) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Payroll */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] px-[20px] py-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02)] flex flex-col justify-between transition hover:shadow-md">
                <div className="flex items-start justify-between">
                  <span className="text-[20px] font-medium text-[#575765] leading-tight">Total Payroll</span>
                  <div className="flex size-11 items-center justify-center rounded-[12px] border-2 border-[#E9EDF2] p-[10px] bg-[#FF611C] shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.8)] shrink-0">
                    <ContactsStatIcon className="size-5 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <span className="text-[28px] font-medium text-[#3D3D49] leading-none">12,765.00 CFA</span>
                </div>
              </div>

              {/* Paid */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] px-[20px] py-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02)] flex flex-col justify-between transition hover:shadow-md">
                <div className="flex items-start justify-between">
                  <span className="text-[20px] font-medium text-[#575765] leading-tight">Paid</span>
                  <div className="flex size-11 items-center justify-center rounded-[12px] border-2 border-[#E9EDF2] p-[10px] bg-[#009689] shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.8)] shrink-0">
                    <ContactsStatIcon className="size-5 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <span className="text-[28px] font-medium text-[#3D3D49] leading-none">2,765.00 CFA</span>
                </div>
              </div>

              {/* Pending */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] px-[20px] py-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02)] flex flex-col justify-between transition hover:shadow-md">
                <div className="flex items-start justify-between">
                  <span className="text-[20px] font-medium text-[#575765] leading-tight">Pending</span>
                  <div className="flex size-11 items-center justify-center rounded-[12px] border-2 border-[#E9EDF2] p-[10px] bg-[#EDAC00] shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.8)] shrink-0">
                    <ContactsStatIcon className="size-5 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <span className="text-[28px] font-medium text-[#3D3D49] leading-none">12,765.00 CFA</span>
                </div>
              </div>

              {/* Employees Paid */}
              <div className="bg-white border border-[#EDEDED] rounded-[12px] px-[20px] py-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.02)] flex flex-col justify-between transition hover:shadow-md">
                <div className="flex items-start justify-between">
                  <span className="text-[20px] font-medium text-[#575765] leading-tight">Employees Paid</span>
                  <div className="flex size-11 items-center justify-center rounded-[12px] border-2 border-[#E9EDF2] p-[10px] bg-[#8A58FF] shadow-[inset_0px_0px_10px_0px_rgba(255,255,255,0.8)] shrink-0">
                    <ContactsStatIcon className="size-5 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-1">
                  <span className="text-[28px] font-medium text-[#3D3D49] leading-none">5</span>
                </div>
              </div>
            </div>
          )}

          {/* Main Table Card */}
          <div className="bg-white border border-[#EDEDED] rounded-[12px] shadow-sm flex flex-col overflow-hidden">
            {/* Card Header & Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-[#EDEDED]">
              <h2 className="font-medium text-[#575765] text-[20px]">
                {getPageTitle()}
              </h2>

              <div className="flex items-center gap-2.5">
                {/* Search Button / Input */}
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[160px] sm:w-[200px] h-9 pl-3.5 pr-8 bg-white border border-[#EDEDED] rounded-[8px] text-xs text-[#3D3D49] outline-none focus:border-[#FF611C]"
                  />
                  <SearchIcon className="size-3.5 text-[#8C8C9A] absolute right-3 pointer-events-none" />
                </div>

                {/* Filter Button */}
                <button
                  type="button"
                  onClick={() => setShowFilters((prev) => !prev)}
                  className={`h-9 px-3.5 border rounded-[8px] flex items-center gap-1.5 text-xs font-normal transition cursor-pointer shadow-sm ${
                    showFilters
                      ? "border-[#FF611C] bg-[#FFF5F0] text-[#FF611C]"
                      : "border-[#EDEDED] bg-white hover:bg-neutral-50 text-[#575765]"
                  }`}
                >
                  <FilterIcon className={`size-3.5 ${showFilters ? "text-[#FF611C]" : "text-[#575765]"}`} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Dedicated Filter Subheader Row */}
            {showFilters && (
              <div className="min-h-[56px] border-b border-[#EDEDED] px-5 py-2.5 flex flex-wrap gap-3 items-center bg-white">
                {activeTab === "payrolls" && (
                  <>
                    {/* Employee */}
                    <div className="relative">
                      <select
                        value={payrollEmployee}
                        onChange={(e) => setPayrollEmployee(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">All Employees</option>
                        <option value="Kwame Mensah">Kwame Mensah</option>
                        <option value="Emmanuel Boateng">Emmanuel Boateng</option>
                        <option value="Kwesi Boateng">Kwesi Boateng</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Status */}
                    <div className="relative">
                      <select
                        value={payrollStatus}
                        onChange={(e) => setPayrollStatus(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">Status: All</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Draft">Draft</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Month */}
                    <div className="relative">
                      <select
                        value={payrollMonth}
                        onChange={(e) => setPayrollMonth(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">Month: All</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Year */}
                    <div className="relative">
                      <select
                        value={payrollYear}
                        onChange={(e) => setPayrollYear(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">Year: All</option>
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {(payrollEmployee !== "All" || payrollStatus !== "All" || payrollMonth !== "All" || payrollYear !== "All") && (
                      <button
                        type="button"
                        onClick={() => {
                          setPayrollEmployee("All");
                          setPayrollStatus("All");
                          setPayrollMonth("All");
                          setPayrollYear("All");
                        }}
                        className="text-xs text-[#FF611C] hover:underline font-medium ml-1 cursor-pointer"
                      >
                        Reset filters
                      </button>
                    )}
                  </>
                )}

                {activeTab === "attendance" && (
                  <>
                    {/* Start Date */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#8C8C9A] font-medium">From:</span>
                      <input
                        type="date"
                        value={attendanceStartDate}
                        onChange={(e) => setAttendanceStartDate(e.target.value)}
                        className="h-9 px-3 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] cursor-pointer"
                      />
                    </div>

                    {/* End Date */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#8C8C9A] font-medium">To:</span>
                      <input
                        type="date"
                        value={attendanceEndDate}
                        onChange={(e) => setAttendanceEndDate(e.target.value)}
                        className="h-9 px-3 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] cursor-pointer"
                      />
                    </div>

                    {/* Employee */}
                    <div className="relative">
                      <select
                        value={attendanceEmployee}
                        onChange={(e) => setAttendanceEmployee(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">All Employees</option>
                        <option value="Kwame Mensah">Kwame Mensah</option>
                        <option value="Emmanuel Boateng">Emmanuel Boateng</option>
                        <option value="Kwesi Boateng">Kwesi Boateng</option>
                        <option value="Abena Osei-Bonsu">Abena Osei-Bonsu</option>
                        <option value="Marcus Johnson">Marcus Johnson</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Status */}
                    <div className="relative">
                      <select
                        value={attendanceStatus}
                        onChange={(e) => setAttendanceStatus(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">Status: All</option>
                        <option value="Present">Present</option>
                        <option value="Half Day">Half Day</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Late">Late</option>
                        <option value="Absent">Absent</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {(attendanceEmployee !== "All" || attendanceStatus !== "All" || attendanceStartDate || attendanceEndDate) && (
                      <button
                        type="button"
                        onClick={() => {
                          setAttendanceEmployee("All");
                          setAttendanceStatus("All");
                          setAttendanceStartDate("");
                          setAttendanceEndDate("");
                        }}
                        className="text-xs text-[#FF611C] hover:underline font-medium ml-1 cursor-pointer"
                      >
                        Reset filters
                      </button>
                    )}
                  </>
                )}

                {activeTab === "leaves" && (
                  <>
                    {/* Start Date */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#8C8C9A] font-medium">From:</span>
                      <input
                        type="date"
                        value={leaveStartDate}
                        onChange={(e) => setLeaveStartDate(e.target.value)}
                        className="h-9 px-3 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] cursor-pointer"
                      />
                    </div>

                    {/* End Date */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#8C8C9A] font-medium">To:</span>
                      <input
                        type="date"
                        value={leaveEndDate}
                        onChange={(e) => setLeaveEndDate(e.target.value)}
                        className="h-9 px-3 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] cursor-pointer"
                      />
                    </div>

                    {/* Employee */}
                    <div className="relative">
                      <select
                        value={leaveEmployee}
                        onChange={(e) => setLeaveEmployee(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">All Employees</option>
                        <option value="Kwame Mensah">Kwame Mensah</option>
                        <option value="Emmanuel Boateng">Emmanuel Boateng</option>
                        <option value="Kwesi Boateng">Kwesi Boateng</option>
                        <option value="Abena Osei-Bonsu">Abena Osei-Bonsu</option>
                        <option value="Marcus Johnson">Marcus Johnson</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Type */}
                    <div className="relative">
                      <select
                        value={leaveType}
                        onChange={(e) => setLeaveType(e.target.value)}
                        className="h-9 pl-3 pr-8 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer"
                      >
                        <option value="All">Type: All</option>
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Maternity Leave">Maternity Leave</option>
                      </select>
                      <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {(leaveEmployee !== "All" || leaveType !== "All" || leaveStartDate || leaveEndDate) && (
                      <button
                        type="button"
                        onClick={() => {
                          setLeaveEmployee("All");
                          setLeaveType("All");
                          setLeaveStartDate("");
                          setLeaveEndDate("");
                        }}
                        className="text-xs text-[#FF611C] hover:underline font-medium ml-1 cursor-pointer"
                      >
                        Reset filters
                      </button>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Table Container */}
            <div className="overflow-x-auto border border-[#EDEDED] rounded-[8px]">
              {/* Tab 1: Payrolls Table */}
              {activeTab === "payrolls" && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b border-[#EDEDED] text-[11px] text-[#8C8C9A] font-medium">
                      <th className="py-3 px-4">Payroll #</th>
                      <th className="py-3 px-4">Employee</th>
                      <th className="py-3 px-4">Period</th>
                      <th className="py-3 px-4">Base Salary</th>
                      <th className="py-3 px-4">Allowances</th>
                      <th className="py-3 px-4">Deductions</th>
                      <th className="py-3 px-4">Net Salary</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Payment Date</th>
                      <th className="py-3 px-4 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDEDED] text-[#3D3D49]">
                    {filteredPayrolls.length === 0 ? (
                      <tr>
                        <td colSpan={10} className="py-8 text-center text-xs text-[#8C8C9A]">
                          No payroll records found
                        </td>
                      </tr>
                    ) : (
                      filteredPayrolls.map((row) => (
                        <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                          <td className="py-3.5 px-4 font-normal text-[#3D3D49]">{row.payrollNo}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="size-6 rounded-full bg-[#EFEAFF] text-[#8A58FF] text-[10px] font-semibold flex items-center justify-center shrink-0">
                                {row.initials}
                              </span>
                              <span className="text-[#3D3D49]">{row.employee}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[#3D3D49]">{row.period}</td>
                          <td className="py-3.5 px-4 text-[#3D3D49]">{row.baseSalary}</td>
                          <td className="py-3.5 px-4 text-[#009689] font-medium">{row.allowances}</td>
                          <td className="py-3.5 px-4 text-[#F92424] font-medium">{row.deductions}</td>
                          <td className="py-3.5 px-4 text-[#3D3D49] font-normal">{row.netSalary}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-[4px] border text-[11px] font-medium ${
                                row.status === "Paid"
                                  ? "bg-[#E5F4F3] text-[#009689] border-[#009689]"
                                  : row.status === "Draft"
                                  ? "bg-neutral-100 text-[#8C8C9A] border-[#8C8C9A]"
                                  : "bg-[#FEF6E6] text-[#EDAC00] border-[#EDAC00]"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-[#3D3D49]">{row.paymentDate}</td>
                          <td className="py-3.5 px-4 text-center relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(activeMenuId === row.id ? null : row.id);
                              }}
                              className="size-7 rounded-[6px] border border-[#EDEDED] flex items-center justify-center hover:bg-neutral-100 text-[#8C8C9A] cursor-pointer"
                            >
                              <MoreVerticalIcon className="size-4" />
                            </button>
                            {activeMenuId === row.id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-4 mt-1 w-36 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-30 flex flex-col text-xs text-left animate-in fade-in zoom-in-95 duration-100"
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedPayrollForSlip(row);
                                    setIsSlipModalOpen(true);
                                    setActiveMenuId(null);
                                  }}
                                  className="px-3 py-1.5 hover:bg-neutral-50 text-[#3D3D49] cursor-pointer"
                                >
                                  View Slip
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedPayrollForProcess(row);
                                    setProcessPaymentDate(row.paymentDate || "09/08/2026");
                                    setProcessPaymentMethod("Bank Transfer");
                                    setProcessPaymentNotes("......");
                                    setIsProcessPaymentModalOpen(true);
                                    setActiveMenuId(null);
                                  }}
                                  className="px-3 py-1.5 hover:bg-neutral-50 text-[#3D3D49] cursor-pointer"
                                >
                                  Process Payment
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setActiveMenuId(null)}
                                  className="px-3 py-1.5 hover:bg-neutral-50 text-[#3D3D49] cursor-pointer"
                                >
                                  Edit Payroll
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPayrolls(payrolls.filter((p) => p.id !== row.id));
                                    setActiveMenuId(null);
                                  }}
                                  className="px-3 py-1.5 hover:bg-[#FEE9E9] text-[#F92424] cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab 2: Attendance Table */}
              {activeTab === "attendance" && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b border-[#EDEDED] text-[11px] text-[#8C8C9A] font-medium">
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Employee</th>
                      <th className="py-3 px-4">Check In</th>
                      <th className="py-3 px-4">Check Out</th>
                      <th className="py-3 px-4">Working Hours</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Notes</th>
                      <th className="py-3 px-4 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDEDED] text-[#3D3D49]">
                    {filteredAttendance.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-xs text-[#8C8C9A]">
                          No attendance records found
                        </td>
                      </tr>
                    ) : (
                      filteredAttendance.map((row) => (
                        <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                          <td className="py-3.5 px-4 text-[#3D3D49]">{row.date}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="size-6 rounded-full bg-[#EFEAFF] text-[#8A58FF] text-[10px] font-semibold flex items-center justify-center shrink-0">
                                {row.initials}
                              </span>
                              <span className="text-[#3D3D49]">{row.employee}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[#3D3D49]">{row.checkIn}</td>
                          <td className="py-3.5 px-4 text-[#3D3D49]">{row.checkOut}</td>
                          <td className="py-3.5 px-4 text-[#3D3D49]">{row.workingHours}</td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-[4px] border text-[11px] font-medium ${
                                row.status === "Present"
                                  ? "bg-[#E5F4F3] text-[#009689] border-[#009689]"
                                  : row.status === "Half Day"
                                  ? "bg-[#E7F2FC] text-[#0D79E4] border-[#0D79E4]"
                                  : row.status === "On Leave"
                                  ? "bg-[#F3EEFF] text-[#8A58FF] border-[#8A58FF]"
                                  : row.status === "Late"
                                  ? "bg-[#FFEFE8] text-[#FF611C] border-[#FF611C]"
                                  : "bg-[#FEE9E9] text-[#F92424] border-[#F92424]"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-[#575765]">{row.notes}</td>
                          <td className="py-3.5 px-4 text-center relative">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveMenuId(activeMenuId === row.id ? null : row.id)
                              }
                              className="size-7 rounded-[6px] border border-[#EDEDED] flex items-center justify-center hover:bg-neutral-100 text-[#8C8C9A] cursor-pointer"
                            >
                              <MoreVerticalIcon className="size-4" />
                            </button>
                            {activeMenuId === row.id && (
                              <div className="absolute right-4 mt-1 w-32 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-30 flex flex-col text-xs text-left animate-in fade-in zoom-in-95 duration-100">
                                <button
                                  type="button"
                                  onClick={() => setActiveMenuId(null)}
                                  className="px-3 py-1.5 hover:bg-neutral-50 text-[#3D3D49] cursor-pointer"
                                >
                                  View Details
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setActiveMenuId(null)}
                                  className="px-3 py-1.5 hover:bg-neutral-50 text-[#3D3D49] cursor-pointer"
                                >
                                  Edit Record
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setAttendanceList(
                                      attendanceList.filter((a) => a.id !== row.id)
                                    );
                                    setActiveMenuId(null);
                                  }}
                                  className="px-3 py-1.5 hover:bg-[#FEE9E9] text-[#F92424] cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}

              {/* Tab 3: Leaves Table */}
              {activeTab === "leaves" && (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b border-[#EDEDED] text-[11px] text-[#8C8C9A] font-medium">
                      <th className="py-3 px-4">Leave #</th>
                      <th className="py-3 px-4">Employee</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Start Date</th>
                      <th className="py-3 px-4">End Date</th>
                      <th className="py-3 px-4">Days</th>
                      <th className="py-3 px-4">Notes</th>
                      <th className="py-3 px-4 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDEDED] text-[#3D3D49]">
                    {filteredLeaves.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-xs text-[#8C8C9A]">
                          No leave records found
                        </td>
                      </tr>
                    ) : (
                      filteredLeaves.map((row) => (
                        <tr key={row.id} className="hover:bg-neutral-50/50 transition-colors">
                          <td className="py-3.5 px-4 font-normal text-[#3D3D49]">{row.leaveNo}</td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="size-6 rounded-full bg-[#EFEAFF] text-[#8A58FF] text-[10px] font-semibold flex items-center justify-center shrink-0">
                                {row.initials}
                              </span>
                              <span className="text-[#3D3D49]">{row.employee}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[#3D3D49]">{row.type}</td>
                          <td className="py-3.5 px-4 text-[#3D3D49]">{row.startDate}</td>
                          <td className="py-3.5 px-4 text-[#3D3D49]">{row.endDate}</td>
                          <td className="py-3.5 px-4 font-semibold text-[#3D3D49]">{row.days}</td>
                          <td className="py-3.5 px-4 text-[#575765]">{row.notes}</td>
                          <td className="py-3.5 px-4 text-center relative">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(activeMenuId === row.id ? null : row.id);
                              }}
                              className="size-7 rounded-[6px] border border-[#EDEDED] flex items-center justify-center hover:bg-neutral-100 text-[#8C8C9A] cursor-pointer"
                            >
                              <MoreVerticalIcon className="size-4" />
                            </button>
                            {activeMenuId === row.id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-4 mt-1 w-36 bg-white border border-[#EDEDED] rounded-[8px] shadow-lg py-1 z-30 flex flex-col text-xs text-left animate-in fade-in zoom-in-95 duration-100"
                              >
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedLeaveForRequest(row);
                                    setIsLeaveRequestModalOpen(true);
                                    setActiveMenuId(null);
                                  }}
                                  className="px-3 py-1.5 hover:bg-neutral-50 text-[#3D3D49] cursor-pointer"
                                >
                                  Leave Request
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setActiveMenuId(null)}
                                  className="px-3 py-1.5 hover:bg-neutral-50 text-[#3D3D49] cursor-pointer"
                                >
                                  Edit Leave
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setLeavesList(leavesList.filter((l) => l.id !== row.id));
                                    setActiveMenuId(null);
                                  }}
                                  className="px-3 py-1.5 hover:bg-[#FEE9E9] text-[#F92424] cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between pt-2 text-xs text-[#575765]">
              <div className="relative">
                <select className="h-8 pl-3 pr-7 bg-white border border-[#EDEDED] rounded-[6px] text-xs text-[#575765] outline-none focus:border-[#FF611C] appearance-none cursor-pointer">
                  <option value="10">Per page: 10</option>
                  <option value="20">Per page: 20</option>
                  <option value="50">Per page: 50</option>
                </select>
                <ChevronDownIcon className="size-3.5 text-[#8C8C9A] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="size-8 rounded-[6px] border border-[#EDEDED] bg-white flex items-center justify-center text-[#8C8C9A] hover:bg-neutral-50 cursor-pointer"
                >
                  <ChevronLeftIcon className="size-4" />
                </button>
                <span className="px-2 text-xs font-medium text-[#3D3D49]">Page 25</span>
                <button
                  type="button"
                  className="size-8 rounded-[6px] border border-[#EDEDED] bg-white flex items-center justify-center text-[#8C8C9A] hover:bg-neutral-50 cursor-pointer"
                >
                  <ChevronRightIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Modals (Exact Mockups 1, 2, 3) */}
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

            {/* Modal Form */}
            <form onSubmit={handleAddSubmit} className="flex flex-col gap-4">
              {/* 1. Modal 1: Add Payroll (Exact Mockup 1) */}
              {activeTab === "payrolls" && (
                <>
                  {/* Employee * */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Employee *
                    </label>
                    <div className="relative">
                      <div className="w-full h-11 px-3 bg-white border border-[#EDEDED] rounded-[8px] flex items-center justify-between text-[13px] text-[#3D3D49]">
                        <div className="flex items-center gap-2">
                          <span className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[10px] font-semibold flex items-center justify-center shrink-0">
                            AS
                          </span>
                          <span className="text-[#3D3D49] truncate">
                            {selectedEmployee}
                          </span>
                        </div>
                        <ChevronDownIcon className="size-4 text-[#575765] shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* Payroll Period* */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Payroll Period*
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formPayrollPeriod}
                        onChange={(e) => setFormPayrollPeriod(e.target.value)}
                        onClick={(e) => {
                          try {
                            (e.currentTarget as HTMLInputElement).showPicker?.();
                          } catch {}
                        }}
                        className="w-full h-11 px-3.5 pr-10 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                      />
                      <CalendarInputIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Base Salary* */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Base Salary*
                    </label>
                    <input
                      type="text"
                      value={formBaseSalary}
                      onChange={(e) => setFormBaseSalary(e.target.value)}
                      placeholder="50000"
                      className="w-full h-11 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Allowances & Deductions */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#3D3D49] font-normal">
                        Allowances
                      </label>
                      <input
                        type="text"
                        value={formAllowances}
                        onChange={(e) => setFormAllowances(e.target.value)}
                        placeholder="5000"
                        className="w-full h-11 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#3D3D49] font-normal">
                        Deductions
                      </label>
                      <input
                        type="text"
                        value={formDeductions}
                        onChange={(e) => setFormDeductions(e.target.value)}
                        placeholder="500"
                        className="w-full h-11 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                      />
                    </div>
                  </div>

                  {/* Net Salary */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Net Salary
                    </label>
                    <input
                      type="text"
                      value={formNetSalary}
                      onChange={(e) => setFormNetSalary(e.target.value)}
                      placeholder="50000"
                      className="w-full h-11 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                    />
                  </div>

                  {/* Notes */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      placeholder="Thanks for your efforts"
                      className="w-full p-3 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] resize-none"
                    />
                  </div>
                </>
              )}

              {/* 2. Modal 2: Add Attendance (Exact Mockup 2) */}
              {activeTab === "attendance" && (
                <>
                  {/* Employee * */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Employee *
                    </label>
                    <div className="relative">
                      <div className="w-full h-11 px-3 bg-white border border-[#EDEDED] rounded-[8px] flex items-center justify-between text-[13px] text-[#3D3D49]">
                        <div className="flex items-center gap-2">
                          <span className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[10px] font-semibold flex items-center justify-center shrink-0">
                            AS
                          </span>
                          <span className="text-[#3D3D49] truncate">
                            {selectedEmployee}
                          </span>
                        </div>
                        <ChevronDownIcon className="size-4 text-[#575765] shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* Status * */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Status *
                    </label>
                    <div className="relative">
                      <select
                        value={formAttendanceStatus}
                        onChange={(e) => setFormAttendanceStatus(e.target.value)}
                        className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                        <option value="Late">Late</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Half Day">Half Day</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formAttendanceDate}
                        onChange={(e) => setFormAttendanceDate(e.target.value)}
                        onClick={(e) => {
                          try {
                            (e.currentTarget as HTMLInputElement).showPicker?.();
                          } catch {}
                        }}
                        className="w-full h-11 px-3.5 pr-10 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                      />
                      <CalendarInputIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Check In & Check Out */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#3D3D49] font-normal">
                        Check In
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={formCheckIn}
                          onChange={(e) => setFormCheckIn(e.target.value)}
                          onClick={(e) => {
                            try {
                              (e.currentTarget as HTMLInputElement).showPicker?.();
                            } catch {}
                          }}
                          className="w-full h-11 px-3.5 pr-10 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                        />
                        <ClockInputIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#3D3D49] font-normal">
                        Check Out
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={formCheckOut}
                          onChange={(e) => setFormCheckOut(e.target.value)}
                          onClick={(e) => {
                            try {
                              (e.currentTarget as HTMLInputElement).showPicker?.();
                            } catch {}
                          }}
                          className="w-full h-11 px-3.5 pr-10 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                        />
                        <ClockInputIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Reason */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Reason
                    </label>
                    <textarea
                      rows={3}
                      value={formAttendanceReason}
                      onChange={(e) => setFormAttendanceReason(e.target.value)}
                      placeholder="Enter Text"
                      className="w-full p-3 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] resize-none"
                    />
                  </div>
                </>
              )}

              {/* 3. Modal 3: Add Leave (Exact Mockup 3) */}
              {activeTab === "leaves" && (
                <>
                  {/* Employee * */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Employee *
                    </label>
                    <div className="relative">
                      <div className="w-full h-11 px-3 bg-white border border-[#EDEDED] rounded-[8px] flex items-center justify-between text-[13px] text-[#3D3D49]">
                        <div className="flex items-center gap-2">
                          <span className="size-6 rounded-full bg-[#E7F2FC] text-[#0D79E4] text-[10px] font-semibold flex items-center justify-center shrink-0">
                            AS
                          </span>
                          <span className="text-[#3D3D49] truncate">
                            {selectedEmployee}
                          </span>
                        </div>
                        <ChevronDownIcon className="size-4 text-[#575765] shrink-0" />
                      </div>
                    </div>
                  </div>

                  {/* Leave Type * */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Leave Type *
                    </label>
                    <div className="relative">
                      <select
                        value={formLeaveType}
                        onChange={(e) => setFormLeaveType(e.target.value)}
                        className="w-full h-11 px-3.5 py-2.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] appearance-none pr-10 cursor-pointer"
                      >
                        <option value="Annual Leave">Annual Leave</option>
                        <option value="Sick Leave">Sick Leave</option>
                        <option value="Casual Leave">Casual Leave</option>
                        <option value="Maternity Leave">Maternity Leave</option>
                      </select>
                      <ChevronDownIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Start Date * & End Date * */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#3D3D49] font-normal">
                        Start Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formLeaveStartDate}
                          onChange={(e) => setFormLeaveStartDate(e.target.value)}
                          onClick={(e) => {
                            try {
                              (e.currentTarget as HTMLInputElement).showPicker?.();
                            } catch {}
                          }}
                          className="w-full h-11 px-3.5 pr-10 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                        />
                        <CalendarInputIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] text-[#3D3D49] font-normal">
                        End Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formLeaveEndDate}
                          onChange={(e) => setFormLeaveEndDate(e.target.value)}
                          onClick={(e) => {
                            try {
                              (e.currentTarget as HTMLInputElement).showPicker?.();
                            } catch {}
                          }}
                          className="w-full h-11 px-3.5 pr-10 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                        />
                        <CalendarInputIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Calculated Days Badge */}
                  <div className="border border-[#70B4F5] bg-[#F1F8FE] rounded-[6px] px-3.5 py-2.5 flex items-center gap-2 text-[12px] text-[#0D79E4] font-medium">
                    <CalendarInputIcon className="size-4 text-[#0D79E4]" />
                    <span>{getCalculatedLeaveDays()} {getCalculatedLeaveDays() === 1 ? "Day" : "Days"} Calculated</span>
                  </div>

                  {/* Reason * */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] text-[#3D3D49] font-normal">
                      Reason *
                    </label>
                    <textarea
                      rows={3}
                      value={formLeaveReason}
                      onChange={(e) => setFormLeaveReason(e.target.value)}
                      placeholder="Enter Text"
                      className="w-full p-3 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C] resize-none"
                    />
                  </div>
                </>
              )}

              {/* Action Buttons (Exact Mockup) */}
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
                  className="w-full h-11 rounded-[8px] text-[13px] font-medium text-white flex items-center justify-center gap-2 shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:opacity-95 transition cursor-pointer"
                  style={{
                    background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                  }}
                >
                  <CheckmarkCircleIcon className="size-4 text-white" />
                  <span>{getSubmitButtonLabel()}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1. View Payslip Modal (Exact Mockup 1) */}
      {isSlipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsSlipModalOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
          />
          <div className="relative bg-white rounded-[16px] shadow-2xl border border-[#EDEDED] max-w-[460px] w-full p-6 flex flex-col gap-4 z-10 animate-fade-in">
            {/* Header: Title, PDF button, Close */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EDEDED]">
              <h3 className="text-[#2B2523] font-semibold text-[15px]">
                Payslip — {selectedPayrollForSlip?.payrollNo || "PAY-HR-007"}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="h-7 px-2.5 rounded-[6px] border border-[#EDEDED] hover:bg-neutral-50 text-[11px] font-medium text-[#575765] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PdfIconBadge className="size-3.5 text-[#575765]" />
                  <span>PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsSlipModalOpen(false)}
                  className="size-7 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#8C8C9A] hover:text-[#2B2523] transition-colors cursor-pointer"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>
            </div>

            {/* Employee Card */}
            <div className="bg-[#F9FAFB] border border-[#EDEDED] rounded-[10px] p-3.5 flex items-center gap-3">
              <div className="size-10 rounded-full bg-[#F3EEFF] text-[#8A58FF] text-[12px] font-bold flex items-center justify-center shrink-0">
                {selectedPayrollForSlip?.initials || "AS"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-[#2B2523] text-[14px] leading-tight">
                  {selectedPayrollForSlip?.employee || "Kwame Mensah"}
                </span>
                <span className="text-[12px] text-[#575765] mt-0.5">
                  {selectedPayrollForSlip?.department || "Laptop & Desktop"}
                </span>
              </div>
            </div>

            {/* Employee ID & Pay Period */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[12px] text-[#8C8C9A] font-normal">Employee ID</span>
                <span className="text-[13px] font-semibold text-[#2B2523] mt-0.5">
                  {selectedPayrollForSlip?.employeeId || "TECH-001"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] text-[#8C8C9A] font-normal">Pay Period</span>
                <span className="text-[13px] font-semibold text-[#2B2523] mt-0.5">
                  {selectedPayrollForSlip?.period === "September 2026" ? "20 Aug 2026" : selectedPayrollForSlip?.period || "20 Aug 2026"}
                </span>
              </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col">
              <span className="text-[12px] text-[#8C8C9A] font-normal">Notes</span>
              <span className="text-[13px] font-medium text-[#2B2523] mt-0.5">
                {selectedPayrollForSlip?.notes || "Thanks for your efforts"}
              </span>
            </div>

            {/* Salary Breakdown Table */}
            <div className="border border-[#EDEDED] rounded-[8px] overflow-hidden text-[13px]">
              <div className="flex border-b border-[#EDEDED]">
                <div className="w-1/2 p-2.5 px-3.5 text-[#575765] border-r border-[#EDEDED]">
                  Base Salary
                </div>
                <div className="w-1/2 p-2.5 px-3.5 font-normal text-[#2B2523]">
                  {selectedPayrollForSlip?.baseSalary || "4,5000.00 CFA"}
                </div>
              </div>
              <div className="flex border-b border-[#EDEDED]">
                <div className="w-1/2 p-2.5 px-3.5 text-[#575765] border-r border-[#EDEDED]">
                  Allowances
                </div>
                <div className="w-1/2 p-2.5 px-3.5 font-normal text-[#2B2523]">
                  {selectedPayrollForSlip?.allowances || "5,000.00 CFA"}
                </div>
              </div>
              <div className="flex border-b border-[#EDEDED]">
                <div className="w-1/2 p-2.5 px-3.5 text-[#575765] border-r border-[#EDEDED]">
                  Bonus
                </div>
                <div className="w-1/2 p-2.5 px-3.5 font-normal text-[#2B2523]">
                  {selectedPayrollForSlip?.bonus || "500.00 CFA"}
                </div>
              </div>
              <div className="flex bg-[#50505C] text-white">
                <div className="w-1/2 p-2.5 px-3.5 font-normal border-r border-[#636370]">
                  Gross Salary
                </div>
                <div className="w-1/2 p-2.5 px-3.5 font-normal">
                  {selectedPayrollForSlip?.grossSalary || "4,500.00 CFA"}
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setIsSlipModalOpen(false)}
                className="w-full h-11 border border-[#EDEDED] rounded-[8px] bg-white hover:bg-neutral-50 text-[13px] font-medium text-[#2B2523] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Process Payment Modal (Exact Mockup 2) */}
      {isProcessPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsProcessPaymentModalOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
          />
          <div className="relative bg-white rounded-[16px] shadow-2xl border border-[#EDEDED] max-w-[480px] w-full p-6 flex flex-col gap-4 z-10 animate-fade-in">
            {/* Header: Title, PDF button, Close */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EDEDED]">
              <h3 className="text-[#2B2523] font-semibold text-[15px]">
                Process Payment
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="h-7 px-2.5 rounded-[6px] border border-[#EDEDED] hover:bg-neutral-50 text-[11px] font-medium text-[#575765] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <PdfIconBadge className="size-3.5 text-[#575765]" />
                  <span>PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsProcessPaymentModalOpen(false)}
                  className="size-7 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#8C8C9A] hover:text-[#2B2523] transition-colors cursor-pointer"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>
            </div>

            {/* Summary Box (2x2 grid) */}
            <div className="bg-[#F9FAFB] border border-[#EDEDED] rounded-[10px] p-4 grid grid-cols-2 gap-y-3 gap-x-4 text-[13px]">
              <div className="flex flex-col">
                <span className="text-[11px] text-[#8C8C9A] font-normal">Employee</span>
                <span className="text-[13px] font-semibold text-[#2B2523] mt-0.5 truncate">
                  {selectedPayrollForProcess?.employee || "Emmanuel Boateng"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#8C8C9A] font-normal">Payroll #</span>
                <span className="text-[13px] font-semibold text-[#2B2523] mt-0.5">
                  {selectedPayrollForProcess?.payrollNo || "PAY-HR-007"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#8C8C9A] font-normal">Period</span>
                <span className="text-[13px] font-semibold text-[#2B2523] mt-0.5">
                  {selectedPayrollForProcess?.period || "September 2026"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#8C8C9A] font-normal">Net Salary</span>
                <span className="text-[13px] font-semibold text-[#2B2523] mt-0.5">
                  {selectedPayrollForProcess?.netSalary || "4,5000.00 CFA"}
                </span>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleProcessPaymentSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Payment Date */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-[#3D3D49] font-normal">
                    Payment Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={processPaymentDate}
                      onChange={(e) => setProcessPaymentDate(e.target.value)}
                      className="w-full h-11 px-3.5 pr-10 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                    />
                    <CalendarInputIcon className="size-4 text-[#575765] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] text-[#3D3D49] font-normal">
                    Payment Method
                  </label>
                  <div className="relative">
                    <select
                      value={processPaymentMethod}
                      onChange={(e) => setProcessPaymentMethod(e.target.value)}
                      className="w-full h-11 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] font-normal appearance-none pr-10 outline-none focus:border-[#FF611C] cursor-pointer"
                    >
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Cash">Cash</option>
                      <option value="Mobile Money">Mobile Money</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#575765]" />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-[#3D3D49] font-normal">
                  Notes
                </label>
                <input
                  type="text"
                  value={processPaymentNotes}
                  onChange={(e) => setProcessPaymentNotes(e.target.value)}
                  className="w-full h-11 px-3.5 bg-white border border-[#EDEDED] rounded-[8px] text-[13px] text-[#3D3D49] outline-none focus:border-[#FF611C]"
                />
              </div>

              {/* Info Notice Banner */}
              <div className="p-2.5 px-3 bg-[#E5F4F3]/50 border border-[#009689] rounded-[8px] flex items-center gap-2 text-[12px] text-[#009689]">
                <span className="size-4 rounded-full border border-[#009689] flex items-center justify-center text-[10px] font-bold shrink-0">
                  ⓘ
                </span>
                <span>A Salary Expense transaction will be automatically recorded in Finance.</span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProcessPaymentModalOpen(false)}
                  className="w-full h-11 border border-[#EDEDED] rounded-[8px] bg-white hover:bg-neutral-50 text-[13px] font-medium text-[#2B2523] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="w-full h-11 rounded-[8px] text-[13px] font-medium text-white flex items-center justify-center gap-2 shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:opacity-95 transition cursor-pointer"
                  style={{
                    background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
                  }}
                >
                  <CheckmarkCircleIcon className="size-4 text-white" />
                  <span>Process Payment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Leave Request Modal (Exact Mockup 3) */}
      {isLeaveRequestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsLeaveRequestModalOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
          />
          <div className="relative bg-white rounded-[16px] shadow-2xl border border-[#EDEDED] max-w-[460px] w-full p-6 flex flex-col gap-4 z-10 animate-fade-in">
            {/* Header: Title and Close button */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EDEDED]">
              <h3 className="text-[#2B2523] font-semibold text-[15px]">
                Leave Request
              </h3>
              <button
                type="button"
                onClick={() => setIsLeaveRequestModalOpen(false)}
                className="size-7 rounded-[6px] hover:bg-neutral-100 flex items-center justify-center text-[#8C8C9A] hover:text-[#2B2523] transition-colors cursor-pointer"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            {/* Employee Card */}
            <div className="bg-[#F9FAFB] border border-[#EDEDED] rounded-[10px] p-3.5 flex items-center gap-3">
              <div className="size-10 rounded-full bg-[#F3EEFF] text-[#8A58FF] text-[12px] font-bold flex items-center justify-center shrink-0">
                {selectedLeaveForRequest?.initials || "AS"}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-[#2B2523] text-[14px] leading-tight">
                  {selectedLeaveForRequest?.employee || "Kwame Mensah"}
                </span>
                <span className="text-[12px] text-[#575765] mt-0.5">
                  {selectedLeaveForRequest?.department || "Laptop & Desktop"}
                </span>
              </div>
            </div>

            {/* Leave Details: 2 columns row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[12px] text-[#8C8C9A] font-normal">Leave Type</span>
                <span className="text-[13px] font-semibold text-[#2B2523] mt-0.5">
                  {selectedLeaveForRequest?.type || "Annual Leave"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] text-[#8C8C9A] font-normal">Total Days</span>
                <span className="text-[13px] font-semibold text-[#2B2523] mt-0.5">
                  {selectedLeaveForRequest?.days || "20 days"}
                </span>
              </div>
            </div>

            {/* Leave Details: 2 columns row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-[12px] text-[#8C8C9A] font-normal">Start Date</span>
                <span className="text-[13px] font-semibold text-[#2B2523] mt-0.5">
                  {selectedLeaveForRequest?.startDate || "01 Sept 2026"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] text-[#8C8C9A] font-normal">End Date</span>
                <span className="text-[13px] font-semibold text-[#2B2523] mt-0.5">
                  {selectedLeaveForRequest?.endDate || "21 Sept 2026"}
                </span>
              </div>
            </div>

            {/* Submitted Date */}
            <div className="flex flex-col">
              <span className="text-[12px] text-[#8C8C9A] font-normal">Submitted</span>
              <span className="text-[13px] font-semibold text-[#2B2523] mt-0.5">
                {selectedLeaveForRequest?.submitted || "20 Aug 2026"}
              </span>
            </div>

            {/* Reason */}
            <div className="flex flex-col">
              <span className="text-[12px] text-[#8C8C9A] font-normal">Reason</span>
              <span className="text-[13px] font-normal text-[#2B2523] mt-0.5">
                {selectedLeaveForRequest?.reason || selectedLeaveForRequest?.notes || "Annual vacation leave."}
              </span>
            </div>

            {/* Bottom Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsLeaveRequestModalOpen(false)}
                className="w-full h-11 border border-[#EDEDED] rounded-[8px] bg-white hover:bg-neutral-50 text-[13px] font-medium text-[#2B2523] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
