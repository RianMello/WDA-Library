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
  mostRented: Book[];
  available: Book[];
  getBooks: () => void;
  addBook: (book: Book, onFinish: (success: boolean) => void) => void;
  editBook: (book: Book, onFinish: (success: boolean) => void) => void;
  deleteBook: (book: Book, onFinish: (sucess: boolean) => void) => void;
}

export const BooksContext = createContext<BookContextProps>(
  {} as BookContextProps
);

export function BooksProvider({ children }: BookProviderProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [mostRented, setMostRented] = useState<Book[]>([]);
  const [available, setAvailable] = useState<Book[]>([]);
  const [load, setLoad] = useState(true);

  const { t } = useTranslation("common");

  useEffect(() => {
    getBooks();
    getMostRented();
    getAvailable();
  }, []);

  function getBooks() {
    api
      .get("/api/livros")
      .then((res) => {
        setLoad(false);
        setBooks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function getMostRented() {
    api
      .get("/api/maisalugados")
      .then((res) => {
        setLoad(false);
        setMostRented(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function getAvailable() {
    api
      .get("/api/disponiveis")
      .then((res) => {
        setLoad(false);
        setAvailable(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  function addBook(book: Book, onFinish: (success: boolean) => void) {
    api
      .post("/api/livro", book)
      .then(() => {
        onFinish(true);
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 400") {
          alert("Book already registered! Check the data and try again");
        }
        onFinish(false);
      });
  }

  function editBook(book: Book, onFinish: (success: boolean) => void) {
    api
      .put("/api/livro", book)
      .then(() => {
        onFinish(true);
        console.log("Book updated");
      })
      .catch((err) => {
        console.log(err);
        onFinish(false);
      });
  }

  function deleteBook(book: Book, onFinish: (success: boolean) => void) {
    api
      .delete("/api/livro", { data: book } as AxiosRequestConfig)
      .then(() => {
        onFinish(true);
        console.log("Book deleted");
      })
      .catch((err) => {
        onFinish(false);
        console.log(err);
      });
  }
  return (
    <BooksContext.Provider
      value={{
        books,
        load,
        addBook,
        editBook,
        deleteBook,
        getBooks,
        mostRented,
        available,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
