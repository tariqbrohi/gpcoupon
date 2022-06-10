import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: any) => ({
  container: {
    display: 'none',
    padding: `2rem 1rem 5rem 1rem`,
    '@media(max-width:770px)': {
      display: `flex`,
      //   alignItems: `center`,
      //   justifyContent: `center`,
      flexDirection: `column`,
    },
  },
  linksection: {
    width: `80%`,
    display: `flex`,
    justifyContent: `space-between`,
  },
  sec: {
    width: `max-content`,
    display: `flex`,
    flexDirection: `column`,
    '& div': {
      borderRadius: '16px',
      padding : "6px"
    },
  },
  secHeading: {
    fontSize: `16px`,
    fontWeight: `600`,
    marginBottom: `16px`,
    color: `#606060`,
  },
  link: {
    color: `#606060`,
    margin: `4px 0`,
  },
  lastsec: {
    // width: '80%',
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    flexDirection: `column`,
    marginTop: `2rem`,
  },
  para: {
    fontSize: `12px`,
    color: `#606060`,
  },
  mainAccordion: {
    margin: '10px 0',
  },
  accordian: {
    boxShadow: 'none',
    fontSize: '14px',
    '& .MuiAccordionSummary-content': {
      color: '#606060',
    },
    '&:before , &:after': {
      display: 'none',
    },
    '& p': {
      color: '#606060',
      fontSize: '13px',
      margin: '10px 0',
    },
    // '@media(max-width:330px)': {
    //   '& .MuiAccordionDetails-root': {
    //     padding: '8px 5px 16px',
    //   },
    // },
  },
}));
