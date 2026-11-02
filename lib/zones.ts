export interface ZoneItem {
  id?: string;
  code?: string;
  nameEn: string;
  nameAr: string;
  branch: string;
  fee: number;
  timeMinutes: number;
  isActive?: boolean;
}

export const GHOST_DELIVERY_ZONES: ZoneItem[] = [
  // حدائق القبة ومحيطها
  { code: "KOBBA-DOUIDAR", nameAr: "حدائق القبة والدويدار وسكة الوايلي", nameEn: "Hadayek El-Kobba & Douidar", branch: "فرع حدائق القبة الرئيسي", fee: 15.0, timeMinutes: 25 },
  { code: "WAYLI-ABBASIA", nameAr: "الوايلي الكبير وميدان الجيش والعباسية", nameEn: "El-Wayli & Abbassia", branch: "فرع الوايلي والعباسية", fee: 20.0, timeMinutes: 30 },
  { code: "ZEITOUN-SENDER", nameAr: "الزيتون وسراي القبة وحمامات القبة", nameEn: "Zeitoun & Saray El-Kobba", branch: "فرع الزيتون وسراي القبة", fee: 20.0, timeMinutes: 30 },
  { code: "ZAWYA-MALAK", nameAr: "الزاوية الحمراء ودير الملاك والقصيرين", nameEn: "Zawya Hamra & Deir El-Malak", branch: "فرع حدائق القبة الرئيسي", fee: 20.0, timeMinutes: 30 },
  
  // مصر الجديدة ومدينة نصر
  { code: "HELIOPOLIS-ROXY", nameAr: "مصر الجديدة وروكسي والأهرام", nameEn: "Heliopolis & Roxy", branch: "فرع مدينة نصر ومصر الجديدة", fee: 30.0, timeMinutes: 40 },
  { code: "NASR-CITY", nameAr: "مدينة نصر (مصطفى النحاس والحي السابع والثامن)", nameEn: "Nasr City", branch: "فرع مدينة نصر ومصر الجديدة", fee: 35.0, timeMinutes: 45 },
  
  // شبرا وعين شمس
  { code: "SHUBRA-HELMEY", nameAr: "شبرا وميدان فيكتوريا وأحمد حلمي", nameEn: "Shubra & Ahmed Helmy", branch: "فرع حدائق القبة الرئيسي", fee: 35.0, timeMinutes: 45 },
  { code: "AIN-SHAMS-SUEZ", nameAr: "عين شمس وجسر السويس والألف مسكن", nameEn: "Ain Shams & Gesr El-Suez", branch: "فرع الزيتون وسراي القبة", fee: 35.0, timeMinutes: 45 },
];

export const ALL_DELIVERY_ZONES: ZoneItem[] = GHOST_DELIVERY_ZONES;
export const DEFAULT_ZONE: ZoneItem = ALL_DELIVERY_ZONES[0];

export function findZone(nameOrCode?: string): ZoneItem {
  if (!nameOrCode) return DEFAULT_ZONE;
  const clean = nameOrCode.trim().toLowerCase();
  const match = ALL_DELIVERY_ZONES.find(
    (z) =>
      (z.code && z.code.toLowerCase() === clean) ||
      z.nameAr.toLowerCase().includes(clean) ||
      z.nameEn.toLowerCase().includes(clean) ||
      clean.includes(z.nameAr.toLowerCase()) ||
      clean.includes(z.nameEn.toLowerCase())
  );
  return match || DEFAULT_ZONE;
}
