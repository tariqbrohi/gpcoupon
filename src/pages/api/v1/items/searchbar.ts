// Searchbar api

import errorHandler from "../../_middlewares/error-handler";
import prisma from "@/prisma";
import xoxoday from "../../_lib/xoxoday";
import { NotFoundError } from "@/lib/errors";

export default errorHandler(async function handler(req, res) {
    const method = req.method;

    if (method !== 'get') {
        throw new NotFoundError();
    }

    const { searchQuery } = req.query as any;
    // console.log('Your searchQuery', searchQuery);

    // if (searchQuery) {
    //     const items = await xoxoday.vouchers.findMany({
    //         name: searchQuery,
    //         searchQuery,
    //     });

    //     return res.send(items);
    // }

    const where: Record<string, any> = { searchQuery };

    const item = await prisma.item.findMany({
        where: {
            name: {
                mode: 'insensitive',
            },
        },
        select: {
            name: true,
            slug: true,
            id: true,
        },
    });

    res.send({item});


    // https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filtering
    // Search by item name.
    // contains key field is way to go.
    // set mode to insensitive (https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#case-insensitive-filtering)
    // return resulst
    // e.g) res.send({ items, total });