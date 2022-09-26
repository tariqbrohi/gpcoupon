import errorHandler from '@/pages/api/_middlewares/error-handler';
import isAuth from '@/pages/api/_middlewares/is-auth';
import prisma from '@/prisma';
import { stripe } from '@/pages/api/_lib/stripe';
import { InternalServerError } from '@/lib/errors';

export default isAuth(
  errorHandler(async function handler(req, res) {
    if (req.method === 'post') {
      // add payment method
      const { number, expMonth, expYear, cvc, holdername, userId } = req.body;

      const customer = await prisma.stripe.findUnique({
        where: {
          userId,
        },
      });

      let stripeId: string | undefined = '';

      stripeId = customer?.stripeId;

      if (!customer) {
        const newCustomer = await stripe.customers.create({
          name: userId,
          metadata: {
            holdername,
          },
        });

        stripeId = newCustomer.id;

        await prisma.stripe.create({
          data: {
            userId: userId,
            stripeId,
          },
        });
      }

      if (!stripeId) throw new InternalServerError();

      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number,
          exp_month: expMonth,
          exp_year: expYear,
          cvc,
        },
        metadata: {
          holdername,
        },
      });

      // Attach a payment method to a Customer
      await stripe.paymentMethods.attach(paymentMethod.id, {
        customer: stripeId!,
      });

      const listPaymentMethods = await stripe.customers.listPaymentMethods(
        stripeId!,
        { type: 'card' },
      );

      return res.send(listPaymentMethods.data);
    }
  }),
);
