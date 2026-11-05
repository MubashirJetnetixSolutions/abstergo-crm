"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AbstergoLogo,
  EyeIcon,
  LoginIcon,
  CheckIcon,
} from "@/components/icons/Icons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("kwame.mensah@mensahent.gh");
  const [password, setPassword] = useState("345c678f9ger0hj-kmn-");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push("/");
    }, 400);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#F5F5F5] flex items-center justify-center p-4 select-none overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 size-full pointer-events-none z-0">
        <Image
          src="/login-bg.png"
          alt="Login Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Login Modal Card */}
      <div className="relative z-10 w-full max-w-[560px] rounded-[24px] bg-white border border-[#EDEDED] p-8 sm:p-[36px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] flex flex-col gap-8 sm:gap-[40px] items-center animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <AbstergoLogo className="size-[34px] shrink-0" />
          <div className="flex flex-col leading-none">
            <span className="font-bold text-[#3D3D49] text-[11px] tracking-wider uppercase font-sans">
              Abstergo
            </span>
            <span className="font-bold text-[#3D3D49] text-[11px] tracking-widest uppercase font-sans mt-0.5">
              CRM
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-center font-normal text-[#3D3D49] text-[11px] leading-tight">
          Welcome back! Please enter your details.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="email"
                className="text-[#575765] text-[11px] font-normal leading-none"
              >
                Email
              </label>
              <div className="flex h-[34px] w-full items-center rounded-[8px] border border-[#EDEDED] bg-white px-3.5 shadow-sm transition focus-within:border-[#3D3D49]">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-transparent text-[11px] font-normal text-[#3D3D49] outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="password"
                className="text-[#575765] text-[11px] font-normal leading-none"
              >
                Password
              </label>
              <div className="flex h-[34px] w-full items-center justify-between gap-2.5 rounded-[8px] border border-[#EDEDED] bg-white px-3.5 shadow-sm transition focus-within:border-[#3D3D49]">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-transparent text-[11px] font-normal text-[#3D3D49] outline-none placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0 p-1 text-[#575765] hover:text-[#3D3D49] transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon className="size-5 text-[#575765]" />
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between gap-4 pt-0.5">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={rememberMe}
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`flex size-5 shrink-0 items-center justify-center rounded-[4px] transition ${
                    rememberMe
                      ? "bg-[#3D3D49] text-white"
                      : "bg-[#EDEDED] border border-[#EDEDED] text-transparent hover:bg-gray-200"
                  }`}
                >
                  {rememberMe && <CheckIcon className="size-3.5 text-white stroke-[3]" />}
                </button>
                <span className="text-[11px] font-normal text-[#575765] group-hover:text-[#3D3D49] transition">
                  Remember me
                </span>
              </label>

              <Link
                href="/login#"
                onClick={(e) => e.preventDefault()}
                className="text-[11px] font-medium text-[#FF611C] hover:opacity-85 transition whitespace-nowrap"
              >
                Forgot Password
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-[34px] w-full items-center justify-center gap-2 rounded-[8px] border border-white/20 text-[11px] font-medium text-[#F8FAFD] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:opacity-95 transition disabled:opacity-75 cursor-pointer"
            style={{
              background: "linear-gradient(180deg, #4A4A55 0%, #2E2E35 100%)",
            }}
          >
            <LoginIcon className="size-5 text-[#F8FAFD]" />
            <span>{isLoading ? "Logging in..." : "Login"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
