/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button, Grid, Spacer } from '@growth-ui/react';
import styled from 'styled-components';
import Link from 'next/link';
import { ROUTES } from '@/ROUTES';

const CouponCategoryDiv = styled.div`
    display: flex;
`;

const ButtonEffect = styled(Button)`
    // color: #fff;
    // border-radius: 30px;
    box-shadow: rgb(203 203 203) 4px 4px 8px;
    transition: all 0.4s ease-in-out;

    &:hover {
      background-color: #f6a2b1;
      color: #fff;
    }

    ${({ theme }) => theme.gui.media.mobile} {
        padding: 10px 8px;
    }
`;

export default function SearchByCategory() {
    return (
        <Grid.Row verticalAlign="middle">
            <CouponCategoryDiv>
                <ButtonEffect>
                    <Link href={ROUTES.brands}>
                        <a>Find Brands</a>
                    </Link>
                </ButtonEffect>
                <Spacer size={50} />
                <ButtonEffect>
                    <Link href={ROUTES.affiliates}>
                        <a>Find Affiliates</a>
                    </Link>
                </ButtonEffect>
            </CouponCategoryDiv>
        </Grid.Row>
    );
}
