import { Button, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  button: {
    borderRadius: '5em',
  },
}));

export function CreateGroupButton(props) {
  const styles = useStyles();
  return (
    <div>
      <Button
        color="primary"
        size="large"
        onClick={props.onClick}
        className={styles.button}
      >
        <AddIcon fontSize="large" />
      </Button>
    </div>
  );
}
