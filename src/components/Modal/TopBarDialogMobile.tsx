import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import Image from 'next/image';
import Logo from '@/asset/korea.png';
import giftBox from '@/asset/giftBox.png';
import { useStyles } from '../../styles/components/navbarStyles';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Drawer from '@mui/material/Drawer';
import PersonIcon from '@mui/icons-material/Person';
import ArrowDownwardOutlined from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

const emails = [
  {
    title: `South Korea`,
    Logo: Logo,
  },
  {
    title: `United States`,
    Logo: Logo,
  },
  {
    title: `Canada`,
    Logo: Logo,
  },
];

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

export default function SimpleDialogDemo() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
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
          {emails.map((email: any, index: number) => (
            <ListItem
              button
              // onClick={() => handleListItemClick(email)}
              key={email.title}
            >
              <div style={{ marginRight: `10px` }}>
                <Image
                  alt={`image`}
                  src={email.Logo}
                  width="20px"
                  height={`20px`}
                />
              </div>
              <ListItemText primary={email.title} />
            </ListItem>
          ))}
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
        To : South Korea
        <Image alt={`image`} src={Logo} width="17px" height={`17px`} />
        <ArrowDownwardOutlined />
      </Typography>
      {/* <p
        className={classes.modalHeadMobile}
        variant="caption"
        onClick={handleClickOpen}
      >
        To : South Korea
        <Image alt={`image`} src={Logo} width="17px" height={`17px`} />
        <ArrowDownwardOutlined />
      </p> */}
      <div className={classes.mobileBottom}>
        <h2>
          Find the perfect gift <br /> to South Korea
        </h2>
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
