import Image from 'next/image';
import BannerImage from '@/asset/banner1.png';

import { useStyles } from '../../styles/components/bannerStyles';
import { Button, Typography } from '@mui/material';

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.info}>
        <h2 className={classes.heading}>Shared the gift of GCoupon</h2>
        <Typography fontSize={14} color="gray">
          Pay for your purchases instantly or share the gift of GCoupon with
          your friends and family, from anywhere in the world.
        </Typography>
        <Button className={classes.buttonContained} variant="contained">
          Send GCoupon Now
        </Button>
      </div>
      <div>
        <img
          alt={`image`}
          src="https://s3-alpha-sig.figma.com/img/d859/11ac/3fe795289d44c7e23dfc3873ef4f5a08?Expires=1656892800&Signature=WIbo4fsN3Fv3bcBjZ9uYP398-eWbL7OTVYNwrVwpHEIcrR0fJ6hL-DiOQ8kzRxIKMH8w2V0D1OsG3BwkBoEJMxbo3TP9IdS7RN3Ugc~6XIgtJ8XlHdqxC~Q2HYQpriysL9t0XpXQYiDVlxSItg7n~DqhglyXpa8FKYO2S2yt3vTAmzUiAbSUVWZWrqogdnxHFVlwj7sWIZZwlK2IqCOo2E0W8KtLOSKVZNlvh5u5Mie~jHaltoyaUp7FVasA3WKo6wt9k58RWiy9uQDC9tB6GRQyotq~fUFFo1Ht-90S9rCC~k-Bo9WVYNj09SsurH8Gb0z0~rSUTPllgT6HrDwaKQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
          className={classes.image}
          height={`340px`}
          width={`500px`}
          style={{
            transform: 'rotate(11deg)',
          }}
        />
      </div>
    </div>
  );
};

export default Banner;
