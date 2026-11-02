import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  console.log("👻 Seeding Chicken Ghost (تشيكن جوست) Database on Neon Postgres...");

  // 1. System Settings
  await prisma.systemSettings.upsert({
    where: { id: "default" },
    update: {
      restaurantName: "تشيكن جوست - Chicken Ghost",
      phone: "01010568615",
      hotlines: "01010568615 | 01010568616",
      address: "74 شارع الدويدار - حدائق القبة - القاهرة",
      whatsappNumber: "01010568615",
      ownerWhatsapp: "01010568615",
      receiptHeader: "تشيكن جوست 👻 Chicken Ghost • شبح الفرايد تشيكن والبرجر المقرمش",
      receiptFooter: "ألف هنا وشفا 👻 شكراً لاختياركم تشيكن جوست • دليفري سريع: 01010568615",
      autoPrintReceipt: true,
      receiptWidth: "80mm",
      soundsEnabled: true,
      offersEnabled: true,
      openingCashBalance: 15000.0,
    },
    create: {
      id: "default",
      restaurantName: "تشيكن جوست - Chicken Ghost",
      phone: "01010568615",
      hotlines: "01010568615 | 01010568616",
      address: "74 شارع الدويدار - حدائق القبة - القاهرة",
      whatsappNumber: "01010568615",
      ownerWhatsapp: "01010568615",
      receiptHeader: "تشيكن جوست 👻 Chicken Ghost • شبح الفرايد تشيكن والبرجر المقرمش",
      receiptFooter: "ألف هنا وشفا 👻 شكراً لاختياركم تشيكن جوست • دليفري سريع: 01010568615",
      autoPrintReceipt: true,
      receiptWidth: "80mm",
      soundsEnabled: true,
      offersEnabled: true,
      openingCashBalance: 15000.0,
    },
  });

  // 2. Staff Accounts with PINs
  const staff = [
    {
      name: "المعلم المايسترو (المالك)",
      username: "maestro",
      phone: "01010568615",
      pin: "112233",
      role: "owner",
      branch: "فرع حدائق القبة الرئيسي",
      department: "الإدارة العليا",
    },
    {
      name: "مدير المطعم والتشغيل",
      username: "manager",
      phone: "01010568616",
      pin: "445566",
      role: "manager",
      branch: "فرع حدائق القبة الرئيسي",
      department: "إدارة التشغيل",
    },
    {
      name: "كاشير الصالة والتيك أواي",
      username: "cashier1",
      phone: "01010568617",
      pin: "123456",
      role: "cashier",
      branch: "فرع حدائق القبة الرئيسي",
      department: "نقطة البيع POS",
    },
    {
      name: "شيف المطبخ وتجهيز الشبح",
      username: "kitchen1",
      phone: "01010568618",
      pin: "998877",
      role: "kitchen",
      branch: "فرع حدائق القبة الرئيسي",
      department: "المطبخ والقلي",
    },
    {
      name: "كابتن دليفري الشبح",
      username: "delivery1",
      phone: "01010568619",
      pin: "554433",
      role: "delivery",
      branch: "فرع حدائق القبة الرئيسي",
      department: "أسطول التوصيل",
    },
  ];

  for (const s of staff) {
    await prisma.user.upsert({
      where: { phone: s.phone },
      update: s,
      create: s,
    });
  }

  // 3. Branches
  const branches = [
    {
      name: "فرع حدائق القبة الرئيسي",
      city: "القاهرة",
      address: "74 شارع الدويدار، حدائق القبة",
      phone: "01010568615",
      managerName: "كابتن جوست",
      sortOrder: 1,
    },
    {
      name: "فرع الوايلي والعباسية",
      city: "القاهرة",
      address: "شارع العباسية الرئيسي تقاطع أحمد سعيد",
      phone: "01010568616",
      managerName: "أحمد شبح",
      sortOrder: 2,
    },
    {
      name: "فرع الزيتون وسراي القبة",
      city: "القاهرة",
      address: "ميدان ابن سندر، سراي القبة",
      phone: "01010568617",
      managerName: "محمود فانتوم",
      sortOrder: 3,
    },
    {
      name: "فرع مدينة نصر ومصر الجديدة",
      city: "القاهرة",
      address: "شارع مصطفى النحاس، الحي الثامن",
      phone: "01010568618",
      managerName: "إسلام سبايسي",
      sortOrder: 4,
    },
  ];

  for (const b of branches) {
    await prisma.branch.upsert({
      where: { name: b.name },
      update: b,
      create: b,
    });
  }

  // 4. Delivery Zones
  const zones = [
    { nameAr: "حدائق القبة والدويدار وسكة الوايلي", nameEn: "Hadayek El-Kobba & Douidar", fee: 15, timeMinutes: 25, branch: "فرع حدائق القبة الرئيسي" },
    { nameAr: "الوايلي الكبير وميدان الجيش والعباسية", nameEn: "El-Wayli & Abbassia", fee: 20, timeMinutes: 30, branch: "فرع حدائق القبة الرئيسي" },
    { nameAr: "الزيتون وسراي القبة وحمامات القبة", nameEn: "Zeitoun & Saray El-Kobba", fee: 20, timeMinutes: 30, branch: "فرع حدائق القبة الرئيسي" },
    { nameAr: "الزاوية الحمراء ودير الملاك والقصيرين", nameEn: "Zawya Hamra & Deir El-Malak", fee: 20, timeMinutes: 30, branch: "فرع حدائق القبة الرئيسي" },
    { nameAr: "مصر الجديدة وروكسي والأهرام", nameEn: "Heliopolis & Roxy", fee: 30, timeMinutes: 40, branch: "فرع حدائق القبة الرئيسي" },
    { nameAr: "مدينة نصر (أول وثان والحي السابع)", nameEn: "Nasr City", fee: 35, timeMinutes: 45, branch: "فرع حدائق القبة الرئيسي" },
    { nameAr: "شبرا وميدان فيكتوريا وأحمد حلمي", nameEn: "Shubra & Ahmed Helmy", fee: 35, timeMinutes: 45, branch: "فرع حدائق القبة الرئيسي" },
    { nameAr: "عين شمس وجسر السويس والألف مسكن", nameEn: "Ain Shams & Gesr El-Suez", fee: 35, timeMinutes: 45, branch: "فرع حدائق القبة الرئيسي" },
  ];

  for (const z of zones) {
    const existing = await prisma.deliveryZone.findFirst({ where: { nameAr: z.nameAr } });
    if (existing) {
      await prisma.deliveryZone.update({ where: { id: existing.id }, data: z });
    } else {
      await prisma.deliveryZone.create({ data: z });
    }
  }

  // 5. Categories
  const categories = [
    {
      id: "cat-deals",
      nameAr: "عروض وبوكسات الشبح الأسطورية 👻",
      nameEn: "Ghost Deals & Legendary Buckets",
      emoji: "👻",
      description: "أقوى عروض التوفير والقرمشة والوجبات العائلية الحصرية",
      sortOrder: 1,
    },
    {
      id: "cat-chicken",
      nameAr: "قطع الفرايد تشيكن المقرمشة 🍗",
      nameEn: "Crispy Fried Chicken Pieces",
      emoji: "🍗",
      description: "فراخ طازجة بتتبيلة الشبح السرية وقرمشة سوبر ذهبية",
      sortOrder: 2,
    },
    {
      id: "cat-burgers",
      nameAr: "سندوتشات وبرجر الشبح العملاق 🍔",
      nameEn: "Ghost Burgers & Giant Sandwiches",
      emoji: "🍔",
      description: "برجر مقرمش محشو بالجبنة السايحة وصوصات الديناميت",
      sortOrder: 3,
    },
    {
      id: "cat-strips",
      nameAr: "ستربس وبايتس مقرمش ناري 🥢",
      nameEn: "Crispy Chicken Strips & Bites",
      emoji: "🥢",
      description: "صدور دجاج مخلية ومقرمشة بنكهات أوريجينال وسبايسي حار",
      sortOrder: 4,
    },
    {
      id: "cat-sides",
      nameAr: "لودد فرايز ومقبلات الشبح 🍟",
      nameEn: "Loaded Ghost Fries & Sides",
      emoji: "🍟",
      description: "بطاطس محمرة شيدر ولودد فرايز مع حلقات البصل والكول سلو",
      sortOrder: 5,
    },
    {
      id: "cat-sauces",
      nameAr: "صوصات الشبح السرية 🥫",
      nameEn: "Ghost Secret Signature Sauces",
      emoji: "🥫",
      description: "صوص الشبح الحار، شيدر سايح، رانش كريمي، وباربيكيو مدخن",
      sortOrder: 6,
    },
    {
      id: "cat-drinks",
      nameAr: "مشروبات غازية وحلويات 🥤",
      nameEn: "Beverages & Desserts",
      emoji: "🥤",
      description: "مشروبات ساقحة ومنعشة ومثلجات وبراونيز الشوكولاتة",
      sortOrder: 7,
    },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { id: c.id },
      update: c,
      create: c,
    });
  }

  // 6. Products
  const products = [
    // --- 👻 عروض وبوكسات الشبح ---
    {
      nameAr: "عرض القاتل الأسطوري (Killer Ghost Deal)",
      nameEn: "Killer Ghost Deal",
      categoryName: "عروض وبوكسات الشبح الأسطورية 👻",
      categoryId: "cat-deals",
      basePrice: 175.0,
      originalPrice: 210.0,
      promoPrice: 175.0,
      promoActive: true,
      isFlashDeal: true,
      weightUnit: "وجبة سوبر",
      packageType: "بوكس الشبح الفاخر",
      description: "3 قطع فرايد تشيكن مقرمشة + 2 قطعة ستربس سبايسي + بطاطس لارج + كول سلو + خبز + بيبسي كانز",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80",
      sortOrder: 1,
    },
    {
      nameAr: "شبح التوفير (Ghost Saver Bucket 8 Pcs)",
      nameEn: "Ghost Saver Bucket 8 Pcs",
      categoryName: "عروض وبوكسات الشبح الأسطورية 👻",
      categoryId: "cat-deals",
      basePrice: 325.0,
      originalPrice: 380.0,
      promoPrice: 325.0,
      promoActive: true,
      isFlashDeal: true,
      weightUnit: "باكيت 8 قطع",
      packageType: "سطل الشبح العائلي",
      description: "باكيت 8 قطع فرايد تشيكن سوبر مقرمش (عادي أو حار) + 2 بطاطس وسط + 2 كول سلو + 4 خبز طازج",
      image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&auto=format&fit=crop&q=80",
      sortOrder: 2,
    },
    {
      nameAr: "ميجا بوكس الشبح العائلي 15 قطعة",
      nameEn: "Ghost Mega Family Bucket 15 Pcs",
      categoryName: "عروض وبوكسات الشبح الأسطورية 👻",
      categoryId: "cat-deals",
      basePrice: 585.0,
      originalPrice: 660.0,
      promoPrice: 585.0,
      promoActive: true,
      weightUnit: "بوكس عائلي 15 قطعة",
      packageType: "ميجا بوكس الحفلات",
      description: "15 قطعة فرايد تشيكن مقرمش ذهبي + بطاطس فاميلي + لتر بيبسي + كول سلو لارج + 6 خبز + صوصات",
      image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=600&auto=format&fit=crop&q=80",
      sortOrder: 3,
    },
    {
      nameAr: "بوكس الدبوس الشبح (Ghost Drumsticks Box)",
      nameEn: "Ghost Drumsticks Box 5 Pcs",
      categoryName: "عروض وبوكسات الشبح الأسطورية 👻",
      categoryId: "cat-deals",
      basePrice: 185.0,
      originalPrice: 205.0,
      promoPrice: 185.0,
      promoActive: false,
      weightUnit: "وجبة 5 دبابيس",
      packageType: "بوكس مقرمش",
      description: "5 قطع دبابيس مقرمشة سوبر جوسي متبلة بتتبيلة الشبح + بطاطس + صوص شيدر + خبز",
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80",
      sortOrder: 4,
    },

    // --- 🍗 قطع الفرايد تشيكن ---
    {
      nameAr: "وجبة الشبح المنفردة 3 قطع (Single Ghost Meal)",
      nameEn: "Single Ghost 3 Pcs Meal",
      categoryName: "قطع الفرايد تشيكن المقرمشة 🍗",
      categoryId: "cat-chicken",
      basePrice: 155.0,
      weightUnit: "وجبة فردية",
      packageType: "وجبة مقرمشة",
      description: "3 قطع فراخ مقرمشة خلطة سرية + بطاطس محمرة + كول سلو فريش + خبز ساخن",
      image: "https://images.unsplash.com/photo-1527477321005-4d01314b433b?w=600&auto=format&fit=crop&q=80",
      sortOrder: 5,
    },
    {
      nameAr: "وجبة الشبح المزدوجة 4 قطع (Ghost Duo 4 Pcs)",
      nameEn: "Ghost Duo 4 Pcs Meal",
      categoryName: "قطع الفرايد تشيكن المقرمشة 🍗",
      categoryId: "cat-chicken",
      basePrice: 195.0,
      weightUnit: "وجبة 4 قطع",
      packageType: "وجبة سوبر",
      description: "4 قطع فراخ مقرمشة (صدور وأوراك) + بطاطس لارج + كول سلو + 2 خبز + صوص جوست",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80",
      sortOrder: 6,
    },
    {
      nameAr: "باكيت الشبح الكرانشي 6 قطع (Crispy 6 Pcs Box)",
      nameEn: "Crispy 6 Pcs Box",
      categoryName: "قطع الفرايد تشيكن المقرمشة 🍗",
      categoryId: "cat-chicken",
      basePrice: 285.0,
      weightUnit: "باكيت 6 قطع",
      packageType: "باكيت متوسط",
      description: "6 قطع فرايد تشيكن خلطة الشبح الخاصة + بطاطس لارج + 2 كول سلو + 3 خبز",
      image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&auto=format&fit=crop&q=80",
      sortOrder: 7,
    },
    {
      nameAr: "باكيت الشبح الذهبي 9 قطع (Golden 9 Pcs Bucket)",
      nameEn: "Golden 9 Pcs Bucket",
      categoryName: "قطع الفرايد تشيكن المقرمشة 🍗",
      categoryId: "cat-chicken",
      basePrice: 410.0,
      weightUnit: "سطل 9 قطع",
      packageType: "سطل الشبح",
      description: "9 قطع فراخ مقلية ذهبية مقرمشة + بطاطس فاميلي + 3 كول سلو + 4 خبز + صوصين",
      image: "https://images.unsplash.com/photo-1513639776629-7b61b0ac49cb?w=600&auto=format&fit=crop&q=80",
      sortOrder: 8,
    },

    // --- 🍔 سندوتشات وبرجر الشبح ---
    {
      nameAr: "سندوتش جوست العملاق (The Monster Ghost Burger)",
      nameEn: "The Monster Ghost Burger",
      categoryName: "سندوتشات وبرجر الشبح العملاق 🍔",
      categoryId: "cat-burgers",
      basePrice: 145.0,
      originalPrice: 165.0,
      promoPrice: 145.0,
      promoActive: true,
      weightUnit: "سندوتش سنجل سوبر",
      packageType: "خبز بريوش فاخر",
      description: "قطعة صدور دجاج كرسبي عملاقة + بيكون مدخن + جبنة شيدر سايحة + خس مقرمش + صوص جوست السري",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80",
      sortOrder: 9,
    },
    {
      nameAr: "سندوتش فاير جوست سبايسي (Fire Ghost Spicy Burger)",
      nameEn: "Fire Ghost Spicy Burger",
      categoryName: "سندوتشات وبرجر الشبح العملاق 🍔",
      categoryId: "cat-burgers",
      basePrice: 155.0,
      weightUnit: "سندوتش سبايسي",
      packageType: "خبز بريوش حار",
      description: "صدر دجاج كرسبي ناري حار جداً + هالبينو مقرمش + صوص ديناميت جوست + شرائح شيدر حارة",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80",
      sortOrder: 10,
    },
    {
      nameAr: "سندوتش تشيزي تورنيدو جوست (Cheesy Tornado Ghost)",
      nameEn: "Cheesy Tornado Ghost",
      categoryName: "سندوتشات وبرجر الشبح العملاق 🍔",
      categoryId: "cat-burgers",
      basePrice: 175.0,
      weightUnit: "سندوتش محشو جبنة",
      packageType: "محشو جبنة سايحة",
      description: "دجاج مقرمش محشو بالجبنة الموتزاريلا والشيدر السايحة + صوص رانش + شرائح تركي مدخن",
      image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
      sortOrder: 11,
    },
    {
      nameAr: "سندوتش بيج جوست دبل (Big Ghost Double Stack)",
      nameEn: "Big Ghost Double Stack",
      categoryName: "سندوتشات وبرجر الشبح العملاق 🍔",
      categoryId: "cat-burgers",
      basePrice: 195.0,
      weightUnit: "سندوتش دبل",
      packageType: "دبل كرسبي تشيكن",
      description: "طبقتين من صدور الفراخ الكرسبي المقرمشة + دوبل جبنة شيدر + صوص باربيكيو مدخن",
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=600&auto=format&fit=crop&q=80",
      sortOrder: 12,
    },

    // --- 🥢 ستربس وبايتس دجاج ---
    {
      nameAr: "وجبة سوبر ستربس 4 قطع (Super Strips 4 Pcs)",
      nameEn: "Super Strips 4 Pcs Meal",
      categoryName: "ستربس وبايتس مقرمش ناري 🥢",
      categoryId: "cat-strips",
      basePrice: 135.0,
      weightUnit: "وجبة 4 قطع",
      packageType: "ستربس مقرمش",
      description: "4 قطع صدور دجاج ستربس مقرمشة بدون عظم + بطاطس + صوص اختيارك (شيدر أو باربيكيو) + خبز",
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&auto=format&fit=crop&q=80",
      sortOrder: 13,
    },
    {
      nameAr: "وجبة جوست ستربس لارج 7 قطع (Ghost Strips 7 Pcs)",
      nameEn: "Ghost Strips 7 Pcs Meal",
      categoryName: "ستربس وبايتس مقرمش ناري 🥢",
      categoryId: "cat-strips",
      basePrice: 195.0,
      weightUnit: "وجبة 7 قطع لارج",
      packageType: "بوكس ستربس لارج",
      description: "7 قطع ستربس كرسبي سوبر تندر + بطاطس لارج + كول سلو + 2 صوص + خبز",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop&q=80",
      sortOrder: 14,
    },
    {
      nameAr: "باكيت تشيكن بوب كورن الشبح (Ghost Popcorn Bites)",
      nameEn: "Ghost Popcorn Chicken Bites",
      categoryName: "ستربس وبايتس مقرمش ناري 🥢",
      categoryId: "cat-strips",
      basePrice: 110.0,
      weightUnit: "باكيت بوب كورن",
      packageType: "بوب كورن شيدر",
      description: "باكيت بايتس دجاج مقرمشة بتتبيلة خاصة غارقة بصوص الشيدر ورشة بابريكا مدخنة",
      image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=600&auto=format&fit=crop&q=80",
      sortOrder: 15,
    },

    // --- 🍟 لودد فرايز ومقبلات ---
    {
      nameAr: "ديناميت جوست فرايز (Dynamite Ghost Loaded Fries)",
      nameEn: "Dynamite Ghost Loaded Fries",
      categoryName: "لودد فرايز ومقبلات الشبح 🍟",
      categoryId: "cat-sides",
      basePrice: 99.0,
      originalPrice: 120.0,
      promoPrice: 99.0,
      promoActive: true,
      weightUnit: "طبق لودد عائلي",
      packageType: "طبق لودد كرسبي",
      description: "طبق بطاطس مقرمشة ذهبية محملة بقطع الستربس الكرسبي + شيدر سايح + هالبينو + صوص الشبح السري",
      image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=600&auto=format&fit=crop&q=80",
      sortOrder: 16,
    },
    {
      nameAr: "بطاطس فارم فرايتس شيدر (Cheesy Fries)",
      nameEn: "Cheesy Fries",
      categoryName: "لودد فرايز ومقبلات الشبح 🍟",
      categoryId: "cat-sides",
      basePrice: 65.0,
      weightUnit: "طبق بطاطس",
      packageType: "بطاطس شيدر",
      description: "بطاطس محمرة كرانشي مغطاة بصوص جبنة شيدر أمريكي أصلي سايح",
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&auto=format&fit=crop&q=80",
      sortOrder: 17,
    },
    {
      nameAr: "سلطة كول سلو الشبح فريش (Ghost Fresh Coleslaw)",
      nameEn: "Ghost Fresh Coleslaw",
      categoryName: "لودد فرايز ومقبلات الشبح 🍟",
      categoryId: "cat-sides",
      basePrice: 35.0,
      weightUnit: "علبة كول سلو",
      packageType: "طازج يومي",
      description: "كول سلو طازجة يومية بالمايونيز الفاخر والكرنب والجزر المبشور بالعسل",
      image: "https://images.unsplash.com/photo-1550461716-dbf266b2a8a7?w=600&auto=format&fit=crop&q=80",
      sortOrder: 18,
    },
    {
      nameAr: "حلقات بصل كرسبي (Crispy Onion Rings)",
      nameEn: "Crispy Onion Rings 6 Pcs",
      categoryName: "لودد فرايز ومقبلات الشبح 🍟",
      categoryId: "cat-sides",
      basePrice: 55.0,
      weightUnit: "طبق 6 حلقات",
      packageType: "حلقات مقرمشة",
      description: "6 حلقات بصل ذهبية مقرمشة تقدم مع صوص باربيكيو مدخن",
      image: "https://images.unsplash.com/photo-1639024471287-032f6644dd40?w=600&auto=format&fit=crop&q=80",
      sortOrder: 19,
    },

    // --- 🥫 صوصات الشبح ---
    {
      nameAr: "صوص الشبح السري الحار (Ghost Signature Sauce)",
      nameEn: "Ghost Signature Sauce",
      categoryName: "صوصات الشبح السرية 🥫",
      categoryId: "cat-sauces",
      basePrice: 25.0,
      weightUnit: "كوب صوص",
      packageType: "صوص سري",
      description: "الخلطة السرية الخاصة بمطعم تشيكن جوست حارة ومدخنة بنكهة لا تقاوم",
      image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=600&auto=format&fit=crop&q=80",
      sortOrder: 20,
    },
    {
      nameAr: "صوص الجبنة الشيدر السايحة (Melted Cheddar Sauce)",
      nameEn: "Melted Cheddar Sauce",
      categoryName: "صوصات الشبح السرية 🥫",
      categoryId: "cat-sauces",
      basePrice: 25.0,
      weightUnit: "كوب صوص",
      packageType: "شيدر سايح",
      description: "كوب صوص جبنة شيدر غني وساخن للتغميس والبطاطس",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
      sortOrder: 21,
    },
    {
      nameAr: "صوص الرانش الكريمي (Creamy Ranch Sauce)",
      nameEn: "Creamy Ranch Sauce",
      categoryName: "صوصات الشبح السرية 🥫",
      categoryId: "cat-sauces",
      basePrice: 20.0,
      weightUnit: "كوب صوص",
      packageType: "رانش أمريكي",
      description: "صوص رانش أمريكي كريمي بالأعشاب الطبيعية والثوم الخفيف",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
      sortOrder: 22,
    },
    {
      nameAr: "صوص باربيكيو سموكي (Smoky BBQ Sauce)",
      nameEn: "Smoky BBQ Sauce",
      categoryName: "صوصات الشبح السرية 🥫",
      categoryId: "cat-sauces",
      basePrice: 20.0,
      weightUnit: "كوب صوص",
      packageType: "باربيكيو مدخن",
      description: "صوص باربيكيو مدخن حقيقي على خشب البلوط بنكهة غنية",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
      sortOrder: 23,
    },

    // --- 🥤 مشروبات وحلويات ---
    {
      nameAr: "بيبسي كانز ساقع 330 مل",
      nameEn: "Pepsi Can 330ml",
      categoryName: "مشروبات غازية وحلويات 🥤",
      categoryId: "cat-drinks",
      basePrice: 25.0,
      weightUnit: "كان 330 مل",
      packageType: "كانز مثلج",
      description: "مشروب غازي بيبسي مثلج ومنعش",
      image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600&auto=format&fit=crop&q=80",
      sortOrder: 24,
    },
    {
      nameAr: "سفن أب ليمون مثلج 330 مل",
      nameEn: "7Up Can 330ml",
      categoryName: "مشروبات غازية وحلويات 🥤",
      categoryId: "cat-drinks",
      basePrice: 25.0,
      weightUnit: "كان 330 مل",
      packageType: "كانز مثلج",
      description: "مشروب غازي سفن أب ليمون ساقع",
      image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=80",
      sortOrder: 25,
    },
    {
      nameAr: "براونيز الشوكولاتة الفاخر (Fudge Brownies)",
      nameEn: "Chocolate Fudge Brownies",
      categoryName: "مشروبات غازية وحلويات 🥤",
      categoryId: "cat-drinks",
      basePrice: 55.0,
      weightUnit: "قطعة براونيز",
      packageType: "شوكولاتة بلجيكية",
      description: "قطعة كيك براونيز شوكولاتة غنية بقطع الشوكولاتة البلجيكية وصوص الفدج",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80",
      sortOrder: 26,
    },
  ];

  for (const p of products) {
    const existing = await prisma.product.findFirst({ where: { nameAr: p.nameAr } });
    if (existing) {
      await prisma.product.update({ where: { id: existing.id }, data: p });
    } else {
      await prisma.product.create({ data: p });
    }
  }

  // 7. Initial Cash Treasury Movement
  const existingMov = await prisma.treasuryTransaction.findFirst({
    where: { description: { contains: "رصيد افتتاح" } }
  });
  if (!existingMov) {
    await prisma.treasuryTransaction.create({
      data: {
        amount: 15000.0,
        type: "IN",
        category: "OPENING",
        description: "رصيد افتتاح الخزينة لبدء تشغيل مطعم تشيكن جوست 👻",
        branch: "فرع حدائق القبة الرئيسي",
        createdBy: "المعلم المايسترو (المالك)",
      }
    });
  }

  console.log("✅ Seed completed successfully for Chicken Ghost on Neon PostgreSQL!");
  console.log(`- 7 Categories seeded`);
  console.log(`- ${products.length} Authentic Fried Chicken & Burger Products seeded`);
  console.log(`- 4 Branches seeded with 74 Douidar St, Hadayek El-Kobba`);
  console.log(`- 5 Staff accounts seeded with PIN codes`);
  console.log(`- 8 Cairo Delivery Zones configured`);
  console.log(`- Opening cash treasury set to 15,000 EGP`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
