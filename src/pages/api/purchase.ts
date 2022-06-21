import { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient } from "@prisma/client";
import isEmail from "validator/lib/isEmail";
import { sendOrderProcessingEmail } from "../../lib/send-email";
import currencyFormat from "../../lib/currency-format";
import getCurrencySymbol from "../../lib/get-currency-symbol";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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
    const { name, email, itemId, code, quantity, giver, giverEmail } = req.body;

    const item = await prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });

    if (!item) {
      return res.status(404).send({
        errors: [
          {
            message: "Item not found",
          },
        ],
      });
    }

    if (quantity < 1) {
      return res.status(404).send({
        errors: [
          {
            message: "Quantity must be greater than 1.",
          },
        ],
      });
    }

    if (code && !isEmail(email)) {
      return res.status(400).send({
        errors: [
          {
            message: "Invalid email",
          },
        ],
      });
    }

    const data: any = {
      item: item as unknown as Prisma.JsonObject,
      quantity,
    };

    if (code) {
      data.receiverName = name;
      data.receiverEmail = email;
      data.code = code;
    }

    if (giver && giverEmail) {
      data.senderName = giver;
      data.senderEmail = giverEmail;
    }

    const order = await prisma.order.create({
      data,
    });
    console.log(" sending ", {
      to: giverEmail,
      dynamicTemplateData: {
        orderId: order.id,
        name: giver,
        totalPrice: `${getCurrencySymbol("ko")} ${currencyFormat(`${item.amount * +quantity}`)}`,
        coupon: `${item.name} x ${quantity}`,
      },
    });
    sendOrderProcessingEmail({
      to: giverEmail,
      dynamicTemplateData: {
        orderId: order.id,
        name: giver,
        totalPrice: `${getCurrencySymbol("ko")} ${currencyFormat(`${item.amount * +quantity}`)}`,
        coupon: `${item.name} x ${quantity}`,
      },
    });

    res.status(201).send(order.id);
  } catch (err: any) {
    console.log(err);
    res.status(500).send({
      errors: [
        {
          message: "Opps, something went wrong",
        },
      ],
    });
  }
}
