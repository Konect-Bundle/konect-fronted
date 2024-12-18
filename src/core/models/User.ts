import { formatNumber } from "../utils/functions";
import Company from "./Company";
import { ContactFeed } from "./ContactFeed";
import { KoGadgetItem } from "./KoGadgetItem";
import { Konect } from "./Konect";
import { Order } from "./Order";

export class User {
    name?: string;
    konects_count?: number;
    konects?: Array<Konect>;
    contact_feeds?: Array<ContactFeed>;
    orders?: Array<Order>;
    gadgets?: Array<KoGadgetItem>;
    firstname?: string;
    email?: string;
    vinfo?: string;
    vconfig?: string;
    uuid?: string;
    profile_photo_url?: string;
    points: string;
    referal_code?: string;
    companies?: Array<Company>;

    constructor(
        name?: string,
        firstname?: string,
        email?: string,
        vinfo?: string,
        vconfig?: string,
        konects?: Array<Konect>,
        contact_feeds?: Array<ContactFeed>,
        orders?: Array<Order>,
        gadgets?: Array<KoGadgetItem>,
        profile_photo_url?: string,
        uuid?: string,
        referal_code?: string,
        points: number = 0,
    ) {
        this.name = name;
        this.firstname = firstname;
        this.email = email;
        this.vinfo = vinfo;
        this.vconfig = vconfig;
        this.konects = konects;
        this.orders = orders;
        this.gadgets = gadgets;
        this.uuid = uuid;
        this.points = formatNumber(points);
        this.profile_photo_url = profile_photo_url;
        this.referal_code = referal_code;
        this.contact_feeds = contact_feeds;
    }
}
