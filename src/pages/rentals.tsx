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
        accessor: "usuario_id",
      },
      {
        Header: "Book Rented",
        accessor: "livro_id",
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
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const data = useMemo(() => {
    rentals.map((rent) => {
      return {
        ...rent,
        data_devolucao:
          rent.data_devolucao === null ? "Não devolvido" : rent.data_devolucao,
        livro_id: rent.livro_id.nome,
        usuario_id: rent.usuario_id.nome,
        actions: "Edit/Delete",
      };
    });
  }, [rentals]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Library-Rentals</title>
      </Head>
      <div className={styles.content}>
        <div className={styles.titleContent}>
          <h1>Rental Listing</h1>
        </div>
        {load ? <h1>Loading...</h1> : <Table columns={COLUMNS} data={data} />}
      </div>
    </div>
  );
}
