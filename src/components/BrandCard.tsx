import Image from 'next/image';
import { useStyles } from '../styles/components/Brandcard';
import category1 from '../asset/category19.jpg';
import Router, { useRouter } from 'next/router';
import { AppContextInterface } from '@/annotations/types';
import { useContext } from 'react';
import AppContext from '@/providers/app-context';

const BrandCard = ({ data }: any) => {
  const { setSingleVoucher, country } = useContext(
    AppContext,
  ) as AppContextInterface;
  const classes = useStyles();

  return (
    <div
      className={classes.card}
      onClick={() => {
        setSingleVoucher(data);
        Router.push({
          pathname: `/item/${data.name}`,
        });
      }}
    >
      <Image
        alt={`image`}
        src={data?.imageUrl}
        height={`170px`}
        width={`170px`}
        className={classes.image}
      />
      {/* <p className={classes.company}>{data.company}</p>
      <p className={classes.title}>{data.title}</p>
      <p className={classes.price}>US$ {data.price}</p> */}

      {/* <p className={classes.company}>Starbucks</p> */}
      <p className={classes.title}>{data?.name}</p>
      <p className={classes.price}>
        US$ {data?.valueDenominations?.split(`,`)[0]}
      </p>
    </div>
  );
};

export default BrandCard;
