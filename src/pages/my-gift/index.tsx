import React, { useContext, useEffect, useState } from 'react';
import { Button, Divider } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/Layout';
import { useStyles } from '../../styles/pages/myGiftStyle';
import Logo from '../../asset/bi1.jpg';
import { getGiftOrders } from '@/redux/actions/authActions';
import AppContext from '@/providers/app-context';
import { AppContextInterface } from '@/annotations/types';
import moment from 'moment';

const MyGifts = () => {
  const { user, setSingleVoucher } = useContext(
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
                  {moment(data?.createdAt).format(`D.MM.YYYY, hh:mm a`)}
                </p>
              </div>
              <div className={classes.productCard}>
                <div
                  className={classes.imageDiv}
                  onClick={() => {
                    setSingleVoucher(data.products);
                    router.push(`/item/${data.products.name}`);
                  }}
                >
                  <Image
                    src={data?.products?.imageUrl}
                    width={`80px`}
                    height={`80px`}
                    alt={`product`}
                  />
                </div>
                <div className={classes.info}>
                  <h4 className={classes.brand}>Starbucks</h4>
                  <h4
                    className={classes.title}
                    onClick={() => {
                      setSingleVoucher(data.products);
                      router.push(`/item/${data.products.name}`);
                    }}
                  >
                    {data?.products?.name}
                  </h4>
                  <h4 className={classes.price}>
                    US$ {data?.amount} / quantity {data?.quantity}
                  </h4>
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
