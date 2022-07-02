import AppContainer from '@/layouts/AppContainer';
import AppHeader from '@/layouts/AppHeader';
import AppMain from '@/layouts/AppMain';
import Head from '@/modules/components/Head';
import ItemList from '@/components/categories/ItemList';
import React from 'react';

export default function Category() {
  return (
    <>
      <Head title={`GCoupon`} />
      <AppHeader hideOnMobile bgTransition={false} />
      <AppMain>
        <AppContainer>
          <ItemList />
        </AppContainer>
      </AppMain>
    </>
  );
}

// import React, { useContext, useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import Image from 'next/image';
// import { KeyboardArrowDown } from '@mui/icons-material';
// import Logo from '@/asset/logo.png';
// import { Typography, Grid, Box } from '@mui/material';
// import { useRouter } from 'next/router';

// import { useStyles } from '../../styles/pages/singleCategoryList';
// import Layout from '@/components/layout/Layout';
// import BrandCard from '../../components/BrandCard';
// import category1 from '../../asset/category19.jpg';
// import category2 from '../../asset/category20.jpg';
// import category3 from '../../asset/category21.jpg';
// import category4 from '../../asset/category22.jpg';
// import category5 from '../../asset/category23.jpg';
// import category6 from '../../asset/category24.jpg';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import { getVouchers } from '@/redux/actions/authActions';
// import { AppContextInterface } from '@/annotations/types';
// import AppContext from '@/providers/app-context';

// const Data = [
//   {
//     image: category1,
//     company: `Plants (Delivery)`,
//     price: `54.84`,
//     title: `Sansevieria Mini H`,
//   },
//   {
//     image: category2,
//     company: `Starbucks`,
//     price: `18.05`,
//     title: `Perfect Dessert Set`,
//   },
//   {
//     image: category3,
//     company: `Emart`,
//     price: `84.37`,
//     title: `₩100,000 Gift Card`,
//   },
//   {
//     image: category4,
//     company: `BHC (Chicken)`,
//     price: `21.94`,
//     title: `Bburinkle Chicken + Bburinkle Cheese Ball + Coke 1.25L`,
//   },
//   {
//     image: category5,
//     company: `Plants (Delivery)`,
//     price: `54.84`,
//     title: `Sansevieria Mini H`,
//   },
//   {
//     image: category6,
//     company: `Starbucks`,
//     price: `18.05`,
//     title: `Perfect Dessert Set`,
//   },
//   {
//     image: category1,
//     company: `Emart`,
//     price: `84.37`,
//     title: `₩100,000 Gift Card`,
//   },
//   {
//     image: category2,
//     company: `BHC (Chicken)`,
//     price: `21.94`,
//     title: `Bburinkle Chicken + Bburinkle Cheese Ball + Coke 1.25L`,
//   },
// ];

// export default function Home() {
//   const { country } = useContext(AppContext) as AppContextInterface;
//   const classes = useStyles();
//   const router = useRouter();
//   const { id }: any = router.query;
//   const [VoucherData, setVoucherData] = useState([]);

//   const responsive = {
//     desktop: {
//       breakpoint: { max: 4000, min: 1024 },
//       items: 8,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 4,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 2,
//     },
//   };

//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const getData = async () => {
//     const code: any = id;
//     const resp = await getVouchers(code, country, `all`);
//     setVoucherData(resp);
//   };

//   useEffect(() => {
//     getData();
//   }, []);
//   console.log(VoucherData, ' VoucherData');
//   return (
//     <Layout>
//       <div className={classes.layoutWrapper}>
//         <div className={classes.singleCategoriesContainer}>
//           <div className={classes.singleCategoriesContainerHeader}>
//             {/* <div className={classes.singleCategoriesContainerHeaderImage1}>
//               <Image alt={"image"} src={shinshage}></Image>
//             </div>
//             <div className={classes.singleCategoriesContainerHeaderImage2}>
//               <Image alt={"image"} src={Pursegirl}></Image>
//             </div> */}
//           </div>

//           <div className={classes.singleCategoriesContainerMain}>
//             {/* <div className={classes.singleCategoriesContainerMainHeader}>
//               <Typography variant="h6">Result {VoucherData?.length}</Typography>
//               <Button
//                 id="basic-button"
//                 aria-controls={open ? `basic-menu` : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={open ? `true` : undefined}
//                 onClick={handleClick}
//                 style={{ color: `black` }}
//                 disableRipple
//                 endIcon={<KeyboardArrowDown style={{ color: `black` }} />}
//               >
//                 Most Popular
//               </Button>
//               <Menu
//                 id="basic-menu"
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 MenuListProps={{
//                   'aria-labelledby': `basic-button`,
//                 }}
//               >
//                 <MenuItem onClick={handleClose}>Most Popular</MenuItem>
//                 <MenuItem onClick={handleClose}>Price: Low to High</MenuItem>
//                 <MenuItem onClick={handleClose}>Price: High to Low</MenuItem>
//               </Menu>
//             </div> */}
//             <div className={classes.root}>
//               <div className={classes.productsContainer}>
//                 {VoucherData?.map((item: any, index: number) => (
//                   <div key={index} className={classes.brandCard}>
//                     <BrandCard data={item} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }
