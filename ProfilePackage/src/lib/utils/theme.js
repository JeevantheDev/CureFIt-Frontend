import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: '#E5E5E5',
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
      secondary: '#455A64',
    },
  },
  typography: {
    h5: {
      fontSize: '37px',
      lineHeight: '43px',
      letterSpacing: '0.07em',
    },
  },
});

export default theme;
