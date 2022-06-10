import Image from 'next/image';
import { useStyles } from '../styles/components/Brandcard.tsx';

const BrandCard = (props: any) => {
  const { data } = props;
  const classes = useStyles();
  return (
    <div className={classes.card}>
      <Image src={data.image} className={classes.image} />
      <p className={classes.company}>{data.company}</p>
      <p className={classes.title}>{data.title}</p>
      <p className={classes.price}>US$ {data.price}</p>
    </div>
  );
};

export default BrandCard;
