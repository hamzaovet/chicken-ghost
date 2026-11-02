"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStaff } from "@/context/StaffContext";
import { playSound } from "@/lib/sounds";
import ErpLayout from "@/components/ErpLayout";
import ImageUploader from "@/components/ImageUploader";
import {
  UtensilsCrossed, Plus, X, Pencil, Trash2, Eye, EyeOff,
  Flame, Search, Loader2, Check
} from "lucide-react";

interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  categoryName?: string | null;
  basePrice: number;
  originalPrice?: number | null;
  promoPrice?: number | null;
  promoActive?: boolean;
  packageType?: string | null;
  description?: string | null;
  image?: string | null;
  isAvailable: boolean;
  sortOrder: number;
}

interface CategoryItem {
  id: string;
  nameAr: string;
  nameEn?: string | null;
  sortOrder: number;
}

const DEFAULT_CATEGORIES = [
  "عروض وبوكسات الشبح الأسطورية 👻",
  "قطع الفرايد تشيكن المقرمشة 🍗",
  "سندوتشات وبرجر الشبح العملاق 🍔",
  "ستربس وبايتس مقرمش ناري 🥢",
  "لودد فرايز ومقبلات الشبح 🍟",
  "صوصات الشبح السرية 🥫",
  "مشروبات غازية وحلويات 🥤",
];

