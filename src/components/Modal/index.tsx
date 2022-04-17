import { Box, Modal, Typography } from "@mui/material";
import { ReactNode } from "react";
interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  onClose: () => void;
}

import styles from "./style.module.scss";

const ModalComponent = ({ children, isOpen, onClose, title }: ModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={styles.modal}>
        <div>
          <Typography variant="h3" component="h3" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
        </div>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
