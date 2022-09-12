import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon, List, Skeleton } from '@growth-ui/react';
import { useGetCategoriesQuery } from '@/services';

const Wrapper = styled.div`
  font-weight: 600;
  margin-right: 40px;
  min-width: 221.98px;

  & li {
    margin-bottom: 20px;
  }
`;

export default function CategoriesVertical({
  cat: _cat,
  setCat,
  loading,
}: any) {
  const { data } = useGetCategoriesQuery();
  return (
    <Wrapper>
      <List selection padded>
        <List.Item active={!_cat} onClick={() => setCat()}>
          <Icon name="category" />
          <List.Content>All</List.Content>
        </List.Item>
        {loading &&
          new Array(20).fill(0).map((_, idx) => (
            <List.Item key={idx}>
              <List.Content>
                <Skeleton width="200px" height="1em" />
              </List.Content>
            </List.Item>
          ))}
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
