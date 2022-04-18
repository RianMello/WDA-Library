import { Button, TextField } from "@mui/material";
import styles from "../styles.module.scss";

import { useFormik } from "formik";
import * as Yup from "yup";

import { usePublisher } from "../../../hooks/usePublisher";
import { Publisher } from "../../../interfaces/ResponseAPI";
import { TiCancel } from "react-icons/ti";
import { IoMdSave } from "react-icons/io";

interface PublisherFormProps {
  onFinish: (success: boolean) => void;
  publisher?: Publisher;
}

interface initialProps {
  id: number;
  cidade: string;
  nome: string;
}

export function FormPublisher({ publisher, onFinish }: PublisherFormProps) {
  const { addPublisher, editPublisher } = usePublisher();

  const schema = Yup.object().shape({
    id: Yup.number(),
    nome: Yup.string().required("You must provide the name of the publisher"),
    cidade: Yup.string().required("You must inform the publisher's home city"),
  });

  const initialValue: initialProps = {
    id: publisher?.id || 0,
    nome: publisher?.nome || "",
    cidade: publisher?.cidade || "",
  };

  const handleSubmit = (values: initialProps) => {
    if (publisher?.id !== undefined) {
      editPublisher(values as Publisher, onFinish);
    } else {
      addPublisher(values as Publisher, onFinish);
    }
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainerStyle}>
      <div className={styles["input-group"]}>
        <TextField
          onChange={formik.handleChange}
          error={formik.touched.nome && Boolean(formik.errors.nome)}
          className={styles.inputStyle}
          id="standard-error-helper-text"
          defaultValue={formik.values.nome}
          label="Name :"
          helperText="Required Field."
          variant="standard"
          sx={{ marginBottom: "2rem" }}
        />
        <TextField
          onChange={formik.handleChange}
          error={formik.touched.cidade && Boolean(formik.errors.cidade)}
          className={styles.inputStyle}
          id="standard-error-helper-text"
          defaultValue={formik.values.cidade}
          label="City :"
          helperText="Required Field."
          variant="standard"
        />
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
