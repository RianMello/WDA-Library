import { Box, Modal } from "@mui/material";
import { ReactNode } from "react";
interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  FormId: string;
  title: string;
  onClose: () => void;
}

import styles from "./style.module.scss";

const ModalComponent = ({
  children,
  isOpen,
  onClose,
  FormId,
  title,
}: ModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={styles.modal}>
        <div>
          <h1>{title}</h1>
        </div>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
