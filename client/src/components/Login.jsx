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
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Alert } from '@material-ui/lab';

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
  error: {
    fontSize: '12px',
  },
}));

export function Login(open) {
  const styles = useStyles();
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      console.log(data);
      router.push('/dashboard');
    },
    onError: (error) => {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    try {
      loginUser({
        variables: {
          loginLoginInput: values,
        },
      });
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
            <Grid item xs={12}>
              {Object.keys(errors).length > 0 &&
                Object.values(errors).map((err) => {
                  return (
                    <Alert severity="error" key={err}>
                      <Typography className={styles.error}>{err}</Typography>
                    </Alert>
                  );
                })}
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

const LOGIN_USER = gql`
  mutation Mutation($loginLoginInput: LoginInput) {
    login(loginInput: $loginLoginInput) {
      id
      email
      token
      profileImg
      firstName
      lastName
    }
  }
`;
