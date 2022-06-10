import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  main: {
    display: `flex`,
    backgroundColor: `#f6f0fb`,
    width: `100%`,
    alignItems: `center`,
    justifyContent: `space-evenly`,
    marginTop: `1rem`,
    '@media(max-width:770px)': {
      padding: '0 20px',
      display: 'none',
    },
  },
  image: {},
  info: {
    width: `290px`,
  },
  heading: {
    fontSize: `28px`,
    fontWeight: `700`,
    margin: `0px 0px 16px`,
    lineHeight: `1.25`,
  },
  para: {
    fontSize: `22px`,
    color: `rgba(0,0,0,.87)`,
    marginTop: `6px`,
  },
  buttonContained: {
    background: `var(--secondary)`,
    marginTop: `2rem`,
    width: `100%`,
    borderRadius: `12px`,
    fontWeight: `600`,
    fontSize: `16px`,
    textTransform: `capitalize`,
    '&:hover': {
      background: `var(--secondaryHover)`,
    },
  },
}));
