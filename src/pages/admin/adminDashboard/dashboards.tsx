import React from 'react';
import Provider from '@/components/admin/items/Provider';
import { Table, Spacer } from "@growth-ui/react";
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

export default function AdminDashboards(props: any) {
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
                            <Table.HeadCell>Merchant Name</Table.HeadCell>
                            <Table.HeadCell>Coupon Name</Table.HeadCell>
                            <Table.HeadCell>Extended Name</Table.HeadCell>
                            <Table.HeadCell>Creation Date</Table.HeadCell>
                            <Table.HeadCell>Expire Date</Table.HeadCell>
                            <Table.HeadCell>Qty</Table.HeadCell>
                            <Table.HeadCell>Original Price</Table.HeadCell>
                            <Table.HeadCell>Retail Price</Table.HeadCell>
                            <Table.HeadCell>Merchant Profit</Table.HeadCell>
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
                                <Table.Cell positive>{orders?.total.count || 0}</Table.Cell>
                                <Table.Cell positive>-</Table.Cell>
                                <Table.Cell positive>-</Table.Cell>
                                <Table.Cell positive>${orders?.total.profitSum || 0}</Table.Cell>
                            </Table.Row>
                            
                            {orders?.orders?.map((order: any, idx: number) => {
                                return (
                                    <Table.Row key={idx}>
                                        <Table.Cell>
                                            {order?.item?.brand?.name}
                                        </Table.Cell>
                                        <TableCellLink onClick={() => window.open(`${ROUTES.buy}/${order?.item.slug}/${order?.item.id}`)}>
                                            {order?.item.name}                       
                                        </TableCellLink>
                                        <Table.Cell>
                                            {order?.item.extendedName}                     
                                        </Table.Cell>
                                        <Table.Cell>
                                            {new Date(Number(order?.createdAt) * 1000).toLocaleDateString()}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {addDays(order?.createdAt * 1000, order?.item?.expiresIn)}
                                        </Table.Cell>
                                        {calculateAmount(order?.payment?.totalAmount, order?.payment?.price.amount, order?.item?.originalPrice, order?.item?.amount)}
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