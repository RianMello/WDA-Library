import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { useEffect, useMemo, useState } from "react";

import { TableRows, TbHeader } from "../../interfaces/toUse";

import { MdEditNote, MdDeleteSweep } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import { useBook } from "../../hooks/useBook";

import styles from "./style.module.scss";
import { styled } from "@mui/system";
import { Book } from "../../interfaces/ResponseAPI";

interface TableProps {
  thead: TbHeader[];
  trows: TableRows[];
  sortedList: (orderBy: string) => Book[];
}

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

export default function Table({ thead, trows, sortedList }: TableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [search, setSearch] = useState<string>("");

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - trows.length) : 0;

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

  return (
    <table className={styles.tableContainer}>
      <thead className={styles.theadContainer}>
        <tr className={styles.trHeaderContainer}>
          <td colSpan={thead.length + 2}>
            <div className={styles.tdInput}>
              <button className={styles.buttonAdd}>Add</button>
              <div className={styles.inputStyle}>
                <label>Filter:</label>
                <input type="text"></input>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <th className={styles.thContentID} key="id">
            ID
          </th>
          {thead.map((th) => (
            <th
              onClick={(e) => sortedList(e.currentTarget.id)}
              className={styles.thContent}
              key={th.thId}
              id={th.thId}
            >
              {th.thLabel}
            </th>
          ))}
          <th className={styles.thContentAct} key="options" id="opt">
            Options
          </th>
        </tr>
      </thead>
      <tbody>
        {(rowsPerPage > 0 && trows.length !== 0
          ? trows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : trows
        ).map((row) => (
          <tr className={styles.trContent} key={row.trId}>
            {row.trContent.map((td) => {
              return (
                <td
                  className={
                    isNaN(td.valueOf() as number)
                      ? styles.tdContentString
                      : styles.tdContent
                  }
                  key={td}
                >
                  {td}
                </td>
              );
            })}
            <td className={styles.tdContentAct}>
              <button className={styles.buttonEdit}>
                <MdEditNote />
              </button>
              <button className={styles.buttonDel}>
                <MdDeleteSweep />
              </button>
            </td>
          </tr>
        ))}
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
            colSpan={thead.length + 2}
            count={trows.length}
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
}
