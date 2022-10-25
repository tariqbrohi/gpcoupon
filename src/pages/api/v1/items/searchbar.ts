import errorHandler from "../../_middlewares/error-handler";
import prisma from "@/prisma";
// import xoxoday from "../../_lib/xoxoday";
import { NotFoundError } from "@/lib/errors";

export default errorHandler(async function handler(req, res) {
    const method = req.method;

    if (method !== 'get') {
        throw new NotFoundError();
    }

    const { 
        searchQuery, 
        country, 
        // extendedName 
    } = req.query as any;

    // console.log('api', searchQuery, country, extendedName);

    const where: Record<string, any> = { 
        searchQuery, 
        country, 
        // extendedName 
    };

    const item = await prisma.item.findMany({
        where: {
            name: {
                mode: 'insensitive',
                contains: searchQuery,
                // contains: searchQuery || extendedName,
            },
            // extendedName: {
            //     mode: 'insensitive',
            //     contains: searchQuery,
            // },
            country,
        },
    });

    // console.log('api', item);

    res.send(item);
})


    // https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#filtering
    // Search by item name.
    // contains key field is way to go.
    // set mode to insensitive (https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting#case-insensitive-filtering)
    // return resulst
    // e.g) res.send({ items, total });