import { useMutation } from '@apollo/client';
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import { AuthContext } from 'context/auth';
import gql from 'graphql-tag';
import router from 'next/router';
import { useContext, useEffect, useState } from 'react';

export function CreateExpenseForm(props) {
  const context = useContext(AuthContext);
  const { user } = context;

  const now = new Date();
  const [values, setValues] = useState({
    title: '',
    type: 'expense',
    date: now,
    description: '',
    img: '',
    payer: '',
    group: '',
    owerIds: [],
    owerInfos: [],
  });
  const [errors, setErrors] = useState({});

  const [dateInput, setDateInput] = useState(
    now.getMonth() + 1 + '/' + now.getDate() + '/' + now.getFullYear()
  );
  const [owersId, setOwersId] = useState([]);
  const [owers, setOwers] = useState([]);
  const [firstPage, setFirstPage] = useState(true);
  const [amounts, setAmounts] = useState([]);
  const [notes, setNotes] = useState([]);

  const setDate = (event) => {
    setDateInput(event.target.value);
  };

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onClickOwersId = (event, newOwersId) => {
    setOwersId(newOwersId);
    let arr = [];
    props.users.map((user) => {
      if (newOwersId.includes(user.id)) {
        arr.push(user);
      }
    });
    setOwers(arr);
  };
  const next = () => {
    if (notes.length < owersId.length) {
      const diff = owersId.length - notes.length;
      for (var i = 0; i < diff; i++) {
        setNotes((oldNotes) => [...oldNotes, '']);
      }
    }
    if (amounts.length < owersId.length) {
      const diff = owersId.length - amounts.length;
      for (var i = 0; i < diff; i++) {
        setAmounts((oldAmounts) => [...oldAmounts, '']);
      }
    }
    setFirstPage(false);
  };

  const amountChange = (event, index) => {
    let arr = [...amounts];
    arr[index] = event.target.value;
    setAmounts(arr);
  };
  const notesChange = (event, index) => {
    let arr = [...notes];
    arr[index] = event.target.value;
    setNotes(arr);
  };

  const [createOwerInfo] = useMutation(CREATE_OWERINFO, {
    update(_, { data: { createOwerInfo: owerInfoData } }) {},
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
      if (error.graphQLErrors[0].extensions) {
        setErrors(error.graphQLErrors[0].extensions.errors);
      }
    },
  });

  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    update(_, { data: { createTransaction: transactionData } }) {
      router
        .push({
          pathname: '/LoadingPage',
          query: { redirectToGroup: props.group.id },
        })
        .then(() => router.reload());
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
      if (error.graphQLErrors[0].extensions) {
        setErrors(error.graphQLErrors[0].extensions.errors);
      }
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setErrors({});

    const orderPromise = owersId.map((owerId, index) => {
      const owerInfo = {
        user: owerId,
        amount: amounts[index],
        notes: notes[index],
      };
      try {
        return createOwerInfo({
          variables: {
            createOwerInfoOwerInfoInput: owerInfo,
          },
        });
      } catch (err) {
        console.log(err);
      }
    });

    Promise.all(orderPromise).then((responses) => {
      const owerInfoIds = responses.map((response) => {
        return response.data.createOwerInfo.id;
      });
      const transactionInput = {
        ...values,
        date: new Date(dateInput),
        group: props.group.id,
        owerIds: owersId,
        owerInfos: owerInfoIds,
      };
      try {
        createTransaction({
          variables: {
            createTransactionTransactionInput: transactionInput,
          },
        });
        props.onClose();
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <>
      <DialogTitle style={{ textAlign: 'center' }}>
        <Typography variant="h1">Add Expense</Typography>
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={onSubmit}>
          {firstPage ? (
            <div>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    label="Title"
                    placeholder="Best Restaurant"
                    variant="outlined"
                    margin="normal"
                    type="text"
                    name="title"
                    error={
                      errors && errors.hasOwnProperty('title') ? true : false
                    }
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
                      errors && errors.hasOwnProperty('description')
                        ? true
                        : false
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
                    helperText={
                      new Date(dateInput).toString() === 'Invalid Date'
                        ? 'Incorrect Date Format'
                        : ''
                    }
                    error={new Date(dateInput).toString() === 'Invalid Date'}
                    value={dateInput}
                    onChange={setDate}
                  />
                </Grid>
                <Grid item xs={4} style={{ textAlign: 'center' }}>
                  <img
                    src={
                      values.img.length === 0
                        ? 'https://designshack.net/wp-content/uploads/placeholder-image.png'
                        : values.img
                    }
                    alt="image"
                    width="200"
                    height="156"
                    style={{ objectFit: 'contain' }}
                  />
                  <TextField
                    label="Image Link"
                    placeholder="Your photo link here!"
                    variant="outlined"
                    margin="normal"
                    type="text"
                    name="img"
                    error={
                      errors && errors.hasOwnProperty('profileImg')
                        ? true
                        : false
                    }
                    value={values.img}
                    onChange={onChange}
                  />
                </Grid>
              </Grid>
              <FormControl style={{ margin: 0, marginBottom: 30 }}>
                <InputLabel id="select-label">Payer</InputLabel>
                <Select
                  labelId="select-label"
                  value={values.payer}
                  onChange={onChange}
                  label="Payer"
                  name="payer"
                >
                  {props.users?.map((user) => {
                    return (
                      <MenuItem value={user.id}>
                        {user.firstName + ' ' + user.lastName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <div>
                <Typography variant="h3" gutterBottom>
                  Owers
                </Typography>
                <ToggleButtonGroup value={owersId} onChange={onClickOwersId}>
                  {props.users?.map((user) => {
                    return (
                      <ToggleButton value={user.id}>
                        {user.firstName + ' ' + user.lastName}
                      </ToggleButton>
                    );
                  })}
                </ToggleButtonGroup>
              </div>
              <div>
                <DialogActions>
                  <Button variant="text" onClick={next}>
                    Next
                  </Button>
                </DialogActions>
              </div>
            </div>
          ) : (
            <div>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Ower</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {owers.map((user, idx) => (
                      <TableRow key={user.id}>
                        <TableCell style={{ fontSize: 17 }} scope="row">
                          {user.firstName + ' ' + user.lastName}
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            style={{ width: 90 }}
                            size="small"
                            placeholder="10"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            name="amount"
                            value={amounts[idx]}
                            onChange={(e) => amountChange(e, idx)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            size="small"
                            placeholder="Dish 1"
                            variant="outlined"
                            margin="normal"
                            type="text"
                            name="amount"
                            value={notes[idx]}
                            onChange={(e) => notesChange(e, idx)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <DialogActions>
                <Button color="primary" type="submit">
                  Create Expense
                </Button>
              </DialogActions>
            </div>
          )}
        </form>
      </DialogContent>
    </>
  );
}

const CREATE_OWERINFO = gql`
  mutation Mutation($createOwerInfoOwerInfoInput: OwerInfoInput!) {
    createOwerInfo(owerInfoInput: $createOwerInfoOwerInfoInput) {
      id
    }
  }
`;

const CREATE_TRANSACTION = gql`
  mutation CreateTransactionMutation(
    $createTransactionTransactionInput: TransactionInput!
  ) {
    createTransaction(transactionInput: $createTransactionTransactionInput) {
      id
      owerInfos {
        id
      }
    }
  }
`;
