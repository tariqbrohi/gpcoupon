import { BaseOptions as QueryBaseOptions, useQuery } from './useQuery';
import { Category, Item } from './types';
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
export type GetCategoriesQueryVariables = {
  g?: string;
};
export type GetCategoriesQueryResult = Category[];

/**
 * GetItems
 */
export const useGetItemsQuery = (
  baseOptions?: QueryBaseOptions<GetItemsQueryVariables>,
) => {
  return useQuery<GetItemsQueryVariables, GetItemsQueryResult>(
    '/api/v1/categories/:slug/items',
    baseOptions,
    ['slug'],
  );
};
export const useGetItemsLazyQuery = (
  baseOptions?: QueryBaseOptions<GetItemsQueryVariables>,
) => {
  return useLazyQuery<GetItemsQueryVariables, GetItemsQueryResult>(
    '/api/v1/categories/:slug/items',
    baseOptions,
    ['slug'],
  );
};
export type GetItemsQueryVariables = {
  country: string;
  slug: string | string[] | undefined;
};
export type GetItemsQueryResult = Item[];

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
 * CreateCase
 */
// export const useCreateCaseMutation = () => {
//   return useMutation<CreateCaseMutationVariables, CreateCaseMutationResult>(
//     "/api/applications/:appId/cases",
//     "post",
//     ["appId"],
//     ["subject", "description", "uploads"]
//   );
// };
// export type CreateCaseMutationVariables = {
//   appId: string;
//   subject: string;
//   description: string;
//   uploads: string[];
// };
// export type CreateCaseMutationResult = Case;
