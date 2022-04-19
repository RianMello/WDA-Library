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
import { SelectBook } from "./bookSelector";
import { TiCancel } from "react-icons/ti";
import { IoMdSave } from "react-icons/io";

interface FormRentalProps {
  onFinish: (success: boolean) => void;
  rental: Rental;
}

interface initialProps {
  id: number;
  data_aluguel: string;
  data_previsao: string;
  data_devolucao: string;
  user_id: number;
  book_id: number;
  usuario_id: User;
  livro_id: Book;
}

export function FormRental({ onFinish, rental }: FormRentalProps) {
  const { addRental } = useRental();
  const { users } = useUser();
  const { available } = useBook();

  const [user, setUser] = useState(users[0]);
  const [book, setBook] = useState({} as Book);

  console.log("Livro para o select");
  console.log(book);

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

  const handleUserChange = (user: User) => {
    setUser(user);
  };
  const handleBookChange = (book: Book) => {
    setBook(book);
  };

  const today = dayjs().format("YYYY-MM-DD");

  const handleSubmit = (values: initialProps) => {
    const rentalFinished: Rental = {
      id: values.id,
      data_aluguel: values.data_aluguel,
      data_previsao: values.data_previsao,
      data_devolucao: values.data_devolucao,
      usuario_id: user,
      livro_id: book,
    };
    addRental(rentalFinished as Rental, onFinish);
    console.log(rentalFinished);
    return;
  };

  const initialValue = {
    id: 0,
    data_aluguel: "",
    data_previsao: "",
    data_devolucao: "",
    user_id: 0,
    book_id: 0,
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
      {/* <div className={styles["input-group"]}>
        <TextField
          onChange={formik.handleChange}
          className={styles.inputStyle}
          id="standard-error-helper-text"
          defaultValue={formik.values.usuario_id?.nome}
          label="Responsible :"
          helperText="Required Field."
          variant="standard"
        />
      </div> */}
      <div className={styles["input-group"]}>
        {/* <SelectBook books={available} bookChange={handleBookChange} /> */}
        <Select
          id="book_id"
          label="Book :"
          name="book_id"
          value={formik.values.book_id ? formik.values.book_id : ""}
          error={formik.touched.book_id && Boolean(formik.errors.book_id)}
          variant="filled"
          sx={{ borderBottom: "1px solid white", color: "white" }}
          defaultValue={"Select which book you want to rent"}
          onChange={formik.handleChange}
        >
          <MenuItem value=""></MenuItem>
          {available.map((book) => {
            return (
              <MenuItem key={book.id} value={book.id}>
                {book.nome}
              </MenuItem>
            );
          })}
        </Select>
        {formik.errors.book_id && formik.touched.book_id ? (
          <FormHelperText>Without label</FormHelperText>
        ) : (
          ""
        )}
      </div>
      <div className={styles["control-modalForm"]}>
        <Button
          variant="contained"
          color="error"
          sx={{
            fontWeight: "bold",
            border: "1px solid var(--red)",
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
            border: "1px solid #309E3A",
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
