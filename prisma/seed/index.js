const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const brands = require('./brands.json');
const categories = require('./categories.json');

(async () => {
  // CATEGORY
  console.log('Creating categories');
  await prisma.category.deleteMany({});

  await prisma.category.createMany({
    data: categories.map((cat) => ({
      name: cat.filterValue,
      slug: cat.filterValueCode,
      imageUrls: {
        small: `/images/small/${cat.filterValueCode}.jpg`,
        medium: `/images/medium/${cat.filterValueCode}.jpg`,
        large: `/images/large/${cat.filterValueCode}.jpg`,
      },
      updatedAt: 1,
      createdAt: 1,
    })),
  });

  // BRANDS

  console.log('Creating brands');
  await prisma.brand.deleteMany({});

  for await (const brand of brands) {
    const cats = brand.item?.categories.split(',') || [];

    const dbCats = await prisma.category.findMany({
      where: {
        name: {
          in: cats,
        },
      },
      select: {
        id: true,
      },
    });

    // await prisma.brand.create();
    await prisma.brand.create({
      data: {
        ...brand,
        categories: {
          connect: dbCats.map(({ id }) => ({ id })),
        },
      },
    });
  }
})();
