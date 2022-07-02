import AppContext from '@/modules/components/AppContext';
import { Grid, Icon, List, Paragraph, Spacer } from '@growth-ui/react';
import React, { useContext } from 'react';

export default function SearchHistory() {
  const { searchHistories, setSearchHistories } = useContext(AppContext);

  const clearAll = () => setSearchHistories([]);

  return (
    <>
      <Grid.Row horizontalAlign="space-between">
        <Grid.Col>
          <Paragraph style={{ fontWeight: 600 }}>Recent Searches</Paragraph>
        </Grid.Col>
        <Grid.Col>
          <Paragraph onClick={clearAll}>Clear All</Paragraph>
        </Grid.Col>
      </Grid.Row>
      <Spacer size={20} />
      <List selection>
        {searchHistories.map((history) => (
          <List.Item key={history}>
            <Grid.Row horizontalAlign="space-between" verticalAlign="middle">
              <div>
                <Icon name="inbox" />
                <Spacer inline axis="horizontal" size={8} />
                {history}
              </div>
            </Grid.Row>
          </List.Item>
        ))}
      </List>
    </>
  );
}
