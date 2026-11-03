const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_UL0y8wJxrFHC@ep-proud-voice-b9peqkob-pooler.c-7.eu-central-1.aws.neon.tech/neondb?sslmode=require',
  ssl: { rejectUnauthorized: false }
});

const categories = [
  { id: 'cat-platters', nameAr: 'صواني وبوكسات الشبح 👻', nameEn: 'Ghost Platters & Boxes', emoji: '👻', sortOrder: 1 },
  { id: 'cat-chicken', nameAr: 'وجبات الدجاج المقرمش 🍗', nameEn: 'Crispy Chicken Meals', emoji: '🍗', sortOrder: 2 },
  { id: 'cat-burgers', nameAr: 'سندوتشات الشبح العملاقة 🍔', nameEn: 'Ghost Monster Burgers', emoji: '🍔', sortOrder: 3 },
  { id: 'cat-rolls', nameAr: 'رولات التورتيلا المقرمشة 🌯', nameEn: 'Crispy Tortilla Rolls', emoji: '🌯', sortOrder: 4 },
  { id: 'cat-loaded', nameAr: 'لودد فرايز الشبح 🍟', nameEn: 'Ghost Loaded Fries', emoji: '🍟', sortOrder: 5 },
  { id: 'cat-sides', nameAr: 'المقبلات والإكسترا 🧀', nameEn: 'Sides & Appetizers', emoji: '🧀', sortOrder: 6 },
  { id: 'cat-sauces', nameAr: 'صوصات الشبح السرية 🥫', nameEn: 'Secret Ghost Sauces', emoji: '🥫', sortOrder: 7 },
  { id: 'cat-drinks', nameAr: 'المشروبات المنعشة 🥤', nameEn: 'Cold Beverages', emoji: '🥤', sortOrder: 8 }
];

