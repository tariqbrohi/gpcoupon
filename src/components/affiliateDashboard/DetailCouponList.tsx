import React from "react";
import { Table } from "@growth-ui/react";

export default function CouponList(props: any) {
  const { result, status } = props;

  const getExpireDate = (date:any, days:any) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    
    return d.toLocaleDateString();
  }

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
          result? 
          (
            <Table.Body>
              <Table.Row>
                <Table.Cell positive>Total</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
                <Table.Cell positive>{result.totalCount}</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
                <Table.Cell positive>-</Table.Cell>
                <Table.Cell positive>${result.totalProfit}</Table.Cell>
                <Table.Cell positive>{status === "available"? "UNUSED": status.toUpperCase()}</Table.Cell>
              </Table.Row>
              {
                result.gifts?.map((gift: any, idx: number) =>{
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
                      <Table.Cell>${gift?.order?.item?.originalPrice}</Table.Cell>
                      <Table.Cell>${gift?.order?.item?.price.amount}</Table.Cell>
                      <Table.Cell>${gift?.status === "used"? gift?.order?.item?.amount : 0}</Table.Cell>
                      <Table.Cell>{gift?.status === "available"? "UNUSED": gift.status.toUpperCase()}</Table.Cell>
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