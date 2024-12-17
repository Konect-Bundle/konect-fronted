import { KoUserInfoInterface } from "../interfaces/appInterfaces";

export class ContactFeed {
    id: string;
    feed_info: KoUserInfoInterface;
    user_id: string;
    created_at: Date;

    constructor(
        id: string,
        user_id: string,
        created_at: string,
        feed_info: KoUserInfoInterface,
    ) {
        this.id = id;
        this.user_id = user_id;
        this.created_at = new Date(created_at);
        this.feed_info = feed_info;
    }
}
