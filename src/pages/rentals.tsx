import Head from "next/head";
import { useMemo } from "react";
import Table from "../components/Tables/";
import { useRental } from "../hooks/useRental";

import styles from "./pages.module.scss";

export default function Rentals() {
  const { load, rentals } = useRental();

  const COLUMNS = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Responsible",
        accessor: "usuario",
      },
      {
        Header: "Book Rented",
        accessor: "livro",
      },
      {
        Header: "Rental date",
        accessor: "data_aluguel",
      },
      {
        Header: "Expected date",
        accessor: "data_previsao",
      },
      {
        Header: "Return date",
        accessor: "data_devolucao",
      },
      {
        Header: "Situation",
        accessor: "situation",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const data = useMemo(() => {
    rentals.map((rent) => ({
      ...rent,
      actions: "Edit/Delete",
      livro: rent.livro_id.nome,
      usuario: rent.usuario_id.nome,
    }));
  }, [rentals]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Library-Rentals</title>
      </Head>
      <div className={styles.content}>
        <div className={styles.titleContent}>
          <h1>Book Listing</h1>
        </div>
        {load ? <h1>Loading...</h1> : <Table columns={COLUMNS} data={data} />}
      </div>
    </div>
  );
}
