import { makeStyles } from '@material-ui/core';
import { CreateGroupButton } from 'components/CreateGroupButton';
import { CreateGroupForm } from 'components/CreateGroupForm';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 1,
  },
  button: {
    position: 'sticky',
    bottom: 16,
    float: 'right',
    zIndex: 100,
    marginTop: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginRight: theme.spacing(30),
      bottom: '3%',
    },
    [theme.breakpoints.up('lg')]: {
      marginRight: theme.spacing(35),
    },
    [theme.breakpoints.up('xl')]: {
      marginRight: theme.spacing(20),
    },
  },
}));

export default function Dashboard() {
  const styles = useStyles();
  const [createGroup, setCreateGroup] = useState(false);

  const handleCreateGroupClick = () => {
    setCreateGroup(true);
  };
  const handleCloseCreateGroup = () => {
    setCreateGroup(false);
  };
  return (
    <section className={styles.root}>
      <h1>Dashboard</h1>
      <div className={styles.button}>
        <CreateGroupButton onClick={handleCreateGroupClick} />
      </div>
      <CreateGroupForm open={createGroup} onClose={handleCloseCreateGroup} />
    </section>
  );
}
