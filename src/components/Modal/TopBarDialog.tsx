import React, { useContext, useEffect, useState } from 'react';
import setLanguage from 'next-translate/setLanguage';

import Image from 'next/image';
import KoreaLogo from '@/asset/korea.png';
import CaLogo from '@/asset/ca.png';
import UsaLogo from '@/asset/us.png';
import { useStyles } from '../../styles/components/navbarStyles';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDownwardOutlined from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

import AppContext from '@/providers/app-context';
import { AppContextInterface } from '@/annotations/types';

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

const mapCountryToLocale: Record<string, any> = {
  usa: 'en',
  south_korea: 'ko',
  canada: 'en',
};

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

export default function SimpleDialogDemo() {
  const classes = useStyles();
  const { setCountry, country } = useContext(AppContext) as AppContextInterface;

  const [localCountry, setLocalCountry] = useState(``);

  const SetCountryOnUseEffect = () => {
    const lang = localStorage.getItem('gp_lang');
    setLanguage(lang || 'en');

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangeLanguage = (filterValueCode: string) => () => {
    const lang = mapCountryToLocale[filterValueCode];

    if (lang !== 'us') {
      setLanguage(lang);
      localStorage.setItem('gp_lang', lang);
    }

    setCountry(filterValueCode);
    setOpen(false);
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
          : localCountry === `usa`
          ? `USA`
          : `Canada`}
        <Image
          alt={`image`}
          src={
            localCountry === `south_korea`
              ? KoreaLogo
              : localCountry === `usa`
              ? UsaLogo
              : CaLogo
          }
          width="17px"
          height={`17px`}
          style={{ marginLeft: `3px` }}
        />
        <ArrowDownwardOutlined />
      </Typography>

      {/* Country Select Dialog */}
      <Dialog
        onClick={() => setOpen(false)}
        maxWidth={`xs`}
        open={open}
        className={classes.modalBody}
      >
        <div className={classes.modalClose}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle>Where do you want to send your gift to?</DialogTitle>
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem
              button={true}
              // onClick={() => handleListItemClick(email)}
              key={email.filterValue}
              onClick={handleChangeLanguage(email.filterValueCode)}
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
      </Dialog>
    </div>
  );
}
