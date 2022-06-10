import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    display: `flex`,
    flexDirection: `column`,
    padding: "1rem",
    width: '100%',
    borderRadius: '16px',
    cursor: 'pointer',
    marginTop: '12px',
    '&:hover': {
      backgroundColor: '#f4f4f4'
    }
  },
  head: {
    display: `flex`,
    alignItems: `center`,
  },
  logoDiv: {
    width: '50px !important',
    height: '50px !important',
    border: "1px solid #d9d9d9 !important",
    borderRadius: '16px !important'
  },
  logo: {
    borderRadius: '16px !important'
  },
  title: {
    fontSize: '16px',
    fontWeight: "600",
    paddingLeft: "8px",
    color: '#3c3c3c',
  },
  bannerDiv: {
    borderRadius: '16px !important',
    marginTop: "10px"
  },
  banner: {
    borderRadius: '16px !important'
  },
  para: {
    fontSize: "14px",
    color: '#3c3c3c',
    fontWeight: "300",
    marginTop: '6px'
  }

}));
