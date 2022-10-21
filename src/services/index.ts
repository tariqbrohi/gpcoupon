import { BaseOptions as QueryBaseOptions, useQuery } from './useQuery';
import {
  Brand,
  Category,
  Country,
  GPoint,
  GPointOrder,
  Item,
  ItemType,
  Order,
  Payment,
  Recipient,
  Status,
} from '@prisma/client';
import { useLazyQuery } from './useLazyQuery';
import { useMutation } from './useMutation';
import Stripe from 'stripe';

/**
 * GetCategories
 */
export const useGetCategoriesQuery = (
  baseOptions?: QueryBaseOptions<GetCategoriesQueryVariables>,
) => {
  return useQuery<GetCategoriesQueryVariables, GetCategoriesQueryResult>(
    '/api/v1/categories',
    baseOptions,
  );
};
export const useGetCategoriesLazyQuery = (
  baseOptions?: QueryBaseOptions<GetCategoriesQueryVariables>,
) => {
  return useLazyQuery<GetCategoriesQueryVariables, GetCategoriesQueryResult>(
    '/api/v1/categories',
    baseOptions,
  );
};
export type GetCategoriesQueryVariables = {};
export type GetCategoriesQueryResult = Category[];


/**
 * GetAffsAndBrands
 */
 export const useGetAffsAndBrandsQuery = (
  baseOptions?: QueryBaseOptions<GetAffsAndBrandsQueryVariables>,
) => {
  return useQuery<GetAffsAndBrandsQueryVariables, GetAffsAndBrandsQueryResult>(
    '/api/v1/affiliates-and-brands',
    baseOptions,
  );
};
export const useGetAffsAndBrandsLazyQuery = (
  baseOptions?: QueryBaseOptions<GetAffsAndBrandsQueryVariables>,
) => {
  return useLazyQuery<GetAffsAndBrandsQueryVariables, GetAffsAndBrandsQueryResult>(
    '/api/v1/affiliates-and-brands',
    baseOptions,
  );
};
export type GetAffsAndBrandsQueryVariables = {
  country?: string;
  // affiliate?: boolean;
  status?: 'AVAILABLE' | 'ALL';
};
export type GetAffsAndBrandsQueryResult = Brand[];

/**
 * GetAffAndBrandItems
 */
 export const useGetAffAndBrandItemsQuery = (
  baseOptions?: QueryBaseOptions<GetAffAndBrandItemsQueryVariables>,
) => {
  return useQuery<GetAffAndBrandItemsQueryVariables, GetAffAndBrandItemsQueryResult>(
    '/api/v1/affiliates-and-brands/:slug/items',
    baseOptions,
    ['slug'],
  );
};
export const useGetAffAndBrandItemsLazyQuery = (
  baseOptions?: QueryBaseOptions<GetAffAndBrandItemsQueryVariables>,
) => {
  return useLazyQuery<GetAffAndBrandItemsQueryVariables, GetAffAndBrandItemsQueryResult>(
    '/api/v1/affiliates-and-brands/:slug/items',
    baseOptions,
    ['slug'],
  );
};
export type GetAffAndBrandItemsQueryVariables = {
  country: string;
  slug: string | string[] | undefined;
  sortBy?: string;
};
export type GetAffAndBrandItemsQueryResult = Brand & { total: number; items: Item[] };


/**
 * GetAffiliates
 */
export const useGetAffiliatesQuery = (
  baseOptions?: QueryBaseOptions<GetAffiliatesQueryVariables>,
) => {
  return useQuery<GetAffiliatesQueryVariables, GetAffiliatesQueryResult>(
    '/api/v1/affiliates',
    baseOptions,
  );
};
export const useGetAffiliatesLazyQuery = (
  baseOptions?: QueryBaseOptions<GetAffiliatesQueryVariables>,
) => {
  return useLazyQuery<GetAffiliatesQueryVariables, GetAffiliatesQueryResult>(
    '/api/v1/affiliates',
    baseOptions,
  );
};
export type GetAffiliatesQueryVariables = {
  country: string;
};
export type GetAffiliatesQueryResult = Brand[];

