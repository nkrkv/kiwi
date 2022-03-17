import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DoorSummary from "./DoorSummary";
import DoorActivity from "./DoorActivity";
import DoorOnMap from "./DoorOnMap";
import AuthorizedUserList from "./AuthorizedUserList";

function NoUsers() {
  return <Typography variant="body2">No user can access this door</Typography>;
}

export default function DoorPage({ door }) {
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
        {users.length > 0 ? <AuthorizedUserList users={users} /> : <NoUsers />}
      </Grid>
    </Grid>
  );
}
