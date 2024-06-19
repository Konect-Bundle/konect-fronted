import {SERVER_API_URL} from "../constants";
import {serialize} from "object-to-formdata";

export class KonectService {

    static async makeConnect(uuid: string, way: number = 1) {
        const
            res = await fetch(SERVER_API_URL + "/add-konect", {
                method: "POST",
                body: serialize({"uuid": uuid, "way": way}),
                cache: 'force-cache'


            })

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error(
                'Failed to fetch data'
            )
        }

        return res.json()
    }

    static async makeFeed(uuid: string, name: string, firstname: string, email: string, phone: string) {
        const
            res = await fetch(SERVER_API_URL + "/add-feed/" + uuid, {
                method: "POST",
                body: serialize({"name": name, "firstname": firstname, "email": email, "phone": phone}),
                cache: 'force-cache'
            })

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error(
                'Failed to fetch data'
            )
        }

        return res.json()
    }
}

