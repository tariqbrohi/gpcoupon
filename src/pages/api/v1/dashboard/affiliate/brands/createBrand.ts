import errorHandler from '@/pages/api/_middlewares/error-handler';
import prisma from '@/prisma';
import { BadRequestError, NotFoundError } from '@/lib/errors';
import gpointwallet from '@/pages/api/_lib/gpointwallet';

export default errorHandler(async function handler(req, res) {
  const method = req.method;

  if (method !== 'post') {
    throw new NotFoundError();
  }

  const {
    name,
    sub,
    description,
    thumbnailUrl,
    slug,
    disclaimer,
    backgroundUrl,
    status = 'AVAILABLE',
    terms,
    categories,
    countries,
    metadata,
  } = req.body as any;

  console.log('req.body: ', req.body);
  console.log('metadata: ', metadata);

  const session = gpointwallet.getSession(req);
  if (!session) throw new BadRequestError('No User');

  // const createdBy = {
  //   given_name: session?.user.profile.firstName,
  //   family_name: session?.user.profile.lastName,
  //   nickname: session?.user.username,
  //   name: `${session?.user.profile.firstName} ${session?.user.profile.lastName}`,
  //   picture: session?.user.profile.avatarUrl,
  //   locale,
  //   created_at: new Date().toISOString(),
  //   email: session?.user.profile.contact.email,
  //   email_verified: session?.user.confirmed === 0? false: true,
  //   sub: session?.user.id,
  //   sid: null,
  // }

  if (!sub) throw new BadRequestError('No BusinessAccount Exists');

  if (
    !name ||
    !description ||
    !slug ||
    !disclaimer ||
    !backgroundUrl ||
    !thumbnailUrl ||
    !terms ||
    !categories ||
    !countries
  ) {
    throw new BadRequestError('Missing Data!');
  }

  const existingBrand = await prisma.brand.findMany({
    where: {
      OR: [
        {
          name,
        },
        {
          slug,
        },
      ],
    },
  });

  if (existingBrand.length !== 0)
    throw new BadRequestError('Brand Name and Slug exists');

  const timestamp = new Date().valueOf();

  const brand = await prisma.brand.create({
    data: {
      sub,
      name,
      slug,
      description,
      disclaimer,
      thumbnailUrl,
      backgroundUrl,
      status,
      terms,
      categories: {
        connect: categories.map((id: string) => ({ id })),
      },
      countries,
      createdAt: timestamp,
      updatedAt: timestamp,
      affiliate: true,
      metadata: {
        ...metadata,
        createdBy: session.user,
      },
    },
  });

  res.send(brand);
});
