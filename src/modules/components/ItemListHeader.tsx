import React from 'react';
import { Dropdown, Grid, Paragraph } from '@growth-ui/react';

const options = [
  {
    key: 'sales,desc',
    text: 'Most Popular',
    value: 'sales,desc',
  },
  {
    key: 'amount,asc',
    text: 'Price: Low to High',
    value: 'amount,asc',
  },
  {
    key: 'amount,desc',
    text: 'Price: High to Low',
    value: 'amount,desc',
  },
];

export default function ItemListHeader({
  total,
  setSortBy,
}: {
  total: number;
  setSortBy: any;
}) {
  return (
    <Grid.Row verticalAlign="middle" horizontalAlign="space-between">
      <Paragraph fontWeight={600}>Total {total}</Paragraph>
      <Dropdown
        space
        defaultValue={options[0].value}
        direction="right"
        options={options}
        onAddItem={(_, { value }) => {
          setSortBy(value);
        }}
        style={{
          zIndex: 9000,
        }}
      />
    </Grid.Row>
  );
}
