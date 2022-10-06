const Stripe = require('stripe');
const moment = require('moment');

const stripe = new Stripe(
  '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',
  {
    apiVersion: '2022-08-01',
  },
);

(async () => {
  // const subscription = await stripe.subscriptions.update(
  //   'sub_1Ljqj5JgNGV1fP5SPRM7mHOe',
  //   {
  //     trial_end: 1664524800,
  //   },
  // );

  // let subscription = await stripe.subscriptions.update(
  //   'sub_1Ljqj5JgNGV1fP5SPRM7mHOe',
  //   {
  //     billing_cycle_anchor: 'now',
  //     proration_behavior: 'create_prorations',
  //   },
  // );

  // console.log(subscription);

  // const subscriptionSchedule = await stripe.subscriptionSchedules.cancel(
  //   'sub_sched_1Ljqj5JgNGV1fP5SGR1RUODC',
  // );

  // console.log(subscriptionSchedule);

  // const subscriptionSchedule = await stripe.subscriptions.update(
  //   'sub_1Ljqj5JgNGV1fP5SPRM7mHOe',
  //   { cancel_at_period_end: false },
  // );
  // console.log(subscriptionSchedule);

  // const subscription = await stripe.subscriptions.update(
  //   'sub_1Ljqj5JgNGV1fP5SPRM7mHOe',
  //   {
  //     trial_end: 1664524800,
  //     proration_behavior: 'none',
  //   },
  // );

  // console.log(subscription);

  // const invoice = await stripe.invoices.voidInvoice(
  //   'in_1Ljqj5JgNGV1fP5SR1T3pkBJ',
  // );

  // console.log(invoice);
  const a = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: '4246315328750599',
      exp_month: 02,
      exp_year: 2027,
      cvc: '821',
    },
  });

  // console.log(a);

  const paymentMethod = await stripe.paymentMethods.attach(a.id, {
    customer: 'cus_MWuavsyjH6tVPl',
  });

  // console.log(paymentMethod);
})();
