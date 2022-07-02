import React from 'react';
import { Divider, Heading, Image, Paragraph, Spacer } from '@growth-ui/react';

type Props = {
  imageUrl: string;
  email: string;
};

export default function Completed({ email, imageUrl }: Props) {
  return (
    <>
      <Image src="/images/check.png" size="tiny" style={{ margin: '0 auto' }} />
      <Spacer size={10} />
      <Heading color="black" as="h3" textAlign="center">
        Payment completed!
      </Heading>
      <Divider />
      <Spacer size={20} />
      <Paragraph fontSize="sm" color="black" textAlign="center">
        The gift has been sent to {email} 🎁
      </Paragraph>
      <Spacer size={20} />
      <Image rounded src={imageUrl} size="small" style={{ margin: '0 auto' }} />
    </>
  );
}
