import React, { useEffect, useState } from 'react';

import { useStyles } from '../../styles/components/CategoryMobileListStyle';

import { getCategories } from '@/redux/actions/authActions';

const CategoryList = ({ setCategory }: any) => {
  const classes = useStyles();
  const [active, setactive] = useState(`All`);

  const [categoryData, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const resp = await getCategories(`voucher_category`);
      setData(resp);
    })();
  }, []);

  return (
    <div className={classes.container}>
      <div
        className={`${active === `All` && classes.active} ${classes.list}`}
        onClick={() => {
          setactive(`All`);
          setCategory({ name: `All`, code: `all` });
        }}
      >
        {/* <span>{data.icon}</span> */}
        <h2 className={classes.name}>All</h2>
      </div>

      {categoryData?.map((data: any, index: number) => (
        <div
          key={index}
          className={`${active === data?.filterValueCode && classes.active} ${
            classes.list
          }`}
          onClick={() => {
            setactive(data?.filterValueCode);
            setCategory({
              name: data?.filterValue,
              code: data?.filterValueCode,
            });
          }}
        >
          {/* <span>{data.icon}</span> */}
          <h2 className={classes.name}>
            {data?.filterValue?.replaceAll(`&amp;`, `&`).replaceAll(`_`, ` `)}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
