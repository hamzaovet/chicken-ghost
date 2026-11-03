"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Download, 
  Smartphone, 
  QrCode, 
  ShieldCheck, 
  Zap, 
  BellRing, 
  ChevronRight, 
  CheckCircle2, 
  Share2, 
  ExternalLink, 
  Sparkles,
  Flame,
  Home
} from "lucide-react";

export default function DownloadAppPage() {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleDownload() {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "/api/download/apk";
    link.setAttribute("download", "chicken-ghost.apk");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setDownloading(false);
    }, 4000);
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: "تطبيق تشيكن جوست للأندرويد",
        text: "حمّل تطبيق تشيكن جوست الرسمي واطلب أقوى فرايد تشيكن وبوكسات الشبح وبرجر كرسبي محشو جبنة سايحة بأسرع دليفري في حدائق القبة والقاهرة!",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0914",
        color: "#f8fafc",
        fontFamily: "var(--font-cairo), sans-serif",
        padding: "30px 16px 80px",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        
        {/* Navigation Breadcrumb */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#ff6b00",
              textDecoration: "none",
              fontWeight: 800,
              fontSize: "14px",
            }}
          >
            <Home size={18} />
            <span>الرجوع للمتجر</span>
          </Link>
          <button
            onClick={handleShare}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "#130f24",
              border: "1px solid #211a3d",
              borderRadius: "100px",
              padding: "6px 14px",
              color: "#cbd5e1",
              fontSize: "12px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            <Share2 size={14} />
            <span>{copied ? "تم النسخ بنجاح! ✅" : "مشاركة الرابط"}</span>
          </button>
        </div>

        {/* Hero Card */}
        <div
          style={{
            backgroundColor: "#130f24",
            border: "2px solid #ff6b00",
            borderRadius: "24px",
            padding: "36px 24px",
            textAlign: "center",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",
              margin: "0 auto 16px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #0b0914 0%, #211a3d 100%)",
              border: "2px solid #ff6b00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "44px",
              boxShadow: "0 0 25px rgba(245, 158, 11, 0.3)",
            }}
          >
            🐟
          </div>

          <span
            style={{
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              color: "#ff6b00",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              borderRadius: "100px",
              padding: "4px 14px",
              fontSize: "12px",
              fontWeight: 900,
              display: "inline-block",
              marginBottom: "12px",
            }}
          >
            النسخة الرسمية 2026 للأندرويد
          </span>

          <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#f8fafc", margin: "0 0 10px" }}>
            تطبيق تشيكن جوست (Chicken Ghost) (APK)
          </h1>

          <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.6, maxWidth: "560px", margin: "0 auto 24px" }}>
            اطلب أشهى وجبات الفرايد تشيكن المقرمشة، بوكسات الشبح العائلية، وسندوتشات البرجر العملاقة مباشرة من هاتفك مع إشعارات حية وتتبع الطيار خطوة بخطوة.
          </p>

          {/* Download Action Button */}
          <a
            href="/api/download/apk"
            download="chicken-ghost.apk"
            style={{
              backgroundColor: "#ff6b00",
              color: "#ffffff",
              border: "none",
              borderRadius: "100px",
              padding: "16px 36px",
              fontSize: "16px",
              fontWeight: 900,
              textDecoration: "none",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(255, 107, 0, 0.4)",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              transition: "transform 0.15s ease",
            }}
          >
            <Download size={20} />
            <span>تحميل التطبيق مباشرة (APK) 🚀</span>
          </a>

          <div style={{ marginTop: "14px", fontSize: "12px", color: "#64748b" }}>
            حجم الملف: 18 ميجابايت • يدعم جميع هواتف أندرويد (Android 8.0+)
          </div>
        </div>

        {/* Features List */}
        <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          <div style={{ backgroundColor: "#130f24", border: "1px solid #211a3d", borderRadius: "16px", padding: "18px" }}>
            <Zap size={24} color="#ff6b00" style={{ marginBottom: "10px" }} />
            <h4 style={{ margin: "0 0 6px", fontSize: "15px", fontWeight: 800 }}>طلب سريع بضغطة زر</h4>
            <p style={{ margin: 0, fontSize: "12.5px", color: "#94a3b8", lineHeight: 1.5 }}>
              حفظ عناوين التوصيل، تكرار الأوردر المفضل، وإمكانية الدفع كاش أو إنستاباي.
            </p>
          </div>

          <div style={{ backgroundColor: "#130f24", border: "1px solid #211a3d", borderRadius: "16px", padding: "18px" }}>
            <BellRing size={24} color="#10b981" style={{ marginBottom: "10px" }} />
            <h4 style={{ margin: "0 0 6px", fontSize: "15px", fontWeight: 800 }}>إشعارات العروض الفورية</h4>
            <p style={{ margin: 0, fontSize: "12.5px", color: "#94a3b8", lineHeight: 1.5 }}>
              خصومات حصرية لمستخدمي التطبيق على بوكسات العزومات ومهرجانات المواسم.
            </p>
          </div>

          <div style={{ backgroundColor: "#130f24", border: "1px solid #211a3d", borderRadius: "16px", padding: "18px" }}>
            <ShieldCheck size={24} color="#38bdf8" style={{ marginBottom: "10px" }} />
            <h4 style={{ margin: "0 0 6px", fontSize: "15px", fontWeight: 800 }}>تطبيق آمن ومعتمد</h4>
            <p style={{ margin: 0, fontSize: "12.5px", color: "#94a3b8", lineHeight: 1.5 }}>
              فحص أمان كامل 100% بدون إعلانات مزعجة وبأداء فائق الخفة والسرعة.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "40px", textAlign: "center", fontSize: "12px", color: "#64748b" }}>
          تم تطوير النظام والتطبيق بواسطة شركة أوركا لتقنية المعلومات — 01018671000 🐬
        </div>
      </div>
    </div>
  );
}
