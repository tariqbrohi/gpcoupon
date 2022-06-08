import Image from 'next/image';
import Logo from '@/asset/logo.png';

import { useStyles } from '../../styles/components/navbarStyles';
import { Typography, Input, InputAdornment, Button } from '@mui/material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

const Desktop = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.topBar}></div>
      <div className={classes.navMain}>
        <Image src={Logo} width="155px" height={`35px`} />

        <Typography
          className={classes.headText}
          variant="subtitle2"
          component="div"
        >
          Brands
        </Typography>
        <Typography
          className={classes.headText}
          variant="subtitle2"
          component="div"
        >
          Categories
        </Typography>
        <Input
          className={classes.root}
          disabled
          onClick={() => {
            console.log(`hello`);
          }}
          placeholder="Search gifts or brands"
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          }
        />
        <Typography
          className={classes.headText}
          variant="subtitle2"
          component="div"
        >
          Help
        </Typography>
        <Typography
          className={classes.headText}
          variant="subtitle2"
          component="div"
        >
          How to Use
        </Typography>
        <Typography
          className={classes.headText}
          variant="subtitle2"
          component="div"
        >
          Login
        </Typography>
        <Button className={classes.buttonContained} variant="contained">
          Sign up
        </Button>
      </div>
    </>
  );
};

export default Desktop;
