enum UserCurrencyEnum {
  USD = `USD`,
  GBP = `GBP`,
  EUR = `EUR`,
}
export type User = {
  admin: boolean;
  email: string;
  firstname: string;
  id: number;
  lastOnline: string;
  lastname: string;
  phone: string;
  programs: any;
  referenceText: string;
  currency: UserCurrencyEnum;
};
