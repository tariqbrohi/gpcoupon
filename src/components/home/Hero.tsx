import React from 'react';
import styled from 'styled-components';
import { Heading, Paragraph, StyledHeading } from '@growth-ui/react';

const TextWrapper = styled.div`
  width: 320px;

  ${({ theme }) => theme.gui.media.mobile} {
    flex: 1;
  }
`;

const Container = styled.div`
  background: ${({ theme }) => theme.color.themeBg};
  padding: 48px 20px;
  overflow: hidden;

  & > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: ${({ theme }) => theme.size.maxWidth}px;
    margin: 0 auto;
  }

  ${StyledHeading} {
    color: #000;
    font-size: 22px;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    ${StyledHeading} {
      font-size: 18px;
    }

    img {
      display: none;
    }
  }
`;

export default function Hero() {
  return (
    <Container>
      <div>
        <TextWrapper>
          <Heading>
            Celebrate special moments and earn real cash back on every purchase,
            anywhere around the world.
          </Heading>
          <Paragraph color="gray-700">
            Browse a huge selection of popular brands or shop local with GPoint
            Affiliate brands. Buy a GCoupon and earn cash back rewards every
            time you shop.
          </Paragraph>
        </TextWrapper>
        <img
          width="450px"
          src="https://s3-alpha-sig.figma.com/img/d859/11ac/3fe795289d44c7e23dfc3873ef4f5a08?Expires=1656892800&Signature=WIbo4fsN3Fv3bcBjZ9uYP398-eWbL7OTVYNwrVwpHEIcrR0fJ6hL-DiOQ8kzRxIKMH8w2V0D1OsG3BwkBoEJMxbo3TP9IdS7RN3Ugc~6XIgtJ8XlHdqxC~Q2HYQpriysL9t0XpXQYiDVlxSItg7n~DqhglyXpa8FKYO2S2yt3vTAmzUiAbSUVWZWrqogdnxHFVlwj7sWIZZwlK2IqCOo2E0W8KtLOSKVZNlvh5u5Mie~jHaltoyaUp7FVasA3WKo6wt9k58RWiy9uQDC9tB6GRQyotq~fUFFo1Ht-90S9rCC~k-Bo9WVYNj09SsurH8Gb0z0~rSUTPllgT6HrDwaKQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          style={{
            transform: 'translateX(50px) rotate(15deg)',
          }}
        />
      </div>
    </Container>
  );
}
