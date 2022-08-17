import axios from 'axios';
import redis from '../redis';

const baseURL = 'https://accounts.xoxoday.com/chef/v1/oauth';

let accessToken = process.env.XOXO_TOKEN || '';
let expiresIn: number | null = null;

const client = axios.create({
  baseURL,
});

async function validate() {
  console.log(`validating xoxo token`);
  if (!accessToken) return false;

  try {
    if (!expiresIn || expiresIn < 30) {
      const { data } = await axios.get(`${baseURL}/token`, {
        headers: {
          'Content-Type': `application/json`,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      expiresIn = data?.expires_in;

      return true;
    }
  } catch {
    return false;
  }

  return true;
}

async function refreshTokens() {
  const refreshToken = await redis.get('xoxo:refreshToken');

  if (!refreshToken) {
  }

  console.log(`refreshTokening xoxo token - `, refreshToken);
  try {
    const { data } = await axios.post(`${baseURL}/token/bearer`, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.XOXO_CLIENT_ID,
      client_secret: process.env.XOXO_CLIENT_SECRET,
    });

    return data;
  } catch {
    // todo
    // slack crifical error
  }

  return {};
}

client.interceptors.request.use(
  async (config) => {
    const isValid = await validate();

    config.headers = {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${accessToken}`,
    };

    if (isValid) {
      return config;
    }

    const { access_token, refresh_token } = await refreshTokens();

    accessToken = access_token;

    await redis.set('xoxo:refreshToken', refresh_token);

    config.headers!.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (err) => Promise.reject(err),
);

export default client;
