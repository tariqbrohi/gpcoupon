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
    const { id, country } = req.query as any;

    // If only id is passed, it query one item
    const item = await prisma.item.findFirst({
      where: {
        id: id as string,
        country,
      },
    });

    res.send(item);
  } catch (err: any) {
    console.log(err);
    res.send([]);
  }
}
