import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', //Cấu hình base URL của server api =))
    timeout: 10000,                   //Cấu hình thời gian chờ request (milisecon)
    headers: {

    }
});

export default axiosInstance;