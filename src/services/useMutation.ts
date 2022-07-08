import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { pick } from 'lodash';
import { parseUrl } from './utils';
import { useCallback, useState } from 'react';
import type { State } from './useQuery';

export type BaseOptions<T> = Omit<
  AxiosRequestConfig<T>,
  'url' | 'method' | 'withCredentials'
>;

export function useMutation<D = any, R = any>(
  url: string,
  method: Method,
  params: string[] = [],
  bodies: string[] = [],
): [
  (executeOptions: BaseOptions<D>) => Promise<AxiosResponse<R, D>>,
  State<R>,
] {
  const [state, setState] = useState<State<R>>({
    called: false,
    loading: false,
    data: null,
    error: null,
  });

  const execute = useCallback(async (executeOptions: BaseOptions<D> = {}) => {
    setState({
      loading: true,
      called: true,
      data: null,
      error: null,
    });

    const parsedUrl = parseUrl({
      url,
      data: executeOptions.data as Record<string, any>,
      params,
      bodies,
    });
    console.log(parsedUrl, ' parsed');
    return axios
      .request<R, AxiosResponse<R, D>>({
        method,
        url: `${parsedUrl}`,
        withCredentials: true,
        ...executeOptions,
        data: executeOptions.data
          ? pick(executeOptions.data as any, bodies)
          : {},
      })
      .then((res) => {
        setState({
          error: null,
          called: true,
          loading: false,
          data: res.data,
        });

        return res;
      })
      .catch((error) => {
        setState({
          error,
          called: true,
          loading: false,
          data: null,
        });

        throw error;
      });
  }, []);

  return [execute, { ...state }];
}
