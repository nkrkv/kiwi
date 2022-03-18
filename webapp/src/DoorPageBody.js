import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import DoorSummary from "./DoorSummary";
import DoorActivity from "./DoorActivity";
import DoorOnMap from "./DoorOnMap";
import AuthorizedUserList from "./AuthorizedUserList";

function NoUsers() {
  return <Typography variant="body2">No user can access this door</Typography>;
}

export default function DoorPage({ door, onGrantAccessClick }) {
  const title = `(#${door.id}) ${door.street}, ${door.name}`;
  const users = door.authorized_users;
  return (
    <Grid container spacing={4} direction="column">
      <Grid item>
        <Typography variant="h2" component="h1">
          {title}
        </Typography>
      </Grid>
      <Grid item container>
        <Grid item md={4} sm={12}>
          <DoorSummary door={door} />
        </Grid>
        <Grid item md={8} sm={12}>
          <DoorOnMap lon={door.longitude} lat={door.latitude} />
        </Grid>
      </Grid>
      <Grid item>
        <Typography variant="h4" component="h2" paragraph>
          Latest Activity
        </Typography>
        <DoorActivity activity={door.activity} />
      </Grid>
      <Grid item>
        <Typography variant="h4" component="h2" paragraph>
          Authorized Users
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          startIcon={<AddIcon />}
          size="small"
          onClick={onGrantAccessClick}
        >
          Grant Access
        </Button>
        {users.length > 0 ? <AuthorizedUserList users={users} /> : <NoUsers />}
      </Grid>
    </Grid>
  );
}
