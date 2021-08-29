import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import ModalTitle from './ModalTitle';
import ModalContent from './ModalContent';
// import ModalActions from './ModalActions';

const ModalLayout = ({ children, title, open, handleClose }) => {
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="modal Title" open={open}>
        <ModalTitle onClose={handleClose}>{title}</ModalTitle>
        <ModalContent dividers>{children}</ModalContent>
      </Dialog>
    </div>
  );
};

ModalLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default ModalLayout;
