import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    padding: `2rem 0`,
  },
  helpBanner: {
    backgroundColor: `var(--primary)`,
    width: '100%',
    height: '25rem',
  },
  bannerTitle: {
    paddingTop: '5rem',
    color: `var(--white)`,
    textAlign: 'center',
  },
  cardContainer: {
    zIndex: 3,
    width: '50%',

    '@media(max-width:770px)': {
      width: '95%',
    },
    // [theme.breakpoints.down("md")]:{
    // },
    margin: '-15rem auto 0 auto',
    '& > :not(:last-child)': {
      marginBottom: '5rem',
    },
  },
  HaveAnyQuestionsContainer: {
    margin: '5rem auto 0 auto',
    width: 'fit-content',
    display: 'flex',
    alignItems: 'center',
    '& > :not(:last-child)': {
      marginRight: '2rem',
    },
  },
  HaveAnyQuestionsLeft: {
    width: 'fitcontent',
  },
  HaveAnyQuestionsRight: {
    width: '30rem',
  },
}));
