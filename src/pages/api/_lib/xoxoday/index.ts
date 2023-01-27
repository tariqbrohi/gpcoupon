import { findMany, findOne } from './voucher';
import { balance } from './balance';
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
  balance,
};
//
export default xoxoday;
