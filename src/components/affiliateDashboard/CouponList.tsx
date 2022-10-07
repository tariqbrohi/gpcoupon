import React, { useState, useContext } from "react";
import AppContext from '@/modules/components/AppContext';

import { Button, Grid, Input, Pagination, Table, Icon, Snackbar } from "@growth-ui/react";
import { useGetAffiliatesQuery } from "@/services";

const TAKE = 20;

export default function CouponList() {
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
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Discount</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Coupon Image</Table.HeadCell>
            <Table.HeadCell>Created Date</Table.HeadCell>
            <Table.HeadCell>Expire Date</Table.HeadCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {console.log(data)}     
        </Table.Body>

      </Table>
    </>
  )
}