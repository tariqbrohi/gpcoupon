/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Provider from '@/components/admin/items/Provider';
import { Table, Spacer, Image } from "@growth-ui/react";
import { ROUTES } from '@/ROUTES';
import styled from "styled-components";

const TableCellLink = styled(Table.Cell)`
    cursor: pointer;
    color: #4183c4;
    transition: all 0.4s ease-in-out;

    &:hover {
        color: #2D126D;
        text-decoration: underline;
    }
`;

export default function MyCouponList(props: any) {
    const { orders } = props;

    const addDays = (date: any, days: any) => {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        
        return d.toLocaleDateString();
    }

    const calculateAmount = (totalAmount: number, oneAmount: number, originalPrice: number, amount: number) => {
        const qty = Math.round(totalAmount / oneAmount);
        return (
            <>
                <Table.Cell>
                    {qty}
                </Table.Cell>
                <Table.Cell>
                    ${originalPrice * qty}
                </Table.Cell>
                <Table.Cell>
                    ${oneAmount * qty}
                </Table.Cell>
                <Table.Cell>
                    ${amount * qty}
                </Table.Cell>
            </>
        );
    }

    return (
        <>
            <Provider>
                <Table celled>
                    <Table.Head>
                        <Table.Row>
                            <Table.HeadCell>Logo</Table.HeadCell>
                            <Table.HeadCell>Coupon Name</Table.HeadCell>
                            <Table.HeadCell>Qty</Table.HeadCell>
                            <Table.HeadCell>Original Price</Table.HeadCell>
                            <Table.HeadCell>Retail Price</Table.HeadCell>
                            <Table.HeadCell>My Profit</Table.HeadCell>
                            <Table.HeadCell>My Total Profit</Table.HeadCell>
                        </Table.Row>
                    </Table.Head>
                    
                    {orders ? (
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell positive>Total</Table.Cell>
                                <Table.Cell positive>-</Table.Cell>
                                <Table.Cell positive>-</Table.Cell>
                                <Table.Cell positive>-</Table.Cell>
                                <Table.Cell positive>-</Table.Cell>
                                <Table.Cell positive>-</Table.Cell>
                                <Table.Cell positive>${orders?.total.profitSum || 0}</Table.Cell>
                            </Table.Row>
                            
                            {orders?.orders?.map((order: any, idx: number) => {
                                return (
                                    <Table.Row key={idx}>
                                        <Table.Cell>
                                            <Image size='small' src={order?.item.couponImageUrl} />
                                        </Table.Cell>
                                        <TableCellLink onClick={() => window.open(`${ROUTES.buy}/${order?.item.slug}/${order?.item.id}`)}>
                                            {order?.item.name}                       
                                        </TableCellLink>
                                        {calculateAmount(order?.payment?.totalAmount, order?.payment?.price.amount, order?.item?.originalPrice, order?.item?.amount)}
                                        <Table.Cell>totalProfit</Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    ) : (
                            <></>
                        )
                    }
                </Table>
                <Spacer size={20} />
                
            </Provider>
        </>
    );
}