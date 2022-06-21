import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import Layout from '@/components/layout/Layout';
import { useStyles } from '../../styles/pages/brandsStyle';
import CategorySection from '@/components/Views/CategorySection';
import AlphaCategory from '@/components/Views/AlphaCategory';

const Affiliates = () => {
  const classes = useStyles();
  const [tab, setTab] = React.useState(`byCategory`);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Layout>
      <div className={classes.container}>
        <h2 className={classes.heading}>Affiliates</h2>
        <p className={classes.para}>What would you like to gift?</p>
        <Box sx={{ width: `100%`, fontWeight: `bold` }} className={classes.box}>
          <TabContext value={tab}>
            {/* <Box
              sx={{
                borderBottom: 1,
                borderColor: `divider`,
                display: `flex`,
                justifyContent: `center`,
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="By Category"
                  value="byCategory"
                  className={classes.tabHead}
                />
                <Tab
                  label="By A to Z"
                  value="byAlphabet"
                  className={classes.tabHead}
                />
              </TabList>
            </Box> */}
            <TabPanel value="byCategory">
              <CategorySection />
            </TabPanel>
            {/* <TabPanel value="byAlphabet">
              <AlphaCategory />
            </TabPanel> */}
          </TabContext>
        </Box>
      </div>
    </Layout>
  );
};

export default Affiliates;
