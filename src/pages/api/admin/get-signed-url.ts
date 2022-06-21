import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { v2 } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next/types';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4mb', // Set desired value here
    },
  },
};

const {
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const method = req.method?.toLowerCase();

  if (method !== 'get') {
    return res.status(404).send({
      errors: [
        {
          message: 'NotFoundError',
        },
      ],
    });
  }

  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = v2.utils.api_sign_request(
      {
        timestamp,
        upload_preset: CLOUDINARY_UPLOAD_PRESET,
      },
      CLOUDINARY_API_SECRET!,
    );

    const signedUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload?api_key=${CLOUDINARY_API_KEY}&timestamp=${timestamp}&signature=${signature}`;

    res.send({
      timestamp,
      signature,
      signedUrl,
    });
  } catch (err: any) {
    console.log(err);
    res.status(err?.status || 500).send({
      errors: [
        {
          message:
            err?.message ||
            'Oops, something went wrong! Our engineers have been alerted and will fix this asap.',
        },
      ],
    });
  }
});
