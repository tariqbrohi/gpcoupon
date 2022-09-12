const { PrismaClient } = require('@prisma/client');
const brands = require('./brands.json');
// const brands = require('../wow.json');

const prisma = new PrismaClient();
const dict = {};
(async () => {
  await prisma.brand.deleteMany({});
  // Create

  for await (const brand of brands) {
    const cats = brand.item?.categories.split(',') || [];
    // console.log();
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
    const a = await prisma.brand.create({
      data: {
        name: brand.name,
        slug: brand.slug,
        description: brand.description,
        disclaimer: brand.disclaimer,
        backgroundUrl: brand.backgroundUrl,
        affiliate: false,
        thumbnailUrl: brand.thumbnailUrl,
        status: 'AVAILABLE',
        terms: brand.terms,
        createdAt: 1657210820,
        updatedAt: 1657210820,
        countries: ['US'],
        categories: {
          connect: dbCats.map(({ id }) => ({ id })),
        },
      },
    });

    console.log(a);
  }
  // console.log(a);
  // await prisma.brand.createMany({
  //   data: a,
  // });

  // const promises = brands.map((brand) =>
  //   prisma.brand.upsert({
  //     where: {
  //       slug: brand.slug,
  //     },
  //     update: {},
  //     create: brand,
  //   }),
  // );

  // await Promise.all(promises);
})();
