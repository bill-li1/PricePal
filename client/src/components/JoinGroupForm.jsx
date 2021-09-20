import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { AuthContext } from 'context/auth';
import { useMutation } from '@apollo/client';
import router from 'next/router';

export function JoinGroupForm(props) {
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState('');
  const [errors, setErrors] = useState({});
  const [joinGroup, { loading }] = useMutation(JOIN_GROUP, {
    update(_, { data: { addGroupUserByCode: groupData } }) {
      console.log(groupData);
      props.onClose();
      props.updateGroups(groupData);
      //   router.push(`/Group/${groupData.id}`);
    },
    onError: (error) => {
      //   console.log('1', JSON.stringify(error, null, 2));
      console.log('1', error);
      setErrors(error.graphQLErrors[0].extensions.exception.stacktrace);
    },
  });
  const onSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    try {
      joinGroup({
        variables: {
          addGroupUserByCodeCode: value,
          addGroupUserByCodeUserId: user.id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog
      open={props.open}
      maxWidth="md"
      onClose={props.onClose}
      PaperProps={{
        style: { borderRadius: 40, boxShadow: '5px 5px 5px rgb(76, 81, 89)' },
      }}
    >
      <DialogTitle style={{ textAlign: 'center' }}>
        <Typography variant="h1">Join Group</Typography>
      </DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            label="Code"
            placeholder="fXsquO"
            variant="outlined"
            margin="normal"
            type="text"
            name="code"
            error={Object.keys(errors).length > 0 ? true : false}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <Grid container direction="row" alignItems="center">
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Button color="primary" type="submit">
                Join Group
              </Button>
            </Grid>
            <Grid item xs={12}>
              {Object.keys(errors).length > 0 &&
                Object.values(errors).map((err) => {
                  return (
                    <Alert severity="error" key={err}>
                      <Typography style={{ fontSize: '12px' }}>
                        {err}
                      </Typography>
                    </Alert>
                  );
                })}
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const JOIN_GROUP = gql`
  mutation Mutation(
    $addGroupUserByCodeCode: String
    $addGroupUserByCodeUserId: ID
  ) {
    addGroupUserByCode(
      code: $addGroupUserByCodeCode
      userId: $addGroupUserByCodeUserId
    ) {
      id
      email
      profileImg
      firstName
      lastName
    }
  }
`;
