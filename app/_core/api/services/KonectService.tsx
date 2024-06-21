import {SERVER_API_URL} from "../constants";
import {serialize} from "object-to-formdata";
import {fetchData} from "@/app/_core/api/functions";
import {AppSPAService} from "@/app/_core/api/services/AppSPAService";

export class KonectService {

    static async makeConnect(uuid: string, way: number = 1) {
        // return await  fetchData("/sanctum/csrf-cookie")
        return await fetchData("/api/add-konect", serialize({"uuid": uuid, "way": way}), {}, "POST")
    }

    static async makeFeed(uuid: string, name: string, firstname: string, email: string, phone: string) {

        return await fetchData("/api/add-feed/" + uuid, serialize({
            "name": name,
            "firstname": firstname,
            "email": email,
            "phone": phone
        }), {}, "POST")

    }
}

