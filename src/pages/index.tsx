import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useBook } from "../hooks/useBook";
import { useRental } from "../hooks/useRental";

import styles from "./pages.module.scss";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard: NextPage = () => {
  const { rentals } = useRental();
  const { load, mostRented } = useBook();

  const topFiveRenteds = mostRented.slice(0, 5);

  console.log(mostRented);

  const data = {
    labels: topFiveRenteds.map((book) => book.nome),
    datasets: [
      {
        label: "",
        data: topFiveRenteds.map((book) => book.totalalugado),
        backgroundColor: [
          "#0075FF",
          "#0263d6",
          "#024fab",
          "#013d85",
          "#002654",
        ],
        borderColor: ["#0075FF"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.boardContainer}>
      <Head>
        <title>Library-Dashboard</title>
      </Head>
      <div className={styles.ChartContainer}>
        <Typography sx={{ fontWeight: "bold" }} variant="h2" component="h2">
          Chats
        </Typography>
        <Typography
          sx={{ padding: "1rem", marginTop: "1rem" }}
          variant="h4"
          component="h4"
        >
          Top Five Rented
        </Typography>
        <Doughnut data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
