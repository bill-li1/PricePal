import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export function CreatePaymentButton(props) {
  return (
    <div>
      <Button color="primary" size="large" onClick={props.onClick}>
        Add Payment
      </Button>
    </div>
  );
}
