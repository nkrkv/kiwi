import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import FaceIcon from "@material-ui/icons/Face";

export default function AuthorizedUserList({
  users,
  checkedUserIds = [],
  onUserCheckChanged,
}) {
  return (
    <List dense>
      {users.map((user) => {
        const name = `${user.first_name} ${user.last_name}`;
        return (
          <ListItem key={user.user_id}>
            <ListItemAvatar>
              <Avatar>
                <FaceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={user.email} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={(e) => onUserCheckChanged(e, user.user_id)}
                checked={checkedUserIds.includes(user.user_id)}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
