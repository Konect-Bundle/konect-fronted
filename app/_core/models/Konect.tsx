import { User } from "./User";

export class Konect {
    ko_ip_konect: string;
    ko_ip_locations: string;
    ko_social_clicked: string;
    ko_phone_clicked: string;
    user_id: number;
    konect_category_id: number;

    constructor(
        ko_ip_konect: string,
        ko_ip_locations: string,
        ko_social_clicked: string,
        ko_phone_clicked: string,
        user_id: number,
        konect_category_id: number,
    ) {
        this.ko_ip_konect = ko_ip_konect;
        this.ko_ip_locations = ko_ip_locations;
        this.ko_social_clicked = ko_social_clicked;
        this.ko_phone_clicked = ko_phone_clicked;
        this.user_id = user_id;
        this.konect_category_id = konect_category_id;
    }

    owner(): User | null {
        // Implémentez cette méthode selon vos besoins
        return null;
    }
}
