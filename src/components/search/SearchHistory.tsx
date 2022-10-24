import AppContext from '@/modules/components/AppContext';
import React, { useContext } from 'react';
import { Grid, Icon, List, Paragraph, Spacer } from '@growth-ui/react';
import { useSearchItemsLazyQuery, useSearchResultItemsLazyQuery } from '@/services';

type Props = {
  search: ReturnType<typeof useSearchResultItemsLazyQuery>[0];
};

export default function SearchHistory({ search }: Props) {
  const { country, searchHistories, setSearchHistories } =
    useContext(AppContext);

  const clearAll = () => setSearchHistories([]);

  const handleClickTransh = (pos: number) => () => {
    setSearchHistories(searchHistories.filter((_, i) => i !== pos));
  };

  const handleClickItem = (searchQuery: string) => () => {
    search({
      data: {
        country,
        searchQuery,
      },
    });
  };

  return (
    <>
      <Grid.Row horizontalAlign="space-between" verticalAlign="middle">
        <Grid.Col>
          <Paragraph style={{ fontWeight: 600 }}>
            Recent Search Keywords
          </Paragraph>
        </Grid.Col>
        <Grid.Col>
          <Paragraph
            fontSize="sm"
            style={{ cursor: 'pointer' }}
            onClick={clearAll}
          >
            Clear All
          </Paragraph>
        </Grid.Col>
      </Grid.Row>
      <Spacer size={20} />

      <List selection padded>
        {searchHistories.map((history, idx) => (
          <List.Item key={history}>
            <Grid.Row horizontalAlign="space-between" verticalAlign="middle">
              <Grid.Col flex="1" onClick={handleClickItem(history)}>
                {history}
              </Grid.Col>
              <Icon
                name="trash"
                width="18px"
                onClick={handleClickTransh(idx)}
              />
            </Grid.Row>
          </List.Item>
        ))}
      </List>
    </>
  );
}
