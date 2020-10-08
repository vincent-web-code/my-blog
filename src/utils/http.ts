import axios from 'axios';

const http: any = axios.create({
    baseURL: 'http://localhost:3000/web/api'
})

http.interceptors.response.use((res: any) => {
    if (res.data) {
        return res.data;
    } else {
        return Promise.reject(res)
    }
}, (err: any) => {
    return Promise.reject(err)
})

export default http;