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
    const { country } = req.query as any;

    const brands = await prisma.brand.findMany({
      where: {
        country,
      },
    });

    return res.send(brands);
  } catch (err: any) {
    console.log(err);
    res.status(500).send({
      errors: [
        {
          message: "Opps Something went wrong",
        },
      ],
    });
  }
}
