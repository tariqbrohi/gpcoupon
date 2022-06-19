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
  main: {
    width: `80%`,
  },
  sec1: {
    marginTop: `1rem`,
  },
  imageDiv: {
    height: `100% !important`,

    '& span': {
      width: `90% !important`,
      height: `100% !important`,
      borderRadius: `16px `,
    },
  },
  box: {
    marginTop: `1rem`,
    '& .css-zg4tvw-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: `black`,
    },
    '& .css-1aquho2-MuiTabs-indicator': {
      backgroundColor: `black`,
      height: `2px`,
    },
    '& .css-1h9z7r5-MuiButtonBase-root-MuiTab-root.Mui-selected': {
      color: `black`,
    },
  },
  tabHead: {
    color: `var(--black)`,
    fontWeight: `600`,
    fontSize: `16px`,
    textTransform: `unset`,
  },
  tabHeadUnactive: {
    color: `gray`,
    fontWeight: `600`,
    fontSize: `16px`,
    textTransform: `unset`,
  },
  desc: {
    color: `var(--black)`,
    fontWeight: `500`,
    fontSize: `14px`,
    marginTop: `10px`,
  },
  descImage: {
    display: `flex`,
    justifyContent: `center`,
    marginTop: `2rem`,
    '& span': {
      // height: "600px !important",
      width: `500px !important`,
    },
  },
}));
