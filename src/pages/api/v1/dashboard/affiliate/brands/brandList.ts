import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import convertDateToMs from '@/lib/convertDateToMs';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'get') {
    throw new NotFoundError();
  }

  const {
    sub,
    startDate = '',
    endDate = '',
    status = 'ALL',
  } = req.query as any;

  // console.log(
  //   '@/api/v1/dashboard/affiliate/brands/brandList - req.query: ',
  //   req.query,
  // );

  if (
    (startDate !== '' && endDate === '') ||
    (startDate === '' && endDate !== '')
  ) {
    throw new BadRequestError('Missing data');
  }

  let { take = 500, skip = 0 } = req.query as any;

  if (typeof take !== 'number') take = Number(take);
  if (typeof skip !== 'number') skip = Number(skip);

  if (!sub) throw new BadRequestError('No BusinessAccount Exists');

  const where: Record<string, any> = {
    sub,
  };

  if (status !== 'ALL') {
    where.status = status;
  }

  if (startDate !== '' && endDate !== '') {
    where.createdAt = {
      gte: convertDateToMs(startDate),
      lte: convertDateToMs(endDate),
    };
  }

  const brands = await prisma.brand.findMany({
    where,
    // select: {
    //   id: true,
    //   name: true,
    //   backgroundUrl: true,
    //   thumbnailUrl: true,
    //   countries: true,
    //   status: true,
    //   categories: true,
    //   createdAt: true,
    // },
    include: {
      categories: true,
    },
  });

  // console.log(
  //   '@api/v1/dashboard/affiliate/brands/brandsList.ts - brand: ',
  //   brands,
  // );

  if (!brands) throw new BadRequestError('No affiliate exists!');

  res.send({
    brands,
  });
});
