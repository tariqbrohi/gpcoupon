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
        sub,
        startDate = '',
        endDate = '',
        country,
        affiliate = 'false',
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
        // sub,
    }

    if (status !== 'ALL') {
        where.status = status;
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
            sub: true,
            backgroundUrl: true,
            thumbnailUrl: true,
            status: true,
            categories: true,
            createdAt: true,
            countries: true,
        },
    });

    if (!brand) throw new BadRequestError('No affiliate exists!');

    // const getInfo = brand.map(({ sub } : any) => ({
    //     sub
    // }));

    const getInfo = brand.map((get : any) => (
        get.sub
    ));
        
    const info = await gpointwallet.getInfoByAccId({
        accountIds: getInfo
    });
    console.log('wow: ', info);

    const walletBusinessUserInfo = info?.accounts;
    console.log('hey: ', walletBusinessUserInfo);

    res.send(brand);
    // res.send(brand || walletBusinessUserInfo);
    // console.log('yoo: ', brand);
    // res.send({brand, walletBusinessUserInfo});
    
    // res.send() 내에는 내가 보내고 싶은 방식으로 보낼 수 있으니 brand 와 walletBusinessUserInfo 에서 필요한 값들을 원하는 형태로 보관하여 보내면 된다.
    // GetBrandsByAffiliateForAdminDashboardQueryVariables 은 인풋에 채워주어야 할 타입이며 GetBrandsByAffiliateForAdminDashboardQueryResult 은 아웃풋 타입을 정해주어야 한다.
    // 만약 newObj 에 필요한 값들을 data 오브젝트 내에 새로 보관한다 정의한다면 res.send(newObj) 를 보내고 아웃풋 타입에 {newObj: data: {id: string; username: string; ... etc}} 로 정해주면 된다. 카톡 참고!
});
