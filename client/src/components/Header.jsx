import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  logo: {
    color: 'white',
    cursor: 'pointer',
  },
}));

export function Header() {
  const styles = useStyles();
  return (
    <header>
      <AppBar position="relative">
        <Toolbar>
          <Link href="/">
            <Typography variant="h1" className={styles.logo}>
              PricePal
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </header>
  );
}
