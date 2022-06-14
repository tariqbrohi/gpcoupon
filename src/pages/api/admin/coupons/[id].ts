import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method?.toLowerCase();

  if (method !== "delete") {
    return res.status(404).send({
      errors: [
        {
          message: "NotFound",
        },
      ],
    });
  }

  try {
    if (method === "delete") {
      const { id } = req.query;

      const deletedItem = await prisma.item.delete({
        where: {
          id: id as string,
        },
      });

      res.send(deletedItem);
    }
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
