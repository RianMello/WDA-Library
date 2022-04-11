import { Input } from "./Input";
import * as Yup from "yup";
import { Formik, Form } from "formik";
interface FormProps {
  idForm: string;
}

export const FormComponent = ({ idForm }: FormProps) => {
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
    }),
    editora_id: Yup.number().required("Voê deve informar a editora do livro"),
    totalalugado: Yup.number(),
  });
  return (
    <>
      {/* <Formik >
          <Form></Form>
      </Formik> */}
    </>
  );
};
