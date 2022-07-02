import { useContext, useEffect, useState } from 'react';
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
  TextField,
  Divider,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useStyles } from '../styles/pages/SignUpAndLoginAndSignupCompleted';
import girl from '../asset/girl3x.png';
import boy from '../asset/boy3x.png';
import man from '../asset/man3x.png';
import AppContext from '@/providers/app-context';
import { AppContextInterface } from '@/annotations/types';
import { postLogin } from '@/redux/actions/authActions';
import Spacer from '@/components/Spacer';
import dynamic from 'next/dynamic';
import React from 'react';

function Login() {
  const classes = useStyles();
  const router = useRouter();
  const { setAuthenticated, setUser, setUserDetail } = useContext(
    AppContext,
  ) as AppContextInterface;

  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    try {
      setLoading(true);
      const response: any = await postLogin({
        username,
        password,
      });

      setUserDetail(response.user);
      // setBasicToken(response.token);
      // setAuthenticated(true);
      setUser(response.user.id);

      setLoading(false);
      router.push('/');
    } catch (error) {
      console.log(error);
      // user sweetalert or somthing else
      setLoading(false);
      // alert(JSON.stringify(error));
    }
  };

  return (
    <section className={classes.signUpContainer}>
      <div className={classes.leftWrapper}>
        <div className={classes.imageWrapper}>
          {/* <Image alt={`image`} src={man}></Image>
          <Image alt={`image`} src={boy}></Image>
          <Image alt={`image`} src={girl}></Image> */}
        </div>
      </div>
      <div className={classes.rightWrapper}>
        <div className={classes.rightHeader}>
          <div className={classes.headerLogo}>
            <img
              alt={`image`}
              width="100px"
              onClick={() => router.push(`/`)}
              style={{ cursor: `pointer` }}
              src="/asset/GPoint_Black_logo.png"
            />
          </div>
          <div className={classes.headerInnerRight}>
            <Typography variant="h6" component="span">
              New to GCoupon?{` `}
            </Typography>
            <button
              className={classes.loginButton}
              onClick={() =>
                window.open(`https://gpointwallet.com/account/create`)
              }
            >
              Signup
            </button>
          </div>
        </div>
        <div className={classes.rightMain}>
          <TextField
            id="outlined-basic"
            label="User Name"
            variant="outlined"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            style={{ width: `100%` }}
          ></TextField>
          <TextField
            id="outlined-basic"
            label="Password"
            type="password"
            variant="outlined"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{ width: `100%` }}
          ></TextField>
          {/* <NextLink href="/">
            <a
              style={{
                width: `100%`,
                textAlign: `left`,
                color: `#2eafff`,
                marginTop: `-1rem`,
              }}
            >
              Forgot Password?
            </a>
          </NextLink> */}
          {/* <Spacer size={15} /> */}
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={loginUser}
            className={classes.rightMainLoginEmailButton}
          >
            Login
          </LoadingButton>
          {/* <Divider style={{ width: `100%` }}>OR</Divider>
          <button className={classes.rightMainLoginGoogleButton}>
            <Image alt={`image`} src={google}></Image>
            <span>Continue With Google</span>
          </button>
          <button className={classes.rightMainLoginFacebookButton}>
            <Image alt={`image`} src={facebook}></Image>
            <span>Continue With Facebook</span>
            {` `}
          </button> */}
        </div>
      </div>
    </section>
  );
}

export default dynamic(Promise.resolve(Login), {
  ssr: false,
});
