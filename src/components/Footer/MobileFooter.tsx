import React, { useState } from 'react';

import LanguageIcon from '@mui/icons-material/Language';
import {
  MenuItem,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import { useStyles } from '../../styles/layout/MobileFooterStyles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs';
import Link from 'next/link';

const DesktopFooter = () => {
  const classes = useStyles();
  const [Language, setLanguage] = useState(`english`);
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const accordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className={classes.container}>
      <Divider />
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
