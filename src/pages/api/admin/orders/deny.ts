import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { OrderStatus, PrismaClient } from "@prisma/client";
import { sendOrderDenied } from "../../../../lib/send-email";

const prisma = new PrismaClient();

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method?.toLowerCase();

  if (method !== "post") {
    return res.status(404).send({
      errors: [
        {
          message: "NotFound",
        },
      ],
    });
  }

  try {
    const { id, reason } = req.body;

    if (!reason) {
      return res.status(400).send({
        errors: [
          {
            message: "Please, provide reason.",
          },
        ],
      });
    }

    const order = (await prisma.order.findUnique({
      where: {
        id,
      },
    })) as any;

    if (!order) {
      return res.status(404).send({
        errors: [
          {
            message: "Order NotFound",
          },
        ],
      });
    }

    await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: OrderStatus.denied,
        reason,
      },
    });
    console.log(`sending - `, {
      to: order.senderEmail,
      dynamicTemplateData: {
        name: order.senderName,
        reason,
        orderId: order.id,
      },
    });

    sendOrderDenied({
      to: order.senderEmail,
      dynamicTemplateData: {
        name: order.senderName,
        reason,
        orderId: order.id,
      },
    });

    res.status(201).send({});
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
