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

export function ExpensePreview( {transaction}) {
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
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  

  return (
    <Card>
      <CardContent>

      <TableContainer component={Paper}></TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor: 'grey'}}>
            <TableCell style={{fontSize: "22"}}>{transaction.title}</TableCell>
            <TableCell align="right">{transaction.date}</TableCell>
            <TableCell align="right">{transaction.payer.firstName + ' ' + transaction.payer.lastName}</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      </CardContent>
    </Card>
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
