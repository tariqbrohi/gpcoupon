import { makeStyles } from '@mui/styles';
import { display } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  card: {
    display: 'block',
    maxWidth: '260px',
    margin: '0 auto 32px',
  },
  image: {
    // minHeight: `200px !important`,
    // maxHeight: `200px !important`,
    // height: `200px !important`,
    // minWidth: `210px !important`,
    // maxWidth: `210px !important`,
    // borderRadius: `8px`,
    // width: `210px !important`,
    boxShadow: `0 0 12px 0 rgb(89 102 109 / 15%)`,
    borderRadius: '1.6rem',
    cursor: `pointer`,
    '& img': {
      with: '100%',
    },
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
