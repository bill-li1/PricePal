import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  load: {
    marginTop: theme.spacing(20),
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
  title: {
    paddingTop: theme.spacing(10),
    textAlign: 'center',
    fontSize: 20,
  },
}));

export function Loading() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.load}>
        <CircularProgress size={80} />
      </div>
      <div className={classes.title}>Loading . . .</div>
    </div>
  );
}
