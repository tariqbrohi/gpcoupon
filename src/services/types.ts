type Image = {
  small: string;
  medium: string;
};

export type Category = {
  name: string;
  slug: string;
  image: Image;
};

export type Item = {
  id: string;
  amount: number;
  name: string;
  description: string;
  image: Image;
  discount: number;
  termsAndConditionsInstructions: string;
  redemptionInstructions: string;
  expiry: string;
};
