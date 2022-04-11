import { Box, Modal, Typography } from "@mui/material";
import { ReactNode } from "react";
import { FormComponent } from "../Form";
interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  FormId: string;
  onClose: () => void;
}

import styles from "./style.module.scss";

const ModalComponent = ({ children, isOpen, onClose, FormId }: ModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={styles.modal}>{children}</Box>
    </Modal>
  );
};

export default ModalComponent;
