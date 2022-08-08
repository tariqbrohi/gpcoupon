const { PrismaClient } = require('@prisma/client');
const items = require('./items-us.json');
const brands = require('./brands.json');
const prisma = new PrismaClient();

const pop10 = [
  'Walmart egift Voucher',
  // 'Amazon.com Gift Card',
  'Starbucks USA eGift Card',
  'lululemon USD',
  'Under Armour',
  'Chipotle USA eGift Voucher',
  'Jamba Juice USD',
  'Buffalo Wild Wings',
  'Panera Bread USA eGift Voucher',
  'Peets Coffee & Tea',
  'Taco Bell',
  'Outback Steakhouse',
  'DoorDash',
  'Dunkin Donuts',
  'The Cheesecake Factory',
  "BJ's Restaurants",
  'eBay',
  'Pinkberry USD',
  'Adidas (USA)',
  'Nike USA eGift Voucher',
  'JCPenney USA eGift Card',
  'Target eGiftCard USA',
  'Dominos Pizza eCard',
  'Papa Johns USA eGift Voucher',
  'Burger King USA',
  'Banana Republic',
  'H&M USA',
  'Game Stop ',
  'Sephora USA eGift Card',
  'Petco USA eGift Voucher',
  'Macys USA eGift Voucher',
  'Google Play gift code (Email Delivery - US Only)',
  'Groupon USA eGift Card',
  'Rainforest Cafe egift voucher',
  'Dicks Sporting Goods',
  'Uber Eats USD',
  'Grubhub USA',
  'Uber Gift Card',
];

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

(async () => {
  const arr = [];
  for await (const top of pop10) {
    const items = await prisma.item.findMany({
      where: {
        name: top,
      },
    });

    arr.push(...items);
  }

  const sorted = [];

  for (const item of arr) {
    const w1 = randomInteger(1, 5);

    sorted.push([item.id, w1]);
  }
  console.log('updating~~~~');
  for await (const [id, sortOrder] of sorted) {
    const a = await prisma.item.update({
      where: {
        id,
      },
      data: {
        sortOrder,
      },
    });

    console.log(a);
  }
})();

// 7 ~ 10
