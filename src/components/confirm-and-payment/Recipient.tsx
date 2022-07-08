import Container from './Container';
import OptionButton from '@/modules/components/OptionButton';
import React from 'react';
import Typography from '@/modules/components/Typography';
import { Grid, Icon, Input, Spacer, TextArea } from '@growth-ui/react';

export default function Recipient() {
  return (
    <Container>
      <OptionButton active>
        <Grid.Row>
          <Icon color="black" name="email outline" />
          <Spacer size={5} />
          <Typography fontWeight={700}>Email</Typography>
        </Grid.Row>
      </OptionButton>
      <Spacer size={20} />
      <Typography fontSize={17} fontWeight={600}>
        Who is this gift for?
      </Typography>
      <Spacer size={20} />
      <Input basic fluid label="Name" />
      <Spacer size={20} />
      <Input basic fluid label="Email" />
      <Spacer size={30} />
      <Typography fontSize={17} fontWeight={600}>
        Give it a personal touch
      </Typography>
      <Spacer size={10} />
      <Typography>
        Add a personal message with your gift but don't include emojis or your
        message might not be delivered!
      </Typography>
      <Spacer size={10} />
      <TextArea
        fluid
        rows={8}
        placeholder="I got you something! I hope you like it!"
      />
    </Container>
  );
}
