import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import DoorSummary from "./DoorSummary";
import DoorActivity from "./DoorActivity";
import DoorOnMap from "./DoorOnMap";
import AuthorizedUserList from "./AuthorizedUserList";

function NoUsers() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="subtitle1">No user can access this door</Typography>
    </Box>
  );
}

export default function DoorPage({
  door,
  checkedUserIds,
  onUserCheckChanged,
  onGrantAccessClick,
  onRevokeAccessClick,
}) {
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
      <Grid item lg={5} md={6} sm={8} xs={12}>
        <Typography variant="h4" component="h2" paragraph>
          Authorized Users
        </Typography>
        <Grid container>
          <Button
            color="secondary"
            variant="contained"
            startIcon={<AddIcon />}
            size="small"
            onClick={onGrantAccessClick}
          >
            Grant Access
          </Button>
          <Box style={{ flexGrow: 1 }} />
          {users.length > 0 ? (
            <Button
              variant="outlined"
              size="small"
              onClick={onRevokeAccessClick}
              disabled={checkedUserIds.length === 0}
            >
              Revoke Access
            </Button>
          ) : null}
        </Grid>
        {users.length > 0 ? (
          <AuthorizedUserList
            users={users}
            checkedUserIds={checkedUserIds}
            onUserCheckChanged={onUserCheckChanged}
          />
        ) : (
          <NoUsers />
        )}
      </Grid>
    </Grid>
  );
}
