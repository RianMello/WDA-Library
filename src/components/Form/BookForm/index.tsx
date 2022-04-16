import { useBook } from "../../../hooks/useBook";
import dayjs from "dayjs";
import { Book, Publisher } from "../../../interfaces/ResponseAPI";

// import { ContainerForm } from "../../../../styles/formsStyles";
import { usePublisher } from "../../../hooks/usePublisher";
import {
  Formik,
  FormikHelpers,
  Form,
  Field,
  ErrorMessage,
  useFormik,
} from "formik";
import * as Yup from "yup";
import { Select } from "./Select";
import { useState } from "react";
import { IoMdSave } from "react-icons/io";
import { TiCancel } from "react-icons/ti";

import styles from "../styles.module.scss";
import { Button } from "@mui/material";

interface PropsFormBook {
  onFinish: () => void;
  book?: Book;
}
interface initialProps {
  id?: number;
  nome?: string;
  lancamento?: number | string;
  autor?: string;
  quantidade?: number;
  editora_id?: number;
  editora?: Publisher;
  totalalugado?: number;
}

export function FormBook({ onFinish, book }: PropsFormBook) {
  const schema = Yup.object().shape({
    id: Yup.number(),
    nome: Yup.string().required("Voçê deve informar o nome do livro"),
    lancamento: Yup.string().required("Voê deve informar a data de lançamento"),
    autor: Yup.string().required("Voê deve informar o nome do autor do livro"),
    quantidade: Yup.number()
      .min(1)
      .required("Voê deve ter e informar pelo menos 1(uma) cópia do livro"),
    editora: Yup.object({
      id: Yup.number(),
      nome: Yup.string(),
      cidade: Yup.string(),
    }).required("Voê deve informar a editora do livro"),
    editora_id: Yup.number().required("Voê deve informar a editora do livro"),
    totalalugado: Yup.number(),
  });

  const { addBook, editBook } = useBook();
  const { publishers } = usePublisher();

  const today = dayjs().format("YYYY-MM-DD");
  const [publisher, setPublisher] = useState<Publisher>(
    book?.id ? book.editora : publishers[0]
  );

  const handlePublisherChange = (pub: Publisher) => {
    setPublisher(pub);
  };

  const initialValue = book?.id
    ? {
        id: book.id,
        nome: book.nome,
        lancamento: book.lancamento,
        autor: book.autor,
        quantidade: book.quantidade,
        editora_id: book.editora.id,
        editora: book.editora,
        totalalugado: book.totalalugado,
      }
    : {
        id: 0,
        nome: "",
        lancamento: "",
        autor: "",
        quantidade: 1,
        editora_id: 0,
        editora: publishers[0],
        totalalugado: 0,
      };

  const handleSubmit = (values: initialProps) => {
    const release = dayjs(values.lancamento).get("year");
    const bookFinish = {
      id: values.id,
      nome: values.nome,
      lancamento: release,
      autor: values.autor,
      quantidade: values.quantidade,
      editora: publisher,
      totalalugado: values.totalalugado,
    };

    console.log(bookFinish);
    if (book?.id !== undefined) {
      editBook(bookFinish as Book);
      onFinish();
    } else {
      addBook(bookFinish as Book, onFinish);
      console.log(values.lancamento);
    }
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    onSubmit: (values, { setSubmitting }: FormikHelpers<initialProps>) => {
      handleSubmit(values);
      setSubmitting(false);
    },
  });
  return (
    <div className={styles.formContainer}>
      {/* <form onSubmit={formik.handleSubmit}>
        <TextField
          id="name"
          variant="filled"
          fullWidth
          required
          name="nome"
          label="Name"
          value={formik.values.nome}
          onChange={formik.handleChange}
          error={formik.touched.nome && Boolean(formik.errors.nome)}
          helperText={formik.touched.nome && formik.errors.nome}
          sx={{ color: "red", background: "var(--blue-g100)" }}
        />
        <TextField
          id="autor"
          variant="filled"
          required
          fullWidth
          name="autor"
          label="Autor"
          value={formik.values.autor}
          onChange={formik.handleChange}
          error={formik.touched.autor && Boolean(formik.errors.autor)}
          helperText={formik.touched.autor && formik.errors.autor}
        />
        <TextField
          id="release"
          type="date"
          variant="filled"
          required
          fullWidth
          name="release"
          label="Release year"
          value={formik.values.lancamento}
          onChange={formik.handleChange}
          error={formik.touched.lancamento && Boolean(formik.errors.lancamento)}
          helperText={formik.touched.lancamento && formik.errors.lancamento}
        />
        <TextField
          id="name"
          variant="filled"
          required
          fullWidth
          name="nome"
          label="Name"
          value={formik.values.nome}
          onChange={formik.handleChange}
          error={formik.touched.nome && Boolean(formik.errors.nome)}
          helperText={formik.touched.nome && formik.errors.nome}
        />
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </form> */}
      <Formik
        initialValues={initialValue}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }: FormikHelpers<initialProps>) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        <Form>
          <div className={styles["input-group"]}>
            <label htmlFor="nome">Name *:</label>

            <Field id="nome" name="nome" type="text" />
            <ErrorMessage
              component="span"
              className={styles.errorMessage}
              name="nome"
            />
          </div>
          <div className={styles["input-group-two"]}>
            <div>
              <label htmlFor="autor">Author *:</label>
              <Field id="autor" name="autor" type="text" />
              <ErrorMessage
                component="span"
                className={styles.errorMessage}
                name="autor"
              />
            </div>
            <Select
              key={book?.id}
              book={book}
              publishers={publishers}
              pubChange={handlePublisherChange}
            />
            {/* <ErrorMessage
              component="span"
              className={styles.errorMessage}
              name="editora_id"
            /> */}
          </div>
          <div className={styles["input-group-two"]}>
            <div>
              <label htmlFor="lancamento">Release year *:</label>
              <Field
                id="lancamento"
                name="lancamento"
                type="date"
                max={today}
              />
              <ErrorMessage
                component="span"
                className={styles.errorMessage}
                name="lancamento"
              />
            </div>
            <div>
              <label htmlFor="quantidade">Amount *:</label>
              <Field id="quantidade" name="quantidade" type="number" />
              <ErrorMessage
                component="span"
                className={styles.errorMessage}
                name="quantidade"
              />
            </div>
          </div>
          <div className={styles["control-modalForm"]}>
            <Button
              variant="outlined"
              className={styles["btn-cancel"]}
              onClick={onFinish}
            >
              <TiCancel />
              Cancel
            </Button>
            <Button
              variant="outlined"
              className={styles["btn-save"]}
              type="submit"
            >
              <IoMdSave />
              Save
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
