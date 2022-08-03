import { useGetCategoriesQuery } from '@/services';
import { Icon, List, Padding, Spacer, StyledPadding } from '@growth-ui/react';
import React, { useState } from 'react';
import styled from 'styled-components';

const Item = styled.li<{ active: boolean }>`
  cursor: pointer;
  border-radius: 500rem;
  ${({ active }) => active && 'background: #fff;'}
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  background: #ebebeb;
  max-width: 100vw;
  min-width: 100vw;
  margin-left: -8px;

  & > ul {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 8px 16px;
    overflow-x: auto;
    white-space: nowrap;
    list-style: none;
  }

  & > ul div {
    padding: 10px 20px;
    border-radius: 80px;
    font-size: 13px;
    font-weight: 600;
  }

  & > div {
    position: relative;
    display: flex;
    width: 50px;
    padding: 16px 14px;
    cursor: pointer;
  }

  & > ul::-webkit-scrollbar,
  ${StyledPadding}::-webkit-scrollbar {
    display: none;
  }
`;

const CategoryExpand = ({ categories, _cat, setCat, setExpand }: any) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        paddingBottom: '100px',
        background: '#fff',
        zIndex: 990,
      }}
    >
      <Padding
        fluid
        vertical={1}
        horizontal={0.5}
        style={{
          height: '100%',
          overflow: 'scroll',
        }}
      >
        <Icon name="close" onClick={() => setExpand(false)} />
        <Spacer size={30} />
        <List selection padded>
          <List.Item
            active={!_cat}
            onClick={() => {
              setCat();
              setExpand(false);
            }}
            style={{ marginBottom: '10px' }}
          >
            <Icon name="category" />
            <List.Content>All</List.Content>
          </List.Item>
          {categories?.map((cat: any) => (
            <List.Item
              active={_cat?.id === cat.id}
              key={cat.id}
              onClick={() => {
                setCat(cat);
                setExpand(false);
              }}
              style={{ marginBottom: '10px' }}
            >
              <List.Content>{cat.name}</List.Content>
            </List.Item>
          ))}
        </List>
      </Padding>
    </div>
  );
};

export default function CategoriesHorizontal({ cat: _cat, setCat }: any) {
  const { data } = useGetCategoriesQuery();
  const [expand, setExpand] = useState(false);

  return (
    <Wrapper>
      <ul>
        <Item active={!_cat} onClick={() => setCat()}>
          <div>All</div>
        </Item>
        {data?.map((cat) => (
          <Item
            active={cat.id === _cat?.id}
            key={cat.id}
            onClick={() => setCat(cat)}
          >
            <div>{cat.name}</div>
          </Item>
        ))}
      </ul>
      <div onClick={() => setExpand(true)}>
        <Icon name="chevron down" />
      </div>
      {expand && (
        <CategoryExpand
          categories={data}
          _cat={_cat}
          setCat={setCat}
          setExpand={setExpand}
        />
      )}
    </Wrapper>
  );
}
