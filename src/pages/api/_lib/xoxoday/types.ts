export type FindManyVouchersInput = {
  country: string;
  category?: string;
  brand?: string;
};

export type FindOneVoucherInput = {
  itemId: string;
  amount: number;
};

export type PlaceOrderInput = {
  productId: number;
  quantity: number;
  poNumber?: string;
  denomination: number;
  email?: string;
  notifyAdminEmail?: number;
  notifyReceiverEmail?: number;
};

export type PlaceOrderResponse = {
  orderId: number;
  vouchers: {
    amount: string;
    country: string;
    currency: string;
    orderId: number;
    pin: string;
    productId: number;
    type: string;
    validity: string;
    voucherCode: string;
    currencyValue: number;
  }[];
  amountCharged: number;
  currencyCode: string;
  tag: string;
  currencyValue: number;
  discountPercent: number;
  orderDiscount: number;
  orderTotal: number;
  orderStatus: string;
  deliveryStatus: string;
};

export type Item = {
  productId: number;
  name: string;
  description: string;
  termsAndConditionsInstructions: string;
  expiryAndValidity: string;
  redemptionInstructions: string;
  categories: string;
  lastUpdateDate: string;
  imageUrl: string;
  currencyCode: string;
  currencyName: string;
  countryName: string;
  countryCode: string;
  countries: {
    code: string;
    name: string;
  }[];
  exchangeRateRule: number;
  valueType: string;
  maxValue: number;
  minValue: number;
  valueDenominations: string;
  tatInDays: number;
  usageType: string;
  deliveryType: string;
  isCommon: string;
  fee: number;
  discount: number;
  exchangeRate: number | null;
};
