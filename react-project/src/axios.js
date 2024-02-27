import axios from 'axios';

const instance = axios.create({
    baseURL : 'http://211.228.36.207:8000'
})

export default instance;