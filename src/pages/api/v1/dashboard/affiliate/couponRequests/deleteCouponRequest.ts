import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import gpointwallet from '@/pages/api/_lib/gpointwallet';

export default errorHandler(async function handler(req, res) {
  if (req.method !== 'put') {
    throw new NotFoundError();
  }

  const session = gpointwallet.getSession(req);
    if(!session) throw(new BadRequestError('No User'));

  const {
    id,
  } = req.body;

  const timestamp = new Date().valueOf();

  const approvalStatus = await prisma.approvalStatus.findUnique({
    where: {
      id
    }
  });

  if (approvalStatus?.deletedAt !== null) {
    return;
  }

  const updateApprovalStatus = await prisma.approvalStatus.update({
    where: {
      id,
    },
    data: {
      updatedAt: timestamp,
      deletedAt: timestamp,
      item: {
        update: {
          status: 'UNAVAILABLE',
          updatedAt: timestamp,
        },
      }
    }
  });

  res.send(updateApprovalStatus);
});