import { ServerStyleSheets } from '@mui/styles';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/x-icon" href={`/images/favicon.ico`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
MyDocument.getInitialProps = async (ctx) => {
  const styleSheets = new ServerStyleSheets();
  const styledSheet = new ServerStyleSheet();

  const orignalRenderPage = ctx.renderPage;
  ctx.renderPage = () => {
    return orignalRenderPage({
      enhanceApp: (App) => (props) => styleSheets.collect(<App {...props} />),
    });
  };

  const initialProps = await Document.getInitialProps(ctx);
  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      styleSheets.getStyleElement(),
      styledSheet.getStyleElement(),
    ],
  };
};
