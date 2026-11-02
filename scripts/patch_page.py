# -*- coding: utf-8 -*-
with open('d:/Work/chicken-ghost/app/page.tsx', 'r', encoding='utf-8') as f:
    page = f.read()

# Replace HERO_SLIDES block
old_hero = '''const HERO_SLIDES = [
  {
    id: "box-ramses",
    badge: "وفر 90 ج.م 🔥 العرض الأكثر طلباً",
    title: "بوكس رمسيس الثاني الملكي الفاخر",
    subtitle: "نصف كيلو فسيخ بوري مخلي زبدة + نصف كيلو رنجة هولندي فيليه بدون شوك + برطمان بطارخ خرز + سلطة طحينة وليمون معصفر و10 أرغفة عيش سخن.",
    price: 590,
    originalPrice: 680,
    note: "يكفي 3 إلى 4 أفراد جاهز للأكل والتقديم فوراً بدون أي مجهود تنظيف!",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    cta: "اطلب البوكس الآن",
  },
  {
    id: "feseekh-jumbo",
    badge: "نخب أول 👑 زبدة سايحة",
    title: "فسيخ بوري بلدي سوبر جامبو",
    subtitle: "سمك بوري بحري أصيل طازج، ملوحة هادئة بدون أي زفارة، ينظف ويخلى عند الطلب مجاناً مع زيت الذرة الصافي وعصير الليمون والفلفل الحار.",
    price: 480,
    originalPrice: 530,
    note: "متاح سليم بالجلد أو مخلي قطع جاهز للأكل",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80",
    cta: "اختر وزن الفسيخ",
  },
  {
    id: "herring-batarekh",
    badge: "قرمشة خرز أصيلة 🥇 مدخنة زان",
    title: "رنجة هولندي سوبر بطارخ خرز",
    subtitle: "رنجة ذهبية مدخنة على خشب الزان الطبيعي، لحم وردي متماسك قليل الملح ممتلئة بالكامل ببطارخ خرز خشنة مقرمشة من الرأس للذيل.",
    price: 290,
    originalPrice: 330,
    note: "تخلى وتشوى مجاناً حسب رغبتك",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&auto=format&fit=crop&q=80",
    cta: "اطلب الرنجة الآن",
  },
  {
    id: "bottarga-gold",
    badge: "ذهب البحر الأصفر 🏆 بورسعيدي أصيل",
    title: "بطارخ بوري بورسعيدي مجففة شمع",
    subtitle: "أفخر أنواع البطارخ الطبيعية المجففة على أصولها البورسعيدية التراثية مغلفة بالشمع الطبيعي، تقطع شرائح رقيقة لسهرات الملوك.",
    price: 375,
    originalPrice: 420,
    note: "قالب وسط ~200 جم مغلف شمع عسلي",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80",
    cta: "اطلب البطارخ الفاخرة",
  },
];'''

new_hero = '''const HERO_SLIDES = [
  {
    id: "deal-killer",
    badge: "عرض القاتل الأسطوري 🔥 الأكثر طلباً",
    title: "عرض القاتل من تشيكن جوست",
    subtitle: "3 قطع فرايد تشيكن مقرمشة + 2 قطعة ستربس سبايسي ناري + بطاطس لارج + كول سلو فريش + خبز ساخن + بيبسي كانز مثلج.",
    price: 175,
    originalPrice: 210,
    note: "أقوى قرمشة وتوفير لا يقاوم لشخصين!",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80",
    cta: "اطلب عرض القاتل الآن",
  },
  {
    id: "ghost-saver",
    badge: "شبح التوفير العائلي 👑 8 قطع مقرمشة",
    title: "شبح التوفير (Ghost Saver Bucket)",
    subtitle: "باكيت 8 قطع فرايد تشيكن كرانشي خلطة سرية + 2 بطاطس وسط + 2 كول سلو + 4 خبز طازج + صوص الشبح السري.",
    price: 325,
    originalPrice: 380,
    note: "يكفي من 3 إلى 4 أفراد بقرمشة ذهبية سوبر مقرمشة!",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80",
    cta: "اطلب شبح التوفير",
  },
  {
    id: "burger-monster",
    badge: "سندوتش الوحش 🍔 محشو جبنة سايحة",
    title: "سندوتش جوست العملاق (Monster Burger)",
    subtitle: "صدر دجاج كرسبي عملاق مقرمش + بيكون مدخن + جبنة شيدر سايحة + خس مقرمش + صوص جوست السري في خبز بريوش طازج.",
    price: 145,
    originalPrice: 165,
    note: "تجربة برجر أسطورية لا تُنسى!",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
    cta: "اطلب سندوتش الوحش",
  },
  {
    id: "fries-dynamite",
    badge: "سوبر لودد 🍟 صوصات ديناميت",
    title: "ديناميت جوست لودد فرايز",
    subtitle: "بطاطس مقرمشة ذهبية محملة بقطع الستربس الكرسبي + شيدر أمريكي أصلي سايح + هالبينو ورشة بابريكا مدخنة.",
    price: 99,
    originalPrice: 120,
    note: "عشاق الجبنة والقرمشة النارية!",
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&auto=format&fit=crop&q=80",
    cta: "اطلب اللودد فرايز",
  },
];'''

if old_hero in page:
    page = page.replace(old_hero, new_hero)
    print('Hero slides replaced successfully!')
else:
    print('Old hero not found directly, checking partial')

# Replace branches default and options
page = page.replace('فرع فيصل الرئيسي (المطبعة)', 'فرع حدائق القبة الرئيسي (74 شارع الدويدار)')
page = page.replace('فرع فيصل الرئيسي', 'فرع حدائق القبة الرئيسي')
page = page.replace('<option value="فرع ألف مسكن (جسر السويس)">فرع ألف مسكن (جسر السويس)</option>', '<option value="فرع الوايلي والعباسية">فرع الوايلي والعباسية</option>')
page = page.replace('<option value="فرع 6 أكتوبر (الحصري)">فرع 6 أكتوبر (الحصري)</option>', '<option value="فرع الزيتون وسراي القبة">فرع الزيتون وسراي القبة</option>')
page = page.replace('<option value="فرع حدائق القبة">فرع حدائق القبة (مصر والسودان)</option>', '<option value="فرع مدينة نصر ومصر الجديدة">فرع مدينة نصر ومصر الجديدة</option>')
page = page.replace('<option value="فرع زهراء المعادي">فرع زهراء المعادي (الخمسين)</option>', '')

# Colors
page = page.replace('#071524', '#0b0914')
page = page.replace('#050e18', '#06050b')
page = page.replace('#0d2137', '#130f24')
page = page.replace('#1a3654', '#211a3d')
page = page.replace('#f59e0b', '#ff6b00')

with open('d:/Work/chicken-ghost/app/page.tsx', 'w', encoding='utf-8') as f:
    f.write(page)

print('app/page.tsx fully transformed for Chicken Ghost!')
