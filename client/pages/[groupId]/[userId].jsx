// @ts-nocheck
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { AuthContext } from '../../src/context/auth';
import { LockRounded } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { commonGroups } from '../../src/utils/functions';
// import { ExpenseCard } from 'components/Expenses/ExpenseCard';
import { UserCard } from 'components/UserCard';
import { GroupHistory } from 'components/History/GroupHistory';
import { PersonalHistory } from 'components/History/PersonalHistory';
// @ts-ignore
import { Loading } from 'components/Loading';
import { CreateExpenseButton } from 'components/Expenses/CreateExpenseButton';
import { CreateExpenseForm } from 'components/Expenses/CreateExpenseForm';

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% - 1.5rem)',
    maxWidth: '82.5rem',
  },
  mainContent: {
    marginTop: '1.5rem',
    backgroundColor: '#1967d2',
    borderRadius: '0.5rem',
    overflow: 'hidden',
  },
  mainWrapper1: {
    height: '15rem',
    position: 'relative',
    width: '100%',
  },
  mainBgImage: {
    backgroundSize: 'cover',
    height: '100%',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
    marginBottom: '2rem',
  },
  mainEmptyStyles: {
    display: 'block',
    height: '100 %',
    left: '0',
    opacity: '0.8',
    position: 'absolute',
    top: '0',
    width: '100 %',
  },
  mainText: {
    position: 'relative',
    padding: '1.5rem',
  },
  mainHeading: {
    fontFamily: 'Google Sans, Roboto, Arial, sans - serif',
    fontSize: '2.25rem',
    lineHeight: '2.75rem',
    color: '#fff',
    margin: '0',
  },
  mainSection: {
    fontFamily: 'Google Sans, Roboto, Arial, sans - serif',
    fontSize: '1.375rem',
    lineHeight: '1.75rem',
    marginTop: '0.6rem',
    color: '#fff',
  },
  mainWrapper2: {
    color: '#fff',
    flexWrap: 'wrap',
    marginTop: '0.5rem',
  },
  mainCode: {
    fontStyle: 'normal',
  },
  mainAnnounce: {
    display: 'flex',
    justifyContent: 'center',
    flexShrink: '0',
    marginTop: '2rem',
  },
  mainAnnouncements: {
    // padding: '1rem',
    paddingLeft: '1rem',
    overflow: 'hidden',
    marginLeft: '1rem',
    width: '100%',
  },
  mainSubText: {
    marginTop: '1.5rem',
    color: '#807373',
  },
  mainStatus: {
    border: '1.5px solid #dadce0',
    padding: '20px',
    borderRadius: '10px',
    width: '20vw',
  },
  mainWrapper100: {
    display: 'flex!important',
    cursor: 'pointer',
    alignItems: 'center',
  },
  mainForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  mainButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50vw',
    marginTop: '20px',
  },
  test: {
    border: '3px solid red',
    padding: '0',
    margin: '0',
  },
  editContainer: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  editButton: {
    padding: 15,
  },
}));

