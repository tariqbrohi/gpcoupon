import { findMany, findOne } from './voucher';
import { place } from './orders';

const xoxoday = {
  vouchers: {
    findMany,
    findOne,
  },
  orders: {
    place,
  },
};

export default xoxoday;
