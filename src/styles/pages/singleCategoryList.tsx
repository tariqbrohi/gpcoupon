import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  layoutWrapper: {
    '& [class*="-topBar"],& [class*="-navMain"]': {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
  },
  singleCategoriesContainer: {},
  singleCategoriesContainerHeader: {
    padding: '2.8rem 2.6rem',
    display: 'flex',
    alignItems: 'center',
    '& > :not(:last-child)': {
      marginRight: '2rem !important',
    },
    borderBottom: '1rem solid #ebebeb;',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: '0',
      position: 'sticky',
      top: '0',
      '& > :not(:last-child)': {
        marginRight: '0 !important',
      },
    },
  },
  singleCategoriesContainerHeaderImage1: {
    width: '10rem',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  singleCategoriesContainerHeaderImage2: {
    width: '100%',
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  singleCategoriesContainerHeaderDetails: {
    // flexGrow: 1,
    width: '100%',
    '& > :not(:last-child)': {
      marginBottom: '2rem !important',
    },
    [theme.breakpoints.down('md')]: {
      padding: '1.4rem 2rem',
      '& > :not(:last-child)': {
        marginBottom: '1rem !important',
      },
    },
  },
  singleCategoriesContainerHeaderCarouselItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  singleCategoriesContainerHeaderCarouselItemImage: {
    width: '7rem',
    height: '7rem',

    '& img': {
      width: '100%',
      borderRadius: '1.3rem',
    },
  },
  singleCategoriesContainerMain: {
    padding: '0 1rem',
    position: 'relative',
    background: '#ffff',
    zIndex: 10,
  },
  singleCategoriesContainerMainHeader: {
    margin: '2rem 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  singleCategoriesContainerMainContent: {
    backgroundColor: 'white',
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
    padding: '2rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr max-content',
    position: 'relative',
    minHeight: '100vh',
  },
  productsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minMax(20rem,1fr))',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(auto-fill,minMax(15rem,1fr))',
    },
    gridGap: '2rem',
  },
  paginationContainer: {
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
}));
