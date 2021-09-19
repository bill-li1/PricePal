import { useQuery } from '@apollo/client';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import gql from 'graphql-tag';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    minWidth: 200,
  },
  media: {
    height: 140,
  },
  container: {
    flexGrow: 1,
  },
  space: {
    flexGrow: 1,
  },
}));

export function GroupCard(props) {
  const styles = useStyles();

  const { loading, data } = useQuery(GET_GROUP, {
    onError: (error) => {
      console.log(JSON.stringify(error, null, 2));
    },
    variables: {
      getGroupByIdGroupId: props.groupId,
    },
  });
  if (!data) {
    return <h1>Could not get group data</h1>;
  }
  console.log('groupId', props.groupId);
  console.log('data', data);

  const groupData = data.getGroupById;
  return (
    <Card className={styles.root}>
      <CardActionArea>
        <CardMedia className={styles.media} image={groupData.bannerImg} />
        <CardContent>
          <Typography variant="h1">
            <Grid container alignItems="center" className={styles.container}>
              {groupData.title}
              <div className={styles.space} />
              {groupData.locked ? <LockIcon /> : <LockOpenIcon />}
            </Grid>
          </Typography>
          <Typography variant="subtitle1">{groupData.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const GET_GROUP = gql`
  query Query($getGroupByIdGroupId: ID!) {
    getGroupById(groupId: $getGroupByIdGroupId) {
      title
      description
      bannerImg
      active
      locked
    }
  }
`;
