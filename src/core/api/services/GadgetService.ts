import { SERVER_API_URL } from "../constants";
import { serialize } from "object-to-formdata";
import { fetchData } from "@/core/api/functions";

export class GadgetService {
    static async getAll(filter = "all") {
        return await fetch(SERVER_API_URL + "/gadgets", {
            // cache: "force-cache",
            next: { revalidate: 60 },
        });
    }

    static async getKwidget(code: string) {
        const res = await fetch(SERVER_API_URL + "/gadget/" + code, {
            cache: "force-cache",
        });

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error("Failed to fetch data");
        }

        return res.json();
    }
}

//AXIOS OLD
// try {
//   cache( async() => {
//     const response = await axiosInstance.get(SERVER_API_URL + "/user/" + uuid);
//     return response.data;
//   });
// } catch (error) {
//   console.error('Error retrieving data:', error);
//   throw new Error('Could not get data');
// }
