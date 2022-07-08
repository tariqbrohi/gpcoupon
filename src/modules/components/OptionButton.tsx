import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Button = styled.button<Props>`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 23px 24px 17px;
  border-radius: 12px;
  border-style: none;
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    active ? theme.color['themeBg-600'] : '#f4f4f4'};

  & > div:last-child {
    position: relative;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background: ${({ active, theme }) =>
      active ? theme.color['themeBg-700'] : '#d9d9d9'};
  }

  & > div:last-child::before {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 35%;
    height: 35%;
    border-radius: 50%;
    background: #fff;
    content: '';
  }
`;

export default function OptionButton(props: Props) {
  const { children, ...rest } = props;

  return (
    <Button {...rest}>
      <div>{children}</div>
      <div />
    </Button>
  );
}

type Props = {
  active?: boolean;

  children: ReactNode;
};
