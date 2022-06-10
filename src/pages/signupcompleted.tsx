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

import verified_email from '../asset/verified_email.svg';
import girl from '../asset/girl3x.png';
import boy from '../asset/boy3x.png';
import man from '../asset/man3x.png';
import logo from '../asset/logo.png';
import Layout from '@/components/layout/Layout';
import SearchOutlined from '@mui/icons-material/SearchOutlined';

export default function SignupCompleted() {
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
            <NextLink href="/login">
              <button className={classes.loginButton}>Login</button>
            </NextLink>
          </div>
        </div>
        <div className={classes.rightMain}>
          <div
            className={classes.emailVerifiedImage}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Image src={verified_email} />
          </div>
          <Typography
            variant="h4"
            style={{ width: 'fit-content', fontWeight: 'bold' }}
          >
            Thank you!
          </Typography>
          <Typography
            variant="h6"
            style={{
              width: 'fit-content',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            Your email address has been successfully verified
          </Typography>
          <button className={classes.rightMainLoginEmailButton}>Confirm</button>
        </div>
      </div>
    </section>
  );
}
