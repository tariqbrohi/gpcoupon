import { BaseOptions as QueryBaseOptions, useQuery } from './useQuery';
import { Brand, Category, Country, Item, ItemType } from '@prisma/client';
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
 * GetItem
 */
export const useGetItemQuery = (
  baseOptions?: QueryBaseOptions<GetItemQueryVariables>,
) => {
  return useQuery<GetItemQueryVariables, GetItemQueryResult>(
    '/api/v1/items/:slug',
    baseOptions,
    ['slug'],
  );
};
export const useGetItemLazyQuery = (
  baseOptions?: QueryBaseOptions<GetItemQueryVariables>,
) => {
  return useLazyQuery<GetItemQueryVariables, GetItemQueryResult>(
    '/api/v1/items/:slug',
    baseOptions,
    ['slug'],
  );
};
export type GetItemQueryVariables = {
  slug: string;
};
export type GetItemQueryResult = Item;

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
    '/api/v1/order',
    'post',
    [],
    [
      'username',
      'password',
      'itemId',
      'message',
      'quantity',
      'recipient',
      'amount',
      'slug',
    ],
  );
};
export type OrderMutationVariables = {
  itemId: number;
  slug: string;
  message?: string;
  username: string;
  password: string;
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
      'amount',
      'discountRate',
      'notes',
      'brandId',
      'imageUrls',
      'country',
      'type',
      'redemptionInstructions',
      'categoryIDs',
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
  notes?: string[];
  brandId: string;
  country: Country;
  type: ItemType;
  redemptionInstructions?: string;
  categoryIDs: string[];
  metadata?: Record<string, any>;
};
export type CreateItemMutationResult = Item;
