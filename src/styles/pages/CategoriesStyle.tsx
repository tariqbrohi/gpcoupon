import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    padding: `2rem 0`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    paddingBottom: `2rem`,
    marginTop: `1rem`,
  },
  main: {
    width: `80%`,
  },
  heading: {
    fontSize: `30px`,
    fontWeight: `600`,
    marginBottom: `3rem`,
  },
  grid2: {
    padding: `1rem 0`,
    width: `100%`,
  },
}));
