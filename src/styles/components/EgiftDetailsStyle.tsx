import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    display: `flex`,
    // alignItems: `center`,
    // justifyContent: `center`,
    flexDirection: `column`,
    width: `100%`,
  },
  tag: {
    padding: `4px 8px`,
    backgroundColor: `#ffeec1`,
    color: `#e16a00`,
    borderRadius: `8px`,
    fontSize: `12px`,
    width: `max-content`,
    opacity: `100%`,
  },
  heading: {
    fontSize: `24px`,
    fontWeight: `900`,
    opacity: `100%`,
    marginTop: `10px`,
  },
  info: {
    color: `#9d9d9d`,
    fontSize: `14px`,
    fontWeight: `900`,
    opacity: `100%`,
  },
  price: {
    fontSize: `24px`,
    fontWeight: `900`,
    marginTop: `18px`,
    marginBottom: `4px`,
  },
  para: {
    fontSize: `16px`,
    fontWeight: `500`,
    marginTop: `8px`,
    opacity: `100%`,
    display: `flex`,
    alignItems: `center`,
    gap: `0.5rem`,
  },
  giftPara: {
    fontSize: `14px`,
    fontWeight: `600`,
    marginTop: `24px`,
    opacity: `100%`,
  },
  btnDiv: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    marginTop: `1rem`,
    marginBottom: `2rem`,
  },
  counterDiv: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-around`,
    width: `45%`,
    border: `1px solid #efefef`,
    padding: `6px`,
    borderRadius: `12px`,
    height: `55px`,
  },
  buttonContained: {
    width: `45%`,
    height: `55px`,
    background: `var(--primary)`,
    borderRadius: `12px`,
    '&:hover': {
      background: `var(--primaryHover)`,
    },
  },
  unactive: {
    color: `rgba(0,0,0,.3)`,
    cursor: `not-allowed`,
  },
  active: {
    color: `black`,
    cursor: `pointer`,
  },
  counter: {
    fontSize: `16px`,
    fontWeight: `600`,
    opacity: `100%`,
  },
  companyDiv: {
    display: `flex`,
    alignItems: `center`,
    marginTop: `1rem`,
    gap: `0.5rem`,
    cursor: `pointer`,
    '& span': {
      height: `50px !important`,
      width: `50px !important`,
      borderRadius: `12px`,
    },
  },
  name: {
    fontSize: `14px`,
    textDecoration: `underline`,
    opacity: `100%`,
    cursor: `pointer`,
  },
  chips: {
    display: `flex`,
    gap: `0.4rem`,
    marginTop: `1rem`,
  },
  chip: {
    cursor: `pointer`,
  },
}));
