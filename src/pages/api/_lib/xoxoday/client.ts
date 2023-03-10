import axios from 'axios';
import redis from '../redis';

const baseURL =
  process.env.XOXO_API_URI ||
  'https://stagingaccount.xoxoday.com/chef/v1/oauth';

let expiresIn: number | null = null;
let accessToken: string | null = process.env.XOXO_TOKEN || null;

const client = axios.create({
  baseURL,
});

async function validate() {
  if (!accessToken) return false;

  try {
    const { tokenContent } = JSON.parse(
      Buffer.from(accessToken, 'base64').toString('utf8'),
    );

    if (new Date(tokenContent.expiresAt).getTime() <= new Date().getTime()) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

async function refreshTokens() {
  try {
    const refreshToken = await redis.get('refreshToken');

    if (!refreshToken) return {};

    const { data } = await axios.post(`${baseURL}/token/bearer`, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: process.env.XOXO_CLIENT_ID,
      client_secret: process.env.XOXO_CLIENT_SECRET,
    });

    await redis.set('accessToken', data.access_token);
    await redis.set('refreshToken', data.refresh_token);

    return data;
  } catch (err) {
    console.log(err);
  }

  return {};
}

client.interceptors.request.use(
  async (config) => {
    accessToken = await redis.get('accessToken');

    const isValid = await validate();

    config.headers = {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${accessToken}`,
    };

    if (isValid) {
      return config;
    }

    const { access_token } = await refreshTokens();

    accessToken = access_token;

    config.headers!.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (err) => Promise.reject(err),
);

export default client;
