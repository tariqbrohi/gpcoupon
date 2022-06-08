import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    padding: `2rem 0`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
    paddingBottom: `2rem`,
  },
  linksection: {
    width: `80%`,
    display: `flex`,
    justifyContent: `space-between`,
  },
  sec: {
    width: `20%`,
    display: `flex`,
    flexDirection: `column`,
  },
  secHeading: {
    fontSize: `16px`,
    fontWeight: `600`,
    marginBottom: `16px`,
    color: `#606060`,
  },
  link: {
    color: `#606060`,
    margin: `4px 0`,
  },
  lastsec: {
    // width: '80%',
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    flexDirection: `column`,
    marginTop: `2rem`,
  },
  para: {
    fontSize: `12px`,
    color: `#606060`,
  },
}));
