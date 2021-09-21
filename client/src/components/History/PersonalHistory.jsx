import {
  Table,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import gql from 'graphql-tag';
import { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AuthContext } from '../../src/context/auth';
import { ExpenseCard } from 'components/Expenses/ExpenseCard';
import { StyleRounded } from '@material-ui/icons';
import { style } from 'dom-helpers';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxWidth: 345,
//     minWidth: 200,
//   },
//   media: {
//     height: 140,
//   },
//   container: {
//     flexGrow: 1,
//   },
//   space: {
//     flexGrow: 1,
//   },
// }));

export function PersonalHistory(props) {
  //   const styles = useStyles();
  const context = useContext(AuthContext);
  const { groupId, users } = props;
  const user2 = users[0]
  const user1 = context.user;
  const [transactions, setTransactions] = useState([]);

  const { loading } = useQuery(GROUP_TRANSACTIONS, {
    variables: { getTransactionsByGroupIdGroupId: groupId },
    onCompleted: (data) => {
      const filteredTransactions = [...data.getTransactionsByGroupId];

      const compareDates = (t1, t2) => {
        if (!new Date(t1.date) || !new Date(t2.date)) {
          console.log('invalid dates', t1, t2);
          return 0;
        }
        return new Date(t2.date) - new Date(t1.date);
      };

      const filterByUser = (transaction) => {
        if (!transaction.payer.id || !transaction.owerIds){
          return false;
        }
        if ((transaction.payer.id == user1.id &&
          transaction.owerIds.includes(user2.id)) ||
          (transaction.payer.id == user2.id &&
            transaction.owerIds.includes(user1.id))) {
              return true;
            }
            else {
              return false;
            }
      }
      filteredTransactions.filter(filterByUser);

      filteredTransactions.sort(compareDates);

      console.log('filtered', filteredTransactions);
      setTransactions(filteredTransactions);
    },
  });

  console.log('context', context);

  return (
    <div>
      <Paper style={styles.header}>
        <Table>
          <TableRow>
            <TableCell>
              <p style={styles.headerText}>
                Personal History between{' '}
                {context.user.firstName + ' ' + context.user.lastName} and{' '}
                {user2.firstName + ' ' + user2.lastName}
              </p>
            </TableCell>
            <TableCell>
              <p style={styles.headerText}>Your Current Balance is:</p>
            </TableCell>
          </TableRow>
        </Table>
      </Paper>

      {transactions.map((transaction) => {
        return (
          <div style={{ margin: '100' }}>
          <p>{transaction.payer.firstName}</p>
            <ExpenseCard transaction={transaction} user={context.user} />
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  header: {
    marginBottom: '2rem',
  },
  headerText: {
    fontSize: '1rem',
    color: 'grey',
  },
};

const GROUP_TRANSACTIONS = gql`
  query Query($getTransactionsByGroupIdGroupId: ID!) {
    getTransactionsByGroupId(groupId: $getTransactionsByGroupIdGroupId) {
      title
      type
      date
      description
      img
      payer {
        id
        email
        firstName
        profileImg
        lastName
      }
      owerIds
      owerInfos {
        id
        user {
          id
          email
          profileImg
          firstName
          lastName
        }
        notes
        amount
      }
    }
  }
`;