const products = [
  // 1. Platters & Trays
  {
    id: 'cg_platter_monster',
    nameAr: 'صينية ليفل الوحش',
    nameEn: 'Level El Wahsh Platter',
    categoryId: 'cat-platters',
    categoryName: 'صواني وبوكسات الشبح 👻',
    basePrice: 799,
    originalPrice: 950,
    promoPrice: 799,
    promoActive: true,
    image: '/images/menu/level-elwahsh.jpg',
    description: '6 قطع صدور دجاج بدون عظم + 12 قطعة تشيكن وينجز + 5 باكيت بطاطس + 8 صوصات من اختيارك + كيلو أرز ريزو كامل + 6 ساندوتش سلايدر هدية 🎁',
    sortOrder: 1
  },
  {
    id: 'cg_platter_mix_sheba',
    nameAr: 'صينية ميكس الشبع',
    nameEn: 'Mix El Sheba Platter',
    categoryId: 'cat-platters',
    categoryName: 'صواني وبوكسات الشبح 👻',
    basePrice: 799,
    originalPrice: 950,
    promoPrice: 799,
    promoActive: true,
    image: '/images/menu/mix-elsheba.jpg',
    description: '12 قطعة استربس مقرمش ناري + 12 قطعة وينجز + 4 موتزاريلا + 4 حلقات بصل كرسبي + 6 باكيت بطاطس + 6 صوصات من اختيارك + 6 ساندوتش سلايدر هدية 🎁',
    sortOrder: 2
  },
  {
    id: 'cg_platter_chicken_ghost',
    nameAr: 'صنية تشيكن جوست الرسمية',
    nameEn: 'Official Chicken Ghost Platter',
    categoryId: 'cat-platters',
    categoryName: 'صواني وبوكسات الشبح 👻',
    basePrice: 499,
    originalPrice: 600,
    promoPrice: 499,
    promoActive: true,
    image: '/images/menu/chicken-ghost-tray.jpg',
    description: 'تشكيلة كرسبي وينجز بصوص البافلو والسمسم + أصابع استربس دجاج كرسبي + حلقات بصل كرسبي + أصابع موتزاريلا مقلية + أرز ريزو وبطاطس + 4 ساندوتشات سلايدرز كرسبي',
    sortOrder: 3
  },
  {
    id: 'cg_platter_sawa_sawa',
    nameAr: 'وجبة سوا سوا',
    nameEn: 'Sawa Sawa Meal',
    categoryId: 'cat-platters',
    categoryName: 'صواني وبوكسات الشبح 👻',
    basePrice: 499,
    originalPrice: 580,
    promoPrice: 499,
    promoActive: true,
    image: '/images/menu/sawa-sawa.jpg',
    description: '4 قطع صدور دجاج بدون عظم + 8 قطع تشيكن وينجز كرسبي + 4 باكيت بطاطس + 4 صوص من اختيارك + 4 ساندوتش سلايدر هدية 🎁',
    sortOrder: 4
  },
  {
    id: 'cg_platter_10_sliders',
    nameAr: 'وجبة 10 ساندوتش سلايدرز',
    nameEn: '10 Crispy Sliders Meal',
    categoryId: 'cat-platters',
    categoryName: 'صواني وبوكسات الشبح 👻',
    basePrice: 350,
    originalPrice: 420,
    promoPrice: 350,
    promoActive: true,
    image: '/images/menu/10-sliders.jpg',
    description: '10 ساندوتشات كرسبي سلايدرز بصوص الشبح والجبنة والخس الطازج في خبز البريوش الفاخر',
    sortOrder: 5
  },
  {
    id: 'cg_platter_sohab_bondok',
    nameAr: 'وجبة صحاب بندق',
    nameEn: 'Sohab Bondok Meal',
    categoryId: 'cat-platters',
    categoryName: 'صواني وبوكسات الشبح 👻',
    basePrice: 350,
    originalPrice: 400,
    promoPrice: 350,
    promoActive: true,
    image: '/images/menu/sohab-bondok.jpg',
    description: '3 قطع صدور دجاج بدون عظم + 6 قطع تشيكن وينجز + 2 أرز ريزو + 2 صوص من اختيارك + 2 ساندوتش سلايدر هدية 🎁',
    sortOrder: 6
  },
  {
    id: 'cg_platter_ali_clay',
    nameAr: 'وجبة علي كلاي',
    nameEn: 'Ali Clay Meal',
    categoryId: 'cat-platters',
    categoryName: 'صواني وبوكسات الشبح 👻',
    basePrice: 125,
    originalPrice: 150,
    promoPrice: 125,
    promoActive: false,
    image: '/images/menu/ali-clay.jpg',
    description: '4 قطع استربس دجاج كرسبي مقرمش + طبق أرز ريزو بالصوص السري + 1 صوص من اختيارك',
    sortOrder: 7
  },

  // 2. Chicken Meals
  {
    id: 'cg_meal_mafia',
    nameAr: 'وجبة مافيا ميل (6 قطع صدور)',
    nameEn: 'Mafia Meal (6 Pcs)',
    categoryId: 'cat-chicken',
    categoryName: 'وجبات الدجاج المقرمش 🍗',
    basePrice: 350,
    image: '/images/menu/mafia-meal.jpg',
    description: '6 قطع صدور فراخ مقرمشة بدون عظم + 4 قطع خبز طازج + 4 صوص من اختيارك',
    sortOrder: 8
  },
  {
    id: 'cg_meal_king',
    nameAr: 'وجبة كينج ميل (4 قطع صدور)',
    nameEn: 'King Meal (4 Pcs)',
    categoryId: 'cat-chicken',
    categoryName: 'وجبات الدجاج المقرمش 🍗',
    basePrice: 220,
    image: '/images/menu/king-meal.jpg',
    description: '4 قطع صدور فراخ مقرمشة بدون عظم + 2 قطع خبز طازج + 2 صوص من اختيارك',
    sortOrder: 9
  },

  // 3. Sandwiches
  {
    id: 'cg_burger_ghost',
    nameAr: 'تشيكن الشبح (Chicken Ghost)',
    nameEn: 'Chicken Ghost Burger',
    categoryId: 'cat-burgers',
    categoryName: 'سندوتشات الشبح العملاقة 🍔',
    basePrice: 150,
    sizes: JSON.stringify([
      { nameAr: 'سنجل (Single)', nameEn: 'Single', price: 150 },
      { nameAr: 'دبل (Double)', nameEn: 'Double', price: 190 }
    ]),
    image: '/images/menu/chicken-ghost.jpg',
    description: 'صدور فراخ مقرمشة - خس - مايونيز - صوص برافت - تشيز بوووم - كيري بايتس - شيدر - كاتشب - خيار مخلل',
    sortOrder: 10
  },
  {
    id: 'cg_burger_monster',
    nameAr: 'تشيكن الوحش (Chicken Monster)',
    nameEn: 'Chicken Monster Burger',
    categoryId: 'cat-burgers',
    categoryName: 'سندوتشات الشبح العملاقة 🍔',
    basePrice: 130,
    sizes: JSON.stringify([
      { nameAr: 'سنجل (Single)', nameEn: 'Single', price: 130 },
      { nameAr: 'دبل (Double)', nameEn: 'Double', price: 165 }
    ]),
    image: '/images/menu/chicken-monster.jpg',
    description: 'صدور فراخ مقرمشة - خس - مايونيز - صوص بيج - حلقات بصل - مشروم - بطاطس كاتش - خيار مخلل',
    sortOrder: 11
  },
  {
    id: 'cg_burger_killer',
    nameAr: 'تشيكن القاتل (Chicken Killer)',
    nameEn: 'Chicken Killer Burger',
    categoryId: 'cat-burgers',
    categoryName: 'سندوتشات الشبح العملاقة 🍔',
    basePrice: 130,
    sizes: JSON.stringify([
      { nameAr: 'سنجل (Single)', nameEn: 'Single', price: 130 },
      { nameAr: 'دبل (Double)', nameEn: 'Double', price: 170 }
    ]),
    image: '/images/menu/chicken-killer.jpg',
    description: 'صدور فراخ مقرمشة - خس - مايونيز - شيدر - صوص رانش فاخر',
    sortOrder: 12
  },
  {
    id: 'cg_burger_fighter',
    nameAr: 'تشيكن المقاتل (Chicken Fighter)',
    nameEn: 'Chicken Fighter Burger',
    categoryId: 'cat-burgers',
    categoryName: 'سندوتشات الشبح العملاقة 🍔',
    basePrice: 135,
    sizes: JSON.stringify([
      { nameAr: 'سنجل (Single)', nameEn: 'Single', price: 135 },
      { nameAr: 'دبل (Double)', nameEn: 'Double', price: 175 }
    ]),
    image: '/images/menu/chicken-fighter.jpg',
    description: 'صدور فراخ مقرمشة - خس - مايونيز - كيري - تركي مدخن - بطاطس',
    sortOrder: 13
  },
  {
    id: 'cg_burger_boaboa',
    nameAr: 'تشيكن البعبع (Chicken Boaboa)',
    nameEn: 'Chicken Boaboa Burger',
    categoryId: 'cat-burgers',
    categoryName: 'سندوتشات الشبح العملاقة 🍔',
    basePrice: 135,
    sizes: JSON.stringify([
      { nameAr: 'سنجل (Single)', nameEn: 'Single', price: 135 },
      { nameAr: 'دبل (Double)', nameEn: 'Double', price: 175 }
    ]),
    image: '/images/menu/chicken-boaboa.jpg',
    description: 'صدور فراخ مقرمشة - خس - مايونيز - كول سلو - كاتشب - خيار مخلل سويت تشيلي',
    sortOrder: 14
  },
  {
    id: 'cg_burger_classic',
    nameAr: 'تشيكن كلاسيك (Chicken Classic)',
    nameEn: 'Chicken Classic Burger',
    categoryId: 'cat-burgers',
    categoryName: 'سندوتشات الشبح العملاقة 🍔',
    basePrice: 110,
    sizes: JSON.stringify([
      { nameAr: 'سنجل (Single)', nameEn: 'Single', price: 110 },
      { nameAr: 'دبل (Double)', nameEn: 'Double', price: 140 }
    ]),
    image: '/images/menu/chicken-classic.jpg',
    description: 'صدور فراخ مقرمشة - طماطم - خس - مايونيز - شيدر - بطاطس - كاتشب - خيار مخلل',
    sortOrder: 15
  },
  {
    id: 'cg_burger_nashfel_fire',
    nameAr: 'ناشفل فاير (Nashfel Fire)',
    nameEn: 'Nashfel Fire Burger',
    categoryId: 'cat-burgers',
    categoryName: 'سندوتشات الشبح العملاقة 🍔',
    basePrice: 140,
    sizes: JSON.stringify([
      { nameAr: 'سنجل (Single)', nameEn: 'Single', price: 140 },
      { nameAr: 'دبل (Double)', nameEn: 'Double', price: 180 }
    ]),
    image: '/images/menu/nashfel-fire.jpg',
    description: 'قطع فراخ مقرمشة حارة نارية - خس - خيار مخلل - سويت تشيلي - سموك فاير - كاتشب',
    sortOrder: 16
  },

  // 4. Rolls
  {
    id: 'cg_roll_nashfel',
    nameAr: 'ناشفل رول (Nashfel Roll)',
    nameEn: 'Nashfel Tortilla Roll',
    categoryId: 'cat-rolls',
    categoryName: 'رولات التورتيلا المقرمشة 🌯',
    basePrice: 90,
    image: '/images/menu/nashfel-roll.jpg',
    description: 'صدور فراخ مقرمشة في خبز تورتيلا محمص - خس - طماطم - شرائح جبنة مايونيز - سموك فاير - صوص ناشفيل',
    sortOrder: 17
  },
  {
    id: 'cg_roll_chicken',
    nameAr: 'تشيكن رول (Chicken Roll)',
    nameEn: 'Chicken Tortilla Roll',
    categoryId: 'cat-rolls',
    categoryName: 'رولات التورتيلا المقرمشة 🌯',
    basePrice: 90,
    image: '/images/menu/chicken-roll.jpg',
    description: 'صدور فراخ مقرمشة في خبز تورتيلا محمص - خس - طماطم - شرائح جبنة مايونيز - صوص سموك فاير',
    sortOrder: 18
  },

  // 5. Loaded Fries
  {
    id: 'cg_fries_ghost',
    nameAr: 'جوست فرايز (Ghost Frise)',
    nameEn: 'Ghost Loaded Fries',
    categoryId: 'cat-loaded',
    categoryName: 'لودد فرايز الشبح 🍟',
    basePrice: 80,
    image: '/images/menu/ghost-frise.jpg',
    description: 'بطاطس فارم مقلية غارقة + قطع فراخ مقرمشة + تركي مدخن + صوص سموك فاير',
    sortOrder: 19
  },
  {
    id: 'cg_fries_cursed',
    nameAr: 'كيرسد فرايز (Cursed Frise)',
    nameEn: 'Cursed Loaded Fries',
    categoryId: 'cat-loaded',
    categoryName: 'لودد فرايز الشبح 🍟',
    basePrice: 50,
    image: '/images/menu/cursed-frise.jpg',
    description: 'بطاطس مقلية كرسبي + تركي مدخن + صوص شيدر غني + قطع هالابينو حار',
    sortOrder: 20
  },
  {
    id: 'cg_fries_sinister',
    nameAr: 'سينيستر فرايز (Sinister Frise)',
    nameEn: 'Sinister Loaded Fries',
    categoryId: 'cat-loaded',
    categoryName: 'لودد فرايز الشبح 🍟',
    basePrice: 50,
    image: '/images/menu/sinister-frise.jpg',
    description: 'بطاطس مقلية كرسبي + شرائح تركي مدخن + صوص جبنة شيدر كريمي',
    sortOrder: 21
  },

  // 6. Sides
  {
    id: 'cg_side_cheese_fries',
    nameAr: 'بطاطس بالجبنة',
    nameEn: 'Cheddar Cheese Fries',
    categoryId: 'cat-sides',
    categoryName: 'المقبلات والإكسترا 🧀',
    basePrice: 45,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
    description: 'باكيت بطاطس كرسبي مغطى بصوص الجبنة الشيدر الساخنة',
    sortOrder: 22
  },
  {
    id: 'cg_side_fries_pack',
    nameAr: 'باكيت بطاطس فارم فريتس',
    nameEn: 'French Fries Pack',
    categoryId: 'cat-sides',
    categoryName: 'المقبلات والإكسترا 🧀',
    basePrice: 30,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    description: 'أصابع بطاطس فارم فريتس مقرمشة ذهبية',
    sortOrder: 23
  },
  {
    id: 'cg_side_kiri_bites',
    nameAr: 'كيري بايتس (2 قطعة)',
    nameEn: 'Kiri Bites (2 Pcs)',
    categoryId: 'cat-sides',
    categoryName: 'المقبلات والإكسترا 🧀',
    basePrice: 30,
    image: 'https://images.unsplash.com/photo-1548340748-6d2b7d7da280?auto=format&fit=crop&w=800&q=80',
    description: '2 قطعة مكعبات جبنة كيري مقلية كرسبي وسايحة',
    sortOrder: 24
  },
  {
    id: 'cg_side_cheese_bomb',
    nameAr: 'قنبلة جبنة',
    nameEn: 'Cheese Bomb',
    categoryId: 'cat-sides',
    categoryName: 'المقبلات والإكسترا 🧀',
    basePrice: 25,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    description: 'إكسترا ميكس صوص جبنة شيدر غني وساخن للغمس',
    sortOrder: 25
  },
  {
    id: 'cg_side_mozzarella',
    nameAr: 'موتزاريلا ستيكس (2 قطعة)',
    nameEn: 'Mozzarella Sticks (2 Pcs)',
    categoryId: 'cat-sides',
    categoryName: 'المقبلات والإكسترا 🧀',
    basePrice: 15,
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=800&q=80',
    description: '2 صابع جبنة موتزاريلا مقلية تشد لأطول مسافة',
    sortOrder: 26
  },
  {
    id: 'cg_side_onion_rings',
    nameAr: 'حلقات بصل مقرمشة (2 قطعة)',
    nameEn: 'Onion Rings (2 Pcs)',
    categoryId: 'cat-sides',
    categoryName: 'المقبلات والإكسترا 🧀',
    basePrice: 15,
    image: 'https://images.unsplash.com/photo-1639024471287-032f66071276?auto=format&fit=crop&w=800&q=80',
    description: '2 حلقة بصل كرسبي مقلية ومتبلة ببهارات تشيكن جوست',
    sortOrder: 27
  },
  {
    id: 'cg_side_turkey',
    nameAr: 'قطعة تركي مدخن',
    nameEn: 'Smoked Turkey Slice',
    categoryId: 'cat-sides',
    categoryName: 'المقبلات والإكسترا 🧀',
    basePrice: 15,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    description: 'شريحة تركي مدخن فاخر لإضافتها لسندوتشك أو وجبتك',
    sortOrder: 28
  },
  {
    id: 'cg_side_rizo',
    nameAr: 'طبق أرز ريزو بالصوص',
    nameEn: 'Rizo Rice with Sauce',
    categoryId: 'cat-sides',
    categoryName: 'المقبلات والإكسترا 🧀',
    basePrice: 35,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    description: 'أرز ريزو متبل بالخلطة السرية مع صوص باربكيو وقطع مقرمشة',
    sortOrder: 29
  },

  // 7. Sauces
  {
    id: 'cg_sauce_ranch',
    nameAr: 'كب رانش (Ranch Cup)',
    nameEn: 'Ranch Sauce Cup',
    categoryId: 'cat-sauces',
    categoryName: 'صوصات الشبح السرية 🥫',
    basePrice: 15,
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=80',
    description: 'كب صوص رانش أمريكي أصلي كريمي بالأعشاب',
    sortOrder: 30
  },
  {
    id: 'cg_sauce_cheddar',
    nameAr: 'كب جبنة شيدر (Cheddar Cup)',
    nameEn: 'Cheddar Cheese Cup',
    categoryId: 'cat-sauces',
    categoryName: 'صوصات الشبح السرية 🥫',
    basePrice: 15,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    description: 'كب صوص جبنة شيدر سائلة غنية',
    sortOrder: 31
  },
  {
    id: 'cg_sauce_big',
    nameAr: 'كب بيج (Big Sauce Cup)',
    nameEn: 'Big Sauce Cup',
    categoryId: 'cat-sauces',
    categoryName: 'صوصات الشبح السرية 🥫',
    basePrice: 15,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    description: 'كب صوص بيج تيستي الشبح الخاص',
    sortOrder: 32
  },
  {
    id: 'cg_sauce_smoke_fire',
    nameAr: 'كب سموك فاير (Smoke Fire Cup)',
    nameEn: 'Smoke Fire Sauce Cup',
    categoryId: 'cat-sauces',
    categoryName: 'صوصات الشبح السرية 🥫',
    basePrice: 15,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    description: 'كب صوص حار مدخن ناري نكهة الشبح الحصرية',
    sortOrder: 33
  },
  {
    id: 'cg_sauce_mayo',
    nameAr: 'كب مايونيز (Mayonnaise Cup)',
    nameEn: 'Mayonnaise Cup',
    categoryId: 'cat-sauces',
    categoryName: 'صوصات الشبح السرية 🥫',
    basePrice: 10,
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=80',
    description: 'كب مايونيز كريمي فاخر',
    sortOrder: 34
  },
  {
    id: 'cg_sauce_ketchup',
    nameAr: 'كب كاتشب (Ketchup Cup)',
    nameEn: 'Ketchup Cup',
    categoryId: 'cat-sauces',
    categoryName: 'صوصات الشبح السرية 🥫',
    basePrice: 10,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    description: 'كب كاتشب طماطم طبيعي ممتاز',
    sortOrder: 35
  },

  // 8. Drinks
  {
    id: 'cg_drink_pepsi',
    nameAr: 'بيبسي كانز (Pepsi Can)',
    nameEn: 'Pepsi Can 330ml',
    categoryId: 'cat-drinks',
    categoryName: 'المشروبات المنعشة 🥤',
    basePrice: 20,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=800&q=80',
    description: 'مشروب غازي بيبسي مثلج 330 مل',
    sortOrder: 36
  },
  {
    id: 'cg_drink_7up',
    nameAr: 'سفن أب كانز (7Up Can)',
    nameEn: '7Up Can 330ml',
    categoryId: 'cat-drinks',
    categoryName: 'المشروبات المنعشة 🥤',
    basePrice: 20,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80',
    description: 'مشروب غازي سفن أب ليمون منعش 330 مل',
    sortOrder: 37
  },
  {
    id: 'cg_drink_water',
    nameAr: 'مياه معدنية صغيرة',
    nameEn: 'Mineral Water 600ml',
    categoryId: 'cat-drinks',
    categoryName: 'المشروبات المنعشة 🥤',
    basePrice: 10,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    description: 'زجاجة مياه معدنية نقية مثلجة',
    sortOrder: 38
  }
];

