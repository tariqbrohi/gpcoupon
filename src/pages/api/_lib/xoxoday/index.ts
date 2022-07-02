import axios from 'axios';
import { uniqBy } from 'lodash';
import {
  categories,
  images,
  slugs,
  countries,
  normalizeItems,
} from './helpers';

const bearerToken = process.env.XOXO_TOKEN;

class Xoxoday {
  static client: Xoxoday;

  private request = axios.create({
    baseURL: 'https://accounts.xoxoday.com/chef/v1/oauth/api',
    headers: {
      'Access-Control-Allow-Origin': `*`,
      Accept: `application/json`,
      'Content-Type': `application/json`,
      //   Authorization: `Bearer ${req.body.token}`,
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  static GetClient() {
    if (this.client) return this.client;

    this.client = new Xoxoday();

    return this.client;
  }

  async getCategories() {
    const { data } = await this.request.post('/', {
      query: 'plumProAPI.mutation.getFilters',
      tag: 'plumProAPI',
      variables: {
        data: {
          filterGroupCode: 'voucher_category',
          includeFilters: '',
          excludeFilters: '',
        },
      },
    });

    return (
      uniqBy(
        data.data?.getFilters?.data?.[0]?.filters?.map((filter: any) => {
          const name = categories[filter.filterValue] || 'Other';
          const slug = name.toLowerCase().replace(' & ', '_');

          return {
            name,
            slug,
            image: {
              small: images.small[name] || '/images/sm/other.jpg',
              medium: images.medium[name] || '/images/other.jpg',
            },
          };
        }),
        'name',
      ) || []
    );
  }

  async getItems({
    catSlug,
    country,
    q,
  }: {
    catSlug?: string;
    country: string;
    q?: string;
  }) {
    const filters: Record<string, any>[] = [
      {
        key: 'country',
        value: countries(country),
      },
    ];

    if (catSlug) {
      filters.push(
        ...slugs[catSlug.toLowerCase()].map((slug: string) => ({
          key: 'voucher_category',
          value: slug,
        })),
      );
    }

    if (q) {
      filters.push({
        key: 'productName',
        value: q,
      });
    }

    try {
      const { data } = await this.request.post('/', {
        query: 'plumProAPI.mutation.getVouchers',
        tag: 'plumProAPI',
        variables: {
          data: {
            page: 1,
            limit: 0,
            includeProducts: '',
            excludeProducts: '',
            filters,
          },
        },
      });

      const vouchers = data?.data?.getVouchers?.data || [];

      return normalizeItems(vouchers);
    } catch {
      return [];
    }
  }
}

export default Xoxoday.GetClient();
