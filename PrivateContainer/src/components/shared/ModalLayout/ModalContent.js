import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';

const ModalContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
}))(MuiDialogContent);

// eslint-disable-next-line import/no-default-export
export default ModalContent;
