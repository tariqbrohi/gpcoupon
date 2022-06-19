import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    padding: `4rem 0`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
  },
  main: {
    width: `500px`,
    '@media(max-width:530px)': {
      width: `400px`,
    },
  },
  card: {
    padding: `1.5rem`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
    boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
    marginTop: `1rem`,
    borderRadius: `6px`,
  },
  head: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    width: `100%`,
    borderBottom: `1px solid rgb(228, 228, 228)`,
    paddingBottom: `0.7rem`,
    marginBottom: `2rem`,
  },
  done: {
    fontWeight: `900`,
    fontSize: `20px`,
    opacity: `100%`,
  },
  date: {
    color: `gray`,
    fontSize: `14px`,
    fontWeight: `600`,
  },
  heading: {
    fontWeight: `900`,
    paddingLeft: `10px`,
    fontSize: `20px`,
  },
  productCard: {
    display: `flex`,
    width: `100%`,
  },
  imageDiv: {
    cursor: `pointer`,
    '& span': {
      width: `80px !important`,
      height: `80px !important`,
      borderRadius: `8px`,
    },
  },
  info: {
    paddingLeft: `10px`,
    display: `flex`,
    justifyContent: `center`,
    flexDirection: `column`,
  },
  brand: {
    margin: `0`,
    color: `gray`,
    fontSize: `14px`,
  },
  title: {
    margin: `0`,
    fontWeight: `900`,
    cursor: `pointer`,
    '&:hover': {
      textDecoration: `underline`,
      color: `var(--primary)`,
    },
  },
  price: {
    margin: `0`,
    color: `gray`,
    fontSize: `14px`,
  },
  para: {
    fontSize: `14px`,
    opacity: `100%`,
    width: `100%`,
    fontWeight: `900`,
    marginTop: `6px`,
  },
  btn: {
    width: `100%`,
    height: `40px`,
    background: `#EBEBEB`,
    borderRadius: `8px`,
    fontWeight: `bold`,
    textTransform: `capitalize`,
    fontSize: `14px`,
    color: `#727272`,
    marginTop: `1rem`,
    '&:hover': {
      background: `#dbdbdb`,
    },
  },
}));
