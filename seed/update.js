const { PrismaClient } = require('@prisma/client');
const brands = require('./brands.json');

const prisma = new PrismaClient();

(async () => {
  for await (const brand of brands) {
    try {
      await prisma.brand.update({
        where: {
          slug: brand.slug,
        },
        data: {
          backgroundUrl: brand.backgroundUrl,
          description: brand.description,
          thumbnailUrl: brand.thumbnailUrl,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
})();
