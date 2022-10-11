export const ROUTES = {
  login: '/api/auth/login',
  logout: '/api/auth/logout',
  item: '/item',
  search: '/search',
  gpcoupons: '/gpcoupons',
  brands: '/brands',
  categories: '/categories',
  affiliates: '/affiliates',
  buy: '/buy',
  privacy: '/privacyPolicy',
  legal: '/termsOfUse',
  orders: '/orders',
  confirmAndPay: '/confirm-and-pay',
  occasions: '/occasions',
  paymentCards: '/account/payment-cards',
  admin: {
    createItem: '/admin/items/create',
    items: '/admin/items',
    brands: '/admin/brands',
    dashboard: '/admin/dashboard',
    login: '/admin/login',
    logout: '/api/auth/logout',
    createCoupon: '/admin/create-coupon',
    coupons: '/admin/coupons',
    createBrand: '/admin/brands/create',
    listBrands: '/admin/brands',
    orders: '/admin/gpoints/orders',
    createGpoint: '/admin/gpoints/create',
    listGpoints: '/admin/gpoints/list',
    orderHistories: '/admin/orders/history',
  },
  recipient_info: '/payments/recipient-info',
};