export default function MenuAdminPage() {
  const router = useRouter();
  const { currentUser, loading: authLoading } = useStaff();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCat, setFilterCat] = useState("الكل");
  const [editProduct, setEditProduct] = useState<Partial<Product> | null>(null);
  const [saving, setSaving] = useState(false);

  // Quick category creation
  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  const activeCategoryList = Array.from(
    new Set([
      ...DEFAULT_CATEGORIES,
      ...categories.map((c) => c.nameAr),
      ...products.map((p) => p.categoryName || "").filter(Boolean),
    ])
  );

  useEffect(() => {
    if (!authLoading) {
      if (!currentUser && !localStorage.getItem("captain_auth_user")) {
        router.push("/login");
        return;
      }
      loadData();
    }
  }, [authLoading, currentUser, router]);

  async function loadData() {
    setLoading(true);
    await Promise.all([loadProducts(), loadCategories()]);
    setLoading(false);
  }

  async function loadProducts() {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    }
  }

  async function loadCategories() {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch {}
  }

  async function handleSaveProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!editProduct || !editProduct.nameAr || !editProduct.basePrice) return;
    setSaving(true);

    try {
      const isNew = !editProduct.id;
      const url = isNew ? "/api/products" : `/api/products/${editProduct.id}`;
      const method = isNew ? "POST" : "PATCH";

      const payload = {
        nameAr: editProduct.nameAr.trim(),
        nameEn: editProduct.nameEn ? editProduct.nameEn.trim() : editProduct.nameAr.trim(),
        categoryName: editProduct.categoryName || activeCategoryList[0],
        basePrice: Number(editProduct.basePrice),
        originalPrice: editProduct.originalPrice ? Number(editProduct.originalPrice) : null,
        promoPrice: editProduct.promoPrice ? Number(editProduct.promoPrice) : null,
        promoActive: !!editProduct.promoActive,
        packageType: editProduct.packageType || "وجبة كرسبي سوبر",
        description: editProduct.description || "",
        image: editProduct.image || null,
        isAvailable: editProduct.isAvailable !== false,
        sortOrder: editProduct.sortOrder ? Number(editProduct.sortOrder) : 0,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        playSound("success");
        setEditProduct(null);
        await loadProducts();
      } else {
        const err = await res.json();
        alert(err.error || "تعذر حفظ المنتج");
      }
    } catch (err: any) {
      alert(err.message || "حدث خطأ أثناء الحفظ");
    } finally {
      setSaving(false);
    }
  }

  async function toggleAvailability(p: Product) {
    try {
      const nextVal = !p.isAvailable;
      playSound("click");
      setProducts((prev) =>
        prev.map((it) => (it.id === p.id ? { ...it, isAvailable: nextVal } : it))
      );
      await fetch(`/api/products/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: nextVal }),
      });
    } catch {
      await loadProducts();
    }
  }

  async function deleteProduct(p: Product) {
    if (!confirm(`هل أنت متأكد من حذف وجبة "${p.nameAr}" نهائياً من السيستم؟`)) return;
    playSound("alert");
    try {
      const res = await fetch(`/api/products/${p.id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((it) => it.id !== p.id));
      }
    } catch {}
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nameAr: newCatName.trim() }),
      });
      if (res.ok) {
        playSound("success");
        setNewCatName("");
        setShowAddCatModal(false);
        await loadCategories();
      }
    } catch {}
  }

  const filtered = products.filter((p) => {
    const matchesCat = filterCat === "الكل" || p.categoryName === filterCat;
    const matchesSearch =
      !searchQuery.trim() ||
      p.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.nameEn && p.nameEn.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <ErpLayout activeItem="menu">
      <div style={{ padding: "24px 20px 60px", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 900,
                color: "#ff6b00",
                margin: "0 0 6px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span>منيو وجبات تشيكن جوست</span>
              <span style={{ fontSize: "20px" }}>🍗</span>
            </h1>
            <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0, fontWeight: 700 }}>
              إدارة أصناف الفرايد تشيكن، البرجر، البوكسات العائلية، الأسعار، والإتاحة لحظياً
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => setShowAddCatModal(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#130f24",
                border: "1px solid #282046",
                color: "#00f2fe",
                padding: "10px 16px",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              <span>+ إضافة تصنيف جديد</span>
            </button>

            <button
              onClick={() => {
                setEditProduct({
                  nameAr: "",
                  nameEn: "",
                  categoryName: activeCategoryList[0] || "عروض وبوكسات الشبح الأسطورية 👻",
                  basePrice: 150,
                  originalPrice: 180,
                  promoActive: false,
                  packageType: "بوكس الشبح المقرمش",
                  description: "",
                  isAvailable: true,
                  sortOrder: 0,
                  image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop&q=80",
                });
                playSound("click");
              }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: "#ff6b00",
                color: "#ffffff",
                padding: "10px 20px",
                borderRadius: "12px",
                border: "none",
                fontSize: "14px",
                fontWeight: 900,
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(255, 107, 0, 0.35)",
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>إضافة وجبة جديدة +</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div
          style={{
            backgroundColor: "#0d2137",
            border: "1px solid #1a3654",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* Search bar */}
          <div style={{ position: "relative", maxWidth: "500px" }}>
            <Search
              size={18}
              style={{ position: "absolute", right: "12px", top: "12px", color: "#94a3b8" }}
            />
            <input
              type="text"
              placeholder="ابحث باسم الوجبة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                backgroundColor: "#071524",
                border: "1px solid #1a3654",
                borderRadius: "10px",
                color: "#f8fafc",
                padding: "0 38px 0 14px",
                fontSize: "13.5px",
                outline: "none",
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
            {["الكل", ...activeCategoryList].map((c) => {
              const isSelected = filterCat === c;
              return (
                <button
                  key={c}
                  onClick={() => {
                    setFilterCat(c);
                    playSound("click");
                  }}
                  style={{
                    backgroundColor: isSelected ? "#ff6b00" : "#071524",
                    color: isSelected ? "#ffffff" : "#cbd5e1",
                    border: `1px solid ${isSelected ? "#ff6b00" : "#1a3654"}`,
                    padding: "7px 16px",
                    borderRadius: "100px",
                    fontSize: "12.5px",
                    fontWeight: isSelected ? 900 : 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s ease",
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#94a3b8" }}>
            <Loader2 size={36} className="animate-spin" style={{ margin: "0 auto 16px", color: "#ff6b00" }} />
            <p style={{ fontSize: "16px", fontWeight: 700 }}>جارٍ تحميل منيو تشيكن جوست...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#94a3b8" }}>
            <UtensilsCrossed size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
            <p style={{ fontSize: "16px" }}>لا توجد وجبات مطابقة للبحث</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {filtered.map((p) => (
              <div
                key={p.id}
                style={{
                  backgroundColor: "#0d2137",
                  border: `1px solid ${p.isAvailable ? "#1a3654" : "rgba(239, 68, 68, 0.4)"}`,
                  borderRadius: "18px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  opacity: p.isAvailable ? 1 : 0.65,
                  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: "160px", backgroundColor: "#071524" }}>
                  <img
                    src={p.image || "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop&q=80"}
                    alt={p.nameAr}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "rgba(7, 21, 36, 0.85)",
                      border: "1px solid #ff6b00",
                      color: "#ff6b00",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {p.categoryName || "تشيكن جوست"}
                  </span>
                  {!p.isAvailable && (
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        backgroundColor: "#ef4444",
                        color: "#ffffff",
                        fontSize: "11px",
                        fontWeight: 900,
                        padding: "3px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      غير متاح حالياً
                    </span>
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 900, color: "#f8fafc", lineHeight: 1.3 }}>
                    {p.nameAr}
                  </h3>
                  {p.description && (
                    <p style={{ margin: 0, fontSize: "12.5px", color: "#94a3b8", lineHeight: 1.5 }}>
                      {p.description}
                    </p>
                  )}
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "auto" }}>
                    <span style={{ fontSize: "20px", fontWeight: 900, color: "#ff6b00" }}>
                      {p.basePrice} ج.م
                    </span>
                    {p.originalPrice && (
                      <span style={{ fontSize: "13px", color: "#64748b", textDecoration: "line-through" }}>
                        {p.originalPrice} ج.م
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div
                  style={{
                    padding: "10px 16px",
                    borderTop: "1px solid #1a3654",
                    backgroundColor: "#071524",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => toggleAvailability(p)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: p.isAvailable ? "#10b981" : "#ef4444",
                      fontSize: "12px",
                      fontWeight: 800,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {p.isAvailable ? <Eye size={14} /> : <EyeOff size={14} />}
                    <span>{p.isAvailable ? "متاح للبيع" : "معطل"}</span>
                  </button>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => {
                        setEditProduct(p);
                        playSound("click");
                      }}
                      style={{
                        backgroundColor: "#1a3654",
                        border: "none",
                        color: "#f8fafc",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Pencil size={13} />
                      <span>تعديل</span>
                    </button>
                    <button
                      onClick={() => deleteProduct(p)}
                      style={{
                        backgroundColor: "rgba(239, 68, 68, 0.15)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        color: "#ef4444",
                        padding: "6px 10px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                      title="حذف الوجبة"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit / Create Product Modal */}
        {editProduct && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(4px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "600px",
                maxHeight: "90vh",
                overflowY: "auto",
                backgroundColor: "#0d2137",
                border: "2px solid #ff6b00",
                borderRadius: "20px",
                padding: "24px",
                boxSizing: "border-box",
                color: "#f8fafc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h2 style={{ fontSize: "18px", fontWeight: 900, color: "#ff6b00", margin: 0 }}>
                  {editProduct.id ? `تعديل وجبة: ${editProduct.nameAr}` : "إضافة وجبة جديدة للمنيو"}
                </h2>
                <button
                  onClick={() => setEditProduct(null)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#94a3b8",
                    cursor: "pointer",
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* Name AR & EN */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 800, marginBottom: "4px" }}>
                      اسم الوجبة بالعربي *
                    </label>
                    <input
                      type="text"
                      required
                      value={editProduct.nameAr || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, nameAr: e.target.value })}
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "#071524",
                        border: "1px solid #1a3654",
                        borderRadius: "8px",
                        color: "#f8fafc",
                        padding: "0 12px",
                        fontSize: "13px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 800, marginBottom: "4px" }}>
                      الاسم بالإنجليزي
                    </label>
                    <input
                      type="text"
                      value={editProduct.nameEn || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, nameEn: e.target.value })}
                      dir="ltr"
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "#071524",
                        border: "1px solid #1a3654",
                        borderRadius: "8px",
                        color: "#f8fafc",
                        padding: "0 12px",
                        fontSize: "13px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                {/* Category & Package */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 800, marginBottom: "4px" }}>
                      التصنيف / القسم
                    </label>
                    <select
                      value={editProduct.categoryName || activeCategoryList[0]}
                      onChange={(e) => setEditProduct({ ...editProduct, categoryName: e.target.value })}
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "#071524",
                        border: "1px solid #1a3654",
                        borderRadius: "8px",
                        color: "#ff6b00",
                        padding: "0 10px",
                        fontSize: "13px",
                        fontWeight: 800,
                        boxSizing: "border-box",
                      }}
                    >
                      {activeCategoryList.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 800, marginBottom: "4px" }}>
                      نوع العبوة / التغليف
                    </label>
                    <input
                      type="text"
                      value={editProduct.packageType || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, packageType: e.target.value })}
                      placeholder="مثال: بوكس عائلي، خبز بريوش"
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "#071524",
                        border: "1px solid #1a3654",
                        borderRadius: "8px",
                        color: "#f8fafc",
                        padding: "0 12px",
                        fontSize: "13px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                {/* Prices */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 800, marginBottom: "4px" }}>
                      السعر الفعلي (ج.م) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={editProduct.basePrice || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, basePrice: Number(e.target.value) })}
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "#071524",
                        border: "1px solid #1a3654",
                        borderRadius: "8px",
                        color: "#ff6b00",
                        padding: "0 12px",
                        fontSize: "15px",
                        fontWeight: 900,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 800, marginBottom: "4px" }}>
                      السعر الأصلي المشطوب (اختياري)
                    </label>
                    <input
                      type="number"
                      value={editProduct.originalPrice || ""}
                      onChange={(e) => setEditProduct({ ...editProduct, originalPrice: e.target.value ? Number(e.target.value) : null })}
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "#071524",
                        border: "1px solid #1a3654",
                        borderRadius: "8px",
                        color: "#94a3b8",
                        padding: "0 12px",
                        fontSize: "13px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                {/* Image Uploader & Preview */}
                <ImageUploader
                  value={editProduct.image || ""}
                  onChange={(url) => setEditProduct({ ...editProduct, image: url })}
                  label="صورة الوجبة (رابط مباشر أو رفع تلقائي)"
                />

                {/* Description */}
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 800, marginBottom: "4px" }}>
                    مكونات ووصف الوجبة
                  </label>
                  <textarea
                    rows={3}
                    value={editProduct.description || ""}
                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                    placeholder="مثال: 3 قطع فرايد تشيكن مقرمشة + بطاطس + كول سلو + خبز ساخن"
                    style={{
                      width: "100%",
                      backgroundColor: "#071524",
                      border: "1px solid #1a3654",
                      borderRadius: "8px",
                      color: "#f8fafc",
                      padding: "8px 12px",
                      fontSize: "13px",
                      boxSizing: "border-box",
                      resize: "vertical",
                    }}
                  />
                </div>

                {/* Availability Toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
                  <input
                    type="checkbox"
                    id="isAvail"
                    checked={editProduct.isAvailable !== false}
                    onChange={(e) => setEditProduct({ ...editProduct, isAvailable: e.target.checked })}
                    style={{ width: "18px", height: "18px", cursor: "pointer", accentColor: "#ff6b00" }}
                  />
                  <label htmlFor="isAvail" style={{ fontSize: "13px", fontWeight: 800, cursor: "pointer" }}>
                    الوجبة متاحة للطلب الفوري في المنيو والكاشير
                  </label>
                </div>

                {/* Save button */}
                <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                  <button
                    type="submit"
                    disabled={saving}
                    style={{
                      flex: 1,
                      height: "44px",
                      backgroundColor: "#ff6b00",
                      color: "#ffffff",
                      fontWeight: 900,
                      fontSize: "14px",
                      borderRadius: "10px",
                      border: "none",
                      cursor: saving ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                    <span>{saving ? "جارٍ الحفظ..." : "حفظ الوجبة"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditProduct(null)}
                    style={{
                      backgroundColor: "#1a3654",
                      color: "#cbd5e1",
                      border: "none",
                      padding: "0 20px",
                      borderRadius: "10px",
                      fontWeight: 800,
                      cursor: "pointer",
                    }}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Category Modal */}
        {showAddCatModal && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(4px)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "#0d2137",
                border: "1.5px solid #00f2fe",
                borderRadius: "16px",
                padding: "20px",
                boxSizing: "border-box",
                color: "#f8fafc",
              }}
            >
              <h3 style={{ margin: "0 0 12px", fontSize: "16px", fontWeight: 900, color: "#00f2fe" }}>
                إضافة تصنيف منيو جديد
              </h3>
              <form onSubmit={handleAddCategory} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="text"
                  required
                  placeholder="اسم التصنيف (مثال: وجبات التوفير)"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  style={{
                    width: "100%",
                    height: "40px",
                    backgroundColor: "#071524",
                    border: "1px solid #1a3654",
                    borderRadius: "8px",
                    color: "#f8fafc",
                    padding: "0 12px",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      height: "38px",
                      backgroundColor: "#00f2fe",
                      color: "#071524",
                      fontWeight: 900,
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    إضافة
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddCatModal(false)}
                    style={{
                      height: "38px",
                      backgroundColor: "#1a3654",
                      color: "#cbd5e1",
                      borderRadius: "8px",
                      border: "none",
                      padding: "0 16px",
                      cursor: "pointer",
                    }}
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ErpLayout>
  );
}
