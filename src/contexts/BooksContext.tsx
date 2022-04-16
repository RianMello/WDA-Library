import { AxiosRequestConfig } from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Book } from "../interfaces/ResponseAPI";

import api from "../services/api";

interface BookProviderProps {
  children: ReactNode;
}

interface BookContextProps {
  load: boolean;
  books: Book[];
  addBook: (book: Book, onFinish: () => void) => void;
  editBook: (book: Book) => void;
  deleteBook: (book: Book, onFinish: () => void) => void;
}

export const BooksContext = createContext<BookContextProps>(
  {} as BookContextProps
);

export function BooksProvider({ children }: BookProviderProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [load, setLoad] = useState(true);

  const { t } = useTranslation("common");

  useEffect(() => {
    api
      .get("/api/livros")
      .then((res) => {
        setLoad(false);
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function addBook(book: Book, onFinish: () => void) {
    api
      .post("/api/livro", book)
      .then(() => {
        onFinish();
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 400") {
          alert("Book already registered! Check the data and try again");
        }
      });
  }

  function editBook(book: Book) {
    api.put("/api/livro", book).then(() => console.log("Book updated"));
  }

  function deleteBook(book: Book, onFinish: () => void) {
    api
      .delete("/api/livro", { data: book } as AxiosRequestConfig)
      .then(() => console.log("Book deleted"));
  }
  return (
    <BooksContext.Provider
      value={{ books, load, addBook, editBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}
