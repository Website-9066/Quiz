import axios from "axios";

const instance = axios.create({
    baseURL: "https://opentdb.com/",
});

instance.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default instance;
