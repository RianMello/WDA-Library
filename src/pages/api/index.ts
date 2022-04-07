import api from '../../services/api'

export default function DataBase() {
    const books = api.get('/api/livros')

    return books
}