/**
 * GetAffiliateItems
 */
export const useGetAffiliateItemsQuery = (
  baseOptions?: QueryBaseOptions<GetAffiliateItemsQueryVariables>,
) => {
  return useQuery<
    GetAffiliateItemsQueryVariables,
    GetAffiliateItemsQueryResult
  >('/api/v1/affiliates/:slug/items', baseOptions, ['slug']);
};
export const useGetAffiliateItemsLazyQuery = (
  baseOptions?: QueryBaseOptions<GetAffiliateItemsQueryVariables>,
) => {
  return useLazyQuery<
    GetAffiliateItemsQueryVariables,
    GetAffiliateItemsQueryResult
  >('/api/v1/affiliates/:slug/items', baseOptions, ['slug']);
};
export type GetAffiliateItemsQueryVariables = {
  country: string;
  slug: string | string[] | undefined;
  sortBy?: string;
};
export type GetAffiliateItemsQueryResult = Brand & {
  total: number;
  items: Item[];
};

/**
 * GetAffiliateItemsForDashboard(accountId)
 */
export const useGetAffiliateItemsForDashboardQuery = (
  baseOptions?: QueryBaseOptions<GetAffiliateItemsForDashboardQueryVariables>,
) => {
  return useQuery<
  GetAffiliateItemsForDashboardQueryVariables,
  GetAffiliateItemsForDashboardQueryResult
  >('/api/v1/dashboard/affiliate/items', baseOptions);
};
export const useGetAffiliateItemsForDashboardLazyQuery = (
  baseOptions?: QueryBaseOptions<GetAffiliateItemsForDashboardQueryVariables>,
) => {
  return useLazyQuery<
  GetAffiliateItemsForDashboardQueryVariables,
  GetAffiliateItemsForDashboardQueryResult
  >('/api/v1/dashboard/affiliate/items', baseOptions);
};
export type GetAffiliateItemsForDashboardQueryVariables = {
  country?: string;
  take?: number;
  skip?: number;
  sub: string;
  sortBy?: string;
};
export type GetAffiliateItemsForDashboardQueryResult = Brand & {
  total: {
    count: number,
    profitSum: number,
  };
  orders: Order[];
};


/**
 * GetBrands
 */
export const useGetBrandsQuery = (
  baseOptions?: QueryBaseOptions<GetBrandsQueryVariables>,
) => {
  return useQuery<GetBrandsQueryVariables, GetBrandsQueryResult>(
    '/api/v1/brands',
    baseOptions,
  );
};
export const useGetBrandsLazyQuery = (
  baseOptions?: QueryBaseOptions<GetBrandsQueryVariables>,
) => {
  return useLazyQuery<GetBrandsQueryVariables, GetBrandsQueryResult>(
    '/api/v1/brands',
    baseOptions,
  );
};
export type GetBrandsQueryVariables = {
  country?: string;
  affiliate?: boolean;
  status?: 'AVAILABLE' | 'ALL';
};
export type GetBrandsQueryResult = Brand[];

/**
 * GetBrand
 */
export const useGetBrandQuery = (
  baseOptions?: QueryBaseOptions<GetBrandQueryVariables>,
) => {
  return useQuery<GetBrandQueryVariables, GetBrandQueryResult>(
    '/api/admin/brands/:id',
    baseOptions,
    ['id'],
  );
};
export const useGetBrandLazyQuery = (
  baseOptions?: QueryBaseOptions<GetBrandQueryVariables>,
) => {
  return useLazyQuery<GetBrandQueryVariables, GetBrandQueryResult>(
    '/api/v1/brands/:id',
    baseOptions,
    ['id'],
  );
};
export type GetBrandQueryVariables = {
  id: string;
};
export type GetBrandQueryResult = Brand;

/**
 * GetCategoryItems
 */
