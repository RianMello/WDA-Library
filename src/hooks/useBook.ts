import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export function useBook() {
    const context = useContext(BooksContext)
    const { load, books, addBook, editBook } = context;
    return { load, books, addBook, editBook }
}