import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  searchingcontainer: {
    padding: `5rem 7rem`,
    '& > :not(:last-child)': {
      marginBottom: `2rem`,
    },
  },
  searchOuterWrapper: {
    width: `100%`,
    display: `flex`,
  },
  searchInputWrapper: {
    position: `relative`,
    flexGrow: 1,
    '& svg': {
      position: `absolute`,
      top: `50%`,
      left: `1rem`,
      fontSize: `2rem`,
      transform: `translate(0,-55%)`,
    },
  },
  searchInput: {
    background: `#f4f4f4`,
    padding: `1.4rem 1.4rem 1.8rem 3rem`,
    height: `4rem`,
    width: `100%`,
    flexGrow: `1`,
    borderRadius: `1rem`,
    cursor: `pointer`,
    border: `none !important`,
    outline: `none`,
    '&:focus': {
      border: `none`,
    },
    '&, &:before': {
      border: `0`,
    },
    '& input': {
      cursor: `pointer`,
    },
    // "@media(max-width:550px)": {
    //     width: "100%",
    //   },
  },
  searchInputButton: {
    border: `none`,
    backgroundColor: `transparent`,
    backgroundRepeat: `no-repeat`,
    fontSize: `1.2rem`,
    fontWeight: `bold`,
    cursor: `pointer`,
  },
  searchMiniBnnerWrapper: {
    display: `flex`,
    '& > *': {
      marginRight: `2rem`,
      backgroundSize: `cover`,
      width: `100%`,
      maxWidth: `18rem`,
      maxHeight: `10rem`,
      height: `10rem`,
    },
  },
  searchMiniBanner: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    position: `relative`,
    backgroundSize: `contain`,
    backgroundPosition: `50%`,
    borderRadius: `1.6rem`,
  },
  searchMiniBannerText: {
    color: `var(--white)`,
  },
  SuggestionWrapper: {},
  SuggestionTitle: {
    fontWeight: `bold`,
    marginBottom: `2rem`,
  },
  SuggestionChipWrapper: {
    display: `flex`,
    flexWrap: `wrap`,
    '& > *': {
      marginBottom: `1rem`,
      fontSize: `1.6rem`,
      padding: `1.8rem 1rem`,
      borderRadius: `2rem`,
    },
    '& > :not(:last-child)': {
      marginRight: `1rem`,
    },
  },
  recentSearchWrapper: {},
  recentSearchTitle: {
    fontWeight: `bold`,
    marginBottom: `2rem`,
  },
}));
