import AppContext from '@/modules/components/AppContext';
import CategoriesVertical from '../brands/CategoriesVertical';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import {
  EventListener,
  Grid as GuiGrid,
  Image,
  ImageList,
  List,
  Paragraph,
  Ref,
  Skeleton,
  Spacer,
} from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetAffiliatesQuery, useGetBrandsQuery } from '@/services';
import { some } from 'lodash';
import { Category } from '@prisma/client';
import Grid from '@/modules/components/Grid';
import CategoriesHorizontal from '../brands/CategoriesHorizontal';
import Link from 'next/link';

// Show affiliate coupons only when the user clicks Affiliate Brands nav

const Nav = styled('nav')``;

const NavHeader = styled.p`
  font-size: 22px;
  font-weight: 500;
  line-height: var(--leading-normal);
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  &:hover {
    color: #F6A2B1;
    transform: scale(1.1);
    text-decoration: underline;
  }
`;

const Wrapper = styled.div`
  max-width: 100vw;
  overflow-x: auto;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImgListItem = styled(ImageList.Item)`
  padding: 10px;
  transition: all 0.7s ease-in-out;

  &:hover {
    box-shadow: rgb(0 0 0 / 15%) -3px 3px 5px 2px;
    cursor: pointer;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    padding: 0;
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

  const { data, loading } = useGetAffiliatesQuery({
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
        <GuiGrid.Col flex="1" style={{marginLeft: "40px"}}>
          <Nav>
            <List horizontal>
              <List.Item>
                <Link href={ROUTES.gcoupons}>
                  <NavHeader>
                    Show All
                  </NavHeader>
                </Link>
              </List.Item>
              <Spacer size={30} />
    
              <List.Item>
                {country === 'US' && (
                  <Link href={ROUTES.brands}>
                    <NavHeader>
                      Big Brands
                    </NavHeader>
                  </Link>
                )}
              </List.Item>
              <Spacer size={30} />
                
              <List.Item>
                {country === 'US' && (
                  <Link href={ROUTES.affiliates}>
                    <NavHeader style={{color: "#F6A2B1"}}>
                      Affiliate Brands
                    </NavHeader>
                  </Link>
                )}
              </List.Item>
            </List>
          </Nav>

          {/* <Paragraph fontWeight={700} fontSize={22}>
            {cat?.name || 'All'}
          </Paragraph>
          <Spacer size={15} /> */}
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
                <ImgListItem
                  key={brand.id}
                  onClick={() => Router.push(`${ROUTES.affiliates}/${brand.slug}`)}
                >
                  <Ref innerRef={ref}>
                    <ImageList.ItemBar
                      title={brand.name}
                      thumbnail={brand.thumbnailUrl}
                    />
                  </Ref>
                  <Image
                    src={brand.backgroundUrl}
                    alt='Affiliate'
                    style={{
                      height: `${height}px`,
                    }}
                  />
                  <Description>{brand.description}</Description>
                </ImgListItem>
              ))}
            </ImageList>
          </Wrapper>
        </GuiGrid.Col>
      </GuiGrid.Row>
    </>
  );
}
