const { PrismaClient } = require('@prisma/client');
const items = require('./items-us.json');
const brands = require('./brands.json');
const prisma = new PrismaClient();

(async () => {
  const arr = [];
  for await (const item of items) {
    const {
      name,
      imageUrl,
      termsAndConditionsInstructions,
      redemptionInstructions,
      expiryAndValidity,
      valueDenominations,
      discount,
      fee,
      productId,
      categories,
    } = item;

    const brand = brands.find((brand) => name.includes(brand.name));

    if (name === 'H&M USA') {
      console.log(brand, name);
    }

    const cats = categories.split(',');

    const dbCats = await prisma.category.findMany({
      where: {
        name: {
          in: cats,
        },
      },
    });

    const now = +(new Date().valueOf() / 1000).toFixed(0);
    const createdAt = now;
    const updatedAt = now;

    if (brand) {
      const dbBrand = await prisma.brand.findUnique({
        where: {
          slug: brand.name === 'H&M' ? 'h-m' : brand.slug,
        },
      });

      for (const val of valueDenominations.split(',')) {
        arr.push({
          slug: `${name
            .toLowerCase()
            .replaceAll('& ', '')
            .replaceAll(' ', '-')
            .replaceAll('.', '')
            .replaceAll("'", '')}-us-${productId}-${val}`,
          name,
          imageUrls: {
            small: imageUrl,
            medium: imageUrl,
            large: imageUrl,
          },
          brand: {
            connect: {
              id: dbBrand.id,
            },
          },
          termsAndConditionsInstructions,
          categories: {
            connect: dbCats.map(({ id }) => ({ id })),
          },
          discountRate: discount,
          status: 'AVAILABLE',
          amount: +val,
          currency: 'GPT',
          country: 'US',
          redemptionInstructions,
          createdAt,
          updatedAt,
          type: 'GIFT_CARD',
          metadata: {
            vendor: 'xoxoday',
            productId,
            fee,
            expiryAndValidity,
          },
        });
      }
    }
  }
  console.log('GET IT~~~');
  for await (const item of arr) {
    const a = await prisma.item.create({
      data: item,
    });

    console.log(a);
  }
})();
