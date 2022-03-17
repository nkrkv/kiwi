import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

export const themeBase = createTheme({
  palette: {
    primary: {
      main: "#8cc749",
    },
    secondary: {
      main: "#4b9c99",
    },
    background: {
      default: "#ffffff",
    },
  },
});

export const theme = responsiveFontSizes(themeBase);
