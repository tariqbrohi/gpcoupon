import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  imageDiv: {
    display: `flex`,
    justifyContent: `center`,
    flexDirection: `column`,
    maxWidth: `160px !important`,
    minWidth: `160px !important`,
    marginBottom: `2rem`,
  },
  image: {
    borderRadius: `12px`,
    cursor: `pointer`,
  },
  title: {
    fontSize: `14px`,
    marginTop: `10px`,
  },
}));
