import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  login: {
    margin: 'auto',
    width: 300,
    textAlign: 'center',
  },
  button: {
    color: theme.palette.secondary.main,
  },
  image: {
    width: '100%',
    height: '100%',
  },
}));
export default function Home() {
  const styles = useStyles();

  return (
    <main>
      <img
        alt="background"
        src="https://access2eic.eu/wp-content/uploads/2020/09/ma4rket.jpg"
        className={styles.image}
      />
      <Dialog open={true} className={styles.login}>
        <DialogTitle>
          <Typography variant="h1">PricePal</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="username"
            placeholder="john.doe"
            variant="outlined"
            margin="normal"
          />
          <TextField
            label="password"
            placeholder="Enter your password"
            variant="outlined"
            margin="normal"
            type="password"
          />
          <Grid container direction="row">
            <Grid item xs={12}>
              <Button fullWidth className={styles.button} color="primary">
                Login
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </main>
  );
}
