import Head from "next/head";
import { useMemo } from "react";
import Table from "../components/Tables";
import { useUser } from "../hooks/useUser";

import styles from "./users.module.scss";

export default function Users() {
  const { load, users } = useUser();

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
        Header: "Address",
        accessor: "endereco",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "City",
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
    return users.map((user) => ({
      ...user,
      actions: "Edit/Delete",
    }));
  }, [users]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Library-Users</title>
      </Head>
      <div className={styles.content}>
        <div className={styles.titleContent}>
          <h1>User Listing</h1>
        </div>
        {load ? <h1>Loading</h1> : <Table columns={COLUMNS} data={data} />}
      </div>
    </div>
  );
}