export const useGetCategoryItemsQuery = (
  baseOptions?: QueryBaseOptions<GetCategoryItemsQueryVariables>,
) => {
  return useQuery<GetCategoryItemsQueryVariables, GetCategoryItemsQueryResult>(
    '/api/v1/categories/:slug/items',
    baseOptions,
    ['slug'],
  );
};
export const useGetCategoryItemsLazyQuery = (
  baseOptions?: QueryBaseOptions<GetCategoryItemsQueryVariables>,
) => {
  return useLazyQuery<
    GetCategoryItemsQueryVariables,
    GetCategoryItemsQueryResult
  >('/api/v1/categories/:slug/items', baseOptions, ['slug']);
};
export type GetCategoryItemsQueryVariables = {
  country: string;
  slug: string | string[] | undefined;
  sortBy?: string;
};
export type GetCategoryItemsQueryResult = Category & {
  total: number;
  items: Item[];
};

/**
 * GetBrandItems
 */
export const useGetBrandItemsQuery = (
  baseOptions?: QueryBaseOptions<GetBrandItemsQueryVariables>,
) => {
  return useQuery<GetBrandItemsQueryVariables, GetBrandItemsQueryResult>(
    '/api/v1/brands/:slug/items',
    baseOptions,
    ['slug'],
  );
};
export const useGetBrandItemsLazyQuery = (
  baseOptions?: QueryBaseOptions<GetBrandItemsQueryVariables>,
) => {
  return useLazyQuery<GetBrandItemsQueryVariables, GetBrandItemsQueryResult>(
    '/api/v1/brands/:slug/items',
    baseOptions,
    ['slug'],
  );
};
export type GetBrandItemsQueryVariables = {
  country: string;
  slug: string | string[] | undefined;
  sortBy?: string;
};
export type GetBrandItemsQueryResult = Brand & { total: number; items: Item[] };

/**
 * GetOccasionItems
 */
export const useGetOccasionItemsQuery = (
  baseOptions?: QueryBaseOptions<GetOccasionItemsQueryVariables>,
) => {
  return useQuery<GetOccasionItemsQueryVariables, GetOccasionItemsQueryResult>(
    '/api/v1/occasions/:slug/items',
    baseOptions,
    ['slug'],
  );
};
export const useGetOccasionItemsLazyQuery = (
  baseOptions?: QueryBaseOptions<GetOccasionItemsQueryVariables>,
) => {
  return useLazyQuery<
    GetOccasionItemsQueryVariables,
    GetOccasionItemsQueryResult
  >('/api/v1/occasions/:slug/items', baseOptions, ['slug']);
};
export type GetOccasionItemsQueryVariables = {
  country: string;
  slug: string | string[] | undefined;
};
export type GetOccasionItemsQueryResult = Item[];

/**
 * GetItem
 */
export const useGetItemQuery = (
  baseOptions?: QueryBaseOptions<GetItemQueryVariables>,
) => {
  return useQuery<GetItemQueryVariables, GetItemQueryResult>(
    '/api/v1/items/:id',
    baseOptions,
    ['id'],
  );
};
export const useGetItemLazyQuery = (
  baseOptions?: QueryBaseOptions<GetItemQueryVariables>,
) => {
  return useLazyQuery<GetItemQueryVariables, GetItemQueryResult>(
    '/api/v1/items/:id',
    baseOptions,
    ['id'],
  );
};
export type GetItemQueryVariables = {
  id: string;
  amount?: number;
};
export type GetItemQueryResult = Item;

/**
 * MyGifts
 */
export const useMyGiftsQuery = (
  baseOptions?: QueryBaseOptions<MyGiftsQueryVariables>,
) => {
  return useQuery<MyGiftsQueryVariables, MyGiftsQueryResult>(
    '/api/v1/orders',
    baseOptions,
    [],
  );
};
export const useMyGiftsLazyQuery = (
  baseOptions?: QueryBaseOptions<MyGiftsQueryVariables>,
) => {
  return useLazyQuery<MyGiftsQueryVariables, MyGiftsQueryResult>(
    '/api/v1/orders',
    baseOptions,
    [],
  );
};
export type MyGiftsQueryVariables = {};
export type MyGiftsQueryResult = {
  orderNumber: string;
  item: Item;
  payment: Payment;
  status: Status;
  recipient: Recipient;
  message?: string;
  createdAt: number;
}[];

