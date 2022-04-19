import { Button, Tooltip } from "@mui/material";
import Head from "next/head";
import { useMemo, useState } from "react";
import { MdDeleteSweep, MdEditNote } from "react-icons/md";
import { Column } from "react-table";
import { DeleteConfirm } from "../components/DeleteConfirm";
import { FormRental } from "../components/Form/RentalForm";
import ModalComponent from "../components/Modal";
import Table from "../components/Tables/";
import { useRental } from "../hooks/useRental";
import { Rental } from "../interfaces/ResponseAPI";

import styles from "./pages.module.scss";

export default function Rentals() {
  const { load, rentals, getRentals, deleteRental } = useRental();
  const [isToEdit, setIsToEdit] = useState(false);
  const [isToDelete, setIsToDelete] = useState(false);
  const [currentRental, setCurrentRental] = useState({} as Rental);

  const [isOpen, setIsOpen] = useState(false);
  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = (success: boolean) => {
    if (success) {
      getRentals();
    }

    setIsOpen(false);
  };

  const COLUMNS: Column[] = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        className: "thContentID",
        classCell: "tdContentID",
      },
      {
        Header: "Responsible",
        accessor: "usuario_id",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "Book Rented",
        accessor: "livro_id",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "Rental date",
        accessor: "data_aluguel",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "Expected date",
        accessor: "data_previsao",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "Return date",
        accessor: "data_devolucao",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "Actions",
        accessor: "actions",
        className: "thContentAct",
        classCell: "tdContentAct",
      },
    ],
    []
  );

  // const handleDataMount = () => {
  //   return()
  // }

  const data = useMemo(() => {
    console.log("rentals data table: ");
    console.log(rentals);
    return rentals.map((rent) => ({
      ...rent,
      data_devolucao:
        rent.data_devolucao !== null ? rent.data_devolucao : "Não devolvido",
      livro_id: rent.livro_id.nome,
      usuario_id: rent.usuario_id.nome,
      actions: (
        <div className={styles.actions}>
          <Tooltip title="Edit User">
            <Button
              className={styles.buttonEdit}
              onClick={() => {
                handleModalOpen();
                setIsToEdit(true);
                setIsToDelete(false);
                setCurrentRental(rent);
              }}
            >
              <MdEditNote style={{ width: "2rem", height: "2rem" }} />
            </Button>
          </Tooltip>
          <Tooltip title="Delete User">
            <Button
              className={styles.buttonDel}
              onClick={() => {
                handleModalOpen();
                setIsToDelete(true);
                setIsToEdit(false);
                setCurrentRental(rent);
              }}
            >
              <MdDeleteSweep
                style={{ color: "var(--red)", width: "2rem", height: "2rem" }}
              />
            </Button>
          </Tooltip>
        </div>
      ),
    }));
  }, [rentals]);

  const handleAddRental = () => {
    setIsToDelete(false);
    setIsToEdit(false);
    setIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Library-Rentals</title>
      </Head>
      {isOpen ? (
        <ModalComponent
          title={
            isToEdit
              ? "Edit Rental"
              : isToDelete
              ? "Attention"
              : "Add New Rental"
          }
          onClose={() => handleModalClose(false)}
          isOpen={isOpen}
          colorTitle={
            isToEdit ? "var(--white)" : isToDelete ? "red" : "var(--white)"
          }
        >
          {isToEdit ? (
            <FormRental
              onFinish={(success: boolean) => handleModalClose(success)}
              rental={currentRental}
            />
          ) : isToDelete ? (
            <DeleteConfirm
              action={() =>
                deleteRental(currentRental as Rental, handleModalClose)
              }
              onClose={(success: boolean) => handleModalClose(success)}
              personalityResponse={`the Rental of book ${currentRental.livro_id.nome} with Responsible ${currentRental.usuario_id.nome}`}
            />
          ) : isToDelete === false && isToEdit === false ? (
            <FormRental
              onFinish={(success: boolean) => handleModalClose(success)}
              rental={{} as Rental}
            />
          ) : (
            ""
          )}
        </ModalComponent>
      ) : (
        ""
      )}
      <div className={styles.content}>
        <div className={styles.titleContent}>
          <h1>Rental Listing</h1>
        </div>
        {load ? (
          <h1>Loading...</h1>
        ) : (
          <Table columns={COLUMNS} data={data} actionAdd={handleAddRental} />
        )}
      </div>
    </div>
  );
}
