import Image from 'next/image';
import BannerImage from '@/asset/banner1.png';

import { useStyles } from '../../styles/components/bannerStyles';
import { Button } from '@mui/material';

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.info}>
        <h2 className={classes.heading}>
          Find the perfect gift to South Korea
        </h2>
        <p className={classes.para}>Gift whenever and wherever.</p>
        <Button className={classes.buttonContained} variant="contained">
          Send Gift Now
        </Button>
      </div>
      <div>
        <Image
          alt={`image`}
          src={BannerImage}
          className={classes.image}
          height={`340px`}
          width={`500px`}
        />
      </div>
    </div>
  );
};

export default Banner;
