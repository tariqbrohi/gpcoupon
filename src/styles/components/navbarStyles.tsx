import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  //   collapse: {
  //     background: theme.palette.background.primary,
  //     display: 'flex',
  //     flexDirection: 'column',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     cursor: 'pointer',
  //     width: '100%',
  //     borderTop: `1px solid ${theme.palette.border.lightBorder}`,
  //     padding: theme.spacing(1, 0, 2, 0),
  //     '& svg': {
  //       color: theme.palette.primary.main,
  //     },
  //     '&:hover p': {
  //       color: theme.palette.primary.main,
  //     },
  //   },
  topBar: {
    padding: `1.2rem 0`,
    width: `100%`,
    backgroundColor: `#ffebf1`,
  },
  navMain: {
    width: `80%`,
    margin: `0 auto`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    marginTop: `1rem`,
  },
  buttonContained: {
    background: `var(--primary)`,
    '&:hover': {
      background: `var(--primaryHover)`,
    },
  },
  headText: {
    fontSize: `14px`,
    fontWeight: `600`,
    cursor: `pointer`,
  },
  root: {
    background: `#f4f4f4`,
    padding: `14px 18px`,
    height: `55px`,
    width: `400px`,
    borderRadius: `10px`,
    cursor: `pointer`,
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
}));
