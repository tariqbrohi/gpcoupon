import QRCode from 'qrcode';
import sgMail, { MailService } from '@sendgrid/mail';
import { OrderCreatedData, ORDER_CREATED } from './templates';

const { SEND_GRID_API_KEY, SEND_GRID_FROM, SEND_GRID_NO_REPLY } = process.env;

let sendgrid: MailService = sgMail;

if (SEND_GRID_API_KEY) {
  sendgrid.setApiKey(SEND_GRID_API_KEY);
} else {
  console.log(
    '\n SES_ACCESS_KEY and SES_SECRET are not provided, debug mode enabled. Will log emails instead of actually sending them.\n',
  );

  sendgrid = {
    send: (data: any) => {
      console.log('debug mode enabled, mocking email sending');
    },
  } as MailService;
}

type Params<T> = {
  from?: string;
  to: string;
  templateId: string;
  dynamicTemplateData: T & { [key: string]: any };
  attachments?: any[];
};

export default async function sendEmail<T>({
  from = SEND_GRID_FROM || SEND_GRID_NO_REPLY || 'no-reply@gpointwallet.com',
  to,
  templateId,
  dynamicTemplateData,
  attachments,
}: Params<T>) {
  console.log(
    `--Send email with template ${templateId}--\nFrom: ${from}\nTo: ${to}\nTemplateData: ${JSON.stringify(
      dynamicTemplateData,
    )}`,
  );

  sendgrid
    .send({
      from,
      to,
      templateId,
      dynamicTemplateData,
      attachments,
    })
    .then((data) => {})
    .catch((err) => {
      console.log(err);
      console.log(err.response.body.errors);
    });
}

type SendOrder = {
  quantity: number;
  recipientEmail: string;
  itemImage: string;
  couponImageUrl: string;
  redemptionInstructions: string;
  termsAndConditionsInstructions: string;
  name: string;
  brandName: string;
  brandLogoUrl: string;
  expiresIn: number;
  message?: string;
  qrcodes: string[];
};

export const sendOrder = async ({
  quantity,
  recipientEmail,
  qrcodes,
  message,
  brandLogoUrl,
  itemImage,
  redemptionInstructions,
  termsAndConditionsInstructions,
  expiresIn,
  name,
  couponImageUrl,
  brandName,
}: SendOrder) => {
  return sendEmail<OrderCreatedData>({
    to: recipientEmail,
    templateId: ORDER_CREATED,
    dynamicTemplateData: {
      itemImage,
      couponImageUrl,
      name,
      brandLogoUrl,
      brandName,
      expiresIn,
      message,
      redemptionInstructions,
      termsAndConditionsInstructions,
      qrcodes: new Array(quantity)
        .fill(0)
        .map(
          (_, i) =>
            `<img class="image"  src="cid:${i}23456"  style="width: 150px; height: 150px;" />`,
        )
        .join(' '),
    },
    attachments: qrcodes.map((qr, i) => ({
      filename: 'qr.png',
      content: qr.replace('data:image/png;base64,', ''),
      contentType: 'image/png',
      content_id: `${i}23456`,
      cid: `${i}23456`,
      disposition: 'inline',
    })),
  });
};

export const gpointOrderProcessing = async ({
  recipientEmail,
  ...dynamicTemplateData
}: any) => {
  return sendEmail<any>({
    to: recipientEmail,
    templateId: 'd-b080e1776dff492fbcf097e80ff8962b',
    dynamicTemplateData,
  });
};

export const gpointOrderApproved = async ({
  recipientEmail,
  ...dynamicTemplateData
}: any) => {
  return sendEmail<any>({
    to: recipientEmail,
    templateId: 'd-590015908abb45a9b406bd2763842508',
    dynamicTemplateData,
  });
};

export const gpointOrderDenied = async ({
  recipientEmail,
  ...dynamicTemplateData
}: any) => {
  return sendEmail<any>({
    to: recipientEmail,
    templateId: 'd-4e78ec084ee64ac99a352794e5df3d21',
    dynamicTemplateData,
  });
};

type SendCouponRequest = {
  recipientEmail: string;
  businessName: string;
  phoneNumber: string;
  gwalletBusinessUsername: string;
  brandName: string;
  email: string;
  couponInfo: number;
};

export const sendCouponRequest = async ({
  recipientEmail,
  businessName,
  phoneNumber,
  gwalletBusinessUsername,
  brandName,
  email,
  couponInfo
}: SendCouponRequest) => {
  return sendEmail<any>({
    to: recipientEmail,
    templateId: 'd-96914e65c9de454e8a5f7d209a06a0f8',
    dynamicTemplateData :{
      recipientEmail,
      businessName,
      phoneNumber,
      gwalletBusinessUsername,
      brandName,
      email,
      couponInfo
    }
  })
};
