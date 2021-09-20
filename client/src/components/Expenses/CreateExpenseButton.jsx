import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export function CreateExpenseButton(props) {
  return (
    <div>
      <Button color="primary" size="large" onClick={props.onClick}>
        Add Expense
      </Button>
    </div>
  );
}
