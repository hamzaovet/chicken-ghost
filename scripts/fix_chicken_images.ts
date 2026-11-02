import "dotenv/config";
import { prisma } from "../lib/prisma";

async function main() {
  console.log("Updating Chicken Ghost product images in Neon Postgres...");

  // 1. Fix Broken Single Ghost 3 Pcs Meal
  const res1 = await prisma.product.updateMany({
    where: {
      OR: [
        { nameAr: { contains: "3 قطع" } },
        { nameEn: { contains: "Single Ghost" } },
        { image: { contains: "photo-1527477321005-4d01314b433b" } },
      ],
    },
    data: {
      image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&auto=format&fit=crop&q=80",
    },
  });
  console.log(`Updated Single Ghost 3 Pcs: ${res1.count}`);

  // 2. Fix Golden 9 Pcs Bucket (replace KFC photo)
  const res2 = await prisma.product.updateMany({
    where: {
      OR: [
        { nameAr: { contains: "9 قطع" } },
        { nameEn: { contains: "9 Pcs" } },
      ],
    },
    data: {
      image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&auto=format&fit=crop&q=80",
    },
  });
  console.log(`Updated Golden 9 Pcs: ${res2.count}`);

  // 3. Fix Mega Family Bucket 15 Pcs (replace KFC photo if used)
  const res3 = await prisma.product.updateMany({
    where: {
      OR: [
        { nameAr: { contains: "15 قطعة" } },
        { nameEn: { contains: "15 Pcs" } },
        { image: { contains: "photo-1513639776629-7b61b0ac49cb" } },
      ],
    },
    data: {
      image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=600&auto=format&fit=crop&q=80",
    },
  });
  console.log(`Updated Mega Family Bucket: ${res3.count}`);

  // 4. Double check all products with any broken or KFC url
  const res4 = await prisma.product.updateMany({
    where: {
      image: { contains: "photo-1513639776629-7b61b0ac49cb" },
    },
    data: {
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80",
    },
  });
  console.log(`Cleaned any leftover KFC images: ${res4.count}`);

  // List all products now
  const all = await prisma.product.findMany({
    select: { id: true, nameAr: true, image: true },
  });
  console.log("\nCurrent Products in DB:");
  for (const p of all) {
    console.log(`- ${p.nameAr}: ${p.image}`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
