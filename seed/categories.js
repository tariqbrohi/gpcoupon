const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const now = +(new Date().valueOf() / 1000).toFixed(0);

const categories = [
  {
    filterValue: 'Automobiles & Accessories',
    isoCode: '',
    filterValueCode: 'automobiles_accessories',
  },
  {
    filterValue: 'Baby & Kids',
    isoCode: '',
    filterValueCode: 'baby_kids',
  },
  {
    filterValue: 'Cash & Prepaid Card',
    isoCode: '',
    filterValueCode: 'cash_prepaid_card',
  },
  {
    filterValue: 'Charity & Donations',
    isoCode: '',
    filterValueCode: 'charity_donations',
  },
  {
    filterValue: 'Electronics',
    isoCode: '',
    filterValueCode: 'electronics',
  },
  {
    filterValue: 'Experiences',
    isoCode: '',
    filterValueCode: 'experiences',
  },
  {
    filterValue: 'Fashion & Lifestyle',
    isoCode: '',
    filterValueCode: 'fashion_lifestyle',
  },
  {
    filterValue: 'Food & Restaurant',
    isoCode: '',
    filterValueCode: 'food_restaurant',
  },
  {
    filterValue: 'Gaming',
    isoCode: '',
    filterValueCode: 'gaming',
  },
  {
    filterValue: 'Gold & Jewelry',
    isoCode: '',
    filterValueCode: 'gold_jewelry',
  },
  {
    filterValue: 'Grocery',
    isoCode: '',
    filterValueCode: 'grocery',
  },
  {
    filterValue: 'Home & Living',
    isoCode: '',
    filterValueCode: 'home_living',
  },
  {
    filterValue: 'In-house benefits',
    isoCode: '',
    filterValueCode: 'in_house_benefits',
  },
  {
    filterValue: 'Merchandise',
    isoCode: '',
    filterValueCode: 'merchandise',
  },
  {
    filterValue: 'Mobile Recharge',
    isoCode: '',
    filterValueCode: 'mobile_recharge',
  },
  {
    filterValue: 'Perks & Offers',
    isoCode: '',
    filterValueCode: 'perks_offers',
  },
  {
    filterValue: 'Reading & Learning',
    isoCode: '',
    filterValueCode: 'reading_learning',
  },
  {
    filterValue: 'Remote Work',
    isoCode: '',
    filterValueCode: 'remote_work',
  },
  {
    filterValue: 'Software',
    isoCode: '',
    filterValueCode: 'software',
  },
  {
    filterValue: 'Subscriptions',
    isoCode: '',
    filterValueCode: 'subscriptions',
  },
  {
    filterValue: 'Travel & Entertainment',
    isoCode: '',
    filterValueCode: 'travel_entertainment',
  },
  {
    filterValue: 'Wellness & Sports',
    isoCode: '',
    filterValueCode: 'wellness_sports',
  },
];

(async () => {
  // Create

  await prisma.category.deleteMany({});

  console.log(
    await prisma.category.createMany({
      data: categories.map((cat) => ({
        name: cat.filterValue,
        slug: cat.filterValueCode,
        imageUrls: {
          small: `/images/small/${cat.filterValueCode}.jpg`,
          medium: `/images/medium/${cat.filterValueCode}.jpg`,
          large: `/images/large/${cat.filterValueCode}.jpg`,
        },
        updatedAt: now,
        createdAt: now,
      })),
    }),
  );
})();
