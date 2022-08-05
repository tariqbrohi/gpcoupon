import AdminLayout from '@/layouts/AdminLayout';
import { useDeleteGPointMutation, useListGPointsQuery } from '@/services';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Icon, Loader, Table } from '@growth-ui/react';
import Router from 'next/router';
import React from 'react';

export default withPageAuthRequired(function List() {
  const { data } = useListGPointsQuery();
  const [del, { loading }] = useDeleteGPointMutation();

  const handleDelete = async (id: string) => {
    del({
      data: {
        id,
      },
    })
      .then(() => Router.reload())
      .catch(() => {});
  };

  return (
    <>
      <AdminLayout>
        {loading && <Loader />}
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.HeadCell>id</Table.HeadCell>
              <Table.HeadCell>name</Table.HeadCell>
              <Table.HeadCell>amount</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {data?.map((d, i) => (
              <Table.Row key={i}>
                <Table.Cell>{d.id}</Table.Cell>
                <Table.Cell>{d.name}</Table.Cell>
                <Table.Cell>G{d.amount}</Table.Cell>
                <Table.Cell>
                  <Icon
                    name="trash"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(d.id)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </AdminLayout>
    </>
  );
});
