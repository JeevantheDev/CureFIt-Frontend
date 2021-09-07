import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';

const ModalContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
}))(MuiDialogContent);

// eslint-disable-next-line import/no-default-export
export default ModalContent;
