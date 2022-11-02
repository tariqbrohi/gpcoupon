import Head from '@/modules/components/Head';
import ItemList from '@/modules/components/ItemList';
import React, { useContext, useState } from 'react';
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
import { useRouter } from 'next/router';
import AppContext from '@/modules/components/AppContext';

interface Props {
  hideOnSearchPage?: boolean;
}

const AppHeaderSearchPage = styled(AppHeader)<Props>`
  display: ${({ hideOnSearchPage }) => (hideOnSearchPage ? 'none' : 'flex')};
`;

const AppContainerCustom = styled(AppContainer)`
  ${({ theme }) => theme.gui.media.mobile} {
    padding-bottom: 0;
  }
`;

export default function SearchPage() {
  const [search, { data, loading }] = useSearchResultItemsLazyQuery();
  const [searchValue, setSearchValue] = useState('');
  const { country, searchHistories, setSearchHistories } = useContext(AppContext);
  const router = useRouter();
  
  // setSearchHistories([
  //   ...searchHistories, 
  //   searchValue
  // ]);

  // search({
  //   data: {
  //     country,
  //     searchQuery: searchValue,
  //   },
  // });

  return (
    <>
      <Head title="GPcoupon | Search" />
      <AppHeaderSearchPage bgTransition hideOnMobile={false} hideOnSearchPage={true} />
      <AppMain>
        <AppContainerCustom>
          {/* <Padding all={1}> */}
          <Spacer size={50} />
          {console.log('Search Page router.query: ', router.query)}
          
          {/* <SearchForm search={search} />
          <Spacer size={30} /> */}

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