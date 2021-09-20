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
import { useState, useContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { AuthContext } from '../../src/context/auth';
import { LockRounded } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { ExpenseCard} from 'components/ExpenseCard';
import { UserCard } from 'components/UserCard';

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

export default function GroupPage() {
  const styles = useStyles();
  const [group, setGroup] = useState({});
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();
  const queryKey = 'groupId';
  const groupId =
    router.query[queryKey] ||
    router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`));
  const context = useContext(AuthContext);

  const { loading } = useQuery(GROUP_TRANSACTIONS, {
    variables: { getTransactionsByGroupIdGroupId: groupId },
    onCompleted: (data) => {
      setTransactions(data.getTransactionsByGroupId);
    },
  });

  useQuery(GROUP_INFO, {
    variables: { getGroupByIdGroupId: groupId },
    onCompleted: (data) => {
      setGroup(data.getGroupById);
      setValues({
        title: data.getGroupById.title,
        description: data.getGroupById.description,
        bannerImg: data.getGroupById.bannerImg,
        active: data.getGroupById.active,
        locked: data.getGroupById.locked,
      });
    },
    onError: (error) => {
      console.log('here', JSON.stringify(error, null, 2));
      console.log('here', error);
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
  });

  const [editGroup] = useMutation(EDIT_GROUP, {
    update(_, { data: { editGroup: groupData } }) {
      setGroup(groupData);
      console.log(groupData);
      setEditOpen(false);
      // router.reload();
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
      // console.log('error', error.graphQLErrors[0].extensions.exception.errors);
      if (error.graphQLErrors[0]) {
        setErrors(error.graphQLErrors[0].extensions.exception.errors);
      }
    },
  });

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.name === 'locked' || event.target.name === 'active'
          ? event.target.checked
          : event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    try {
      editGroup({
        variables: {
          editGroupGroupId: groupId,
          editGroupGroupInput: values,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onEditClose = () => {
    setEditOpen(false);
  };

  // console.log(transactions);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainContent}>
        <div className={styles.mainWrapper1}>
          <div
            className={styles.mainBgImage}
            style={{ backgroundImage: `url(${group.bannerImg})` }}
          >
            <div className={styles.mainEmptyStyles} />
          </div>
          <div className={styles.mainText}>
            <h1 className={styles.mainHeading}>{group.title}</h1>
            <div className={styles.mainSection}>{group.description}</div>
            <div className={styles.mainWrapper2}>
              <em className={styles.mainCode}>Group Code:</em>
              <div className={styles.mainCode}>{group.code}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainAnnounce}>
        <div>
          <div className={styles.mainStatus}>
            <UserCard users={group.users} />
          </div>
          {context.user && (
            <div className={styles.editContainer}>
              <Button
                color="primary"
                className={styles.editButton}
                onClick={() => setEditOpen(true)}
              >
                <Typography variant="h5">Edit Group</Typography>
              </Button>
              <Dialog open={editOpen} onClose={onEditClose}>
                <DialogTitle style={{ textAlign: 'center' }}>
                  <Typography variant="h1">Edit Group</Typography>
                </DialogTitle>
                <form noValidate onSubmit={onSubmit}>
                  <DialogContent style={{ textAlign: 'center' }}>
                    <TextField
                      label="Banner Image Link"
                      placeholder="https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8="
                      variant="outlined"
                      margin="normal"
                      type="text"
                      name="bannerImg"
                      error={
                        errors && errors.hasOwnProperty('bannerImg')
                          ? true
                          : false
                      }
                      value={values.bannerImg}
                      onChange={onChange}
                    />
                    <TextField
                      label="Title"
                      placeholder="Expense Sheet"
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
                      placeholder="This is an expense sheet description."
                      variant="outlined"
                      margin="normal"
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={onChange}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={values.locked}
                          onChange={onChange}
                          name="locked"
                        />
                      }
                      label="locked"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={values.active}
                          onChange={onChange}
                          name="active"
                        />
                      }
                      label="active"
                    />
                    <Grid container>
                      <Grid item xs={12}>
                        {errors &&
                          Object.keys(errors).length > 0 &&
                          Object.values(errors).map((err) => {
                            return (
                              <Alert severity="error" key={err}>
                                {err.message}
                              </Alert>
                            );
                          })}
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button color="primary" type="submit">
                      Submit Changes
                    </Button>
                  </DialogActions>
                </form>
              </Dialog>
            </div>
          )}
        </div>
        <div className={styles.mainAnnouncements}>
          {transactions?.map((transaction) => {
            console.log(transactions);
            return (
              <div style={{ margin: '100' }}>
                <ExpenseCard transaction={transaction} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const GROUP_INFO = gql`
  query Query($getGroupByIdGroupId: ID!) {
    getGroupById(groupId: $getGroupByIdGroupId) {
      title
      description
      bannerImg
      code
      locked
      active
      users {
        email
        profileImg
        firstName
        lastName
      }
    }
  }
`;

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

const EDIT_GROUP = gql`
  mutation Mutation($editGroupGroupId: ID!, $editGroupGroupInput: GroupInput!) {
    editGroup(groupId: $editGroupGroupId, groupInput: $editGroupGroupInput) {
      id
      title
      description
      bannerImg
      code
      locked
      active
    }
  }
`;
