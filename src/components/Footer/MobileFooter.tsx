import React, { useState } from 'react';

import { MenuItem, Divider } from '@mui/material';
import { useStyles } from '../../styles/layout/MobileFooterStyles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from 'next/link';

const DesktopFooter = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Divider />
      <div className={classes.lastsec}>
        <p className={classes.para}>© GPoint Inc. or its affiliates 2022</p>
        <p className={classes.para}>
          <Link href="/termsOfUse">
            <a>Terms of Use</a>
          </Link>
          <span> and </span>
          <Link href="/privacyPolicy">
            <a>Privacy Policy</a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DesktopFooter;
