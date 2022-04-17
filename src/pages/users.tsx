import Head from "next/head";
import { useMemo, useState } from "react";
import Table from "../components/Tables";
import ModalComponent from "../components/Modal";

import { useUser } from "../hooks/useUser";

import styles from "./pages.module.scss";
import { Button, CircularProgress, Tooltip, Typography } from "@mui/material";
import { MdEditNote, MdDeleteSweep } from "react-icons/md";
import { User } from "../interfaces/ResponseAPI";
import { FormUser } from "../components/Form/UserForm";
import { DeleteConfirm } from "../components/DeleteConfirm";

export default function Users() {
  const { load, users, deleteUser, getUsers } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({} as User);
  const [isToEdit, setIsToEdit] = useState(false);
  const [isToDelete, setIsToDelete] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };
  const handleModalClose = (success: boolean) => {
    if (success) {
      getUsers();
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
        Header: "Address",
        accessor: "endereco",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "Email",
        accessor: "email",
        className: "thContent",
        classCell: "tdContent",
      },
      {
        Header: "City",
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
    return users.map((user) => ({
      ...user,
      actions: (
        <div className={styles.actions}>
          <Tooltip title="Edit User">
            <Button
              className={styles.buttonEdit}
              onClick={() => {
                handleModalOpen();
                setIsToEdit(true);
                setIsToDelete(false);
                setCurrentUser(user);
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
                setCurrentUser(user);
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
  }, [users]);

  const handleADdUser = () => {
    setIsToDelete(false);
    setIsToEdit(false);
    setIsOpen(true);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Library-Users</title>
      </Head>
      {isOpen ? (
        <ModalComponent
          title={
            isToEdit ? "Edit User" : isToDelete ? "Attention" : "Add New User"
          }
          onClose={() => handleModalClose(false)}
          isOpen={isOpen}
          colorTitle={
            isToEdit ? "var(--white)" : isToDelete ? "red" : "var(--white)"
          }
        >
          {isToEdit ? (
            <FormUser
              onFinish={(success: boolean) => handleModalClose(success)}
              user={currentUser}
            />
          ) : isToDelete ? (
            <DeleteConfirm
              action={() => deleteUser(currentUser as User, handleModalClose)}
              onClose={(success: boolean) => handleModalClose(success)}
              personalityResponse={`The User Record:: ${currentUser}`}
            />
          ) : isToDelete === false && isToEdit === false ? (
            <FormUser
              onFinish={(success: boolean) => handleModalClose(success)}
              user={{} as User}
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
            User Listing
          </Typography>
        </div>
        {load ? (
          <h1>
            Loading
            <CircularProgress />
          </h1>
        ) : (
          <Table columns={COLUMNS} data={data} actionAdd={handleADdUser} />
        )}
      </div>
    </div>
  );
}
