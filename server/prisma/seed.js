// Seed script for initial data
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@collectify.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@collectify.com",
      password: adminPassword,
      role: "admin",
    },
  });

  // Create seller user
  const sellerPassword = await bcrypt.hash("seller123", 10);
  const seller = await prisma.user.upsert({
    where: { email: "seller@collectify.com" },
    update: {},
    create: {
      name: "Seller Demo",
      email: "seller@collectify.com",
      password: sellerPassword,
      role: "seller",
    },
  });

  // Create buyer user
  const buyerPassword = await bcrypt.hash("buyer123", 10);
  await prisma.user.upsert({
    where: { email: "buyer@collectify.com" },
    update: {},
    create: {
      name: "Buyer Demo",
      email: "buyer@collectify.com",
      password: buyerPassword,
      role: "buyer",
    },
  });

  // Create sample items
  await prisma.item.createMany({
    data: [
      {
        name: "Carte Pokémon Dracaufeu 1ère Édition",
        description: "Carte holographique Dracaufeu de la première édition, état mint.",
        price: 2500,
        image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400",
        sellerId: seller.id,
      },
      {
        name: "Figurine Star Wars Vintage Boba Fett",
        description: "Figurine originale Kenner de 1979, dans son emballage d'origine.",
        price: 450,
        image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=400",
        sellerId: seller.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
