import { makeStyles, MuiThemeProvider, Typography } from "@material-ui/core";
import { pricePalTheme } from "./pricePalTheme.jsx";
import { Header } from "./components/Header";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "html,body": {
      fontFamily: pricePalTheme.typography.fontFamily,
      margin: 0,
      height: "100%",
      padding: 0,
      scrollBehavior: "smooth",
    },
    "*, :after, :before": {
      boxSizing: "border-box",
    },
    "a.clean": {
      color: "unset",
      textDecoration: "unset",
    },
  },
}));

function App() {
  return (
    <>
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Keep track of prices among your peers."
        />
      </head>
      <MuiThemeProvider theme={pricePalTheme}>
        <main>
          <Header />
          <Typography variant="h1">Hello World</Typography>
        </main>
      </MuiThemeProvider>
    </>
  );
}

export default App;
