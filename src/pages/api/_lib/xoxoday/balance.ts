import client from './client';
import type { Balance, PlaceOrderInput, PlaceOrderResponse } from './types';

export const balance = async (): Promise<Balance> => {
  try {
    const { data } = await client.post('/api', {
      query: 'plumProAPI.query.getBalance',
      tag: 'plumProAPI',
      variables: {
        data: {},
      },
    });
    console.log(data, '  from order place');
    return data.data.getBalance.data;
  } catch (err: any) {
    console.log(JSON.stringify(err, null, 2), ' error while placing order');
    console.error(err?.response?.data);

    return {
      points: 0,
      value: 0,
      currency: 'USD',
    };
  }
};
