import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { omit } from "lodash";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method?.toLowerCase();
  if (method !== "get" && method !== "put" && method !== "delete") {
    return res.status(404).send({
      errors: [
        {
          message: "NotFound",
        },
      ],
    });
  }

  try {
    const { brand } = req.query as any;

    if (method === "get") {
      console.log(brand, "here yo go ");
      const b = await prisma.brand.findFirst({
        where: {
          slug: brand,
        },
      });

      res.send(b);
    }

    if (method === "put") {
      await prisma.brand.update({
        where: {
          slug: brand,
        },
        data: omit(req.body, ["createdAt", "updatedAt", "id"]),
      });

      res.send({});
    }

    if (method === "delete") {
      const b = await prisma.brand.findUnique({
        where: {
          slug: brand,
        },
      });

      await prisma.$transaction([
        prisma.item.deleteMany({
          where: {
            brand,
          },
        }),
        prisma.brand.delete({
          where: {
            slug: brand,
          },
        }),
      ]);

      res.send({});
    }
  } catch (err: any) {
    console.log(err);
    res.send([]);
  }
}
