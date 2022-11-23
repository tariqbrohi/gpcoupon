import { Table } from "@growth-ui/react";
import styled from "styled-components";

const TableHeadCell = styled(Table.HeadCell)`
    text-align: center;
`;

const TableCell = styled(Table.Cell)`
    text-align: center;
`;

export default function DashboardDetails(props: any) {
    const { gifts } = props;

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
                    </Table.Row>
                </Table.Head>

                <Table.Body>
                    <Table.Row>
                        <TableCell positive>Total</TableCell>
                        <TableCell positive>-</TableCell>
                        <TableCell positive>-</TableCell>
                        <TableCell positive>-</TableCell>
                        <TableCell positive>-</TableCell>
                        <TableCell positive>-</TableCell>
                        <TableCell positive>-</TableCell>
                        <TableCell positive>$</TableCell>
                        <TableCell positive>-</TableCell>
                    </Table.Row>

                    <Table.Row>
                        <TableCell>Coupon Name</TableCell>
                        <TableCell>Merchant Name</TableCell>
                        <TableCell>mm/dd/yyyy</TableCell>
                        <TableCell>mm/dd/yyyy</TableCell>
                        <TableCell>1</TableCell>
                        <TableCell>$Original Price</TableCell>
                        <TableCell>$Retail Price</TableCell>
                        <TableCell>$Merchant Profit</TableCell>
                        <TableCell>Use Status</TableCell>
                    </Table.Row>
                </Table.Body>

                {/* {gifts ? (
                    <Table.Body>
                        <Table.Row>
                            <TableCell positive>Total</TableCell>
                            <TableCell positive>-</TableCell>
                            <TableCell positive>-</TableCell>
                            <TableCell positive>-</TableCell>
                            <TableCell positive>-</TableCell>
                            <TableCell positive>-</TableCell>
                            <TableCell positive>-</TableCell>
                            <TableCell positive>$</TableCell>
                            <TableCell positive>-</TableCell>
                        </Table.Row>
                        {gifts?.map((gift: any, idx: number) => {
                            return (
                                <Table.Row key={idx}>
                                    <TableCell>Coupon Name</TableCell>
                                    <TableCell>Merchant Name</TableCell>
                                    <TableCell>Create Date</TableCell>
                                    <TableCell>Expire Date</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>Original Price</TableCell>
                                    <TableCell>Retail Price</TableCell>
                                    <TableCell>Merchant Profit</TableCell>
                                    <TableCell>Use Status</TableCell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                ) : (
                    <></>
                )} */}

            </Table>
        </>
    );
}