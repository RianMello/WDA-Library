import { Book, Publisher, Rental, User } from "../../interfaces/ResponseAPI";

import { Box, Button, Typography } from "@mui/material";
interface DeleteProps {
  onClose: () => void;
  action: () => void;
}
export const DeleteConfirm = ({ action, onClose }: DeleteProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" component="h2">
        Attention!
      </Typography>
      <Typography variant="body1" component="p">
        Are you sure you want to permanently delete this record?
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
        className="actions"
      >
        <Button variant="outlined" onClick={onClose}>
          Não
        </Button>
        <Button variant="outlined" onClick={() => action()}>
          Sim
        </Button>
        {/* <button onClick={() => action()}>Sim</button> */}
      </Box>
    </Box>
  );
};