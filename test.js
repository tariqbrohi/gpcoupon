const Stripe = require('stripe');

const stripe = new Stripe(
  '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',
  {
    apiVersion: '2022-08-01',
  },
);

(async () => {
  const invoice = await stripe.invoices.voidInvoice(
    'in_1LimCQJgNGV1fP5SCHWP4crv',
  );

  console.log(invoice);
  // const a = await stripe.paymentMethods.create({
  //   type: 'card',
  //   card: {
  //     number: '376743654131003',
  //     exp_month: 03,
  //     exp_year: 2027,
  //     cvc: '5252',
  //   },
  // });

  // console.log(a);

  // const paymentMethod = await stripe.paymentMethods.attach(a.id, {
  //   customer: 'cus_MP3c7lasznikEm',
  // });

  // console.log(paymentMethod);
})();
