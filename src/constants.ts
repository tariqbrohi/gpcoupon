export const ITEM_ID_TO_PURCHASE = 'ITEM_ID_TO_PURCHASE';

export const Categories = [
  {
    text: 'Apparel_Fashion & Accessories',
    key: 'apparel_fashion_accessories',
    value: 'apparel_fashion_accessories',
  },
  {
    text: 'Automobile',
    key: 'automobile',
    value: 'automobile',
  },
  {
    text: 'Baby & Kids',
    key: 'baby_kids',
    value: 'baby_kids',
  },
  {
    text: 'Beauty_Health & Wellness',
    key: 'beauty_health_wellness',
    value: 'beauty_health_wellness',
  },
  {
    text: 'Books_Magazines & Subscriptions',
    key: 'books_magazines_subscriptions',
    value: 'books_magazines_subscriptions',
  },
  {
    text: 'Cash Cards',
    key: 'cash_cards',
    value: 'cash_cards',
  },
  {
    text: 'Deals & Subscriptions',
    key: 'deals_subscriptions',
    value: 'deals_subscriptions',
  },
  {
    text: 'E-learning',
    key: 'e_learning',
    value: 'e_learning',
  },
  {
    text: 'Ecommerce',
    key: 'ecommerce',
    value: 'ecommerce',
  },
  {
    text: 'Electronics',
    key: 'electronics',
    value: 'electronics',
  },
  {
    text: 'Experiences',
    key: 'experiences',
    value: 'experiences',
  },
  {
    text: 'Financial Services',
    key: 'financial_services',
    value: 'financial_services',
  },
  {
    text: 'Fintech',
    key: 'fintech',
    value: 'fintech',
  },
  {
    text: 'Grocery and Retail',
    key: 'grocery_and_retail',
    value: 'grocery_and_retail',
  },
  {
    text: 'Health and Wellness',
    key: 'health_and_wellness',
    value: 'health_and_wellness',
  },
  {
    text: 'Home & Living',
    key: 'home_living',
    value: 'home_living',
  },
  {
    text: 'In-house benefits',
    key: 'in_house_benefits',
    value: 'in_house_benefits',
  },
  {
    text: 'insurance',
    key: 'insurance',
    value: 'insurance',
  },
  {
    text: 'Jewelry & Lifestyle',
    key: 'jewelry_lifestyle',
    value: 'jewelry_lifestyle',
  },
  {
    text: 'Learning',
    key: 'learning',
    value: 'learning',
  },
  {
    text: 'lists of common category',
    key: 'lists_of_common_category',
    value: 'lists_of_common_category',
  },
  {
    text: 'Merchandise',
    key: 'merchandise',
    value: 'merchandise',
  },
  {
    text: 'Mobile Recharges',
    key: 'mobile_recharges',
    value: 'mobile_recharges',
  },
  {
    text: 'Music Movies and Entertainment ',
    key: 'music_movies_and_entertainment',
    value: 'music_movies_and_entertainment',
  },
  {
    text: 'news',
    key: 'news',
    value: 'news',
  },
  {
    text: 'Online Gifts',
    key: 'online_gifts',
    value: 'online_gifts',
  },
  {
    text: 'papers and books',
    key: 'papers_and_books',
    value: 'papers_and_books',
  },
  {
    text: 'Philanthropy',
    key: 'philanthropy',
    value: 'philanthropy',
  },
  {
    text: 'Prepaid cards',
    key: 'prepaid_cards',
    value: 'prepaid_cards',
  },
  {
    text: 'Restaurants Foods and Drinks',
    key: 'restaurants_foods_and_drinks',
    value: 'restaurants_foods_and_drinks',
  },
  {
    text: 'Software and Licensing',
    key: 'software_and_licensing',
    value: 'software_and_licensing',
  },
  {
    text: 'Sports and Fitness',
    key: 'sports_and_fitness',
    value: 'sports_and_fitness',
  },
  {
    text: 'Travel and Tourism',
    key: 'travel_and_tourism',
    value: 'travel_and_tourism',
  },
  {
    text: 'Work From Home',
    key: 'work_from_home',
    value: 'work_from_home',
  },
];

export const Countries = [
  {
    text: 'United States',
    key: 'usa',
  },
  {
    text: 'South Korea',
    key: 'south_korea',
  },
  {
    text: 'Canada',
    key: 'canada',
  },
];

export const mapCatToImg = {
  apparel_fashion_accessories: `/categories/Apparel.jpg`,
  automobile: `/categories/automobile.jpg`,
  baby_kids: `/categories/baby_kids.jpg`,
  beauty_health_wellness: `/categories/HealthNBeauty.jpg`,
  books_magazines_subscriptions: `/categories/books_magazines.jpg`,
  cash_cards: `/categories/cash_cards.jpg`,
  deals_subscriptions: `/categories/Ecommerce.jpg`,
  e_learning: `/categories/e-learning.jpg`,
  ecommerce: `/categories/Ecommerce.jpg`,
  electronics: `/categories/Electronics.jpg`,
  experiences: `/categories/Experiences.jpg`,
  experiences_test: `/categories/experiences_test.jpg`,
  financial_services: `/categories/financial_services.jpg`,
  fintech: `/categories/fintech.jpg`,
  grocery_and_retail: `/categories/Groceries.jpg`,
  health_and_wellness: `/categories/HealthNBeauty.jpg`,
  home_living: `/categories/Home.jpg`,
  in_house_benefits: `/categories/books_magazines.jpg`,
  insurance: `/categories/insurance.jpg`,
  jewelry_lifestyle: `/categories/jewelry.jpg`,
  learning: `/categories/learning.jpg`,
  lists_of_common_category: `/asset/categ1.jpg`,
  merchandise: `/categories/merchandise.jpg`,
  mobile_recharges: `/categories/mobile.jpg`,
  music_movies_and_entertainment: `/categories/Entertainment.jpg`,
  news: `/categories/news.jpg`,
  online_gifts: `/categories/AllGiftCards.jpg`,
  papers_and_books: `/categories/Pets.jpg`,
  philanthropy: `/categories/philanthropy.jpg`,
  prepaid_cards: `/categories/AllGiftCards.jpg`,
  restaurants_foods_and_drinks: `/categories/Food.jpg`,
  software_and_licensing: `/categories/Streaming.jpg`,
  sports_and_fitness: `/categories/sports_and_fitness.jpg`,
  travel_and_tourism: `/categories/Travel.jpg`,
  work_from_home: `/categories/Restaurants.jpg`,
} as Record<string, string>;
