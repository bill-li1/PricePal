// @ts-nocheck
import { Button, makeStyles, TextField } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Alert } from '@material-ui/lab';
import { AuthContext } from '../src/context/auth';

export default function register() {
  const styles = useStyles();
  const [group, setGroup] = useState({});
  const [transactions, setTransactions] = useState([]);
  const groupId = '6145674f61d9396dc4b726ab';
  const context = useContext(AuthContext);
  const router = useRouter();
  const { loading } = useQuery(GROUP_INFO, {
    variables: { getGroupByIdGroupId: groupId },
    onCompleted: (data) => {
      setGroup(data.getGroupById);
    },
    onError: (error) => {
      console.log(error);
      setErrors(error.grahQLErrors[0].extensions.errors);
    },
  });

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState('');

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.mainContent}>
        <div className={styles.mainWrapper1}>
          <div className={styles.mainBgImage}>
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
        <div className={styles.mainStatus}>
          <p>Members</p>
          <ul>
            {group.users?.map((user) => {
              return (
                <li>
                  {user.firstName + " " + user.lastName}
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.mainAnnouncements}>
          <div className={styles.mainAnnouncementsWrapper}>
            <div className={styles.mainAncContent}>
              {showInput ? (
                <div className={styles.mainForm}>
                  <TextField
                    id="filled-multiline-flexible"
                    multiline
                    label="Announce Something to class"
                    variant="filled"
                    value={inputValue}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <div className={styles.mainButtons}>
                    <TextField variant="outlined" color="primary" type="file" />
                    <div>
                      <Button onClick={() => setShowInput(false)}>
                        Cancel
                      </Button>
                      <Button color="primary" variant="contained">
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                  <div
                    className={styles.mainWrapper100}
                    onClick={() => setShowInput(true)}
                  >
                    <div>Announce Something to class</div>
                  </div>
                )}
            </div>
          </div>
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
    backgroundImage:
      'url(https://gstatic.com/classroom/themes/img_backtoschool.jpg)',
    backgroundSize: 'cover',
    height: '100%',
    left: '0',
    position: 'absolute',
    top: '0',
    width: '100%',
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
    marginTop: '1rem',
  },
  mainAnnouncements: {
    padding: '1rem',
    overflow: 'hidden',
    marginLeft: '1rem',
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
  mainAnnouncementsWrapper: {
    borderRadius: '0.5rem',
    overflow: 'hidden',
    minHeight: '4.5rem',
    marginBottom: '1.5rem',
    marginTop: '1.5rem',
  },
  mainAncContent: {
    padding: '30px',
    width: '70vw',
    color: 'rgba(0, 0, 0, 0.549)',
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
}));
