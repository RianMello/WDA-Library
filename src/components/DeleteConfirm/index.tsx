import { Book, Publisher, Rental, User } from "../../interfaces/ResponseAPI";

import { Box, Button, Typography } from "@mui/material";
interface DeleteProps {
  onClose: (e: boolean) => void;
  action: () => void;
  personalityResponse: string;
}
export const DeleteConfirm = ({
  action,
  onClose,
  personalityResponse,
}: DeleteProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "5rem",
        textAlign: "justify",
        width: "100%",
        height: "100%",
      }}
    >
      {/* <Typography
        variant="h3"
        component="h3"
        sx={{ fontWeight: "bold", color: "red" }}
      >
        Attention!
      </Typography> */}
      <Typography
        variant="h4"
        component="h4"
        sx={{ color: "var(--white-g100)", maxWidth: "35rem" }}
      >
        Are you sure you want to permanently delete this record:{" "}
        <strong style={{ color: "white" }}>{personalityResponse}</strong>?
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          position: "fixed",
          bottom: "2rem",
          right: "15%",
          width: "70%",
        }}
        className="actions"
      >
        <Button
          variant="contained"
          onClick={() => onClose(false)}
          color="error"
          sx={{ width: "9rem", height: "3rem" }}
        >
          Não
        </Button>
        <Button
          color="success"
          sx={{ width: "9rem", height: "3rem" }}
          variant="contained"
          onClick={() => action()}
        >
          Sim
        </Button>
      </Box>
    </Box>
  );
};
