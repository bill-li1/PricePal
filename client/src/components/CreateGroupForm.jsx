import { useMutation } from '@apollo/client';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { AuthContext } from 'context/auth';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';

export function CreateGroupForm(props) {
  const context = useContext(AuthContext);
  const { user } = context;
  const [values, setValues] = useState({
    title: '',
    description: '',
    bannerImg: 'google.ca',
    locked: false,
    active: true,
    users: user ? [user.id] : null,
  });
  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.name === 'locked'
          ? event.target.checked
          : event.target.value,
    });
  };

  const [addGroup, { loading }] = useMutation(CREATE_GROUP, {
    update(_, { data: { createGroup: groupData } }) {
      console.log(groupData);
      context.login(groupData);
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
      if (error.graphQLErrors[0].extensions) {
        setErrors(error.graphQLErrors[0].extensions.errors);
      }
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    try {
      // Check if user exists and auth stuff over here
      addGroup({
        variables: {
          createGroupGroupInput: values,
        },
      });
      props.onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog
      open={props.open}
      maxWidth="md"
      onClose={props.onClose}
      PaperProps={{
        style: { borderRadius: 40, boxShadow: '5px 5px 5px rgb(76, 81, 89)' },
      }}
    >
      <DialogTitle style={{ textAlign: 'center' }}>
        <Typography variant="h1">Create Group</Typography>
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            label="Title"
            placeholder="Our Expense Sheet"
            variant="outlined"
            margin="normal"
            type="text"
            name="title"
            error={errors && errors.hasOwnProperty('title') ? true : false}
            value={values.title}
            onChange={onChange}
          />
          <TextField
            label="Description"
            placeholder="Keep track of our expenses"
            variant="outlined"
            margin="normal"
            type="text"
            name="description"
            error={
              errors && errors.hasOwnProperty('description') ? true : false
            }
            value={values.description}
            onChange={onChange}
          />
          {/* <TextField
            label="Code"
            placeholder="expensesheet"
            variant="outlined"
            margin="normal"
            type="text"
            name="code"
            error={errors && errors.hasOwnProperty('code') ? true : false}
            value={values.code}
            onChange={onChange}
          /> */}
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={values.locked}
                onChange={onChange}
                name="locked"
              />
            }
            label="locked"
          />
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button color="primary" type="submit">
                Create Group
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const CREATE_GROUP = gql`
  mutation Mutation($createGroupGroupInput: GroupInput!) {
    createGroup(groupInput: $createGroupGroupInput) {
      id
      code
      title
      description
      bannerImg
      locked
      active
    }
  }
`;
