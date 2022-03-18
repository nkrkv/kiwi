import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import urls from "./urls";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    maxWidth: "80wv",
  },
}));

function fetchUsers(q) {
  return fetch(urls.api.users({ q })).then((data) => data.json());
}

export default function UserSearchDialog({
  title,
  open,
  onClose,
  onUserSelect,
}) {
  let classes = useStyles();
  let [options, setOptions] = useState([]);
  let [value, setValue] = useState(null);

  const handleInputChange = (event, value) => {
    if (value === "") {
      setOptions([]);
      setValue(null);
    } else {
      fetchUsers(value).then((users) => setOptions(users));
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title || "User Search"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Start typing leading letters of the first or last name to find a user.
        </DialogContentText>
        <Autocomplete
          freeSolo={true}
          clearOnBlur={true}
          selectOnFocus={true}
          disableClearable={true}
          options={options}
          getOptionLabel={(user) => `${user.first_name} ${user.last_name}`}
          renderInput={(params) => (
            <TextField
              {...params}
              label="User Name"
              variant="outlined"
              className={classes.input}
            />
          )}
          value={value}
          onInputChange={handleInputChange}
          onChange={(e, newValue) => setValue(newValue)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          disabled={!value}
          onClick={() => onUserSelect(value)}
        >
          Select
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
