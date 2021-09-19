import { Grid, makeStyles } from '@material-ui/core';
import { CreateGroupButton } from 'components/CreateGroupButton';
import { CreateGroupForm } from 'components/CreateGroupForm';
import { AuthContext } from 'context/auth';
import { useContext, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    position: 'sticky',
    bottom: 16,
    float: 'right',
    zIndex: 100,
    marginTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(10),
      bottom: '3%',
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(15),
    },
    [theme.breakpoints.up('xl')]: {
      marginRight: theme.spacing(20),
    },
  },
}));

export default function Dashboard() {
  const styles = useStyles();
  const { user } = useContext(AuthContext);
  const [createGroup, setCreateGroup] = useState(false);

  const handleCreateGroupClick = () => {
    setCreateGroup(true);
  };
  const handleCloseCreateGroup = () => {
    setCreateGroup(false);
  };
  return (
    <>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={4}>
          TBD
        </Grid>
        <Grid item xs={8}>
          <h1>Dashboard</h1>
        </Grid>
      </Grid>
      <div className={styles.button}>
        <CreateGroupButton onClick={handleCreateGroupClick} />
      </div>
      <CreateGroupForm open={createGroup} onClose={handleCloseCreateGroup} />
    </>
  );
}
