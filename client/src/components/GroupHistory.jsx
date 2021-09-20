
import { makeStyles } from '@material-ui/styles';
import gql from 'graphql-tag';
import { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { AuthContext } from '../../src/context/auth';
import { ExpenseCard} from 'components/ExpenseCard';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 200,
  },
  media: {
    height: 140,
  },
  container: {
    flexGrow: 1,
  },
  space: {
    flexGrow: 1,
  },
}));

export function GroupHistory(props) {
  const styles = useStyles();
  const { groupId } = props;
  const [transactions, setTransactions] = useState([]);

  const context = useContext(AuthContext);

  const { loading } = useQuery(GROUP_TRANSACTIONS, {
    variables: { getTransactionsByGroupIdGroupId: groupId },
    onCompleted: (data) => {
    const filteredTransactions = [ ...data.getTransactionsByGroupId]

    const compareDates = (t1,t2) => {
        if ( !new Date(t1.date) || !new Date(t2.date)){
            console.log('invalid dates', t1,t2)
            return 0;
        }
        return new Date(t2.date) - new Date(t1.date);
    }
    filteredTransactions.sort(compareDates)

      console.log('filtered',filteredTransactions)
      setTransactions(filteredTransactions);
    },
  });


  console.log('context',context)

  return (
      <div>
{    transactions.map((transaction) => {
        return (
          <div style={{ margin: '100' }}>
            <ExpenseCard transaction={transaction} user ={context.user} />
          </div>
        );
      })}
      </div>
  );
}



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
