import { findMany, findOne } from './voucher';
import { place, detail } from './orders';

const xoxoday = {
  vouchers: {
    findMany,
    findOne,
  },
  orders: {
    place,
    detail,
  },
};

export default xoxoday;
