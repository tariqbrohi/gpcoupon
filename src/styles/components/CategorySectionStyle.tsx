import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    width: `100%`,
    display: `flex`,
    justifyContent: `center`,
    marginTop: `1rem`,
  },
  catFilter: {
    marginRight: `30px `,
    '@media(max-width:770px)': {
      display: `none`,
    },
  },
  catMobileFilter: {
    display: `none`,
    '@media(max-width:770px)': {
      display: `block`,
    },
  },
  grid: {
    width: `80%`,
    '@media(max-width:1030px)': {
      width: `95%`,
    },
  },
  heading: {
    fontSize: `22px`,
    fontWeight: `600`,
  },
  total: {
    fontSize: `16px`,
    fontWeight: `500`,
    marginTop: `8px`,
    marginBottom: `2rem`,
  },
}));
