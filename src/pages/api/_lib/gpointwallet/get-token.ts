import axios from 'axios';

const {
  GPOINT_WALLET_URL = 'http://localhost:8080',
  GPOINT_WALLET_CLIENT_ID = '9087852374oasjf982y0auooh41',
  GPOINT_WALLET_SECRET = 'dasdas231rkaopsiru092ujrlakb23hjb',
} = process.env;

export default async () => {
  const encoded = btoa(`${GPOINT_WALLET_CLIENT_ID}:${GPOINT_WALLET_SECRET}`);

  try {
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
  } catch {
    return {};
  }
};
