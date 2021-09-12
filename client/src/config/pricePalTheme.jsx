import { createTheme } from '@material-ui/core';

const PRIMARY_COLOR = '#7f34a0';
const SECONDARY_COLOR = '#ffffff';
const TEXT_COLOR_DARK = '#4b4b4b';
const TEXT_COLOR_LIGHT = '#767676';

export const pricePalTheme = createTheme({
  palette: {
    primary: {
      main: PRIMARY_COLOR,
    },
    secondary: {
      main: SECONDARY_COLOR,
    },
  },
  typography: {
    fontFamily: '"Assistant", "Helvetica", "Arial", sans-serif',
    h1: {
      color: TEXT_COLOR_DARK,
      fontSize: '1.5rem',
    },
    h2: {
      color: TEXT_COLOR_DARK,
      fontSize: '1.25rem',
    },
    h3: {
      color: TEXT_COLOR_DARK,
      fontSize: '1.1rem',
    },
    h5: {
      color: SECONDARY_COLOR,
      fontSize: 16,
    },
    subtitle1: {
      color: PRIMARY_COLOR,
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    subtitle2: {
      color: SECONDARY_COLOR,
      fontSize: '1.1rem',
      fontWeight: 600,
    },
    body1: {
      color: TEXT_COLOR_DARK,
    },
    body2: {
      color: TEXT_COLOR_LIGHT,
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
    },
    MuiTextField: {
      margin: 'normal',
      fullWidth: true,
    },
    MuiFormControl: {
      margin: 'normal',
      fullWidth: true,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 100,
        textTransform: 'none',
      },
    },
    MuiFormHelperText: {
      root: {
        margin: 'auto',
      },
    },
  },
});
