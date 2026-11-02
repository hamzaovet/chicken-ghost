"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MapPin, Clock, Smartphone } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer completely on Login and Cashier POS to keep them clean & focused
  if (pathname === "/login" || pathname === "/cashier") {
    return null;
  }

  // On Admin & Operations Pages: Show only a minimalist 1-line legal attribution
  const isAdminPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/kitchen") ||
    pathname.startsWith("/inventory") ||
    pathname.startsWith("/reports") ||
    pathname.startsWith("/customers") ||
    pathname.startsWith("/offers-admin") ||
    pathname.startsWith("/menu-admin") ||
    pathname.startsWith("/users");

  if (isAdminPage) {
    return (
      <footer
        style={{
          width: "100%",
          padding: "16px 20px",
          backgroundColor: "#0b0914",
          borderTop: "1px solid rgba(255, 107, 0, 0.2)",
          textAlign: "center",
          fontSize: "12px",
          color: "#94a3b8",
          direction: "rtl",
        }}
      >
        <span>© {new Date().getFullYear()} تشيكن جوست (Chicken Ghost) • </span>
        <span style={{ color: "#ff6b00", fontWeight: 800 }}>
          تم تطوير المنظومة بواسطة شركة أوركا للحلول البرمجية والخدمات السحابية 🐬
        </span>
      </footer>
    );
  }

  // PUBLIC STOREFRONT FOOTER (Chicken Ghost Midnight & Spicy Orange Theme)
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#0b0914",
        borderTop: "3px solid #ff6b00",
        color: "#f8fafc",
        paddingTop: "48px",
        paddingBottom: "90px", // space for bottom nav bar on mobile
        marginTop: "40px",
        fontFamily: "var(--font-cairo), system-ui, -apple-system, sans-serif",
        direction: "rtl",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "36px",
          boxSizing: "border-box",
        }}
      >
        {/* Column 1: Brand Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                border: "2px solid #ff6b00",
                overflow: "hidden",
                backgroundColor: "#130f24",
                boxShadow: "0 0 15px rgba(255, 107, 0, 0.3)",
                flexShrink: 0,
              }}
            >
              <img
                src="/logo.png"
                alt="Chicken Ghost"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#ff6b00", margin: 0 }}>
                تشيكن جوست - Chicken Ghost
              </h3>
              <p style={{ fontSize: "11px", color: "#00f2fe", margin: 0, fontWeight: 800 }}>
                CHICKEN GHOST • شبح الفرايد تشيكن والبرجر المقرمش • أقوى قرمشة في مصر
              </p>
            </div>
          </div>
          <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#cbd5e1", margin: 0, fontWeight: 600 }}>
            أقوى مطعم متخصص في الفرايد تشيكن والبرجر الكرسبي في حدائق القبة والقاهرة! خلطة سرية وقرمشة سوبر ذهبية، بوكسات الشبح العائلية، ديناميت لودد فرايز، وسندوتشات محشوة جبنة سايحة.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
            <Link
              href="/download"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                backgroundColor: "#ff6b00",
                color: "#ffffff",
                textDecoration: "none",
                fontSize: "12px",
                fontWeight: 900,
                padding: "8px 16px",
                borderRadius: "100px",
                boxShadow: "0 4px 12px rgba(255, 107, 0, 0.3)",
              }}
            >
              <Smartphone size={14} />
              <span>تحميل تطبيق الأندرويد الرسمي (APK)</span>
            </Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: 900, color: "#ff6b00", marginBottom: "8px" }}>
            قائمة وأقسام تشيكن جوست
          </h4>
          <Link href="/#menu-section" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>
            👻 عروض وبوكسات الشبح الأسطورية
          </Link>
          <Link href="/#menu-section" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>
            🍗 قطع الفرايد تشيكن المقرمشة
          </Link>
          <Link href="/#menu-section" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>
            🍔 سندوتشات وبرجر الشبح العملاق
          </Link>
          <Link href="/#menu-section" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>
            🥢 ستربس وبايتس دجاج مقرمش ناري
          </Link>
          <Link href="/#menu-section" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>
            🍟 ديناميت لودد فرايز ومقبلات
          </Link>
          <Link href="/track" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>
            🛵 تتبع خط سير الطيار والأوردر لحظياً
          </Link>
          <Link href="/login" style={{ color: "#94a3b8", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>
            🔐 تسجيل دخول الكاشير والإدارة (POS)
          </Link>
        </div>

        {/* Column 3: Contact & Delivery */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: 900, color: "#ff6b00", marginBottom: "4px" }}>
            الخط الساخن وطلبات الدليفري
          </h4>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "13.5px" }}>
            <Phone size={16} color="#ff6b00" />
            <a href="tel:01010568615" style={{ color: "#f8fafc", textDecoration: "none", fontWeight: 800, direction: "ltr" }}>
              0101 056 8615
            </a>
            <span style={{ color: "#10b981", fontSize: "12px", fontWeight: 700 }}>(الخط الساخن للطلبات)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "13.5px" }}>
            <Phone size={16} color="#10b981" />
            <a href="https://wa.me/201010568615" target="_blank" rel="noopener noreferrer" style={{ color: "#f8fafc", textDecoration: "none", fontWeight: 800, direction: "ltr" }}>
              0101 056 8615
            </a>
            <span style={{ color: "#94a3b8", fontSize: "12px" }}>(واتساب الدليفري والحجز)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#cbd5e1", fontSize: "13.5px" }}>
            <Phone size={16} color="#00f2fe" />
            <a href="tel:01010568616" style={{ color: "#f8fafc", textDecoration: "none", fontWeight: 800, direction: "ltr" }}>
              0101 056 8616
            </a>
            <span style={{ color: "#94a3b8", fontSize: "12px" }}>(إدارة الفرع والشكاوى)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#94a3b8", fontSize: "12.5px", marginTop: "4px" }}>
            <Clock size={15} color="#ff6b00" />
            <span>نعمل يومياً من الساعة 11:00 صباحاً وحتى 3:00 بعد منتصف الليل</span>
          </div>
        </div>

        {/* Column 4: Branch & Delivery Coverage */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h4 style={{ fontSize: "16px", fontWeight: 900, color: "#ff6b00", marginBottom: "4px" }}>
            عنوان المطعم ومناطق التوصيل
          </h4>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "#94a3b8", fontSize: "12.5px", lineHeight: 1.5 }}>
            <MapPin size={18} color="#ff6b00" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span>
              <strong style={{ color: "#f8fafc" }}>فرع المطعم:</strong> 74 شارع الدويدار، حدائق القبة، القاهرة.
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", color: "#94a3b8", fontSize: "12.5px", lineHeight: 1.5 }}>
            <MapPin size={18} color="#10b981" style={{ flexShrink: 0, marginTop: "2px" }} />
            <span>
              <strong style={{ color: "#f8fafc" }}>نطاق توصيل الدليفري:</strong> حدائق القبة والدويدار • الوايلي والعباسية • الزيتون وسراي القبة • مصر الجديدة • مدينة نصر.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Legal Attribution Bar */}
      <div
        style={{
          maxWidth: "1320px",
          margin: "36px auto 0",
          padding: "20px 24px 0",
          borderTop: "1px solid rgba(255, 107, 0, 0.2)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "14px",
          fontSize: "12px",
          color: "#94a3b8",
        }}
      >
        <span>
          © {new Date().getFullYear()} تشيكن جوست (Chicken Ghost). جميع الحقوق محفوظة.
        </span>
        <div>
          <span
            style={{
              color: "#ff6b00",
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            تم تطوير وبرمجة المنظومة بواسطة شركة أوركا للحلول البرمجية والخدمات السحابية 🐬
          </span>
        </div>
      </div>
    </footer>
  );
}
