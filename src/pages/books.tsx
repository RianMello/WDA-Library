import Head from "next/head";
import { useMemo } from "react";
import { Column } from "react-table";
import Table from "../components/Tables";
import { useBook } from "../hooks/useBook";

import styles from "./pages.module.scss";

const Books = () => {
  const { load, books } = useBook();

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
      actions: "edit/Delete",
    }));
  }, [books]);

  console.log(books);
  return (
    <div className={styles.container}>
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
