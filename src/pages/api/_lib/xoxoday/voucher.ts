import client from './client';
import { countries, normalizeItems } from './helpers';
import { Item } from '@prisma/client';
import type { FindOneVoucherInput, FindManyVouchersInput } from './types';

export const findMany = async ({
  country,
  category,
}: FindManyVouchersInput): Promise<Item[]> => {
  try {
    const { data } = await client.post('/', {
      query: 'plumProAPI.mutation.getVouchers',
      tag: 'plumProAPI',
      variables: {
        data: {
          limit: 0,
          page: 0,
          filters: [
            {
              key: 'country',
              value: countries(country),
            },
            {
              key: 'voucher_category',
              value: category,
            },
          ],
        },
      },
    });

    return normalizeItems(data.data.getVouchers.data);
  } catch (err) {
    console.error(err);

    return [];
  }
};

export const findOne = async ({
  itemId,
  amount,
}: FindOneVoucherInput): Promise<Item | null> => {
  try {
    const { data } = await client.post('/', {
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
