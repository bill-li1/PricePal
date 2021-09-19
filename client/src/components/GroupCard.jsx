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
import Link from 'next/link';

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
  const { group } = props;
  return (
    <Link href={`/Group/${group.id}`}>
      <Card className={styles.root}>
        <CardActionArea>
          <CardMedia className={styles.media} image={group.bannerImg} />
          <CardContent>
            <Typography variant="h1">
              <Grid container alignItems="center" className={styles.container}>
                {group.title}
                <div className={styles.space} />
                {group.locked ? <LockIcon /> : <LockOpenIcon />}
              </Grid>
            </Typography>
            <Typography variant="subtitle1">{group.description}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

const GET_GROUP = gql`
  query Query($getGroupByIdGroupId: ID!) {
    getGroupById(groupId: $getGroupByIdGroupId) {
      id
      title
      description
      bannerImg
      active
      locked
    }
  }
`;
