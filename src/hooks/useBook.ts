import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export function useBook() {
    const context = useContext(BooksContext)
    const { load, books, addBook, editBook, deleteBook, getBooks, mostRented } = context;
    return { load, books, addBook, editBook, deleteBook, getBooks, mostRented }
}