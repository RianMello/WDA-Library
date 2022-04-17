import { Button, Input, TextField } from "@mui/material";
import { FormikHelpers, useFormik, Field } from "formik";
import { IoMdSave } from "react-icons/io";
import { TiCancel } from "react-icons/ti";
import * as Yup from "yup";
import { useUser } from "../../../hooks/useUser";
import { User } from "../../../interfaces/ResponseAPI";

import styles from "../styles.module.scss";

interface FormUserProps {
  user: User;
  onFinish: (success: boolean) => void;
}

interface initialProps {
  cidade: string;
  email: string;
  endereco: string;
  id: number;
  nome: string;
}

export function FormUser({ user, onFinish }: FormUserProps) {
  const schema = Yup.object().shape({
    cidade: Yup.string().required("Você deve informar a cidade do usuário"),
    email: Yup.string().required("Você deve informar a email do usuário"),
    endereco: Yup.string().required("Você deve informar a endereço do usuário"),
    id: Yup.number(),
    nome: Yup.string().required("Você deve informar a nome do usuário"),
  });
  const { addUser, editUser } = useUser();

  const initialValue: initialProps = {
    cidade: user?.cidade || "",
    email: user?.email || "",
    endereco: user?.endereco || "",
    id: user?.id || 0,
    nome: user?.nome || "",
  };

  const handleSubmit = (values: initialProps) => {
    console.log(values);
    if (user?.id !== undefined) {
      editUser(values as User, onFinish);
    } else {
      addUser(values as User, onFinish);
    }
    formik.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={styles.formContainerStyle}
      id="UserForm"
    >
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
        />
      </div>
      <div className={styles["input-group"]}>
        <TextField
          className={styles.inputStyle}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          id="standard-error-helper-text"
          defaultValue={formik.values.email}
          label="Email :"
          helperText="Required Field."
          variant="standard"
        />
      </div>
      <div className={styles["input-group"]}>
        <TextField
          className={styles.inputStyle}
          onChange={formik.handleChange}
          error={formik.touched.endereco && Boolean(formik.errors.endereco)}
          id="standard-error-helper-text"
          label="Address :"
          defaultValue={formik.values.endereco}
          helperText="Required Field."
          variant="standard"
        />
      </div>
      <div className={styles["input-group"]}>
        <TextField
          className={styles.inputStyle}
          onChange={formik.handleChange}
          error={formik.touched.nome && Boolean(formik.errors.nome)}
          id="standard-error-helper-text"
          label="City :"
          defaultValue={formik.values.cidade}
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
