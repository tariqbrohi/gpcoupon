import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  menubar: {
    '& .MuiPaper-root': {
      borderRadius: '20px',
    },
    '& ul': {
      padding: '10px 4px',
      minWidth: '200px',
    },

    '& li': {
      fontSize: '12px',
    },
  },
  topBar: {
    padding: `0.5rem 0`,
    width: `100%`,
    backgroundColor: `#ffebf1`,
    '@media(max-width:770px)': {
      display: 'none',
    },
  },
  navMain: {
    width: `80%`,
    margin: `0 auto`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    marginTop: `1rem`,
    '@media(max-width:1030px)': {
      width: '100%',
      padding: '0 15px',
    },
    '@media(max-width:770px)': {
      display: 'none',
    },
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
    '@media(max-width:1030px)': {
      width: '250px',
      height: '50px',
    },
  },
  modalHead: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
    '& img': {
      marginLeft: '10px',
    },
  },
  modalHeadMobile: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 'bold',
    background: 'white',
    width: 'max-content',
    margin: '0 auto',
    borderRadius: '20px',
    padding: '5px 10px',
    '& img': {
      marginLeft: '10px',
    },
  },
  mobileBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft : "10px"
  },
  modalClose: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  modalBody: {
    '& .MuiPaper-root': {
      borderRadius: '20px !important',
      padding: '10px 20px',
    },
    '& .MuiListItem-root': {
      display: 'flex',
      alignItems: 'center',
    },

    '& .MuiListItem-root div': {
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiList-root span': {
      fontSize: '12px',
    },
    '& .MuiDialogTitle-root': {
      fontWeight: 'bold',
      color: 'black',
      paddingTop: '0',
    },
  },

  topBarDrawer: {
    '& .MuiPaper-elevation': {
      borderRadius: '20px 20px 0 0',
      paddingBottom: '60px',
      paddingTop: '20px',
    },
  },
}));
