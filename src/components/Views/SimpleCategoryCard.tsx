import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

import { useStyles } from '../../styles/components/SimpleCategoryCardStyle';

const SimpleCategoryCard = ({ data, img }: any) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div
      className={classes.imageDiv}
      onClick={() => router.push(`/categories/${data?.filterValueCode}`)}
    >
      <Image
        src={img}
        alt={`image`}
        className={classes.image}
        width={100}
        height={100}
      />
      <h3 className={classes.title}>{data?.filterValue}</h3>
    </div>
  );
};

export default SimpleCategoryCard;
