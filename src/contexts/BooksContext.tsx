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

  return (
    <BooksContext.Provider value={{ books, load }}>
      {children}
    </BooksContext.Provider>
  );
}
