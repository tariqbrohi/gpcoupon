import axios from 'axios';
import { uniqBy } from 'lodash';
import {
  categories,
  images,
  slugs,
  countries,
  normalizeItems,
} from './helpers';

const bearerToken =
  'eyJ0b2tlbkNvbnRlbnQiOnsiaXNzdWVkRm9yIjoidGVzdCIsInNjb3BlIjoiIiwiaXNzdWVkQXQiOjE2NTYwOTI1MzMzMTksImV4cGlyZXNBdCI6IjIwMjItMDctMDlUMTc6NDI6MTMuMzE5WiIsInRva2VuX3R5cGUiOiJVU0VSIn0sImFfdCI6ImV5SmxibU1pT2lKQk1USTRRMEpETFVoVE1qVTJJaXdpWVd4bklqb2lSVU5FU0MxRlV5SXNJbXRwWkNJNkltVnVZeUlzSW1Wd2F5STZleUpyZEhraU9pSkZReUlzSW1OeWRpSTZJbEF0TWpVMklpd2llQ0k2SWsxSlNXeGZRbWxsU2xoTGVWSXpOVEpLWlV4M1kySklialZSVTNCeWNXOVpTbGhEYzJ0VFIzQnlORkVpTENKNUlqb2ljazh4VFhWdVFXTkJWMEpFVjBnMGFUSmFYMUpZYjFOTlpWTjFTRGh0Um1zM1JFTmtXRVEzTWpkVVp5SjlmUS4uMVczMGg2UVJrZzdjeVpNcnBUcFoxQS5LdUFuckNaSzFmM21MWjBGVTlybGd1clpMbDM2N005cGNiT21aNmxOY0IwanF1bnF2T29qTmg4WWxkbDlKcTJsV2dnOEthcTdqTzludlN3aWJzcU5ld2FZUlF0NlE5ZEo0ZVVHX1FEUlppS3dLbEN0Q3A1MlVxOC1IaG1KamFNaW1KdmVTNjA3aHYxaW1qRnNqSldqREh5QmRFYWZJdVY4UHdCQ050c01KaGNRb3ppOTNYWFpQbV9TUy1tY1p3Yi1IT2NNUU5vS3RBcmxqZzBSRFR4dUlHTGtjcy1ZUk9YS0hsNmZEWEhKMG40T2lGVVFYOGsxYm9NSklvTlhmWURzVnRTaXZfNTN3eEpmcl9SbVRtM2pXM1JtR3BkZUVhNWp2MC1KLXgtOEFfVGw1bXMwM0VZbUlFWlpYZnlfV2huaTdHSzRNNHRIUEhSWXU2SF9Qa3A5ZFNpbjVpTTUwenNKMFREWkxtYUd0V3lLTGtrNzktOFJTdlVtSk00aExpRDVtZmJyVlRkWXVySkZLOVZiTzJ6S21kWFNMVTVzb1h4djdwTVRWYy1NTEN4SUM1RmdSMUczdXZ1MmtVNV9SbC1UNXd0V0gtUVIxd1ZUVHlWaFJNcmpQLXE5RFdiUmphelFXeWhUam5KVjNuMHdsRlZRR1NlNVJ3M08zRkpWTHlROXVFVm5TVDdHM0llMkNjNWd0N0dKVldWcEtGVGx6a3RadVhnOVhZcy1CSHc3MlpPWDVtd3NvUEpSTUJ2WVFHX1I3bFZONGlGT1hCaVNySGxsYTZOU3hVZkxqUzlOMVh6Vm1QRGQ3RldqZ2xFb0NHUTgyUlg0dHdfazV5WUsyekhBUGVMU2Q0UGRqM2pRM0lEcDRJRXhmT0swbE53b3R4bTc3Q2tOb1hXWjljdkY3TmFoZ1Ria0JjY0pYMFh4dWw5eEZobC1weVNOd1cxRm5yZ0dGc2ROZWNHM3FERzZlWG9wc3JYQWtWSEpFQ0t0b1F3bXByb3BUSDBzOTB1REZTUGZ5aF9wMFd3b3VKcUJTUnlLdFItZU9rdl9qak9CNXNycjdUZlZfX3l1X2pEOWVqekd1UjRqU1pRVE1KYzNLaXBfOGlPLVRhNVZOcDFYNHJmbHJQcmxXZUc4U0o1cG1vcGJpQ1JFMThlcTU4S3ZGOEk3cTBHMWN2dkpWalYzN1c4bi4yajVyQ2t3ZlQ2TC1aU1RxWEp5NXZRIn0=';

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
        value: countries[country],
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
  }
}

export default Xoxoday.GetClient();
