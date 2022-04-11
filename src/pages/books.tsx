import Head from "next/head";
import { useMemo, useState } from "react";
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
import { MdEditNote } from "react-icons/md";
import { TableFilter } from "../components/Tables/Filter";
import { FormBook } from "../components/Form/BookForm";
import { Book } from "../interfaces/ResponseAPI";

const Books = () => {
  const { load, books } = useBook();
  const [isOpen, setIsOpen] = useState(false);
  const [bookToEdited, setBookToEdited] = useState({} as Book);

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
        <button
          onClick={() => {
            handleModalOpen();
            setBookToEdited(book);
          }}
        >
          <MdEditNote />
        </button>
      ),
    }));
  }, [books]);

  const { state, setGlobalFilter } = useTable(
    { columns, data },
    useGlobalFilter
  );

  const { globalFilter } = state;

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
          <FormBook onFinish={handleModalClose} book={bookToEdited} />
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
        <div className={styles.tdInput}>
          <button
            onClick={() => handleModalOpen()}
            className={styles.buttonAdd}
          >
            Add
          </button>

          <TableFilter filter={globalFilter} setFilter={setGlobalFilter} />
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
