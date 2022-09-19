const Stripe = require('stripe');

const stripe = new Stripe(
  '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',
  {
    apiVersion: '2022-08-01',
  },
);

(async () => {
  const invoice = await stripe.invoices.voidInvoice(
    'in_1Ljqj5JgNGV1fP5SR1T3pkBJ',
  );

  console.log(invoice);
  // const a = await stripe.paymentMethods.create({
  //   type: 'card',
  //   card: {
  //     number: '4246315328750599',
  //     exp_month: 02,
  //     exp_year: 2027,
  //     cvc: '821',
  //   },
  // });

  // console.log(a);

  // const paymentMethod = await stripe.paymentMethods.attach(a.id, {
  //   customer: 'cus_MSmBxpFS1K7Sgb',
  // });

  // console.log(paymentMethod);
})();
