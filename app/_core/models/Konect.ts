import { KoUserInfoInterface } from "../interfaces/appInterfaces";
import { LocationVcardInterface } from "../interfaces/vcardInterfaces";
import { User } from "./User";

export class Konect {
    ko_ip_konect: string;
    ko_user_info: KoUserInfoInterface;
    ko_ip_locations: LocationVcardInterface;
    ko_social_clicked: string;
    ko_phone_clicked: string;
    user_id: number;
    konect_category_id: number;
    created_at: string;

    constructor(
        ko_ip_konect: string,
        ko_ip_locations: LocationVcardInterface,
        ko_social_clicked: string,
        ko_phone_clicked: string,
        user_id: number,
        konect_category_id: number,
        created_at: string,
        ko_user_info: KoUserInfoInterface,
    ) {
        this.ko_ip_konect = ko_ip_konect;
        this.ko_ip_locations = ko_ip_locations;
        this.ko_social_clicked = ko_social_clicked;
        this.ko_phone_clicked = ko_phone_clicked;
        this.user_id = user_id;
        this.konect_category_id = konect_category_id;
        this.created_at = created_at;
        this.ko_user_info = ko_user_info;
    }
}
