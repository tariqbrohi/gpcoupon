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
        startDate = '',
        endDate = '',
        country,
        affiliate = 'false',
        status = 'ALL',
    } = req.query as any;

    if ((startDate !== '' && endDate ==='') || (startDate === '' && endDate !== '')) {
        throw(new BadRequestError('Missing data'));
    }

    let {
        take = 500,
        skip = 0,
    } = req.query as any;

    if (typeof take !== 'number') take = Number(take);
    if (typeof skip !== 'number') skip = Number(skip);

    let where: Record<string, any> = {
        status,
        ...(affiliate === 'true' ? { affiliate: true } : { affiliate: false }),
        // sub,
    }

    // if (status !== 'ALL') {
    //     where.status = status;
    // }

    if (status === 'ALL') {
        delete where.status;
    }
    
    if (country) {
        where.countries = {
            has: country,
        };
    }

    if (startDate !== '' && endDate !== '') {
        where.createdAt = {
            gte: convertDateToMs(startDate),
            lte: convertDateToMs(endDate)
        };
    }

    const brand = await prisma.brand.findMany({
        where,
        select: {
            id: true,
            name: true,
            backgroundUrl: true,
            thumbnailUrl: true,
            status: true,
            categories: true,
            createdAt: true,
            countries: true,
        },
    });

    if (!brand) throw new BadRequestError('No affiliate exists!');

    res.send(brand);
});
