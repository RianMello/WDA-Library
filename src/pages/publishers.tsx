import Head from "next/head";
import { useMemo } from "react";
import Table from "../components/Tables";
import { usePublisher } from "../hooks/usePublisher";

import styles from "./pages.module.scss";

const Publishers = () => {
  const { load, publishers } = usePublisher();

  const COLUMNS = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "nome",
      },
      {
        Header: "City Main",
        accessor: "cidade",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const data = useMemo(() => {
    return publishers.map((publisher) => ({
      ...publisher,
      actions: "Edit/Delete",
    }));
  }, [publishers]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Library-Publisher</title>
      </Head>
      <div className={styles.content}>
        <div className={styles.titleContent}>
          <h1>Publishers Listing</h1>
        </div>
        {load ? <h1>Loading</h1> : <Table columns={COLUMNS} data={data} />}
      </div>
    </div>
  );
};

export default Publishers;
