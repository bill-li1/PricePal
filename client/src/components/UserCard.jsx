import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
  } from '@material-ui/core';
  import { makeStyles } from '@material-ui/styles';
  import Link from 'next/link';
  import { useContext } from 'react';
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    logo: {
      color: 'white',
      cursor: 'pointer',
    },
    space: {
      flexGrow: 1,
    },
    userCard: {
      marginTop: '5px',
      marginBottom: '5px',
    },
    listItemText: {
      fontFamily: 'Google Sans, Roboto, Arial, sans - serif',
      fontSize: '1.05rem',
      fontWeight: 'normal',
      lineHeight: '2.75rem',
      color: '#999999',
      margin: '0',
    },
    titleText: {
      fontFamily: 'Google Sans, Roberto, Arial, sans - serif',
      fontSize: '1.7rem',
      color: '#565656',
      margin: '0',
      marginLeft: '20px',
      lineHeight: '4rem',
    },
    test: {
      border: '3px solid red',
    }
  }));
  
  export function UserCard(props) {
    const styles = useStyles();
    const { users } = props;
    return (
      <div>
        <h2 className={styles.titleText}>
          Group Members
        </h2>
        <List
          dense
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {users?.map((user) => {
            return (
              <div>
              <Link href={`/User/${user.id}`}>
                <ListItem key={user.id} className={styles.userCard}>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${3}`}
                      src={`/static/images/avatar/${3}.jpg`}
                    />
                  </ListItemAvatar>
                  <h3
                    className={styles.listItemText}
                  >
                    {user.firstName + " " + user.lastName}
                  </h3>
                </ListItem>
                </Link>
                {user !== users[users.length - 1] ? <Divider /> : null}
              </div>
            );
          })}
        </List >
      </div>
    );
  }