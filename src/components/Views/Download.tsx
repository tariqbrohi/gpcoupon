import React from 'react';

import { useStyles } from '../../styles/components/DownloadStyle';
import logo from '../../asset/sodagift.svg';
import Image from 'next/image';
import { Button } from '@mui/material';

const Download = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Image alt={`image`} src={logo} className={classes.image} />
        <p className={classes.para}>DOWNLOAD OUR APP TODAY!</p>
      </div>
      <Button className={classes.buttonContained} variant="contained">
        Download App
      </Button>
    </div>
  );
};

export default Download;
