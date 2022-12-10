import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import convertDateToMs from '@/lib/convertDateToMs';
import gpointwallet from '@/pages/api/_lib/gpointwallet';

export default errorHandler(async function handler(req, res) {
    const method = req.method;

    if (method !== 'get') {
        throw new NotFoundError();
    }

    const {
        startDate = '',
        endDate = '',
        affiliate = 'true',
        status = 'ALL',
    } = req.query as any;

    if ((startDate !== '' && endDate === '') || (startDate === '' && endDate !== '')) {
        throw(new BadRequestError('Missing data'));
    }

    let {
        take = 500,
        skip = 0,
    } = req.query as any;

    if (typeof take !== 'number') take = Number(take);
    if (typeof skip !== 'number') skip = Number(skip);

    let where: Record<string, any> = {
        ...(affiliate === 'true' ? { affiliate: true } : { affiliate: false }),
    }

    if (status !== 'ALL') {
        where.status = status;
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
            sub: true,
            backgroundUrl: true,
            thumbnailUrl: true,
            status: true,
            categories: true,
            createdAt: true,
            countries: true,
        },
        skip,
        take
    });

    if (!brand) throw new BadRequestError('No affiliate exists!');

    const getInfo = brand.map((get: any) => (
        get.sub
    ));
        
    const info = await gpointwallet.getInfoByAccId({
        accountIds: getInfo
    });

    const walletBusinessUserInfo = info?.accounts;

    res.send({
        brands: brand, 
        walletInfo: walletBusinessUserInfo
    });

    // console.log({
    //     brands: brand, 
    //     walletInfo: walletBusinessUserInfo
    // });
});
