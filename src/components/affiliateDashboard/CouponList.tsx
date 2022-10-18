import React, { useState, useEffect } from "react";
import { Table } from "@growth-ui/react";

export default function CouponList(props: any) {
  const {orders} = props;

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
            <Table.HeadCell>Retail Price</Table.HeadCell>
            <Table.HeadCell>My Profit</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        {
          orders? 
          (
            <Table.Body>
              <Table.Row>
                <Table.Cell positive>Total</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
                <Table.Cell positive>{orders?.total.count || 0}</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
                <Table.Cell positive>${orders?.total.profitSum || 0}</Table.Cell>
              </Table.Row>
              {
                orders?.orders?.map((order: any, idx: number) =>{
                  return (
                    <Table.Row
                      key={idx}
                    >
                      <Table.Cell>{order?.item.name}</Table.Cell>
                      <Table.Cell>{new Date(Number(order?.createdAt) * 1000).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>{addDays(order?.createdAt * 1000, order?.item?.expiresIn)}</Table.Cell>
                      <Table.Cell>1</Table.Cell>
                      <Table.Cell>${order?.item?.originalPrice}</Table.Cell>
                      <Table.Cell>${order?.item?.price?.amount}</Table.Cell>
                      <Table.Cell>${order?.item?.amount}</Table.Cell>
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