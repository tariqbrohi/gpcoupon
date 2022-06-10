import { makeStyles } from '@mui/styles';
import { display } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    margin: `4rem 0`,
    '@media(max-width:550px)': {
      margin: `1.5rem 0`,

    },
  },
  main: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    width: `75%`,
    gap: `2rem`,
    '@media(max-width:1030px)': {
      width: '95%',
    },
  },
  imageDiv: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
  },
  image: {
    borderRadius: `50%`,
    height: `100px !important`,
    cursor: `pointer`,
  },
  title: {
    fontSize: `14px`,
    marginTop: `10px`,
  },
}));
