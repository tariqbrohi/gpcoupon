import errorHandler from "../../_middlewares/error-handler";
import prisma from "@/prisma";
import xoxoday from "../../_lib/xoxoday";
import { NotFoundError, BadRequestError } from "@/lib/errors";
import items from "../../admin/items";

export default errorHandler(async function handler(req, res) {
    const method = req.method;

    if (method !== 'get') {
        throw new NotFoundError();
    }

    const { 
        searchQuery, 
        country, 
    } = req.query as any;

    if (searchQuery.length < 4) {
        throw new BadRequestError('Please use more than 4 letters for searchQuery');
    }

    const itemsXoxo = await xoxoday.vouchers.findMany({
        brand: searchQuery,
        country,
    });

    const items = await prisma.item.findMany({
        where: 
        {
            name: 
                {
                    mode: 'insensitive',
                    contains: searchQuery,
                },
            country,
        },
    });
    
    if (items.length > 0 && itemsXoxo && itemsXoxo.length > 0){
        res.send(items.concat(itemsXoxo));
    } else if (itemsXoxo && itemsXoxo.length > 0) {
        res.send(itemsXoxo);
    } else {
        res.send(items);
    }
})


    






// https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filtering
    // Search by item name.
    // contains key field is way to go.
    // set mode to insensitive (https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#case-insensitive-filtering)
    // return resulst
    // e.g) res.send({ items, total });