import { makeStyles } from '@mui/styles';
import { display } from '@mui/system';

export const useStyles = makeStyles((theme: any) => ({
  carousaldiv: {
    padding: `1rem`,
    width: `100%`,
    display: `flex`,
    justifyContent: `center`,
    margin: `2rem 0`,
    backgroundColor: '#f9f9f9'
  },

  itemDiv: {
    width: `100%`,
    display: `flex`,
    // alignItems: `center`,
    // justifyContent: `center`,
    // gap: `0.1rem`,
    // padding: `0 4rem`,
  },

  carousal: {
    width: `78%`,
  },
  cardDiv: {
    width: `100%`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,

    // wi
    // gap: `0.1rem`,
    // padding: `0 4rem`,
  },
  card: {
    width: '90%',
    height: 'auto',
    paddingBottom: `50px`,
    boxShadow: '0px 0px 5px #c1c1c1',
    margin: 20,
  }
}));
