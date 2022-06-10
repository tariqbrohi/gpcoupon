import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  topBar: {
    padding: `1.2rem 0`,
    width: `100%`,
    display: 'none',
    backgroundColor: `#ffebf1`,
    '@media(max-width:770px)': {
      display: `block`,
    },
  },
  navMain: {
    display: 'none',
    width: `80%`,
    margin: `0 auto`,
    marginTop: `1rem`,
    '@media(max-width:1030px)': {
      width: '100%',
      padding: '0 15px',
    },
    '@media(max-width:770px)': {
      display: `flex`,
      alignItems: `flex-start`,
      justifyContent: `flex-start`,
      flexDirection: 'column',
    },
  },
  buttonContained: {
    background: `var(--primary)`,
    '&:hover': {
      background: `var(--primaryHover)`,
    },
  },
  tags: {
    display: 'flex',
    margin: '20px 0',
    '@media(max-width:550px)': {
      margin: '20px 0 0 0',
    },
  },
  headText: {
    fontSize: `12px`,
    background: '#ebebeb',
    // fontWeight: `600`,
    cursor: `pointer`,
    borderRadius: '20px',
    padding: '8px 20px',
    dispaly: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '10px',
    '& svg': {
      fontSize: '16px',
      paddingTop: '4px',
    },
  },
  root: {
    background: `#f4f4f4`,
    padding: `14px 18px`,
    height: `45px`,
    width: `100%`,
    borderRadius: `10px`,
    cursor: `pointer`,
    '&, &:before': {
      border: `0`,
    },
    '& input': {
      cursor: `pointer`,
    },
    '@media(max-width:1030px)': {},
  },

  bottomTab: {
    // padding: '0 92px 0 26px',
    borderTop: '1px solid hsla(0,0%,85.1%,.5)',
    background: '#fff',
    width: '100%',
    position: 'fixed',
    zIndex: '10000',
    height: '55px',
    left: '0',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    '& svg': {
      fontSize: '22px',
      width: '30px',
      height: '30px',
      padding: '4px',
    },
    '& svg:hover': {
      cursor: 'pointer',
      background: `#f4f4f4`,
      borderRadius: '50%',
    },
  },
}));
