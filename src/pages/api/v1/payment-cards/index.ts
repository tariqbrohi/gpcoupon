import errorHandler from '@/pages/api/_middlewares/error-handler';
import gpointwallet from '@/pages/api/_lib/gpointwallet';
import prisma from '@/prisma';
import withApiAuthRequired from '../../_middlewares/with-api-auth-required';
import { stripe } from '../../_lib/stripe';
import { InternalServerError, UnauthenticatedError } from '@/lib/errors';

export default withApiAuthRequired(
  errorHandler(async function handler(req, res) {
    const session = gpointwallet.getSession(req);

    if (!session) throw new UnauthenticatedError();

    const { user, token } = session;

    const customer = await prisma.stripe.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (req.method === 'post') {
      const { number, expMonth, expYear, cvc, holdername } = req.body;

      let stripeId: string | undefined = '';

      stripeId = customer?.stripeId;

      if (!customer) {
        const newCustomer = await stripe.customers.create({
          name: user.id,
          metadata: {
            holdername,
          },
        });

        stripeId = newCustomer.id;

        await prisma.stripe.create({
          data: {
            userId: user.id,
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
