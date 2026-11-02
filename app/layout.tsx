import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { StaffProvider } from "@/context/StaffContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SoundAlertToggle from "@/components/SoundAlertToggle";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "تشيكن جوست | Chicken Ghost - شبح الفرايد تشيكن والبرجر المقرمش",
  description: "مطعم تشيكن جوست (Chicken Ghost) - أقوى قرمشة في مصر! قطع فرايد تشيكن مقرمشة، بوكسات الشبح الأسطورية، برجر الشبح المحشو بالجبنة السايحة، ديناميت لودد فرايز، وستربس ناري. الفرع الرئيسي: 74 شارع الدويدار، حدائق القبة، القاهرة. دليفري سريع: 01010568615.",
  icons: {
    icon: "/logo.png",
    apple: "/app-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={cairo.variable}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-[#0b0914] text-[#f8fafc] antialiased selection:bg-[#ff6b00] selection:text-[#ffffff]"
        style={{ fontFamily: "var(--font-cairo), 'Segoe UI', Tahoma, sans-serif" }}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <StaffProvider>
            <div style={{ display: "flex", minHeight: "100vh", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <Navbar />
                <main>{children}</main>
              </div>
              <Footer />
            </div>
            <SoundAlertToggle />
          </StaffProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
