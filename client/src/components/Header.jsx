import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  logo: {
    color: 'white',
  },
}));

export function Header() {
  const styles = useStyles();
  return (
    <header>
      <AppBar>
        <Toolbar>
          <Typography variant="h1" className={styles.logo}>
            PricePal
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
  );
}
