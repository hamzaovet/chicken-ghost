"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStaff } from "@/context/StaffContext";
import { playSound } from "@/lib/sounds";
import { ShieldCheck, Lock, User, KeyRound, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStaff();
  const [usernameOrPhone, setUsernameOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getRouteForRole(role?: string) {
    if (role === "owner" || role === "manager") return "/dashboard";
    if (role === "delivery") return "/track";
    if (role === "kitchen") return "/kitchen";
    return "/cashier";
  }

  async function handleLogin(
    targetUser?: string,
    targetPass?: string,
    targetPin?: string
  ) {
    const finalUser = (targetUser ?? usernameOrPhone).trim();
    const finalPass = (targetPass ?? password).trim();
    const finalPin = (targetPin ?? pin).trim();

    if (!finalUser) {
      setError("يرجى إدخال اسم المستخدم أو رقم الهاتف");
      return;
    }
    if (!finalPass && !finalPin) {
      setError("يرجى إدخال كلمة المرور أو كود الأمان PIN");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await login(finalUser, finalPass || finalPin, "username", finalPin, finalPass);
      if (res.success && res.user) {
        playSound("success");
        router.push(getRouteForRole(res.user.role));
      } else {
        playSound("alert");
        setError(res.error || "بيانات الدخول غير صحيحة، يرجى التأكد من اليوزر والباسوورد وكود PIN");
      }
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  }

  const staffPresets = [
    {
      label: "👑 المعلم المايسترو (المالك)",
      user: "maestro",
      pass: "123456789",
      pin: "157230",
      color: "#ff6b00",
    },
    {
      label: "👔 مدير المطعم والتشغيل",
      user: "manager",
      pass: "123456789",
      pin: "445566",
      color: "#00f2fe",
    },
    {
      label: "💻 كاشير صالة الشبح (POS)",
      user: "cashier1",
      pass: "123456789",
      pin: "123456",
      color: "#10b981",
    },
    {
      label: "🍳 شيف المطبخ والتجهيز",
      user: "kitchen1",
      pass: "123456789",
      pin: "998877",
      color: "#a855f7",
    },
    {
      label: "🛵 كابتن دليفري الشبح",
      user: "delivery1",
      pass: "123456789",
      pin: "554433",
      color: "#f59e0b",
    },
  ];

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at top, #1a1433 0%, #0b0914 60%, #05040a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "var(--font-cairo), sans-serif",
        color: "#f8fafc",
        position: "relative",
      }}
    >
      {/* Return to Storefront */}
      <Link
        href="/"
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "#94a3b8",
          textDecoration: "none",
          fontSize: "13px",
          fontWeight: 800,
          backgroundColor: "#130f24",
          border: "1px solid #211a3d",
          padding: "6px 14px",
          borderRadius: "100px",
        }}
      >
        <span>العودة للمتجر</span>
        <ArrowRight size={16} />
      </Link>

      {/* Brand Header */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 12px",
            borderRadius: "22px",
            border: "2px solid #ff6b00",
            overflow: "hidden",
            boxShadow: "0 0 25px rgba(255, 107, 0, 0.3)",
            position: "relative",
            backgroundColor: "#0b0914",
          }}
        >
          <img
            src="/logo.png"
            alt="Chicken Ghost"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 900,
            color: "#ff6b00",
            margin: "0 0 4px",
            letterSpacing: "0.5px",
          }}
        >
          تشيكن جوست — Chicken Ghost
        </h1>
        <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, fontWeight: 700 }}>
          بوابة تسجيل الدخول: المالك • الإدارة • الكاشير POS • المطبخ • الدليفري
        </p>
      </div>

      {/* Login Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          backgroundColor: "#130f24",
          border: "1.5px solid #ff6b00",
          borderRadius: "24px",
          padding: "28px 24px",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontSize: "17px",
            fontWeight: 900,
            color: "#f8fafc",
            margin: "0 0 4px",
            textAlign: "center",
          }}
        >
          تسجيل الدخول للمنظومة
        </h2>
        <p
          style={{
            fontSize: "12px",
            color: "#94a3b8",
            margin: "0 0 18px",
            textAlign: "center",
          }}
        >
          أدخل اسم المستخدم أو الهاتف، كلمة المرور، وكود الأمان (PIN)
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          style={{ display: "flex", flexDirection: "column", gap: "14px" }}
        >
          {/* Username / Phone */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 800,
                color: "#cbd5e1",
                marginBottom: "5px",
              }}
            >
              اسم المستخدم أو رقم الهاتف
            </label>
            <div style={{ position: "relative" }}>
              <User size={16} style={{ position: "absolute", right: "12px", top: "13px", color: "#94a3b8" }} />
              <input
                type="text"
                value={usernameOrPhone}
                onChange={(e) => setUsernameOrPhone(e.target.value)}
                placeholder="maestro أو 01010568615"
                dir="ltr"
                style={{
                  width: "100%",
                  height: "42px",
                  backgroundColor: "#0b0914",
                  border: "1px solid #282046",
                  borderRadius: "10px",
                  padding: "0 38px 0 12px",
                  fontSize: "13.5px",
                  color: "#f8fafc",
                  outline: "none",
                  textAlign: "right",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 800,
                color: "#cbd5e1",
                marginBottom: "5px",
              }}
            >
              كلمة المرور
            </label>
            <div style={{ position: "relative" }}>
              <KeyRound size={16} style={{ position: "absolute", right: "12px", top: "13px", color: "#94a3b8" }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="123456789"
                dir="ltr"
                style={{
                  width: "100%",
                  height: "42px",
                  backgroundColor: "#0b0914",
                  border: "1px solid #282046",
                  borderRadius: "10px",
                  padding: "0 38px 0 12px",
                  fontSize: "14px",
                  color: "#f8fafc",
                  outline: "none",
                  textAlign: "right",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* PIN Code */}
          <div>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 800,
                color: "#cbd5e1",
                marginBottom: "5px",
              }}
            >
              كود الأمان السري (PIN)
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", right: "12px", top: "13px", color: "#94a3b8" }} />
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="157230"
                dir="ltr"
                style={{
                  width: "100%",
                  height: "42px",
                  backgroundColor: "#0b0914",
                  border: "1px solid #282046",
                  borderRadius: "10px",
                  padding: "0 38px 0 12px",
                  fontSize: "18px",
                  letterSpacing: "4px",
                  color: "#ff6b00",
                  outline: "none",
                  textAlign: "center",
                  boxSizing: "border-box",
                  fontWeight: 900,
                  fontFamily: "monospace",
                }}
              />
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              style={{
                backgroundColor: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "12px",
                color: "#ef4444",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              height: "44px",
              backgroundColor: "#ff6b00",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "14.5px",
              borderRadius: "10px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 16px rgba(255, 107, 0, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "4px",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>جارٍ التحقق...</span>
              </>
            ) : (
              <span>دخول النظام 🚀</span>
            )}
          </button>
        </form>

        {/* Quick Staff Presets */}
        <div style={{ marginTop: "20px", paddingTop: "14px", borderTop: "1px solid #211a3d" }}>
          <p style={{ margin: "0 0 8px", fontSize: "11px", color: "#94a3b8", textAlign: "center", fontWeight: 700 }}>
            تسجيل دخول سريع للتجربة والتشغيل:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {staffPresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setUsernameOrPhone(preset.user);
                  setPassword(preset.pass);
                  setPin(preset.pin);
                  handleLogin(preset.user, preset.pass, preset.pin);
                }}
                style={{
                  backgroundColor: "#0b0914",
                  border: `1px solid ${preset.color}40`,
                  borderRadius: "8px",
                  padding: "8px 10px",
                  color: preset.color,
                  fontSize: "11.5px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "background-color 0.2s",
                }}
              >
                <span>{preset.label}</span>
                <span style={{ fontSize: "10px", color: "#94a3b8", direction: "ltr", fontFamily: "monospace" }}>
                  PIN: {preset.pin}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Attribution */}
        <div style={{ marginTop: "18px", textAlign: "center", fontSize: "11px", color: "#64748b" }}>
          تم تطوير وبرمجة المنظومة بواسطة أوركا للحلول البرمجية والسحابية 🐬
        </div>
      </div>
    </div>
  );
}
