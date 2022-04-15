import { TextField } from "@mui/material";
import styles from "./style.module.scss";

import { BsFilter } from "react-icons/bs";

export const TableFilter = ({ filter, setFilter }: any) => {
  return (
    <div className={styles.inputStyle}>
      <label>Filter:</label>
      <TextField
        id="outlined-basic"
        label={
          <BsFilter
            style={{ color: "white", width: "1.5rem", height: "1.5rem" }}
          />
        }
        variant="outlined"
        value={filter || ""}
        onChange={(e) => setFilter(e.currentTarget.value)}
      ></TextField>
    </div>
  );
};
