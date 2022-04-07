import axios from "axios";

const api = axios.create({
    baseURL: '//livraria--back.herokuapp.com/'
})

export default api