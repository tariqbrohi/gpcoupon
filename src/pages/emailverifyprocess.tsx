import Head from 'next/head';
import Image from 'next/image';
import Logo from '@/asset/logo.png';
import { Typography, Grid, Box } from '@mui/material';
import NextImage from 'next/image';
import { useStyles } from '../styles/pages/Emailverifyprocess';
import CONTACT from '../asset/contact.svg';
import Layout from '@/components/layout/Layout';
import DetailsCard from '../components/DetailsCard';

export default function Home() {
  const classes = useStyles();

  return (
    <Layout>
      <div className={classes.emailverifyprocessContainer}>
        <div className={classes.emailverifyprocessLogo}>
          <Image alt={`image`} src={Logo}></Image>
        </div>
        <Typography variant="h4">Social login in process</Typography>
      </div>
    </Layout>
  );
}
