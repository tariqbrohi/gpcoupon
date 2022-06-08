import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    flexDirection: `column`,
    margin: `4rem 0`,
  },
  header: {
    width: `78%`,
    marginBottom: `1.5rem`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
  },
  heading: {
    fontSize: `28px`,
    fontWeight: `600`,
  },
  itemContainer: {
    // display: `flex`,
    // alignItems: `center`,
    // justifyContent: `center`,
    padding: `20px`,
    borderRadius: `20px`,
    paddingBottom: `40px`,
    '&:hover': {
      background: `#f3f3f3`,
    },
  },
  itemHeader: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600
  },
  arrowDiv: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    gap: `10px`,
  },
  icon: {
    cursor: `pointer`,
    backgroundColor: `#ebebeb`,
    borderRadius: `50%`,
    height: `36px`,
    width: `36px`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    padding: `10px`,
    '&:hover': {
      background: `#cbcbcb`,
    },
  },
  main: {
    display: `flex`,
    flexWrap: 'wrap',
    alignItems: `baseline`,
    justifyContent: `center`,
    width: `75% !important`,
    gap: `1rem`,
  },
  imageDiv: {
    display: `flex`,
    justifyContent: `center`,
    flexDirection: `column`,
    maxHeight: "100px !important",
    minHeight: "100px !important",
    maxWidth: `200px !important`,
    minWidth: `200px !important`,

  },
  image: {
    borderRadius: `12px`,
    cursor: `pointer`,
    objectFit: `cover`
  },
  avatar: {
    maxWidth: `45px !important`,
    minWidth: `45px !important`,
    maxHeight: `45px !important`,
    minHeight: `45px !important`,
    borderRadius: `12px`
  },
  avatarDiv: {
    height: `45px`,
    width: `45px`,
    margin: `10px`,
    marginLeft: `0px`,
    marginTop: `0px`,
  },
  title: {
    fontSize: `14px`,
    marginTop: `10px`,
  },
  chip: {
    height: `48px`,
    padding: `0 20px`,
    borderRadius: `32px`,
    backgroundColor: `#f3f3f3`,
    fontSize: `14px`,
    fontWeight: 600,

  },
  chipSelected: {
    height: `48px`,
    padding: `0 20px`,
    borderRadius: `32px`,
    fontSize: `14px`,
    fontWeight: 600,
    backgroundColor: `#ff3c78`,
    color: `#fff`
  }
}));
