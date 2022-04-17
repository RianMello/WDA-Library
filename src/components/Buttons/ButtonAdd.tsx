import { Button } from "@mui/material";

// import styles from ''

interface ButtonProps {
  handleAddItem: () => void;
}

export const ButtonAdd = ({ handleAddItem }: ButtonProps) => {
  //Botão que recebe a ação de inicar o modal de "adicionar" da pagina.
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        fontWeight: "bold",
        height: "3rem",
        width: "6rem",
      }}
      onClick={() => {
        handleAddItem();
      }}
      //   className={styles.buttonAdd}
    >
      NEW
    </Button>
  );
};
