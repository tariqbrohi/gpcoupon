import errorHandler from '@/pages/api/_middlewares/error-handler';
import gpointwallet from '@/pages/api/_lib/gpointwallet';
import prisma from '@/prisma';
import withApiAuthRequired from '../../_middlewares/with-api-auth-required';
import { ForbiddenError, UnauthenticatedError } from '@/lib/errors';
import { stripe } from '../../_lib/stripe';

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

    if (req.method === 'delete') {
      if (!customer?.stripeId) {
        return res.send([]);
      }

      const paymentMethod = await stripe.paymentMethods.retrieve(
        req.query.id as string,
      );

      console.log(paymentMethod.customer, customer.stripeId);

      if (paymentMethod.customer !== customer.stripeId) {
        throw new ForbiddenError();
      }

      try {
        await stripe.paymentMethods.detach(req.query.id as string);
      } catch (err) {
        console.log(err);
      }

      return res.send(true);
    }
  }),
);
