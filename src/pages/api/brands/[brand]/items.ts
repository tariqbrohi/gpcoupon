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
    const { brand, country } = req.query as any;

    const items = await prisma.item.findMany({
      where: {
        brand: brand as string,
        country,
      },
    });

    res.send(items);
  } catch (err: any) {
    console.log(err);
    res.send([]);
  }
}
