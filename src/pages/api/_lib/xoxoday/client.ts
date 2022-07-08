import axios from 'axios';

const bearerToken = process.env.XOXO_TOKEN;

export default axios.create({
  baseURL: 'https://accounts.xoxoday.com/chef/v1/oauth/api',
  headers: {
    'Access-Control-Allow-Origin': `*`,
    Accept: `application/json`,
    'Content-Type': `application/json`,
    Authorization: `Bearer ${bearerToken}`,
  },
});
