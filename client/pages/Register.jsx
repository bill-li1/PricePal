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
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Alert } from '@material-ui/lab';
import { AuthContext } from '../src/context/auth';

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
export default function register() {
  const styles = useStyles();
  const context = useContext(AuthContext);
  const router = useRouter();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    profileImg: 'google.ca',
    password: '',
    email: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordError, setPasswordError] = useState('');

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      console.log(userData);
      context.login(userData);
      router.push('/Dashboard');
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    setPasswordError('');
    try {
      if (confirmPassword !== values.password) {
        setPasswordError('Password does not match');
      } else {
        addUser({
          variables: {
            registerRegisterInput: values,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      <img
        alt="background"
        src="https://wallpaperaccess.com/full/656693.jpg"
        className={styles.image}
      />
      <Dialog open={true} className={styles.login}>
        <DialogTitle>
          <Typography variant="h1">PricePal</Typography>
        </DialogTitle>
        <DialogContent>
          <form noValidate onSubmit={onSubmit}>
            <TextField
              label="Email"
              placeholder="john.doe@gmail.com"
              variant="outlined"
              margin="normal"
              type="text"
              name="email"
              error={errors && errors.hasOwnProperty('email') ? true : false}
              value={values.email}
              onChange={onChange}
            />
            <TextField
              label="First Name"
              placeholder="John"
              variant="outlined"
              margin="normal"
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={onChange}
            />
            <TextField
              label="Last Name"
              placeholder="Doe"
              variant="outlined"
              margin="normal"
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={onChange}
            />
            <TextField
              label="password"
              placeholder="Enter your password"
              variant="outlined"
              margin="normal"
              type="password"
              name="password"
              error={passwordError.length !== 0 ? true : false}
              value={values.password}
              onChange={onChange}
            />
            <TextField
              label="Confirm password"
              placeholder="Confirm your password"
              variant="outlined"
              margin="normal"
              type="password"
              name="confirmPassword"
              error={passwordError.length !== 0 ? true : false}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <Grid container direction="row">
              <Grid item xs={12}>
                <Button
                  fullWidth
                  className={styles.button}
                  color="primary"
                  type="submit"
                >
                  Register
                </Button>
                <Grid item xs={12}>
                  {errors &&
                    Object.keys(errors).length > 0 &&
                    Object.values(errors).map((err) => {
                      return (
                        <Alert severity="error" key={err}>
                          {err}
                        </Alert>
                      );
                    })}
                  {passwordError && (
                    <Alert severity="error">{passwordError}</Alert>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}

const REGISTER_USER = gql`
  mutation Mutation($registerRegisterInput: RegisterInput) {
    register(registerInput: $registerRegisterInput) {
      email
      profileImg
      firstName
      lastName
    }
  }
`;
