import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { DeleteConfirm } from "../components/DeleteConfirm";
import { Column } from "react-table";
import Table from "../components/Tables";
import { useBook } from "../hooks/useBook";
import ModalComponent from "../components/Modal";

import styles from "./pages.module.scss";
import { MdEditNote, MdDeleteSweep } from "react-icons/md";
import { FormBook } from "../components/Form/BookForm";
import { Book } from "../interfaces/ResponseAPI";
import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";

const Books = () => {
  const { load, books, deleteBook, getBooks } = useBook();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentBook, setCurrentBook] = useState({} as Book);
  const [isToEdit, setIsToEdit] = useState(false);
  const [isToDelete, setIsToDelete] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = (success: boolean) => {
    if (success) {
      getBooks();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    setLoading(load);
  }, [load]);

  // Dealing with assembling the table columns
  const columns: Column[] = useMemo(
    () => [
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
      {
        Header: "Actions",
        accessor: "actions",
        className: "thContentAct",
        classCell: "tdContentAct",
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
  return (
    <div className={styles.container}>
      {isOpen ? (
        <ModalComponent
          title={
            isToEdit ? "Edit Book" : isToDelete ? "Attention" : "Add new Book"
          }
          onClose={() => handleModalClose(false)}
          isOpen={isOpen}
          colorTitle={
            isToEdit ? "var(--white)" : isToDelete ? "red" : "var(--white)"
          }
        >
          {isToEdit ? (
            <FormBook
              onFinish={(e: boolean) => handleModalClose(e)}
              book={currentBook}
            />
          ) : isToDelete ? (
            <DeleteConfirm
              action={() =>
                deleteBook(currentBook as Book, (e: boolean) =>
                  handleModalClose(e)
                )
              }
              onClose={(e: boolean) => handleModalClose(e)}
              personalityResponse={`This book: ${currentBook.nome}?`}
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
        {loading !== true ? (
          <Table columns={columns} data={data} actionAdd={handleAddBook} />
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default Books;
