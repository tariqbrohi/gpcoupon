import AdminLayout from '@/layouts/AdminLayout';
import currencyFormat from '@/lib/currency-format';
import {
  useDeleteGPointMutation,
  useGPointOrderApproveMutation,
  useGPointOrderDenyMutation,
  useGPointOrdersQuery,
  useListGPointsQuery,
} from '@/services';
import {
  Button,
  Checkbox,
  Icon,
  Input,
  Loader,
  Modal,
  Table,
} from '@growth-ui/react';
import moment from 'moment';
import Router from 'next/router';
import React, { useState } from 'react';

export default function List() {
  const { data } = useGPointOrdersQuery();
  const [checked, setChecked] = useState<any>([]);
  const [approve, { loading: loadingApprove }] =
    useGPointOrderApproveMutation();
  const [deny, { loading: loadingDeny }] = useGPointOrderDenyMutation();
  const [reason, setReason] = useState<string>('');

  const handleBulkApprove = (e: any) => {
    e.preventDefault();
    const promises = checked.map((id: string) =>
      approve({
        data: {
          id,
        },
      }),
    );

    Promise.all(promises)
      .then(() => Router.reload())
      .catch((err) => console.log(err));
  };

  const handleBulkDeny = (e: any) => {
    e.preventDefault();

    if (!reason) {
      return alert('Reason is required');
    }

    const promises = checked.map((id: string) =>
      deny({
        data: {
          id,
          reason,
        },
      }),
    );

    Promise.all(promises)
      .then(() => Router.reload())
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AdminLayout>
        {(loadingApprove || loadingDeny) && <Loader />}
        <Button.Group>
          <Button primary onClick={handleBulkApprove}>
            Bulk Approve
          </Button>
          <Modal trigger={<Button>Bulk Deny</Button>}>
            <Input
              label="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <Button onClick={handleBulkDeny}>Deny</Button>
          </Modal>
        </Button.Group>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>id</Table.HeadCell>
              <Table.HeadCell>Total</Table.HeadCell>
              <Table.HeadCell>Qty</Table.HeadCell>
              <Table.HeadCell>Code</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Recipient Name</Table.HeadCell>
              <Table.HeadCell>Recipient Email</Table.HeadCell>
              <Table.HeadCell>Ordered At</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data?.map((d, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <Checkbox
                    onChange={() => {
                      if (checked.includes(d.id)) {
                        setChecked(checked.filter((id: string) => id !== d.id));
                      } else {
                        setChecked([...checked, d.id]);
                      }
                    }}
                  />
                </Table.Cell>
                <Table.Cell>{d.status}</Table.Cell>
                <Table.Cell>{d.id}</Table.Cell>
                <Table.Cell>{currencyFormat(d.totalPrice, 'KRW')}</Table.Cell>
                <Table.Cell>{d.qty}</Table.Cell>
                <Table.Cell>{d.code}</Table.Cell>
                <Table.Cell>{(d.gpoint as any).name}</Table.Cell>
                <Table.Cell>{d.recipient.name}</Table.Cell>
                <Table.Cell>{d.recipient.email}</Table.Cell>
                <Table.Cell>
                  {moment(d.createdAt * 1000).format('MM/DD/YYYY HH:MM')}
                </Table.Cell>
                <Table.Cell>
                  <Button.Group size="small">
                    <Button
                      primary
                      onClick={() => {
                        approve({
                          data: {
                            id: d.id,
                          },
                        })
                          .then(() => Router.reload())
                          .catch(() => {});
                      }}
                    >
                      Approve
                    </Button>
                    <Modal trigger={<Button>Deny</Button>}>
                      <Input
                        label="Reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <Button
                        onClick={() => {
                          deny({
                            data: {
                              id: d.id,
                              reason,
                            },
                          })
                            .then(() => Router.reload())
                            .catch(() => {});
                        }}
                      >
                        Deny
                      </Button>
                    </Modal>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </AdminLayout>
    </>
  );
}
