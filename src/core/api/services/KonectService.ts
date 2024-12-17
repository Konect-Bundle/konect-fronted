import { SERVER_API_URL } from "../constants";
import { serialize } from "object-to-formdata";
import { fetchData } from "@/core/api/functions";
import { AppSPAService } from "@/core/api/services/AppSPAService";

export class KonectService {
    static async makeConnect(uuid: string, way: number = 1) {
        // return await  fetchData("/sanctum/csrf-cookie")
        return await fetchData(
            "/api/add-konect",
            serialize({ uuid: uuid, way: way }),
            {},
            "POST",
        );
    }

    static async getConnect(uuid: string) {
        // return await  fetchData("/sanctum/csrf-cookie")
        return await fetchData("/api/contact_feed/" + uuid);
    }

    static async makeFeed(
        uuid: string,
        name: string,
        firstname: string,
        email: string,
        phone: string,
    ) {
        return await fetchData(
            "/api/contact_feed/",
            serialize({
                name: name,
                firstname: firstname,
                email: email,
                phone: phone,
                user_to: uuid,
            }),
            {},
            "POST",
        );
    }
}
