import { SERVER_API_URL } from "../constants";
import { serialize } from "object-to-formdata";
import { User } from "@/app/_core/models/User";
import { fetchData } from "@/app/_core/api/functions";
import { Konect } from "../../models/Konect";
import { Order, PayloadOrderInterface } from "../../models/Order";

import { KoGadgetItem, CardCustomDetails } from "../../models/KoGadgetItem";
import { ScoreType } from "../../utils/enums";
import { formatNumber } from "../../utils/functions";
import { json } from "stream/consumers";
import { KoUserInfoInterface } from "../../interfaces/appInterfaces";
import { date } from "yup";

export class UserService {
    static buildObjectParser(data: any) {
        var user: User = new User();
        var konects: Konect[] = [];
        var orders: Order[] = [];
        var gadgets: KoGadgetItem[] = [];

        var base = data.data ? data.data : data;

        // console.log(data.data);
        if (base.konects) {
            base.konects.forEach((konect: any) => {
                konects.push(
                    new Konect(
                        konect.ko_ip_konect,
                        JSON.parse(konect.ko_ip_locations),
                        konect.ko_social_clicked,
                        konect.ko_phone_clicked,
                        konect.user_id,
                        konect.konect_category_id,
                        konect.created_at,
                        JSON.parse(konect.ko_user_info) as KoUserInfoInterface,
                    ),
                );
            });
        }

        // console.log(data.data);
        if (base.gadgets) {
            base.gadgets.forEach((gadget: any) => {
                const order = gadget.order;
                const ga = gadget.gadget;
                const customs: CardCustomDetails = {
                    name: JSON.parse(gadget.custom_details).name,
                    title: JSON.parse(gadget.custom_details).title,
                    firstname: JSON.parse(gadget.custom_details).firstname,
                    quantity: JSON.parse(gadget.custom_details).quantity,
                    file: JSON.parse(gadget.custom_details).file,
                };

                orders.push(
                    new Order(
                        order.id,
                        order.created_at,
                        order.paymentMethod,
                        JSON.parse(order.payload) as PayloadOrderInterface,
                        !order.is_active,
                    ),
                );

                gadgets.push(
                    new KoGadgetItem(
                        JSON.parse(ga.kg_details).name,
                        ga.kg_code,
                        JSON.parse(ga.kg_details).description,
                        JSON.parse(ga.kg_details).price,
                        JSON.parse(ga.kg_details).weightDimensions,
                        JSON.parse(ga.kg_details).color,
                        JSON.parse(ga.kg_details).material,
                        JSON.parse(ga.kg_details).type,
                        JSON.parse(ga.kg_details).imageURL,
                        customs,
                    ),
                );
            });
        }

        //  console.log(base.companies)
        user.uuid = base.uuid;
        user.name = base.name;
        user.firstname = base.firstname;
        user.email = base.email;
        user.vinfo = base.vinfo;
        user.vconfig = base.vconfig;
        user.profile_photo_url = base.profile_photo_path;
        user.konects_count = base.konects_count;
        user.konects = konects;
        user.orders = orders;
        user.gadgets = gadgets;
        user.points = formatNumber(base.kpoint);
        user.referal_code = base.referal_code;
        return user;
    }

    static async getUser(uuid: string) {
        return await fetchData("/api/user/uuid/" + uuid);
    }

    static async getGadget(uuid: string) {
        return await fetchData("/api/kogadget/" + uuid);
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
        referal_code: string | null,
    ) {
        return await fetchData(
            "/api/auth/register",
            serialize({
                name: name,
                firstname: firstname,
                email: email,
                password: password,
                referal_from: referal_code,
            }),
            {},
            "POST",
        );
    }

    static async resetPassword(
        email: string,
        password: string,
        co_password: string,
        token: string | null,
    ) {
        return await fetchData(
            "/api/auth/password-reset",
            serialize({
                email: email,
                password: password,
                password_confirmation: co_password,
                token: token,
            }),
            {},
            "POST",
        );
    }
    static async sendResetEmailLink(email: string) {
        return await fetchData(
            "/api/auth/password-email",
            serialize({
                email: email,
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

    static async logout(token: string) {
        return await fetchData("/api/auth/logout", "", {}, "GET", token);
    }

    static async searchUser(search: string) {
        return await fetchData("/api/search-user?search=" + search);
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
    static async updateAccount(
        name: string,
        firstname: string,
        email: string,
        newPassword: string,
        oldPassword: string,
        img: Blob | null,
        token: string,
    ) {
        const dt = new FormData();
        dt.append("name", name);
        dt.append("firstname", firstname);
        dt.append("email", email);
        dt.append("password", newPassword);
        dt.append("oldPassword", oldPassword);
        if (img) {
            dt.append("img", img);
        }

        return await fetchData("/api/user", dt, {}, "PUT", token);
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

    static async addScore(score: ScoreType, token: string) {
        return await fetchData(
            "/api/user/score/" + score,
            {},
            {},
            "POST",
            token,
            true,
        );
    }

    static async getOrders(token: string) {
        return await fetchData("/api/gadget", null, {}, "GET", token);
    }
}
