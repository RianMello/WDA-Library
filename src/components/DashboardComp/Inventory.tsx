import { Divider, Stack, Paper, Typography } from "@mui/material";
import { useBook } from "../../hooks/useBook";
import { useRental } from "../../hooks/useRental";
import { useUser } from "../../hooks/useUser";
import { usePublisher } from "../../hooks/usePublisher";
export const Inventory = () => {
  const { rentals } = useRental();
  const { books } = useBook();
  const { users } = useUser();
  const { publishers } = usePublisher();
  return (
    <div>
      <Stack
        direction="row"
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: "var(--blue-g100)" }}
          />
        }
        spacing={2}
        sx={{ padding: "1rem" }}
      >
        <Paper
          sx={{
            width: "25%",
            height: "3rem",
            backgroundColor: "var(--blue-g100)",
          }}
          elevation={3}
        >
          <Typography sx={{ color: "white" }} variant="subtitle1">
            Aluguéis
          </Typography>
          <Typography sx={{ color: "white" }} variant="subtitle2" component="p">
            {rentals.length}
          </Typography>
        </Paper>
        <Paper
          sx={{
            width: "25%",
            height: "3rem",
            backgroundColor: "var(--blue-g100)",
          }}
          elevation={3}
        >
          <Typography sx={{ color: "white" }} variant="subtitle1">
            Usuários
          </Typography>
          <Typography sx={{ color: "white" }} variant="subtitle2" component="p">
            {users.length}
          </Typography>
        </Paper>
        <Paper
          sx={{
            width: "25%",
            height: "3rem",
            backgroundColor: "var(--blue-g100)",
          }}
          elevation={3}
        >
          <Typography sx={{ color: "white" }} variant="subtitle1">
            Livros
          </Typography>
          <Typography sx={{ color: "white" }} variant="subtitle2" component="p">
            {books.length}
          </Typography>
        </Paper>
        <Paper
          sx={{
            width: "25%",
            height: "3rem",
            backgroundColor: "var(--blue-g100)",
          }}
          elevation={3}
        >
          <Typography sx={{ color: "white" }} variant="subtitle1">
            Editoras
          </Typography>

          <Typography sx={{ color: "white" }} variant="subtitle2" component="p">
            {publishers.length}
          </Typography>
        </Paper>
      </Stack>
    </div>
  );
};
