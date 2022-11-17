/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
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
    const { total, orders } = props;

    const calculateAmount = (totalAmount: number, oneAmount: number, originalPrice: number, amount: number) => {
        const qty = Math.round(totalAmount / oneAmount);
        return (
            <>
              <Table.Cell>{qty}</Table.Cell>
              <Table.Cell>${originalPrice}</Table.Cell>
              <Table.Cell>${oneAmount}</Table.Cell>
              <Table.Cell>${amount}</Table.Cell>
              <Table.Cell>${amount * qty}</Table.Cell>
            </>
        );
    }

    return (
        <>
          <Table celled>
              <Table.Head>
                <Table.Row>
                  <Table.HeadCell>Coupon Image</Table.HeadCell>
                  <Table.HeadCell>Coupon Name</Table.HeadCell>
                  <Table.HeadCell>Qty</Table.HeadCell>
                  <Table.HeadCell>Original Price</Table.HeadCell>
                  <Table.HeadCell>Retail Price</Table.HeadCell>
                  <Table.HeadCell>My Profit</Table.HeadCell>
                  <Table.HeadCell>My Total Profit</Table.HeadCell>
                </Table.Row>
              </Table.Head>
              
              {total ? (
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell positive>Total</Table.Cell>
                      <Table.Cell positive>-</Table.Cell>
                      <Table.Cell positive>-</Table.Cell>
                      <Table.Cell positive>-</Table.Cell>
                      <Table.Cell positive>-</Table.Cell>
                      <Table.Cell positive>-</Table.Cell>
                      <Table.Cell positive>${total?.profitSum || 0}</Table.Cell>
                    </Table.Row>
                    
                    {orders?.map((order: any, idx: number) => {
                        return (
                            <Table.Row key={idx}>
                              <Table.Cell>
                                  <Image size='small' src={order?._id.couponImageUrl} />
                              </Table.Cell>
                              <TableCellLink onClick={() => window.open(`${ROUTES.buy}/${order?._id.slug}/${order?._id.id}`)}>
                                  {order?._id.name}                       
                              </TableCellLink>
                              {calculateAmount(order?.sum, order?._id?.price.amount, order?._id?.originalPrice, order?._id?.amount)}
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
                
        </>
    );
}