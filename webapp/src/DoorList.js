import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Timestamp from './Timestamp';

const useStyles = makeStyles({
  row: {
    cursor: "pointer",
  },
});

export default function DoorList({ doors, onDoorClick }) {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Door Name</TableCell>
            <TableCell>Last Communication</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doors.map(door => {
            return (
              <TableRow
                key={door.id}
                hover
                className={classes.row}
                onClick={e => onDoorClick(e, door.id)}
              >
                <TableCell>{door.id}</TableCell>
                <TableCell>
                  <Typography variant="body1">
                    {door.street}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {door.postal_code}
                    {", "}
                    {door.city}
                    {", "}
                    {door.state}
                    {", "}
                    {door.country_code}
                  </Typography>
                </TableCell>
                <TableCell>{door.name}</TableCell>
                <TableCell>
                  <Timestamp value={door.activity.last_communication_ts} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
