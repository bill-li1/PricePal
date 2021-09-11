import { AppBar, makeStyles, Toolbar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export function Header() {
  const styles = useStyles();
  return (
    <AppBar position="static" className={styles.root}>
      <Toolbar>
        <img className={styles.image} alt="logo" src="./src/logo.svg" />
      </Toolbar>
    </AppBar>
  );
}
