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
  Select,
  MenuItem
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { AuthContext } from 'context/auth';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';
import { format } from 'date-fns'

export function CreateExpenseForm(props) {
  const context = useContext(AuthContext);
  const { user } = context;
  const [values, setValues] = useState({
    title: '',
    description: '',
    bannerImg: 'google.ca',
    date: new Date(),
    payer: user ? [user.id] : null,
    owers: []
  });
  const [dateInput, setDateInput] = useState('')
  const [errors, setErrors] = useState({});
  
  const setDate = (event) => {
    setDateInput(event.target.value);
  }
  
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]:event.target.value,
    });
    console.log(values)
  };
  
  const [owers, setOwers] = useState([]);
  const onClickOwers = (event, newOwers) => {
    setOwers(newOwers)
  }

  
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
    setValues({
      ...values,
      date: new Date(dateInput),
      owers: owers
    });
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
      scroll={'paper'}
    >
      <DialogTitle style={{ textAlign: 'center' }}>
        <Typography variant="h1">Add Expense</Typography>
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            label="Title"
            placeholder="Best Restaurant"
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
            placeholder="Dinner at 12pm"
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
          <TextField
            label="Date"
            placeholder="Month/Day/Year"
            variant="outlined"
            margin="normal"
            type="text"
            name="date"
            helperText={new Date(dateInput).toString() === 'Invalid Date' ? "Incorrect Date Format" : ''}
            error={
              new Date(dateInput).toString() === 'Invalid Date'
            }
            value={dateInput}
            onChange={setDate}
          />
          <Typography variant="h1">People</Typography>

          <Select 
            value={values.payer}
            onChange={onChange}
            label='Payer'
          >
            <MenuItem></MenuItem>
          </Select>

          <ToggleButtonGroup
            value={owers}
            onChange={onClickOwers}
          >

          </ToggleButtonGroup>

          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button color="primary" type="submit">
                Create Expense
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
