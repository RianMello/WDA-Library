export interface AxiosRequestConfig {
    data: Book;
}

export interface Rental {
    data_aluguel: string;
    data_devolucao: string;
    data_previsao: string;
    id: number;
    livro_id: Book;
    usuario_id: User;
}

export interface User {
    cidade: string;
    email: string;
    endereco: string;
    id: number;
    nome: string;
}

export interface Book {
    autor: string;
    editora: Publisher;
    id: number;
    lancamento: number;
    nome: string;
    quantidade: number;
    totalalugado: number;
}

export interface Publisher {
    nome: string;
    id: number;
    cidade: string;
}