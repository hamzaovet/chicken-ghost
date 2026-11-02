import "dotenv/config";
import { createHash } from "crypto";
import { prisma } from "../lib/prisma";

function sha256(str: string) {
  return createHash("sha256").update(str).digest("hex");
}

async function main() {
  const staff = [
    {
      name: "المعلم المايسترو (المالك)",
      username: "maestro",
      phone: "01010568615",
      passwordHash: sha256("123456789"),
      pin: "157230",
      role: "owner",
      branch: "فرع حدائق القبة الرئيسي",
      department: "الإدارة العليا",
      isActive: true,
    },
    {
      name: "مدير المطعم والتشغيل",
      username: "manager",
      phone: "01010568616",
      passwordHash: sha256("123456789"),
      pin: "445566",
      role: "manager",
      branch: "فرع حدائق القبة الرئيسي",
      department: "إدارة التشغيل",
      isActive: true,
    },
    {
      name: "كاشير صالة الشبح (POS)",
      username: "cashier1",
      phone: "01010568617",
      passwordHash: sha256("123456789"),
      pin: "123456",
      role: "cashier",
      branch: "فرع حدائق القبة الرئيسي",
      department: "نقطة البيع POS",
      isActive: true,
    },
    {
      name: "شيف المطبخ والتجهيز",
      username: "kitchen1",
      phone: "01010568618",
      passwordHash: sha256("123456789"),
      pin: "998877",
      role: "kitchen",
      branch: "فرع حدائق القبة الرئيسي",
      department: "المطبخ والقلي",
      isActive: true,
    },
    {
      name: "كابتن دليفري الشبح",
      username: "delivery1",
      phone: "01010568619",
      passwordHash: sha256("123456789"),
      pin: "554433",
      role: "delivery",
      branch: "فرع حدائق القبة الرئيسي",
      department: "أسطول التوصيل",
      isActive: true,
    },
  ];

  for (const s of staff) {
    await prisma.user.upsert({
      where: { phone: s.phone },
      update: s,
      create: s,
    });
    console.log(`Updated user: ${s.username} (${s.name}) -> Password: 123456789, PIN: ${s.pin}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
