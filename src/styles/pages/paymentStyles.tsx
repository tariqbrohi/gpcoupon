import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  mainConfirmation: {
    width: '40%',
    minHeight: '70vh',
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '@media(max-width:1030px)': {
      width: '70%',
    },
    '@media(max-width:770px)': {
      width: '100%',
    },

    '& .MuiTextField-root': {
      width: '100%',
    },
    '& h5': {
      fontWeight: 'bold',
      marginBottom: '50px',
    },
    '& .MuiTypography-h6': {
      fontSize: '16px',
      fontWeight: 'bold',
      marginTop: '10px !important',
    },
    '& .MuiTypography-subtitle2': {
      fontWeight: 'bold',
      fontSize: '16px',
      marginBottom: '10px',
    },
    '& .MuiTypography-caption': {
      fontSize: '13px',
    },
  },
  buttonContained: {
    width: '100%',
    height: '55px',
    background: `var(--primary)`,
    borderRadius: '12px',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: '16px',
    '&:hover': {
      background: `var(--primaryHover)`,
    },
  },
}));
