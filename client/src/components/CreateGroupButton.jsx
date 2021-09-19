import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export function CreateGroupButton(props) {
  return (
    <div>
      <Button color="primary" size="large" onClick={props.onClick}>
        <AddIcon fontSize="large" />
      </Button>
    </div>
  );
}
