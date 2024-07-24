import {
    EmailVcard,
    LocationVcard,
    NameVcard,
    NoteVcard,
    SocialVcardItem,
    SocialVcardItemAll,
    UrlVcard,
    VideoLinkVcard,
} from "./VcardParts";

export default abstract class VcardModel {
    public names: NameVcard;
    public email: EmailVcard;
    public socialProfils: SocialVcardItemAll;
    public urls: UrlVcard[] = [];
    public videoLinks: VideoLinkVcard[] = [];
    public note: NoteVcard;
    public location: LocationVcard;

    constructor(vinfo: string | null = null) {
        if (vinfo === null) {
            this.names = new NameVcard("", "", "", "", "");
            this.email = new EmailVcard("", "");
            this.location = new LocationVcard();
            this.socialProfils = new SocialVcardItemAll(
                new SocialVcardItem(""),
                new SocialVcardItem(""),
                new SocialVcardItem(""),
                new SocialVcardItem(""),
                new SocialVcardItem(""),
                new SocialVcardItem(""),
            );
            this.note = new NoteVcard("");
        } else {
            const vinfoObj = JSON.parse((typeof vinfo) == "string" ? vinfo :JSON.stringify(vinfo));
            this.names = new NameVcard(
                vinfoObj.names.givenName,
                vinfoObj.names.familyName,
                vinfoObj.names.middleName,
                vinfoObj.names.prefix,
                vinfoObj.names.suffix,
            );
            this.email = new EmailVcard(
                vinfoObj.email.type,
                vinfoObj.email.text,
            );
            this.socialProfils = new SocialVcardItemAll(
                new SocialVcardItem(
                    vinfoObj.socialProfils.facebook.uri,
                    "facebook",
                ),
                new SocialVcardItem(
                    vinfoObj.socialProfils.instagram.uri,
                    "instagram",
                ),
                new SocialVcardItem(
                    vinfoObj.socialProfils.twitter.uri,
                    "twitter",
                ),
                new SocialVcardItem(
                    vinfoObj.socialProfils.youtube.uri,
                    "youtube",
                ),
                new SocialVcardItem(
                    vinfoObj.socialProfils.tiktok.uri,
                    "tiktok",
                ),
                new SocialVcardItem(
                    vinfoObj.socialProfils.linkedin.uri,
                    "linkedin",
                ),
            );
            this.note = new NoteVcard(vinfoObj.note.text);

            this.urls = vinfoObj.urls.map(
                (url: any) => new UrlVcard(url.type, url.uri),
            );
            this.location = new LocationVcard(
                vinfoObj.location.ip,
                vinfoObj.location.iso_code,
                vinfoObj.location.country,
                vinfoObj.location.city,
                vinfoObj.location.state,
                vinfoObj.location.state_name,
                vinfoObj.location.postal_code,
                vinfoObj.location.lat,
                vinfoObj.location.lon,
                vinfoObj.location.timezone,
                vinfoObj.location.continent,
                vinfoObj.location.currency,
                vinfoObj.location.deFault,
            );
            this.videoLinks = vinfoObj.videoLinks.map(
                (video: any) => new VideoLinkVcard(video.type, video.uri),
            );
        }
    }

    // array_gen(): any[] {
    //     return { ...this };
    // }

    json_gen(): string | false {
        try {
            return JSON.stringify(this);
        } catch (error) {
            return false;
        }
    }

    addName(names: NameVcard): void {
        this.names = names;
    }

    addNote(note: NoteVcard): void {
        this.note = note;
    }

    addEmail(email: EmailVcard): void {
        this.email = email;
    }

    addSocialProfil(socialProfils: SocialVcardItemAll): void {
        this.socialProfils = socialProfils;
    }

    addUrl(url: UrlVcard): void {
        this.urls.push(url);
    }

    addVideoLink(video: VideoLinkVcard): void {
        this.videoLinks.push(video);
    }
}
