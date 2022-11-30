import { Chip, Table } from "@growth-ui/react";
import styled from "styled-components";

const TableHeadCell = styled(Table.HeadCell)`
    text-align: center;
`;

const TableCell = styled(Table.Cell)`
    text-align: center;
`;

const ChipCustom = styled(Chip)`
    margin: 0 auto;
`;

export default function DashboardDetails(props: any) {
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
                        <TableHeadCell>Coupon Name</TableHeadCell>
                        <TableHeadCell>Merchant Name</TableHeadCell>
                        <TableHeadCell>Creation Date</TableHeadCell>
                        <TableHeadCell>Expire Date</TableHeadCell>
                        <TableHeadCell>Qty</TableHeadCell>
                        <TableHeadCell>Original Price</TableHeadCell>
                        <TableHeadCell>Retail Price</TableHeadCell>
                        <TableHeadCell>Merchant Profit</TableHeadCell>
                        <TableHeadCell>Use Status</TableHeadCell>
                        {/* <TableHeadCell>GPartner</TableHeadCell> */}
                    </Table.Row>
                </Table.Head>

                {result ? (
                    <Table.Body>
                        <Table.Row>
                            <TableCell positive>Total</TableCell>
                            <TableCell positive>-</TableCell>
                            <TableCell positive>-</TableCell>
                            <TableCell positive>-</TableCell>
                            <TableCell positive>{result.totalCount}</TableCell>
                            <TableCell positive>-</TableCell>
                            <TableCell positive>-</TableCell>
                            <TableCell positive>${result.totalProfit}</TableCell>
                            <TableCell positive>
                                {status === "available" ? (
                                    <ChipCustom text="UNUSED" outlined color={'primary'} />
                                ) : status === "used" ? (
                                    <ChipCustom text="USED" outlined color={'yellow-400'} />
                                ) : status === "expired" ? (
                                    <ChipCustom text="EXPIRED" outlined color={'red-400'} />
                                ) : (
                                    <ChipCustom text="ALL" outlined color={'green-400'} />
                                )}
                            </TableCell>
                            {/* <TableCell positive>-</TableCell> */}
                        </Table.Row>
                        
                        {result.gifts?.map((gift: any, idx: number) => {
                            return (
                                <Table.Row key={idx}>
                                    <TableCell>
                                        {gift.order.item.name}
                                    </TableCell>
                                    <TableCell>
                                        Merchant Name
                                    </TableCell>
                                    <TableCell>
                                        {new Date(Number(gift?.createdAt) * 1000).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {getExpireDate(gift?.createdAt * 1000, gift?.order?.item?.expiresIn)}
                                    </TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>
                                        ${gift?.order?.item?.originalPrice}
                                    </TableCell>
                                    <TableCell>
                                        ${gift?.order?.item?.price.amount}
                                    </TableCell>
                                    <TableCell>
                                        ${gift?.status === "used" ? gift?.order?.item?.amount : 0}
                                    </TableCell>
                                    <TableCell>
                                        {gift?.status === "available" ? (
                                            <ChipCustom text="UNUSED" outlined color={'primary'} />
                                        ) : gift?.status === "used" ? (
                                            <ChipCustom text="USED" outlined color={'yellow-400'} />
                                        ) : (
                                            <ChipCustom text="EXPIRED" outlined color={'red-400'} />
                                        )}
                                        {/* {gift?.status === "available" ? "UNUSED" : gift.status.toUpperCase()} */}
                                    </TableCell>
                                    {/* <TableCell>GPartner</TableCell> */}
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                ) : (
                    <></>
                )}
            </Table>
        </>
    );
}