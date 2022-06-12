import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  mainConfirmation: {
    width: '25%',
    minHeight: '70vh',
    margin: '30px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& h5': {
      fontWeight: 'bold',
      marginBottom: '50px',
    },
    '& h6': {
      fontSize: '16px',
      fontWeight: 'bold',
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
  image: {
    width: '120px',
    height: '120px',
    marginRight: '20px',
    '& img': {
      boxShadow: '0 2px 8px 0 #f4f4f4',
      border: '1px solid #ebebeb',
      borderRadius: '16px',
    },
  },
  productContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px',
  },
  flexHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponDiv: {
    cursor: 'pointer',
    '&:hover': {
      background: 'ebebeb',
    },
  },
  divider: {
    margin: '15px 0',
  },
  smallDetail: {
    // textAlign: 'center',
    margin: '20px 0',
    opacity: '0.7',
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
  modalClose: {
    display: 'flex',
    width: 'max-content',
    marginLeft: 'auto',
    justifyContent: 'flex-end',
  },
  modalBody: {
    '& .MuiPaper-root': {
      borderRadius: '20px !important',
      paddingTop: '10px',
      width: '700px !important',
      '& .MuiDialogTitle-root': {
        textAlign: 'center',
      },
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
  modalSecondBody: {
    '& .MuiPaper-root': {
      textAlign: 'center',
      padding: '20px !important',
    },
    '& p': {
      margin: '20px 0',
    },
  },
  modalInner: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 10px',
    cursor: 'pointer',
    '& .MuiTextField-root': {
      width: '100%',
    },
  },
  availableCoupons: {
    minHeight: '300px',
    background: '#f6f6f6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& p': {
      color: '#676767',
      fontSize: '16px',
    },
  },
  leftArrow: {
    position: 'absolute',
    left: '10px',
    top: '-7px',
  },
  link: {
    background: 'rgba(255,60,120,.1)',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0',
    borderRadius: '8px',
    textAlign: 'left',
  },
  mobile: {
    background: '#f4f4f4',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0 30px 0',
    borderRadius: '8px',
    textAlign: 'left',
  },
}));
