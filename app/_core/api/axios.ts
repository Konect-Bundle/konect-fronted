// tools/ api.js
import axios from "axios";
import { SERVER_URL } from "@/app/_core/api/constants";

export const axiosClient = axios.create({
    baseURL: SERVER_URL,
    timeout: 5000, // Timeout if necessary
    headers: {
        // 'ContentType': 'application/json',
        //   "Content-Type": "multipart/form-data"
        // Add all custom headers here
    },
});

axiosClient.defaults.withCredentials = true;
axiosClient.defaults.withXSRFToken = true;
