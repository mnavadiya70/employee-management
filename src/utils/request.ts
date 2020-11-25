import axios from 'axios';

const service = axios.create({
    baseURL: 'https://employee-management-8ebb3.firebaseio.com/',
    timeout: 5000
});

service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        alert(error);
        // Log somewhere
        console.error(error);
        switch (error.response.status) {
            // Authorization Failed Response can add other status codes here to manage error Logging
            case 403:
                break;
            default:
                break;
        }
        return Promise.reject(error);
    })

export default service;