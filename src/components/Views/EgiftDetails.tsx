import React, { useState } from 'react';
import Image from 'next/image';

import { useStyles } from '../../styles/components/EgiftDetailsStyle';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button, Divider } from '@mui/material';
import Logo from '../../asset/starbucks.jpg';
import { useRouter } from 'next/router';

const EgiftDetails = () => {
  const classes = useStyles();
  const [counter, setcounter] = useState(1);
  const router = useRouter();

  return (
    <div className={classes.container}>
      <p className={classes.tag}>eGift</p>
      <h1 className={classes.heading}>Perfect Dessert Set</h1>
      <h2 className={classes.info}>
        Walnut carrot cake and two americanos (tall)
      </h2>
      <h2 className={classes.price}>US$ 17.85</h2>
      <p className={classes.para}>• Expires in 93 days of purchase</p>
      <p className={classes.para}>• Send via Link share / Text message</p>
      <p className={classes.giftPara}>You can gift up to 5.</p>
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
        <Button
          className={classes.buttonContained}
          onClick={() => router.push('/confirmation')}
          variant="contained"
        >
          Send Gift
        </Button>
      </div>
      <Divider />
      <div className={classes.companyDiv}>
        <Image src={Logo} alt="logo" />
        <p className={classes.name}>Starbucks</p>
      </div>
    </div>
  );
};

export default EgiftDetails;
