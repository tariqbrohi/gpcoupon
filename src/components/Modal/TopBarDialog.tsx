import * as React from 'react';
import setLanguage from 'next-translate/setLanguage';

import Image from 'next/image';
import Logo from '@/asset/korea.png';
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
import useTranslation from 'next-translate/useTranslation';

const mapLocaleToCountry: Record<string, any> = {
  en: 'United States 🇺🇸 ',
  ko: 'South Korea 🇰🇷',
};

const emails = [
  {
    title: 'South Korea',
    Logo: Logo,
  },
  {
    title: 'United States',
    Logo: Logo,
  },
  {
    title: 'Canada',
    Logo: Logo,
  },
];

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

export default function SimpleDialogDemo() {
  const classes = useStyles();
  const { lang } = useTranslation();

  const [open, setOpen] = React.useState(false);

  const handleChange = (lang: string) => () => {
    if (lang !== 'us') {
      setLanguage(lang);
      localStorage.setItem('gp_lang', lang);
    }

    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, open } = props;

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Dialog
        onClose={handleClose}
        maxWidth={'xs'}
        open={open}
        className={classes.modalBody}
      >
        <div className={classes.modalClose}>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogTitle>Where do you want to send your gift to?</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem button onClick={handleChange('en')}>
            <ListItemText primary="United States 🇺🇸" />
          </ListItem>
          <ListItem button onClick={handleChange('ko')}>
            <ListItemText primary="South Korea 🇰🇷" />
          </ListItem>
        </List>
      </Dialog>
    );
  }

  return (
    <div>
      <Typography
        className={classes.modalHead}
        variant="caption"
        onClick={handleClickOpen}
      >
        To: {mapLocaleToCountry[lang]}
        {/* <ArrowDownwardOutlined /> */}
      </Typography>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
