import { Box, Modal, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

interface ModalProps {
  children: ReactNode;
}

const ModalComponent = ({ children }: ModalProps) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{}}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
