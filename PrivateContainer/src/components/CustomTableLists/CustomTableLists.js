import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CustomTableCell } from './CustomTableCell';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
}));

export const CustomTableLists = ({ tableRows, children }) => {
  const classes = useStyles();

  return (
    <TableContainer elevation={0} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {tableRows.map((row, idx) => (
              <CustomTableCell key={idx}>{row}</CustomTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

CustomTableLists.propTypes = {
  children: PropTypes.node.isRequired,
  tableRows: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
