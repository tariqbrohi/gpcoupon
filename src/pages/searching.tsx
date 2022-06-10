import {useRouter} from "next/router"
import Head from 'next/head';
import Image from 'next/image';
import Logo from '@/asset/logo.png';
import NextLink from "next/link";
import { Typography,Grid,Box,Input,InputAdornment ,Chip} from '@mui/material';
import NextImage from "next/image"
import { useStyles } from '../styles/pages/Searching';
import category from "../asset/categories_kr.png"
import brand from "../asset/brands_kr.png"
import Layout from '@/components/layout/Layout';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

export default function Home() {
    const classes = useStyles();
    const router = useRouter()
  return (
        <div className={classes.searchingcontainer}>
            <div className={classes.searchOuterWrapper}>

        <div className={classes.searchInputWrapper}>
        <SearchOutlined/>
        <input
          className={classes.searchInput}
          placeholder="Search gifts or brands"
  
        ></input>
        </div>
        
            <button onClick={()=>router.back()} className={classes.searchInputButton}>Cancel</button>
        
            </div>
        <div  className={classes.searchMiniBnnerWrapper}>
            <div style={{backgroundImage:`linear-gradient(0deg, rgba(0,0,0,.45), rgba(0,0,0,.45)), url(/asset/categories_kr.png) `}} className={classes.searchMiniBanner}>
                <Typography className={classes.searchMiniBannerText} variant="h6">Category</Typography>
            </div>
            <div style={{backgroundImage:`linear-gradient(0deg, rgba(0,0,0,.45), rgba(0,0,0,.45)), url(/asset/brands_kr.png)`}} className={classes.searchMiniBanner}>
                <Typography className={classes.searchMiniBannerText} variant="h6">Brand</Typography>
            </div>
        </div>
        <div className={classes.SuggestionWrapper}>
            <Typography variant='h5' className={classes.SuggestionTitle} >Suggested searches</Typography>
            <div className={classes.SuggestionChipWrapper}>{[1,2,3,4,5,6,7,8,9,10,11,12].map(()=>(<Chip label="Small" size="medium" variant="outlined" onClick={()=>{}} />))}</div>
        </div>
        <div className={classes.recentSearchWrapper}>
            <Typography variant='h5' className={classes.recentSearchTitle} >Recent Searches</Typography>
            <Typography variant='h5'  >No recent searches</Typography>
            {/* <div className={classes.recentSearchChipWrapper}>{[1,2,3,4,5,6,7,8,9,10,11,12].map(()=>(<Chip label="Small" size="medium" variant="outlined" onClick={()=>{}} />))}</div> */}
        </div>
        </div>
  );
}
