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

const Books = () => {
  const { load, books, deleteBook } = useBook();
  const [isOpen, setIsOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState({} as Book);
  const [isToEdit, setIsToEdit] = useState(true);
  const [bookToEdited, setBookToEdited] = useState({} as Book);
  const [bookToDelete, setBookToDelete] = useState({} as Book);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = () => {
    setIsOpen(false);
  };
  const columns: Column[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "nome",
      },
      {
        Header: "Author",
        accessor: "autor",
      },
      {
        Header: "Publisher",
        accessor: "editora_id",
      },
      {
        Header: "Release",
        accessor: "lancamento",
      },
      {
        Header: "Amount",
        accessor: "quantidade",
      },
      {
        Header: "Rented",
        accessor: "totalalugado",
      },
      {
        Header: "Actions",
        accessor: "actions",
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
          <button
            className={styles.buttonEdit}
            onClick={() => {
              handleModalOpen();
              setIsToEdit(true);
              setCurrentBook(book);
            }}
          >
            <MdEditNote />
          </button>
          <button
            className={styles.buttonDel}
            onClick={() => {
              handleModalOpen();
              setIsToEdit(false);
              setCurrentBook(book);
            }}
          >
            <MdDeleteSweep />
          </button>
        </div>
      ),
    }));
  }, [books]);

  console.log(books);
  return (
    <div className={styles.container}>
      {isOpen ? (
        <ModalComponent
          title="Edit Book"
          FormId="BookAdd"
          onClose={handleModalClose}
          isOpen={isOpen}
        >
          {isToEdit ? (
            <FormBook onFinish={handleModalClose} book={currentBook} />
          ) : (
            <DeleteConfirm
              action={() => deleteBook(currentBook, handleModalClose)}
              onClose={() => handleModalClose()}
            />
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
          <h1>Book Listing</h1>
        </div>
        {load !== true ? (
          <Table columns={columns} data={data} />
        ) : (
          <h1>loading</h1>
        )}
      </div>
    </div>
  );
};

export default Books;
