import { BaseOptions as QueryBaseOptions, useQuery } from './useQuery';
import {
  Brand,
  Category,
  Country,
  GPoint,
  Item,
  ItemType,
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
    '/api/v1/brands/:slug',
    baseOptions,
    ['slug'],
  );
};
export const useGetBrandLazyQuery = (
  baseOptions?: QueryBaseOptions<GetBrandQueryVariables>,
) => {
  return useLazyQuery<GetBrandQueryVariables, GetBrandQueryResult>(
    '/api/v1/brands/:slug',
    baseOptions,
    ['slug'],
  );
};
export type GetBrandQueryVariables = {
  slug: string;
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
      'available',
      'notes',
      'brandId',
      'imageUrl',
      'country',
      'type',
      'redemptionInstructions',
      'categoryIDs',
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
  notes?: string[];
  brandId: string;
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
      'brandId',
      'imageUrl',
      'country',
      'type',
      'redemptionInstructions',
      'categoryIDs',
      'slug',
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
  brandId: string;
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
    'put',
    [''],
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
export type CreateBrandMutationVariables = {
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
export type DeleteGPointMutationResult = GPoint;
