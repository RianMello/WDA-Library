import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import Head from "next/head";
import { useMemo, useState } from "react";
import { MdDeleteSweep, MdEditNote } from "react-icons/md";
import { DeleteConfirm } from "../components/DeleteConfirm";
import { FormPublisher } from "../components/Form/PublisherForm";
import ModalComponent from "../components/Modal";
import Table from "../components/Tables";
import { usePublisher } from "../hooks/usePublisher";
import { Publisher } from "../interfaces/ResponseAPI";

import styles from "./pages.module.scss";

const Publishers = () => {
  const { load, publishers, getPublishers, deletePublisher } = usePublisher();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPub, setCurrentPub] = useState({} as Publisher);
  const [isToEdit, setIsToEdit] = useState(false);
  const [isToDelete, setIsToDelete] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = (success: boolean) => {
    if (success) {
      getPublishers();
    }

    setIsOpen(false);
  };

  const COLUMNS = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        className: "thContentID",
        classCell: "tdContentID",
      },
      {
        Header: "Name",
        accessor: "nome",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "City Main",
        accessor: "cidade",
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

  const data = useMemo(() => {
    return publishers.map((publisher) => ({
      ...publisher,
      actions: (
        <div className={styles.actions}>
          <Tooltip title="Edit User">
            <Button
              className={styles.buttonEdit}
              onClick={() => {
                handleModalOpen();
                setIsToEdit(true);
                setIsToDelete(false);
                setCurrentPub(publisher);
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
                setCurrentPub(publisher);
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
  }, [publishers]);

  const handleAddPublisher = () => {
    setIsToDelete(false);
    setIsToEdit(false);
    setIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Library-Publisher</title>
      </Head>
      {isOpen ? (
        <ModalComponent
          title={
            isToEdit
              ? "Edit Publisher"
              : isToDelete
              ? "Attention"
              : "Add New Publisher"
          }
          onClose={() => handleModalClose(false)}
          isOpen={isOpen}
          colorTitle={
            isToEdit ? "var(--white)" : isToDelete ? "red" : "var(--white)"
          }
        >
          {isToEdit ? (
            <FormPublisher
              onFinish={(success: boolean) => handleModalClose(success)}
              publisher={currentPub}
            />
          ) : isToDelete ? (
            <DeleteConfirm
              action={() =>
                deletePublisher(currentPub as Publisher, handleModalClose)
              }
              onClose={(success: boolean) => handleModalClose(success)}
              personalityResponse={`The Publisher Company Record: ${currentPub.nome}`}
            />
          ) : isToDelete === false && isToEdit === false ? (
            <FormPublisher
              onFinish={(success: boolean) => handleModalClose(success)}
              publisher={{} as Publisher}
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
          <Typography
            variant="h3"
            component="h3"
            style={{ fontWeight: "bold" }}
          >
            {" "}
            Publisher Listing
          </Typography>
        </div>
        {load ? (
          <h1>
            Loading
            <CircularProgress />
          </h1>
        ) : (
          <Table columns={COLUMNS} data={data} actionAdd={handleAddPublisher} />
        )}
      </div>
    </div>
  );
};

export default Publishers;
