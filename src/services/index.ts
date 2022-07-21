import { BaseOptions as QueryBaseOptions, useQuery } from './useQuery';
import {
  Brand,
  Category,
  Country,
  Item,
  ItemType,
  Order,
  Payment,
  Recipient,
  Status,
} from '@prisma/client';
import { useLazyQuery } from './useLazyQuery';
import { useMutation } from './useMutation';

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
export type GetBrandsQueryVariables = {};
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
};
export type GetCategoryItemsQueryResult = Category & { items: Item[] };

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
};
export type GetBrandItemsQueryResult = Brand & { items: Item[] };

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
    ['itemId', 'message', 'quantity', 'recipient', 'amount', 'slug'],
  );
};
export type OrderMutationVariables = {
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
      'sortOrder',
      'discountRate',
      'available',
      'notes',
      'amount',
      'price',
      'imageUrl',
      'country',
      'type',
      'redemptionInstructions',
      'categoryIDs',
      'influencerDiscountRate',
      'customerDiscountRate',
      'metadata',
      'id',
    ],
  );
};
export type UpdateItemMutationVariables = {
  extendedName: string;
  id: string;
  currency: string;
  expiresIn: number;
  disCountRate?: number;
  notes?: string[];
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
