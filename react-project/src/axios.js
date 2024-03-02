import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://172.20.10.11:8000'
})

export default instance;