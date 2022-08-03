import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ChargeInput } from './types';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from '@/lib/parse-cookies';

const {
  GPOINT_WALLET_URL = process.env.GPOINT_API_URI,
  GPOINT_WALLET_CLIENT_ID = '9087852374oasjf982y0auooh41',
  GPOINT_WALLET_SECRET = 'dasdas231rkaopsiru092ujrlakb23hjb',
} = process.env;

export default class GPointWallet {
  private token = {
    type: 'Bearer',
    accessToken: '',
  };

  private request = axios.create({
    baseURL: GPOINT_WALLET_URL,
  });

  constructor() {
    this.request.interceptors.request.use(
      async (config) => {
        const { type, accessToken } = await this.getToken();

        if (!accessToken) return Promise.reject('Token not found');

        config.headers = {
          Authorization: `${type} ${accessToken}`,
        };

        return config;
      },
      (err) => {
        return Promise.reject(err);
      },
    );
  }

  private async getToken() {
    try {
      if (!this.token.accessToken) {
        const encoded = Buffer.from(
          `${GPOINT_WALLET_CLIENT_ID}:${GPOINT_WALLET_SECRET}`,
        ).toString('base64');

        const { data } = await axios.post(
          `${GPOINT_WALLET_URL}/v2/auth/token`,
          {},
          {
            headers: {
              Authorization: `Basic ${encoded}`,
            },
          },
        );

        return data;
      }

      const { exp } = jwt_decode(this.token.accessToken) as any;

      if (new Date().valueOf() >= exp * 1000) {
        return {};
      }

      return this.token;
    } catch (err) {
      return {};
    }
  }

  getSession(req: NextApiRequest) {
    try {
      const { jid, sess } = parseCookies(req);

      const { exp } = jwt_decode(jid) as any;

      if (new Date().valueOf() >= exp * 1000) {
        return null;
      }

      return {
        user: JSON.parse(atob(sess)),
        token: jid,
      };
    } catch {
      return null;
    }
  }

  async login(username: string, password: string) {
    try {
      const { data } = await this.request.post('/v2/auth/login', {
        username,
        password,
      });

      return data;
    } catch {
      return null;
    }
  }

  async charge(input: ChargeInput) {
    const { data } = await this.request.post('/v2/charge', input);

    return data;
  }
}
