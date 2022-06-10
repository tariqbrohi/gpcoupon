import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-around`,
    backgroundColor: `#ffedf2`,
    padding: `2rem 0`,
    '@media(max-width:770px)': {
      flexDirection: 'column',
    },
  },
  para: {
    fontSize: `18px`,
    fontWeight: `600`,
    marginLeft: `1rem`,
    '@media(max-width:770px)': {
      marginTop: '20px',
    },
  },
  image: {},
  left: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    '@media(max-width:770px)': {
      flexDirection: 'column',
      marginBottom: '20px',
    },
  },
  buttonContained: {
    background: `var(--primary)`,
    borderRadius: '15px',
    height: '48px',
    '&:hover': {
      background: `var(--primaryHover)`,
    },
  },
}));