/**
 * SearchItems
 */
export const useSearchItemsQuery = (
  baseOptions?: QueryBaseOptions<SearchItemsQueryVariables>,
) => {
  return useQuery<SearchItemsQueryVariables, SearchItemsQueryResult>(
    '/api/v1/items',
    baseOptions,
  );
};
export const useSearchItemsLazyQuery = (
  baseOptions?: QueryBaseOptions<SearchItemsQueryVariables>,
) => {
  return useLazyQuery<SearchItemsQueryVariables, SearchItemsQueryResult>(
    '/api/v1/items',
    baseOptions,
  );
};
export type SearchItemsQueryVariables = {
  country: string;
  q: string;
};
export type SearchItemsQueryResult = Item[];

/**
 * Order
 */
export const useOrderMutation = () => {
  return useMutation<OrderMutationVariables, OrderMutationResult>(
    '/api/v1/orders',
    'post',
    [],
    [
      'itemId',
      'message',
      'quantity',
      'recipient',
      'amount',
      'slug',
      'paymentMethodId',
    ],
  );
};
export type OrderMutationVariables = {
  paymentMethodId?: string;
  itemId: number;
  slug: string;
  message?: string;
  amount: number;
  quantity: number;
  recipient: {
    name: string;
    email: string;
  };
};
export type OrderMutationResult = string;

/**
 * CreateItem
 */
export const useCreateItemMutation = () => {
  return useMutation<CreateItemMutationVariables, CreateItemMutationResult>(
    '/api/admin/items',
    'post',
    [''],
    [
      'name',
      'extendedName',
      'currency',
      'expiresIn',
      'sortOrder',
      'amount',
      'discountRate',
      'originalPrice',
      'couponImageUrl',
      'available',
      'notes',
      'brandId',
      'imageUrl',
      'country',
      'price',
      'type',
      'redemptionInstructions',
      'categoryIDs',
      'influencerDiscountRate',
      'customerDiscountRate',
      'influencerId',
      'slug',
      'metadata',
    ],
  );
};
export type CreateItemMutationVariables = {
  name: string;
  extendedName: string;
  currency: string;
  expiresIn: number;
  amount: number;
  originalPrice: number;
  disCountRate?: number;
  couponImageUrl: string;
  notes?: string[];
  brandId: string;
  price: number;
  available: boolean;
  sortOrder: number;
  country: Country;
  type: ItemType;
  redemptionInstructions?: string;
  categoryIDs: string[];
  imageUrl: string;
  slug: string;
  metadata?: Record<string, any>;
};
export type CreateItemMutationResult = Item;

/**
 * UpdateItem
 */
export const useUpdateItemMutation = () => {
  return useMutation<UpdateItemMutationVariables, UpdateItemMutationResult>(
    '/api/admin/items/:id',
    'put',
    ['id'],
    [
      'extendedName',
      'currency',
      'expiresIn',
      'originalPrice',
      'sortOrder',
      'discountRate',
      'available',
      'notes',
      'brandId',
      'amount',
      'price',
      'imageUrl',
      'country',
      'type',
      'redemptionInstructions',
      'categoryIDs',
      'influencerDiscountRate',
      'customerDiscountRate',
      'slug',
      'metadata',
      'influencerId',
      'influencerDiscountRate',
    ],
  );
};
export type UpdateItemMutationVariables = {
  extendedName: string;
  id: string;
  currency: string;
  expiresIn: number;
  disCountRate?: number;
  originalPrice: number;
  notes?: string[];
  price: number;
  brandId?: string;
  available: boolean;
  sortOrder: number;
  country: Country;
  type: ItemType;
  redemptionInstructions?: string;
  influencerDiscountRate?: number;
  influencerId?: string;
  categoryIDs: string[];
  imageUrl: string;
  slug: string;
  metadata?: Record<string, any>;
};
export type UpdateItemMutationResult = Item;

