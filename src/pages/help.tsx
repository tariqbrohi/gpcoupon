import Head from 'next/head';
import Image from 'next/image';
import Logo from '@/asset/logo.png';
import { Typography, Grid, Box } from '@mui/material';
import NextImage from 'next/image';
import { useStyles } from '../styles/pages/Help';
import CONTACT from '../asset/contact.svg';
import Layout from '@/components/layout/Layout';
import DetailsCard from '../components/DetailsCard';

export default function Home() {
  const classes = useStyles();
  const paramater = [
    {
      title: `SodaGift`,
      qusetions: [
        `What is SodaGift?`,
        `How do I use SodaGift?`,
        `What is a Gift Card?`,
        `Can I make bulk orders?`,
      ],
    },
    {
      title: `SodaGift`,
      qusetions: [
        `What is SodaGift?`,
        `How do I use SodaGift?`,
        `What is a Gift Card?`,
        `Can I make bulk orders?`,
      ],
    },
    {
      title: `SodaGift`,
      qusetions: [
        `What is SodaGift?`,
        `How do I use SodaGift?`,
        `What is a Gift Card?`,
        `Can I make bulk orders?`,
      ],
    },
    {
      title: `SodaGift`,
      qusetions: [
        `What is SodaGift?`,
        `How do I use SodaGift?`,
        `What is a Gift Card?`,
        `Can I make bulk orders?`,
      ],
    },

    {
      title: `SodaGift`,
      qusetions: [
        `What is SodaGift?`,
        `How do I use SodaGift?`,
        `What is a Gift Card?`,
        `Can I make bulk orders?`,
      ],
    },
  ];
  return (
    <Layout>
      <div className={classes.container}>
        <section className={classes.helpBanner}>
          <Typography
            variant="h4"
            style={{ fontWeight: `bold` }}
            className={classes.bannerTitle}
          >
            Help
          </Typography>
        </section>
        <section className={classes.cardContainer}>
          {paramater?.map((el: any, index: number) => (
            <DetailsCard key={index}>
              <Typography variant="h4">{el?.title}</Typography>

              {el.qusetions?.map((ques: any, index: number) => (
                <Typography key={index} variant="body1">
                  {ques}
                </Typography>
              ))}
            </DetailsCard>
          ))}
        </section>
        <section className={classes.HaveAnyQuestionsContainer}>
          <div className={classes.HaveAnyQuestionsLeft}>
            <NextImage alt={`image`} src={CONTACT}></NextImage>
          </div>
          <div className={classes.HaveAnyQuestionsRight}>
            <Typography variant="h5">Have any questions? Concerns?</Typography>
            <Typography variant="body1">
              Please contact us at: support@sodagift.com
            </Typography>
          </div>
        </section>
      </div>
    </Layout>
  );
}
