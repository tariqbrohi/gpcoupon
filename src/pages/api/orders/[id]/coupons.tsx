import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { pick } from "lodash";

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
    const { id } = req.query as any;
    console.log(id);
    const coupons = await prisma.coupon.findMany({
      where: {
        orderId: id,
      },
      select: {
        id: true,
        item: true,
        used: true,
        expiresAt: true,
      },
    });

    res.send(coupons);
  } catch (err: any) {
    console.log(err);

    res.status(400).send({
      errors: [
        {
          message: "Something went wrong. Please try again.",
        },
      ],
    });
  }
}
