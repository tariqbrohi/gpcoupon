import React, { useEffect, useState } from 'react';
import { useStyles } from '../../styles/components/EgiftDetailsStyle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Divider } from '@mui/material';
import { useRouter } from 'next/router';
import GPointConfirmationModal from './GPointConfirmationModal';
import convert from '@/lib/forex';
import useAxios from 'axios-hooks';
import axios from 'axios';

const GGiftDetails = (props: any) => {
  const { name, extendedName, brand, category, description, notes, amount } =
    props;
  const classes = useStyles();
  const [counter, setcounter] = useState(1);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [currency, setCurrency] = useState(1);

  useEffect(() => {
    if (brand == 'gpoint') {
      axios
        .post('/api/forex')
        .then(({ data }) => {
          setCurrency(data);
        })
        .catch(() => {});
    }
  }, [brand]);

  const handleCounter = (counter: number) => setcounter(counter);

  const handleSubmit = () => {
    setOpen(true);
  };

  return (
    <div className={classes.container}>
      <p className={classes.tag}>eGift</p>
      <h1 className={classes.heading}>{name}</h1>
      <h2 className={classes.info}>{extendedName}</h2>
      <h2 className={classes.price}>
        {brand === 'gpoint'
          ? convert(amount, currency, 1)
          : `G${amount?.toFixed(2)}`}
      </h2>
      {notes?.map((note: any, idx: number) => (
        <p className={classes.para} key={idx}>
          • {note.text}
        </p>
      ))}
      <p className={classes.giftPara}>You can gift up to 10.</p>
      <div className={classes.btnDiv}>
        <div className={classes.counterDiv}>
          <RemoveIcon
            className={`${counter < 2 ? classes.unactive : classes.active}`}
            onClick={() => {
              if (counter > 1) {
                handleCounter(counter - 1);
              }
            }}
          />
          <p className={classes.counter}>{counter}</p>
          <AddIcon
            className={`${counter > 9 ? classes.unactive : classes.active}`}
            onClick={() => {
              if (counter < 10) {
                handleCounter(counter + 1);
              }
            }}
          />
        </div>
        <Button
          className={classes.buttonContained}
          onClick={handleSubmit}
          variant="contained"
        >
          Send Gift
        </Button>
      </div>
      <Divider />
      <GPointConfirmationModal
        item={props}
        qty={counter}
        open={open}
        currency={currency}
        setOpen={setOpen}
      />
    </div>
  );
};

export default GGiftDetails;
