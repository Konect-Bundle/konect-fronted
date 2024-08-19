import { Konect } from "./Konect";

export class User {
    name?: string;
    konect_count?: number;
    konects?: Array<Konect>;
    firstname?: string;
    email?: string;
    vinfo?: string;
    vconfig?: string;
    uuid?: string;
    profile_photo_url?: string;

    constructor(
        name?: string,
        firstname?: string,
        email?: string,
        vinfo?: string,
        vconfig?: string,
        konects?: Array<Konect>,
        profile_photo_url?: string,
        uuid?: string,
    ) {
        this.name = name;
        this.firstname = firstname;
        this.email = email;
        this.vinfo = vinfo;
        this.vconfig = vconfig;
        this.konects = konects;
        this.uuid = uuid;
        this.profile_photo_url = profile_photo_url;
    }
}
