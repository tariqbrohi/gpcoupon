import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';

import { useStyles } from '../../styles/components/EgiftDetailsStyle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Chip, Divider } from '@mui/material';
import GPointConfirmationModal from './GPointConfirmationModal';
import Logo from '../../asset/starbucks.jpg';
import { useRouter } from 'next/router';

import Parse from 'html-react-parser';
import { AppContextInterface } from '@/annotations/types';
import AppContext from '@/providers/app-context';
import { postCharge } from '@/redux/actions/authActions';
import { SingleBed } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { NotifyMethodEnum } from '@/annotations/enums/notify-method.enum';
import NotifyComponent from '@/components/shared/notify';
import { pick } from 'lodash';

const EgiftDetails = ({ data }: any) => {
  const classes = useStyles();
  const [counter, setcounter] = useState(1);
  const router = useRouter();
  const [selectedChip, setselectedChip] = useState(0);
  const { user } = useContext(AppContext) as AppContextInterface;
  const [loading, setLoading] = useState(false);

  const sendGift = async () => {
    if (user === ``) {
      router.replace(`/login`);
      NotifyComponent(NotifyMethodEnum.warning, `Please Login to place Order.`);
    } else {
      setLoading(true);
      const token = typeof window === `object` && localStorage.getItem(`token`);
      const response = await postCharge({
        userId: user,
        token,
        amount: selectedChip * counter,
        products: data,
        quantity: counter,
      });
      if (response?.message) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setselectedChip(Number(data?.valueDenominations?.split(`,`)?.[0]));
  }, []);

  console.log(`selectedChip`, selectedChip);

  return (
    <div className={classes.container}>
      <p className={classes.tag}>eGift</p>
      <h1 className={classes.heading}>{data?.name}</h1>
      <h2 className={classes.info}>
        {Parse(`${data?.description?.slice(0, 150)}...` || ``)}
      </h2>
      <h2 className={classes.price}>US$ {counter * selectedChip}</h2>
      <p className={classes.para}>
        • Expires in {Parse(data?.expiryAndValidity || ``)}
      </p>
      <p className={classes.para}>• Send via Link share / Text message</p>
      <p className={classes.giftPara}>You can gift up to 5.</p>
      <div className={classes.chips}>
        {data?.valueDenominations
          ?.split(`,`)
          ?.map((chip: any, index: number) => (
            <Chip
              key={index}
              label={` ${counter * chip} `}
              className={classes.chip}
              variant={selectedChip === Number(chip) ? `filled` : `outlined`}
              onClick={() => setselectedChip(Number(chip))}
            />
          ))}
      </div>
      <div className={classes.btnDiv}>
        <div className={classes.counterDiv}>
          <RemoveIcon
            className={`${counter < 2 ? classes.unactive : classes.active}`}
            onClick={() => {
              if (counter > 1) {
                setcounter(counter - 1);
              }
            }}
          />
          <p className={classes.counter}>{counter}</p>
          <AddIcon
            className={`${classes.active}`}
            onClick={() => setcounter(counter + 1)}
          />
        </div>

        {/* <Button
          className={classes.buttonContained}
          onClick={() => sendGift()}
          variant="contained"
        >
          Send Gift
        </Button> */}
        <LoadingButton
          loading={loading}
          className={classes.buttonContained}
          onClick={() => sendGift()}
          variant="contained"
        >
          Send Gift
        </LoadingButton>
      </div>
      <Divider />
      {/* <GPointConfirmationModal
        item={{
          id: data.productId,
          name: data.name,

        }}
        qty={counter}
        open={open}
        currency={currency}
        setOpen={setOpen}
      /> */}
    </div>
  );
};
// 'productId',
//           'name',
//           'currencyCode',
//           'currencyName',
//           'countryCode',
//           'exchangeRateRule',
//           'deliveryType',
export default EgiftDetails;
