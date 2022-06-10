import Image from 'next/image';
import BannerImage from '@/asset/banner1.png';

import { useStyles } from '../styles/components/DetailsCard';
import { Button } from '@mui/material';

const Banner = (props:any) => {
    const {children,title} = props
  const classes = useStyles();
  return (
    <div className={classes.main}>
      {children}
    </div>
  );
};

export default Banner;
