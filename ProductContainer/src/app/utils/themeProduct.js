import { createTheme } from '@material-ui/core/styles';
import { robotoRegular } from './fontConfig';

const themeProduct = createTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: '#fff',
      paper: 'rgba(224, 224, 224, 0.3)',
    },
    primary: {
      main: '#145374',
    },
    secondary: {
      main: '#EE6F57',
    },
    text: {
      primary: '#145374',
      secondary: '#5B5B5B',
    },
  },
  typography: {
    h1: {
      fontFamily: ['Roboto-Regular', ' sans-serif'].join(','),
    },
    h2: {
      fontFamily: ['Roboto-Regular', ' sans-serif'].join(','),
    },
    h3: {
      fontFamily: ['Roboto-Regular', ' sans-serif'].join(','),
    },
    h4: {
      fontFamily: ['Roboto-Regular', ' sans-serif'].join(','),
    },
    h5: {
      lineHeight: '43px',
      letterSpacing: '0.07em',
      fontFamily: ['Roboto-Regular', ' sans-serif'].join(','),
    },
    h6: {
      fontFamily: ['Roboto-Regular', ' sans-serif'].join(','),
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [robotoRegular],
      },
    },
  },
});

// eslint-disable-next-line import/no-default-export
export default themeProduct;
