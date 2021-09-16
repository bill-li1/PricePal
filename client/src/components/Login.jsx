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
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  login: {
    margin: 'auto',
    width: 300,
    textAlign: 'center',
    // padding: 100,
  },
  button: {
    color: theme.palette.secondary.main,
  },
  forgotPassword: {
    cursor: 'pointer',
    marginTop: theme.spacing(1),
  },
}));

export function Login(open) {
  const styles = useStyles();
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  console.log(values);
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} className={styles.login}>
      <DialogTitle>
        <Typography variant="h1">PricePal</Typography>
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            label="email"
            placeholder="john.doe@gmail.com"
            variant="outlined"
            margin="normal"
            name="email"
            value={values.email}
            onChange={onChange}
          />
          <TextField
            label="password"
            placeholder="Enter your password"
            variant="outlined"
            margin="normal"
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
          />
          <Grid container direction="row">
            <Grid item xs={12}>
              <Button
                fullWidth
                className={styles.button}
                color="primary"
                type="submit"
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} className={styles.forgotPassword}>
              <Link href="/Register">
                <Typography variant="body2">
                  Don't have an account? Register here.
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} className={styles.forgotPassword}>
              <Link href="/resetpassword">
                <Typography variant="body2">Forgot your password?</Typography>
              </Link>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
