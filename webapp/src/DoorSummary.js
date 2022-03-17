import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    width: "auto",
  },
});

export default function DoorDetails({ door }) {
  const classes = useStyles();
  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableBody>
          <TableRow>
            <TableCell variant="head"> Door ID </TableCell>
            <TableCell>{door.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head"> Name </TableCell>
            <TableCell>{door.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head"> Street </TableCell>
            <TableCell>{door.street}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head"> Postal Code </TableCell>
            <TableCell>{door.postal_code}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head"> City </TableCell>
            <TableCell>{door.city}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head"> State </TableCell>
            <TableCell>{door.state}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head"> Country </TableCell>
            <TableCell>{door.country_code}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
