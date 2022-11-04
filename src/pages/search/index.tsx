import Head from '@/modules/components/Head';
import ItemList from '@/modules/components/ItemList';
import React, { useContext, useEffect, useState } from 'react';
import SearchForm from '@/components/search/SearchForm';
import SearchHistory from '@/components/search/SearchHistory';
import { Heading, Spacer } from '@growth-ui/react';
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

const MobileSpacer = styled(Spacer)`
  display: none;

  ${({ theme }) => theme.gui.media.custom(767)} {
    display: block;
  }
`;

const AppHeaderSearchPage = styled(AppHeader)<Props>`
  display: ${({ hideOnSearchPage }) => (hideOnSearchPage ? 'none' : 'flex')};
`;

const AppContainerCustom = styled(AppContainer)`
  ${({ theme }) => theme.gui.media.mobile} {
    padding-bottom: 0;
  }
`;

const HeadingCustom = styled(Heading)`
  ${({ theme }) => theme.gui.media.mobile} {
    display: none;
  }
`;

export default function SearchPage() {
  const [search, { data, loading }] = useSearchResultItemsLazyQuery();
  const { country, searchHistories, setSearchHistories } = useContext(AppContext);
  const router = useRouter();

  const searchKeyword: any = router.query.searchValue;

  useEffect(() => {
    setSearchHistories([
      ...searchHistories, 
      searchKeyword
    ]);
  
    search({
      data: {
        country,
        searchQuery: searchKeyword,
      },
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword]);

  return (
    <>
      <Head title="GPcoupon | Search" />
      <AppHeaderSearchPage bgTransition hideOnMobile={false} hideOnSearchPage={true} />
      <AppMain>
        <AppContainerCustom>
          <Spacer size={50} />

          <SearchForm search={search} />
          <MobileSpacer size={30} />

          <HeadingCustom as='h1'>
            Results for "{searchKeyword}".
          </HeadingCustom>

          {/* <SearchByCategory />
          <Spacer size={30} /> */}

          <ItemList loading={loading} items={data || []} />
          <Spacer size={40} />

          <SearchHistory search={search} />
          
        </AppContainerCustom>
      </AppMain>
      <AppNav />
    </>
  );
}