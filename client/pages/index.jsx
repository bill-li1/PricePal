import { Grid, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	image: {
		maxWidth: '100%',
	},
	login: {
		marginTop: 'auto',
		marginBottom: 'auto',
		marginLeft: theme.spacing(3),
	},
}));
export default function Home() {
	const styles = useStyles();
	return (
		<main>
			<Grid container direction="row">
				<Grid item xs={12} md={4}>
					<img className={styles.image} alt="logo" src="/mockup.svg" />
				</Grid>
				<Grid item xs={12} md={6} className={styles.login}>
					<Grid container direction="column" spacing={2}>
						<Grid item>
							<Typography variant="h1">Pay your way.</Typography>
						</Grid>
						<Grid item>
							<TextField
								variant="outlined"
								placeholder="john.doe"
								label="username"
							/>
						</Grid>
						<Grid item>
							<TextField
								variant="outlined"
								placeholder="*********"
								label="password"
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</main>
	);
}
