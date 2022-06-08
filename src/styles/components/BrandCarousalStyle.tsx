import { makeStyles } from '@mui/styles';
import { display } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  carousaldiv: {
    padding: `1rem`,
    width: `100%`,
    display: `flex`,
    justifyContent: `center`,
    margin: `2rem 0`,
  },
  carousal: {
    width: `78%`,
  },
  imageDiv: {
    width: `100%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    gap: `0.1rem`,
    padding: `0 4rem`,
  },
  image: {
    minWidth: `430px !important`,
    maxWidth: `430px !important`,
    width: `430px !important`,
    minHeight: `200px !important`,
    maxHeight: `200px !important`,
    height: `200px !important`,
    borderRadius: `16px`,
    cursor: `pointer`,
  },
}));
