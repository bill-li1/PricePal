import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { AuthContext } from 'context/auth';
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
}));

export function Header() {
  const styles = useStyles();
  const { user, logout } = useContext(AuthContext);
  return (
    <header>
      <div className={styles.root}>
        <AppBar position="relative">
          <Toolbar>
            <Link href="/">
              <Typography variant="h1" className={styles.logo}>
                PricePal
              </Typography>
            </Link>
            <div className={styles.space} />
            {user ? (
              <Button onClick={logout}>Logout</Button>
            ) : (
              <Link href="/">
                <Button>Login</Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
}
