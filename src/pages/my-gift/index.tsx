import React, { useContext, useEffect, useState } from 'react';
import { Button, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/Layout';
import { useStyles } from '../../styles/pages/myGiftStyle';
import Logo from '../../asset/bi1.jpg';
import { getGiftOrders } from '@/redux/actions/authActions';
import AppContext from '@/providers/app-context';
import { AppContextInterface } from '@/annotations/types';
import moment from 'moment';
import Spacer from '@/components/Spacer';
import currencyFormat from '@/lib/currency-format';
import getCurrencySymbol from '@/lib/get-currency-symbol';

const MyGifts = () => {
  const { user, userDetail, setSingleVoucher } = useContext(
    AppContext,
  ) as AppContextInterface;
  const classes = useStyles();
  const router = useRouter();
  const [GiftData, setGiftData] = useState([]);

  const getData = async () => {
    const res: any = await getGiftOrders(user);
    setGiftData(res);
  };

  useEffect(() => {
    if (user === ``) {
      router.replace(`/login`);
    }
    getData();
  }, []);

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.main}>
          <h2 className={classes.heading}>My Gifts</h2>
          {GiftData?.map((data: any, index: any) => (
            <div key={index} className={classes.card}>
              <div className={classes.head}>
                <h2 className={classes.done}>Done</h2>
                <p className={classes.date}>
                  Order date:{` `}
                  {moment(data?.createdAt).format(`MM-DD-YYYY`)}
                </p>
              </div>
              <div className={classes.productCard}>
                <div
                  className={classes.imageDiv}
                  onClick={() => {
                    setSingleVoucher(data.item);
                    router.push(`/item/${data?.item?.name}`);
                  }}
                >
                  <img
                    src={data?.item?.imageUrl}
                    width={`80px`}
                    height={`80px`}
                    alt={`product`}
                  />
                </div>
                <div className={classes.info}>
                  <h4
                    className={classes.title}
                    onClick={() => {
                      setSingleVoucher(data.item);
                      router.push(`/item/${data?.item?.name}`);
                    }}
                  >
                    {data?.item?.name}
                  </h4>
                  <h4 className={classes.price}>
                    {data?.item?.brand === 'gpoint'
                      ? `${getCurrencySymbol('ko')} ${currencyFormat(
                          data?.amount || 0,
                        )} / quantity ${data?.quantity}`
                      : `G ${data?.amount} / quantity ${data?.quantity}`}
                  </h4>
                  <Spacer size={15} />
                  <Typography fontSize={18}>
                    <b>Total </b>
                    {data?.item?.brand === 'gpoint'
                      ? `${getCurrencySymbol('ko')}${currencyFormat(
                          (data?.amount || 0) * data.quantity,
                        )}`
                      : `G${(parseFloat(data?.amount) * data.quantity).toFixed(
                          2,
                        )}`}
                  </Typography>
                </div>
              </div>
              {/* <p className={classes.para}>To. kyunhak</p> */}
              {/* <Button className={classes.btn} onClick={() => router.push(`/my-gift/${'details'}`)} >View order details</Button> */}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default MyGifts;
