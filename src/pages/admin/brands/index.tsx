import React, { useContext, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '@/components/layout/AdminLayout';
import useAxios from 'axios-hooks';
import useTranslation from 'next-translate/useTranslation';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Router from 'next/router';
import { ROUTES } from '@/ROUTES';
import axios from 'axios';
import WarningPopup from '@/components/WarningPopup';
import AppContext from '@/providers/app-context';

export default withPageAuthRequired(function Brands() {
  const { country } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [{ data, error }] = useAxios({
    method: 'get',
    url: `/api/brands`,
  });

  const handleDelete = (id: string) => () => {
    setId(id);
    setOpen(true);
  };

  const handleYes = () => {
    setLoading(true);

    axios
      .delete(`/api/admin/brands/${id}`)
      .then(() => Router.reload())
      .finally(() => setLoading(false));
  };

  const onClose = () => setOpen(false);

  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>slug</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(({ name, slug, id }: any) => (
              <TableRow
                key={slug}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{
                    '&:hover': {
                      background: 'rgba(0,0,0,0.05)',
                    },
                    cursor: 'pointer',
                  }}
                  onClick={() => Router.push(`${ROUTES.admin.brands}/${slug}`)}
                >
                  {name}
                </TableCell>
                <TableCell>{slug}</TableCell>
                <TableCell>
                  <IconButton onClick={handleDelete(id)}>
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <WarningPopup
        open={open}
        onClose={onClose}
        onYes={handleYes}
        title="Are you sure you want to delete? You will lose all the related items"
      />
    </Layout>
  );
});
