import axios from 'axios';
import getToken from './get-token';

const { GPOINT_WALLET_URL = 'http://localhost:8080' } = process.env;

export default async (username: string, password: string) => {
  const token = await getToken();

  try {
    const { data } = await axios.post(
      `${GPOINT_WALLET_URL}/v2/auth/login`,
      { username, password },
      {
        headers: {
          Authorization: `${token.type} ${token.accessToken}`,
        },
      },
    );

    return data;
  } catch {
    return {};
  }
};
