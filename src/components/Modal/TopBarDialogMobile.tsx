import React, { useContext, useState, useEffect } from 'react';
// import setLanguage from 'next-translate/setLanguage';

import Image from 'next/image';
import Logo from '@/asset/korea.png';
import giftBox from '@/asset/giftBox.png';
import { useStyles } from '../../styles/components/navbarStyles';
import Router from 'next/router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Drawer from '@mui/material/Drawer';
import ArrowDownwardOutlined from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import AppContext from '@/providers/app-context';
import { AppContextInterface } from '@/annotations/types';
import KoreaLogo from '@/asset/korea.png';
import CaLogo from '@/asset/ca.png';
import UsaLogo from '@/asset/us.png';

const emails = [
  {
    filterValue: `South Korea`,
    isoCode: `KR`,
    filterValueCode: `south_korea`,
    Logo: KoreaLogo,
  },
  {
    filterValue: `USA`,
    isoCode: `US`,
    filterValueCode: `usa`,
    Logo: UsaLogo,
  },
  {
    filterValue: `Canada`,
    isoCode: `CA`,
    filterValueCode: `canada`,
    Logo: CaLogo,
  },
];

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

export default function SimpleDialogDemo() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { setCountry, country } = useContext(AppContext) as AppContextInterface;
  const [localCountry, setLocalCountry] = useState(``);

  const SetCountryOnUseEffect = () => {
    const localCheck: any =
      typeof window === `object` && localStorage.getItem(`country`);
    if (localCheck?.length === 2) {
      setCountry(`south_korea`);
    }
  };

  useEffect(() => {
    setLocalCountry(country);
    SetCountryOnUseEffect();
  }, [country]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  const handleChangeLanguage = (filterValueCode: string) => () => {
    // const lang = mapCountryToLocale[filterValueCode];

    // if (lang !== `us`) {
    //   // setLanguage(lang);
    //   localStorage.setItem(`gp_lang`, lang);
    // }
    setCountry(filterValueCode);
    setOpen(false);
    Router.reload();
  };

  const SimpleDialog = () => {
    return (
      <>
        <DialogTitle>Where do you want to send your gift to?</DialogTitle>
        <List sx={{ pt: 0 }}>
          {emails.map((email: any, index: number) => (
            <ListItem
              button
              onClick={handleChangeLanguage(email.filterValueCode)}
              key={email.filterValue}
            >
              <div style={{ marginRight: `10px` }}>
                <Image
                  alt={`image`}
                  src={email.Logo}
                  width="20px"
                  height={`20px`}
                />
              </div>
              <ListItemText primary={email.filterValue} />
            </ListItem>
          ))}
        </List>
      </>
    );
  };

  return (
    <div>
      <Typography
        className={classes.modalHead}
        variant={`caption`}
        onClick={handleClickOpen}
      >
        {localCountry === `south_korea`
          ? `South Korea`
          : localCountry === `canada`
          ? `Canada`
          : `USA`}
        <Image
          alt={`image`}
          src={
            localCountry === `south_korea`
              ? KoreaLogo
              : localCountry === `canada`
              ? CaLogo
              : UsaLogo
          }
          width="17px"
          height={`17px`}
          style={{ marginLeft: `3px` }}
        />
        <ArrowDownwardOutlined />
      </Typography>
      <div className={classes.mobileBottom}>
        <h2>Share the gift of GCoupon</h2>
        <Image alt={`image`} src={giftBox} width="166px" height="120px" />
      </div>
      <Drawer
        className={classes.topBarDrawer}
        anchor={`bottom`}
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
