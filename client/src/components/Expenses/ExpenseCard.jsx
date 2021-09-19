import { useQuery } from '@apollo/client';
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

export function ExpenseCard(props) {
  const context = useContext(AuthContext);
  const { user } = context;
//   const [values, setValues] = useState({
//     title: '',
//     description: '',
//     bannerImg: 'google.ca',
//     locked: false,
//     active: true,
//     users: user ? [user.id] : null,
//   });
  const [errors, setErrors] = useState({});


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
        <Typography variant="h1">Expense</Typography>
      </DialogTitle>
      <DialogContent>
      </DialogContent>
    </Dialog>
  );
}

const GET_TRANSACTION_BY_ID = gql`
query Query($getTransactionByIdTransactionId: ID!) {
  getTransactionById(transactionId: $getTransactionByIdTransactionId) {
    id
    title
    type
    date
    description
    img
    payer {
      id
      email
      profileImg
      firstName
      lastName
    }
    owerInfos {
      id
      amount
      notes
      user {
        id
        email
        profileImg
        firstName
        lastName
      }
    }
  }
}`;
