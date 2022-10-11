import React, { useState, useContext } from "react";
import AppContext from '@/modules/components/AppContext';

import { Button, Grid, Input, Pagination, Table, Icon, Snackbar } from "@growth-ui/react";
import { useGetAffiliatesQuery } from "@/services";

const TAKE = 20;

export default function CouponList(props: any) {
  const {tmpData} = props;
  const { country } = useContext(AppContext);
  const { data, loading } = useGetAffiliatesQuery({
    data: {
      country,
    },
  });

  return (
    <>
      <Table celled>
        <Table.Head>
          <Table.Row>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
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
            <Table.Cell positive>-</Table.Cell>
            <Table.Cell positive>{tmpData.total.count}</Table.Cell>
            <Table.Cell positive>-</Table.Cell>
            <Table.Cell positive>-</Table.Cell>
            <Table.Cell positive>${tmpData.total.discount_sum * 0.8}</Table.Cell>
          </Table.Row>
          {
            tmpData.data.map((d: any, idx: number) =>{
              return (
                <Table.Row
                  key={idx}
                >
                  <Table.Cell>{d.name}</Table.Cell>
                  <Table.Cell>{d.Description}</Table.Cell>
                  <Table.Cell>{d.creationDate}</Table.Cell>
                  <Table.Cell>{d.ExpireDate}</Table.Cell>
                  <Table.Cell>1</Table.Cell>
                  <Table.Cell>${d.originalPrice}</Table.Cell>
                  <Table.Cell>${d.discountedPrice}</Table.Cell>
                  <Table.Cell>${d.discountedPrice * 0.8}</Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </>
  )
}