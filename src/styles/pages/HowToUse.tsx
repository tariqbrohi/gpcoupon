import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    padding: `2rem 0`,
  },
  howTuseTabWrapper: {
    padding: `2rem 4rem`,
    '& .MuiTabs-flexContainer > :not(:last-child)': {
      marginRight: `1rem`,
    },
    '& .MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary': {
      color: `black`,
      fontSize: `1.5rem`,
      fontWeight: `bold`,
      padding: `.5rem .1rem`,
      zIndex: `1`,
    },
    '& button.Mui-selected .MuiBox-root': {
      position: `relative`,
    },
    '& .css-1aquho2-MuiTabs-indicator': {
      backgroundColor: `rgba(255,60,120,.5)`,
      height: `.7rem`,
      bottom: `1rem`,
      zIndex: `-1px`,
    },
  },
  stepCarousel: {},
  stepCarouselItem: {
    display: `grid`,
    gridTemplateColumns: `30rem 1fr`,
    gridTemplateRows: `1fr`,
    columnGap: `2rem`,
    padding: `2rem`,
    [theme.breakpoints.down(`md`)]: {
      gridTemplateColumns: `1fr`,
      gridTemplateRows: `1fr`,
    },
  },
  // first item
  stepCarouselFirstItem: {},
  stepCarouselFirstItemImage: {
    width: `1fr`,
    [theme.breakpoints.down(`md`)]: {
      width: `60%`,
      marginLeft: `auto`,
      marginRight: `auto`,
    },
    '& img': {
      borderRadius: `1.2rem`,
    },
  },
  stepCarouselFirstItemDetails: {
    display: `flex`,
    flexDirection: `column`,
    paddingTop: `7rem`,
    '& > :not(:last-child)': {
      marginBottom: `1rem`,
    },
    [theme.breakpoints.down(`md`)]: {
      paddingTop: `2rem`,
      textAlign: `center`,
    },
  },
  // first item
  // second item
  stepCarouselSecondItem: {},
  stepCarouselSecondItemImage: {
    width: `1fr`,
    [theme.breakpoints.down(`md`)]: {
      width: `60%`,
      marginLeft: `auto`,
      marginRight: `auto`,
    },
    '& img': {
      borderRadius: `1.2rem`,
    },
  },
  stepCarouselSecondItemDetails: {
    display: `flex`,
    flexDirection: `column`,
    paddingTop: `7rem`,
    '& > :not(:last-child)': {
      marginBottom: `1rem`,
    },
    [theme.breakpoints.down(`md`)]: {
      paddingTop: `2rem`,
      textAlign: `center`,
    },
  },
  // second item
  // third item
  stepCarouselThirdItem: {},
  stepCarouselThirdItemImage: {
    width: `1fr`,
    [theme.breakpoints.down(`md`)]: {
      width: `60%`,
      marginLeft: `auto`,
      marginRight: `auto`,
    },
    '& img': {
      borderRadius: `1.2rem`,
    },
  },
  stepCarouselThirdItemDetails: {
    display: `flex`,
    flexDirection: `column`,
    paddingTop: `7rem`,
    '& > :not(:last-child)': {
      marginBottom: `1rem`,
    },
    [theme.breakpoints.down(`md`)]: {
      paddingTop: `2rem`,
      textAlign: `center`,
    },
  },
  // third item
  // fourth item
  stepCarouselFourthItem: {
    '&  .MuiTabs-flexContainer': {
      [theme.breakpoints.down(`md`)]: {
        justifyContent: `center !important`,
      },
    },
    '& .MuiTabs-flexContainer > :not(:last-child)': {
      marginRight: `1rem`,
    },
    '& .MuiButtonBase-root.MuiTab-root.MuiTab-textColorPrimary': {
      color: `black`,
      fontSize: `1.2rem`,
      paddingLeft: `.1rem`,
      paddingRight: `.1rem`,
      zIndex: `1`,
    },
    '& button.Mui-selected .MuiBox-root': {
      position: `relative`,
    },
    '& .css-1aquho2-MuiTabs-indicator': {
      backgroundColor: `var(--primary)`,
      height: `.2rem`,
      bottom: `1rem`,
      zIndex: `-1px`,
    },
    '& .MuiTabPanel-root': {
      padding: `0`,
    },
  },
  stepCarouselFourthItemImage: {
    width: `1fr`,
    [theme.breakpoints.down(`md`)]: {
      width: `60%`,
      marginLeft: `auto`,
      marginRight: `auto`,
    },
    '& img': {
      borderRadius: `1.2rem`,
    },
  },
  stepCarouselFourthItemDetails: {
    display: `flex`,
    flexDirection: `column`,
    paddingTop: `7rem`,
    '& > :not(:last-child)': {
      marginBottom: `1rem`,
    },
    [theme.breakpoints.down(`md`)]: {
      paddingTop: `2rem`,
      textAlign: `center`,
    },
  },
  // fourth item

  // rendom tab
  rendomWrapper: {},
  stepRendomItem: {
    display: `grid`,
    gridTemplateColumns: `30rem 1fr`,
    gridTemplateRows: `1fr`,
    columnGap: `2rem`,
    padding: `2rem`,
    [theme.breakpoints.down(`md`)]: {
      gridTemplateColumns: `1fr`,
      gridTemplateRows: `1fr`,
    },
  },
  // redom first item
  stepRemdomFirstItem: {},
  stepRemdomFirstItemImage: {
    width: `1fr`,
    [theme.breakpoints.down(`md`)]: {
      width: `60%`,
      marginLeft: `auto`,
      marginRight: `auto`,
    },
    '& img': {
      borderRadius: `1.2rem`,
    },
  },
  stepRemdomFirstItemDetails: {
    display: `flex`,
    flexDirection: `column`,
    paddingTop: `7rem`,
    '& > :not(:last-child)': {
      marginBottom: `1rem`,
    },
    [theme.breakpoints.down(`md`)]: {
      paddingTop: `2rem`,
      textAlign: `center`,
    },
  },

  // redom first item
  // redom second item
  stepRemdomSecondItem: {},
  stepRemdomSecondItemImage: {
    width: `1fr`,
    [theme.breakpoints.down(`md`)]: {
      width: `60%`,
      marginLeft: `auto`,
      marginRight: `auto`,
    },
    '& img': {
      borderRadius: `1.2rem`,
    },
  },
  stepRemdomSecondItemDetails: {
    display: `flex`,
    flexDirection: `column`,
    paddingTop: `7rem`,
    '& > :not(:last-child)': {
      marginBottom: `1rem`,
    },
    [theme.breakpoints.down(`md`)]: {
      paddingTop: `2rem`,
      textAlign: `center`,
    },
  },

  // redom second item

  // rendom tab

  // download-app
  downloadAppSection: {
    width: `100%`,
    height: `50rem`,
    backgroundColor: `##ffedf2`,
  },
  // download-app
}));
