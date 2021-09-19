import { useQuery } from '@apollo/client';
import { Grid, makeStyles } from '@material-ui/core';
import { CreateGroupButton } from 'components/CreateGroupButton';
import { CreateGroupForm } from 'components/CreateGroupForm';
import { GroupCard } from 'components/GroupCard';
import { AuthContext } from 'context/auth';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  button: {
    // position: 'sticky',
    float: 'right',
    zIndex: 100,
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(5),
  },
}));

export default function Dashboard() {
  const styles = useStyles();
  const { user } = useContext(AuthContext);
  const [createGroup, setCreateGroup] = useState(false);

  if (!user) {
    return <h1>Log in to view your dashboard</h1>;
  }

  const handleCreateGroupClick = () => {
    setCreateGroup(true);
  };
  const handleCloseCreateGroup = () => {
    setCreateGroup(false);
  };

  const { loading, data } = useQuery(GET_USER, {
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
    },
    variables: {
      getUserByIdUserId: user.id,
    },
  });
  return (
    <section className={styles.root}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} md={4}>
          tBD
        </Grid>
        <Grid item xs={12} md={8}>
          <h1>Dashboard</h1>
          <Grid container direction="row" spacing={2}>
            {data &&
              data.getUserById &&
              data.getUserById.groups &&
              data.getUserById.groups.map((group) => {
                return (
                  <Grid item xs={12} md={4}>
                    <GroupCard group={group} />
                  </Grid>
                );
              })}
          </Grid>
          <div className={styles.button}>
            <CreateGroupButton onClick={handleCreateGroupClick} />
          </div>
        </Grid>
      </Grid>
      <CreateGroupForm open={createGroup} onClose={handleCloseCreateGroup} />
    </section>
  );
}

const GET_USER = gql`
  query Query($getUserByIdUserId: ID!) {
    getUserById(userId: $getUserByIdUserId) {
      email
      profileImg
      firstName
      lastName
      groups {
        id
        title
        description
        bannerImg
        active
        locked
      }
    }
  }
`;
