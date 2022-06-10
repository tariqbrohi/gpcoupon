import { makeStyles } from '@mui/styles';
import { display, padding } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  main:{
      padding:"4rem",
      width:"100%",
      minHeight:"20rem",
      backgroundColor:"var(--white)",
      borderRadius:"1.2rem",
      boxShadow: `0 2px 13px 0 hsl(0deg 0% 70% / 50%)`,
      "& > :not(:last-child)":{
        marginBottom:"2rem"
      },
  }
}));
