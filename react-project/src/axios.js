import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://192.168.70.155:8000'
})

export default instance;