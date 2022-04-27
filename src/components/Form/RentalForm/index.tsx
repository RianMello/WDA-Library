import { Book, Rental, User } from "../../../interfaces/ResponseAPI";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Button,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import styles from "../styles.module.scss";
import { useRental } from "../../../hooks/useRental";
import { useUser } from "../../../hooks/useUser";
import { useBook } from "../../../hooks/useBook";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { TiCancel } from "react-icons/ti";
import { IoMdSave } from "react-icons/io";

import { useSnackbar, VariantType } from "notistack";
interface FormRentalProps {
  onFinish: (success: boolean) => void;
  rental: Rental;
}

interface initialProps {
  id: number;
  data_aluguel: string;
  data_previsao: string;
  data_devolucao: string;
  usuario_id: User;
  livro_id: Book;
}

export function FormRental({ onFinish }: FormRentalProps) {
  const { addRental } = useRental();
  const { users } = useUser();
  const { available } = useBook();

  const [user, setUser] = useState(users[0]);
  const [book, setBook] = useState({} as Book);

  const { enqueueSnackbar } = useSnackbar();

  const schema = Yup.object().shape({
    id: Yup.number(),
    data_aluguel: Yup.string().required(
      "Você precisa informa a data do aluguel"
    ),
    data_previsao: Yup.string().required(
      "Você precisa informa a data prevista para a devolução"
    ),
    data_devolucao: Yup.string(),
    usuario_id: Yup.object({
      cidade: Yup.string(),
      email: Yup.string(),
      endereco: Yup.string(),
      id: Yup.number(),
      nome: Yup.string(),
    }).required("Você precisa informar o usuario responsável"),
    livro_id: Yup.object({
      autor: Yup.string(),
      editora: Yup.object({
        nome: Yup.string(),
        id: Yup.number(),
        cidade: Yup.string(),
      }),
      id: Yup.number(),
      lancamento: Yup.number(),
      nome: Yup.string(),
      quantidade: Yup.string(),
      totalalugado: Yup.string(),
    }).required("Você precisa informar o livro alugado"),
  });

  const showMessage = (message: string, status: VariantType) => {
    enqueueSnackbar(message, {
      variant: status,
      preventDuplicate: true,
    });
  };

  const handleUserChange = (id: any) => {
    users.map((user: User) => {
      if (id === user.id) {
        setUser(user);
        return;
      }
    });
  };
  const handleBookChange = (id: any, e: any) => {
    console.log(e);
    available.map((book: Book) => {
      if (id == book.id) {
        setBook(book);
        return;
      }
    });
  };

  const today = dayjs().format("YYYY-MM-DD");

  const handleSubmit = async (values: initialProps) => {
    const rentalFinished: Rental = {
      id: values.id,
      data_aluguel: today,
      data_previsao: values.data_previsao,
      data_devolucao: values.data_devolucao,
      usuario_id: user,
      livro_id: book,
    };

    try {
      await addRental(rentalFinished as Rental, onFinish);
      showMessage("Aluguel cadastrado com sucesso!", "success");
    } catch (err) {
      showMessage("Não foi possivel cadastrar o aluguel", "error");
    }

    addRental(rentalFinished as Rental, onFinish);
    console.log(rentalFinished);
    return;
  };

  const initialValue = {
    id: 0,
    data_aluguel: "",
    data_previsao: "",
    data_devolucao: "",
    usuario_id: user,
    livro_id: book,
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });
  return (
    <form className={styles.formContainerStyle} onSubmit={formik.handleSubmit}>
      <div className={styles["input-group"]}>
        <Select
          inputProps={{ color: "white" }}
          labelId="demo-simple-select-standard-label"
          id="user_id"
          label="User :"
          name="usuario_id"
          variant="filled"
          sx={{ borderBottom: "1px solid white", color: "white" }}
          defaultValue={"Select which book you want to rent"}
          onChange={(e) => handleUserChange(e.target.value)}
        >
          <MenuItem value=""></MenuItem>
          {users.map((user) => {
            return (
              <MenuItem key={user.id} value={user.id}>
                {user.nome}
              </MenuItem>
            );
          })}
        </Select>
        {formik.errors.usuario_id && formik.touched.usuario_id ? (
          <FormHelperText>Without label</FormHelperText>
        ) : (
          ""
        )}
      </div>
      <div className={styles["input-group"]}>
        <TextField
          type="date"
          onChange={formik.handleChange}
          error={
            formik.touched.data_previsao && Boolean(formik.errors.data_previsao)
          }
          className={styles.inputStyle}
          id="standard-error-helper-text"
          defaultValue={formik.values.data_previsao}
          label="Data prevista para a Entrega :"
          helperText="Required Field"
          variant="standard"
        />
      </div>
      <div className={styles["input-group"]}>
        <TextField
          select
          onChange={(e) => handleBookChange(e.target.value, e)}
          // SelectProps={{
          //   error: formik.touched.livro_id && Boolean(formik.errors.livro_id),
          //   color:
          //     formik.touched.livro_id && Boolean(formik.errors.livro_id)
          //       ? "error"
          //       : "primary",
          // }}
          color={
            formik.touched.livro_id && Boolean(formik.errors.livro_id)
              ? "error"
              : "primary"
          }
          value={formik.values.livro_id}
          error={formik.touched.livro_id && Boolean(formik.errors.livro_id)}
          className={styles.inputStyle}
          id="standard-error-helper-text"
          label="Livro Alugado :"
          helperText={"Required Field."}
          variant="standard"
        >
          {available.map((book) => {
            return (
              <MenuItem key={book.id} value={book.id}>
                {book.nome}
              </MenuItem>
            );
          })}
        </TextField>
      </div>
      <div className={styles["control-modalForm"]}>
        <Button
          variant="contained"
          color="error"
          sx={{
            fontWeight: "bold",
            backgroundColor: "var(--red)",
            color: "white",
            marginRight: "1rem",
            width: "9rem",
            height: "3rem",
          }}
          onClick={() => onFinish(false)}
          startIcon={<TiCancel />}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{
            fontWeight: "bold",
            backgroundColor: "#309E3A",
            color: "white",
            marginLeft: "1rem",
            width: "9rem",
            height: "3rem",
          }}
          type="submit"
          startIcon={<IoMdSave />}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
