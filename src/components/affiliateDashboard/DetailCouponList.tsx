import React, { useState, useEffect } from "react";
import { Table } from "@growth-ui/react";
import { ROUTES } from '@/ROUTES';
import Link from 'next/link';
import styled from "styled-components";

export default function CouponList(props: any) {
  const { gifts } = props;

  const getExpireDate = (date:any, days:any) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    
    return d.toLocaleDateString();
  }

  // const calculateAmount = (totalAmount: number, oneAmount: number, originalPrice: number, amount: number) => {
  //   const qty = Math.round(totalAmount / oneAmount);
  //   return (
  //     <>
  //       <Table.Cell>{qty}</Table.Cell> 
  //       <Table.Cell>${originalPrice * qty}</Table.Cell>
  //       <Table.Cell>${oneAmount * qty}</Table.Cell>
  //       <Table.Cell>${amount * qty}</Table.Cell>
  //     </>
  //   );
  // }
  

  return (
    <>
      <Table celled>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Coupon Name</Table.HeadCell>
            <Table.HeadCell>Creation Date</Table.HeadCell>
            <Table.HeadCell>Expire Date</Table.HeadCell>
            <Table.HeadCell>Qty</Table.HeadCell>
            <Table.HeadCell>Original Price</Table.HeadCell>
            <Table.HeadCell>Retail Price</Table.HeadCell>
            <Table.HeadCell>My Profit</Table.HeadCell>
            <Table.HeadCell>Use Status</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        {
          gifts? 
          (
            <Table.Body>
              <Table.Row>
                {console.log('detail coupon list', gifts)}
                <Table.Cell positive>Total</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
                <Table.Cell positive>{gifts.length}</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
                <Table.Cell positive>$</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
              </Table.Row>
              {
                gifts?.map((gift: any, idx: number) =>{
                  return (
                    <Table.Row
                      key={idx}
                    >
                      <Table.Cell>{gift.order.item.name}</Table.Cell>
                      <Table.Cell>
                        {new Date(Number(gift?.createdAt) * 1000).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        {getExpireDate(gift?.createdAt * 1000, gift?.order?.item?.expiresIn)}
                      </Table.Cell>
                      <Table.Cell>1</Table.Cell>
                      <Table.Cell>{gift?.order?.item?.originalPrice}</Table.Cell>
                      <Table.Cell>{gift?.order?.item?.price.amount}</Table.Cell>
                      <Table.Cell>{gift?.order?.item?.amount}</Table.Cell>
                      <Table.Cell>{gift.status}</Table.Cell>
                    </Table.Row>
                  )
                })
              }
            </Table.Body>
          )
          :(<></>)
        }
      </Table>
    </>
  )
}