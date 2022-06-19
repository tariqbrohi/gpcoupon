import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import categ1 from '../../asset/categ1.jpg';

import { useStyles } from '../../styles/components/SimpleCategoryCardStyle';

const SimpleCategoryCard = ({ data }: any) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div
      className={classes.imageDiv}
      onClick={() => router.push(`/categories/${data?.filterValueCode}`)}
    >
      <Image alt={`image`} src={categ1} className={classes.image} />
      <h3 className={classes.title}>{data?.filterValue}</h3>
    </div>
  );
};

export default SimpleCategoryCard;
