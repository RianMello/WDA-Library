import Head from "next/head";
import { useMemo } from "react";
import Table from "../components/Tables";
import { useUser } from "../hooks/useUser";

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
    <div>
      <Head>
        <title>Library-Users</title>
      </Head>
      <h1>Users</h1>
      {load ? <h1>Loading</h1> : <Table columns={COLUMNS} data={data} />}
    </div>
  );
}
