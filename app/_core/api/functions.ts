import { axiosClient } from "@/app/_core/api/axios";
import { AxiosRequestConfig } from "axios";
import { AppSPAService } from "@/app/_core/api/services/AppSPAService";

export async function fetchData(
    route: string,
    body: any | FormData = {},
    config: AxiosRequestConfig = {},
    method: string = "GET",
    bearer: string = "",
    withFile: boolean = false,
): Promise<any> {
    try {
        config = {
            ...config,
            headers: {
                "Content-Type":
                    withFile == false
                        ? "application/json"
                        : "multipart/form-data",
                Authorization: `Bearer ${bearer}`,
            },
        };

        // console.log(config, "SIOUU", method);

        var response;
        if (method === "POST") {
            response = await axiosClient.post(route, body, config);
        } else if (method === "PATCH") {
            response = await axiosClient.patch(route, body, config);
        } else if (method === "PUT") {
            response = await axiosClient.put(route, body, config);
        } else {
            response = await axiosClient.get(route, config);
        }

        if (response.status.toString().startsWith("4")) {
            if (response.status == 419) {
                await AppSPAService.login();
            }
            return await response.data;
        } else if (response.status.toString().startsWith("2")) {
            return await response.data;
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        // Gestion des exceptions et erreurs réseau
        console.error("Fetch error:", error);
        throw error;
    }
}
