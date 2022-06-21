import sg from "@sendgrid/mail";
import { SEND_COUPON, ORDER_PROCESSING, ORDER_DENIED } from "../email-templates";

const apiKey = process.env.SEND_GRID_API_KEY;
const from = process.env.SEND_GRID_FROM;

if (!apiKey || !from) {
  throw new Error("send-email:environ variables must be provided.");
}

sg.setApiKey(apiKey);

export type Options = {
  to: string;
  templateId: string;
  dynamicTemplateData?: Record<string, unknown>;
};

const sendEmail = async (options: Options) => {
  return sg.send({
    from,
    ...options,
  });
};

type SendCouponData = {
  to: string;
  dynamicTemplateData: {
    giver: string;
    link: string;
    message?: string;
  };
};

export const sendCoupon = async (options: SendCouponData) => {
  sendEmail({
    templateId: SEND_COUPON,
    ...options,
  });
};

type OrderProcessingData = {
  to: string;
  dynamicTemplateData: {
    orderId: string;
    coupon: string;
    totalPrice?: string;
    name?: string;
  };
};

export const sendOrderProcessingEmail = async (options: OrderProcessingData) => {
  sendEmail({
    templateId: ORDER_PROCESSING,
    ...options,
  });
};

type OrderDenied = {
  to: string;
  dynamicTemplateData: {
    orderId: string;
    reason: string;
    name?: string;
  };
};

export const sendOrderDenied = async (options: OrderDenied) => {
  sendEmail({
    templateId: ORDER_DENIED,
    ...options,
  });
};
