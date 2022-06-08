import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
    margin: `4rem 0`,
  },
  header: {
    width: `78%`,
    marginBottom: `1.5rem`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
  },
  heading: {
    fontSize: `28px`,
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
    justifyContent: `center`,
    width: `75%`,
    gap: `1rem`,
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
