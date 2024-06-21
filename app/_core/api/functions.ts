import {axiosClient} from "@/app/_core/api/axios";
import {AxiosRequestConfig} from "axios";

export async function fetchData(route: string, body: any = {}, config: AxiosRequestConfig={}, method: string = "GET"): Promise<any> {
    try {
        config = {
            ...config,
            headers: {
                "Content-Type": "application/json"
            }
        }
        // console.log(body)

        var response;
        if (method === "POST") {
            response = await axiosClient.post(route, body, config)
        } else {
            response = await axiosClient.get(route, config)
        }
        if (response.status.toString().startsWith('4')) {
            return await response.data;
        } else if (response.status.toString().startsWith('2')) {
            return await response.data;
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        // Gestion des exceptions et erreurs réseau
        console.error('Fetch error:', error);
        throw error;
    }
}