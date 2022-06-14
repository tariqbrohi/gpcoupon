import * as React from 'react';

import Image from 'next/image';
import setLanguage from 'next-translate/setLanguage';
import giftBox from '@/asset/giftBox.png';
import { useStyles } from '../../styles/components/navbarStyles';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Drawer from '@mui/material/Drawer';
import useTranslation from 'next-translate/useTranslation';
import ArrowDownwardOutlined from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

const mapLocaleToCountry: Record<string, any> = {
  en: 'United States 🇺🇸 ',
  ko: 'South Korea 🇰🇷',
};

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

export default function SimpleDialogDemo() {
  const { lang } = useTranslation();

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (lang: string) => () => {
    if (lang !== 'us') {
      setLanguage(lang);
      localStorage.setItem('gp_lang', lang);
    }

    setOpen(false);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  function SimpleDialog() {
    const handleClose = () => {
      setOpen(false);
    };

    return (
      <>
        {/* <div className={classes.modalClose}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div> */}
        <DialogTitle>Where do you want to send your gift to?</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem button onClick={handleChange('en')}>
            <ListItemText primary="United States 🇺🇸" />
          </ListItem>
          <ListItem button onClick={handleChange('ko')}>
            <ListItemText primary="South Korea 🇰🇷" />
          </ListItem>
        </List>
      </>
    );
  }

  return (
    <div>
      <Typography
        className={classes.modalHeadMobile}
        variant="caption"
        onClick={handleClickOpen}
      >
        To: {mapLocaleToCountry[lang]}
      </Typography>
      <div className={classes.mobileBottom}>
        <h2>
          Find the perfect gift <br /> to {mapLocaleToCountry[lang]}
        </h2>
        <Image src={giftBox} width="166px" height="120px" />
      </div>
      <Drawer
        className={classes.topBarDrawer}
        anchor={'bottom'}
        open={open}
        onClose={handleClose}
      >
        {/* {list(anchor)} */}
        <SimpleDialog />
      </Drawer>
      {/* <SimpleDialog open={open} onClose={handleClose} /> */}
    </div>
  );
}
