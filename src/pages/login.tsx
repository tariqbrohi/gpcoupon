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
import { useLoginMutation } from '@/services';
import parseErrorMessage from '@/lib/parse-error-message';

function Login() {
  const [login, { loading }] = useLoginMutation();
  const classes = useStyles();
  const router = useRouter();
  const { setAuthenticated, setUser, setUserDetail } = useContext(
    AppContext,
  ) as AppContextInterface;

  const [username, setUsername] = useState(``);
  const [password, setPassword] = useState(``);
  // const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    login({
      data: {
        username,
        password,
      },
    })
      .then(({ data: user }) => {
        console.log(user);
        setUserDetail(user);
        setUser(user.id);
        router.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert(parseErrorMessage(err));
      });
  };

  return (
    <section className={classes.signUpContainer}>
      <div className={classes.leftWrapper}>
        <div className={classes.imageWrapper}></div>
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
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={loginUser}
            className={classes.rightMainLoginEmailButton}
          >
            Login
          </LoadingButton>
        </div>
      </div>
    </section>
  );
}

export default dynamic(Promise.resolve(Login), {
  ssr: false,
});
