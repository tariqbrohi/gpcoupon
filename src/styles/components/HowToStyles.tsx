import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    display: `flex`,
    flexDirection: 'column',
    alignItems: `center`,
    justifyContent: `space-around`,
    padding: `2rem 0`,
    color: 'grey',
    '@media(max-width:770px)': {
      // justifyContent: 'center',
    },
  },
  main: {
    display: `flex`,
    flexWrap: 'wrap',
    alignItems: `baseline`,
    justifyContent: `center`,
    width: `75% !important`,
    gap: `1rem`,
    '@media(max-width:770px)': {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  card: {
    width: `200px`,
    margin: `20px 0`,
    '@media(max-width:770px)': {
      display: 'flex',
      width: '100%',
      alignItems: ' center',
      color: 'black',
    },
  },
  image: {
    // width: `100px`,
    minHeight: `90px !important`,
    maxHeight: `90px !important`,
    // objectFit: `cover`
    marginRight: '10px',
    // padding: `10px !important`,
  },
  heading: {
    margin: `10px`,
  },
  para: {
    lineHeight: `1.4em`,
  },
  // left: {
  //     display: `flex`,
  //     alignItems: `center`,
  //     justifyContent: `center`,
  // },
  buttonContained: {
    fontWeight: 600,
    textTransform: 'none',
    width: `220px`,
    borderRadius: '12px',
    padding: `10px`,
    margin: '20px 0',
    background: `var(--primary)`,
    '&:hover': {
      background: `var(--primaryHover)`,
    },
  },
  
}));
