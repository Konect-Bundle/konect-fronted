import {SERVER_API_URL} from "../constants";
import {serialize} from "object-to-formdata";
import {User} from "@/app/_core/models/User";
import {fetchData} from "@/app/_core/api/functions";

export class UserService {

    static buildObjectParser(data: any) {
        var user: User = new User();
        user.name = data.data.name;
        user.firstname = data.data.firstname;
        user.email = data.data.email;


        return user;
    }

    static async getUser(uuid: string) {
        return await fetchData("/api/user/uuid/" + uuid);
    }

    static async login(email: string, password: string) {
        return await fetchData("/api/auth/login", serialize({"email": email, "password": password}), {}, "POST");
    }

    static async getLoggedUser(token: string) {
        return await fetchData("/api/auth/user", "", {}, "GET", token);
    }
}

