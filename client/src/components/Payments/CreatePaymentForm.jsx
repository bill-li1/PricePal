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
import { useContext, useState } from 'react';

export function CreatePaymentForm(props) {
  const context = useContext(AuthContext);
  const { user } = context;

  const now = new Date();
  const [values, setValues] = useState({
    title: '',
    type: 'payment',
    date: now,
    description: '',
    img: '',
    payer: '', //receiving money
    group: '',
    owerIds: [user.id], //sending money
    owerInfos: [],
  });
  const [errors, setErrors] = useState({});

  const [dateInput, setDateInput] = useState(
    now.getMonth() + 1 + '/' + now.getDate() + '/' + now.getFullYear()
  );
  const [newPayer, setPayer] = useState({});
  const [payerName, setPayerName] = useState('?');
  const [amount, setAmount] = useState();

  const setDate = (event) => {
    setDateInput(event.target.value);
  };

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onClickPayer = (e, newPayer) => {
    setPayer(newPayer);
    const event = {
      target: {
        name: 'payer',
        value: newPayer,
      },
    };
    onChange(event);
    console.log(values);
    for (const item of props.users) {
      if (item.id === newPayer) {
        setPayerName(item.firstName + ' ' + item.lastName);
      }
    }
  };

  const amountChange = (event) => {
    setAmount(event.target.value);
  };

  const [createOwerInfo] = useMutation(CREATE_OWERINFO, {
    update(_, { data: { createOwerInfo: owerInfoData } }) {
      const transactionInput = {
        ...values,
        date: new Date(dateInput),
        group: props.group.id,
        owerInfos: owerInfoData.id,
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
    },
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
    const owerInfo = {
      user: user.id,
      amount: amount,
      notes: '',
    };
    try {
      createOwerInfo({
        variables: {
          createOwerInfoOwerInfoInput: owerInfo,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <DialogTitle style={{ textAlign: 'center' }}>
        <Typography variant="h1">Add Payment</Typography>
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={onSubmit}>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField
                  label="Title"
                  placeholder="August Payment"
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
                  placeholder="Includes: Item 1, Item 2..."
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
                    errors && errors.hasOwnProperty('profileImg') ? true : false
                  }
                  value={values.img}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Typography variant="h3" style={{ marginBottom: 20 }}>
              Sender: {user.firstName + ' ' + user.lastName}
            </Typography>
            <div>
              <Typography variant="h3" gutterBottom>
                Receiver
              </Typography>
              <ToggleButtonGroup
                exclusive
                value={values.payer}
                onChange={onClickPayer}
              >
                {props.users?.map((newUser) => {
                  if (newUser.id != user.id) {
                    return (
                      <ToggleButton key={newUser.id} value={newUser.id}>
                        {newUser.firstName + ' ' + newUser.lastName}
                      </ToggleButton>
                    );
                  }
                })}
              </ToggleButtonGroup>
            </div>
          </div>
          <div>
            <TextField
              label={'Amount to ' + payerName}
              placeholder="5"
              variant="outlined"
              margin="normal"
              type="number"
              name="amount"
              value={amount}
              onChange={amountChange}
            />
            <DialogActions>
              <Button color="primary" type="submit">
                Send Payment
              </Button>
            </DialogActions>
          </div>
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
