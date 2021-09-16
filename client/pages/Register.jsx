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
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

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
  const router = useRouter();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    profileImg: 'google.ca',
    password: '',
    email: '',
  });
  const [confirmPassword, setConfirmPassword] = useState();

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      // Check if user exists and auth stuff over here
      console.log(values);
      addUser({
        variables: {
          registerRegisterInput: values,
        },
      });
      // router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(values);

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
              value={confirmPassword}
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
      id
      email
      token
      profileImg
      firstName
      lastName
    }
  }
`;
