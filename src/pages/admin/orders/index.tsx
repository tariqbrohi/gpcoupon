import Layout from '@/components/layout/AdminLayout';
import convert from '@/lib/forex';
import moment from 'moment-timezone';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Router from 'next/router';
import parseErrorMessage from '@/lib/parse-error-message';

export default withPageAuthRequired(function Coupons() {
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [id, setId] = useState('');

  useEffect(() => {
    axios
      .get(`/api/admin/orders`)
      .then(({ data }) => setData(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = (orderId: string) => async () => {
    if (submitting) return;

    setSubmitting(true);

    axios
      .post('/api/admin/orders/approve', { id: orderId })
      .then(() => {
        Router.reload();
      })
      .catch((err) => {
        setSubmitting(false);
        alert(parseErrorMessage(err));
      });
  };

  const handleDeny = async () => {
    if (submitting) return;

    setSubmitting(true);

    axios
      .post('/api/admin/orders/deny', { id, reason })
      .then(() => {
        Router.reload();
      })
      .catch((err) => {
        setSubmitting(false);
        alert(parseErrorMessage(err));
      });
  };

  return (
    <Layout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Receiver name</TableCell>
              <TableCell>Receiver email</TableCell>
              <TableCell>Purchased At</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(
              ({
                id,
                meta,
                item,
                quantity,
                code,
                receiverName,
                receiverEmail,
                createdAt,
              }: any) => (
                <TableRow
                  key={id}
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
                    // onClick={() => Router.push(`${ROUTES.admin.coupons}/${id}`)}
                  >
                    {id.substr(-6)}
                  </TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>
                    {meta.amount} ({meta.currency})
                  </TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>
                    {convert(item.amount, meta.amount, quantity)}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{code}</TableCell>
                  <TableCell>{receiverName}</TableCell>
                  <TableCell>{receiverEmail}</TableCell>
                  <TableCell>
                    {moment(createdAt).tz('Asia/Seoul').format('MM/DD h:mm a')}
                  </TableCell>
                  <TableCell>
                    <Box display="flex">
                      <LoadingButton
                        loading={submitting}
                        variant="contained"
                        onClick={handleApprove(id)}
                      >
                        Approve
                      </LoadingButton>

                      <LoadingButton
                        variant="outlined"
                        loading={submitting}
                        color="warning"
                        onClick={() => {
                          setOpen(true);
                          setId(id);
                        }}
                      >
                        Deny
                      </LoadingButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            label="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <LoadingButton
            variant="contained"
            loading={submitting}
            color="warning"
            onClick={handleDeny}
          >
            Deny
          </LoadingButton>
        </Box>
      </Modal>
    </Layout>
  );
});
