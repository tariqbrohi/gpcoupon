import CreditCardInput from 'react-credit-card-input';
import isAlpha from 'validator/lib/isAlpha';
import Stripe from 'stripe';
import { isEqual } from 'lodash';
import { useRef, useState } from 'react';
import {
  Button,
  ButtonProps,
  Grid,
  Input,
  InputProps,
  Padding,
  Paragraph,
  Spacer,
  StyledGridRow,
} from '@growth-ui/react';

export default function PaymentMethodForm(props: Props) {
  const {
    buttonText,
    buttonProps,
    cardHolderInputProps,
    cardCVCInputProps,
    cardExpiryInputProps,
    cardNumberInputProps,
    onSuccess,
    onError,
  } = props;
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const cardError = useRef('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!validate() || submitting) return;
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!isAlpha(cardHolderInputProps.value, 'en-US', { ignore: ' ' })) {
      errors.name = 'Looks like name is not a valid format.';
    }
    setErrors(errors);

    if (isEqual(errors, {})) {
      return true;
    }

    return false;
  };

  const handleCardError = ({ error }: { error: string }) => {
    cardError.current = error;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        fluid
        label="Name on card"
        name="holdername"
        placeholder="Jane Doe"
        error={!!errors.name}
        feedback={errors.name}
        {...cardHolderInputProps}
      />

      <Spacer size={10} />

      <CreditCardInput
        onError={handleCardError}
        cardNumberInputProps={cardNumberInputProps}
        cardExpiryInputProps={cardExpiryInputProps}
        cardCVCInputProps={cardCVCInputProps}
        containerStyle={{
          borderRadius: '4px',
          width: '100%',
        }}
        fieldStyle={{
          border: '1px solid rgba(34,36,38,0.1)',
          padding: '15px 10px',
        }}
        fieldClassName="input"
      />

      <Spacer size={20} />

      {errors.zip && (
        <Paragraph fontSize="xs" color="red-700">
          {errors.zip}
        </Paragraph>
      )}

      <Spacer size={30} />

      <Button loading={submitting} {...buttonProps} type="submit">
        {buttonText}
      </Button>
    </form>
  );
}

interface Props {
  buttonText: string;
  buttonProps?: ButtonProps;
  cardCVCInputProps: {
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  cardExpiryInputProps: {
    value?: string;

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  cardNumberInputProps: {
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  cardHolderInputProps: InputProps;
  onSuccess?: (data: Stripe.PaymentMethod) => void;
  onError?: (error: any) => void;
}
