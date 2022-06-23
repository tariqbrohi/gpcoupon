import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
    margin: `4rem 0`,
    '@media(max-width:550px)': {
      margin: `3rem 0 0rem 0`,
    },
  },
  header: {
    width: `78%`,
    marginBottom: `1.5rem`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    '@media(max-width:1030px)': {
      width: `95%`,
    },
  },
  heading: {
    fontSize: `28px`,
    textAlign: 'center',
    margin: '0 auto',
    fontWeight: `600`,
  },
  arrowDiv: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    gap: `10px`,
  },
  icon: {
    cursor: `pointer`,
    backgroundColor: `#ebebeb`,
    borderRadius: `50%`,
    height: `36px`,
    width: `36px`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    padding: `10px`,
    '&:hover': {
      background: `#cbcbcb`,
    },
  },
  main: {
    display: `flex`,
    alignItems: `baseline`,
    justifyContent: `space-evenly`,
    width: `75%`,
    gap: `1rem`,
    '@media(max-width:1030px)': {
      width: `95%`,
      overflowX: `auto`,
      justifyContent: `flex-start`,
    },
  },
  imageDiv: {
    display: `flex`,
    justifyContent: `center`,
    flexDirection: `column`,
    // maxHeight: "160px !important",
    // minHeight: "160px !important",
    maxWidth: `160px !important`,
    minWidth: `160px !important`,
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
