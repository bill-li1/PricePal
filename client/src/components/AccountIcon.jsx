import React, { useContext, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useRouter } from 'next/router';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ListItemIcon,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import PageviewIcon from '@material-ui/icons/Pageview';
import { AuthContext } from 'context/auth';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  menu: {
    '&&': {
      width: 230,
    },
  },
  image: {
    display: 'block',
    width: 35,
    height: 35,
    margin: 'auto',
    borderRadius: '50%',
    objectPosition: 'center',
    objectFit: 'cover',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(3),
    },
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(2),
    },
  },
  iconButton: {
    width: 59,
    height: 59,
  },
  profileImg: {
    borderRadius: '50%',
    height: 300,
    width: 300,
  },
}));

export function AccountIcon() {
  const styles = useStyles();
  const { user, logout } = useContext(AuthContext);
  const { push } = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [values, setValues] = useState({
    userId: user ? user.id : null,
    firstName: user ? user.firstName : '',
    lastName: user ? user.lastName : '',
    password: user ? user.password : '',
    profileImg: user ? user.profileImg : '',
  });
  const [confirmPassword, setConfirmPassword] = useState(
    user ? user.password : ''
  );
  const [errors, setErrors] = useState({});
  const [passwordError, setPasswordError] = useState('');

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEditClose = () => {
    setEditOpen(false);
  };

  const actions = [
    {
      label: 'Edit Profile',
      onClick: () => {
        setEditLoading(true);
        setEditOpen(true);
        setEditLoading(false);
      },
      loading: editLoading,
      icon: <EditIcon fontSize="small" />,
    },
    {
      label: 'Log Out',
      onClick: logout,
      loading: false,
      icon: <ExitToAppIcon fontSize="small" />,
    },
  ];

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [editProfile] = useMutation(EDIT_USER, {
    update(_, { data: { editUser: userData } }) {
      console.log(userData);
      setEditOpen(false);
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
      // console.log('error', error.graphQLErrors[0].extensions.exception.errors);
      if (error.graphQLErrors[0]) {
        setErrors(error.graphQLErrors[0].extensions.exception.errors);
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    setPasswordError('');
    try {
      if (confirmPassword !== values.password || values.password === '') {
        setPasswordError('Wrong Credentials');
      } else {
        editProfile({
          variables: {
            editUserEditUserInput: values,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <IconButton
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
        className={styles.iconButton}
      >
        {values.profileImg !== '' ? (
          <img src={values.profileImg} alt="profile" className={styles.image} />
        ) : (
          <AccountCircle fontSize="large" />
        )}
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        {actions.map((action) => (
          <MenuItem
            key={action.label}
            onClick={action.onClick}
            disabled={action.loading}
            className={styles.menu}
          >
            <ListItemIcon>{action.icon}</ListItemIcon>
            {action.loading ? (
              <CircularProgress
                size={24}
                color="primary"
                style={{ margin: 'auto' }}
              />
            ) : (
              <div>{action.label}</div>
            )}
          </MenuItem>
        ))}
      </Menu>
      <Dialog open={editOpen} onClose={onEditClose}>
        <DialogTitle>
          <Typography variant="h1">Edit Profile</Typography>
        </DialogTitle>
        <form noValidate onSubmit={onSubmit}>
          <DialogContent style={{ textAlign: 'center' }}>
            <img
              src={
                values.profileImg.length === 0
                  ? 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8='
                  : values.profileImg
              }
              alt="profile"
              className={styles.profileImg}
            />
            <TextField
              label="Profile Image Link"
              placeholder="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8="
              variant="outlined"
              margin="normal"
              type="text"
              name="profileImg"
              error={
                errors && errors.hasOwnProperty('profileImg') ? true : false
              }
              value={values.profileImg}
              onChange={onChange}
            />
            <TextField
              label="First Name"
              placeholder="John"
              variant="outlined"
              margin="normal"
              type="text"
              name="firstName"
              error={
                errors && errors.hasOwnProperty('firstName') ? true : false
              }
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
            <Grid container>
              <Grid item xs={12}>
                {errors &&
                  Object.keys(errors).length > 0 &&
                  Object.values(errors).map((err) => {
                    return (
                      <Alert severity="error" key={err}>
                        {err.message}
                      </Alert>
                    );
                  })}
                {passwordError && (
                  <Alert severity="error">{passwordError}</Alert>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" type="submit">
              Submit Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

const EDIT_USER = gql`
  mutation Mutation($editUserEditUserInput: EditUserInput) {
    editUser(editUserInput: $editUserEditUserInput) {
      id
      email
      firstName
      profileImg
      lastName
    }
  }
`;
