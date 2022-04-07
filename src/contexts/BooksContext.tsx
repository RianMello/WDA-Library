import { createContext, useState, ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Book } from "../interfaces/ResponseAPI";
import { TbHeader, TableRows } from "../interfaces/toUse";

import api from "../services/api";

interface BookProviderProps {
  children: ReactNode;
}

interface BookContextProps {
  load: boolean;
  books: Book[];
  TableRows: TableRows[];
  handleSortedList: (orderBy: string) => Book[];
}

export const BooksContext = createContext<BookContextProps>(
  {} as BookContextProps
);

export function BooksProvider({ children }: BookProviderProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortedList, setSortedList] = useState<Book[]>([]);
  const [load, setLoad] = useState(true);

  const [asc, SetAsc] = useState(false);

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

  const handleSortedList = (orderBy: string) => {
    var sorted = books;

    return sorted;
  };

  const TableRows = books.map((book) => {
    let tdRows = [
      book.id,
      book.nome,
      book.autor,
      book.editora.nome,
      book.lancamento,
      book.quantidade,
      book.totalalugado,
    ];
    return {
      trId: book.id,
      trContent: tdRows,
    };
  });

  return (
    <BooksContext.Provider value={{ books, load, TableRows, handleSortedList }}>
      {children}
    </BooksContext.Provider>
  );
}
