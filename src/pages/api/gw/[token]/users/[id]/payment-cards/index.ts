import errorHandler from '@/pages/api/_middlewares/error-handler';
import isAuth from '@/pages/api/_middlewares/is-auth';
import prisma from '@/prisma';
import { stripe } from '@/pages/api/_lib/stripe';

export default isAuth(
  errorHandler(async function handler(req, res) {
    if (req.method === 'get') {
      const { id } = req.query as any;

      const customer = await prisma.stripe.findUnique({
        where: {
          userId: id,
        },
      });

      if (!customer?.stripeId) {
        return res.send([]);
      }

      const listPaymentMethods = await stripe.customers.listPaymentMethods(
        customer.stripeId,
        {
          type: 'card',
        },
      );

      return res.send(listPaymentMethods.data);
    }
  }),
);
