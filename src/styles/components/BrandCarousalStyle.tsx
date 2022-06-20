import { makeStyles } from '@mui/styles';
import { display } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  carousaldiv: {
    padding: `1rem`,
    width: `100%`,
    display: `flex`,
    justifyContent: `center`,
    margin: `2rem 0`,
    '@media(max-width:550px)': {
      margin: `0rem 0`,
      padding: `0 1rem`,
    },
  },
  carousal: {
    width: `78%`,
    height: `350px`,
    '@media(max-width:1030px)': {
      width: `100%`,
      height: `450px`,
    },
    '@media(max-width:550px)': {
      height: `250px`,
    },
  },
  imageDiv: {
    width: `100%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    gap: `0.1rem`,
    padding: `0 1rem`,
  },
  image: {
    // minWidth: `430px !important`,
    // maxWidth: `430px !important`,
    width: `100% !important`,
    // minHeight: `200px !important`,
    // maxHeight: `200px !important`,
    height: `100% !important`,
    borderRadius: `16px`,
    cursor: `pointer`,
  },
}));
