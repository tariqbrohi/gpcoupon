import React, { ReactNode } from 'react';
import styled from 'styled-components';

export const StyledGrid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${({ repeat = 4 }) => repeat}, 1fr);
  grid-gap: 20px;

  ${({ theme }) => theme.gui.media.mobile} {
    grid-template-columns: repeat(${({ mobile = 2 }) => mobile}, 1fr);
  }
`;

export default function Grid({ children, ...rest }: GridProps) {
  return <StyledGrid {...rest}>{children}</StyledGrid>;
}

interface GridProps extends StrictGridProps {
  [k: string]: any;
}

interface StrictGridProps {
  children: ReactNode;

  repeat?: number;

  mobile?: number;
}
