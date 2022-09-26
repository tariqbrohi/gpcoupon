import client from './client';
import {
  countries,
  mapBrandSlugToProductName,
  mapStagingCatToProdCat,
  normalizeItems,
} from './helpers';
import { Item } from '@prisma/client';
import type { FindOneVoucherInput, FindManyVouchersInput } from './types';

export const findMany = async ({
  country,
  category,
  brand,
}: FindManyVouchersInput): Promise<Item[]> => {
  const filters = [
    {
      key: 'country',
      value: countries(country),
    },
  ];
  console.log(countries(country));
  if (category && category !== 'all') {
    filters.push({
      key: 'voucher_category',
      value:
        process.env.NODE_ENV === 'production'
          ? category
          : mapStagingCatToProdCat(category),
    });
  }

  if (brand) {
    filters.push({
      key: 'productName',
      value: mapBrandSlugToProductName(brand),
    });
  }

  try {
    const { data } = await client.post('/api', {
      query: 'plumProAPI.mutation.getVouchers',
      tag: 'plumProAPI',
      variables: {
        data: {
          limit: 0,
          page: 0,
          filters,
        },
      },
    });

    return normalizeItems(data.data.getVouchers.data);
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const findOne = async ({
  itemId,
  amount,
}: FindOneVoucherInput): Promise<Item | null> => {
  try {
    const { data } = await client.post('/api', {
      query: 'plumProAPI.mutation.getVouchers',
      tag: 'plumProAPI',
      variables: {
        data: {
          limit: 0,
          page: 0,
          includeProducts: itemId,
        },
      },
    });

    const items = normalizeItems(data.data.getVouchers.data);
    const item = items.find((item: Item) => item.amount === +amount);

    return item || null;
  } catch {
    return null;
  }
};
