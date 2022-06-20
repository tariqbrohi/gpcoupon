import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    width: `100%`,
    background: `#ebebeb`,
    display: `flex`,
    alignItems: `center`,
    flexDirection: `column`,
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
    background: `white`,
    borderRadius: `50px`,
    padding: `0px 30px`,
    height: `30px`,
  },
  name: {
    fontSize: `13px`,
    fontWeight: `400`,
    width: `max-content`,
  },
}));