export default function UserPage() {
  const styles = useStyles();
  const [user, setUser] = useState({});
  const [group, setGroup] = useState({});
  // const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  // const [transactions, setTransactions] = useState([]);
  const router = useRouter();
  const userQueryKey = 'userId';
  const groupQueryKey = 'groupId';
  const [userId, setUserId] = useState(router.query[userQueryKey] ||
    router.asPath.match(new RegExp(`[&?]${userQueryKey}=(.*)(&|$)`)));
  const groupId =
    router.query[groupQueryKey] ||
    router.asPath.match(new RegExp(`[&?]${groupQueryKey}=(.*)(&|$)`));

  const context = useContext(AuthContext);

  const [createExpense, setCreateExpense] = useState(false);

  const handleCreateExpenseClick = () => {
    setCreateExpense(true);
  };

  const handleCreateExpenseClose = () => {
    setCreateExpense(false);
  };

  useQuery(GROUP_INFO, {
    variables: { getGroupByIdGroupId: groupId },
    onCompleted: (data) => {
      setGroup(data.getGroupById);
    },
    onError: (error) => {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
  });

  // const { loading } = useQuery(GROUP_TRANSACTIONS, {
  //   variables: { getTransactionsByGroupIdGroupId: groupId },
  //   onCompleted: (data) => {
  //     setTransactions(data.getTransactionsByGroupId);
  //   },
  // });

  useQuery(USER_INFO, {
    variables: { getUserByIdUserId: userId },
    onCompleted: (data) => {
      console.log('user 2 query', data.getUserById);
      setUser(data.getUserById);
      // setValues({
      //   title: data.getGroupById.title,
      //   description: data.getGroupById.description,
      //   bannerImg: data.getGroupById.bannerImg,
      //   active: data.getGroupById.active,
      //   locked: data.getGroupById.locked,
      // });
    },
    onError: (error) => {
      console.log('here', JSON.stringify(error, null, 2));
      console.log('here', error);
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
  });

  // const [editGroup] = useMutation(EDIT_GROUP, {
  //   update(_, { data: { editGroup: groupData } }) {
  //     setGroup(groupData);
  //     console.log(groupData);
  //     setEditOpen(false);
  //     // router.reload();
  //   },
  //   onError: (error) => {
  //     console.log(JSON.stringify(error, null, 2));
  //     // console.log('error', error.graphQLErrors[0].extensions.exception.errors);
  //     if (error.graphQLErrors[0]) {
  //       setErrors(error.graphQLErrors[0].extensions.exception.errors);
  //     }
  //   },
  // });

  // const onChange = (event) => {
  //   setValues({
  //     ...values,
  //     [event.target.name]:
  //       event.target.name === 'locked' || event.target.name === 'active'
  //         ? event.target.checked
  //         : event.target.value,
  //   });
  // };

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   setErrors({});
  //   try {
  //     editGroup({
  //       variables: {
  //         editGroupGroupId: groupId,
  //         editGroupGroupInput: values,
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const onEditClose = () => {
  //   setEditOpen(false);
  // };

  // console.log(transactions);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainContent}>
        <div className={styles.mainWrapper1}>
          <div
            className={styles.mainBgImage}
            style={{ backgroundImage: `url(https://skunkapetreestands.com/wp-content/uploads/2019/08/Dark-Woods-Banner.jpg)` }}
          >
            <div className={styles.mainEmptyStyles} />
          </div>
          <div className={styles.mainText}>
            <h1 className={styles.mainHeading}>{"Payment History"}</h1>
            <div className={styles.mainSection}>{user.firstName + " " + user.lastName}</div>
          </div>
        </div>
      </div>
      <div className={styles.mainAnnounce}>
        <div>
          <div className={styles.mainStatus}>
            <UserCard users={group.users} group={group} />
          </div>
          {context.user && (
            <div className={styles.editContainer}>
              <Button
                color="primary"
                className={styles.editButton}
                onClick={() => {
                  router.push(`/Group/${group.id}`);
                }}
              >
                <Typography variant="h5">Return to Group</Typography>
              </Button>
            </div>
          )}
        </div>
        <div className={styles.mainAnnouncements}>
          <div style={{ textAlign: 'right', marginBottom: 10 }}>
            <CreateExpenseButton
              onClick={handleCreateExpenseClick}
            ></CreateExpenseButton>
            <Dialog
              open={createExpense}
              onClose={handleCreateExpenseClose}
              maxWidth="lg"
              PaperProps={{
                style: {
                  borderRadius: 40,
                  boxShadow: '5px 5px 5px rgb(76, 81, 89)',
                },
              }}
              scroll={'paper'}
            >
              <CreateExpenseForm
                users={group.users}
                group={group}
                open={createExpense}
                onClose={handleCreateExpenseClose}
              />
            </Dialog>
          </div>
          {<PersonalHistory groupId={groupId} user2={user} user2Id={userId}></PersonalHistory>}
        </div>
      </div>
    </div>
  );
}

const USER_INFO = gql`
  query Query($getUserByIdUserId: ID!) {
    getUserById(userId: $getUserByIdUserId) {
      email
      profileImg
      firstName
      lastName
    }
  }
`;

const GROUP_INFO = gql`
  query Query($getGroupByIdGroupId: ID!) {
    getGroupById(groupId: $getGroupByIdGroupId) {
      id
      title
      description
      bannerImg
      code
      locked
      active
      users {
        id
        email
        profileImg
        firstName
        lastName
      }
    }
  }
`;
