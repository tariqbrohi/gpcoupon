import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { OrderStatus, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    const { skip = 0, take = 40 } = req.query;

    const orders = await prisma.order.findMany({
      where: {
        status: OrderStatus.processing,
      },
      skip: skip as number,
      take: take as number,
    });

    res.send(orders);
  } catch (err: any) {
    res.status(err).send({
      errors: [
        {
          message: err?.message || "Something went wrong.",
        },
      ],
    });
  }
});
