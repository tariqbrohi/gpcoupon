/* eslint-disable @next/next/no-img-element */
import Router from 'next/router';
import styled from 'styled-components';
import { Paragraph } from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';

const Container = styled.div<Props>`
  display: ${({ hideOnDesktop }) => (hideOnDesktop ? 'none' : 'flex')};
  align-items: center;
  padding: 14px 18px;
  background: #f4f4f4;
  border-radius: 12px;
  width: 100%;
  max-width: 460px;
  cursor: pointer;

  ${({ theme }) => theme.gui.media.mobile} {
    display: flex;
    max-width: 100%;
    padding: 12px 18px;
  }
`;

export default function Search({ hideOnDesktop = false }: Props) {
  return (
    <Container
      hideOnDesktop={hideOnDesktop}
      onClick={() => Router.push(ROUTES.search)}
    >
      <img
        src="/svg/search.svg"
        alt='Search Icon'
        style={{
          width: '20px',
          marginRight: '5px',
        }}
      />
      <Paragraph fontSize="xs">Search for coupons</Paragraph>
    </Container>
  );
}

interface Props {
  hideOnDesktop?: boolean;
}
