import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-around`,
    backgroundColor: `#ffedf2`,
    padding: `2rem 0`,
  },
  para: {
    fontSize: `20px`,
    fontWeight: `600`,
    marginLeft: `1rem`,
  },
  image: {},
  left: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
  },
  buttonContained: {
    background: `var(--primary)`,
    '&:hover': {
      background: `var(--primaryHover)`,
    },
  },
}));
