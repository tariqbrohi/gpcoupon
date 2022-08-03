import AppContext from '@/modules/components/AppContext';
import CategoriesVertical from './CategoriesVertical';
import React, { useContext, useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import {
  Grid,
  Image,
  ImageList,
  Paragraph,
  Skeleton,
  Spacer,
} from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetBrandsQuery } from '@/services';
import { some } from 'lodash';
import { Category } from '@prisma/client';
import CategoriesHorizontal from './CategoriesHorizontal';

const Wrapper = styled.div`
  max-width: 100vw;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Description = styled.div`
  margin-top: 15px;
  color: rgba(0, 0, 0, 0.5);

  ${({ theme }) => theme.gui.media.mobile} {
    display: none;
  }
`;

export default function BrandList() {
  const { country } = useContext(AppContext);
  const { data, loading } = useGetBrandsQuery({
    data: {
      country,
    },
  });
  const [cat, setCat] = useState<Category>();

  const filteredBrands = data?.filter(
    (brand) => !cat || some(brand.categoryIDs, (id) => id === cat?.id),
  );

  return (
    <>
      <Grid.Row>
        <Grid.Col only={['computer', 'widescreen', 'laptop', 'tablet']}>
          <CategoriesVertical cat={cat} setCat={setCat} />
        </Grid.Col>
        <Grid.Col only={['mobile', 'minimobile']}>
          <CategoriesHorizontal cat={cat} setCat={setCat} />
        </Grid.Col>
        <Spacer size={15} />
        <Grid.Col flex="1">
          <Paragraph fontWeight={700} fontSize={22}>
            {cat?.name || 'All'}
          </Paragraph>
          <Spacer size={15} />
          <Paragraph fontWeight={500}>
            Total {filteredBrands?.length || 0}
          </Paragraph>
          <Spacer size={30} />
          <Wrapper>
            <ImageList
              cols={3}
              gap={20}
              responsive={{
                mobile: {
                  breakpoint: 767,
                  min: 210,
                },
              }}
            >
              {filteredBrands?.map((brand) => (
                <ImageList.Item
                  key={brand.id}
                  onClick={() => Router.push(`${ROUTES.brands}/${brand.slug}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <ImageList.ItemBar
                    title={brand.name}
                    thumbnail={brand.thumbnailUrl}
                  />
                  <Image src={brand.backgroundUrl} />
                  <Description>{brand.description}</Description>
                </ImageList.Item>
              ))}
            </ImageList>
          </Wrapper>
        </Grid.Col>
      </Grid.Row>
    </>
  );
}
