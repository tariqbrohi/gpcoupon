import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useCallback, useRef, useState } from 'react';

import { parseUrl } from './utils';
import type { State } from './useQuery';

export type BaseOptions<T> = Omit<
  AxiosRequestConfig<T>,
  'url' | 'method' | 'withCredentials'
>;

export function useLazyQuery<D = any, R = any>(
  url: string,
  baseOptions?: Pick<BaseOptions<D>, 'data'>,
  params: string[] = [],
): [
  (executeOptions: BaseOptions<D>) => Promise<AxiosResponse<R, D>>,
  State<R> & {
    refetch: () => Promise<AxiosResponse<R, D>>;
  },
] {
  const [state, setState] = useState<State<R>>({
    called: false,
    loading: false,
    data: null,
    error: null,
  });
  const ref = useRef({
    executeOptions: baseOptions,
  });

  const query = useCallback(
    async (executeOptions: Pick<BaseOptions<D>, 'data'> = {}) => {
      ref.current.executeOptions = executeOptions;

      setState({
        loading: true,
        called: true,
        data: null,
        error: null,
      });

      return axios
        .get<R, AxiosResponse<R, D>>(
          `${parseUrl({
            url,
            data: executeOptions.data as Record<string, any>,
            params,
          })}`,
        )
        .then((res) => {
          setState({
            loading: false,
            called: true,
            data: res.data,
            error: null,
          });

          return res;
        })
        .catch((error) => {
          setState({
            loading: false,
            called: true,
            data: null,
            error,
          });

          throw error;
        });
    },
    [],
  );

  const refetch = () => {
    return query(ref.current.executeOptions);
  };

  return [
    query,
    {
      ...state,
      refetch,
    },
  ];
}
