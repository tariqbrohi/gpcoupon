import sgMail, { MailService } from '@sendgrid/mail';

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
  dynamicTemplateData: T;
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
    });
}
