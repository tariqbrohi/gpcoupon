import { NextApiRequest, NextApiResponse } from 'next';
import { restClient } from '@polygon.io/client-js';

const rest = restClient(process.env.POLYGON_SECRET!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method?.toLowerCase();

  if (method !== 'post') {
    return res.status(404).send({
      errors: [
        {
          message: 'NotFound',
        },
      ],
    });
  }

  try {
    const { currency = 'USDKRW' } = req.body;

    const previousClosed = await rest.forex.previousClose(`C:${currency}`);

    res.send(previousClosed.results?.[0].h);
  } catch (err: any) {
    console.log(err);

    res.status(400).send({
      errors: [
        {
          message: 'Something went wrong. Please try again.',
        },
      ],
    });
  }
}
