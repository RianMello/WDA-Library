import { Button } from "@mui/material";

// import styles from ''

export const ButtonAdd = ({ handleModalOpen, setItemToEdited, setIsEdit }) => {
  return (
    <Button
      variant="contained"
      sx={{ fontWeight: "bold", border: "2px solid" }}
      onClick={() => {
        handleModalOpen();
        setItemToEdited();
        setIsEdit(false);
      }}
      //   className={styles.buttonAdd}
    >
      Add
    </Button>
  );
};
