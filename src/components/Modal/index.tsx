import { Box, Modal, Typography } from "@mui/material";
import { ReactNode } from "react";
import { MdClose } from "react-icons/md";
interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  title: string;
  colorTitle: string;
  onClose: () => void;
}

import styles from "./style.module.scss";

const ModalComponent = ({
  children,
  isOpen,
  onClose,
  title,
  colorTitle,
}: ModalProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className={styles.modal}>
        <div onClick={() => onClose()} className={styles.exitModal}>
          <MdClose style={{ width: "2rem", height: "2rem" }} />
        </div>
        <div>
          <Typography variant="h3" component="h3" sx={{ color: colorTitle }}>
            {title}
          </Typography>
        </div>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
