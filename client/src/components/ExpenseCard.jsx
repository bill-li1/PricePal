import {
  styled,
  Button,
  Checkbox,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Avatar,
  IconButton,
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

import { makeStyles } from '@material-ui/styles';

import { FaAngleDown } from 'react-icons/fa';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { Card, Table, Row, Col } from 'react-bootstrap';
import { AuthContext } from 'context/auth';
import { useContext, useState } from 'react';

export function ExpenseCard({ transaction }) {
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
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const useStyles = makeStyles(() => ({
    typography: {
      h1: {
        color: 'white',
      },
    },
    title: {
      color: 'white',
      backgroundColor: '#5DB8FF',
    },
    subheader: {
      color: 'white',
      backgroundColor: '#5DB8FF',
    },
  }));
  const classes = useStyles();

  console.log('transaction', transaction);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card style={styles.cardBottom}>
          <CardHeader
            disableTypography={true}
            className={classes.title}
            title={<h1 style={styles.title}>{transaction.title}</h1>}
            subheader={
              'Paid by ' +
              transaction.payer.firstName +
              ' ' +
              transaction.payer.lastName
            }
            style={styles.cardTop}
          >
            <h6>Hello</h6>
          </CardHeader>
          <CardContent>
            <Table sx={{ width: '100%' }}>
              <TableRow sx={{ width: '100%' }}>
                {transaction.owerInfos.map((owerInfo, idx) => (
                  <TableCell key={idx} component="th" scope="row">
                    {owerInfo.user.firstName} {owerInfo.amount}
                  </TableCell>
                ))}
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <FaAngleDown />
                  {/* <ExpandMoreIcon /> */}
                </ExpandMore>
              </TableRow>
            </Table>
          </CardContent>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <Typography paragraph>{transaction.description}</Typography>
                  <Table sx={{ width: '100%' }}>
                    <TableRow sx={{ width: '100%' }}>
                      {transaction.owerInfos.map((owerInfo, idx) => (
                        <TableCell key={idx} component="th" scope="row">
                          <h4>
                            {owerInfo.user.firstName +
                              ' ' +
                              owerInfo.user.lastName}
                          </h4>
                          <p>{'Owes: $' + owerInfo.amount}</p>
                          <p>{'Notes: ' + owerInfo.notes}</p>
                        </TableCell>
                      ))}
                    </TableRow>
                  </Table>
                </Grid>

                <Grid item xs={3}>
                  <img
                    style={styles.infoImg}
                    src={
                      transaction.img
                        ? transaction.img
                        : 'https://designshack.net/wp-content/uploads/placeholder-image.png'
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Collapse>
        </Card>

        {/* <Card className ="shadow-sm" style= {{borderRadius: '10px'}}>
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
          </Card> */}
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
  },
  infoImg: {
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  cardBottom: { borderRadius: '0px 0px 10px 10px', marginBottom: '1rem' },
  cardTop: { borderRadius: '10px 10px 0px 0px' },
};

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
