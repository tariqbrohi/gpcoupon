import Layout from '@/components/layout/AdminLayout';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
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
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { ROUTES } from '@/ROUTES';
import WarningPopup from '@/components/WarningPopup';
import React, { useState } from 'react';
import axios from 'axios';

export default withPageAuthRequired(function Coupons() {
  const {} = useRouter();
  const [{ data }, refetch] = useAxios(`/api/admin/coupons`);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');

  const handleDelete = (id: string) => () => {
    setId(id);
    setOpen(true);
  };

  const handleYes = () => {
    setLoading(true);
    axios
      .delete(`/api/admin/coupons/${id}`)
      .then(() => Router.reload())
      .catch(() => setLoading(false));
  };

  const onClose = () => setOpen(false);

  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Extended Name</TableCell>
              <TableCell>Slug</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Img</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(
              ({
                name,
                slug,
                id,
                imageUrl,
                brand,
                category,
                extendedName,
              }: any) => (
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
                    onClick={() => Router.push(`${ROUTES.admin.coupons}/${id}`)}
                  >
                    {name}
                  </TableCell>
                  <TableCell>{extendedName}</TableCell>
                  <TableCell>{slug}</TableCell>
                  <TableCell>{brand}</TableCell>
                  <TableCell>{category}</TableCell>
                  <TableCell>
                    <img src={imageUrl} width={50} height={50} />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={handleDelete(id)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ),
            )}
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
