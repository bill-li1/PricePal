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

export function ExpenseCard({ transaction, user }) {
  // const context = useContext(AuthContext);
  // const { user } = context;

  const [errors, setErrors] = useState({});
  const [expanded, setExpanded] = useState(false);
  // const [expenseColor, setExpenseColor] = useState(''#636363'')

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

  let expenseColor = '#00dea3';
  if (user.id === transaction.payer.id) {
    expenseColor = '#00dea3'; //green
  } else if (transaction.owerIds.includes(user.id)) {
    expenseColor = '#e80078'; //red
  } else {
    expenseColor = '#636363'; //grey
    // expenseColor ='#5BEC98'//purple
  }

  const useStyles = makeStyles(() => ({
    typography: {
      h1: {
        color: 'white',
      },
    },
    title: {
      color: 'white',
      backgroundColor: transaction.type == 'payment' ? '#00a5ff' : expenseColor,
    },
    subheader: {
      color: 'white',
      backgroundColor: '#5DB8FF',
    },
  }));
  const classes = useStyles();

  // console.log('transaction', transaction);
  if (!transaction) {
    return <div></div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card style={styles.cardBottom}>
          <CardHeader
            disableTypography={true}
            className={classes.title}
            title={<h1 style={styles.title}>{transaction.title}</h1>}
            subheader={
              transaction.type === 'payment'
                ? 'Direct Payment from ' +
                  transaction.owerInfos[0].user.firstName +
                  ' to ' +
                  transaction.payer.firstName +
                  ', ' +
                  new Date(transaction.date).toDateString()
                : 'Paid by ' +
                  transaction.payer.firstName +
                  ' ' +
                  transaction.payer.lastName +
                  ', ' +
                  new Date(transaction.date).toDateString()
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
                  <p style={styles.bodyText}>{transaction.description}</p>
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
  bodyText: {
    color: 'grey',
    marginLeft: '1rem'
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
