import { makeStyles } from '@material-ui/core';
import { Login } from 'components/Login';

const useStyles = makeStyles((theme) => ({
  login: {
    margin: 'auto',
    width: 300,
    textAlign: 'center',
    // padding: 100,
  },
  button: {
    color: theme.palette.secondary.main,
  },
  forgotPassword: {
    cursor: 'pointer',
    marginTop: theme.spacing(1),
  },
  image: {
    width: '100%',
    height: '100%',
  },
}));
export default function Home() {
  const styles = useStyles();

  return (
    <main>
      <img
        alt="background"
        src="https://wallpaperaccess.com/full/656693.jpg"
        className={styles.image}
      />
      <Login open={true} />
    </main>
  );
}
