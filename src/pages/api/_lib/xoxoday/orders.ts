import client from './client';
import type { PlaceOrderInput, PlaceOrderResponse } from './types';

export const place = async (
  input: PlaceOrderInput,
): Promise<PlaceOrderResponse | null> => {
  try {
    const { data } = await client.post('/', {
      query: 'plumProAPI.mutation.placeOrder',
      tag: 'plumProAPI',
      variables: {
        data: input,
      },
    });

    return data.data.placeOrder.data;
  } catch (err) {
    console.error(err);

    return null;
  }
};
