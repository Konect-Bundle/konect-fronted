import { SERVER_API_URL } from "../constants";
import { serialize } from "object-to-formdata";
import { User } from "@/app/_core/models/User";
import { fetchData } from "@/app/_core/api/functions";
import { cookies } from "next/headers";
import { Konect } from "../../models/Konect";

export class UserService {
    static buildObjectParser(data: any) {
        var user: User = new User();
        var konects: Konect[] = [];
        // console.log(data.data);
        if (data.data.konects) {
            data.data.konects.forEach((konect: any) => {
                konects.push(
                    new Konect(
                        konect.ko_ip_konect,
                        JSON.parse(konect.ko_ip_locations),
                        konect.ko_social_clicked,
                        konect.ko_phone_clicked,
                        konect.user_id,
                        konect.konect_category_id,
                    ),
                );
            });
        }

        user.uuid = data.data.uuid;
        user.name = data.data.name;
        user.firstname = data.data.firstname;
        user.email = data.data.email;
        user.vinfo = data.data.vinfo;
        user.vconfig = data.data.vconfig;
        user.profile_photo_url = data.data.profile_photo_path;
        user.konect_count = data.data.konect_count;
        user.konects = konects;
        return user;
    }

    static async getUser(uuid: string) {
        return await fetchData("/api/user/uuid/" + uuid);
    }

    static async login(email: string, password: string) {
        return await fetchData(
            "/api/auth/login",
            serialize({ email: email, password: password }),
            {},
            "POST",
        );
    }

    static async register(
        name: string,
        firstname: string,
        email: string,
        password: string,
    ) {
        return await fetchData(
            "/api/auth/register",
            serialize({
                name: name,
                firstname: firstname,
                email: email,
                password: password,
            }),
            {},
            "POST",
        );
    }

    static async sendEmail(
        name: string,
        firstname: string,
        email: string,
        content: string,
    ) {
        return await fetchData(
            "/api/app/contact",
            serialize({
                name: name,
                firstname: firstname,
                email: email,
                content: content,
            }),
            {},
            "POST",
        );
    }
    static async getLoggedUser(token: string) {
        return await fetchData("/api/auth/user", "", {}, "GET", token);
    }

    static async updatePassword(
        newPassword: string,
        oldPassword: string,
        token: string,
    ) {
        return await fetchData(
            "/api/user/custom-update",
            serialize({
                passwords: {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                },
            }),
            {},
            "POST",
            token,
        );
    }
    static async updateVcard(data: FormData, token: string) {
        return await fetchData(
            "/api/user/update-vcard",
            data,
            {},
            "POST",
            token,
            true,
        );
    }
}