async function main() {
  await client.connect();
  console.log('Connected to Chicken Ghost Neon DB...');

  // 1. Delete all old products & categories to keep ONLY the authentic menu
  await client.query('DELETE FROM "Product"');
  await client.query('DELETE FROM "Category"');
  console.log('Cleared old products and categories.');

  // 2. Insert Categories
  for (const cat of categories) {
    await client.query(
      `INSERT INTO "Category" (id, "nameAr", "nameEn", emoji, "sortOrder", "createdAt")
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [cat.id, cat.nameAr, cat.nameEn, cat.emoji, cat.sortOrder]
    );
  }
  console.log(`Inserted ${categories.length} categories.`);

  // 3. Insert Products
  for (const p of products) {
    await client.query(
      `INSERT INTO "Product" (
        id, "nameAr", "nameEn", "categoryId", "categoryName",
        "basePrice", "originalPrice", "promoPrice", "promoActive",
        sizes, image, description, "isAvailable", "sortOrder", "createdAt"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true, $13, NOW())`,
      [
        p.id,
        p.nameAr,
        p.nameEn,
        p.categoryId,
        p.categoryName,
        p.basePrice,
        p.originalPrice || null,
        p.promoPrice || null,
        p.promoActive || false,
        p.sizes || null,
        p.image,
        p.description,
        p.sortOrder
      ]
    );
  }
  console.log(`Successfully seeded ${products.length} authentic Chicken Ghost menu items!`);

  // Verify
  const count = await client.query('SELECT count(*) FROM "Product"');
  console.log('Total live products in database:', count.rows[0].count);

  await client.end();
}

main().catch(console.error);
