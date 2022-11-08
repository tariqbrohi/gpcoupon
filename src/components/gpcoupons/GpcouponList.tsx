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
  List,
  Paragraph,
  Ref,
  Skeleton,
  Spacer,
  StyledGridCol,
  StyledGridRow,
  StyledParagraph,
} from '@growth-ui/react';
import { ROUTES } from '@/ROUTES';
import { useGetAffsAndBrandsQuery } from '@/services';
import { some } from 'lodash';
import { Category } from '@prisma/client';
import CategoriesHorizontal from './CategoriesHorizontal';
import Grid from '@/modules/components/Grid';
import Link from 'next/link';

const MobileNoSpacer = styled(Spacer)`
  ${({ theme }) => theme.gui.media.mobile} {
    display: none;
  }
`;

const Nav = styled('nav')`
  padding-left: 10px;

  ${({ theme }) => theme.gui.media.mobile} {
    padding-left: 0;
  }
`;

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

const TotalCountPara = styled(Paragraph)`
  padding-left: 10px;
  font-weight: 500;

  ${({ theme }) => theme.gui.media.mobile} {
    padding-left: 0;
  }
`;

const Wrapper = styled.div`
  max-width: 100vw;
  overflow-x: auto;
  width: 100%;
  padding: 10px;

  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    padding-left: 0;
  }
`;

const ImageListCustom = styled(ImageList)`
  grid-template-columns: repeat(3,1fr);
  grid-gap: 20px;

  ${({ theme }) => theme.gui.media.custom(1155)} {
    grid-template-columns: repeat(2,1fr);
  }
`;

const ImgListItem = styled(ImageList.Item)`
  padding: 10px;
  transition: all 0.7s ease-in-out;
  max-width: 250px;
  max-height: 350px;

  &:hover {
    box-shadow: rgb(0 0 0 / 15%) -3px 3px 5px 2px;
    cursor: pointer;
  }

  ${({ theme }) => theme.gui.media.custom(820)} {
    max-width: 200px;
  }

  ${({ theme }) => theme.gui.media.custom(768)} {
    max-width: 178px;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    padding: 0;
  }
`;

const ImgListItemBar = styled(ImageList.ItemBar)`
  ${StyledGridRow} {
    // align-items: flex-start;
  }

  ${StyledGridCol} {
    flex: 1;
    display: inline-block;
    max-width: 160px;
    max-height: 48px;

    ${({ theme }) => theme.gui.media.custom(820)} {
      max-width: 120px;
    }

    ${({ theme }) => theme.gui.media.custom(768)} {
      max-width: 166px;
    }

    ${({ theme }) => theme.gui.media.mobile} {
      max-height: 100%;
    }
  }

  ${StyledParagraph} {
    text-overflow: ellipsis;
    max-width: 145px;
    max-height: 24px;
    overflow: hidden;
    white-space: nowrap;

    ${({ theme }) => theme.gui.media.custom(820)} {
      max-width: 180px;
    }

    ${({ theme }) => theme.gui.media.custom(768)} {
      max-width: 168px;
    }
  }
`;

const Description = styled.div`
  display: inline-block;
  text-overflow: ellipsis;
  max-width: 228px;
  height: 24px;
  overflow: hidden;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.5);

  ${({ theme }) => theme.gui.media.custom(820)} {
    max-width: 180px;
  }

  ${({ theme }) => theme.gui.media.custom(768)} {
    max-width: 158px;
  }

  ${({ theme }) => theme.gui.media.mobile} {
    display: none;
  }
`;

export default function GcouponList() {
  const { country } = useContext(AppContext);
  const [height, setHeight] = useState(155);

  const { data, loading } = useGetAffsAndBrandsQuery({
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
      // console.log(ref.current.clientWidth);
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

        <GuiGrid.Col flex="1" style={{marginLeft: "30px", overflow: "auto"}}>
          <Nav>
            <List 
              horizontal 
              style={{flexWrap: "nowrap", justifyContent: "center",}}
            >
              <List.Item>
                <Link href={ROUTES.gpcoupons}>
                  <NavHeader style={{color: "#F6A2B1"}}>
                    Show All
                  </NavHeader>
                </Link>
              </List.Item>
              <Spacer size={30} />
    
              <List.Item>
                <Link href={ROUTES.brands}>
                  <NavHeader>
                    Big Brands
                  </NavHeader>
                </Link>
                {/* {country === 'US' && (s
                  <Link href={ROUTES.brands}>
                    <NavHeader>
                      Big Brands
                    </NavHeader>
                  </Link>
                )} */}
              </List.Item>
              <Spacer size={30} />
                
              <List.Item>
                <Link href={ROUTES.affiliates}>
                  <NavHeader>
                    Affiliate Brands
                  </NavHeader>
                </Link>
                {/* {country === 'US' && (
                  <Link href={ROUTES.affiliates}>
                    <NavHeader>
                      Affiliate Brands
                    </NavHeader>
                  </Link>
                )} */}
              </List.Item>
            </List>
          </Nav>

          <TotalCountPara>
            Total {filteredBrands?.length || 0}
          </TotalCountPara>
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
            <ImageListCustom
              // cols={3}
              // gap={20}
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
                  // onClick={() => Router.push(`${ROUTES.brands}/${brand.slug}`)}
                  onClick={() => Router.push(`${brand.affiliate ? `${ROUTES.affiliates}` : `${ROUTES.brands}`}/${brand.slug}`)}
                >
                  <Ref innerRef={ref}>
                    <ImgListItemBar
                      title={brand.name}
                      thumbnail={brand.thumbnailUrl}
                    />
                  </Ref>
                  <MobileNoSpacer size={15} />
                  <Image
                    src={brand.backgroundUrl}
                    alt='Brands'
                    style={{
                      height: `${height}px`,
                    }}
                  />
                  <MobileNoSpacer size={15} />
                  <Description>
                    {brand.description}
                  </Description>
                </ImgListItem>
              ))}
            </ImageListCustom>
          </Wrapper>
        </GuiGrid.Col>
      </GuiGrid.Row>
    </>
  );
}
