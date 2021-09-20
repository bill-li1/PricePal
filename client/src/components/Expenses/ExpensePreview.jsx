import {
  Button,
  Checkbox,
  // Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  // Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Typography,
} from '@material-ui/core';

import { Card, Table, Row, Col } from 'react-bootstrap';
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
  const [total, setTotal] = useState(0);

  console.log('transaction.owerInfos', transaction.owerInfos);
  return (
    <Grid container spacing = {2}>
      <Grid item xs = {12}>
        <Card className ="shadow-sm" style= {{borderRadius: '10px'}}>
          <Card.Header style={{ backgroundColor: '#55525a', borderRadius: '10px 10px 0px 0px' }}>
            <Row>
              <Col style={{ color: 'white' }}><h5>{transaction.title}</h5></Col>
              <Col style={{ textAlign: 'right', color: 'white' }}>
                {transaction.date} {transaction.payer.firstName}
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              {transaction.owerInfos.map((owerInfo) => {
                return (
                  <Col style={{ textAlign: 'center' }}>
                    <img style={styles.img}src= {"https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"}/>{owerInfo.user.firstName} {owerInfo.amount}
                  </Col>
                );
              })}
            </Row>
          </Card.Body>
        </Card>
        {/* <Card style= {{ backgroundColor: '#2596be'}}>
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
    </div> */}
      </Grid>
    </Grid>
  );
}

const styles = {
  img: {
    height: '50px',
  }
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
