import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import errorHandler from '@/pages/api/_middlewares/error-handler';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import prisma from '@/prisma';
import convertDateToUnix from '@/lib/convertDateToUnix';

export default withApiAuthRequired(
    errorHandler(async function handler(req, res) {
        const method = req.method;

        if (method !== 'get') {
            throw new NotFoundError();
        }

        const {
            startDate,
            endDate,
            status
        } = req.query as any;
        
        if ((startDate !== '' && endDate) ==='' || (startDate === '' && endDate !== '')) {
            throw(new BadRequestError('Missing data'));
        }
      
        let {
            take = 500,
            skip = 0,
        } = req.query as any;
    
        if (typeof take !== 'number') take = Number(take);
        if (typeof skip !== 'number') skip = Number(skip);

        const brandId = await prisma.brand.findMany({
            where: {
                // sub,
            },
            select: {
              id: true,
            },
        });
      
        if (!brandId) throw new BadRequestError('No affiliate exists!');

        const items = await prisma.item.findMany({
            where: {
                brand: {
                    id: {
                        in: brandId.map(({id}) => id)
                    }
                }
            },
            select: {
                id: true,
            },
        });
      
        const match : any = [];
      
        if (status !== 'ALL') {
            match.push({ "item.status": status })
        }
      
        match.push(
            {
                $expr: {
                    $in: [
                        "$item.id",
                        items.map(({id}) => id),
                    ],
                },
            }
        );
      
        if (startDate !== '' && endDate !== ''){
            match.push({
                createdAt: {
                    "$gte": convertDateToUnix(startDate),
                    "$lte": convertDateToUnix(endDate)
                }
            });
        }
      
        const [orders, ordersProfit, ordersCount]: any = await Promise.all([
            prisma.order.aggregateRaw({
                pipeline: [
                    {
                        $match:{
                            $and: match
                        },
                    },
                    {
                        $group: {
                            _id: "$item",
                            count: {
                                $count: {},
                            },
                            sum: {
                                $sum: "$payment.totalAmount",
                            },
                        },
                    },
                    {
                        $sort: {
                            "_id.name": 1, // sort by item.name
                        },
                    },
                    {
                        $skip: skip,
                    },
                    {
                        $limit: take,
                    },
                ],
            }),
            // for total.profitSum
            prisma.order.aggregateRaw({
                pipeline: [
                    {
                        $match: {
                            $and: match,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            profitSum: {
                                $sum: {
                                $multiply: 
                                    [
                                        { $divide: ["$payment.totalAmount", "$payment.price.amount"] }, 
                                        "$item.amount" 
                                    ]
                                }
                            },
                        },
                    },
                ],
            }),
            // for total.count
            prisma.order.aggregateRaw({
                pipeline: [
                    {
                        $match: {
                        $and: match,
                        },
                    },
                    {
                        $group: {
                        _id: "$item",
                        },
                    },
                ]
            })
        ]);
        
        res.send(
            {
                total: {
                    count: ordersCount.length,
                    profitSum: ordersProfit[0]?.profitSum || 0,
                }, 
                orders: orders,
            }
        );
    
        // const {
        //     sortBy,
        //     affiliate,
        // } = req.query as any;
    
        // let {
        //     take = 500,
        //     skip = 0,
        // } = req.query as any;
    
        // if (typeof take !== 'number') take = Number(take);
        // if (typeof skip !== 'number') skip = Number(skip);
    
        // let orderBy: Record<string, string> = {};

        // if (sortBy === 'sales, desc') {
        //     orderBy.sortOrder = 'desc';
        // } else if (sortBy === 'amount, desc') {
        //     orderBy.amount = 'desc';
        // } else if (sortBy === 'amount, asc') { 
        //     orderBy.amount = 'asc';
        // } else if (sortBy === 'createdAt, desc') {
        //     orderBy.createdAt = 'desc';
        // } else {
        //     orderBy.createdAt = 'asc';
        // }

        // const brand: any = (await prisma.brand.findMany({
        //     where: {
        //         affiliate,
        //     },
        //     select: {
        //         id: true,
        //         affiliate: true,
        //         name: true,
        //     },
        // }));

        // const items = await prisma.item.findMany({
        //     where: {
        //         brandId: brand.id,
        //     },
        //     select: {
        //         id: true,
        //         brand: true,
        //         couponImageUrl: true,
        //     },
        // });

        // const [orders, ordersAll] = await Promise.all([
        //     prisma.order.findMany({
        //         take,
        //         skip,
        //         orderBy,
        //         where: {
        //             itemId: {
        //                 in: items.map(({ id }) => id)
        //             },
        //         },
        //         select: {
        //             id: true,
        //             status: true,
        //             item: true,
        //             createdAt: true,
        //             payment: true,
        //         },
        //     }),
        //     prisma.order.findMany({
        //         where: {
        //             itemId: {
        //                 in: items.map(({ id }) => id)
        //             },
        //         },
        //         select: {
        //             item: true,
        //             payment: true,
        //         },
        //     }),
        // ]);

        // const profitSum = ordersAll.reduce((tot: number, order: any) => {
        //     return tot + (order?.item?.amount * Math.round(order?.payment?.totalAmount / order?.payment?.price.amount));
        // }, 0);
        
        // const count = ordersAll.reduce((tot: number, order: any) => {
        //     return tot + (Math.round(order?.payment?.totalAmount / order?.payment?.price.amount));
        // }, 0);
        
        // res.send(
        //     {
        //         total: 
        //             {
        //                 count,
        //                 profitSum,
        //             }, 
        //         orders: orders,
        //     }
        // );
    }),
);
