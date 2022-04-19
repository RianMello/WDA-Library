import {
  useTable,
  useSortBy,
  useGlobalFilter,
  UseTableOptions,
} from "react-table";

import { HiSortAscending, HiSortDescending } from "react-icons/hi";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";

import styles from "./style.module.scss";
import { styled } from "@mui/system";
import { useState } from "react";
import { TableFilter } from "./Filter";

import { Book, Publisher, Rental, User } from "../../interfaces/ResponseAPI";
import { Button, Typography } from "@mui/material";
import { ButtonAdd } from "../Buttons/ButtonAdd";

const CustomTablePagination = styled(TablePaginationUnstyled)(
  ({ theme }) => `
    & .MuiTablePaginationUnstyled-spacer {
      display: none;
    }
    & .MuiTablePaginationUnstyled-toolbar {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: 10px;
      padding: 1rem;
      border-radius: 0 0 0.5rem 0.5rem;

    }
    & .MuiTablePaginationUnstyled-root css-4zlnug{
      border-radius: 0 0 0.5rem 0.5rem;
    }
    & .MuiTablePaginationUnstyled-selectLabel {
      margin: 0;
      color: var(--white-g100);
    }
    & .MuiTablePaginationUnstyled-select {
      padding: 2px;
      border: 1px solid var(--blue-g200);
      border-radius: 50px;
      background-color: transparent;
      color: var(--white-g100);
      &:hover {
        background-color: var(--blue-g100);
      }
      &:focus {
        outline: 1px solid var(--blue);
      }
    }
    & .MuiTablePaginationUnstyled-displayedRows {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
    & .MuiTablePaginationUnstyled-actions {
      padding: 2px;
      border: 1px solid var(--blue-g200);
      border-radius: 50px;
      text-align: center;
      color: var(--white-g100);
    }
    & .MuiTablePaginationUnstyled-actions > button {
      margin: 0 8px;
      border: transparent;
      border-radius: 2px;
      background-color: transparent;
      color: var(--white-g100);
      &:hover {
        background-color: var(--blue);
      }
      &:focus {
        outline: 1px solid var(--blue-g200);
      }
    }
    `
);

type ItemToUpdateType = Book | Publisher | Rental | User;

const Table = ({ columns, data, actionAdd }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // console.log("Tabela aqui ò ---------");
  // console.log(columns);
  // console.log(data);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const { globalFilter } = state;

  return (
    <table className={styles.tableContainer} {...getTableProps()}>
      <thead className={styles.theadContainer}>
        <tr className={styles.trHeaderContainer}>
          <td colSpan={columns.length}>
            <div className={styles.tdInput}>
              <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
              <ButtonAdd handleAddItem={actionAdd} />
            </div>
          </td>
        </tr>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={headerGroup.getHeaderGroupProps().key}
          >
            {headerGroup.headers.map((column) => {
              return (
                <th
                  className={
                    styles[
                      column.render("className") !== undefined
                        ? (column.render("className") as string)
                        : "thContent"
                    ]
                  }
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
                >
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: "1.3rem" }}
                    variant="h6"
                    component="h6"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <HiSortDescending color="var(--blue)" />
                        ) : (
                          <HiSortAscending color="var(--blue)" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </Typography>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {(rowsPerPage > 0 && rows.length !== 0
          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : rows
        ).map((row) => {
          prepareRow(row);
          return (
            <tr
              className={styles.trContent}
              {...row.getRowProps()}
              key={row.id}
            >
              {row.cells.map((cell) => {
                return (
                  <td
                    className={
                      cell.column.render("classCell")?.toString() !== undefined
                        ? styles[
                            cell.column
                              .render("classCell")
                              ?.toString() as string
                          ]
                        : styles.tdContent
                    }
                    {...cell.getCellProps()}
                    key={cell.getCellProps().key}
                  >
                    <Typography variant="body2" component="span">
                      {cell.render("Cell")}
                    </Typography>
                  </td>
                );
              })}
            </tr>
          );
        })}
        {emptyRows > 0 && (
          <tr style={{ height: 41 * emptyRows }}>
            <td colSpan={3} />
          </tr>
        )}
      </tbody>
      <tfoot className={styles.tfootContainer}>
        <tr>
          <CustomTablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={columns.length}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            componentsProps={{
              select: {
                "aria-label": "rows per page",
              },
              actions: {
                showFirstButton: true,
                showLastButton: true,
              } as any,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
