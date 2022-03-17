import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';

export default function DoorList({ doors }) {
  return (
    <List>
      {doors.map(door => {
        const primary =
          <>
            {door.name}
            {", "}
            {door.street}
          </>;

        const secondary =
          <>
            {door.postal_code}
            {", "}
            {door.city}
            {", "}
            {door.state}
            {", "}
            {door.country_code}
          </>

        return (
          <ListItem key={door.id}>
            <ListItemAvatar>
              <Avatar>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItem>
        );
      })}
    </List>
  );
}
