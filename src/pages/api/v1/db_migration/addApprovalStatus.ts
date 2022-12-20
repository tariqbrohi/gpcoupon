import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';

export default errorHandler(async function handler(req, res) {
  if (req.method !== 'post') {
    throw new NotFoundError();
  }

  const {} = req.body;

  const items = await prisma.item.findMany({
    where: {
      approvalStatus: null,
      affiliate: true,
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      metadata: true,
    }
  });

  const approveData = items.map((item: any) => {
    return (
      prisma.approvalStatus.create({
        data: {
          status: 'approved',
          item: {
            connect: {
              id: item.id,
            },
          },
          approver: item.metadata.createdBy,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }
      })
    )
  }); // createMany doesn't work for connect(item)

  const addApprovalStatus = await Promise.all(approveData);

  res.send(addApprovalStatus);
});