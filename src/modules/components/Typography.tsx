import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledTypography = styled.p<Props>`
  color: ${({ color = 'black' }) => color};
  line-height: ${({ lineHeight = 1.5 }) => lineHeight};
  font-weight: ${({ fontWeight = 400 }) => fontWeight};
  font-size: ${({ fontSize = '14px' }) =>
    typeof fontSize === 'string' ? fontSize : `${fontSize}px`};
`;

export default function Typography({ children, ...rest }: Props) {
  return <StyledTypography {...rest}>{children}</StyledTypography>;
}

type Props = {
  children: ReactNode;

  color?: string;

  fontWeight?: number;

  fontSize?: number | string;

  lineHeight?: number;
};
