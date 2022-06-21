import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method?.toLowerCase();

  if (method !== "get") {
    return res.status(404).send({
      errors: [
        {
          message: "NotFound",
        },
      ],
    });
  }

  try {
    // If q is passed, it means searching
    const { q, lang } = req.query as any;

    if (q) {
      const items = await prisma.item.aggregateRaw({
        pipeline: [
          {
            $search: {
              index: "item",
              compound: {
                should: [
                  {
                    text: {
                      query: q,
                      path: ["name", "brand", "category", "description"],
                    },
                  },
                ],
                must: [
                  {
                    text: {
                      query: lang,
                      path: "country",
                    },
                  },
                ],
              },
            },
          },
          {
            $addFields: {
              id: {
                $toString: "$_id",
              },
            },
          },
          {
            $unset: ["_id", "createdBy", "createdAt", "updatedAt"],
          },
        ],
      });

      return res.send(items);
    }

    const items = await prisma.item.findMany({
      take: 100,
      skip: 0,
    });

    res.send(items || []);
  } catch (err: any) {
    res.send([]);
  }
}
