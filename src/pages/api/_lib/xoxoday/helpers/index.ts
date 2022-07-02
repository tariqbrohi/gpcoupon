import { flattenDeep } from 'lodash';

export const images: Record<string, any> = {
  medium: {
    Electronics: '/images/electronics.jpg',
    Experiences: '/images/experiences.jpg',
    Apparel: '/images/apparel.jpg',
    Food: '/images/food.jpg',
    'Entertainment & Games': '/images/entertainment-and-games.jpg',
    Grocery: '/images/grocery.jpg',
    'Home & Living': '/images/home-and-living.jpg',
  },
  small: {
    Electronics: '/images/sm/electronics.jpg',
    Experiences: '/images/sm/experiences.jpg',
    Apparel: '/images/sm/apparel.jpg',
    Food: '/images/sm/food.jpg',
    'Entertainment & Games': '/images/sm/entertainment-and-games.jpg',
    Grocery: '/images/sm/grocery.jpg',
    'Home & Living': '/images/sm/home-and-living.jpg',
  },
};

export const slugs: Record<string, any> = {
  electronics: ['electronics'],
  experiences: ['experiences', 'travel_entertainment'],
  apparel: ['fashion_lifestyle'],
  food: ['food_restaurant'],
  entertainment_games: ['gaming'],
  home_living: ['home_living'],
  grocery: ['grocery'],
  other: [
    'gold_jewelry',
    'wellness_sports',
    'reading_learning',
    'remote_work',
    'subscriptions',
    'baby_kids',
    'cash_prepaid_card',
    'automobiles_accessories',
  ],
};

export const categories: Record<string, any> = {
  Electronics: 'Electronics',
  Experiences: 'Experiences',
  'Travel &amp; Entertainment': 'Experiences',
  'Fashion &amp; Lifestyle': 'Apparel',
  'Food &amp; Restaurant': 'Food',
  Gaming: 'Entertainment & Games',
  Grocery: 'Grocery',
  'Home &amp; Living': 'Home & Living',
};

export const countries: Record<string, string> = {
  US: 'usa',
  KR: 'korea',
  CA: 'canada',
};

export const normalizeItems = (items: Record<string, any>[]) => {
  const normalizedItems = items.map((item) =>
    item.valueDenominations.split(',').map((amount: string) => ({
      amount: +amount,
      discount: item.discount,
      name: item.name,
      id: item.productId,
      termsAndConditionsInstructions: item.termsAndConditionsInstructions,
      redemptionInstructions: item.redemptionInstructions,
      description: item.description,
      expiry: item.expiryAndValidity,
      image: {
        medium: item.imageUrl,
      },
    })),
  );

  return flattenDeep(normalizedItems);
};
