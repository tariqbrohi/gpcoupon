import React, { useEffect, useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Layout from '@/components/layout/Layout';
import { useStyles } from '../../styles/pages/itemStyle';
import EgiftDetails from '@/components/Views/EgiftDetails';

import Parse from 'html-react-parser';

import AppContext from '@/providers/app-context';
import { AppContextInterface } from '@/annotations/types';

interface QueryInterface {
  imageUrl?: string | undefined;
  description?: string | undefined;
  redemptionInstructions?: string | undefined;
  termsAndConditionsInstructions?: string | undefined;
}

const Item = (props: any) => {
  const classes = useStyles();
  const [tab, setTab] = React.useState(`desc`);
  const { singleVoucher } = useContext(AppContext) as AppContextInterface;
  const [data, setData] = useState<QueryInterface | null>(singleVoucher);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Layout>
      <div className={classes.container}>
        <div className={classes.main}>
          {/* <BreadCrumbs /> */}
          <Grid container spacing={2} columns={12} className={classes.sec1}>
            <Grid item xs={6}>
              <div className={classes.imageDiv}>
                {data?.imageUrl && (
                  <Image
                    alt={`image`}
                    // src={ProductImage}
                    src={data?.imageUrl || ``}
                    width={`100%`}
                    height={`100%`}
                  />
                )}
              </div>
            </Grid>
            <Grid item xs={6}>
              <EgiftDetails data={data} />
            </Grid>
          </Grid>
          <Box
            sx={{ width: `100%`, fontWeight: `bold` }}
            className={classes.box}
          >
            <TabContext value={tab}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: `divider`,
                  marginTop: `3rem`,
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    label="Description"
                    value="desc"
                    className={
                      tab === `desc` ? classes.tabHead : classes.tabHeadUnactive
                    }
                  />
                  <Tab
                    label="Refund & Policies"
                    value="refund"
                    className={
                      tab === `refund`
                        ? classes.tabHead
                        : classes.tabHeadUnactive
                    }
                  />
                </TabList>
              </Box>
              <TabPanel value="desc">
                {Parse(data?.description || ``)}
                {Parse(data?.redemptionInstructions || ``)}
              </TabPanel>
              <TabPanel value="refund">
                {Parse(data?.termsAndConditionsInstructions || ``)}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </Layout>
  );
};

export default Item;
