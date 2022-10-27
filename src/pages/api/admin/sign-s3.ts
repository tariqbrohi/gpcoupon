import aws from 'aws-sdk';
import errorHandler from '@/pages/api/_middlewares/error-handler';
import { NotFoundError } from '@/lib/errors';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';

const { S3_BUCKET, S3_ACCESS_KEY, S3_ACCESS_SECRET } = process.env;

const s3 = new aws.S3({
  signatureVersion: 'v4',
  region: 'us-east-1',
  credentials: {
    accessKeyId: S3_ACCESS_KEY!,
    secretAccessKey: S3_ACCESS_SECRET!,
  },
});

const Bucket = S3_BUCKET;

// export default withApiAuthRequired( // temporary
  export default errorHandler(async function handler(req, res) {
    if (req.method !== 'post') {
      throw new NotFoundError();
    }

    const { filename, filetype } = req.body;

    const newFilename = `${new Date().valueOf()}${(Math.random() + 1)
      .toString(36)
      .substring(7)}${filename.replace(/\s/g, '')}`;

    const params: Record<string, any> = {
      Bucket,
      Key: newFilename,
      Expires: 120,
      ContentType: filetype,
      ACL: 'public-read',
    };

    const signedUrl = s3.getSignedUrl('putObject', params);
    const url = `https://${Bucket}.s3.amazonaws.com/${newFilename}`;

    res.send({
      signedUrl,
      url,
    });
  });
// );