/**
 * UpdateBrand
 */
export const useUpdateBrandMutation = () => {
  return useMutation<UpdateBrandMutationVariables, UpdateBrandMutationResult>(
    '/api/admin/brands/:id',
    'put',
    ['id'],
    [
      'name',
      'description',
      'slug',
      'disclaimer',
      'backgroundUrl',
      'thumbnailUrl',
      'available',
      'terms',
      'categories',
      'countries',
    ],
  );
};
export type UpdateBrandMutationVariables = {
  id: string;
  name: string;
  description: string;
  slug: string;
  disclaimer: string;
  backgroundUrl: string;
  thumbnailUrl: string;
  available: boolean;
  terms: string;
  categories: string[];
  countries: string[];
};
export type UpdateBrandMutationResult = Brand;

/**
 * CreateBrand
 */
export const useCreateBrandMutation = () => {
  return useMutation<CreateBrandMutationVariables, CreateBrandMutationResult>(
    '/api/admin/brands',
    'post',
    [''],
    [
      'name',
      'description',
      'slug',
      'disclaimer',
      'backgroundUrl',
      'sub',
      'thumbnailUrl',
      'available',
      'terms',
      'categories',
      'countries',
    ],
  );
};
export type CreateBrandMutationVariables = {
  name: string;
  description: string;
  sub: string;
  slug: string;
  disclaimer: string;
  backgroundUrl: string;
  thumbnailUrl: string;
  available: boolean;
  terms: string;
  categories: string[];
  countries: string[];
};
export type CreateBrandMutationResult = Brand;

/**
 * GetItems for admin
 */
export const useGetItemsQuery = (
  baseOptions?: QueryBaseOptions<GetItemsQueryVariables>,
) => {
  return useQuery<GetItemsQueryVariables, GetItemsQueryResult>(
    '/api/admin/items',
    baseOptions,
    [],
  );
};
export const useGetItemsLazyQuery = (
  baseOptions?: QueryBaseOptions<GetItemsQueryVariables>,
) => {
  return useLazyQuery<GetItemsQueryVariables, GetItemsQueryResult>(
    '/api/admin/items',
    baseOptions,
    [],
  );
};
export type GetItemsQueryVariables = {};
export type GetItemsQueryResult = Item[];

/**
 * SignS3
 */
export const useSignS3Mutation = () => {
  return useMutation<SignS3MutationVariables, SignS3MutationResult>(
    '/api/admin/sign-s3',
    'post',
    [''],
    ['filename', 'filetype'],
  );
};
export type SignS3MutationVariables = {
  filename: string;
  filetype: string;
};
export type SignS3MutationResult = {
  signedUrl: string;
  url: string;
};

/**
 * Login
 */
export const useLoginMutation = () => {
  return useMutation<LoginMutationVariables, LoginMutationResult>(
    '/api/v1/login',
    'post',
    [''],
    ['username', 'password'],
  );
};
export type LoginMutationVariables = {
  username: string;
  password: string;
};
export type LoginMutationResult = {
  token: string;
  user: Record<string, any>;
};

/**
 * Logout
 */
export const useLogoutMutation = () => {
  return useMutation<LogoutMutationVariables, LogoutMutationResult>(
    '/api/v1/logout',
    'post',
    [''],
  );
};
export type LogoutMutationVariables = {};
export type LogoutMutationResult = boolean;

/**
 * ResendGift
 */
export const useResendGiftMutation = () => {
  return useMutation<ResendGiftMutationVariables, ResendGiftMutationResult>(
    '/api/v1/orders/:id/resend',
    'post',
    ['id'],
    [],
  );
};
export type ResendGiftMutationVariables = {
  id: string;
};
export type ResendGiftMutationResult = boolean;

