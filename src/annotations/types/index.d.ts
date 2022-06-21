import { string } from 'prop-types';
import { AppProps } from 'next/app';
import { User } from './user.type';

export type InitConfig = {
  domain: {
    client: string;
    server: string;
  };
};

interface ExtendedAppProps extends AppProps {
  config: InitConfig;
}

export interface AppContextInterface {
  // userName: string;
  // userId: string;
  // basicToken: any;
  // setBasicToken: (param: string) => null;
  // user: any;
  // setUser: (param: string) => null;
  userDetail: {
    id: string;
    confirmed: boolean;
    type: 'PERSONAL' | 'BUSINESS';
    userId: string;
    username: string;
    profile: {
      avatarUrl: string | null;
      firstName: 'steven';
      lastName: 'pinker';
      contact: {
        id: string;
        email: string;
        phoneNumber: null;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
  setUserDetail: (param: any) => null;
  authenticated: boolean;
  setAuthenticated: (param: boolean) => null;
  singleVoucher: any;
  setSingleVoucher: any;
  name: any;
  setName: (param: any) => null;
  user: any;
  setUser: (param: any) => null;
  country: any;
  setCountry: (param: any) => null;
  // config: InitConfig;
  // authenticatedUser: User;
  // loaded: boolean;
  // setLoaded: (param: boolean) => null;
  // user: User;
  // getUser: () => User;
  // setAuthenticatedUser: (param: any) => null;
  // programs: any;
}
