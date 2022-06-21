import {
  Alert,
  Box,
  Button,
  Modal,
  ModalProps,
  Typography,
} from '@mui/material';
import React from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface WarningPopupProps extends Omit<ModalProps, 'children'> {
  [k: string]: any;
}

export default function WarningPopup(props: WarningPopupProps) {
  const { title, setOpen, onYes, ...rest } = props;

  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      {...rest}
    >
      <Box sx={style}>
        <Alert severity="warning">{title}</Alert>
        <Button color="warning" onClick={() => (rest as any).onClose()}>
          No
        </Button>
        <Button variant="contained" onClick={onYes}>
          Yes
        </Button>
      </Box>
    </Modal>
  );
}