/**
 * CreateGPoint
 */
export const useCreateGPointMutation = () => {
  return useMutation<CreateGPointMutationVariables, CreateGPointMutationResult>(
    '/api/admin/gpoints/create',
    'post',
    [],
    ['name', 'slug', 'amount', 'imageUrl'],
  );
};
export type CreateGPointMutationVariables = {
  name: string;
  imageUrl: string;
  slug: string;
  amount: number;
};
export type CreateGPointMutationResult = GPoint;

/**
 * ListGPoints
 */
export const useListGPointsQuery = (
  baseOptions?: QueryBaseOptions<ListGPointsQueryVariables>,
) => {
  return useQuery<ListGPointsQueryVariables, ListGPointsQueryResult>(
    '/api/admin/gpoints/list',
    baseOptions,
  );
};
export const useListGPointsLazyQuery = (
  baseOptions?: QueryBaseOptions<ListGPointsQueryVariables>,
) => {
  return useLazyQuery<ListGPointsQueryVariables, ListGPointsQueryResult>(
    '/api/admin/gpoints/list',
    baseOptions,
  );
};
export type ListGPointsQueryVariables = {};
export type ListGPointsQueryResult = GPoint[];

/**
 * DeleteGPoint
 */
export const useDeleteGPointMutation = () => {
  return useMutation<DeleteGPointMutationVariables, DeleteGPointMutationResult>(
    '/api/admin/gpoints/:id',
    'delete',
    ['id'],
    [],
  );
};
export type DeleteGPointMutationVariables = {
  id: string;
};
export type DeleteGPointMutationResult = Boolean;

/**
 * GPoints
 */
export const useGPointsQuery = (
  baseOptions?: QueryBaseOptions<GPointsQueryVariables>,
) => {
  return useQuery<GPointsQueryVariables, GPointsQueryResult>(
    '/api/gpoints',
    baseOptions,
  );
};
export const useGPointsLazyQuery = (
  baseOptions?: QueryBaseOptions<GPointsQueryVariables>,
) => {
  return useLazyQuery<GPointsQueryVariables, GPointsQueryResult>(
    '/api/gpoints',
    baseOptions,
  );
};
export type GPointsQueryVariables = {};
export type GPointsQueryResult = GPoint[];

/**
 * GPoint
 */
export const useGPointQuery = (
  baseOptions?: QueryBaseOptions<GPointQueryVariables>,
) => {
  return useQuery<GPointQueryVariables, GPointQueryResult>(
    '/api/gpoints/:id',
    baseOptions,
    ['id'],
  );
};
export const useGPointLazyQuery = (
  baseOptions?: QueryBaseOptions<GPointQueryVariables>,
) => {
  return useLazyQuery<GPointQueryVariables, GPointQueryResult>(
    '/api/gpoints/:id',
    baseOptions,
    ['id'],
  );
};
export type GPointQueryVariables = {
  id: string;
};
export type GPointQueryResult = GPoint;

/**
 * Forex
 */
export const useForexMutation = () => {
  return useMutation<ForexMutationVariables, ForexMutationResult>(
    '/api/forex',
    'post',
    [],
    ['currency'],
  );
};
export type ForexMutationVariables = {
  currency?: string;
};
export type ForexMutationResult = number;

/**
 * GPointOrder
 */
export const useGPointOrderMutation = () => {
  return useMutation<GPointOrderMutationVariables, GPointOrderMutationResult>(
    '/api/gpoints/order',
    'post',
    [],
    ['id', 'qty', 'recipientName', 'recipientEmail', 'code'],
  );
};
export type GPointOrderMutationVariables = {
  id: string;
  qty: number;
  recipientName: string;
  recipientEmail: string;
  code: number;
};
export type GPointOrderMutationResult = GPointOrder;

/**
 * GPointOrders
 */
