import AppContext from '@/modules/components/AppContext';
import Link from 'next/link';
import parseErrorMessage from '@/lib/parse-error-message';
import React, { SyntheticEvent, useContext, useState } from 'react';
import Router from 'next/router';
import ThemeButton from '@/modules/components/ThemeButton';
import { useLoginMutation } from '@/services';
import {
  Form,
  Grid,
  Image,
  Paragraph,
  Snackbar,
  Spacer,
} from '@growth-ui/react';
import Head from '@/modules/components/Head';
import AppNav from '@/layouts/AppNav';
import styled from 'styled-components';

const LoginBtn = styled(ThemeButton)`
  background-color: #F6A2B1 !important;
  color: #fff;
  box-shadow: rgb(203 203 203) 4px 4px 8px;
  transition: all 0.7s ease-in-out;

  &:hover {
    background-color: #2D126D !important;
  }
`;

const GridRow = styled(Grid.Row)`
  height: 100vh;

  ${({ theme }) => theme.gui.media.mobile} {
    height: 90vh;
  }
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(AppContext);
  const [login, { loading }] = useLoginMutation();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    login({
      data: {
        username,
        password,
      },
    })
      .then(({ data }) => {
        setUser(data);
        Router.push('/');
      })
      .catch((err) => {
        console.log(err?.response?.data?.errors?.[0].message);
        setError(parseErrorMessage(err));
      });
  };

  return (
    <>
      <Head title="GPcoupon | Log in" />
      <main>
        <GridRow wrap="wrap">
          {/* <Grid.Col
            width={8}
            only={['computer', 'laptop', 'tablet', 'widescreen']}
          >
          </Grid.Col> */}
          <Grid.Col
            width={14}
            mobile={14}
            minimobile={14}
            style={{ margin: '0 auto' }}
          >
            <Spacer size={50} />
            <Grid.Row>
              <Link href="/">
                <a>
                  <Image size="small" src="/images/logo_with_rich.png" alt="GPoint Coupon with Rich" />
                </a>
              </Link>
            </Grid.Row>
            <div
              style={{
                margin: '100px auto 0',
                maxWidth: '300px',
                width: '100%',
              }}
            >
              <Paragraph fontWeight={600} fontSize={20}>
                Login with GPointWallet
              </Paragraph>
              <Spacer size={30} />
              <Form fluid onSubmit={handleSubmit}>
                <Form.Input
                  fluid
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginBtn fluid loading={loading}>
                  Login
                </LoginBtn>
              </Form>
            </div>
          </Grid.Col>
        </GridRow>
        {error && (
          <Snackbar
            error
            autoHideDuration={3000}
            position="top right"
            message={error}
            onClose={() => setError('')}
          />
        )}
      </main>

      <AppNav />
    </>
  );
}
