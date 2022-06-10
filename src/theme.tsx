import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff3c78',
      // main: '#65C988',
      // main: 'linear-gradient(269.27deg, #2F8AF5 .52%, #0361CE 48.96%, #0FBEE4 100%)',
    },
    error: {
      main: '#c66065',
    },
    //   background: {
    //     main: '#F5F5F5',
    //     primary: '#fff',
    //     secondary: '#F5F5F5',
    //     input: '#F5F5F5',
    //     dialog: '#fff',
    //     secondary2: '#fff',
    //     disabled: '#E2E2E2',
    //     hover: '#E5E5E5',
    //     overlay: 'rgba(0,0,0,0.6)',
    //   },
    //   text: {
    //     primary: '#000',
    //     secondary: '#666',
    //     disabled: '#B2B2B2',
    //     placeholder: '#B8B8B8',
    //     title: '#787A97',
    //   },
    //   border: {
    //     lightBorder: '#E7E8EA',
    //   },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});

export const lightTheme: any = {
  primary: `#ff3c78`,
  primaryHover: `rgba(255,60,120,.7)`,
  secondary: `#ff3c78`,
  secondaryHover: `rgba(255,60,120,.7)`,
  black: 'black',
  white: `#fff`,
};
