import AppContext from "@/modules/components/AppContext";
import ItemList from "@/modules/components/ItemList";
import ItemListHeader from "@/modules/components/ItemListHeader";
import { useGetAffAndBrandItemsLazyQuery } from "@/services";
import { Grid, Image, Paragraph, Skeleton, Spacer } from "@growth-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function SearchItemList() {
    const {
        query: { slug },
    } = useRouter();
    const [sortBy, setSortBy] = useState('sales,desc');
    const { country } = useContext(AppContext);
    const [query, { data, loading }] = useGetAffAndBrandItemsLazyQuery({
        data: {
            slug,
            country,
        },
    });

    useEffect(() => {
        query({
            data: {
                sortBy,
                slug,
                country,
            },
        });
    }, [sortBy]);

    return (
        <>
            <Grid.Row wrap="wrap">
                <Grid.Col width={16} only={['tablet', 'mobile', 'minimobile']}>
                    {loading && (
                        <Skeleton
                            height={340}
                            style={{
                                width: 'calc(100% + 16px)',
                                maxWidth: 'none',
                                marginLeft: '-8px',
                                marginTop: '-50px',
                            }}
                        />
                    )}
                    {data?.backgroundUrl && (
                        <Image
                            src={data?.backgroundUrl!}
                            alt={data?.name}
                            style={{
                                width: 'calc(100% + 16px)',
                                maxWidth: 'none',
                                marginLeft: '-8px',
                                marginTop: '-50px',
                            }}
                        />
                    )}
                </Grid.Col>

                <Grid.Col only={['computer', 'widescreen', 'laptop']}>
                    <Image
                        rounded
                        size="small"
                        src={data?.thumbnailUrl!}
                        alt={data?.name}
                    />
                </Grid.Col>

                <Grid.Col mobile={16} minimobile={16}>
                    <Spacer size={30} />
                </Grid.Col>
                <Grid.Col flex="1" mobile={16} minimobile={16}>
                    <Paragraph fontWeight={700} fontSize={20}>
                        {data?.name}
                    </Paragraph>
                    <Paragraph fontWeight={600}>
                        {data?.description}
                    </Paragraph>
                </Grid.Col>
            </Grid.Row>
            <Spacer size={30} />

            <ItemListHeader 
                total={data?.items?.length || 0} 
                setSortBy={setSortBy} 
            />
            <ItemList loading={loading} items={data?.items} />
            <Spacer size={50} />
        </>
    );
}