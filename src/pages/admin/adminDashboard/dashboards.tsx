/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Provider from '@/components/admin/items/Provider';
import { Table, Spacer, Image } from "@growth-ui/react";
import { ROUTES } from '@/ROUTES';
import styled from "styled-components";
import Router from 'next/router';

const TableHeadCell = styled(Table.HeadCell)`
  text-align: center;
`;

const TableCell = styled(Table.Cell)`
  text-align: center;
`;

const TableCellLink = styled(Table.Cell)`
    cursor: pointer;
    color: #4183c4;
    text-align: center;
    transition: all 0.4s ease-in-out;

    &:hover {
        color: #2D126D;
        text-decoration: underline;
    }
`;

export default function AdminDashboards(props: any) {
    const { total, orders } = props;

    const calculateAmount = (totalAmount: number, oneAmount: number, originalPrice: number, amount: number) => {
        const qty = Math.round(totalAmount / oneAmount);

        return (
            <>
                <TableCellLink 
                    // onClick={() => Router.push(`${ROUTES.admin.items}/${orders?._id.id}`)}
                >
                    {qty}
                </TableCellLink>
                <TableCell>${originalPrice}</TableCell>
                <TableCell>${oneAmount}</TableCell>
                <TableCell>${amount}</TableCell>
                <TableCell>${amount * qty}</TableCell>
            </>
        );
    }

    return (
        <>
            <Provider>
                <Table celled>
                    <Table.Head>
                        <Table.Row>
                            <TableHeadCell>Logo</TableHeadCell>
                            <TableHeadCell>Coupon Name</TableHeadCell>
                            <TableHeadCell>Merchant Name</TableHeadCell>
                            <TableHeadCell>Qty</TableHeadCell>
                            <TableHeadCell>Original Price</TableHeadCell>
                            <TableHeadCell>Retail Price</TableHeadCell>
                            <TableHeadCell>Merchant Profit</TableHeadCell>
                            <TableHeadCell>Merchant Total Profit</TableHeadCell>
                        </Table.Row>
                    </Table.Head>

                    {total ? (
                        <Table.Body>
                            <Table.Row>
                                <TableCell positive>Total</TableCell>
                                <TableCell positive>-</TableCell>
                                <TableCell positive>-</TableCell>
                                <TableCell positive>-</TableCell>
                                <TableCell positive>-</TableCell>
                                <TableCell positive>-</TableCell>
                                <TableCell positive>-</TableCell>
                                <TableCell positive>${total?.profitSum || 0}</TableCell>
                            </Table.Row>

                            {orders?.map((order: any, idx: number) => {
                                return (
                                    <Table.Row key={idx}>
                                        <TableCell>
                                            <Image size='small' src={order?._id.couponImageUrl} />
                                        </TableCell>
                                        <TableCellLink onClick={() => Router.push(`${ROUTES.admin.items}/${order?._id.id}`)}>
                                            {order?._id.name}                       
                                        </TableCellLink>
                                        <TableCell>
                                            Merchant Name
                                            {/* {order?.item?.brand?.name} */}
                                        </TableCell>
                                        {calculateAmount(order?.sum, order?._id?.price.amount, order?._id?.originalPrice, order?._id?.amount)}
                                        {/* {calculateAmount(order?.sum, order?._id?.price.amount, order?._id?.originalPrice, (order?._id?.price.amount - (order?._id?.price.amount * 0.2)))} */}
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    ) : (
                        <></>
                    )}
                </Table>
                <Spacer size={20} />
                
            </Provider>
        </>
    );
}