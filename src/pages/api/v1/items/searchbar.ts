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

    const brands = await prisma.brand.findMany({
        where: {
            OR: 
            [
                {
                    name: {
                    mode: 'insensitive',
                    contains: searchQuery,
                    }
                },
                {
                    slug: {
                        mode: 'insensitive',
                        contains: searchQuery,
                    },
                },
            ],
            countries: {
                has: country,
            },
            status: 'AVAILABLE',
            affiliate: false,
        },
        select: {
            slug: true,
        },
    });
    // let itemsXoxo: any = [];
    let itemsXoxo: any;
    // console.log(brands.map(({slug}) => 
    //     slug
    // ));

    // for (let i = 0 ; i < brands.length; i++) {
    //     itemsXoxo.push(
    //         xoxoday.vouchers.findMany({
    //             country,
    //             brand: brands[i].slug,
    //         })
    //     );
    // }

    if (brands.length > 0) {
        itemsXoxo = await xoxoday.vouchers.findMany({
            country,
            brand: brands[0].slug,
        })
    };
    // console.log('bfitemsXoxo', itemsXoxo);

    // await Promise.all(itemsXoxo)
    // .then((result)=> {
    //     console.log('result', result);
    // });
    // console.log('after', itemsXoxo);

    const item = await prisma.item.findMany({
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

    // console.log('affiliate item', item);
    // console.log(item.concat(itemsXoxo));

    if (items.length === 0) {
        // console.log('1');
        res.send(itemsXoxo);
    } else if (items.length > 0 && itemsXoxo && itemsXoxo.length > 0){
        // console.log('2');
        res.send(item.concat(itemsXoxo));
    } else {
        // console.log('3');
        res.send(item);
    }
})


    









// https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filtering
    // Search by item name.
    // contains key field is way to go.
    // set mode to insensitive (https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#case-insensitive-filtering)
    // return resulst
    // e.g) res.send({ items, total });