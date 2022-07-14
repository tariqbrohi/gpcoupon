import Router from 'next/router';
import { ServerResponse } from 'http';
import { ROUTES } from '@/ROUTES';

/**
 * Redirects to the given path.
 * @param res {ServerResponse}
 * @param path {String}
 */
const redirect = (
  res?: ServerResponse | null,
  path: string = ROUTES.login,
): void => {
  if (res) {
    res.writeHead(303, { Location: path });
    res.end();
  } else {
    Router.replace(path);
  }
};

export default redirect;
