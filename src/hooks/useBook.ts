import { useContext } from "react";
import { BooksContext } from "../contexts/BooksContext";

export function useBook() {
    const context = useContext(BooksContext)
    const { load, books } = context;
    return { load, books }
}