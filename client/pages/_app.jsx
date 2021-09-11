import { makeStyles, MuiThemeProvider } from '@material-ui/core';
import { pricePalTheme } from '../src/config/pricePalTheme';
import Head from 'next/head';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
	},
	content: {
		// flex: 1,
		// padding: theme.spacing(2),
	},
	'@global': {
		'html,body': {
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
			<MuiThemeProvider theme={pricePalTheme}>
				<div className={styles.root}>
					<div className={styles.content}>
						<Component {...pageProps} />
					</div>
				</div>
			</MuiThemeProvider>
		</>
	);
}

export default MyApp;
