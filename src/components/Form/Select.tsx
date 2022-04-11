import dayjs from "dayjs";
import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { Book, Publisher } from "../../interfaces/ResponseAPI";
// import { SelectContainer } from "./style";
import styles from "./styles.module.scss";

interface SelectProps {
  book?: Book;
  publishers: Publisher[];
  pubChange: (pub: Publisher) => void;
}

export function Select({ book, publishers, pubChange }: SelectProps) {
  const [publisher, setPublisher] = useState(publishers[0]);

  return (
    <div className={styles.selectContainer}>
      <label htmlFor="editora_id">Publisher Company *:</label>
      <Field
        as="select"
        id="editora_id"
        name={publisher.id || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          publishers.map((pub) => {
            if (pub.id === Number(e.target.value)) {
              setPublisher(pub);
              pubChange(pub);
            }
          });
        }}
      >
        <option value="" className="placeholder-select"></option>
        {publishers.map((pub) => {
          if (book?.id && book?.editora.id === pub.id) {
            return (
              <option selected key={pub.id} value={pub.id}>
                {pub.nome}
              </option>
            );
          }
          return (
            <option key={pub.id} value={pub.id}>
              {pub.nome}
            </option>
          );
        })}
      </Field>
      <ErrorMessage
        component="span"
        className={styles.errorMessage}
        name="editora_id"
      />
    </div>
  );
}
