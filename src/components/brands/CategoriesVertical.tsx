import { useGetCategoriesQuery } from '@/services';
import { Icon, List } from '@growth-ui/react';
import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-weight: 600;
  margin-right: 40px;

  & li {
    margin-bottom: 20px;
  }
`;

export default function CategoriesVertical({ cat: _cat, setCat }: any) {
  const { data } = useGetCategoriesQuery();
  return (
    <Wrapper>
      <List selection padded>
        <List.Item active={!_cat} onClick={() => setCat()}>
          <Icon name="category" />
          <List.Content>All</List.Content>
        </List.Item>
        {data?.map((cat) => (
          <List.Item
            active={_cat?.id === cat.id}
            key={cat.id}
            onClick={() => setCat(cat)}
          >
            <List.Content>{cat.name}</List.Content>
          </List.Item>
        ))}
      </List>
    </Wrapper>
  );
}
