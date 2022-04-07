import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export function useBook() {
    const context = useContext(BooksContext)
    const { load, books, TableRows, handleSortedList } = context;
    return { load, books, TableRows, handleSortedList }
}