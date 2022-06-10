import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Logo from '@/asset/logo.png';
import NextLink from 'next/link';
import {
  Typography,
  Grid,
  Box,
  Input,
  InputAdornment,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import NextImage from 'next/image';
import { useStyles } from '../styles/pages/SignUpAndLoginAndSignupCompleted';
import facebook from '../asset/facebook.svg';
import google from '../asset/google.svg';
import girl from '../asset/girl3x.png';
import boy from '../asset/boy3x.png';
import man from '../asset/man3x.png';
import logo from '../asset/logo.png';
import Layout from '@/components/layout/Layout';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <section className={classes.signUpContainer}>
      <div className={classes.leftWrapper}>
        <div className={classes.imageWrapper}>
          <Image src={man}></Image>
          <Image src={boy}></Image>
          <Image src={girl}></Image>
        </div>
      </div>
      <div className={classes.rightWrapper}>
        <div className={classes.rightHeader}>
          <div className={classes.headerLogo}>
            <Image
              onClick={() => router.push('/')}
              style={{ cursor: 'pointer' }}
              src={logo}
            ></Image>
          </div>
          <div className={classes.headerInnerRight}>
            <Typography variant="h6" component="span">
              Already Registered?{' '}
            </Typography>
            <NextLink href="/login">
              <button className={classes.loginButton}>Login</button>
            </NextLink>
          </div>
        </div>
        <div className={classes.rightMain}>
          <Typography
            variant="h4"
            style={{ width: 'fit-content', fontWeight: 'bold' }}
          >
            Sign up
          </Typography>
          <Typography variant="h6" style={{ width: 'fit-content' }}>
            Welcome to SodaGift
          </Typography>
          <button className={classes.rightMainLoginEmailButton}>
            Sign up with E-mail
          </button>
          <Divider style={{ width: '100%' }}>OR</Divider>
          <button className={classes.rightMainLoginGoogleButton}>
            <Image src={google}></Image>
            <span>Continue With Google</span>
          </button>
          <button className={classes.rightMainLoginFacebookButton}>
            <Image src={facebook}></Image>
            <span>Continue With Facebook</span>{' '}
          </button>
        </div>
      </div>
    </section>
  );
}
