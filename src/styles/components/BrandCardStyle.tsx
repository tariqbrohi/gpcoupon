import { makeStyles } from '@mui/styles';
import { borderRadius } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    position: `relative`,
    display: `flex`,
    flexDirection: `column`,
    border: `1px solid #e4e4e4`,
    borderRadius: `16px !important`,
    marginBottom: `1rem`,
  },
  BannerDiv: {
    width: `100% !important`,
  },
  banner: {
    borderTopLeftRadius: `16px !important`,
    borderTopRightRadius: `16px !important`,
  },
  infoDiv: {
    width: `100% !important`,
    height: `100px !important`,
    backgroundColor: `white`,
    borderRadius: `16px !important`,
    paddingLeft: `5%`,
    paddingTop: `20px`,
  },
  logoDiv: {
    width: `50px !important`,
    position: `absolute`,
    left: `5%`,
    borderRadius: `16px !important`,
    top: `45%`,
  },
  logo: {
    borderRadius: `16px !important`,
  },
}));
