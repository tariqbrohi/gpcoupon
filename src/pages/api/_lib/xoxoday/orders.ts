import client from './client';
import type { PlaceOrderInput, PlaceOrderResponse } from './types';

export const place = async (
  input: PlaceOrderInput,
): Promise<PlaceOrderResponse | null> => {
  try {
    const { data } = await client.post('/api', {
      query: 'plumProAPI.mutation.placeOrder',
      tag: 'plumProAPI',
      variables: {
        data: input,
      },
    });
    console.log(data, '  from order place');
    return data.data.placeOrder.data;
  } catch (err: any) {
    console.log(JSON.stringify(err, null, 2), ' error while placing order');
    console.error(err?.response?.data);

    return null;
  }
};

export const detail = async (orderId: number) => {
  try {
    const { data } = await client.post('/api', {
      query: 'plumProAPI.mutation.getOrderDetails',
      tag: 'plumProAPI',
      variables: {
        data: {
          poNumber: '',
          orderId,
        },
      },
    });

    return data;
  } catch (err: any) {
    console.log(err.response.data);

    return null;
  }
};
