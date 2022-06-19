import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  signUpContainer: {
    height: `100vh`,
    overflow: `hidden`,
    display: `grid`,
    gridTemplateColumns: `1fr 1fr`,
    gridTemplateRows: `1fr`,
    [theme.breakpoints.down(`sm`)]: {
      gridTemplateColumns: `1fr`,
      gridTemplateRows: `1fr`,
    },
  },
  leftWrapper: {
    height: `100%`,
    backgroundColor: `#ffeaf0`,
    display: `flex`,
    alignItems: `center`,
    [theme.breakpoints.down(`sm`)]: {
      display: `none`,
    },
  },
  imageWrapper: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-around`,

    '& > *': {
      width: `27% !important`,
    },
    [theme.breakpoints.down(`md`)]: {
      flexDirection: `column`,
      '& > *': {
        width: `40% !important`,
      },
    },
    //   "& > :not(:last-child)":{
    //       marginRight:"1rem"
    //   }
  },
  rightWrapper: {
    [theme.breakpoints.down(`md`)]: {
      padding: `2rem`,
    },
  },
  rightHeader: {
    padding: `3.6rem`,
    display: `flex`,
    justifyContent: `space-between`,
    width: `100%`,
    [theme.breakpoints.down(`md`)]: {
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
      flexDirection: `column`,
    },
  },
  headerLogo: {
    width: `8rem`,
  },
  headerInnerRight: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems: `center`,
    '& > :not(:last-child)': {
      marginRight: `1rem`,
    },
    [theme.breakpoints.down(`md`)]: {
      flexDirection: `column`,
      '& > :not(:last-child)': {
        marginRight: `0`,
      },
    },
  },
  loginButton: {
    color: `var(--primary)`,
    border: `1px solid var(--primary)`,
    backgroundColor: `transparent`,
    borderRadius: `.7rem`,
    padding: `.7rem 1.3rem`,
    cursor: `pointer`,
    '&:hover': {
      backgroundColor: `rgba(231,56,118,0.2)`,
    },
  },
  rightMain: {
    maxWidth: `25rem`,
    margin: `0 auto`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    '& > :not(:last-child)': {
      marginBottom: `2rem`,
    },
    [theme.breakpoints.down(`md`)]: {
      '& > :not(:last-child)': {
        marginBottom: `1rem`,
      },
    },
  },
  rightMainLoginEmailButton: {
    color: `var(--white)`,
    border: `1px solid var(--primary)`,
    width: `100%`,
    fontSize: `1.3rem`,
    textTransform: `capitalize`,
    backgroundColor: `var(--primary)`,
    borderRadius: `.7rem`,
    padding: `.7rem 1.3rem`,
    cursor: `pointer`,
    '&:hover': {
      backgroundColor: `rgba(231,56,118,0.2)`,
    },
    [theme.breakpoints.down(`md`)]: {
      fontSize: `1rem`,
    },
  },
  // rightMainDivider:{
  //   position: "relative",
  //   padding: "20px",
  //   fontSize: "14px",
  //   fontWeight: "600",
  //   color: "#8d8d8d",
  //   '&:before':{
  //       content: "-",
  //   position: "absolute",
  //   top: "50%",
  //   left:"100%",
  //   width: "1000px",
  //   height:".2rem",
  //   borderBottom: "1px solid #bfbfbf",
  //   },
  //   // "& :after":{
  //   //     position: "absolute",
  //   // top: "50%",
  //   // right: "100%",
  //   // width: "1000px",
  //   // borderBottom: "1px solid #bfbfbf",
  //   // content: "",
  //   // }
  // },
  rightMainLoginGoogleButton: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    padding: `.7rem 1.3rem`,
    border: `1px solid  #bfbfbf`,
    width: `100%`,
    fontSize: `1.3rem`,
    backgroundColor: `var(--white)`,
    borderRadius: `.7rem`,
    cursor: `pointer`,
    '& > :not(:last-child)': {
      marginRight: `2rem !important`,
    },
    '& > span': {
      width: `fit-content`,
    },
    [theme.breakpoints.down(`md`)]: {
      fontSize: `1rem`,
    },
  },
  rightMainLoginFacebookButton: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    padding: `.7rem 1.3rem`,
    color: `var(--white)`,
    border: `1px solid #3b5998`,
    width: `100%`,
    fontSize: `1.3rem`,
    backgroundColor: `#3b5998`,
    borderRadius: `.7rem`,
    cursor: `pointer`,
    '& > :not(:last-child)': {
      marginRight: `2rem !important`,
    },
    '& > span': {
      width: `fit-content`,
    },
    [theme.breakpoints.down(`md`)]: {
      fontSize: `1rem`,
    },
  },
  // signUpCompleted page stylings
  emailVerifiedImage: {
    width: `100%`,
  },
  // signUpCompleted page stylings
}));
