import AppContext from '@/modules/components/AppContext';
import CategoriesVertical from './CategoriesVertical';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import {
  EventListener,
  Grid as GuiGrid,
  Image,
  ImageList,
  Paragraph,
  Ref,
  Skeleton,
  Spacer,
} from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetBrandsQuery } from '@/services';
import { some } from 'lodash';
import { Category } from '@prisma/client';
import CategoriesHorizontal from './CategoriesHorizontal';
import Grid from '@/modules/components/Grid';

const Wrapper = styled.div`
  max-width: 100vw;
  overflow-x: auto;
  width: 100%;

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
  const [height, setHeight] = useState(155);
  const { data, loading } = useGetBrandsQuery({
    data: {
      country,
    },
  });
  const ref = useRef<HTMLElement>(null);
  const [cat, setCat] = useState<Category>();

  useEffect(() => {
    handleResize();
  }, []);

  const filteredBrands = data?.filter(
    (brand) => !cat || some(brand.categoryIDs, (id) => id === cat?.id),
  );

  const handleResize = () => {
    if (ref.current) {
      console.log(ref.current.clientWidth);
      setHeight(ref.current.clientWidth * 0.564);
    }
  };

  return (
    <>
      <EventListener name="resize" listener={handleResize} target="window" />
      <GuiGrid.Row>
        <GuiGrid.Col only={['computer', 'widescreen', 'laptop', 'tablet']}>
          <CategoriesVertical loading={loading} cat={cat} setCat={setCat} />
        </GuiGrid.Col>
        <GuiGrid.Col only={['mobile', 'minimobile']}>
          <CategoriesHorizontal cat={cat} setCat={setCat} />
        </GuiGrid.Col>
        <Spacer size={15} />
        <GuiGrid.Col flex="1">
          <Paragraph fontWeight={700} fontSize={22}>
            {cat?.name || 'All'}
          </Paragraph>
          <Spacer size={15} />
          <Paragraph fontWeight={500}>
            Total {filteredBrands?.length || 0}
          </Paragraph>
          <Spacer size={30} />
          <Wrapper>
            {loading && (
              <>
                <GuiGrid.Col
                  only={['computer', 'widescreen', 'laptop', 'tablet']}
                >
                  <Grid repeat={3} style={{ width: '100%' }}>
                    {new Array(20).fill(0).map((_, i) => (
                      <GuiGrid.Col key={i} flex="1">
                        <div
                          style={{
                            position: 'relative',
                            paddingTop: '100%',
                            width: '100%',
                          }}
                        >
                          <Skeleton
                            width="100%"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                            }}
                          />
                        </div>
                        <Spacer size={5} />
                        <Skeleton width="100px" height="0.5em" />
                      </GuiGrid.Col>
                    ))}
                  </Grid>
                </GuiGrid.Col>
                <GuiGrid.Col only={['mobile', 'minimobile']}>
                  <GuiGrid.Row
                    flex="1"
                    wrap="nowrap"
                    style={{ maxHeight: '226px' }}
                  >
                    {new Array(5).fill(0).map((_, i) => (
                      <GuiGrid.Col
                        key={i}
                        style={{
                          marginRight: '20px',
                        }}
                      >
                        <div
                          style={{
                            position: 'relative',
                            paddingTop: '100%',
                            width: '210px',
                            height: '226px',
                          }}
                        >
                          <Skeleton
                            width="100%"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                            }}
                          />
                        </div>
                      </GuiGrid.Col>
                    ))}
                  </GuiGrid.Row>
                </GuiGrid.Col>
              </>
            )}
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
                  <Ref innerRef={ref}>
                    <ImageList.ItemBar
                      title={brand.name}
                      thumbnail={brand.thumbnailUrl}
                    />
                  </Ref>
                  <Image
                    src={brand.backgroundUrl}
                    style={{
                      height: `${height}px`,
                    }}
                  />
                  <Description>{brand.description}</Description>
                </ImageList.Item>
              ))}
            </ImageList>
          </Wrapper>
        </GuiGrid.Col>
      </GuiGrid.Row>
    </>
  );
}
