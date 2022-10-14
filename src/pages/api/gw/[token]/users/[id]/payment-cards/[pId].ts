import errorHandler from '@/pages/api/_middlewares/error-handler';
import isAuth from '@/pages/api/_middlewares/is-auth';
import prisma from '@/prisma';
import { stripe } from '@/pages/api/_lib/stripe';
import { BadRequestError, ForbiddenError } from '@/lib/errors';

export default isAuth(
  errorHandler(async function handler(req, res) {
    if (req.method === 'delete') {
      const { id, pId } = req.query as any;

      const customer = await prisma.stripe.findUnique({
        where: {
          userId: id,
        },
      });

      if (!customer?.stripeId) {
        throw new BadRequestError('You have no payment method');
      }

      const paymentMethod = await stripe.paymentMethods.retrieve(pId);

      // console.log(paymentMethod.customer, customer.stripeId);

      if (paymentMethod.customer !== customer.stripeId) {
        throw new ForbiddenError();
      }

      try {
        await stripe.paymentMethods.detach(pId);
      } catch (err) {
        console.log(err);
      }

      return res.status(204).send(true);
    }
  }),
);
