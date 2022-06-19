import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    width: `100%`,
    display: `flex`,
    // alignItems: 'center',
    flexDirection: `column`,
    overflowY: `auto`,
    overflowX: `hidden`,
    height: `600px`,
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `var(--primary)`,
    },
    '@media(max-width:1030px)': {
      width: `100%`,
      overflowX: `auto`,
      flexDirection: `row`,
    },
  },
  list: {
    width: `max-content`,
    display: `flex`,
    alignItems: `center`,
    gap: `0.8rem`,
    padding: `10px`,
    cursor: `pointer`,
    '&:hover': {
      color: `var(--primary)`,
    },
  },
  active: {
    color: `var(--primary)`,
  },
  name: {
    fontSize: `15px`,
    fontWeight: `600`,
    width: `80%`,
  },
}));
