import {SERVER_API_URL} from "../constants";
import {serialize} from "object-to-formdata";
import {User} from "@/app/_core/models/User";
import {fetchData} from "@/app/_core/api/functions";

export class UserService {

    buildObjectParser(data: string){
        var jsonRes : Object = JSON.parse(data);

        return new User()
    }
    static async getUser(uuid: string) {
        return await fetchData("/api/user/uuid/" + uuid);
    }

    static async login(email: string, password: string) {
        return await fetchData("/api/auth/login", serialize({"email": email, "password": password}), {}, "POST");
    }

    static async getLoggedUser() {
        return await fetchData("/api/auth/user");
    }
}

