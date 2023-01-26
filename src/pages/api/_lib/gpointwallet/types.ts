export type ChargeInput = {
  userId: string;
  amount: number;
  name: string;
  currency: string;
  influencerId?: string | null;
  influencerDiscountRate: number;
  customerDiscountRate: number;
  profitRate: number;
  t: string;
};

export type GetInfoByAccIdInput = {
  accountIds: string[];
};
