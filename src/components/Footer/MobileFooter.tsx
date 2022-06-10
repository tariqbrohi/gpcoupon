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

      <div className={classes.mainAccordion}>
        <Accordion
          expanded={expanded === 'panel1'}
          className={classes.accordian}
          onChange={accordionChange('panel1')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>SodaGift</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p>About Us</p>
            <p>Invite Friends</p>
            <p>Blog</p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          className={classes.accordian}
          onChange={accordionChange('panel2')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Send Gifts to</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p>South Korea</p>
            <p>United States</p>
            <p>Canada</p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          className={classes.accordian}
          onChange={accordionChange('panel3')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Support</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p>Help</p>
            <p>How to use</p>
            <p>support@sodagift.com</p>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          className={classes.accordian}
          onChange={accordionChange('panel4')}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Follow us</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <p>
              <BsFacebook />
              Facebook
            </p>
            <p>
              <BsInstagram />
              Instagram
            </p>
            <p>
              <BsYoutube />
              Youtube
            </p>
          </AccordionDetails>
        </Accordion>
      </div>
      <Divider />
      <div className={classes.lastsec}>
        <p className={classes.para}>
          © SodaCrew Global Inc. or its affiliates 2022
        </p>
        <p className={classes.para}>Terms and Policy</p>
      </div>
    </div>
  );
};

export default DesktopFooter;
