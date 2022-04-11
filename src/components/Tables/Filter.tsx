import { TextField } from "@mui/material";

export const TableFilter = ({ filter, setFilter }: any) => {
  return (
    <span>
      <TextField
        id="outlined-basic"
        label="Filter"
        variant="outlined"
        value={filter || ""}
        onChange={(e) => setFilter(e.currentTarget.value)}
      />
    </span>
  );
};
