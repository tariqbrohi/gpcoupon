import React from 'react';
import { Grid, Image, Paragraph, Spacer } from '@growth-ui/react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1em;
  transition: background 100ms ease-in-out;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: rgba(0, 0, 0, 0.07);
  }
`;

export default function TopBrandItem({ logoUrl, name, backgroundUrl }: Props) {
  return (
    <Container>
      <Grid.Row verticalAlign="middle">
        <Image
          alt={name}
          src={logoUrl}
          rounded
          style={{ width: '50px', height: '50px' }}
        />
        <Spacer size={10} />
        <Paragraph fontWeight={600} style={{ flex: 1 }}>
          {name}
        </Paragraph>
      </Grid.Row>
      <Spacer size={10} />
      <Image
        alt={name}
        src={backgroundUrl}
        style={{
          borderRadius: '8px',
        }}
      />
    </Container>
  );
}

type Props = {
  logoUrl: string;
  name: string;
  backgroundUrl: string;
};
