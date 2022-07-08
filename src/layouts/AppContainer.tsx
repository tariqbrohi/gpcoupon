import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.size.maxWidth}px;
  margin: 0 auto;
  padding: 0 32px;

  ${({ theme }) => theme.gui.media.mobile} {
    max-width: 100%;
    margin: 0;
    padding: 0 16px;
  }
`;

export default function AppContainer(props: ContainerProps) {
  const { children, ...rest } = props;

  return <Container {...rest}>{children}</Container>;
}

interface ContainerProps extends StrictContainerProps {
  [k: string]: any;
}

interface StrictContainerProps {
  children: ReactNode;
}
