"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStaff } from "@/context/StaffContext";
import { playSound } from "@/lib/sounds";
import {
  Phone, MapPin, Headphones, Download, ShieldCheck,
  ShoppingBag, Menu, X, User, Flame, Smartphone, Sparkles
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, isAuthenticated } = useStaff();

  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkWidth = () => {
      setIsMobile(window.innerWidth < 880);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);

    function syncCart() {
      try {
        const raw = localStorage.getItem("captain_cart");
        if (raw) {
          const items = JSON.parse(raw);
          const totalQty = items.reduce((s: number, i: any) => s + (i.qty || 1), 0);
          const totalSum = items.reduce((s: number, i: any) => s + (i.unitPrice || 0) * (i.qty || 1), 0);
          setCartCount(totalQty);
          setCartTotal(totalSum);
        } else {
          setCartCount(0);
          setCartTotal(0);
        }
      } catch {
        setCartCount(0);
        setCartTotal(0);
      }
    }

    syncCart();
    window.addEventListener("captain_cart_update", syncCart);

    return () => {
      window.removeEventListener("resize", checkWidth);
      window.removeEventListener("captain_cart_update", syncCart);
    };
  }, []);

  function openCartModal() {
    playSound("click");
    window.dispatchEvent(new CustomEvent("open_cart_modal"));
  }

  // Hide Navbar completely on Cashier POS and Login page
  if (pathname === "/cashier" || pathname === "/login") {
    return null;
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#0b0914",
        borderBottom: "2px solid #ff6b00",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
        fontFamily: "var(--font-cairo), sans-serif",
      }}
    >
      {/* ── TOP ANNOUNCEMENT BAR (Desktop only) ── */}
      <div
        className="nav-desktop-only"
        style={{
          backgroundColor: "#06050b",
          color: "#cbd5e1",
          fontSize: "12px",
          fontWeight: 800,
          padding: "6px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid rgba(255, 107, 0, 0.15)",
        }}
      >
          {/* Branches / Location */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={14} color="#ff6b00" />
            <span>
              مطعم تشيكن جوست: 74 شارع الدويدار - حدائق القبة - القاهرة • أقوى فرايد تشيكن وبرجر
            </span>
          </div>

          {/* Hotlines and Service hours */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Headphones size={14} color="#ff6b00" />
              <span>خدمة العملاء والدليفري: يومياً من 11:00 ص حتى 3:00 ص</span>
            </div>
            <a
              href="tel:01010568615"
              style={{
                color: "#ff6b00",
                textDecoration: "none",
                fontWeight: 900,
                display: "flex",
                alignItems: "center",
                gap: "5px",
                direction: "ltr",
              }}
            >
              <Phone size={13} />
              <span>0101 056 8615</span>
            </a>
          </div>
        </div>

      {/* ── MAIN NAVBAR BAR ── */}
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: isMobile ? "8px 12px" : "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {/* RIGHT (in RTL): Brand Logo & Name */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "8px" : "12px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: isMobile ? "38px" : "50px",
              height: isMobile ? "38px" : "50px",
              borderRadius: "14px",
              border: "2px solid #ff6b00",
              overflow: "hidden",
              backgroundColor: "#130f24",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 12px rgba(255, 107, 0, 0.3)",
              flexShrink: 0,
            }}
          >
            <img
              src="/logo.png"
              alt="Chicken Ghost"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              className="brand-title-compact"
              style={{
                fontSize: "16px",
                fontWeight: 900,
                color: "#ff6b00",
                lineHeight: 1.1,
                letterSpacing: "0.5px",
              }}
            >
              تشيكن جوست
            </span>
            <span
              className="brand-title-full"
              style={{
                fontSize: "22px",
                fontWeight: 900,
                color: "#ff6b00",
                lineHeight: 1.1,
                letterSpacing: "0.5px",
              }}
            >
              تشيكن جوست - Chicken Ghost
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 800,
                color: "#00f2fe",
                letterSpacing: "0.5px",
              }}
            >
              CHICKEN GHOST 👻 أقوى قرمشة
            </span>
          </div>
        </Link>

        {/* CENTER: Navigation Links (Desktop) */}
        <nav
          className="nav-desktop-only"
          style={{
            alignItems: "center",
            gap: "20px",
            fontSize: "14px",
            fontWeight: 800,
          }}
        >
          <Link
            href="/"
            style={{
              color: pathname === "/" ? "#ff6b00" : "#f8fafc",
              textDecoration: "none",
              transition: "color 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>الرئيسية</span>
          </Link>

          <Link
            href="/#menu-section"
            style={{
              color: "#f8fafc",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span>منيو الفرايد تشيكن والبرجر 🍗</span>
          </Link>

          <Link
            href="/#offers-section"
            style={{
              color: "#ff6b00",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Flame size={15} color="#ff6b00" />
            <span>عروض وبوكسات الشبح 🔥</span>
          </Link>

          <Link
            href="/download"
            style={{
              color: "#f8fafc",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <Smartphone size={15} color="#00f2fe" />
            <span>تحميل التطبيق</span>
          </Link>

          <Link
            href="/track"
            style={{
              color: "#f8fafc",
              textDecoration: "none",
            }}
          >
            <span>تتبع الأوردر 🛵</span>
          </Link>
        </nav>

        {/* LEFT (in RTL): Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {/* Quick Call hotline button on Mobile */}
          <a
            href="tel:01010568615"
            className="nav-mobile-only"
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              color: "#FFFFFF",
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(16, 185, 129, 0.4)",
            }}
            title="اتصل بالدليفري"
          >
            <Phone size={15} />
          </a>

          {/* Cart Button */}
          <button
            onClick={openCartModal}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: isMobile ? "4px" : "8px",
              backgroundColor: "#ff6b00",
              color: "#ffffff",
              border: "none",
              padding: isMobile ? "7px 10px" : "8px 16px",
              borderRadius: "100px",
              fontWeight: 900,
              fontSize: isMobile ? "12px" : "13.5px",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(255, 107, 0, 0.35)",
            }}
          >
            <div style={{ position: "relative" }}>
              <ShoppingBag size={isMobile ? 16 : 18} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-9px",
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    borderRadius: "50%",
                    fontSize: "10px",
                    fontWeight: 900,
                    width: "17px",
                    height: "17px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #ffffff",
                  }}
                >
                  {cartCount}
                </span>
              )}
            </div>
            {!isMobile ? (
              <span>{cartTotal > 0 ? `${cartTotal} ج.م` : "السلة"}</span>
            ) : (
              cartTotal > 0 && <span>{cartTotal} ج.م</span>
            )}
          </button>

          {/* Desktop Staff / Login */}
          <div className="nav-desktop-only">
            {isAuthenticated && currentUser ? (
              <Link
                href="/dashboard"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#130f24",
                  border: "1px solid #282046",
                  color: "#ff6b00",
                  padding: "8px 14px",
                  borderRadius: "100px",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontWeight: 800,
                }}
              >
                <ShieldCheck size={14} color="#ff6b00" />
                <span>{currentUser.name.split(" ")[0]}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "#130f24",
                  border: "1px solid #282046",
                  color: "#cbd5e1",
                  padding: "8px 14px",
                  borderRadius: "100px",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontWeight: 800,
                }}
              >
                <User size={14} />
                <span>دخول الإدارة والـ POS</span>
              </Link>
            )}
          </div>

          {/* Mobile menu hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="nav-mobile-only"
            style={{
              width: "36px",
              height: "36px",
              background: "#130f24",
              border: "1px solid #282046",
              borderRadius: "10px",
              color: "#ff6b00",
              cursor: "pointer",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="القائمة"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU DROPDOWN ── */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: "#0b0914",
            borderTop: "1px solid #211a3d",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#f8fafc", textDecoration: "none", fontSize: "14px", fontWeight: 800 }}
          >
            🏠 الرئيسية
          </Link>
          <Link
            href="/#menu-section"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#f8fafc", textDecoration: "none", fontSize: "14px", fontWeight: 800 }}
          >
            🍗 منيو الفرايد تشيكن والبرجر
          </Link>
          <Link
            href="/#offers-section"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#ff6b00", textDecoration: "none", fontSize: "14px", fontWeight: 800 }}
          >
            🔥 عروض وبوكسات الشبح
          </Link>
          <Link
            href="/download"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#00f2fe", textDecoration: "none", fontSize: "14px", fontWeight: 800 }}
          >
            📱 تحميل تطبيق الأندرويد (APK)
          </Link>
          <Link
            href="/track"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#f8fafc", textDecoration: "none", fontSize: "14px", fontWeight: 800 }}
          >
            🛵 تتبع أوردر الدليفري
          </Link>
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#ff6b00",
              textDecoration: "none",
              fontSize: "13.5px",
              fontWeight: 800,
              paddingTop: "8px",
              borderTop: "1px solid #211a3d",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            🔐 دخول الكاشير والإدارة (POS)
          </Link>
        </div>
      )}
    </header>
  );
}
