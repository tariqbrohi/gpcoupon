export const ORDER_CREATED = 'd-77d802b1b3744a2d8340dc141b8b86b8';
export const ORDER_PROCESSING = 'd-b080e1776dff492fbcf097e80ff8962b';
export const ORDER_DENIED = 'd-4e78ec084ee64ac99a352794e5df3d21';

export type OrderCreatedData = {
  couponImageUrl: string | null;
  amount?: string;
  name: string;
  itemImage: string;
  brandName: string;
  brandLogoUrl: string;
  expiresIn: number;
  redemptionInstructions: string;
  termsAndConditionsInstructions: string;
  qrcodes: string;
};
