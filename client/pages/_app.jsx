import { makeStyles, MuiThemeProvider } from '@material-ui/core';
import { pricePalTheme } from '../src/config/pricePalTheme';
import Head from 'next/head';
import { Header } from '../src/components/Header';
import { AuthProvider } from '../src/context/auth';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
// import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  content: {
    flex: 1,
  },
  '@global': {
    'html,body,main': {
      fontFamily: pricePalTheme.typography.fontFamily,
      margin: 0,
      height: '100%',
      padding: 0,
      scrollBehavior: 'smooth',
    },
    '*, :after, :before': {
      boxSizing: 'border-box',
    },
    'a.clean': {
      color: 'unset',
      textDecoration: 'unset',
    },
  },
}));

const httpLink = createHttpLink({
  uri: 'http://localhost:8000',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }) {
  const styles = useStyles();
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
      <ApolloProvider client={client}>
        <AuthProvider>
          <MuiThemeProvider theme={pricePalTheme}>
            <div className={styles.root}>
              <Header />
              <div className={styles.content}>
                <Component {...pageProps} />
              </div>
            </div>
          </MuiThemeProvider>
        </AuthProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
