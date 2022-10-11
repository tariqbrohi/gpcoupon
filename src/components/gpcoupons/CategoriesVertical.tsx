import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon, List, Skeleton } from '@growth-ui/react';
import { useGetCategoriesQuery } from '@/services';

const WrapperContainer = styled.div`
  padding: 30px 20px;
  background-color: #F6F6F6;
`;

const Wrapper = styled.div`
  font-weight: 600;
  // margin-right: 40px;
  min-width: 221.98px;
  background-color: #FFF;
  box-shadow: 2px 5px 10px #C0C0C0;
  padding: 10px 0;

  & li {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;

export default function CategoriesVertical({
  cat: _cat,
  setCat,
  loading,
}: any) {
  const { data } = useGetCategoriesQuery();
  return (
    <WrapperContainer>
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
    </WrapperContainer>
  );
}
