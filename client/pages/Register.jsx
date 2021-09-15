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
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

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
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: values,
  });

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    try {
      // Check if user exists and auth stuff over here
      addUser();
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(values);

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
              name="email"
              value={values.email}
              onChange={onChange}
            />
            <TextField
              label="First Name"
              placeholder="John"
              variant="outlined"
              margin="normal"
              name="firstName"
              value={values.firstName}
              onChange={onChange}
            />
            <TextField
              label="Last Name"
              placeholder="Doe"
              variant="outlined"
              margin="normal"
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
              value={values.confirmPassword}
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
  mutation register(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $confirmPassword: String!
    $profileImage: String!
  ) {
    register(
      registerInput: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
        confirmPassword: $confirmPassword
        profileImage: $profileImage
      }
    ) {
      id
      email
      firstName
      lastName
      profileImage
      createdAt
      token
    }
  }
`;
