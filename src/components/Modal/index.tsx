import { Box, Modal, Typography } from "@mui/material";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import styles from "./style.module.scss";

const ModalComponent = ({ isOpen, onClose }: ModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={styles.modal}>
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
