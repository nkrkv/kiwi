import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Timestamp from "./Timestamp";

const useStyles = makeStyles({
  table: {
    width: "auto",
  },
});

export default function DoorActivity({ activity }) {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell variant="head"> Communicated at </TableCell>
            <TableCell>
              <Timestamp value={activity.last_communication_ts} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head"> Opened at </TableCell>
            <TableCell>
              <Timestamp value={activity.last_opening_ts} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
