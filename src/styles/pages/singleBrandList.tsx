import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  layoutWrapper: {
    '& [class*="-topBar"],& [class*="-navMain"]': {
      [theme.breakpoints.down(`md`)]: {
        display: `none`,
      },
    },
  },
  singleBrandsContainer: {},
  singleBrandsContainerHeader: {
    padding: `2.8rem 2.6rem`,
    display: `flex`,
    alignItems: `center`,
    '& > :not(:last-child)': {
      marginRight: `2rem !important`,
    },
    borderBottom: `1rem solid #ebebeb;`,
    [theme.breakpoints.down(`md`)]: {
      flexDirection: `column`,
      padding: `0`,
      position: `sticky`,
      top: `0`,
      '& > :not(:last-child)': {
        marginRight: `0 !important`,
      },
    },
  },
  singleBrandsContainerHeaderImage1: {
    width: `10rem`,
    [theme.breakpoints.down(`md`)]: {
      display: `none`,
    },
  },
  singleBrandsContainerHeaderImage2: {
    width: `100%`,
    display: `none`,
    [theme.breakpoints.down(`md`)]: {
      display: `block`,
    },
  },
  singleBrandsContainerHeaderDetails: {
    flexGrow: 1,
    '& > :not(:last-child)': {
      marginBottom: `2rem !important`,
    },
    [theme.breakpoints.down(`md`)]: {
      padding: `1.4rem 2rem`,
      '& > :not(:last-child)': {
        marginBottom: `1rem !important`,
      },
    },
  },
  singleBrandsContainerMain: {
    padding: `0 1rem`,
    position: `relative`,
    background: `#ffff`,
    zIndex: 10,
  },
  singleBrandsContainerMainHeader: {
    margin: `2rem 0`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
  },
  singleBrandsContainerMainContent: {
    backgroundColor: `white`,
  },
  // imageDiv: {
  //   width: `100%`,
  //   display: `flex`,
  //   alignItems: `center`,
  //   justifyContent: `center`,
  //   gap: `1rem`,
  //   padding: `0 2rem`,
  // },
  root: {
    padding: `2rem`,
    display: `grid`,
    gridTemplateColumns: `1fr`,
    gridTemplateRows: `1fr max-content`,
    position: `relative`,
    minHeight: `100vh`,
  },
  productsContainer: {
    display: `grid`,
    gridTemplateColumns: `repeat(auto-fill,minMax(20rem,1fr))`,
    [theme.breakpoints.down(`md`)]: {
      gridTemplateColumns: `repeat(auto-fill,minMax(15rem,1fr))`,
    },
    gridGap: `2rem`,
  },
  paginationContainer: {
    padding: `2rem`,
    display: `flex`,
    justifyContent: `center`,
  },
}));
