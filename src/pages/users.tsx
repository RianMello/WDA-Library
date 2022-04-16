import Head from "next/head";
import { useMemo } from "react";
import Table from "../components/Tables";
import { useUser } from "../hooks/useUser";

import styles from "./pages.module.scss";

export default function Users() {
  const { load, users } = useUser();

  const COLUMNS = useMemo(
    () => [
      {
        Header: "Actions",
        accessor: "actions",
        className: "thContentAct",
      },
      {
        Header: "ID",
        accessor: "id",
        className: "thContentID",
      },
      {
        Header: "Name",
        accessor: "nome",
        className: "thContent",
      },
      {
        Header: "Address",
        accessor: "endereco",
        className: "thContent",
      },
      {
        Header: "Email",
        accessor: "email",
        className: "thContent",
      },
      {
        Header: "City",
        accessor: "cidade",
        className: "thContent",
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
