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
      <div className={classes.linksection}>
        <div className={`${classes.sec}`}>
          <h2 className={classes.secHeading}>SodaGift</h2>
          <a className={classes.link}>About Us</a>
          <a className={classes.link}>Invite friends</a>
          <a className={classes.link}>Blogs</a>
        </div>
        <div className={`${classes.sec}`}>
          <h2 className={classes.secHeading}>Send gifts to</h2>
          <a className={classes.link}> South Korea</a>
          <a className={classes.link}>United States</a>
          <a className={classes.link}>Canada</a>
        </div>
        <div className={`${classes.sec}`}>
          <h2 className={classes.secHeading}>Support</h2>
          <a className={classes.link}>Help</a>
          <a className={classes.link}>How to use</a>
          <a className={classes.link}>support@sodagift.com</a>
        </div>
        <div className={`${classes.sec}`}>
          <h2 className={classes.secHeading}>Follow us</h2>
          <a className={classes.link}>Facebook</a>
          <a className={classes.link}>Instagram</a>
          <a className={classes.link}>Youtube</a>
        </div>
        <div className={`${classes.sec}`}>
          <Select
            value={Language}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': `Without label` }}
          >
            <MenuItem value={`english`} selected>
              <LanguageIcon /> English
            </MenuItem>
            <MenuItem value={`한국어`}>
              <LanguageIcon /> 한국어
            </MenuItem>
          </Select>
        </div>
      </div>
      <div className={classes.lastsec}>
        <p className={classes.para}>
          © SodaCrew Global Inc. or its affiliates 2022
        </p>
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
