import React, { useState, useEffect } from "react";
import { Table } from "@growth-ui/react";

const TAKE = 20;

export default function CouponList(props: any) {
  const {items} = props;
  const [count, setCount ] = useState(0);
  const [discount_sum, setDiscountSum] = useState(0);

  useEffect(() => {
    if(items !== null) {
      setCount(items.total.count);
      setDiscountSum(items.total.discount_sum);
    }
  }, [items])

  const addDays = (date:any, days:any) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d.toLocaleDateString();
  }

  return (
    <>
      <Table celled>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Creation Date</Table.HeadCell>
            <Table.HeadCell>Expire Date</Table.HeadCell>
            <Table.HeadCell>Qty</Table.HeadCell>
            <Table.HeadCell>Original Price</Table.HeadCell>
            <Table.HeadCell>Discounted Price</Table.HeadCell>
            <Table.HeadCell>My Profit</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell positive>Total</Table.Cell>
            <Table.Cell positive>-</Table.Cell>
            <Table.Cell positive>-</Table.Cell>
            <Table.Cell positive>{count}</Table.Cell>
            {/* <Table.Cell positive>{items?.total.count || 0}</Table.Cell> */}
            <Table.Cell positive>-</Table.Cell>
            <Table.Cell positive>-</Table.Cell>
            {/* <Table.Cell positive>${items?.total.discount_sum * 0.8 || 0}</Table.Cell> */}
            <Table.Cell positive>${discount_sum * 0.8}</Table.Cell>
          </Table.Row>
          {
            items?.items?.map((item: any, idx: number) =>{
              return (
                <Table.Row
                  key={idx}
                >
                  <Table.Cell>{item?.name}</Table.Cell>
                  <Table.Cell>{new Date(Number(item?.createdAt)).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>{addDays(item?.createdAt, item?.expiresIn)}</Table.Cell>
                  <Table.Cell>1</Table.Cell>
                  <Table.Cell>${item?.originalPrice}</Table.Cell>
                  <Table.Cell>${item?.price?.amount}</Table.Cell>
                  <Table.Cell>${item?.price?.amount * 0.8}</Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </>
  )
}