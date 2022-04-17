import Head from "next/head";
import { useMemo, useState } from "react";
import { DeleteConfirm } from "../components/DeleteConfirm";
import {
  Column,
  TableOptions,
  useGlobalFilter,
  useTable,
  UseTableOptions,
} from "react-table";
import Table from "../components/Tables";
import { useBook } from "../hooks/useBook";
import ModalComponent from "../components/Modal";

import styles from "./pages.module.scss";
import { MdEditNote, MdDeleteSweep } from "react-icons/md";
import { TableFilter } from "../components/Tables/Filter";
import { FormBook } from "../components/Form/BookForm";
import { Book } from "../interfaces/ResponseAPI";
import { Button, Tooltip, Typography } from "@mui/material";

const Books = () => {
  const { load, books, deleteBook } = useBook();
  const [isOpen, setIsOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState({} as Book);
  const [isToEdit, setIsToEdit] = useState(false);
  const [isToDelete, setIsToDelete] = useState(false);
  const [bookToEdited, setBookToEdited] = useState({} as Book);
  const [bookToDelete, setBookToDelete] = useState({} as Book);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };

  // Dealing with assembling the table columns
  const columns: Column[] = useMemo(
    () => [
      {
        Header: "Actions",
        accessor: "actions",
        className: "thContentAct",
        classCell: "tdContentAct",
      },
      {
        Header: "ID",
        accessor: "id",
        className: "thContentID",
        classCell: "tdContentID",
      },
      {
        Header: "Title",
        accessor: "nome",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "Author",
        accessor: "autor",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "Publisher",
        accessor: "editora_id",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "Release",
        accessor: "lancamento",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "Amount",
        accessor: "quantidade",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "Rented",
        accessor: "totalalugado",
        className: "thContent",
        classCell: "tdContent",
      },
    ],
    []
  );

  const data = useMemo(() => {
    return books.map((book) => ({
      ...book,
      editora_id: book.editora.nome,
      actions: (
        <div className={styles.actions}>
          <Tooltip title="Edit Book">
            <Button
              className={styles.buttonEdit}
              onClick={() => {
                handleModalOpen();
                setIsToEdit(true);
                setIsToDelete(false);
                setCurrentBook(book);
              }}
            >
              <MdEditNote style={{ width: "2rem", height: "2rem" }} />
            </Button>
          </Tooltip>
          <Tooltip title="Delete Book">
            <Button
              className={styles.buttonDel}
              // disabled={book.totalalugado !== 0 ? true : false}
              onClick={() => {
                handleModalOpen();
                setIsToDelete(true);
                setIsToEdit(false);
                setCurrentBook(book);
              }}
            >
              <MdDeleteSweep
                style={{ color: "var(--red)", width: "2rem", height: "2rem" }}
              />
            </Button>
          </Tooltip>
        </div>
      ),
    }));
  }, [books]);

  const handleAddBook = () => {
    setIsToDelete(false);
    setIsToEdit(false);
    setIsOpen(true);
  };

  console.log(currentBook);
  return (
    <div className={styles.container}>
      {isOpen ? (
        <ModalComponent
          title={
            isToEdit
              ? "Edit Book"
              : isToDelete
              ? "Delete this Book?"
              : "Add new Book"
          }
          FormId="BookAdd"
          onClose={handleModalClose}
          isOpen={isOpen}
        >
          {isToEdit ? (
            <FormBook onFinish={handleModalClose} book={currentBook} />
          ) : isToDelete ? (
            <DeleteConfirm
              action={() => deleteBook(currentBook as Book, handleModalClose)}
              onClose={() => handleModalClose()}
            />
          ) : isToDelete === false && isToEdit === false ? (
            <FormBook onFinish={handleModalClose} book={{} as Book} />
          ) : (
            ""
          )}
        </ModalComponent>
      ) : (
        ""
      )}
      <Head>
        <title>Library-Books</title>
      </Head>
      <div className={styles.content}>
        <div className={styles.titleContent}>
          <Typography sx={{ fontWeight: "bold" }} variant="h3" component="h3">
            Book Listing
          </Typography>
        </div>
        {load !== true ? (
          <Table columns={columns} data={data} actionAdd={handleAddBook} />
        ) : (
          <h1>loading</h1>
        )}
      </div>
    </div>
  );
};

export default Books;
