import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import errorHandler from '@/pages/api/_middlewares/error-handler';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import prisma from '@/prisma';

export default withApiAuthRequired(
    errorHandler(async function handler(req, res) {
        const method = req.method;

        if (method !== 'get') {
            throw new NotFoundError();
        }
    
        const {
            sortBy,
            affiliate,
        } = req.query as any;
    
        let {
            take = 500,
            skip = 0,
        } = req.query as any;
    
        if (typeof take !== 'number') take = Number(take);
        if (typeof skip !== 'number') skip = Number(skip);
    
        let orderBy: Record<string, string> = {};

        if (sortBy === 'sales, desc') {
            orderBy.sortOrder = 'desc';
        } else if (sortBy === 'amount, desc') {
            orderBy.amount = 'desc';
        } else if (sortBy === 'amount, asc') { 
            orderBy.amount = 'asc';
        } else if (sortBy === 'createdAt, desc') {
            orderBy.createdAt = 'desc';
        } else {
            orderBy.createdAt = 'asc';
        }

        const brand = (await prisma.brand.findMany({
            where: {
                affiliate,
            },
            select: {
                id: true,
                affiliate: true,
                name: true,
            },
        }));

        const items = await prisma.item.findMany({
            where: {
                brandId: brand.id,
            },
            select: {
                id: true,
                brand: true,
            },
        });

        const [orders, ordersAll] = await Promise.all([
            prisma.order.findMany({
                take,
                skip,
                orderBy,
                where: {
                    itemId: {
                        in: items.map(({ id }) => id)
                    },
                },
                select: {
                    id: true,
                    status: true,
                    item: true,
                    createdAt: true
                }
            }),
            prisma.order.findMany({
                where: {
                    itemId: {
                        in: items.map(({ id }) => id)
                    },
                },
                select: {
                    item: true,
                },
            }),
        ]);
        // console.log('order: ', orders);
    
        const profitSum = ordersAll.reduce((tot: number, order: any) => {
            return tot + (order?.item?.amount);
        }, 0);  
    
        res.send(
            {
                total: 
                    {
                        count: ordersAll.length,
                        profitSum,
                    }, 
                orders: orders,
            }
        );
    }),
);
