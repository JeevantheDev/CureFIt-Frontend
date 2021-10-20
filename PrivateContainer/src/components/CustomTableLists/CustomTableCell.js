import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

export const CustomTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 16,
  },
  body: {
    fontSize: 15,
    color: '#333',
    lineHeight: '20px',
    fontWeight: 'bold',
  },
}))(TableCell);
