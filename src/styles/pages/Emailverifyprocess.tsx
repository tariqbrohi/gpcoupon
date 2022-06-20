import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  emailverifyprocessContainer: {
    padding: `7rem`,
    display: `flex`,
    alignItems: `center`,
    flexDirection: `column`,
    justifyContent: `center`,
    '& > :not(:last-child)': {
      marginBottom: `2rem`,
    },
  },
  emailverifyprocessLogo: {
    width: `15rem`,
    '& img': {
      width: `100%`,
    },
  },
}));
