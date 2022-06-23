/* eslint-disable react/no-string-refs */
import React, { useState } from 'react';

import LanguageIcon from '@mui/icons-material/Language';
import MenuItem from '@mui/material/MenuItem';
import { useStyles } from '../../styles/layout/DesktopFooterStyle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Link from 'next/link';

const DesktopFooter = () => {
  const classes = useStyles();
  const [Language, setLanguage] = useState(`english`);

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <div className={classes.container}>
      <div className={classes.lastsec}>
        <p className={classes.para}>
          © SodaCrew Global Inc. or its affiliates 2022
        </p>
      </div>
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
  );
};

export default DesktopFooter;
