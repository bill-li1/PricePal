import { Button, Avatar, Textfield, makeStyles, TextField, Input } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { Alert } from '@material-ui/lab';
import { AuthContext } from '../src/context/auth';

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100 % - 2 * 1.5rem)',
    maxWidth: '62.5rem',
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
    backgroundImage: 'url(https://gstatic.com/classroom/themes/img_backtoschool.jpg)',
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
    fontWeight: '500',
    lineHeight: '2.75rem',
    color: '#fff',
    margin: '0',
  },
  mainOverflow: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    display: 'block',
  },
  mainSection: {
    fontFamily: 'Google Sans, Roboto, Arial, sans - serif',
    fontSize: '1.375rem',
    fontWeight: '400',
    lineHeight: '1.75rem',
    color: '#fff',
  },
  mainWrapper2: {
    color: '#fff',
    flexWrap: 'wrap',
    marginTop: '0.5rem',
  },
  mainCode: {
    fontWeight: '500',
    fontStyle: 'normal',
  },
  mainAnnounce: {
    display: 'flex',
    /* justify-content: center; */
    flexShrink: '0',
    marginTop: '1rem',
  },
  mainAnnouncements: {
    padding: '1rem',
    overflow: 'hidden',
    margin: '-2.4rem',
    marginLeft: '1rem',
    /* margin-top: 1.5rem; */
  },
  mainSubText: {
    marginTop: '1.5rem',
    color: '#807373',
    fontWeight: '400',
  },
  mainStatus: {
    border: '1.5px solid #dadce0',
    padding: '20px',
    borderRadius: '10px',
    width: '10vw',
    height: '15vh',
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

export default function register() {
  const styles = useStyles();
  const context = useContext(AuthContext);
  const router = useRouter();

  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInput] = useState("");

  return (
    <div className={styles.test}>
      <div className={styles.mainWrapper}>
        <div className={styles.mainContent}>
          <div className={styles.mainWrapper1}>
            <div className={styles.mainBgImage}>
              <div className={styles.mainEmptyStyles} />
            </div>
            <div className={styles.mainText}>
              <h1 className={styles.mainHeading}>
                Group 1
              </h1>
              <div className={styles.mainSection}>
                Section 1
              </div>
              <div className={styles.mainWrapper2}>
                <em className={styles.mainCode}>Class Code :</em>
                <div className={styles.mainCode}>AW8T2</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainAnnounce}>
          <div className={styles.mainStatus}>
            <p>Upcoming</p>
            <p className={styles.mainSubText}>No work due</p>
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
                      <input
                        color='primary'
                        type='file'
                      />
                      <div>
                        <Button onClick={() => setShowInput(false)}>
                          Cancel
                        </Button>
                        <Button
                          color='primary'
                          variant='contained'
                        >
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
      </div >
    </div >
  );
}

const REGISTER_USER = gql`
  mutation Mutation($registerRegisterInput: RegisterInput) {
    register(registerInput: $registerRegisterInput) {
      id
      email
      token
      profileImg
      firstName
      lastName
    }
  }
`;
