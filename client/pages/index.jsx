import { makeStyles } from '@material-ui/core';
import { Login } from 'components/Login';

const useStyles = makeStyles((theme) => ({
  background: {
    color: 'black',
  },
}));
export default function Home() {
  const styles = useStyles();

  return (
    <main>
      <div className={styles.background} />
      <Login open={true} />
    </main>
  );
}
