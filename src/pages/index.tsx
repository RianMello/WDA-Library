import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useBook } from "../hooks/useBook";
import { useRental } from "../hooks/useRental";
import { useUser } from "../hooks/useUser";
import { usePublisher } from "../hooks/usePublisher";
import styles from "./pages.module.scss";

import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Tooltip,
  LinearScale,
  BarElement,
} from "chart.js";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { FaCashRegister, FaUsers } from "react-icons/fa";
import { GiBookshelf, GiNotebook } from "react-icons/gi";

import { Inventory } from "../components/DashboardComp/Inventory";
import { LastRental } from "../components/DashboardComp/LastRented";

ChartJS.register(ArcElement, Tooltip, LinearScale, BarElement, CategoryScale);

const Dashboard: NextPage = () => {
  const { rentals } = useRental();
  const { users } = useUser();
  const { publishers } = usePublisher();
  const { load, books, mostRented } = useBook();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(load);
  }, [load]);
  const topFiveRenteds = mostRented.slice(0, 5);

  const options = {
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {},
  };

  const data = {
    labels: topFiveRenteds.map((book) => book.nome),
    datasets: [
      {
        label: "labels",
        data: topFiveRenteds.map((book) => book.totalalugado),
        backgroundColor: [
          "#0075FF",
          "#026cec",
          "#0260d3",
          "#0051b4",
          "#0151a1",
        ],
      },
    ],
  };

  return (
    <Box className={styles.boardContainer}>
      <Head>
        <title>Library-Dashboard</title>
      </Head>
      <Box
        sx={{
          textAlign: "center",
          width: "30%",
          marginRight: "0.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            height: "100%",
            backgroundColor: "var(--blue-g0)",
            borderRadius: "0.5rem",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h4" component="h4">
            Registros em Sistema
          </Typography>
          <Inventory />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            width: "100%",
            height: "100%",
            backgroundColor: "var(--blue-g0)",
            marginTop: "1rem",
            borderRadius: "0.5rem",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", marginTop: "1rem" }}
            variant="h4"
            component="h4"
          >
            Ultimos aluguéis feitos
          </Typography>
          <LastRental />
        </Box>
      </Box>
      <div className={styles.ChartContainer}>
        <Typography
          sx={{ fontWeight: "bold", width: "100%" }}
          variant="h4"
          component="h4"
        >
          Os Mais Alugados
        </Typography>

        <Divider
          orientation="horizontal"
          sx={{ backgroundColor: "var(--blue-g200)" }}
          flexItem
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "90%",
              textAlign: "center",
              marginLeft: "0.5rem",
            }}
          >
            {loading ? (
              <>
                laoding datas <CircularProgress />
              </>
            ) : (
              <Bar options={options} data={data} />
            )}
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default Dashboard;
