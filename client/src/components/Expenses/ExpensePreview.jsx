import {
  Button,
  Checkbox,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Typography,
} from '@material-ui/core';
import { AuthContext } from 'context/auth';
import { useContext, useState } from 'react';

export function ExpensePreview({ transaction }) {
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

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [createData('Frozen yoghurt', 159, 6.0, 24, 4.0)];
  console.log('transaction', transaction)

  return (
    <div>
      <Card style= {{ backgroundColor: '#2596be'}}>
        <CardContent>
          <TableContainer component={Paper} elevation={2}></TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontSize: '22' }}>
                  {transaction.title}
                </TableCell>
                <TableCell align="right">{transaction.date}</TableCell>
                <TableCell align="right">
                  {transaction.payer.firstName +
                    ' ' +
                    transaction.payer.lastName}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ backgroundColor: 'white', marginBottom: '30' }}>
              <TableRow>
              {transaction.owerInfos.map((owerInfo, idx) => (
                  <TableCell key = {idx }component="th" scope="row">
                  {owerInfo.user.firstName} {owerInfo.amount}
                  </TableCell>
              ))}

              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// const GET_TRANSACTION_BY_ID = gql`
// query Query($getTransactionByIdTransactionId: ID!) {
//   getTransactionById(transactionId: $getTransactionByIdTransactionId) {
//     id
//     title
//     type
//     date
//     description
//     img
//     payer {
//       id
//       email
//       profileImg
//       firstName
//       lastName
//     }
//     owerInfos {
//       id
//       amount
//       notes
//       user {
//         id
//         email
//         profileImg
//         firstName
//         lastName
//       }
//     }
//   }
// }`;
