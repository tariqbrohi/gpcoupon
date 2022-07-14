import { isNil, omit, omitBy } from 'lodash';

type Options = {
  url: string;
  data?: Record<string, any>;
  params: string[];
  bodies?: string[];
};

export const parseUrl = ({ url, data = {}, params, bodies = [] }: Options) => {
  if (isNil(data)) return url;

  /**
   * Replace :param with actual value.
   */
  let newUrl = url;

  const query = omitBy(omit(data, [...params, ...bodies]), isNil) as Record<
    string,
    any
  >;

  params.forEach((param) => {
    newUrl = newUrl.replaceAll(`:${param}`, data[param]);
  });

  const str: string[] = [];

  /**
   * Now it handles the query params.
   */
  Object.keys(query).forEach((q, i) => {
    str.push(`${i === 0 ? '?' : '&'}${q}=${query[q]}`);
  });

  return `${newUrl}${str.join('')}`;
};