export const useGPointOrdersQuery = (
  baseOptions?: QueryBaseOptions<GPointOrdersQueryVariables>,
) => {
  return useQuery<GPointOrdersQueryVariables, GPointOrdersQueryResult>(
    '/api/admin/gpoints/orders',
    baseOptions,
    [],
  );
};
export const useGPointOrdersLazyQuery = (
  baseOptions?: QueryBaseOptions<GPointOrdersQueryVariables>,
) => {
  return useLazyQuery<GPointOrdersQueryVariables, GPointOrdersQueryResult>(
    '/api/admin/gpoints/orders',
    baseOptions,
    [],
  );
};
export type GPointOrdersQueryVariables = {};
export type GPointOrdersQueryResult = GPointOrder[];

/**
 * GPointOrderApprove
 */
export const useGPointOrderApproveMutation = () => {
  return useMutation<
    GPointOrderApproveMutationVariables,
    GPointOrderApproveMutationResult
  >('/api/admin/gpoints/approve', 'post', [], ['id']);
};
export type GPointOrderApproveMutationVariables = {
  id: string;
};
export type GPointOrderApproveMutationResult = boolean;

/**
 * GPointOrderDeny
 */
export const useGPointOrderDenyMutation = () => {
  return useMutation<
    GPointOrderDenyMutationVariables,
    GPointOrderDenyMutationResult
  >('/api/admin/gpoints/deny', 'post', [], ['id', 'string']);
};
export type GPointOrderDenyMutationVariables = {
  id: string;
  reason: string;
};
export type GPointOrderDenyMutationResult = boolean;

/**
 * CreatePaymentCard
 */
export const useCreatePaymentCardMutation = () => {
  return useMutation<
    CreatePaymentCardMutationVariables,
    CreatePaymentCardMutationResult
  >(
    '/api/v1/payment-cards',
    'post',
    [],
    ['holdername', 'number', 'cvc', 'expMonth', 'expYear'],
  );
};
export type CreatePaymentCardMutationVariables = {
  holdername: string;
  number: string;
  expMonth: string;
  expYear: string;
  cvc: string;
};
export type CreatePaymentCardMutationResult = Stripe.PaymentMethod[];

/**
 * PaymentCards
 */
export const usePaymentCardsQuery = (
  baseOptions?: QueryBaseOptions<PaymentCardsQueryVariables>,
) => {
  return useQuery<PaymentCardsQueryVariables, PaymentCardsQueryResult>(
    '/api/v1/payment-cards',
    baseOptions,
    [],
  );
};
export const usePaymentCardsLazyQuery = (
  baseOptions?: QueryBaseOptions<PaymentCardsQueryVariables>,
) => {
  return useLazyQuery<PaymentCardsQueryVariables, PaymentCardsQueryResult>(
    '/api/v1/payment-cards',
    baseOptions,
    [],
  );
};
export type PaymentCardsQueryVariables = {};
export type PaymentCardsQueryResult = Stripe.PaymentMethod[];

/**
 * DeletePaymentCard
 */
export const useDeletePaymentCardMutation = () => {
  return useMutation<
    DeletePaymentCardMutationVariables,
    DeletePaymentCardMutationResult
  >('/api/v1/payment-cards/:id', 'delete', ['id'], []);
};
export type DeletePaymentCardMutationVariables = {
  id: string;
};
export type DeletePaymentCardMutationResult = boolean;

/**
 * Create Coupon Request
 */
 export const useCouponRequestMutation = () => {
  return useMutation<CouponRequestMutationVariables, CouponRequestMutationResult>(
    '/api/v1/dashboard/affiliate/couponRequest',
    'post',
    [], //req.query
    [
      'businessName',
      'phoneNumber',
      'gwalletBusinessUsername',
      'brandName',
      'email',
      'couponInfo'
    ], //req.body
  );
};
export type CouponRequestMutationVariables = {
  businessName: string;
  phoneNumber: string;
  gwalletBusinessUsername: string;
  brandName: string;
  email: string;
  couponInfo: string;
};
export type CouponRequestMutationResult = boolean;