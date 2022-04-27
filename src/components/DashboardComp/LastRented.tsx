import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { useRental } from "../../hooks/useRental";

export const LastRental = () => {
  const { rentals } = useRental();

  const lastRentals = rentals
    .sort((a, b) => {
      let dateA = new Date(Date.parse(a.data_aluguel));
      let dateB = new Date(Date.parse(b.data_aluguel));
      if (dateA > dateB) {
        return -1;
      } else if (dateA < dateB) {
        return 1;
      }
      return 0;
    })
    .slice(0, 5);
  return (
    <List sx={{ width: "100%", padding: "1rem" }}>
      {lastRentals.map((last) => (
        <>
          <ListItem key={last.id} disablePadding>
            <ListItemText
              secondaryTypographyProps={{ color: "white" }}
              primary={last.usuario_id.nome}
              secondary={`Alugou: ${last.livro_id.nome}`}
            />
            <ListItemText
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
              secondaryTypographyProps={{ color: "white" }}
              primary={`Alugado em: ${last.data_aluguel}`}
              secondary={`Data Prazo: ${last.data_previsao}`}
            />
          </ListItem>
          <Divider
            orientation="horizontal"
            sx={{ backgroundColor: "var(--blue-g200)" }}
            flexItem
          />
        </>
      ))}
    </List>
  );
};
