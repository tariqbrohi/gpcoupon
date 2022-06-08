import { makeStyles } from '@mui/styles';
import { display } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  carousaldiv: {
    padding: `1rem`,
    width: `100%`,
    display: `flex`,
    justifyContent: `center`,
    // padding: '2rem 0'
    marginBottom: `3rem`,
    flexDirection: `column`,
    alignItems: `center`,
  },
  carousal: {
    width: `82%`,
  },
  imageDiv: {
    width: `100%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    gap: `1rem`,
    padding: `0 2rem`,
  },
  card: {},
  image: {
    minHeight: `200px !important`,
    maxHeight: `200px !important`,
    height: `200px !important`,
    minWidth: `210px !important`,
    maxWidth: `210px !important`,
    borderRadius: `8px`,
    width: `210px !important`,
    boxShadow: `0 0 12px 0 rgb(89 102 109 / 15%)`,
    cursor: `pointer`,
  },
  company: {
    color: `#7b7b7b`,
    fontSize: `12px`,
    paddingLeft: `12px`,
  },
  title: {
    fontSize: `14px`,
    paddingLeft: `12px`,
  },
  price: {
    fontSize: `14px`,
    fontWeight: `600`,
    paddingLeft: `12px`,
  },
}));
