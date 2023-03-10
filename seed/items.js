const { PrismaClient } = require('@prisma/client');
const items = require('./items-us.json');
const brands = require('./brands.json');
const prisma = new PrismaClient();
// mongodb+srv://admin:wyzpOZr6aAuaRlCI@cluster0.ss7da.mongodb.net/test?retryWrites=true&w=majority
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

    const options = {
      name,
      imageUrls: {
        small: imageUrl,
        medium: imageUrl,
        large: imageUrl,
      },
      termsAndConditionsInstructions,
      categories: {
        connect: dbCats.map(({ id }) => ({ id })),
      },
      discountRate: discount,
      customerDiscountRate: discount,
      status: 'AVAILABLE',
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
    };

    if (brand) {
      const dbBrand = await prisma.brand.findUnique({
        where: {
          slug: brand.name === 'H&M' ? 'h-m' : brand.slug,
        },
      });

      if (dbBrand) {
        options.brand = {
          connect: {
            id: dbBrand.id,
          },
        };
      }
    }

    for (const val of valueDenominations.split(',')) {
      arr.push({
        ...options,
        slug: `${name
          .toLowerCase()
          .replaceAll('& ', '')
          .replaceAll(' ', '-')
          .replaceAll('.', '')
          .replaceAll("'", '')}-us-${productId}-${val}`,
        originalPrice: +val,
        amount: +val,
        price: {
          currency: 'GPT',
          amount: +val,
        },
      });
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
