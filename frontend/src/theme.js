import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'Circular Std Book'
  },
  palette: {
    primary: {
      main: '#1A2332',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#85C20D',
      contrastText: '#ffffff'
    }
  }
});

export const colors = {
  primary: '#1A2332',
  secondary: '#85C20D'
};
