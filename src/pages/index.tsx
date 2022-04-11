import type { NextPage } from "next";
import Head from "next/head";
import { useRental } from "../hooks/useRental";

const Dashboard: NextPage = () => {
  const { load, rentals } = useRental();
  return (
    <div>
      <Head>
        <title>Library-Dashboard</title>
      </Head>
      <h1>Dashboard</h1>
      <div>Aluguéis registrados: {rentals.length}</div>
    </div>
  );
};

export default Dashboard;
