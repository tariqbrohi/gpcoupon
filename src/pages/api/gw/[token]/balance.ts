import errorHandler from '@/pages/api/_middlewares/error-handler';
import isAuth from '@/pages/api/_middlewares/is-auth';
import xoxoday from '@/pages/api/_lib/xoxoday';

export default isAuth(
  errorHandler(async function handler(req, res) {
    if (req.method === 'post') {
      const { points } = await xoxoday.balance();

      res.send(points);
    }
  }),
);
