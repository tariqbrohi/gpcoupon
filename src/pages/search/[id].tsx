import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { KeyboardArrowDown } from '@mui/icons-material';
import Logo from '@/asset/logo.png';
import { Typography, Grid, Box } from '@mui/material';
import { useRouter } from 'next/router';

import { useStyles } from '../../styles/pages/singleCategoryList';
import Layout from '@/components/layout/Layout';
import BrandCard from '../../components/BrandCard';
import category1 from '../../asset/category19.jpg';
import category2 from '../../asset/category20.jpg';
import category3 from '../../asset/category21.jpg';
import category4 from '../../asset/category22.jpg';
import category5 from '../../asset/category23.jpg';
import category6 from '../../asset/category24.jpg';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getSearchedProducts, getVouchers } from '@/redux/actions/authActions';
import { AppContextInterface } from '@/annotations/types';
import AppContext from '@/providers/app-context';

export default function Home() {
    const { country } = useContext(AppContext) as AppContextInterface;
    const classes = useStyles();
    const router = useRouter();
    const { id }: any = router.query;
    const [VoucherData, setVoucherData] = useState([]);


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log('VoucherData', VoucherData)

    const getData = async () => {
        const code: any = id;
        const resp = await getSearchedProducts(code, country);
        // const resp = await getSearchedProducts(code, country);
        setVoucherData(resp);
    };

    useEffect(() => {
        getData();
    }, [country]);

    return (
        <Layout>
            <div className={classes.layoutWrapper}>
                <div className={classes.singleCategoriesContainer}>

                    <div className={classes.singleCategoriesContainerMain}>
                        <div className={classes.singleCategoriesContainerMainHeader}>
                            <Typography variant="h6">Result {VoucherData?.length}</Typography>
                            {/* <Button
                                id="basic-button"
                                aria-controls={open ? `basic-menu` : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? `true` : undefined}
                                onClick={handleClick}
                                style={{ color: `black` }}
                                disableRipple
                                endIcon={<KeyboardArrowDown style={{ color: `black` }} />}
                            >
                                Most Popular
                            </Button> */}
                            {/* <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': `basic-button`,
                }}
              >
                <MenuItem onClick={handleClose}>Most Popular</MenuItem>
                <MenuItem onClick={handleClose}>Price: Low to High</MenuItem>
                <MenuItem onClick={handleClose}>Price: High to Low</MenuItem>
              </Menu> */}
                        </div>
                        <div className={classes.root}>
                            <div className={classes.productsContainer}>
                                {VoucherData?.map((item: any, index: number) => (
                                    <div key={index} className={classes.brandCard}>
                                        <BrandCard data={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
