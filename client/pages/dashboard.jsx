import { useQuery } from '@apollo/client';
import { Grid, makeStyles } from '@material-ui/core';
import { CreateGroupButton } from 'components/CreateGroupButton';
import { CreateGroupForm } from 'components/CreateGroupForm';
import { GroupCard } from 'components/GroupCard';
import { JoinGroupForm } from 'components/JoinGroupForm';
import { AuthContext } from 'context/auth';
import gql from 'graphql-tag';
import { useContext, useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  button: {
    position: 'sticky',
    bottom: theme.spacing(8),
    float: 'right',
    zIndex: 100,
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(8),
  },
}));

export default function Dashboard() {
  const styles = useStyles();
  const { user } = useContext(AuthContext);
  const [createGroup, setCreateGroup] = useState(false);
  const [joinGroup, setJoinGroup] = useState(false);
  const [groups, setGroups] = useState([]);

  const { loading, data } = useQuery(GET_USER, {
    onCompleted: (data) => {
      setGroups(data.getUserById.groups);
    },
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
    },
    variables: {
      getUserByIdUserId: user ? user.id : null,
    },
  });

  const handleCreateGroupClick = () => {
    setCreateGroup(true);
  };
  const handleCloseCreateGroup = () => {
    setCreateGroup(false);
  };
  const handleJoinGroupClick = () => {
    setJoinGroup(true);
  };
  const handleCloseJoinGroup = () => {
    setJoinGroup(false);
  };

  if (!user) {
    return <h1>Login to view your dashboard</h1>;
  }

  return (
    <section className={styles.root}>
      <Grid container>
        <Grid item xs={12} md={4}>
          tBD
        </Grid>
        <Grid item xs={12} md={8}>
          <h1>Dashboard</h1>
          <Grid container direction="row" spacing={2}>
            {groups.map((group) => {
              if (group.active) {
                return (
                  <Grid item xs={12} md={4} key={group}>
                    <GroupCard group={group} />
                  </Grid>
                );
              }
            })}
          </Grid>
          <div className={styles.button}>
            <CreateGroupButton
              createGroup={handleCreateGroupClick}
              joinGroup={handleJoinGroupClick}
            />
          </div>
        </Grid>
      </Grid>
      <CreateGroupForm
        open={createGroup}
        onClose={handleCloseCreateGroup}
        updateGroups={(group) => {
          setGroups(groups.concat(group));
        }}
      />
      <JoinGroupForm
        open={joinGroup}
        onClose={handleCloseJoinGroup}
        updateGroups={(group) => {
          setGroups(groups.concat(group));
        }}
      />
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
