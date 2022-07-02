import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  width: 100%;

  ${({ theme }) => theme.gui.media.mobile} {
    width: calc(100% + 32px);
    max-width: calc(100% + 32px);
    margin: -25px 0 0 -16px;
    padding: 25px;
    padding-bottom: 100px;
    border-top-right-radius: 32px;
    border-top-left-radius: 32px;
    background: #fff;
    height: 100%;
  }
`;

export default function HomeSection(props: SectionProps) {
  const { children, ...rest } = props;

  return <Section {...rest}>{children}</Section>;
}

interface SectionProps extends StrictSectionProps {
  [k: string]: any;
}

interface StrictSectionProps {
  children: ReactNode;
}
