import React from 'react';
import { Grid, Image, Padding, Paragraph, Spacer } from '@growth-ui/react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

export default function TopBrandMobileItem({
  logoUrl,
  name,
  backgroundUrl,
}: Props) {
  return (
    <Container>
      <Image
        alt={name}
        src={backgroundUrl}
        size="small"
        style={{ borderBottom: '1px solid #ccc' }}
      />
      <Padding vertical={2} horizontal={1}>
        <Paragraph fontWeight={600}>{name}</Paragraph>
      </Padding>
    </Container>
  );
}

type Props = {
  logoUrl: string;
  name: string;
  backgroundUrl: string;
};
