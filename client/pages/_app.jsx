import { MuiThemeProvider } from "@material-ui/core";
import { pricePalTheme } from "config/pricePalTheme";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Keep track of balances with your peers."
        />
        <title>PricePal</title>
      </Head>
      <MuiThemeProvider theme={pricePalTheme}>
        <Component {...pageProps} />
      </MuiThemeProvider>
    </>
  );
}

export default MyApp;
