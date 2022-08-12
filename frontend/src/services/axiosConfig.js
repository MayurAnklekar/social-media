import axios from "axios";
import SERVER_URI from "../serverUri";


const axiosConfig = axios.create({
    baseUrl: `${SERVER_URI}/api`
});

export default axiosConfig;