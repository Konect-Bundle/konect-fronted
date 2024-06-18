import {SERVER_API_URL} from "../constants";
import {serialize} from "object-to-formdata";
import {User} from "@/app/_core/models/User";

export class UserService {

    buildObjectParser(data: string){
        var jsonRes : Object = JSON.parse(data);

        return new User()
    }
    static async getUser(uuid: string) {
        const res = await fetch(SERVER_API_URL + "/user/" + uuid, {cache: 'force-cache'})

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        return res.json()

    }

    static async login(email: string, password: string) {
        const res = await fetch(SERVER_API_URL + "/auth/login", {
            method: "POST",
            credentials: "include",
            body: serialize({"email": email, "password": password}),
            cache: 'force-cache'
        })

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        return res.json()

    }

    static async getUserByToken(token: string) {
        const res = await fetch(SERVER_API_URL + "/auth/user", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                // Content-Type: 'application/json'
            },
            cache: 'force-cache'
        })

        if (!res.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }

        return res.json()

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