import NextHead from 'next/head';
import React from 'react';
import { useRouter } from 'next/router';

const HOST = 'https://coupon.gpointwallet.com';

export default function Head(props: HeadProps) {
  const {
    card = '/static/social-previews/default-preview.jpg',
    children,
    description = 'description',
    largeCard = true,
    title = 'GCoupon',
  } = props;
  const router = useRouter();
  const preview = card.startsWith('http') ? card : `${HOST}${card}`;

  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Twitter */}
      <meta
        name="twitter:card"
        content={largeCard ? 'summary_large_image' : 'summary'}
      />

      <meta name="twitter:site" content="@MUI_hq" />
      {/* #major-version-switch */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={preview} />
      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {/* #major-version-switch */}
      <meta property="og:url" content={`${HOST}${router.asPath}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={preview} />
      <meta property="og:ttl" content="604800" />
      {/* #major-version-switch */}
      <meta name="docsearch:version" content="master" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      {children}
    </NextHead>
  );
}

interface HeadProps {
  card?: string;
  children?: React.ReactNode;
  description?: string;
  disableAlternateLocale?: boolean;
  largeCard?: boolean;
  title?: string;
}
