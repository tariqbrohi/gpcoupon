import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { ROUTES } from '@/ROUTES';

const Footer = styled.footer``;

export default function AppFooter() {
  return (
    <Footer>
      © GPoint Inc. or its affiliates 2022
      <Link href={ROUTES.legal}>
        <a>Terms of Use</a>
      </Link>
      and
      <Link href={ROUTES.privacy}>
        <a>Privacy Policy</a>
      </Link>
    </Footer>
  );
}
