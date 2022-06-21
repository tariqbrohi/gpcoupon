import { styled } from '@mui/material';
import React from 'react';
import Base from './Base';

const Element = styled(Base)`
  color: #0a9928;
  border: 0.5rem solid #0a9928;
  -webkit-mask-position: 13rem 6rem;
  transform: rotate(-14deg);
  border-radius: 0;
`;

export default function Used({ style }: any) {
  return <Element style={style}>Used</Element>;
}
