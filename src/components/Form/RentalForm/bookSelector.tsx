import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Book, Rental } from "../../../interfaces/ResponseAPI";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText, InputLabel } from "@mui/material";

import styles from "../styles.module.scss";

interface SelectProps {
  books: Book[];
  bookChange: (book: Book) => void;
}

export function SelectBook({ books, bookChange }: SelectProps) {
  const [book, setBook] = useState(books[0]);
  const { t } = useTranslation();

  console.log(books);

  return (
    <>
      {/* <InputLabel id="demo-simple-select-label">Book</InputLabel> */}
      <Select
        id="book_id"
        label="Book"
        value={book.id.toString() || ""}
        variant="filled"
        onChange={(event: SelectChangeEvent) => {
          books.map((book) => {
            if (book.id === Number(event.target.value)) {
              setBook(book);
              bookChange(book);
            }
          });
        }}
      >
        <MenuItem>Select which book you want to rent</MenuItem>
        {books.map((book) => {
          return (
            <MenuItem key={book.id} value={book.id}>
              {book.nome}
            </MenuItem>
          );
        })}
      </Select>
      {}
      <ErrorMessage name="livro_id" />
    </>
    // <SelectContainer>

    //   <label htmlFor="book_id">Book :</label>
    //   <Field
    //     as="select"
    //     id="book_id"
    //     name={book.id}
    //     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //       books.map((book) => {
    //         if (book.id === Number(e.target.value)) {
    //           setBook(book);
    //           bookChange(book);
    //         }
    //       });
    //     }}
    //   >
    //     <option></option>
    //     {books.map((b) => {
    //       if (rent?.id && rent?.livro_id.id === b.id) {
    //         return (
    //           <option selected key={b.id} value={b.id}>
    //             {b.nome}
    //           </option>
    //         );
    //       }
    //       return (
    //         <option key={b.id} value={b.id}>
    //           {b.nome}
    //         </option>
    //       );
    //     })}
    //   </Field>
    //   <ErrorMessage name="livro_id" />
    // </SelectContainer>
  );
}
