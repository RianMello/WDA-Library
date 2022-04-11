export const TableFilter = ({ filter, setFilter }: any) => {
  return (
    <span>
      <label>Filter: </label>
      <input
        value={filter || ""}
        onChange={(e) => setFilter(e.currentTarget.value)}
        placeholder="..."
      ></input>
    </span>
  );
};
