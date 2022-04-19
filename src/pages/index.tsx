import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useBook } from "../hooks/useBook";
import { useRental } from "../hooks/useRental";

import styles from "./pages.module.scss";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { MdSpaceDashboard } from "react-icons/md";
import { FaCashRegister, FaUsers } from "react-icons/fa";
import { GiBookshelf, GiNotebook } from "react-icons/gi";
import { useUser } from "../hooks/useUser";
import { usePublisher } from "../hooks/usePublisher";
ChartJS.register(ArcElement, Tooltip, Legend);

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
  const leastRentedBooks = mostRented.slice(-7, -2);

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

  const dataLast = {
    labels: leastRentedBooks.map((book) => book.nome),
    datasets: [
      {
        label: "",
        data: leastRentedBooks.map((book) => book.totalalugado),
        backgroundColor: [
          "#eb4034",
          "#c2352b",
          "#8f251e",
          "#591713",
          "#360e0b",
        ],
        borderColor: ["#eb4034"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box className={styles.boardContainer}>
      <Head>
        <title>Library-Dashboard</title>
      </Head>
      <div className={styles.ChartContainer}>
        <Typography
          sx={{ fontWeight: "bold", width: "100%" }}
          variant="h2"
          component="h2"
        >
          Charts
        </Typography>
        <Divider sx={{ backgroundColor: "var(--blue-g200)" }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            sx={{
              width: "50%",
              height: "100%",
            }}
          >
            <Typography sx={{ padding: "1rem" }} variant="h4" component="h4">
              Top Five Rented
            </Typography>
            {loading ? (
              <>
                laoding datas <CircularProgress />
              </>
            ) : (
              <Doughnut data={data} />
            )}
          </Box>
          <Box sx={{ width: "50%", height: "100%" }}>
            <Typography sx={{ padding: "1rem" }} variant="h4" component="h4">
              Last 5 Rented
            </Typography>
            {loading ? (
              <>
                laoding datas <CircularProgress />
              </>
            ) : (
              <Doughnut data={dataLast} />
            )}
          </Box>
        </Box>
      </div>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "var(--blue-g0)",
          width: "20%",
          height: "15rem",
          marginLeft: "2rem",
          borderRadius: "0.5rem",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", padding: "1rem" }}
          variant="h4"
          component="h4"
        >
          Inventory and Records
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: "100%",
            bgcolor: "var(--blue-g100)",
            borderRadius: "0.5rem",
          }}
        >
          <ListItem sx={{ fontSize: "" }}>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: "var(--blue-g50)" }}>
                <GiBookshelf style={{ color: "var(--blue-icons)" }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontSize: "1.3rem",
                fontWeight: "bold",
              }}
              secondaryTypographyProps={{ color: "white" }}
              primary="Books"
              secondary={`total:${books.length}`}
            />
          </ListItem>
          <Divider
            sx={{ backgroundColor: "var(--blue-g200)" }}
            variant="inset"
            component="li"
          />
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: "var(--blue-g50)" }}>
                <FaCashRegister style={{ color: "var(--blue-icons)" }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontSize: "1.3rem",
                fontWeight: "bold",
              }}
              secondaryTypographyProps={{ color: "white" }}
              primary="Rental Records"
              secondary={`total:${rentals.length}`}
            />
          </ListItem>
          <Divider
            sx={{ backgroundColor: "var(--blue-g200)" }}
            variant="inset"
            component="li"
          />
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: "var(--blue-g50)" }}>
                <FaUsers style={{ color: "var(--blue-icons)" }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontSize: "1.3rem",
                fontWeight: "bold",
              }}
              secondaryTypographyProps={{ color: "white" }}
              primary="User Records"
              secondary={`total:${users.length}`}
            />
          </ListItem>
          <Divider
            sx={{ backgroundColor: "var(--blue-g200)" }}
            variant="inset"
            component="li"
          />
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: "var(--blue-g50)" }}>
                <GiNotebook style={{ color: "var(--blue-icons)" }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{
                fontSize: "1.3rem",
                fontWeight: "bold",
              }}
              secondaryTypographyProps={{ color: "white" }}
              primary="Publisher Records"
              secondary={`total:${publishers.length}`}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Dashboard;
