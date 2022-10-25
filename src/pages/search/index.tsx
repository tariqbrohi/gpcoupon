import Head from '@/modules/components/Head';
import ItemList from '@/modules/components/ItemList';
import React from 'react';
import SearchForm from '@/components/search/SearchForm';
import SearchHistory from '@/components/search/SearchHistory';
import { Padding, Spacer } from '@growth-ui/react';
import { useSearchResultItemsLazyQuery } from '@/services';
import AppHeader from '@/layouts/AppHeader';
import AppContainer from '@/layouts/AppContainer';
import AppMain from '@/layouts/AppMain';
import AppNav from '@/layouts/AppNav';
import styled from 'styled-components';
import SearchByCategory from '@/components/search/SearchByCategory';

const AppContainerCustom = styled(AppContainer)`
  ${({ theme }) => theme.gui.media.mobile} {
    padding-bottom: 0;
  }
`;

export default function SearchPage() {
  const [search, { data, loading }] = useSearchResultItemsLazyQuery();

  return (
    <>
      <Head title="GPcoupon | Search" />
      <AppHeader bgTransition hideOnMobile={false} />
      <AppMain>
        <AppContainerCustom>
          {/* <Padding all={1}> */}
          <Spacer size={50} />

          <SearchForm search={search} />
          <Spacer size={30} />
          {/* <SearchByCategory />
            <Spacer size={30} /> */}

          <ItemList loading={loading} items={data || []} />
          <Spacer size={40} />

          <SearchHistory search={search} />
          {/* </Padding> */}
        </AppContainerCustom>
      </AppMain>
      <AppNav />
    </>
  );
}
